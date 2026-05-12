// src/components/layout/SidebarNav.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  Home, MessageSquare, Brain, Activity, Settings as SettingsIcon,
  ChevronRight, ChevronDown, Loader2, MapPin, BookUser,
  ShieldAlert, CheckSquare, Newspaper, Users, Plug,
  LayoutDashboard, BellRing,
  Bot, Mail, Phone, User, Building2, GitMerge, ArrowRight,
  CheckCircle2, Network
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBusinessSelection } from '@/context/BusinessSelectionContext';
import { useWorkspace } from '@/context/WorkspaceContext';
import { useEntitlements } from '@/context/EntitlementsContext';
import { actionItemsApi, type ActionItem } from '@/api/modules/actionItems';
import { fetchRecentConversations } from '@/api/modules/conversations';
import type { Conversation } from '@/types/conversation';

// ------------------------------------------------------------------
// Types & Config
// ------------------------------------------------------------------
interface Item {
  key: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  subItems?: Item[];
}

interface SidebarNavProps {
  currentView: string;
  onChangeView: (view: string) => void;
  collapsed?: boolean;
  itemsOverride?: Item[];
  className?: string;
}

// ------------------------------------------------------------------
// Hooks & Helpers
// ------------------------------------------------------------------

function formatTimeAgo(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return null;
  const seconds = Math.max(0, Math.floor((Date.now() - t) / 1000));
  if (seconds < 60) return 'just now';
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  const w = Math.floor(d / 7);
  return `${w}w ago`;
}

const PRIORITY_RANK: Record<ActionItem['priority'], number> = {
  urgent: 0,
  high: 1,
  normal: 2,
};

function useActionFocusedSidebar(businessId: number | null | undefined, scope: 'personal' | 'business') {
  const [items, setItems] = useState<ActionItem[] | null>(null);
  const [recentCalls, setRecentCalls] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    const load = async () => {
      setLoading(true);
      try {
        const [actionItems, recentConvos] = await Promise.all([
          actionItemsApi.getItems(businessId ?? undefined).catch(() => [] as ActionItem[]),
          fetchRecentConversations({ limit: 5, scope, signal: controller.signal }).catch(() => []),
        ]);
        if (cancelled) return;
        setItems(actionItems);
        setRecentCalls(recentConvos);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    const interval = window.setInterval(load, 60_000);

    return () => {
      cancelled = true;
      controller.abort();
      window.clearInterval(interval);
    };
  }, [businessId, scope]);

  const pending = useMemo(() => {
    if (!items) return [] as ActionItem[];
    return items
      .filter(i => i.status === 'pending')
      .sort((a, b) => {
        const pr = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
        if (pr !== 0) return pr;
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });
  }, [items]);

  const lastCallAt = recentCalls[0]?.start_time || recentCalls[0]?.created_at || null;

  return { pending, recentCalls, lastCallAt, loading };
}

// ------------------------------------------------------------------
// Sub-Components
// ------------------------------------------------------------------

