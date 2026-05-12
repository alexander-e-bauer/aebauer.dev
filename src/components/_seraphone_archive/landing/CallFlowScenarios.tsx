import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Phone, Brain, Network, GitFork, UserCheck,
  Shield, Zap, CheckCircle2, Play, RotateCcw,
  AlertOctagon, Mail, Clock, Calendar, Wrench,
  ShieldAlert, Database, MessageSquare, Server, Lock,
  Bell, BarChart2, Sliders, KeyRound
} from 'lucide-react';

// ─── NODES ──────────────────────────────────────────────────────────────────
const NODES: Record<string, {
  id: string; label: string; sublabel: string;
  icon: React.ElementType; x: number; y: number;
  detail: string;
  tooltip: { what: string; why: string };
}> = {
  root:          { id:'root',          label:'Incoming Call',     sublabel:'Twilio WebSocket',    icon:Phone,        x:600,  y:60,  detail:'A call arrives via Twilio. A WebSocket media stream is opened and the AI session is initialised.',                                                         tooltip:{ what:'A caller dials in and Twilio opens a real-time audio WebSocket to the system. This is the single entry point for every call — nothing happens until this connection is established.',                                                                                                   why:'Using WebSockets instead of recording-then-processing means the AI can respond mid-sentence with zero perceptible delay, making it feel like a real conversation rather than a voicemail bot.' } },
  ai_screen:     { id:'ai_screen',     label:'AI Screening',      sublabel:'GPT-5.4 / Gemini',      icon:Brain,        x:600,  y:185, detail:'Intent, urgency and caller sentiment are extracted. Trust score is initialised from the CallerProfile.',                                                  tooltip:{ what:'The AI listens to the caller\'s opening words and immediately classifies their intent, urgency level, and emotional tone. It also checks if this caller has called before and loads their history.',                                                                                     why:'Getting intent right in the first few seconds means the system can route the call correctly without making the caller repeat themselves — the single biggest frustration in phone support.' } },
  governance:    { id:'governance',    label:'Governance Engine', sublabel:'Real-time Intercept', icon:Shield,       x:160,  y:330, detail:'Parallel process monitors every AI turn for STRICT_RULES violations, spam patterns and hostile callers.',                                                  tooltip:{ what:'A separate AI process runs alongside every conversation, silently watching for policy violations, robocall patterns, or hostile behaviour. It can interrupt and correct the main AI at any moment.',                                                                                     why:'Without this, a jailbreak prompt or an edge case could cause the AI to promise a refund it can\'t give, or stay on the line with a spam bot burning Twilio and OpenAI budget indefinitely.' } },
  context_mgr:   { id:'context_mgr',   label:'Context Manager',   sublabel:'Warm Memory',         icon:Clock,        x:400,  y:330, detail:'Fetches CallerProfile and previous conversation summaries to build warm context for returning callers.',                                                  tooltip:{ what:'Before the AI says a single word, this component looks up the caller\'s phone number and retrieves summaries of their previous calls — what they asked about, what was resolved, and any open issues.',                                                                                 why:'Returning callers shouldn\'t have to re-explain their situation. Injecting memory into the prompt lets the AI greet them by name and reference past conversations naturally.' } },
  intent_router: { id:'intent_router', label:'Intent Router',     sublabel:'Routing Service',     icon:GitFork,      x:640,  y:330, detail:'Vector similarity + business rules determine the correct downstream path for the call.',                                                                  tooltip:{ what:'Once intent is clear, this component decides where the call goes next — knowledge base lookup, calendar booking, department transfer, or escalation. It uses both hard business rules and AI similarity matching.',                                                                      why:'A single routing layer means adding a new call type only requires one change in one place, rather than hunting through nested if-statements scattered across the codebase.' } },
  hours_check:   { id:'hours_check',   label:'Hours Check',       sublabel:'Temporal Rules',      icon:Clock,        x:1040, y:330, detail:'Temporal policy filters determine if the call falls within business hours or requires emergency routing.',                                                 tooltip:{ what:'Every policy in the knowledge base carries a start and end date. This step filters out rules that aren\'t currently active — so after-hours policies automatically kick in at 5pm without any manual intervention.',                                                                    why:'Hardcoding business hours means someone has to remember to update the code for holidays, seasonal changes, or new locations. Date-driven policies make the system self-updating.' } },
  shield_event:  { id:'shield_event',  label:'Shield Event',      sublabel:'DB Log + Trust Score',icon:Database,     x:80,   y:490, detail:'Threat logged natively to ShieldEvent table. Caller trust score decremented. Call terminated via end_call().',                                            tooltip:{ what:'When a threat is detected, a permanent record is written to the database with the caller\'s details, the type of threat, and what action was taken. The caller\'s trust score is also reduced.',                                                                                        why:'Logging every shield event means patterns become visible over time — repeat offenders, new attack vectors, or false positives that need tuning. It also creates an audit trail for compliance.' } },
  buffer_clear:  { id:'buffer_clear',  label:'Buffer Cleared',    sublabel:'AI Correction Forced',icon:AlertOctagon, x:260,  y:490, detail:'Audio output buffer is instantly wiped. Governance forces the AI to restate the correct policy.',                                                         tooltip:{ what:'If the AI starts saying something it shouldn\'t — like agreeing to an unauthorised refund — the audio buffer is wiped mid-sentence and the AI is forced to restart with the correct response.',                                                                                        why:'Callers never hear the incorrect statement. From their perspective the AI simply gave the right answer. This is far safer than letting the wrong response play out and trying to correct it afterward.' } },
  warm_ctx:      { id:'warm_ctx',      label:'Warm Context',      sublabel:'Memory Injected',     icon:MessageSquare,x:400,  y:490, detail:'"Hi John, are you calling back about the pricing we discussed?" — Context from previous sessions injected.',                                              tooltip:{ what:'The caller\'s previous conversation summaries are woven into the AI\'s instructions before it speaks. The AI knows the caller\'s name, what they\'ve asked before, and any unresolved issues.',                                                                                        why:'This turns a generic phone bot into something that feels like a knowledgeable colleague who remembers you — dramatically improving caller satisfaction and reducing handle time.' } },
  kg_search:     { id:'kg_search',     label:'Knowledge Graph',   sublabel:'pgvector HNSW',       icon:Network,      x:600,  y:490, detail:'Semantic search over business documents. Temporal filters ensure only currently-valid policies are returned.',                                             tooltip:{ what:'The AI searches a database of business policies, procedures, and FAQs using semantic similarity — meaning it finds the right answer even if the caller\'s words don\'t exactly match the document.',                                                                                    why:'Keyword search fails when callers say "I want to cancel" but the policy document says "termination procedure." Semantic search bridges that gap and finds the right policy regardless of phrasing.' } },
  mcp_tools:     { id:'mcp_tools',     label:'MCP Tool Server',   sublabel:'Dynamic Tool Fetch',  icon:Server,       x:800,  y:490, detail:'HybridToolManager fetches Google Calendar tools via encrypted HTTP. Merged with CORE_TOOLS at runtime.',                                                  tooltip:{ what:'This component fetches a live list of available tools — like calendar booking or CRM lookup — from an external server at the start of each call. New tools can be added without redeploying the AI.',                                                                                  why:'Baking tools into the AI deployment means every new integration requires a code release. Dynamic tool loading lets the business add capabilities without touching the AI layer.' } },
  oncall_roster: { id:'oncall_roster', label:'On-Call Roster',    sublabel:'DB-Driven Routing',   icon:Database,     x:1040, y:490, detail:'Queries the database for the current on-call technician. Replaces brittle inline IF-statement paging logic.',                                             tooltip:{ what:'Instead of hardcoded phone numbers, the system queries a database table to find who is currently on call based on the day, time, and business. The roster can be updated by non-technical staff.',                                                                                      why:'When the on-call person changes, someone used to have to edit the code and redeploy. Now the office manager updates a table and the change takes effect immediately.' } },
  call_end_spam: { id:'call_end_spam', label:'Call Terminated',   sublabel:'end_call() fired',    icon:Lock,         x:80,   y:650, detail:'System hangs up immediately to preserve Twilio/OpenAI budget. Shield event permanently logged.',                                                          tooltip:{ what:'The system hangs up the call immediately, logs the event, and reduces the caller\'s trust score. The AI is not given a chance to continue the conversation.',                                                                                                                          why:'Every second a spam call stays connected costs real money in Twilio minutes and OpenAI tokens. Hard termination protects the budget and prevents the AI from being manipulated into staying on the line.' } },
  compliance_log:{ id:'compliance_log',label:'Violation Logged',  sublabel:'Admin Review Queue',  icon:ShieldAlert,  x:260,  y:650, detail:'Compliance violation stored for admin review. Call continues safely with corrected AI response.',                                                          tooltip:{ what:'The policy violation is recorded for an admin to review later, but the call is not terminated. The AI continues with the corrected response as if nothing happened from the caller\'s perspective.',                                                                                    why:'Not every violation warrants hanging up — sometimes the AI just needed a nudge. Logging without terminating means the business can review edge cases and improve the AI\'s instructions over time.' } },
  resolution:    { id:'resolution',    label:'Resolution',        sublabel:'Call Ends',           icon:CheckCircle2, x:480,  y:650, detail:'Call resolved. Post-call pipeline fires: summary generated, action items extracted, email briefing dispatched.',                                          tooltip:{ what:'The call ends and an automated pipeline kicks off: the conversation is summarised, action items are extracted, PII is scrubbed, and an email briefing is sent to the relevant team.',                                                                                                  why:'Without post-call automation, important information does not make it into the summaries or take 1–5+ minutes of agent time per call. Automated summaries mean every call is documented consistently with zero manual effort.' } },
  dept_transfer: { id:'dept_transfer', label:'Dept. Transfer',    sublabel:'Warm Handoff',        icon:UserCheck,    x:660,  y:650, detail:'Call transferred to correct department. Agent receives a live AI-whispered summary before picking up.',                                                   tooltip:{ what:'The call is transferred to the right team, but before the agent picks up, they hear a brief AI-generated whisper summarising who is calling and why — so they can answer already knowing the context.',                                                                                why:'Cold transfers where the caller has to re-explain everything are the most frustrating part of phone support. The whisper summary means the agent picks up already knowing the situation.' } },
  cal_booked:    { id:'cal_booked',    label:'Appt. Booked',      sublabel:'Calendar + SMS',      icon:Calendar,     x:840,  y:650, detail:'AI books the slot, updates Google Calendar, and dispatches an SMS confirmation via RelayJob.',                                                            tooltip:{ what:'The AI checks real availability in Google Calendar, books the appointment live during the call, and immediately queues an SMS confirmation to the caller — all without any human involvement.',                                                                                         why:'Booking during the call eliminates the "we\'ll call you back to schedule" step that loses 30–40% of potential appointments. The caller hangs up already confirmed.' } },
  sms_dispatch:  { id:'sms_dispatch',  label:'SMS Dispatch',      sublabel:'RelayJob Scheduler',  icon:Mail,         x:1040, y:650, detail:'HIPAA-compliant SMS sent to on-call tech. Postgres FOR UPDATE SKIP LOCKED prevents duplicate sends.',                                                     tooltip:{ what:'An SMS is queued in the database and a background worker picks it up and sends it via Twilio. A database-level lock ensures that even if multiple workers are running, the message is only sent once.',                                                                                why:'Sending SMS directly in the call handler risks double-sends if the server restarts mid-request. The queue-and-lock pattern makes delivery reliable and auditable even under failure conditions.' } },
};

