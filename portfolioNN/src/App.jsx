import { useState, useEffect, useRef } from "react";

const T = {
  pt: {
    role: "Desenvolvedor Full Stack & Automação",
    about: "Estudante de Engenharia Mecatrônica na USP São Carlos. Construo coisas que importam — de chatbots com IA a sistemas de automação que economizam horas, passando por tecnologia assistiva que muda vidas.",
    aboutMore: "Membro ativo do NEU-SC, o hub de empreendedorismo da USP. Minha missão é unir código, criatividade e impacto real.",
    projects: "Projetos",
    skills: "Arsenal",
    contact: "Contato",
    letsWork: "Vamos trabalhar juntos?",
    status: { completed: "FINALIZADO", active: "ATIVO", inDev: "EM DEV", paused: "PAUSADO" },
    scroll: "SCROLL",
    manifesto: "Fato é, não construo softwares genéricos. Cada linha de código tem propósito, cada projeto resolve um problema real.",
    footer: "Desenhado & construído com obsessão por detalhes"
  },
  en: {
    role: "Full Stack Developer & Automation",
    about: "Mechatronic Engineer student at USP São Carlos. I build things that matter — from AI chatbots to automation systems that save hours, through assistive tech that changes lives.",
    aboutMore: "Active member of NEU-SC, USP's entrepreneurship hub. My mission is to merge code, creativity, and real impact.",
    projects: "Projects",
    skills: "Arsenal",
    contact: "Contact",
    letsWork: "Let's work together?",
    status: { completed: "SHIPPED", active: "ACTIVE", inDev: "IN DEV", paused: "PAUSED" },
    scroll: "SCROLL",
    manifesto: "The fact is, I don't build generic software. Every line of code has a purpose, every project solves a real problem.",
    footer: "Designed & built with obsessive attention to detail"
  }
};

const projects = [
  { id: "01", name: "Iniciação Científica: BlindBrowser", version: "v2.0", descPt: "Sistema de navegação assistiva para deficientes visuais. Classificação de conteúdo com ~90% de acurácia.", descEn: "Assistive web navigation for visually impaired. Content classification at ~90% accuracy.", tags: ["Java", "NLP", "AI","Python"], status: "completed", accent: "#00ff88", link: "https://github.com/NogTwoo/blindbrowser-v2" },
  { id: "02", name: "Assistente Virtual: Rosinha", version: "ChatBot", descPt: "Chatbot híbrido WhatsApp/Instagram. Regras + Claude API + triagem inteligente para atendente humano.", descEn: "Hybrid WhatsApp/Instagram chatbot. Rules + Claude API + smart escalation to human agents.", tags: ["FastAPI", "Claude API", "Make.com"], status: "inDev", accent: "#ff3366"},
  { id: "03", name: "Projeto Low-Code: AutoMarketing", version: "Pipeline", descPt: "15min → 2min por post. Pipeline de automação Instagram com Google Forms, Make.com (Plataforma No-Code), Apify e Buffer.", descEn: "15min → 2min per post. Instagram automation pipeline with Google Forms, Make.com (No-code Plataform), Apify & Buffer.", tags: ["Make.com", "Apify", "Buffer"], status: "active", accent: "#00d4ff", link:"/arq_crm_automation.png"},
  { id: "04", name: "Núcleo de Empreendedorismo de São Carlos", version: "Website", descPt: "Redesign do hub de empreendedorismo da USP São Carlos. De vitrine estática para plataforma interativa.", descEn: "Redesign of USP São Carlos entrepreneurship hub. From static showcase to interactive platform.", tags: ["Frontend", "UX/UI", "Branding"], status: "active", accent: "#ffaa00", link: "https://www.neu-sc.com/" },
  { id: "05", name: "Nova", version: "Social", descPt: "Rede social gamer com integração direta a jogos, insights de performance e conexão global.", descEn: "Gamer social network with direct game integration, performance insights, and global connection.", tags: ["PHP", "HTML", "CSS", "Games"], status: "paused", accent: "#aa66ff" }
];

