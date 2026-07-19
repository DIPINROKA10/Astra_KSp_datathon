import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquareCode, 
  Send, 
  Trash2, 
  User, 
  Bot, 
  Terminal, 
  ChevronRight, 
  ChevronDown,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Fingerprint,
  X,
  Menu
} from 'lucide-react';
import { CopilotMessage } from '../types';

export default function CopilotView() {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: "msg-1",
      sender: "user",
      content: "Show me all chain snatching incidents in Mysuru from 2024",
      timestamp: "09:02 AM"
    },
    {
      id: "msg-2",
      sender: "assistant",
      content: "Here is the spatiotemporal intelligence analysis for your query: \"Show me all chain snatching incidents in Mysuru from 2024\".\n\nOur intelligence system processed this request offline. Standard historical data points to recurring theft patterns inside the city center. A review of recent spatiotemporal clusters indicates consistent activity around commercial complexes.\n\nTwo notable incidents were retrieved matching these characteristics:\n\n1. Under [FIR-2024-MYS-0055], a gold chain (32g) was stolen near the [Suburban Bus Stand, Mysuru] by two helmet-clad suspects operating a black Pulsar motorcycle.\n2. Under [FIR-2024-MYS-0041], a Honda Activa [KA-09-EF-5532] was stolen, which CrimeGAT link predictions associate with the same suspect chain-snatching syndicate.",
      timestamp: "09:02 AM",
      reasoningSteps: [
        { agent: "Supervisor", content: "Analyzing user query and routing to specialized tools..." },
        { agent: "SQL-Agent", content: "Searching database for relevant spatiotemporal incidents..." },
        { agent: "Vector-Agent", content: "Computing cosine similarity for MO matching..." },
        { agent: "Synthesis", content: "Compiling findings and drafting final brief..." }
      ],
      entities: [
        { id: "e-2", label: "FIR-2024-MYS-0055", type: "EVENT" },
        { id: "l-2", label: "Suburban Bus Stand, Mysuru", type: "LOCATION" },
        { id: "v-2", label: "KA-09-EF-5532", type: "OBJECT" }
      ]
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [showTemplates, setShowTemplates] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    {
      title: "Statutes query",
      text: "Which BNS section applies to daytime robbery with duplicate keys?"
    },
    {
      title: "Network query",
      text: "Analyze connections for suspect Mohammed Rafi and list any predicted links."
    },
    {
      title: "Outbreak query",
      text: "Check for any active crime spikes in Bengaluru Urban last week."
    }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, currentStep]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;
    setShowTemplates(false);

    const userMsg: CopilotMessage = {
      id: `msg-usr-${Date.now()}`,
      sender: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (!isTyping || currentStep === -1) return;

    const stepsCount = 4;
    if (currentStep < stepsCount) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const lastUserText = messages[messages.length - 1].content.toLowerCase();
      let responseText = "";
      let responseEntities: any[] = [];

      if (lastUserText.includes('bns') || lastUserText.includes('statute')) {
        responseText = "Under the new Bharatiya Nyaya Sanhita (BNS) 2024, daytime theft with keys or duplicate instruments is governed under Section 303 (Theft) and Section 305 (Snatching under aggravating circumstances).\n\nThis maps directly to legacy Section 379 and Section 380 of the Indian Penal Code (IPC). Any duplicate key intrusion also triggers trespass charges under Section 329 (BNS).";
        responseEntities = [{ id: "e-3", label: "Section 303 (BNS)", type: "EVENT" }];
      } else if (lastUserText.includes('rafi') || lastUserText.includes('connections')) {
        responseText = "A POLE network analysis of suspect Mohammed Rafi (aliases: 'Chhota Rafi') reveals strong criminal associations:\n\n- Confirmed co-accused in [FIR-2024-BNG-0145] for synthetic drug peddling in Koramangala.\n- CrimeGAT models flagged a high probability (78%) relationship linking Rafi to Vikram Sen, based on shared usage timelines of a black Pulsar motorcycle registered as [KA-05-MG-1234].";
        responseEntities = [
          { id: "p-1", label: "Mohammed Rafi", type: "PERSON" },
          { id: "p-3", label: "Vikram Sen", type: "PERSON" },
          { id: "v-1", label: "KA-05-MG-1234", type: "OBJECT" }
        ];
      } else if (lastUserText.includes('spike') || lastUserText.includes('bengaluru')) {
        responseText = "An alert has been generated for Bengaluru Urban based on statistical z-score evaluation:\n\n- Cybercrime incidents have spiked to 24 active cases in the last 7 days (z = 3.42), which is 142% above the baseline weekly mean. Most cases follow the identical electricity disconnection phishing link MO.\n- Officers are advised to cross-reference with mule accounts in [FIR-2024-BNG-0104].";
        responseEntities = [
          { id: "fir-2", label: "FIR-2024-BNG-0104", type: "EVENT" },
          { id: "alert-1", label: "Cybercrime Outbreak", type: "EVENT" }
        ];
      } else {
        responseText = `Processed intelligence analysis for your request: "${messages[messages.length - 1].content}".\n\nI scanned the KSP database offline. No critical anomalies or alarms have been triggered on this specific query. I recommend searching using specific suspect names, vehicle registration plates, or district references for detailed POLE mappings.`;
      }

      const timer = setTimeout(() => {
        const assistantMsg: CopilotMessage = {
          id: `msg-ast-${Date.now()}`,
          sender: "assistant",
          content: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          reasoningSteps: [
            { agent: "Supervisor", content: "Analyzing user query and routing to specialized tools..." },
            { agent: "SQL-Agent", content: "Searching database for relevant spatiotemporal incidents..." },
            { agent: "Vector-Agent", content: "Computing cosine similarity for MO matching..." },
            { agent: "Synthesis", content: "Compiling findings and drafting final brief..." }
          ],
          entities: responseEntities
        };

        setMessages(prev => [...prev, assistantMsg]);
        setIsTyping(false);
        setCurrentStep(-1);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isTyping, currentStep]);

  const handleClear = () => {
    setMessages([
      {
        id: "msg-init",
        sender: "assistant",
        content: "ASTRA Copilot initialized. Ask me about criminal networks, suspicious vehicles, spatiotemporal forecasting, or legal statutes matching the Bharatiya Nyaya Sanhita (BNS) 2024.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="flex-1 bg-[#090b11] h-screen flex overflow-hidden font-sans text-slate-300 relative">
      
      {/* Desktop Template Sidebar */}
      <div className="hidden md:flex w-72 bg-[#0c0e17] border-r border-[#1e293b]/40 h-full p-6 flex-col shrink-0">
        <h2 className="text-sm font-bold text-white mb-4">Investigative Copilot</h2>
        <p className="text-xs text-slate-500 mb-6 font-sans leading-relaxed">
          Ask natural-language questions to parse both structured databases and unstructured FIR contents entirely air-gapped.
        </p>

        <div className="h-px bg-slate-800/80 mb-6" />

        <h3 className="text-[10px] text-slate-400 font-mono tracking-wider font-bold uppercase mb-3">
          Example Queries
        </h3>
        <div className="flex-1 space-y-3 overflow-y-auto">
          {samplePrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p.text)}
              disabled={isTyping}
              className="w-full text-left p-3.5 bg-[#121624] border border-[#1e293b]/40 rounded-xl hover:border-blue-500/40 hover:bg-blue-500/5 transition-all text-xs font-sans group disabled:opacity-50"
            >
              <span className="font-bold text-white block group-hover:text-blue-400 transition-colors mb-1">
                {p.title}
              </span>
              <p className="text-slate-400 leading-normal truncate">{p.text}</p>
              <div className="flex items-center gap-1 text-[10px] text-blue-500/70 mt-2 font-mono group-hover:text-blue-400 transition-all">
                <span>Select query</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Template Overlay */}
      {showTemplates && (
        <div className="md:hidden fixed inset-0 bg-black/60 z-30" onClick={() => setShowTemplates(false)} />
      )}
      {showTemplates && (
        <div className="md:hidden fixed left-0 top-12 bottom-0 w-72 max-w-[85vw] bg-[#0c0e17] border-r border-[#1e293b]/40 p-5 flex flex-col z-40 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white">Example Queries</h2>
            <button onClick={() => setShowTemplates(false)} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto">
            {samplePrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p.text)}
                disabled={isTyping}
                className="w-full text-left p-3 bg-[#121624] border border-[#1e293b]/40 rounded-xl hover:border-blue-500/40 hover:bg-blue-500/5 transition-all text-xs font-sans group disabled:opacity-50"
              >
                <span className="font-bold text-white block group-hover:text-blue-400 transition-colors mb-1">
                  {p.title}
                </span>
                <p className="text-slate-400 leading-normal truncate">{p.text}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main chat interface */}
      <div className="flex-1 flex flex-col h-full bg-[#07090e] overflow-hidden">
        {/* Chat Header */}
        <div className="h-14 md:h-16 bg-[#0c0e17] border-b border-[#1e293b]/40 px-3 md:px-6 flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <button 
              onClick={() => setShowTemplates(true)}
              className="md:hidden p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors shrink-0"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="p-1.5 md:p-2 bg-blue-600/10 rounded-lg text-blue-400 border border-blue-500/10 shrink-0">
              <MessageSquareCode className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xs md:text-sm font-bold text-white font-sans">ASTRA Copilot</h2>
              <p className="text-[9px] md:text-[10px] text-slate-500 font-mono hidden sm:block">Multi-agent crime intelligence assistant</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs font-mono shrink-0">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="hidden sm:inline">Connected (Local)</span>
              <span className="sm:hidden">Online</span>
            </span>
            <button 
              onClick={handleClear}
              className="flex items-center gap-1 px-2 py-1 text-slate-500 hover:text-red-400 hover:bg-slate-800/40 rounded transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-4 md:space-y-6">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div 
                key={msg.id}
                className={`flex gap-3 md:gap-4 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center shrink-0 border shadow-lg ${
                  isUser 
                    ? 'bg-blue-600 border-blue-500 text-white' 
                    : 'bg-[#121624] border-slate-800 text-blue-400'
                }`}>
                  {isUser ? <User className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <Bot className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                </div>

                <div className="space-y-2 min-w-0 max-w-[85%] md:max-w-none">
                  {msg.reasoningSteps && msg.reasoningSteps.length > 0 && (
                    <div className="bg-[#121624]/60 border border-slate-800/60 rounded-xl p-3 md:p-4 max-w-xl font-mono text-[10px] md:text-xs overflow-x-auto">
                      <div className="flex items-center gap-1.5 text-slate-400 mb-2 md:mb-3 pb-1 border-b border-slate-800">
                        <Terminal className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span className="font-bold tracking-tight">Agent Execution Pipeline</span>
                      </div>
                      <div className="space-y-1.5 md:space-y-2">
                        {msg.reasoningSteps.map((step, index) => (
                          <div key={index} className="flex gap-1.5 md:gap-2">
                            <span className="text-blue-400 font-bold min-w-[60px] md:min-w-[80px] shrink-0">
                              &gt; {step.agent}:
                            </span>
                            <span className="text-slate-400">{step.content}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={`p-3 md:p-4.5 rounded-2xl shadow-md text-[11px] md:text-xs leading-relaxed max-w-xl font-sans ${
                    isUser 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-[#121624] border border-[#1e293b]/40 text-slate-200'
                  }`}>
                    <p className="whitespace-pre-line">
                      {msg.content.split(/(\[.*?\])/).map((part, i) => {
                        if (part.startsWith('[') && part.endsWith(']')) {
                          const label = part.slice(1, -1);
                          const entity = msg.entities?.find(e => e.label === label);
                          const isPerson = entity?.type === 'PERSON';
                          const isLoc = entity?.type === 'LOCATION';
                          return (
                            <span 
                              key={i} 
                              className={`px-1 md:px-1.5 py-0.5 rounded font-mono font-bold mx-0.5 cursor-pointer inline-flex items-center ${
                                isUser 
                                  ? 'bg-blue-800 text-white border border-blue-900'
                                  : isPerson
                                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                  : isLoc
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              }`}
                              title={`Click to view ${entity?.type || 'Entity'}`}
                            >
                              {label}
                            </span>
                          );
                        }
                        return part;
                      })}
                    </p>
                  </div>

                  <span className="text-[8px] md:text-[9px] text-slate-500 block font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 md:gap-4 max-w-3xl mr-auto">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#121624] border-slate-800 text-blue-400 flex items-center justify-center shrink-0 shadow-lg border">
                <Bot className="w-3.5 h-3.5 md:w-4 md:h-4 animate-pulse" />
              </div>

              <div className="space-y-2 md:space-y-3 font-mono text-[10px] md:text-xs w-full min-w-0">
                <div className="bg-[#121624]/60 border border-slate-800/60 rounded-xl p-3 md:p-4 max-w-xl overflow-x-auto">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-2 md:mb-3 pb-1 border-b border-slate-800">
                    <Terminal className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="font-bold tracking-tight">Agent Execution Pipeline</span>
                  </div>
                  
                  <div className="space-y-1.5 md:space-y-2">
                    {currentStep >= 0 && (
                      <div className="flex gap-1.5 md:gap-2">
                        <span className="text-blue-400 font-bold min-w-[60px] md:min-w-[80px] shrink-0">&gt; Supervisor:</span>
                        <span className="text-slate-400 animate-pulse">Analyzing query...</span>
                      </div>
                    )}
                    {currentStep >= 1 && (
                      <div className="flex gap-1.5 md:gap-2">
                        <span className="text-blue-400 font-bold min-w-[60px] md:min-w-[80px] shrink-0">&gt; SQL-Agent:</span>
                        <span className="text-slate-400 animate-pulse">Searching database...</span>
                      </div>
                    )}
                    {currentStep >= 2 && (
                      <div className="flex gap-1.5 md:gap-2">
                        <span className="text-blue-400 font-bold min-w-[60px] md:min-w-[80px] shrink-0">&gt; Vector-Agent:</span>
                        <span className="text-slate-400 animate-pulse">Computing patterns...</span>
                      </div>
                    )}
                    {currentStep >= 3 && (
                      <div className="flex gap-1.5 md:gap-2">
                        <span className="text-blue-400 font-bold min-w-[60px] md:min-w-[80px] shrink-0">&gt; Synthesis:</span>
                        <span className="text-slate-400 animate-pulse">Drafting response...</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-500 font-mono text-[9px] md:text-[10px]">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span>ASTRA is synthesizing...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input area */}
        <div className="p-3 md:p-4 border-t border-[#1e293b]/40 bg-[#0c0e17] shrink-0">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Ask about crime patterns, suspects..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend(inputText);
                }}
                disabled={isTyping}
                className="w-full bg-[#141a2e] text-white text-xs md:text-sm py-3 md:py-3.5 pl-3 md:pl-4 pr-12 md:pr-14 rounded-xl border border-[#1e293b]/60 focus:outline-none focus:border-blue-500 font-sans"
              />
              <button
                onClick={() => handleSend(inputText)}
                disabled={isTyping || !inputText.trim()}
                className="absolute right-2 md:right-3 p-1.5 md:p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>
            </div>
            <p className="text-[9px] md:text-[10px] text-slate-500 text-center mt-2 font-mono">
              AI-generated responses. Verify independently. All queries audited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