const SCENARIOS = [
  { id:'spam',       title:'Robocall / Spam',       icon:AlertOctagon,  color:'#f43f5e', desc:'Governance engine detects a pre-recorded solicitation and terminates the call.',                   path:['root','ai_screen','governance','shield_event','call_end_spam'] },
  { id:'compliance', title:'Compliance Intercept',  icon:ShieldAlert,   color:'#f97316', desc:'AI attempts an unauthorised refund. Governance clears the buffer and forces correction.',          path:['root','ai_screen','governance','buffer_clear','compliance_log'] },
  { id:'general',    title:'General Inquiry',       icon:Mail,          color:'#3b82f6', desc:'Standard question handled by the AI and routed via email relay for callback.',                    path:['root','ai_screen','intent_router','kg_search','resolution'] },
  { id:'warm',       title:'Returning Caller',      icon:MessageSquare, color:'#10b981', desc:'Previous caller recognised. Warm context injected for a concierge experience.',                   path:['root','ai_screen','context_mgr','warm_ctx','resolution'] },
  { id:'routing',    title:'Department Routing',    icon:GitFork,       color:'#6366f1', desc:'Complex intent matched via vector similarity and transferred with a live summary.',                path:['root','ai_screen','intent_router','kg_search','dept_transfer'] },
  { id:'emergency',  title:'After-Hours Emergency', icon:Zap,           color:'#f59e0b', desc:'Critical call outside business hours pages the on-call technician via SMS.',                      path:['root','ai_screen','hours_check','oncall_roster','sms_dispatch'] },
  { id:'booking',    title:'Appointment Booking',   icon:Calendar,      color:'#06b6d4', desc:'AI uses the MCP server to check availability and book a calendar slot live.',                     path:['root','ai_screen','intent_router','mcp_tools','cal_booked'] },
  { id:'kg',         title:'KG Troubleshooting',    icon:Wrench,        color:'#a855f7', desc:'Semantic search over business documents guides the caller to a self-service fix.',                 path:['root','ai_screen','intent_router','kg_search','resolution'] },
];