const skills = [
  { name: "Python", level: 78 }, { name: "Java", level: 92 }, { name: "JavaScript", level: 85 },
  { name: "React", level: 81 }, { name: "FastAPI", level: 88 }, { name: "Next.js", level: 79 },
  { name: "No-Code Plataform", level: 87 }, { name: "Claude API", level: 91 }, { name: "Git", level: 77 },
  { name: "PHP", level: 65 }, { name: "SQL", level: 70 }, { name: "CSS", level: 88 }
];

const themes = {
  dark: {
    bg:"#050508", text:"#e8e6e3",
    textDim:"rgba(232,230,227,0.55)", textMuted:"rgba(232,230,227,0.35)",
    textGhost:"rgba(232,230,227,0.2)", textFaint:"rgba(232,230,227,0.12)",
    textUltra:"rgba(232,230,227,0.06)",
    border:"rgba(232,230,227,0.05)", borderLight:"rgba(232,230,227,0.08)",
    navBg:"rgba(5,5,8,0.8)", navLabel:"rgba(232,230,227,0.3)", navInfo:"rgba(232,230,227,0.15)",
    btnBorder:"rgba(232,230,227,0.15)", btnText:"#e8e6e3", btnFill:"#e8e6e3", btnHoverText:"#050508",
    heroStroke:"1.5px rgba(232,230,227,0.3)", ghostColor:"rgba(255,51,102,0.03)",
    glowColor:"rgba(255,51,102,0.025)", scanColor:"rgba(0,255,136,0.03)",
    diagBg:"rgba(232,230,227,0.025)", quoteColor:"rgba(255,51,102,0.12)",
    scrollbar:"rgba(232,230,227,0.08)", selection:"#ff3366", selectionText:"#050508",
    activeBtn:"#e8e6e3", activeBtnText:"#050508",
    inactiveBtn:"transparent", inactiveBtnText:"rgba(232,230,227,0.25)",
    dotColor:"#00ff88", dotGlow:"rgba(0,255,136,0.5)",
    skillTrack:"rgba(232,230,227,0.04)",
  },
  light: {
    bg:"#f4f2ef", text:"#1a1a1f",
    textDim:"rgba(26,26,31,0.65)", textMuted:"rgba(26,26,31,0.4)",
    textGhost:"rgba(26,26,31,0.2)", textFaint:"rgba(26,26,31,0.1)",
    textUltra:"rgba(26,26,31,0.04)",
    border:"rgba(26,26,31,0.08)", borderLight:"rgba(26,26,31,0.1)",
    navBg:"rgba(244,242,239,0.88)", navLabel:"rgba(26,26,31,0.4)", navInfo:"rgba(26,26,31,0.3)",
    btnBorder:"rgba(26,26,31,0.18)", btnText:"#1a1a1f", btnFill:"#1a1a1f", btnHoverText:"#f4f2ef",
    heroStroke:"1.5px rgba(26,26,31,0.2)", ghostColor:"rgba(255,51,102,0.04)",
    glowColor:"rgba(139,92,246,0.03)", scanColor:"rgba(0,0,0,0.01)",
    diagBg:"rgba(26,26,31,0.02)", quoteColor:"rgba(255,51,102,0.15)",
    scrollbar:"rgba(26,26,31,0.1)", selection:"#ff3366", selectionText:"#f4f2ef",
    activeBtn:"#1a1a1f", activeBtnText:"#f4f2ef",
    inactiveBtn:"transparent", inactiveBtnText:"rgba(26,26,31,0.3)",
    dotColor:"#00cc6a", dotGlow:"rgba(0,204,106,0.4)",
    skillTrack:"rgba(26,26,31,0.06)",
  },
};

const accentMap = { "#00ff88":"#00a85a","#ff3366":"#e02050","#00d4ff":"#0090b8","#ffaa00":"#cc8800","#aa66ff":"#7744cc" };
const acc = (color, isDark) => isDark ? color : (accentMap[color] || color);

