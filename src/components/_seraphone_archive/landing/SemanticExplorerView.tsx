import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Brain,
  Sparkles,
  Loader2,
  RefreshCw,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Phone,
  Zap,
  MessageSquare,
  Bot,
  User,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { formatDistanceToNow } from 'date-fns';

// Mock contexts and API imports for the artifact
const useWorkspace = () => ({ mode: 'business', activeBusinessId: 1, activeWorkspace: { type: 'BUSINESS', businessId: 1 } });
const getToken = () => 'mock-token';

/*************************************************************************************************
 * TYPES
 *************************************************************************************************/
interface DialoguePoint {
  id: number;
  conversation_id: number;
  speaker: string;
  text: string;
  timestamp: string;
  embedding: number[];
  x: number;
  y: number;
  cluster?: number;
  caller_name?: string;
  business_name?: string;
}

interface Cluster {
  id: number;
  center: [number, number];
  points: DialoguePoint[];
  label: string;
  color: string;
  keywords: string[];
}

interface SemanticExplorerViewProps {
  businessId?: number | null;
  onSelectConversation?: (sid: string) => void;
}

/*************************************************************************************************
 * CONSTANTS & COLORS
 *************************************************************************************************/
const API_BASE = 'http://localhost:8000';

const BIZ_COLORS = [
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#d946ef', // fuchsia
  '#f43f5e', // rose
  '#10b981', // emerald
  '#f59e0b', // amber
  '#14b8a6', // teal
];

const PERSONAL_COLORS = [
  '#2563eb', // blue-600
  '#4f46e5', // indigo-600
  '#7c3aed', // violet-600
  '#c026d3', // fuchsia-600
  '#e11d48', // rose-600
  '#059669', // emerald-600
  '#d97706', // amber-600
  '#0d9488', // teal-600
];

// Robust stop words list to prevent generic words from becoming cluster labels
const STOP_WORDS = new Set([
  'about', 'there', 'where', 'which', 'would', 'could', 'should',
  'seems', 'issue', 'hello', 'please', 'thanks', 'thank', 'sorry',
  'right', 'think', 'thing', 'know', 'want', 'need', 'help', 'with',
  'that', 'this', 'they', 'them', 'what', 'when', 'who', 'how',
  'have', 'make', 'take', 'get', 'give', 'look', 'find', 'come',
  'just', 'like', 'good', 'well', 'much', 'even', 'very', 'really',
  'some', 'your', 'from', 'been', 'were', 'their', 'because', 'into'
]);

/*************************************************************************************************
 * HELPER FUNCTIONS
 *************************************************************************************************/

const clusterPoints = (points: DialoguePoint[], k: number, colors: string[]): Cluster[] => {
  if (points.length === 0) return [];

  const centroids: [number, number][] = [];
  const usedIndices = new Set<number>();
  const actualK = Math.min(k, points.length);

  while (centroids.length < actualK) {
    const idx = Math.floor(Math.random() * points.length);
    if (!usedIndices.has(idx)) {
      usedIndices.add(idx);
      centroids.push([points[idx].x, points[idx].y]);
    }
  }

  const assignments = new Array(points.length).fill(0);
  let changed = true;
  let iterations = 0;

  while (changed && iterations < 50) {
    changed = false;
    iterations++;

    points.forEach((point, i) => {
      let minDist = Infinity;
      let bestCluster = 0;

      centroids.forEach((centroid, j) => {
        const dist = Math.sqrt(
          Math.pow(point.x - centroid[0], 2) +
          Math.pow(point.y - centroid[1], 2)
        );
        if (dist < minDist) {
          minDist = dist;
          bestCluster = j;
        }
      });

      if (assignments[i] !== bestCluster) {
        assignments[i] = bestCluster;
        changed = true;
      }
    });

    centroids.forEach((_, j) => {
      const clusterPoints = points.filter((_, i) => assignments[i] === j);
      if (clusterPoints.length > 0) {
        const avgX = clusterPoints.reduce((sum, p) => sum + p.x, 0) / clusterPoints.length;
        const avgY = clusterPoints.reduce((sum, p) => sum + p.y, 0) / clusterPoints.length;
        centroids[j] = [avgX, avgY];
      }
    });
  }

  const clusters: Cluster[] = centroids.map((center, i) => {
    const clusterPoints = points.filter((_, idx) => assignments[idx] === i);

    // Improved Keyword Extraction
    const allWords = clusterPoints
      .flatMap(p => p.text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/))
      .filter(w => w.length > 3 && !STOP_WORDS.has(w));

    const wordCounts = allWords.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const keywords = Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([word]) => word);

    return {
      id: i,
      center,
      points: clusterPoints,
      label: keywords.length > 0 ? keywords[0].charAt(0).toUpperCase() + keywords[0].slice(1) : `Cluster ${i + 1}`,
      color: colors[i % colors.length],
      keywords
    };
  });

  return clusters.filter(c => c.points.length > 0);
};