const EDGE_SCENARIO_COLOR: Record<string, string> = {};
for (const s of SCENARIOS) {
  for (let i = 0; i < s.path.length - 1; i++) {
    const k = `${s.path[i]}→${s.path[i+1]}`;
    if (!EDGE_SCENARIO_COLOR[k]) EDGE_SCENARIO_COLOR[k] = s.color;
  }
}

const ALL_EDGES: [string,string][] = [
  ['root','ai_screen'],
  ['ai_screen','governance'],['ai_screen','context_mgr'],['ai_screen','intent_router'],['ai_screen','hours_check'],
  ['governance','shield_event'],['governance','buffer_clear'],
  ['context_mgr','warm_ctx'],
  ['intent_router','kg_search'],['intent_router','mcp_tools'],
  ['hours_check','oncall_roster'],
  ['shield_event','call_end_spam'],
  ['buffer_clear','compliance_log'],
  ['warm_ctx','resolution'],
  ['kg_search','resolution'],['kg_search','dept_transfer'],
  ['mcp_tools','cal_booked'],
  ['oncall_roster','sms_dispatch'],
];

function getPathEdgeSet(path: string[]): Set<string> {
  const s = new Set<string>();
  for (let i = 0; i < path.length - 1; i++) s.add(`${path[i]}→${path[i+1]}`);
  return s;
}

function cubicPath(x1:number,y1:number,x2:number,y2:number) {
  const safeX2 = x1 === x2 ? x2 + 0.01 : x2;
  const dy = y2-y1;
  return `M ${x1} ${y1} C ${x1} ${y1+dy*0.5}, ${safeX2} ${y2-dy*0.5}, ${safeX2} ${y2}`;
}

const NODE_R = 28;

type FeatureBullet = {
  lead: string;
  body: string;
};