export default function Portfolio() {
  const [lang, setLang] = useState("pt");
  const [scrollY, setScrollY] = useState(0);
  const [activeProject, setActiveProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(new Date());
  const [loaded, setLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [theme, setTheme] = useState("dark");
  const isDark = theme === "dark";
  const C = themes[theme];
  const t = T[lang];

  useEffect(() => { const id = requestAnimationFrame(() => setLoaded(true)); return () => cancelAnimationFrame(id); }, []);
  useEffect(() => { const i = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(i); }, []);
  useEffect(() => { const h = () => setScrollY(window.scrollY); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { const h = (e) => setMousePos({ x: e.clientX, y: e.clientY }); window.addEventListener("mousemove", h, { passive: true }); return () => window.removeEventListener("mousemove", h); }, []);
  useEffect(() => {
    if (!loaded) return;
    const obs = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) setVisibleSections(prev => new Set([...prev, e.target.id])); }); }, { threshold: 0.1 });
    document.querySelectorAll("[data-animate]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [loaded]);
  const vis = (id) => visibleSections.has(id);

  return (
    <div style={{ background:C.bg, color:C.text, minHeight:"100vh", width:"100%", maxWidth:"100vw", overflowX:"hidden", cursor:"crosshair", transition:"background 0.5s ease, color 0.5s ease" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap" rel="stylesheet" />
      <style>{`
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth;overflow-x:hidden}
        body{overflow-x:hidden;width:100%;max-width:100vw}
        ::selection{background:${C.selection};color:${C.selectionText}}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:${C.bg}}
        ::-webkit-scrollbar-thumb{background:${C.scrollbar}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes marquee-rev{from{transform:translateX(-50%)}to{transform:translateX(0)}}
        @keyframes float-chaos{0%,100%{transform:translate(0,0) rotate(0deg)}25%{transform:translate(10px,-15px) rotate(3deg)}50%{transform:translate(-5px,8px) rotate(-2deg)}75%{transform:translate(12px,5px) rotate(1deg)}}
        @keyframes scan{0%{top:-5%}100%{top:105%}}
        @keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes glitch-1{0%,100%{clip-path:inset(0 0 95% 0)}20%{clip-path:inset(30% 0 50% 0)}40%{clip-path:inset(70% 0 10% 0)}60%{clip-path:inset(10% 0 70% 0)}80%{clip-path:inset(50% 0 30% 0)}}
        @keyframes glitch-2{0%,100%{clip-path:inset(95% 0 0 0)}20%{clip-path:inset(50% 0 30% 0)}40%{clip-path:inset(10% 0 70% 0)}60%{clip-path:inset(70% 0 10% 0)}80%{clip-path:inset(30% 0 50% 0)}}
        @keyframes flicker{0%,100%{opacity:1}92%{opacity:1}93%{opacity:0.3}94%{opacity:1}96%{opacity:0.5}97%{opacity:1}}
        @keyframes grid-pulse{0%,100%{opacity:0.03}50%{opacity:0.08}}
        .break-row{transition:all 0.3s}
        .break-word{cursor:default;transition:color 0.6s cubic-bezier(0.16,1,0.3,1),letter-spacing 0.6s cubic-bezier(0.16,1,0.3,1),text-shadow 0.6s cubic-bezier(0.16,1,0.3,1)}
        .break-line{transition:max-width 0.6s cubic-bezier(0.16,1,0.3,1),opacity 0.6s cubic-bezier(0.16,1,0.3,1)}
        .break-row:hover .break-word{letter-spacing:3px}
        .break-row:hover .break-line{max-width:180px!important;opacity:0.5!important}
        .vis-anim{opacity:0;transform:translateY(30px);transition:all 0.9s cubic-bezier(0.16,1,0.3,1)}
        .vis-anim.show{opacity:1;transform:translateY(0)}
        .project-row{display:flex;flex-direction:column;gap:8px;padding:20px 0;border-bottom:1px solid ${C.border};cursor:pointer;transition:all 0.5s cubic-bezier(0.16,1,0.3,1);position:relative}
        .project-row::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:currentColor;transition:width 0.6s cubic-bezier(0.16,1,0.3,1)}
        .project-row:hover::after{width:100%}
        .mag-btn{position:relative;padding:14px 36px;background:transparent;border:1px solid ${C.btnBorder};color:${C.btnText};font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;overflow:hidden;transition:all 0.4s}
        .mag-btn::before{content:'';position:absolute;top:50%;left:50%;width:0;height:0;background:${C.btnFill};border-radius:50%;transform:translate(-50%,-50%);transition:width 0.5s,height 0.5s}
        .mag-btn:hover{color:${C.btnHoverText};border-color:${C.btnFill}}
        .mag-btn:hover::before{width:400px;height:400px}
        .mag-btn span{position:relative;z-index:1}
        .tag-p{display:inline-block;padding:3px 10px;border:1px solid;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:1px}
        .scan-l{position:fixed;left:0;width:100%;height:2px;background:linear-gradient(90deg,transparent,${C.scanColor},transparent);pointer-events:none;z-index:9998;animation:scan 8s linear infinite}
        .vtext{writing-mode:vertical-rl;text-orientation:mixed;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:${C.textFaint}}
        .hm{display:none!important}
        .about-g{grid-template-columns:1fr!important}
        .sk-g{grid-template-columns:1fr!important}
        .hero-n{font-size:clamp(38px,11vw,130px)!important}
        .theme-btn{display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;border:1px solid ${C.borderLight};background:transparent;cursor:pointer;transition:all 0.3s;font-size:14px;flex-shrink:0;line-height:1}
        .theme-btn:hover{border-color:${C.textGhost};background:${isDark?"rgba(232,230,227,0.05)":"rgba(26,26,31,0.05)"};transform:rotate(20deg)}
        @media(min-width:768px){
          .about-g{grid-template-columns:1fr 1.2fr!important}
          .sk-g{grid-template-columns:1fr 1fr!important}
        }
        @media(min-width:1200px){
          .hm{display:initial!important}
          .about-g{grid-template-columns:1fr 1.4fr!important}
          .project-row{display:grid!important;grid-template-columns:60px 1.2fr 2fr auto!important;align-items:center;gap:20px;padding:24px 0;flex-direction:unset}
          .project-row:hover{padding-left:16px}
        }

          .diag-text {
           transition: color 0.4s ease, text-shadow 0.4s ease;
           cursor: default;
          }
      `}</style>

      <div className="scan-l"/>
      <div style={{position:"fixed",width:"280px",height:"280px",borderRadius:"50%",background:`radial-gradient(circle,${C.glowColor} 0%,transparent 70%)`,transform:`translate(${mousePos.x-140}px,${mousePos.y-140}px)`,pointerEvents:"none",zIndex:2,transition:"transform 0.12s ease-out"}}/>

      {/* ═══ TOP BAR ═══ */}
      <nav style={{position:"fixed",top:0,left:0,right:0,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 20px",background:C.navBg,backdropFilter:"blur(30px)",WebkitBackdropFilter:"blur(30px)",borderBottom:`1px solid ${C.border}`,zIndex:100,fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",letterSpacing:"1px",transition:"background 0.5s, border-color 0.5s"}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px",minWidth:0}}>
          <div style={{width:"6px",height:"6px",borderRadius:"50%",background:C.dotColor,boxShadow:`0 0 8px ${C.dotGlow}`,animation:"pulse-dot 2s ease infinite",flexShrink:0}}/>
          <span style={{color:C.navLabel,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>NICHOLAS://PORTFOLIO</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"12px",flexShrink:0}}>
          <span className="hm" style={{color:C.navInfo,whiteSpace:"nowrap"}}>{time.toLocaleTimeString("en-US",{hour12:false})} · SÃO CARLOS</span>
          <button className="theme-btn" onClick={()=>setTheme(isDark?"light":"dark")} title={isDark?"Light mode":"Dark mode"}>
            {isDark ? "☀" : "☾"}
          </button>
          <div style={{display:"flex",border:`1px solid ${C.borderLight}`}}>
            {["pt","en"].map(l=>(
              <button key={l} onClick={()=>setLang(l)} style={{padding:"5px 11px",border:"none",borderLeft:l==="en"?`1px solid ${C.borderLight}`:"none",cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",fontSize:"9px",letterSpacing:"2px",fontWeight:700,background:lang===l?C.activeBtn:C.inactiveBtn,color:lang===l?C.activeBtnText:C.inactiveBtnText,transition:"all 0.3s"}}>{l.toUpperCase()}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{minHeight:"100dvh",display:"flex",flexDirection:"column",justifyContent:"center",position:"relative",padding:"80px 20px 50px",overflow:"hidden",width:"100%"}}>
        {[18,38,58,78].map((top,i)=>(<div key={i} style={{position:"absolute",width:"200%",height:"1px",background:C.diagBg,top:`${top}%`,left:"-50%",transform:`rotate(${-12+i*2.5}deg)`,transformOrigin:"center",pointerEvents:"none"}}/>))}
        <div className="vtext hm" style={{position:"absolute",right:"28px",top:"50%",transform:`translateY(calc(-50% + ${scrollY*0.08}px))`}}>USP SÃO CARLOS — 2025</div>
        <div style={{opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(30px)",transition:"all 0.8s cubic-bezier(0.16,1,0.3,1)",maxWidth:"100%"}}>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",letterSpacing:"5px",color:C.textGhost,textTransform:"uppercase",marginBottom:"18px",marginLeft:"3px"}}>{t.role}</div>
          <h1 className="hero-n" style={{fontFamily:"'Playfair Display',serif",fontWeight:900,lineHeight:0.88,letterSpacing:"-2px",position:"relative",overflowWrap:"break-word",wordBreak:"break-word"}}>
            <span style={{display:"block",transform:`translateX(${scrollY*-0.04}px)`,transition:"transform 0.08s linear"}}>NICHOLAS</span>
            <span style={{display:"block",fontStyle:"italic",color:"transparent",WebkitTextStroke:C.heroStroke,transform:`translateX(${scrollY*0.06}px)`,transition:"transform 0.08s linear",marginLeft:"8%"}}>NOGUEIRA</span>
          </h1>
          <div className="hm" style={{position:"absolute",right:"12%",top:"30%",fontFamily:"'Playfair Display',serif",fontSize:"180px",fontWeight:900,color:C.ghostColor,lineHeight:1,transform:`translateY(${scrollY*-0.15}px)`,pointerEvents:"none"}}>N</div>
        </div>
        <div style={{position:"absolute",bottom:"28px",left:"20px",display:"flex",alignItems:"center",gap:"12px",opacity:loaded?1:0,transition:"opacity 1s ease 0.5s"}}>
          <div style={{width:"1px",height:"36px",background:`linear-gradient(to bottom,${C.textGhost},transparent)`}}/>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"9px",letterSpacing:"3px",color:C.textGhost}}>{t.scroll} ↓</span>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div style={{overflow:"hidden",padding:"14px 0",borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,width:"100%"}}>
        <div style={{display:"flex",width:"max-content",animation:"marquee 22s linear infinite"}}>
          {Array(4).fill(null).map((_,i)=>(<span key={i} style={{fontFamily:"'Playfair Display',serif",fontSize:"13px",fontStyle:"italic",color:C.textUltra,letterSpacing:"6px",textTransform:"uppercase",whiteSpace:"nowrap",padding:"0 36px"}}>DEVELOPER ✦ AUTOMATION ✦ AI ✦ GAMES ✦ ACCESSIBILITY ✦ ENTREPRENEUR ✦&nbsp;</span>))}
        </div>
      </div>

      {/* ═══ ABOUT ═══ */}
      <section id="s-about" data-animate className={`about-g vis-anim ${vis("s-about")?"show":""}`} style={{display:"grid",gap:0,minHeight:"auto",position:"relative",width:"100%"}}>
        <div style={{padding:"48px 20px",display:"flex",flexDirection:"column",justifyContent:"center",borderBottom:`1px solid ${C.border}`}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"48px",color:C.quoteColor,lineHeight:1,marginBottom:"-12px"}}>"</div>
          <p style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(17px,2.2vw,28px)",fontStyle:"italic",lineHeight:1.55,color:C.textDim}}>{t.manifesto}</p>
        </div>
        <div style={{padding:"48px 20px",display:"flex",flexDirection:"column",justifyContent:"center",gap:"18px"}}>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",letterSpacing:"4px",color:acc("#00ff88",isDark),textTransform:"uppercase",marginBottom:"4px"}}>// {lang==="pt"?"SOBRE":"ABOUT"}</div>
          <p style={{color:C.textDim,lineHeight:1.85,fontSize:"14px",fontFamily:"'Outfit',sans-serif"}}>{t.about}</p>
          <p style={{color:C.textMuted,lineHeight:1.85,fontSize:"14px",fontFamily:"'Outfit',sans-serif"}}>{t.aboutMore}</p>
          <div style={{display:"flex",gap:"24px",marginTop:"16px",flexWrap:"wrap"}}>
            {[{n:"5+",l:lang==="pt"?"Projetos":"Projects"},{n:"3+",l:lang==="pt"?"Techs IA":"AI Techs"},{n:"~90%",l:lang==="pt"?"Acurácia":"Accuracy"}].map((s,i)=>(
              <div key={i}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"26px",fontWeight:900}}>{s.n}</div>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"9px",letterSpacing:"2px",color:C.textGhost,textTransform:"uppercase",marginTop:"3px"}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hm" style={{position:"absolute",top:"-24px",left:"calc(50% - 50px)",width:"100px",height:"100px",border:`1px solid ${C.border}`,transform:"rotate(45deg)",animation:"float-chaos 14s ease-in-out infinite"}}/>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section id="s-proj" data-animate style={{padding:"64px 20px",position:"relative",width:"100%"}} className={`vis-anim ${vis("s-proj")?"show":""}`}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"36px",flexWrap:"wrap",gap:"8px"}}>
          <div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",letterSpacing:"4px",color:acc("#ff3366",isDark),textTransform:"uppercase",marginBottom:"10px"}}>// {t.projects}</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,5vw,52px)",fontWeight:900,letterSpacing:"-1px"}}>{lang==="pt"?"O que eu construo":"What I build"}</h2>
          </div>
          <div className="hm" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",color:C.textFaint}}>[ {projects.length} ]</div>
        </div>
        <div className="hm" style={{display:"grid",gridTemplateColumns:"60px 1.2fr 2fr auto",gap:"20px",padding:"0 0 10px",borderBottom:`1px solid ${C.borderLight}`,fontFamily:"'JetBrains Mono',monospace",fontSize:"9px",letterSpacing:"3px",color:C.textFaint,textTransform:"uppercase"}}>
          <span>Nº</span><span>{lang==="pt"?"Projeto":"Project"}</span><span>{lang==="pt"?"Descrição":"Description"}</span><span>Status</span>
        </div>
        {projects.map((p,i)=>(
          <div key={p.id} className="project-row" style={{color:activeProject===i?acc(p.accent,isDark):"inherit",opacity:vis("s-proj")?1:0,transform:vis("s-proj")?"translateX(0)":"translateX(-15px)",transition:`all 0.6s cubic-bezier(0.16,1,0.3,1) ${i*0.1}s`,borderBottomColor:C.border}} onMouseEnter={()=>setActiveProject(i)} onMouseLeave={()=>setActiveProject(null)}>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"11px",color:C.textFaint}}>{p.id}</span>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",fontWeight:700}}>{p.link?<a href={p.link} target="_blank" rel="noopener noreferrer" style={{color:"inherit",textDecoration:"none",borderBottom:activeProject===i?`1px solid ${acc(p.accent,isDark)}`:"1px solid transparent",transition:"border-color 0.3s"}}>{p.name}<span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"8px",marginLeft:"6px",opacity:0.5}}>↗</span></a>:p.name}<span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"9px",fontWeight:400,color:C.textGhost,marginLeft:"8px"}}>{p.version}</span></div>
              <div style={{display:"flex",gap:"6px",marginTop:"6px",flexWrap:"wrap"}}>
                {p.tags.map((tag,j)=>(<span key={j} className="tag-p" style={{borderColor:activeProject===i?acc(p.accent,isDark):C.borderLight,color:activeProject===i?acc(p.accent,isDark):C.textGhost}}>{tag}</span>))}
              </div>
            </div>
            <p style={{fontFamily:"'Outfit',sans-serif",fontSize:"13px",color:C.textMuted,lineHeight:1.7}}>{lang==="pt"?p.descPt:p.descEn}</p>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"9px",letterSpacing:"2px",color:acc(p.accent,isDark),textTransform:"uppercase",whiteSpace:"nowrap"}}>{t.status[p.status]}</div>
          </div>
        ))}
      </section>

      {/* ═══ DIAGONAL BREAK ═══ */}
      <div id="s-break" data-animate style={{position:"relative",height:"clamp(220px,30vw,360px)",overflow:"hidden",width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"clamp(4px,1vw,10px)"}} className={`vis-anim ${vis("s-break")?"show":""}`}>
        {/* Background grid dots */}
        <div style={{position:"absolute",inset:0,backgroundImage:`radial-gradient(circle,${isDark?"rgba(255,51,102,0.06)":"rgba(255,51,102,0.08)"} 1px,transparent 1px)`,backgroundSize:"32px 32px",animation:"grid-pulse 6s ease infinite",pointerEvents:"none"}}/>
        {/* Diagonal lines */}
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
          <line x1="0" y1="100%" x2="100%" y2="0" stroke={isDark?"rgba(255,51,102,0.06)":"rgba(255,51,102,0.08)"} strokeWidth="1"/>
          <line x1="0" y1="0" x2="100%" y2="100%" stroke={isDark?"rgba(0,212,255,0.06)":"rgba(0,180,220,0.08)"} strokeWidth="1"/>
          <line x1="50%" y1="0" x2="100%" y2="100%" stroke={isDark?"rgba(0,255,136,0.04)":"rgba(0,200,120,0.06)"} strokeWidth="1"/>
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke={C.border} strokeWidth="1" strokeDasharray="4 8"/>
        </svg>
        {/* Gradient overlays */}
        <div style={{position:"absolute",inset:0,background:`linear-gradient(135deg,${isDark?"rgba(255,51,102,0.03)":"rgba(255,51,102,0.04)"} 0%,transparent 40%,${isDark?"rgba(0,212,255,0.03)":"rgba(0,180,220,0.04)"} 100%)`,pointerEvents:"none"}}/>
        <div style={{position:"absolute",left:0,right:0,top:0,height:"1px",background:`linear-gradient(90deg,transparent,${acc("#ff3366",isDark)},transparent)`,opacity:0.3}}/>
        <div style={{position:"absolute",left:0,right:0,bottom:0,height:"1px",background:`linear-gradient(90deg,transparent,${acc("#00d4ff",isDark)},transparent)`,opacity:0.3}}/>
        {/* Main words */}
        {[
          {word:"CODE",color:"#ff3366",delay:"0s",dir:-1},
          {word:"CREATE",color:"#00ff88",delay:"0.12s",dir:-1},
          {word:"INNOVATE",color:"#00d4ff",delay:"0.24s",dir:-1}
        ].map((item,i)=>(
          <div key={item.word} className="break-row" style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:"clamp(12px,3vw,32px)",opacity:vis("s-break")?1:0,transform:vis("s-break")?`translateY(${scrollY*0.008*item.dir}px)`:`translateY(20px)`,transition:`opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${item.delay}, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${item.delay}`}}>
            <div className="break-line" style={{height:"1px",flex:1,maxWidth:"100px",background:`linear-gradient(90deg,transparent,${acc(item.color,isDark)})`,opacity:0.3}}/>
            <span className="break-word" style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(38px,9vw,100px)",fontWeight:900,letterSpacing:"-2px",color:C.textUltra,textTransform:"uppercase",lineHeight:1}} onMouseEnter={e=>{e.target.style.color=acc(item.color,isDark);e.target.style.textShadow=`0 0 40px ${acc(item.color,isDark)}22`}} onMouseLeave={e=>{e.target.style.color=C.textUltra;e.target.style.textShadow="none"}}>{item.word}</span>
            <div className="break-line" style={{height:"1px",flex:1,maxWidth:"100px",background:`linear-gradient(270deg,transparent,${acc(item.color,isDark)})`,opacity:0.3}}/>
          </div>
        ))}
        {/* Corner accents */}
        <div style={{position:"absolute",top:"16px",left:"16px",width:"20px",height:"20px",borderTop:`1px solid ${acc("#ff3366",isDark)}`,borderLeft:`1px solid ${acc("#ff3366",isDark)}`,opacity:0.25}}/>
        <div style={{position:"absolute",bottom:"16px",right:"16px",width:"20px",height:"20px",borderBottom:`1px solid ${acc("#00d4ff",isDark)}`,borderRight:`1px solid ${acc("#00d4ff",isDark)}`,opacity:0.25}}/>
      </div>

      {/* ═══ SKILLS ═══ */}
      <section id="s-skills" data-animate style={{padding:"64px 20px",maxWidth:"860px",margin:"0 auto",width:"100%"}} className={`vis-anim ${vis("s-skills")?"show":""}`}>
        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",letterSpacing:"4px",color:acc("#00d4ff",isDark),textTransform:"uppercase",marginBottom:"10px"}}>// {t.skills}</div>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,5vw,52px)",fontWeight:900,letterSpacing:"-1px",marginBottom:"40px"}}>{lang==="pt"?"Meu arsenal":"My arsenal"}</h2>
        <div className="sk-g" style={{display:"grid",gap:"14px 40px"}}>
          {skills.map((s,i)=>(
            <div key={s.name} style={{opacity:vis("s-skills")?1:0,transform:vis("s-skills")?"translateY(0)":"translateY(16px)",transition:`all 0.5s cubic-bezier(0.16,1,0.3,1) ${i*0.06}s`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:"6px"}}>
                <span style={{fontFamily:"'Outfit',sans-serif",fontSize:"13px",fontWeight:500,color:C.textDim}}>{s.name}</span>
                <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",color:C.textFaint}}>{s.level}</span>
              </div>
              <div style={{height:"2px",background:C.skillTrack,overflow:"hidden"}}>
                <div style={{height:"100%",width:vis("s-skills")?`${s.level}%`:"0%",background:"linear-gradient(90deg,#ff3366,#00d4ff)",transition:`width 1.4s cubic-bezier(0.16,1,0.3,1) ${i*0.06+0.2}s`}}/>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="s-contact" data-animate style={{padding:"80px 20px",textAlign:"center",position:"relative",width:"100%"}} className={`vis-anim ${vis("s-contact")?"show":""}`}>
        <div style={{position:"absolute",top:"50%",left:"50%",width:"300px",height:"300px",borderRadius:"50%",background:`radial-gradient(circle,${C.glowColor} 0%,transparent 70%)`,transform:"translate(-50%,-50%)",pointerEvents:"none"}}/>
        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",letterSpacing:"4px",color:acc("#ffaa00",isDark),textTransform:"uppercase",marginBottom:"10px"}}>// {t.contact}</div>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,5vw,48px)",fontWeight:900,marginBottom:"36px"}}>{t.letsWork}</h2>
        <div style={{display:"flex",justifyContent:"center",gap:"16px",flexWrap:"wrap",marginBottom:"36px"}}>
          {[{label:"EMAIL",href:"mailto:nicholasnogueira48@gmail.com"},{label:"GITHUB",href:"https://github.com/NogTwoo"},{label:"LINKEDIN",href:"https://www.linkedin.com/in/nicholas-nogueira-936538128"}].map(l=>(
            <a key={l.label} href={l.href} target={l.label!=="EMAIL"?"_blank":undefined} rel="noopener noreferrer" style={{textDecoration:"none"}}><button className="mag-btn"><span>{l.label}</span></button></a>
          ))}
        </div>
        <p style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"11px",color:C.textFaint,letterSpacing:"1px"}}>nicholasnogueira48@gmail.com</p>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{padding:"18px 20px",borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"8px",width:"100%",transition:"border-color 0.5s"}}>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"9px",letterSpacing:"2px",color:C.textFaint}}>© 2026 NICHOLAS NOGUEIRA</span>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"9px",letterSpacing:"1px",color:C.textUltra}}>{t.footer}</span>
      </footer>
    </div>
  );
}