// Improved mock data generator with realistic call center intents
const generateMockPoints = (count: number): DialoguePoint[] => {
  const topics = [
    { center: [20, 20], spread: 15, templates: ['I have a question about my recent invoice.', 'Why was I charged twice this month?', 'I need to update my payment method.', 'Can I get a refund for this charge?'] },
    { center: [80, 20], spread: 15, templates: ['My system is completely down.', 'I keep getting a 500 error when I try to save.', 'The application is running very slowly.', 'How do I fix the synchronization issue?'] },
    { center: [50, 80], spread: 20, templates: ['I would like to get a quote for the enterprise tier.', 'Can we schedule a demo for my team?', 'What are the pricing options for 50 users?', 'I am interested in upgrading my current plan.'] },
    { center: [20, 80], spread: 10, templates: ['This is a critical outage, please page the on-call engineer.', 'Our production server just crashed, urgent help needed.', 'Emergency: the database is unreachable.', 'Please escalate this to the highest priority.'] },
    { center: [80, 80], spread: 15, templates: ['I am locked out of my account.', 'I need to reset my password but did not get the email.', 'How do I change my login email address?', 'My account seems to be suspended.'] }
  ];

  const aiResponses = [
    "I can certainly help you with that.",
    "Let me pull up your account details.",
    "I understand this is frustrating, let's get it resolved.",
    "I will transfer you to the appropriate department.",
    "Could you verify your phone number for me?"
  ];

  return Array.from({ length: count }).map((_, i) => {
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const isAI = Math.random() > 0.6; // 60% caller, 40% AI

    const text = isAI
      ? aiResponses[Math.floor(Math.random() * aiResponses.length)]
      : topic.templates[Math.floor(Math.random() * topic.templates.length)];

    return {
      id: i,
      conversation_id: 1000 + (i % 50),
      speaker: isAI ? 'ai' : 'caller',
      text,
      timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      embedding: [],
      x: topic.center[0] + (Math.random() * topic.spread * 2 - topic.spread),
      y: topic.center[1] + (Math.random() * topic.spread * 2 - topic.spread),
      caller_name: `+1 (555) 01${Math.floor(Math.random() * 99).toString().padStart(2, '0')}`,
      business_name: 'Acme Corp'
    };
  });
};

/*************************************************************************************************
 * MAIN COMPONENT
 *************************************************************************************************/