const FEATURE_TABS: {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  title: string;
  subtitle: string;
  bullets: FeatureBullet[];
}[] = [
  {
    id:'privacy',
    label:'Privacy',
    icon:KeyRound,
    color:'#6366f1',
    title:'PII Redaction, Vaulting & HIPAA-Ready Architecture',
    subtitle:'Sensitive data is encrypted at rest, tokenized before downstream AI analysis, and isolated in a dedicated vault.',
    bullets:[
      {
        lead:'Field-level encryption',
        body:'Caller phone numbers, callback numbers, names, emails, addresses, summaries, notes, tags, and analysis fields are protected at the database layer with encrypted model fields.'
      },
      {
        lead:'Tokenized transcript redaction',
        body:'The post-call pipeline replaces detected PII with tokens like [NAME_1], [PHONE_1], and [EMAIL_1] before summarization, classification, or embedding generation.'
      },
      {
        lead:'Separate encrypted vault',
        body:'Original sensitive values are stored in a dedicated redaction vault mapped to tokens, so application workflows can operate on placeholders rather than raw PII.'
      },
      {
        lead:'Hashed caller matching',
        body:'Normalized phone hashing supports secure returning-caller recognition and profile matching without depending on plaintext phone numbers for lookup.'
      },
      {
        lead:'Redacted downstream processing',
        body:'Summaries, embeddings, analytics, and retrieval workflows operate on scrubbed transcripts, reducing unnecessary disclosure across model and search layers.'
      },
      {
        lead:'Shield-ready deployment posture',
        body:'Designed for deployment on Heroku Shield Dynos and Shield Postgres, with support for BAA-backed third-party services where required for telephony, messaging, storage, and model access.'
      }
    ]
  },
  {
    id:'governance',
    label:'Safety & Governance',
    icon:Shield,
    color:'#f43f5e',
    title:'Real-Time Governance, Intercepts & Call Health Monitoring',
    subtitle:'A parallel safety layer watches calls as they happen, intercepts risky behavior, and records what happened.',
    bullets:[
      {
        lead:'Parallel governance engine',
        body:'A separate async workflow evaluates live user turns for voicemail, robocalls, hostile callers, and confusion loops while the main conversation continues.'
      },
      {
        lead:'Strict rule enforcement',
        body:'Dangerous transfer-style language and business-rule violations are intercepted before they become operational mistakes, reducing risky model behavior in real time.'
      },
      {
        lead:'Shield event logging',
        body:'Violations and threat events are written asynchronously with call SID, caller phone, business context, category, action taken, duration, and trust score for auditability.'
      },
      {
        lead:'Dead-air recovery stages',
        body:'Silence thresholds are tracked in stages so the system can recover, prompt, or terminate stalled calls instead of burning Twilio minutes in loops.'
      },
      {
        lead:'Duration and quality monitoring',
        body:'Background monitors enforce max call duration and help detect repetition, degraded call quality, and stuck interactions across active sessions.'
      },
      {
        lead:'Operational telemetry',
        body:'OpenTelemetry traces and counters track governance checks, violations, and detected caller situations so prompts, thresholds, and policies can be tuned over time.'
      }
    ]
  },
  {
    id:'paging',
    label:'Escalation',
    icon:Bell,
    color:'#f59e0b',
    title:'On-Call Paging, Relay Workflows & Roster Automation',
    subtitle:'After-hours escalation runs through a resilient job system backed by Postgres and a database-driven on-call roster.',
    bullets:[
      {
        lead:'Queue-and-lock dispatch',
        body:'Relay jobs are fetched with Postgres FOR UPDATE SKIP LOCKED so multiple workers cannot grab the same paging task or send duplicate alerts.'
      },
      {
        lead:'Workflow state machine',
        body:'Each relay job advances through explicit workflow steps, enabling retries, timed escalation, and safer recovery if a worker dies mid-dispatch.'
      },
      {
        lead:'Database-driven roster',
        body:'The current on-call contact is resolved from application data instead of hardcoded logic, making roster changes instant and non-technical.'
      },
      {
        lead:'Roster rotation support',
        body:'When needed, the system can rotate to the next active contact in sequence, keeping after-hours coverage maintainable as schedules change.'
      },
      {
        lead:'Async SMS and voice escalation',
        body:'Twilio-powered SMS sending runs asynchronously, and outbound escalation can be layered into the same relay flow for more urgent scenarios.'
      },
      {
        lead:'Dynamic operational tooling',
        body:'MCP-fetched tools can be merged with local tools so AI-assisted workflows can help manage schedules, rosters, and downstream operations without redeploying the call core.'
      }
    ]
  },
  {
    id:'analysis',
    label:'Intelligence',
    icon:BarChart2,
    color:'#10b981',
    title:'Post-Call Analysis, Enrichment & Retrieval',
    subtitle:'Each completed call becomes structured operational data that improves recall, routing, follow-up, and future search.',
    bullets:[
      {
        lead:'Caller profile enrichment',
        body:'The post-call pipeline extracts caller details, updates trust scoring, applies caller categorization, and appends running persona history for future warm-memory use.'
      },
      {
        lead:'Structured conversation outputs',
        body:'Summaries, key points, action items, topics discussed, sentiment, satisfaction, outcome, and resolution status are generated automatically after the call.'
      },
      {
        lead:'Redacted embedding pipeline',
        body:'Embeddings are created from the redacted transcript, enabling semantic search and retrieval without storing sensitive vector content derived from raw PII.'
      },
      {
        lead:'Trackable action items',
        body:'Follow-ups are normalized into structured records with title, description, priority, and status so operational work is captured instead of buried in free text.'
      },
      {
        lead:'Resolution and sentiment metrics',
        body:'Telemetry tracks resolution outcomes and satisfaction signals, making it easier to monitor trends like unresolved calls, caller frustration, and service quality.'
      },
      {
        lead:'Routing feedback loop',
        body:'Analysis outputs can feed department recommendations, escalation signals, specialist routing, and future confidence tuning across the broader call system.'
      }
    ]
  },
  {
    id:'frontend',
    label:'Configuration',
    icon:Sliders,
    color:'#06b6d4',
    title:'Frontend Configuration & Business Customisation',
    subtitle:'The product can be tailored per business while keeping the operational architecture consistent underneath.',
    bullets:[
      {
        lead:'Per-business branding',
        body:'Voice, persona, greeting style, and conversational tone can be adjusted to match the business and caller experience.'
      },
      {
        lead:'Knowledge management',
        body:'Business rules, documents, routing policies, and knowledge graph content can be organized into a maintainable operational surface.'
      },
      {
        lead:'Live operational visibility',
        body:'Dashboards can expose real-time transcripts, call activity, routing state, and resolution flow for admins and supervisors.'
      },
      {
        lead:'Role-based access',
        body:'Administrative, supervisory, agent, and read-only roles can be separated so teams only see the controls and data they actually need.'
      },
      {
        lead:'Mobile-friendly operations',
        body:'The interface can be optimized for field staff and on-call technicians who need to receive, review, and respond while away from a desktop.'
      },
      {
        lead:'Extensible control surface',
        body:'As new workflows are added, the UI can expose business-specific controls without forcing changes to the underlying telephony and orchestration primitives.'
      }
    ]
  },
];