const ActionFocusedCard: React.FC<{
  isBiz: boolean;
  onViewTasks?: () => void;
  onViewConversations?: () => void;
}> = ({ isBiz, onViewTasks, onViewConversations }) => {
  const { selected, clearSelection } = useBusinessSelection();
  const businessId = isBiz ? selected?.id ?? null : null;
  const { pending, recentCalls, lastCallAt, loading } = useActionFocusedSidebar(businessId, isBiz ? 'business' : 'personal');

  const topPending = pending.slice(0, 2);
  const topCalls = recentCalls.slice(0, 2);

  const lastCallLabel = formatTimeAgo(lastCallAt);
  const lastCallMinutes = lastCallAt ? Math.floor((Date.now() - new Date(lastCallAt).getTime()) / 60000) : null;
  const isLive = lastCallMinutes !== null && lastCallMinutes < 60;

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl border w-full transition-all",
      isBiz
        ? "bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 shadow-lg"
        : "bg-gradient-to-br from-white to-blue-50/50 border-slate-200 shadow-sm"
    )}>
      {/* Background Glow */}
      <div className={cn(
        "absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none",
        isBiz ? "bg-cyan-500" : "bg-blue-500"
      )} />

      {/* Status row */}
      <div className={cn(
        "relative z-10 flex items-center justify-between px-3 py-2 border-b",
        isBiz ? "border-slate-800/60" : "border-slate-200/60"
      )}>
        <div className="flex items-center gap-2 min-w-0">
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            {isLive && (
              <span className={cn(
                "absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping",
                isBiz ? "bg-emerald-400" : "bg-emerald-500"
              )} />
            )}
            <span className={cn(
              "relative inline-flex h-1.5 w-1.5 rounded-full",
              lastCallAt
                ? (isBiz ? "bg-emerald-400" : "bg-emerald-500")
                : (isBiz ? "bg-slate-600" : "bg-slate-300")
            )} />
          </span>
          <span className={cn(
            "text-[11px] font-medium tracking-tight truncate",
            isBiz ? "text-slate-300" : "text-slate-600"
          )}>
            {lastCallLabel ? `Last call ${lastCallLabel}` : 'No recent calls'}
          </span>
        </div>
        {loading && <Loader2 size={11} className={cn("animate-spin shrink-0", isBiz ? "text-slate-600" : "text-slate-400")} />}
      </div>

      {/* Follow-ups section */}
      <div className="relative z-10 px-3 pt-2.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className={cn("text-[10px] font-semibold uppercase tracking-wider", isBiz ? "text-slate-400" : "text-slate-500")}>
            Follow-ups
          </span>
          {pending.length > 0 && (
            <span className={cn("text-[10px] font-medium", isBiz ? "text-slate-500" : "text-slate-400")}>
              {pending.length}
            </span>
          )}
        </div>

        {topPending.length === 0 ? (
          <div className={cn("flex items-center gap-2 py-1.5 text-xs", isBiz ? "text-slate-500" : "text-slate-500")}>
            <CheckCircle2 size={14} className={isBiz ? "text-emerald-400" : "text-emerald-500"} />
            <span>All caught up</span>
          </div>
        ) : (
          <ul className="space-y-0.5">
            {topPending.map(item => {
              const priorityColor =
                item.priority === 'urgent' ? 'bg-rose-500'
                : item.priority === 'high' ? 'bg-amber-500'
                : (isBiz ? 'bg-slate-600' : 'bg-slate-300');
              return (
                <li key={item.id}>
                  <button
                    onClick={onViewTasks}
                    className={cn(
                      "w-full text-left rounded-md px-2 py-1.5 transition-colors",
                      isBiz ? "hover:bg-slate-800/60" : "hover:bg-white/60"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <span className={cn("mt-1.5 h-1.5 w-1.5 rounded-full shrink-0", priorityColor)} />
                      <div className="min-w-0 flex-1">
                        <div className={cn("text-xs font-semibold truncate", isBiz ? "text-slate-200" : "text-slate-800")}>
                          {item.caller_name || 'Unknown caller'}
                        </div>
                        <div className={cn("text-[11px] truncate", isBiz ? "text-slate-500" : "text-slate-500")}>
                          {item.task}
                          {' · '}
                          <span className={isBiz ? "text-slate-600" : "text-slate-400"}>
                            {formatTimeAgo(item.timestamp) || 'recently'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <button
          onClick={onViewTasks}
          className={cn(
            "mt-1.5 w-full flex items-center justify-center gap-1 px-2 py-1.5 text-[11px] font-semibold rounded-md transition-colors",
            isBiz
              ? "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300"
              : "bg-blue-600/10 hover:bg-blue-600/20 text-blue-700"
          )}
        >
          View all follow-ups
          <ArrowRight size={11} />
        </button>
      </div>

      {/* Recent calls section */}
      <div className="relative z-10 px-3 pt-3 pb-3">
        <div className={cn(
          "flex items-center justify-between mb-1.5 pt-2.5 border-t",
          isBiz ? "border-slate-800/60" : "border-slate-200/60"
        )}>
          <span className={cn("text-[10px] font-semibold uppercase tracking-wider", isBiz ? "text-slate-400" : "text-slate-500")}>
            Recent Calls
          </span>
        </div>

        {topCalls.length === 0 ? (
          <div className={cn("py-1.5 text-xs", isBiz ? "text-slate-500" : "text-slate-500")}>
            No calls yet
          </div>
        ) : (
          <ul className="space-y-0.5">
            {topCalls.map(call => {
              const ts = call.start_time || call.created_at;
              const name = call.caller_name || call.caller_phone || 'Unknown caller';
              return (
                <li key={call.id}>
                  <button
                    onClick={onViewConversations}
                    className={cn(
                      "w-full text-left rounded-md px-2 py-1.5 transition-colors",
                      isBiz ? "hover:bg-slate-800/60" : "hover:bg-white/60"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0 flex-1 flex items-center gap-2">
                        <Phone size={11} className={cn("shrink-0", isBiz ? "text-slate-500" : "text-slate-400")} />
                        <span className={cn("text-xs font-medium truncate", isBiz ? "text-slate-200" : "text-slate-800")}>
                          {name}
                        </span>
                      </div>
                      <span className={cn("text-[10px] shrink-0", isBiz ? "text-slate-500" : "text-slate-400")}>
                        {formatTimeAgo(ts) || ''}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <div className="flex items-center gap-2 mt-1.5">
          <button
            onClick={onViewConversations}
            className={cn(
              "flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-[11px] font-semibold rounded-md transition-colors",
              isBiz
                ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            )}
          >
            View All Conversations
            <ArrowRight size={11} />
          </button>
          {isBiz && (
            <button
              onClick={() => clearSelection()}
              className={cn(
                "px-2 py-1.5 text-[11px] font-medium rounded-md transition-colors",
                isBiz ? "text-slate-500 hover:text-slate-300 hover:bg-slate-800" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              )}
            >
              Exit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const RecentAccountsList: React.FC = () => {
  const { recent, selectById } = useBusinessSelection();

  if (recent.length === 0) return null;

  return (
    <div className="mt-3 space-y-1 w-full">
      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-1 mb-2">
        Recent Accounts
      </div>
      {recent.slice(0, 5).map((r) => {
        const loc = [r.city, r.state].filter(Boolean).join(', ');
        return (
          <button
            key={r.id}
            onClick={() => selectById(r.id)}
            className="w-full text-left group rounded-md px-2 py-2 hover:bg-slate-100 transition-all duration-200 border border-transparent hover:border-slate-200"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-xs font-medium truncate text-slate-700 group-hover:text-slate-900">
                  {r.business_name}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                  <span>ID {r.id}</span>
                  {loc && (
                    <span className="flex items-center gap-0.5">
                      <MapPin size={8} /> {loc}
                    </span>
                  )}
                </div>
              </div>
              <ChevronRight size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
            </div>
          </button>
        );
      })}
    </div>
  );
};

// ------------------------------------------------------------------
// Main Component
// ------------------------------------------------------------------

const SidebarNav: React.FC<SidebarNavProps> = ({
  currentView = 'overview',
  onChangeView = () => {},
  collapsed = false,
  itemsOverride,
  className
}) => {
  const { selected } = useBusinessSelection();
  const { mode } = useWorkspace();
  const isBiz = mode === 'business';
  const { entitlements } = useEntitlements();

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'dashboard-group': true,
    'routing-group': true,
  });

  const toggleGroup = (key: string) => {
    setExpandedGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const items = useMemo(() => {
    if (itemsOverride) return itemsOverride;

    if (!isBiz) {
      return [
        { key: 'personal-homepage', label: 'Home', icon: <Home size={20} /> },
        { key: 'personal-pipeline', label: 'Pipeline', icon: <Network size={20} /> },
        {
          key: 'dashboard-group',
          label: 'Dashboard',
          icon: <LayoutDashboard size={20} />,
          subItems: [
            { key: 'personal-overview', label: 'Overview', icon: <Activity size={18} /> },
            { key: 'follow-ups', label: 'Follow-ups & Actions', icon: <CheckSquare size={18} /> },
            ...(entitlements.isProtectEnabled ? [{ key: 'daily-briefings', label: 'Daily Briefings', icon: <Newspaper size={18} /> }] : []),
          ]
        },
        {
          key: 'insights-group',
          label: 'Insights',
          icon: <Brain size={20} />,
          subItems: [
            { key: 'all-conversations', label: 'Conversations', icon: <MessageSquare size={18} /> },
            { key: 'caller-profiles', label: 'Caller Profiles', icon: <BookUser size={18} /> },
            ...(entitlements.isProtectEnabled ? [{ key: 'shield-activity', label: 'Shield Activity', icon: <ShieldAlert size={18} /> }] : []),
            { key: 'reports', label: 'Reports', icon: <Newspaper size={18} /> },
          ]
        },
        {
          key: 'config-group',
          label: 'Configuration',
          icon: <SettingsIcon size={20} />,
          subItems: [
            { key: 'settings', label: 'Personal Profile', icon: <User size={18} /> },
            { key: 'ai-settings', label: 'AI Settings', icon: <Bot size={18} /> },
            { key: 'phone-settings', label: 'Phone System Settings', icon: <Phone size={18} /> },
            ...(entitlements.isFamilyEnabled ? [{ key: 'family-lines', label: 'Family Lines', icon: <Users size={18} /> }] : []),
            ...(entitlements.isPersonalPagingEnabled ? [{ key: 'personal-notifications', label: 'Email Notifications', icon: <Mail size={18} /> }] : []),
          ]
        }
      ];
    } else {
      return [
        { key: 'homepage', label: 'Home', icon: <Home size={20} /> },
        { key: 'pipeline', label: 'Pipeline', icon: <Network size={20} /> },
        {
          key: 'dashboard-group',
          label: 'Dashboard',
          icon: <LayoutDashboard size={20} />,
          subItems: [
            { key: 'overview', label: 'Activity Dashboard', icon: <Activity size={18} /> },
            { key: 'follow-ups', label: 'Follow-ups & Actions', icon: <CheckSquare size={18} /> },
            { key: 'daily-briefings', label: 'Daily Briefings', icon: <Newspaper size={18} /> },
          ]
        },
        {
          key: 'insights-group',
          label: 'Insights',
          icon: <Brain size={20} />,
          subItems: [
            { key: 'all-conversations', label: 'Conversations', icon: <MessageSquare size={18} /> },
            { key: 'caller-profiles', label: 'Caller Profiles', icon: <BookUser size={18} /> },
            { key: 'shield-activity', label: 'Shield Activity', icon: <ShieldAlert size={18} /> },
            { key: 'reports', label: 'Reports', icon: <Newspaper size={18} /> },
            ...(entitlements.isIntelligenceEnabled ? [
              { key: 'knowledge-graph', label: 'Knowledge Graph', icon: <Brain size={18} /> },
              { key: 'semantic-explorer', label: 'Semantic Map', icon: <MapPin size={18} /> },
            ] : []),
          ]
        },
        ...(entitlements.isPagingEnabled ? [{
          key: 'routing-group',
          label: 'Routing & On Call',
          icon: <BellRing size={20} />,
          subItems: [
            { key: 'routing', label: 'Routing', icon: <GitMerge size={18} /> },
            { key: 'escalations', label: 'Escalations', icon: <BellRing size={18} /> },
          ]
        }] : []),
        {
          key: 'config-group',
          label: 'Configuration',
          icon: <SettingsIcon size={20} />,
          subItems: [
            { key: 'settings', label: 'Workspace Profile', icon: <Building2 size={18} /> },
            { key: 'ai-settings', label: 'AI Settings', icon: <Bot size={18} /> },
            { key: 'phone-settings', label: 'Phone System Settings', icon: <Phone size={18} /> },
            { key: 'integrations', label: 'Integration Settings', icon: <Plug size={18} /> },
          ]
        }
      ];
    }
  }, [isBiz, itemsOverride, entitlements]);

  const renderNavItem = (item: Item, isSubItem = false) => {
    const isActive = currentView === item.key;

    return (
      <button
        key={item.key}
        onClick={() => onChangeView(item.key)}
        className={cn(
          'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative outline-none focus-visible:ring-2 focus-visible:ring-slate-400',
          isSubItem ? 'pl-10 py-1.5 text-sm' : 'py-2.5',
          isActive
            ? (isBiz
                ? 'bg-cyan-950/30 text-cyan-400 border border-cyan-900/50 shadow-sm'
                : 'bg-blue-50 text-blue-700 border border-blue-100 shadow-sm')
            : (isBiz
                ? 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 border border-transparent')
        )}
      >
        {isActive && !isSubItem && (
          <span className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full",
            isBiz ? "bg-cyan-500" : "bg-blue-600"
          )} />
        )}

        <span className={cn(
          'flex-shrink-0 transition-transform duration-200',
          isActive
            ? (isBiz ? 'text-cyan-400 scale-105' : 'text-blue-700 scale-105')
            : (isBiz ? 'text-slate-500 group-hover:text-slate-300' : 'text-slate-400 group-hover:text-slate-600')
        )}>
          {item.icon}
        </span>

        {!collapsed && (
          <>
            <span className={cn("flex-1 text-left font-medium whitespace-nowrap", isSubItem ? "text-sm" : "text-sm")}>
              {item.label}
            </span>
            {typeof item.badge === 'number' && (
              <span className={cn(
                'px-2 py-0.5 text-xs font-medium rounded-full min-w-[1.75rem] text-center',
                isActive
                  ? (isBiz ? 'bg-cyan-900/50 text-cyan-400' : 'bg-blue-100 text-blue-700')
                  : (isBiz ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500')
              )}>
                {item.badge}
              </span>
            )}
          </>
        )}
      </button>
    );
  };

  return (
    <aside
      className={cn(
        'h-full max-h-screen flex flex-col overflow-hidden select-none transition-colors duration-300 w-64',
        isBiz
          ? 'bg-slate-950 border-r border-slate-800 text-slate-400'
          : 'bg-slate-50/50 backdrop-blur-sm border-r border-slate-200 text-slate-600',
        className
      )}
      aria-label="Primary navigation"
    >
      {/* Brand Section (Fixed at Top) */}
      <div className={cn("p-5 border-b shrink-0", isBiz ? "border-slate-800" : "border-slate-200/60")}>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-[22.5%] shadow-md overflow-hidden shrink-0">
            <img
              src={isBiz ? "/assets/landing/icons/icon-dark01.svg" : "/assets/landing/icons/icon-light.svg"}
              alt="VoxGuard Logo"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <h2 className={cn("text-base font-bold leading-tight", isBiz ? "text-white" : "text-slate-800")}>
                seraphone.ai
              </h2>
              <p className={cn("text-[10px] tracking-wide uppercase font-medium", isBiz ? "text-slate-500" : "text-slate-500")}>
                Call Center Controller
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Items (Scrollable Area) */}
      <div className="flex-1 overflow-y-auto min-h-0 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <nav className="p-3 space-y-1 w-full" role="navigation">
          {items.map(item => {
            if (item.subItems && item.subItems.length > 0) {
              const isExpanded = expandedGroups[item.key];
              const isChildActive = item.subItems.some(sub => sub.key === currentView);

              return (
                <div key={item.key} className="space-y-0.5">
                  <button
                    onClick={() => toggleGroup(item.key)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group outline-none',
                      isChildActive && !isExpanded
                        ? (isBiz ? 'text-cyan-400' : 'text-blue-700')
                        : (isBiz ? 'text-slate-400 hover:bg-slate-900 hover:text-slate-200' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')
                    )}
                  >
                    <span className={cn(
                      'flex-shrink-0',
                      isChildActive && !isExpanded
                        ? (isBiz ? 'text-cyan-400' : 'text-blue-700')
                        : (isBiz ? 'text-slate-500 group-hover:text-slate-300' : 'text-slate-400 group-hover:text-slate-600')
                    )}>
                      {item.icon}
                    </span>

                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left text-sm font-semibold whitespace-nowrap">
                          {item.label}
                        </span>
                        <span className={isBiz ? 'text-slate-500' : 'text-slate-400'}>
                          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </span>
                      </>
                    )}
                  </button>

                  {isExpanded && !collapsed && (
                    <div className="mt-1 space-y-0.5 relative">
                      <div className={cn(
                        "absolute left-5 top-0 bottom-2 w-px",
                        isBiz ? "bg-slate-800" : "bg-slate-200"
                      )} />
                      {item.subItems.map(subItem => renderNavItem(subItem, true))}
                    </div>
                  )}
                </div>
              );
            }

            return renderNavItem(item);
          })}
        </nav>
      </div>

      {/* Bottom Panel - Action-focused card (Fixed at Bottom) */}
      <div className="p-3 pt-2 shrink-0 w-full">
        {(selected || !isBiz) && (
          <ActionFocusedCard
            isBiz={isBiz}
            onViewTasks={() => onChangeView('follow-ups')}
            onViewConversations={() => onChangeView('all-conversations')}
          />
        )}
        {!isBiz && <RecentAccountsList />}
      </div>
    </aside>
  );
};

export default SidebarNav;