export default function SemanticExplorerView({
  businessId: propBusinessId,
  onSelectConversation
}: SemanticExplorerViewProps) {
  const { mode, activeWorkspace } = useWorkspace();
  const isBiz = mode === 'business';

  // Theme classes based on isBiz
  const bgClass = isBiz ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-900';
  const cardClass = isBiz ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200';
  const textMutedClass = isBiz ? 'text-slate-400' : 'text-slate-500';
  const borderClass = isBiz ? 'border-slate-800' : 'border-slate-200';
  const accentTextClass = isBiz ? 'text-cyan-400' : 'text-blue-600';
  const canvasBgClass = isBiz ? 'bg-slate-950' : 'bg-slate-50';
  const gridColor = isBiz ? 'rgba(51, 65, 85, 0.3)' : 'rgba(226, 232, 240, 0.8)';
  const clusterColors = isBiz ? BIZ_COLORS : PERSONAL_COLORS;

  const effectiveBusinessId = useMemo(() => {
    if (propBusinessId) return propBusinessId;
    return activeWorkspace.type === 'BUSINESS' ? activeWorkspace.businessId : null;
  }, [propBusinessId, activeWorkspace]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialoguePoints, setDialoguePoints] = useState<DialoguePoint[]>([]);
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<DialoguePoint | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<DialoguePoint | null>(null);
  const [selectedCluster, setSelectedCluster] = useState<number | null>(null);
  const [numClusters, setNumClusters] = useState(5);
  const [debouncedClusters, setDebouncedClusters] = useState(5);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showClusters, setShowClusters] = useState(true);

  const [speakerFilter, setSpeakerFilter] = useState<'all' | 'caller' | 'ai'>('all');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const clusterTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (clusterTimeoutRef.current) clearTimeout(clusterTimeoutRef.current);
    clusterTimeoutRef.current = setTimeout(() => setDebouncedClusters(numClusters), 300);
    return () => { if (clusterTimeoutRef.current) clearTimeout(clusterTimeoutRef.current); };
  }, [numClusters]);

  const fetchDialogueEmbeddings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const points = generateMockPoints(300);
      setDialoguePoints(points);
    } catch (err: any) {
      setError(err.message || 'Failed to load dialogue embeddings');
    } finally {
      setLoading(false);
    }
  }, [effectiveBusinessId]);

  useEffect(() => {
    fetchDialogueEmbeddings();
  }, [fetchDialogueEmbeddings]);

  const filteredPoints = useMemo(() => {
    if (speakerFilter === 'all') return dialoguePoints;
    return dialoguePoints.filter(p => p.speaker === speakerFilter);
  }, [dialoguePoints, speakerFilter]);

  useEffect(() => {
    if (filteredPoints.length > 0) {
      const newClusters = clusterPoints(filteredPoints, debouncedClusters, clusterColors);
      setClusters(newClusters);
    } else {
      setClusters([]);
    }
  }, [debouncedClusters, filteredPoints, clusterColors]);

  /*************************************************************************************************
   * CANVAS RENDERING
   *************************************************************************************************/
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        renderFrame(width, height);
      }
    });

    resizeObserver.observe(container);

    const renderFrame = (width: number, height: number) => {
      ctx.clearRect(0, 0, width, height);

      // Draw Grid Background
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      const gridSize = 50 * zoomLevel;
      const offsetX = panOffset.x % gridSize;
      const offsetY = panOffset.y % gridSize;

      ctx.beginPath();
      for (let x = offsetX; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = offsetY; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      if (filteredPoints.length === 0) return;

      const xValues = filteredPoints.map(p => p.x);
      const yValues = filteredPoints.map(p => p.y);
      let minX = Math.min(...xValues);
      let maxX = Math.max(...xValues);
      let minY = Math.min(...yValues);
      let maxY = Math.max(...yValues);

      if (maxX === minX) { maxX += 1; minX -= 1; }
      if (maxY === minY) { maxY += 1; minY -= 1; }

      const basePadding = 60;
      const scaleX = (width - 2 * basePadding) / (maxX - minX);
      const scaleY = (height - 2 * basePadding) / (maxY - minY);

      const toCanvasX = (x: number) => (basePadding + (x - minX) * scaleX) * zoomLevel + panOffset.x;
      const toCanvasY = (y: number) => (basePadding + (y - minY) * scaleY) * zoomLevel + panOffset.y;

      // Draw Clusters
      if (showClusters) {
        clusters.forEach(cluster => {
          if (selectedCluster !== null && selectedCluster !== cluster.id) return;

          const cx = toCanvasX(cluster.center[0]);
          const cy = toCanvasY(cluster.center[1]);

          let maxDist = 0;
          cluster.points.forEach(p => {
            const px = toCanvasX(p.x);
            const py = toCanvasY(p.y);
            const dist = Math.sqrt(Math.pow(px - cx, 2) + Math.pow(py - cy, 2));
            if (dist > maxDist) maxDist = dist;
          });

          const radius = Math.max(maxDist * 0.8, 30 * zoomLevel);

          const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
          gradient.addColorStop(0, `${cluster.color}30`);
          gradient.addColorStop(0.5, `${cluster.color}15`);
          gradient.addColorStop(1, `${cluster.color}00`);

          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          // Label
          ctx.fillStyle = isBiz ? '#f8fafc' : '#0f172a';
          ctx.font = `bold ${14 * Math.max(0.8, zoomLevel)}px Inter, sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText(cluster.label, cx, cy - radius * 0.5);

          if (cluster.keywords.length > 1) {
            ctx.fillStyle = isBiz ? '#94a3b8' : '#64748b';
            ctx.font = `${10 * Math.max(0.8, zoomLevel)}px Inter, sans-serif`;
            ctx.fillText(cluster.keywords.slice(1).join(' • '), cx, cy - radius * 0.5 + 16 * zoomLevel);
          }
        });
      }

      // Draw Points
      filteredPoints.forEach(point => {
        if (selectedCluster !== null) {
          const pointCluster = clusters.find(c => c.points.includes(point));
          if (pointCluster?.id !== selectedCluster) return;
        }

        const cx = toCanvasX(point.x);
        const cy = toCanvasY(point.y);
        const isSelected = selectedPoint?.id === point.id;
        const isHovered = hoveredPoint?.id === point.id;
        const isAI = point.speaker === 'ai';

        let color = isBiz ? '#475569' : '#94a3b8';
        const cluster = clusters.find(c => c.points.includes(point));
        if (cluster) color = cluster.color;

        const size = (isSelected || isHovered ? 6 : 3) * Math.max(0.8, zoomLevel);

        ctx.beginPath();
        if (isAI) {
          ctx.rect(cx - size, cy - size, size * 2, size * 2);
        } else {
          ctx.arc(cx, cy, size, 0, Math.PI * 2);
        }

        ctx.fillStyle = color;
        ctx.fill();

        if (isSelected || isHovered) {
          ctx.strokeStyle = isBiz ? '#fff' : '#000';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
    };

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    renderFrame(rect.width, rect.height);

    return () => resizeObserver.disconnect();

  }, [filteredPoints, clusters, selectedPoint, hoveredPoint, selectedCluster, zoomLevel, panOffset, showClusters, isBiz, gridColor]);

  /*************************************************************************************************
   * INTERACTION HANDLERS
   *************************************************************************************************/
  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.WheelEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomSensitivity = 0.001;
    const delta = -e.deltaY * zoomSensitivity;
    setZoomLevel(Math.min(Math.max(0.5, zoomLevel + delta), 5));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      setPanOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas || filteredPoints.length === 0) return;

    const { x, y } = getCanvasCoordinates(e);
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const xValues = filteredPoints.map(p => p.x);
    const yValues = filteredPoints.map(p => p.y);
    let minX = Math.min(...xValues);
    let maxX = Math.max(...xValues);
    let minY = Math.min(...yValues);
    let maxY = Math.max(...yValues);

    if (maxX === minX) { maxX += 1; minX -= 1; }
    if (maxY === minY) { maxY += 1; minY -= 1; }

    const basePadding = 60;
    const scaleX = (width - 2 * basePadding) / (maxX - minX);
    const scaleY = (height - 2 * basePadding) / (maxY - minY);

    const toCanvasX = (val: number) => (basePadding + (val - minX) * scaleX) * zoomLevel + panOffset.x;
    const toCanvasY = (val: number) => (basePadding + (val - minY) * scaleY) * zoomLevel + panOffset.y;

    let nearest: DialoguePoint | null = null;
    let minDistance = 20;

    for (const point of filteredPoints) {
      const cx = toCanvasX(point.x);
      const cy = toCanvasY(point.y);
      const dist = Math.sqrt(Math.pow(cx - x, 2) + Math.pow(cy - y, 2));

      if (dist < minDistance) {
        minDistance = dist;
        nearest = point;
      }
    }

    setHoveredPoint(nearest);
  };

  const resetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  if (loading) {
    return (
      <div className={cn("flex h-[600px] items-center justify-center", bgClass)}>
        <div className="flex flex-col items-center gap-4">
          <Loader2 className={cn("h-8 w-8 animate-spin", accentTextClass)} />
          <p className={textMutedClass}>Analyzing semantic patterns...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("flex h-[600px] items-center justify-center", bgClass)}>
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="rounded-full bg-rose-500/10 p-3">
            <Zap className="h-6 w-6 text-rose-500" />
          </div>
          <h3 className="text-lg font-semibold">Error Loading Explorer</h3>
          <p className={cn("text-sm max-w-md", textMutedClass)}>{error}</p>
          <Button variant="outline" onClick={fetchDialogueEmbeddings} className={cardClass}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4 h-full", bgClass, isFullscreen && "fixed inset-0 z-50 p-6")}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Brain className={cn("h-6 w-6", accentTextClass)} />
            Semantic Map
          </h2>
          <p className={textMutedClass}>
            Interactive visualization of common call topics and intents.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className={cn("border", borderClass, isBiz ? "hover:bg-slate-800" : "hover:bg-slate-100")}
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-[600px]">
        {/* Controls & Details Sidebar */}
        <Card className={cn("lg:col-span-1 flex flex-col", cardClass)}>
          <CardHeader className={cn("pb-3 border-b", borderClass)}>
            <CardTitle className={cn("text-sm font-medium flex items-center gap-2", isBiz ? "text-slate-200" : "text-slate-800")}>
              <Filter className="w-4 h-4" />
              Map Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-6 pt-4">

            {/* Speaker Filter */}
            <div className="space-y-3">
              <label className={cn("text-xs font-medium", textMutedClass)}>Filter by Speaker</label>
              <div className="flex gap-2">
                {[
                  { id: 'all', label: 'All', icon: MessageSquare },
                  { id: 'caller', label: 'Caller', icon: User },
                  { id: 'ai', label: 'AI', icon: Bot }
                ].map((filter) => (
                  <Button
                    key={filter.id}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "flex-1 h-8 text-xs transition-colors",
                      speakerFilter !== filter.id && (isBiz ? "border-slate-700 text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-100"),
                      speakerFilter === filter.id && (isBiz ? "bg-cyan-600 hover:bg-cyan-700 text-white border-transparent" : "bg-blue-600 hover:bg-blue-700 text-white border-transparent")
                    )}
                    onClick={() => setSpeakerFilter(filter.id as any)}
                  >
                    <filter.icon className="w-3 h-3 mr-1" />
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Clusters Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className={cn("text-xs font-medium", textMutedClass)}>Topic Clusters (k={numClusters})</label>
                <Badge variant="outline" className={cn("text-[10px]", borderClass)}>K-Means</Badge>
              </div>
              <Slider
                value={[numClusters]}
                min={2}
                max={10}
                step={1}
                onValueChange={([v]) => setNumClusters(v)}
                className={cn(isBiz ? "[&_[role=slider]]:bg-cyan-400 [&_[role=slider]]:border-cyan-400 [&_.bg-primary]:bg-cyan-600 [&_.bg-secondary]:bg-slate-800" : "")}
              />
            </div>

            <div className={cn("h-px my-4", borderClass)} />

            {/* Selected Point Details */}
            {selectedPoint ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge
                      variant="outline"
                      className={cn("mb-2", borderClass, selectedPoint.speaker === 'ai' ? accentTextClass : "")}
                    >
                      {selectedPoint.speaker === 'ai' ? <><Bot className="w-3 h-3 mr-1"/> AI Assistant</> : <><User className="w-3 h-3 mr-1"/> Caller</>}
                    </Badge>
                    <div className={cn("text-xs", textMutedClass)}>
                      {formatDistanceToNow(new Date(selectedPoint.timestamp), { addSuffix: true })}
                    </div>
                  </div>
                  {selectedPoint.business_name && (
                    <Badge variant="secondary" className={cn("text-[10px]", isBiz ? "bg-slate-800 text-slate-300" : "bg-slate-100")}>
                      {selectedPoint.business_name}
                    </Badge>
                  )}
                </div>

                <div className={cn("p-3 rounded-md text-sm italic border", isBiz ? "bg-slate-950 border-slate-800 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700")}>
                  "{selectedPoint.text}"
                </div>

                <div className="space-y-2">
                  {selectedPoint.caller_name && (
                    <div className={cn("flex items-center gap-2 text-xs", textMutedClass)}>
                      <Phone className="h-3 w-3" />
                      {selectedPoint.caller_name}
                    </div>
                  )}
                  <Button
                    className={cn("w-full transition-colors", isBiz ? "bg-cyan-600 hover:bg-cyan-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white")}
                    size="sm"
                    onClick={() => onSelectConversation?.(String(selectedPoint.conversation_id))}
                  >
                    View Conversation
                  </Button>
                </div>
              </div>
            ) : (
              <div className={cn("text-center py-8", textMutedClass)}>
                <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-20" />
                <p className="text-xs">Select a point on the map to view dialogue details</p>
              </div>
            )}

          </CardContent>
        </Card>

        {/* Visualization Area */}
        <Card className={cn("lg:col-span-3 overflow-hidden relative", cardClass, canvasBgClass)}>
          {dialoguePoints.length === 0 ? (
            <div className={cn("absolute inset-0 flex flex-col items-center justify-center", textMutedClass)}>
              <Brain className="h-12 w-12 mb-4 opacity-20" />
              <h3 className="text-lg font-medium">No conversation data found</h3>
              <p className="text-sm opacity-70">Try making some calls to generate semantic data.</p>
            </div>
          ) : (
            <>
              <div
                ref={containerRef}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                onWheel={handleWheel}
              >
                <canvas
                  ref={canvasRef}
                  className="w-full h-full"
                  onMouseMove={handleCanvasMouseMove}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={() => {
                    setHoveredPoint(null);
                    handleMouseUp();
                  }}
                  onClick={() => {
                    if (!isDragging) {
                      hoveredPoint ? setSelectedPoint(hoveredPoint) : setSelectedPoint(null);
                    }
                  }}
                />
              </div>

              {/* Map Floating Controls */}
              <div className={cn("absolute bottom-4 right-4 flex items-center gap-1 backdrop-blur-sm p-1 rounded-md border shadow-sm", isBiz ? "bg-slate-900/80 border-slate-800" : "bg-white/80 border-slate-200")}>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setZoomLevel(z => Math.max(0.5, z - 0.2))}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-xs font-medium w-12 text-center">{(zoomLevel * 100).toFixed(0)}%</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setZoomLevel(z => Math.min(5, z + 0.2))}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <div className={cn("w-px h-4 mx-1", borderClass)} />
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={resetView} title="Reset View">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Cluster Legend Overlay - Moved to Right */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-none max-h-[calc(100%-80px)] overflow-y-auto pl-2">
                {clusters.map(cluster => (
                  <div
                    key={cluster.id}
                    className={cn(
                      "flex items-center gap-3 backdrop-blur-md shadow-sm border rounded-md px-3 py-2 text-xs transition-all pointer-events-auto cursor-pointer hover:scale-105",
                      isBiz ? "bg-slate-900/80 border-slate-800 text-slate-200" : "bg-white/80 border-slate-200 text-slate-800",
                      selectedCluster === cluster.id && (isBiz ? "ring-1 ring-cyan-500" : "ring-1 ring-blue-500")
                    )}
                    onClick={() => setSelectedCluster(selectedCluster === cluster.id ? null : cluster.id)}
                  >
                    <div
                      className="w-3 h-3 rounded-full shadow-sm shrink-0"
                      style={{ backgroundColor: cluster.color }}
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold">{cluster.label}</span>
                      <span className={cn("text-[10px]", textMutedClass)}>{cluster.points.length} interactions</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tooltip */}
              {hoveredPoint && !selectedPoint && !isDragging && (
                <div
                  className={cn(
                    "absolute pointer-events-none px-3 py-2 rounded-md shadow-lg border text-xs max-w-[250px] z-10",
                    isBiz ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-white border-slate-200 text-slate-800"
                  )}
                  style={{
                    left: 20,
                    bottom: 20,
                    animation: 'fade-in 0.1s ease-out'
                  }}
                >
                  <div className="flex items-center gap-1 mb-1 font-medium">
                    {hoveredPoint.speaker === 'ai' ? <Bot className={cn("w-3 h-3", accentTextClass)} /> : <User className="w-3 h-3 text-emerald-500" />}
                    {hoveredPoint.speaker === 'ai' ? 'AI Assistant' : 'Caller'}
                  </div>
                  <p className={cn("line-clamp-3", isBiz ? "text-slate-400" : "text-slate-600")}>"{hoveredPoint.text}"</p>
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}