function SceneNode({ node, scale, isActive, isCurrent, ownerColor, dimText, dimNode, dimBorder, onEnter, onLeave }: {
  node: typeof NODES[string]; scale:number; isActive:boolean; isCurrent:boolean;
  ownerColor:string; dimText:string; dimNode:string; dimBorder:string;
  onEnter:(e:React.MouseEvent)=>void; onLeave:()=>void;
}) {
  const Icon = node.icon; const {x,y} = node;
  const transform = `translate(${x},${y}) scale(${scale}) translate(${-x},${-y})`;
  return (
    <g transform={transform} style={{cursor:'pointer'}} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {isCurrent && (
        <circle cx={x} cy={y} r={NODE_R+8} fill="none" stroke={ownerColor} strokeWidth="1.5" strokeOpacity="0.5">
          <animate attributeName="r" values={`${NODE_R+4};${NODE_R+16};${NODE_R+4}`} dur="1.4s" repeatCount="indefinite"/>
          <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="1.4s" repeatCount="indefinite"/>
        </circle>
      )}
      <circle cx={x} cy={y} r={NODE_R} fill={isActive?ownerColor+'22':dimNode} stroke={isActive?ownerColor:dimBorder} strokeWidth={isActive?2:1}/>
      <foreignObject x={x-12} y={y-12} width={24} height={24} style={{pointerEvents:'none',overflow:'visible'}}>
        <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Icon style={{width:14,height:14,color:isActive?ownerColor:dimText,flexShrink:0}}/>
        </div>
      </foreignObject>
      <text x={x} y={y+NODE_R+16} textAnchor="middle" fontSize="11" fontWeight={isActive?'700':'400'} fill={isActive?ownerColor:dimText} style={{pointerEvents:'none',fontFamily:'system-ui,sans-serif'}}>{node.label}</text>
      <text x={x} y={y+NODE_R+28} textAnchor="middle" fontSize="9" fill={isActive?ownerColor+'aa':dimText+'66'} style={{pointerEvents:'none',fontFamily:'system-ui,sans-serif'}}>{node.sublabel}</text>
    </g>
  );
}

function HtmlTooltip({ node, anchorRect, isBiz }: { node:typeof NODES[string]; anchorRect:DOMRect; isBiz:boolean }) {
  const TW = 320; const PAD = 12;
  let left = anchorRect.right + 10;
  if (left + TW > window.innerWidth - PAD) left = anchorRect.left - TW - 10;
  let top = anchorRect.top + anchorRect.height/2 - 100;
  top = Math.max(PAD, Math.min(top, window.innerHeight - 340));
  const bg=isBiz?'#0f172a':'#ffffff', border=isBiz?'#334155':'#cbd5e1', title=isBiz?'#f1f5f9':'#0f172a', sub=isBiz?'#94a3b8':'#64748b', body=isBiz?'#cbd5e1':'#334155', accent=isBiz?'#38bdf8':'#2563eb';
  return (
    <div style={{position:'fixed',left,top,width:TW,zIndex:9999,background:bg,border:`1.5px solid ${border}`,borderRadius:14,padding:'16px 18px',boxShadow:isBiz?'0 8px 40px rgba(0,0,0,0.6)':'0 8px 40px rgba(0,0,0,0.15)',pointerEvents:'none',fontFamily:'system-ui,sans-serif'}}>
      <div style={{fontSize:15,fontWeight:700,color:title,marginBottom:2}}>{node.label}</div>
      <div style={{fontSize:11,color:sub,marginBottom:10}}>{node.sublabel}</div>
      <div style={{height:1,background:border,marginBottom:12}}/>
      <div style={{fontSize:10,fontWeight:700,color:accent,letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:6}}>What it does</div>
      <div style={{fontSize:13,color:body,lineHeight:1.6,marginBottom:12}}>{node.tooltip.what}</div>
      <div style={{fontSize:10,fontWeight:700,color:accent,letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:6}}>Why it matters</div>
      <div style={{fontSize:13,color:body,lineHeight:1.6}}>{node.tooltip.why}</div>
    </div>
  );
}

function StepLog({ path, animStep, scenario, isBiz }: { path:string[]; animStep:number; scenario:typeof SCENARIOS[number]; isBiz:boolean }) {
  const logRef = useRef<HTMLDivElement>(null);
  const [selectedStep, setSelectedStep] = useState<number|null>(null);
  useEffect(()=>{ setSelectedStep(null); },[scenario.id]);
  useEffect(()=>{ if (selectedStep===null && logRef.current) logRef.current.scrollTop=logRef.current.scrollHeight; },[animStep,selectedStep]);
  const revealedSteps = path.slice(0, animStep+1);
  if (revealedSteps.length===0) return <div className={`rounded-2xl border p-4 text-center text-xs ${isBiz?'border-slate-800 text-slate-600':'border-slate-200 text-slate-400'}`}>Press "Trace Path" to begin</div>;
  return (
    <div ref={logRef} className="space-y-2 max-h-72 overflow-y-auto pr-1" style={{scrollBehavior:'smooth'}}>
      {revealedSteps.map((nodeId,i)=>{
        const node=NODES[nodeId]; if(!node) return null;
        const Icon=node.icon, isCurrent=i===animStep, isSelected=selectedStep===i, isLit=isCurrent||isSelected;
        return (
          <div key={`${nodeId}-${i}`} onClick={()=>setSelectedStep(isSelected?null:i)}
            className="rounded-xl border p-3 transition-all duration-300"
            style={{background:isLit?scenario.color+'18':(isBiz?'#0f172a':'#f8fafc'),borderColor:isLit?scenario.color+'66':(isBiz?'#1e293b':'#e2e8f0'),opacity:isLit?1:0.5,cursor:isCurrent?'default':'pointer',transform:isSelected&&!isCurrent?'scale(1.01)':'scale(1)'}}>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{background:scenario.color+(isLit?'ff':'55')}}>
                <Icon style={{width:10,height:10,color:'#fff'}}/>
              </div>
              <span className="text-xs font-bold" style={{color:isLit?scenario.color:(isBiz?'#94a3b8':'#64748b')}}>{i+1}. {node.label}</span>
              <div className="ml-auto flex items-center gap-1">
                {isCurrent&&<span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{background:scenario.color+'22',color:scenario.color}}>NOW</span>}
              </div>
            </div>
            <p className="text-xs leading-relaxed pl-7" style={{color:isLit?(isBiz?'#94a3b8':'#475569'):(isBiz?'#475569':'#94a3b8')}}>{node.detail}</p>
          </div>
        );
      })}
    </div>
  );
}

function FeatureTabsCard({ isBiz }: { isBiz:boolean }) {
  const [activeTab, setActiveTab] = useState(0);
  const tab = FEATURE_TABS[activeTab];

  const cardBg = isBiz ? 'bg-slate-900/40' : 'bg-white';
  const border = isBiz ? 'border-slate-800' : 'border-slate-200';
  const muted = isBiz ? '#94a3b8' : '#64748b';
  const text = isBiz ? '#f1f5f9' : '#0f172a';
  const softBg = isBiz ? '#0f172a' : '#f8fafc';

  return (
    <div className={`rounded-3xl border overflow-hidden ${border} ${cardBg} ${isBiz ? '' : 'shadow-md'}`}>
      <div className={`flex border-b overflow-x-auto ${isBiz?'border-slate-800':'border-slate-100'}`}>
        {FEATURE_TABS.map((t,i)=>{
          const Icon=t.icon, isActive=i===activeTab;
          return (
            <button
              key={t.id}
              onClick={()=>setActiveTab(i)}
              className="flex items-center gap-2 py-4 px-4 sm:px-5 text-xs font-bold transition-all whitespace-nowrap shrink-0"
              style={{
                color:isActive?t.color:(isBiz?'#475569':'#94a3b8'),
                background:isActive?t.color+'12':'transparent',
                borderBottom:isActive?`2px solid ${t.color}`:'2px solid transparent'
              }}
            >
              <Icon style={{width:14,height:14,flexShrink:0}}/>
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-5 sm:p-6 lg:p-7">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5" style={{background:tab.color+'20', border:`1px solid ${tab.color}33`}}>
            <tab.icon style={{width:18,height:18,color:tab.color}}/>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-1" style={{color:tab.color}}>
              {tab.label}
            </p>
            <h3 className="text-lg sm:text-xl font-bold mb-2" style={{color:text}}>
              {tab.title}
            </h3>
            <p className="text-sm leading-relaxed max-w-3xl" style={{color:muted}}>
              {tab.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {tab.bullets.map((b,i)=>(
            <div
              key={i}
              className="rounded-2xl border p-4"
              style={{
                background:softBg,
                borderColor:isBiz ? '#1e293b' : '#e2e8f0'
              }}
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{background:tab.color}}/>
                <div>
                  <p className="text-sm font-semibold mb-1" style={{color:text}}>
                    {b.lead}
                  </p>
                  <p className="text-sm leading-relaxed" style={{color:muted}}>
                    {b.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CallFlowScenarios({ isBiz=true }: { isBiz?:boolean }) {
  const [activeIdx,      setActiveIdx]      = useState<number|null>(null);
  const [animStep,       setAnimStep]       = useState<number>(-1);
  const [isPlaying,      setIsPlaying]      = useState(false);
  const [isComplete,     setIsComplete]     = useState(false);
  const [hoveredNode,    setHoveredNode]    = useState<string|null>(null);
  const [tooltipAnchor,  setTooltipAnchor]  = useState<DOMRect|null>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const timeoutsRef     = useRef<ReturnType<typeof setTimeout>[]>([]);

  const activeScenario = activeIdx!==null ? SCENARIOS[activeIdx] : null;
  const activePath     = activeScenario?.path ?? [];
  const activeEdgeSet  = getPathEdgeSet(activePath);

  const clearAll = () => { timeoutsRef.current.forEach(clearTimeout); timeoutsRef.current=[]; };
  const schedule = (fn:()=>void, ms:number) => { const t=setTimeout(fn,ms); timeoutsRef.current.push(t); };

  const runAnimation = useCallback(()=>{
    if (!activeScenario) return;
    clearAll(); setAnimStep(-1); setIsComplete(false); setIsPlaying(true);
    const HOLD=1600;
    activeScenario.path.forEach((_,i)=>{ schedule(()=>setAnimStep(i), i*HOLD); });
    schedule(()=>{ setIsPlaying(false); setIsComplete(true); }, activeScenario.path.length*HOLD);
  },[activeScenario]);

  const reset = () => { clearAll(); setAnimStep(-1); setIsPlaying(false); setIsComplete(false); };
  useEffect(()=>{ reset(); },[activeIdx]);
  useEffect(()=>()=>clearAll(),[]);

  const getSvgNodeScreenRect = useCallback((nodeId:string):DOMRect|null=>{
    const node=NODES[nodeId], container=svgContainerRef.current;
    if (!node||!container) return null;
    const svgEl=container.querySelector('svg'); if (!svgEl) return null;
    const svgRect=svgEl.getBoundingClientRect();
    const scaleX=svgRect.width/1200, scaleY=svgRect.height/760;
    const cx=svgRect.left+node.x*scaleX, cy=svgRect.top+node.y*scaleY, r=NODE_R*scaleX;
    return new DOMRect(cx-r, cy-r, r*2, r*2);
  },[]);

  const handleNodeEnter = useCallback((nodeId:string)=>{
    setHoveredNode(nodeId);
    setTooltipAnchor(getSvgNodeScreenRect(nodeId));
  },[getSvgNodeScreenRect]);

  const handleNodeLeave = useCallback(()=>{ setHoveredNode(null); setTooltipAnchor(null); },[]);

  const dimText=isBiz?'#475569':'#94a3b8';
  const dimNode=isBiz?'#0f172a':'#f1f5f9';
  const dimBorder=isBiz?'#1e293b':'#e2e8f0';

  return (
    <section style={{background:isBiz?'#020617':'#f8fafc'}} className={`py-24 border-t ${isBiz?'border-slate-800':'border-slate-200'}`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p className={`text-sm font-semibold uppercase tracking-widest mb-3 ${isBiz?'text-cyan-400':'text-blue-600'}`}>Architecture in Action</p>
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${isBiz?'text-white':'text-slate-900'}`}>The Garden of Forking Calls</h2>
          <p className={`text-lg ${isBiz?'text-slate-400':'text-slate-500'}`}>Every call shares the same root. Select a scenario to illuminate its path through the system.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {SCENARIOS.map((s,i)=>{
            const Icon=s.icon, isActive=activeIdx===i;
            return (
              <button key={s.id} onClick={()=>setActiveIdx(i===activeIdx?null:i)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 hover:scale-105"
                style={{background:isActive?s.color+'22':(isBiz?'#0f172a':'#f8fafc'),borderColor:isActive?s.color:(isBiz?'#1e293b':'#e2e8f0'),color:isActive?s.color:(isBiz?'#64748b':'#94a3b8'),boxShadow:isActive?`0 0 16px ${s.color}44`:'none'}}>
                <Icon className="w-3.5 h-3.5"/>{s.title}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start mb-6">
          <div className={`flex-1 w-full rounded-3xl border overflow-hidden ${isBiz?'border-slate-800 bg-slate-900/40':'border-slate-200 bg-white shadow-xl'}`}>
            <div ref={svgContainerRef} className="w-full overflow-x-auto overflow-y-hidden">
              <svg viewBox="0 0 1200 760" className="w-full h-auto min-w-[800px] md:min-w-full" style={{display:'block'}}>
                <defs>
                  <filter id="glow" filterUnits="userSpaceOnUse" x="-100" y="-100" width="1400" height="1000">
                    <feGaussianBlur stdDeviation="4" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>

                {ALL_EDGES.map(([a,b])=>{
                  const na=NODES[a], nb=NODES[b]; if (!na||!nb) return null;
                  const key=`${a}→${b}`;
                  const isInActivePath = activeEdgeSet.has(key);
                  const edgeAnimIdx = activePath.findIndex((n,i) => i < activePath.length-1 && activePath[i]===a && activePath[i+1]===b);
                  const isLit = isInActivePath && animStep > edgeAnimIdx && edgeAnimIdx >= 0;
                  const edgeColor = isInActivePath
                    ? (activeScenario?.color ?? EDGE_SCENARIO_COLOR[key] ?? '#94a3b8')
                    : EDGE_SCENARIO_COLOR[key] ?? (isBiz ? '#334155' : '#cbd5e1');

                  return (
                    <path key={key}
                      d={cubicPath(na.x, na.y+NODE_R, nb.x, nb.y-NODE_R)}
                      fill="none"
                      stroke={edgeColor}
                      strokeWidth={isLit ? 2.5 : isInActivePath ? 1.5 : 1}
                      strokeOpacity={isLit ? 1 : isInActivePath ? 0.5 : 0.2}
                      strokeDasharray={isInActivePath && !isLit ? '5 4' : undefined}
                      filter={isLit ? 'url(#glow)' : undefined}
                    />
                  );
                })}

                {Object.values(NODES).map(node=>{
                  const pathIdx=activePath.indexOf(node.id);
                  const isAnimOn=pathIdx>=0 && animStep>=pathIdx;
                  const isCurrent=activePath[animStep]===node.id;
                  const scale=isCurrent?1.18:isAnimOn?1.06:1.0;
                  return (
                    <SceneNode key={node.id} node={node} scale={scale}
                      isActive={isAnimOn} isCurrent={isCurrent}
                      ownerColor={activeScenario?.color??'#64748b'}
                      dimText={dimText} dimNode={dimNode} dimBorder={dimBorder}
                      onEnter={()=>handleNodeEnter(node.id)}
                      onLeave={handleNodeLeave}
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="w-full lg:w-80 flex flex-col gap-4 shrink-0">
            {activeScenario ? (
              <>
                <div className="rounded-3xl border p-5" style={{background:isBiz?activeScenario.color+'0d':activeScenario.color+'08',borderColor:activeScenario.color+'44'}}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:activeScenario.color+'22',border:`1px solid ${activeScenario.color}55`}}>
                      <activeScenario.icon style={{width:16,height:16,color:activeScenario.color}}/>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider" style={{color:activeScenario.color}}>Active Scenario</p>
                      <h3 className={`font-bold text-sm ${isBiz?'text-white':'text-slate-900'}`}>{activeScenario.title}</h3>
                    </div>
                  </div>
                  <p className={`text-xs leading-relaxed mb-4 ${isBiz?'text-slate-400':'text-slate-600'}`}>{activeScenario.desc}</p>
                  <div className="flex gap-2">
                    {isComplete && (
                      <button onClick={reset} className={`p-2.5 rounded-xl border transition-all ${isBiz?'border-slate-700 text-slate-400 hover:text-white':'border-slate-200 text-slate-500'}`}>
                        <RotateCcw className="w-4 h-4"/>
                      </button>
                    )}
                    <button onClick={runAnimation} disabled={isPlaying}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{background:isPlaying?(isBiz?'#1e293b':'#f1f5f9'):activeScenario.color,color:isPlaying?(isBiz?'#475569':'#94a3b8'):'#fff',boxShadow:isPlaying?'none':`0 4px 20px ${activeScenario.color}55`}}>
                      <Play className="w-4 h-4"/>
                      {isPlaying?'Running…':isComplete?'Replay':'Trace Path'}
                    </button>
                  </div>
                </div>
                <div className={`rounded-3xl border p-4 ${isBiz?'border-slate-800 bg-slate-900/40':'border-slate-200 bg-white shadow-md'}`}>
                  <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${isBiz?'text-slate-500':'text-slate-400'}`}>Call Log</p>
                  <StepLog path={activePath} animStep={animStep} scenario={activeScenario} isBiz={isBiz}/>
                </div>
              </>
            ) : (
              <div className={`rounded-3xl border p-6 text-center ${isBiz?'border-slate-800 bg-slate-900/40':'border-slate-200 bg-white'}`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 ${isBiz?'bg-slate-800':'bg-slate-100'}`}>
                  <GitFork className={`w-6 h-6 ${isBiz?'text-slate-500':'text-slate-400'}`}/>
                </div>
                <p className={`font-bold mb-2 ${isBiz?'text-slate-300':'text-slate-700'}`}>Select a Scenario</p>
                <p className={`text-sm ${isBiz?'text-slate-500':'text-slate-500'}`}>Choose a path above to illuminate how that call type flows through the system.</p>
              </div>
            )}
          </div>
        </div>

        <FeatureTabsCard isBiz={isBiz}/>
      </div>

      {hoveredNode && tooltipAnchor && NODES[hoveredNode] && (
        <HtmlTooltip node={NODES[hoveredNode]} anchorRect={tooltipAnchor} isBiz={isBiz}/>
      )}
    </section>
  );
}