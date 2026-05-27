import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

// ─── SHARED ──────────────────────────────────────────────────────────────────
function Badge({ children }) {
  return (
    <span style={{ display:"inline-block", padding:"6px 18px", fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", background:"rgba(200,169,110,0.1)", color:"#c8a96e", borderRadius:100, border:"1px solid rgba(200,169,110,0.25)", fontFamily:"'DM Sans',sans-serif" }}>
      {children}
    </span>
  )
}

function Divider() {
  return <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,#1e1e1e 30%,#1e1e1e 70%,transparent)" }} />
}

function NeoButton({ children, href, small, onClick, variant="gold" }) {
  const colors = {
    gold:    { bg:"#c8a96e", shadow:"#8a6d3c", text:"#0a0a0a" },
    white:   { bg:"#f8f8f8", shadow:"#999",    text:"#0a0a0a" },
    outline: { bg:"#1a1a1a", shadow:"#333",    text:"#f8f8f8", border:"1px solid #2e2e2e" },
  }
  const c = colors[variant]
  const [pressed, setPressed] = useState(false)
  const Tag = href ? "a" : "button"
  return (
    <div style={{ position:"relative", display:"inline-block" }}>
      <div style={{ position:"absolute", inset:0, background:c.shadow, borderRadius:100, transform:`translate(${pressed?"3px":"2px"},${pressed?"3px":"2px"})`, transition:"transform 0.1s" }} />
      <Tag href={href} onClick={onClick}
        onMouseDown={()=>setPressed(true)} onMouseUp={()=>setPressed(false)} onMouseLeave={()=>setPressed(false)}
        style={{ position:"relative", display:"inline-flex", alignItems:"center", gap:8, padding:small?"10px 22px":"14px 32px", background:c.bg, color:c.text, fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:small?13:15, borderRadius:100, cursor:"pointer", border:c.border||"none", textDecoration:"none", transform:pressed?"translate(2px,2px)":"translate(-0.5px,-0.5px)", transition:"transform 0.1s", letterSpacing:"0.01em" }}>
        {children}
      </Tag>
    </div>
  )
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(()=>{ const fn=()=>setScrolled(window.scrollY>50); window.addEventListener("scroll",fn); return ()=>window.removeEventListener("scroll",fn) },[])
  const links=[{name:"CRED Pay",href:"#features"},{name:"CRED Cash",href:"#features"},{name:"CRED Travel",href:"#features"},{name:"Rewards",href:"#features"}]
  return (
    <>
      <motion.nav initial={{y:-100}} animate={{y:0}} transition={{duration:0.7,ease:[0.22,1,0.36,1]}}
        style={{ position:"fixed",top:0,left:0,right:0,zIndex:50, background:scrolled?"rgba(10,10,10,0.92)":"transparent", backdropFilter:scrolled?"blur(20px)":"none", borderBottom:scrolled?"1px solid #1e1e1e":"none", transition:"all 0.3s ease" }}>
        <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",height:72 }}>
            <a href="#" style={{ textDecoration:"none" }}>
              <motion.div whileHover={{scale:1.05}} style={{ fontFamily:"'Syne',sans-serif",fontSize:26,fontWeight:800,color:"#f8f8f8",letterSpacing:"-0.02em" }}>CRED</motion.div>
            </a>
            <div style={{ display:"flex",gap:36,alignItems:"center" }} className="desk-nav">
              {links.map(l=>(
                <a key={l.name} href={l.href} style={{ color:"#888",fontSize:14,fontFamily:"'DM Sans',sans-serif",textDecoration:"none",transition:"color 0.2s" }}
                  onMouseEnter={e=>e.target.style.color="#f8f8f8"} onMouseLeave={e=>e.target.style.color="#888"}>{l.name}</a>
              ))}
            </div>
            <div style={{ display:"flex",gap:12,alignItems:"center" }}>
              <div className="desk-nav"><NeoButton href="#download" small>Download App</NeoButton></div>
              <button onClick={()=>setMobileOpen(!mobileOpen)} className="mob-btn"
                style={{ background:"none",border:"none",cursor:"pointer",color:"#f8f8f8",padding:8 }} aria-label="menu">
                <svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileOpen?<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>:<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>
      <AnimatePresence>
        {mobileOpen&&(
          <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}
            style={{ position:"fixed",inset:0,zIndex:40,background:"#0a0a0a",paddingTop:80,display:"flex",flexDirection:"column",alignItems:"center",gap:28 }}>
            {links.map(l=>(<a key={l.name} href={l.href} onClick={()=>setMobileOpen(false)} style={{ color:"#f8f8f8",fontSize:22,fontFamily:"'Syne',sans-serif",fontWeight:600,textDecoration:"none" }}>{l.name}</a>))}
            <NeoButton href="#download">Download App</NeoButton>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`@media(min-width:768px){.mob-btn{display:none!important}}@media(max-width:767px){.desk-nav{display:none!important}.mob-btn{display:flex!important}}`}</style>
    </>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section style={{ position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",background:"#0a0a0a" }}>
      <div style={{ position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none" }}>
        <div style={{ position:"absolute",top:"20%",left:"-10%",width:"50%",height:"50%",background:"radial-gradient(circle,rgba(200,169,110,0.12) 0%,transparent 70%)",borderRadius:"50%" }}/>
        <div style={{ position:"absolute",bottom:"15%",right:"-10%",width:"45%",height:"45%",background:"radial-gradient(circle,rgba(200,169,110,0.07) 0%,transparent 70%)",borderRadius:"50%" }}/>
      </div>
      <div style={{ position:"absolute",inset:0,opacity:0.07,backgroundImage:"linear-gradient(to right,#2a2a2a 1px,transparent 1px),linear-gradient(to bottom,#2a2a2a 1px,transparent 1px)",backgroundSize:"64px 64px" }}/>
      <div style={{ position:"relative",zIndex:10,maxWidth:1000,margin:"0 auto",padding:"140px 24px 80px",textAlign:"center" }}>
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.1}}>
          <Badge>Members-Only Club</Badge>
        </motion.div>
        <motion.h1 initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:0.9,delay:0.25}}
          style={{ fontFamily:"'Syne',sans-serif",fontSize:"clamp(52px,8vw,108px)",fontWeight:800,lineHeight:1,letterSpacing:"-0.04em",color:"#f8f8f8",margin:"28px 0" }}>
          The Credit Card<br/><span style={{color:"#c8a96e"}}>You Deserve</span>
        </motion.h1>
        <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.45}}
          style={{ maxWidth:580,margin:"0 auto 48px",fontSize:"clamp(16px,2vw,20px)",fontFamily:"'DM Sans',sans-serif",fontWeight:300,color:"#888",lineHeight:1.7 }}>
          CRED is a members-only community for India's most trustworthy and creditworthy individuals. Pay bills, earn rewards, and unlock exclusive benefits.
        </motion.p>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.65}}
          style={{ display:"flex",flexWrap:"wrap",gap:16,justifyContent:"center" }}>
          <NeoButton href="#download">Download CRED</NeoButton>
          <NeoButton href="#about" variant="outline">Learn More</NeoButton>
        </motion.div>
        <motion.div animate={{y:[0,-18,0]}} transition={{duration:4,repeat:Infinity,ease:"easeInOut"}} className="hero-fl"
          style={{ position:"absolute",top:"28%",left:"5%",width:80,height:110,background:"linear-gradient(135deg,rgba(200,169,110,0.15),rgba(200,169,110,0.05))",borderRadius:16,border:"1px solid rgba(200,169,110,0.2)" }}/>
        <motion.div animate={{y:[0,22,0]}} transition={{duration:5.5,repeat:Infinity,ease:"easeInOut"}} className="hero-fr"
          style={{ position:"absolute",bottom:"22%",right:"5%",width:96,height:64,background:"linear-gradient(135deg,rgba(30,30,30,0.8),rgba(20,20,20,0.5))",borderRadius:14,border:"1px solid #2a2a2a" }}/>
      </div>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.8}}
        style={{ position:"absolute",bottom:36,left:"50%",transform:"translateX(-50%)" }}>
        <motion.div animate={{y:[0,10,0]}} transition={{duration:2,repeat:Infinity}}>
          <div style={{ width:26,height:42,border:"2px solid rgba(136,136,136,0.4)",borderRadius:13,padding:4,display:"flex",justifyContent:"center" }}>
            <div style={{ width:4,height:10,background:"#888",borderRadius:2 }}/>
          </div>
        </motion.div>
      </motion.div>
      <style>{`@media(max-width:768px){.hero-fl,.hero-fr{display:none}}`}</style>
    </section>
  )
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function AboutSection() {
  const ref=useRef(null); const iv=useInView(ref,{once:true,margin:"-80px"})
  return (
    <section id="about" ref={ref} style={{ position:"relative",padding:"120px 0",background:"#0a0a0a",overflow:"hidden" }}>
      <Divider/>
      <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:80,alignItems:"center" }}>
          <motion.div initial={{opacity:0,x:-50}} animate={iv?{opacity:1,x:0}:{}} transition={{duration:0.9}}>
            <Badge>About CRED</Badge>
            <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:"clamp(36px,5vw,64px)",fontWeight:800,letterSpacing:"-0.03em",lineHeight:1.05,color:"#f8f8f8",margin:"20px 0 24px" }}>
              A Members-Only<br/><span style={{color:"#c8a96e"}}>Club for the Elite</span>
            </h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:17,color:"#888",lineHeight:1.75,fontWeight:300,marginBottom:36 }}>
              CRED was built for India's most trustworthy and creditworthy individuals. We reward good financial behavior and unlock a world of exclusive benefits, premium experiences, and curated rewards.
            </p>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
              {[{v:"750+",l:"Minimum Credit Score"},{v:"35M+",l:"Trusted Members"}].map(({v,l})=>(
                <div key={l} style={{ padding:"20px 24px",background:"#111",borderRadius:16,border:"1px solid #1e1e1e" }}>
                  <div style={{ fontFamily:"'Syne',sans-serif",fontSize:32,fontWeight:800,color:"#f8f8f8",marginBottom:4 }}>{v}</div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#666" }}>{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,x:50}} animate={iv?{opacity:1,x:0}:{}} transition={{duration:0.9,delay:0.2}}
            style={{ display:"flex",justifyContent:"center",position:"relative" }}>
            <div style={{ position:"relative",width:320,height:320 }}>
              <motion.div animate={{rotateY:[0,8,0],rotateX:[0,-6,0]}} transition={{duration:8,repeat:Infinity,ease:"easeInOut"}}
                style={{ position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center" }}>
                <div style={{ width:300,height:180,background:"linear-gradient(135deg,#1a1a1a 0%,#111 50%,#1e1e1e 100%)",borderRadius:20,border:"1px solid #2a2a2a",padding:"24px 28px",boxShadow:"0 40px 80px rgba(0,0,0,0.6),0 0 0 1px rgba(200,169,110,0.1)" }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:32 }}>
                    <span style={{ fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:"#f8f8f8" }}>CRED</span>
                    <div style={{ width:48,height:34,background:"linear-gradient(135deg,rgba(200,169,110,0.4),rgba(200,169,110,0.1))",borderRadius:6,border:"1px solid rgba(200,169,110,0.3)" }}/>
                  </div>
                  <div style={{ display:"flex",gap:10,marginBottom:10 }}>
                    {["****","****","****","3782"].map((g,i)=>(<span key={i} style={{ fontFamily:"'DM Sans',sans-serif",fontSize:16,color:i===3?"#c8a96e":"#555",letterSpacing:"0.15em" }}>{g}</span>))}
                  </div>
                  <div style={{ display:"flex",justifyContent:"space-between" }}>
                    <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#555" }}>VALID THRU 12/28</span>
                    <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#555" }}>CVV ***</span>
                  </div>
                </div>
              </motion.div>
              <motion.div animate={{y:[-10,10,-10]}} transition={{duration:4,repeat:Infinity}}
                style={{ position:"absolute",top:-12,right:-8,padding:"8px 16px",background:"rgba(200,169,110,0.12)",borderRadius:100,border:"1px solid rgba(200,169,110,0.3)" }}>
                <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:500,color:"#c8a96e" }}>+500 Coins</span>
              </motion.div>
              <motion.div animate={{y:[10,-10,10]}} transition={{duration:5,repeat:Infinity}}
                style={{ position:"absolute",bottom:-8,left:-8,padding:"8px 16px",background:"#111",borderRadius:100,border:"1px solid #2a2a2a" }}>
                <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:500,color:"#f8f8f8" }}>Reward Unlocked ✓</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── FEATURES ─────────────────────────────────────────────────────────────────
const feats=[
  {title:"Credit Card Bills",desc:"Pay your credit card bills on time and earn CRED coins with every payment.",icon:"💳"},
  {title:"CRED Coins",desc:"Earn coins on every bill payment. Redeem them for exclusive rewards and cashback.",icon:"🪙"},
  {title:"Credit Score",desc:"Track your credit score for free. Get insights and tips to improve it.",icon:"📊"},
  {title:"UPI Payments",desc:"Make instant UPI payments to anyone. Scan, pay, and earn rewards seamlessly.",icon:"⚡"},
  {title:"Cashback Rewards",desc:"Get guaranteed cashback on every transaction. No minimum spend required.",icon:"💰"},
  {title:"Premium Rewards",desc:"Access exclusive deals on travel, shopping, dining, and lifestyle brands.",icon:"✦"},
]

function FeaturesSection() {
  const ref=useRef(null); const iv=useInView(ref,{once:true,margin:"-80px"})
  return (
    <section id="features" ref={ref} style={{ padding:"120px 0",background:"#0d0d0d",position:"relative" }}>
      <Divider/>
      <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
        <motion.div initial={{opacity:0,y:30}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:0.8}}
          style={{ textAlign:"center",marginBottom:72 }}>
          <Badge>Features</Badge>
          <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:"clamp(36px,5vw,64px)",fontWeight:800,letterSpacing:"-0.03em",color:"#f8f8f8",margin:"20px 0 16px" }}>Everything You Need</h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:18,color:"#666",maxWidth:520,margin:"0 auto",fontWeight:300,lineHeight:1.7 }}>From bill payments to rewards, CRED has everything to make your financial life easier.</p>
        </motion.div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20 }}>
          {feats.map((f,i)=>(
            <motion.div key={i} initial={{opacity:0,y:30}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:0.6,delay:i*0.1}}
              whileHover={{y:-6,transition:{duration:0.2}}}
              style={{ padding:"36px 32px",background:"#0a0a0a",borderRadius:20,border:"1px solid #1e1e1e",cursor:"pointer",transition:"border-color 0.3s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(200,169,110,0.35)"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="#1e1e1e"}>
              <div style={{ fontSize:28,marginBottom:20,width:60,height:60,display:"flex",alignItems:"center",justifyContent:"center",background:"#141414",borderRadius:16,border:"1px solid #222" }}>{f.icon}</div>
              <h3 style={{ fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:700,color:"#f8f8f8",marginBottom:12,letterSpacing:"-0.01em" }}>{f.title}</h3>
              <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:15,color:"#666",lineHeight:1.7,fontWeight:300 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── NEOPOP ───────────────────────────────────────────────────────────────────
const neoCards=[
  {title:"CRED Pay",desc:"Scan any QR. Pay with any credit card.",color:"#d97706",glow:"rgba(217,119,6,0.15)"},
  {title:"CRED Cash",desc:"Get instant credit line up to 10 lakhs.",color:"#10b981",glow:"rgba(16,185,129,0.15)"},
  {title:"CRED Travel",desc:"Book flights & hotels at exclusive prices.",color:"#8b5cf6",glow:"rgba(139,92,246,0.15)"},
]

function NeoPopSection() {
  const ref=useRef(null); const iv=useInView(ref,{once:true,margin:"-80px"})
  return (
    <section ref={ref} style={{ padding:"120px 0",background:"#0a0a0a",position:"relative",overflow:"hidden" }}>
      <Divider/>
      <div style={{ position:"absolute",top:"20%",left:"-8%",width:"40%",height:"40%",background:"radial-gradient(circle,rgba(200,169,110,0.07) 0%,transparent 70%)",pointerEvents:"none" }}/>
      <div style={{ position:"absolute",bottom:"20%",right:"-8%",width:"35%",height:"35%",background:"radial-gradient(circle,rgba(139,92,246,0.07) 0%,transparent 70%)",pointerEvents:"none" }}/>
      <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
        <motion.div initial={{opacity:0,y:30}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:0.8}}
          style={{ textAlign:"center",marginBottom:72 }}>
          <Badge>NeoPOP Design</Badge>
          <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:"clamp(36px,5vw,64px)",fontWeight:800,letterSpacing:"-0.03em",color:"#f8f8f8",margin:"20px 0 16px" }}>Premium Products</h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:18,color:"#666",maxWidth:480,margin:"0 auto",fontWeight:300,lineHeight:1.7 }}>Discover our suite of premium financial products designed exclusively for CRED members.</p>
        </motion.div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:24,marginBottom:72 }}>
          {neoCards.map((card,i)=>(
            <motion.div key={i} initial={{opacity:0,y:40}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:0.7,delay:i*0.15}}
              style={{ position:"relative",cursor:"pointer" }}>
              <div style={{ position:"absolute",inset:0,background:`${card.color}35`,borderRadius:24,transform:"translate(8px,8px)",transition:"transform 0.2s" }}/>
              <div style={{ position:"absolute",inset:0,background:`${card.color}18`,borderRadius:24,transform:"translate(14px,14px)",transition:"transform 0.2s" }}/>
              <motion.div whileHover={{x:-2,y:-2}} transition={{duration:0.15}}
                style={{ position:"relative",padding:"40px 36px",background:`linear-gradient(135deg,${card.glow},rgba(15,15,15,0.98))`,borderRadius:24,border:"1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ width:60,height:60,background:card.color,borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:28,boxShadow:`0 8px 24px ${card.glow}` }}>
                  <svg width={28} height={28} fill="none" viewBox="0 0 24 24" stroke="#000" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <h3 style={{ fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:800,color:"#f8f8f8",marginBottom:12,letterSpacing:"-0.02em" }}>{card.title}</h3>
                <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:15,color:"#888",marginBottom:24,lineHeight:1.65,fontWeight:300 }}>{card.desc}</p>
                <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:600,color:card.color }}>Learn more →</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{opacity:0,y:30}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:0.8,delay:0.5}}
          style={{ display:"flex",flexWrap:"wrap",justifyContent:"center",gap:24 }}>
          <NeoButton href="#download">Primary Action</NeoButton>
          <NeoButton href="#" variant="outline">Secondary Action</NeoButton>
          <NeoButton href="#" variant="white">Exclusive Access</NeoButton>
        </motion.div>
        <div style={{ position:"relative",height:180,marginTop:80,overflow:"hidden" }}>
          {[{c:"linear-gradient(135deg,#c8a96e,#8a6d3c)",l:"20%",d:0,s:80},{c:"linear-gradient(135deg,#10b981,#059669)",l:"48%",d:0.7,s:64},{c:"linear-gradient(135deg,#8b5cf6,#7c3aed)",l:"72%",d:1.2,s:72}].map((s,i)=>(
            <motion.div key={i} animate={{y:[0,-22,0],rotate:[0,i%2===0?5:-4,0]}} transition={{duration:4+i,repeat:Infinity,ease:"easeInOut",delay:s.d}}
              style={{ position:"absolute",left:s.l,top:30,width:s.s,height:s.s,background:s.c,borderRadius:20,boxShadow:"0 20px 60px rgba(0,0,0,0.5)",transform:"perspective(400px) rotateX(10deg)" }}/>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function Counter({value,suffix,isFloat}) {
  const [count,setCount]=useState(0); const ref=useRef(null); const iv=useInView(ref,{once:true})
  useEffect(()=>{ if(!iv||isFloat)return; let s=0; const inc=value/60; const t=setInterval(()=>{ s+=inc; if(s>=value){setCount(value);clearInterval(t)}else setCount(Math.floor(s)) },30); return()=>clearInterval(t) },[iv,value,isFloat])
  return <span ref={ref}>{isFloat?value:count.toLocaleString()}{suffix}</span>
}

const stats=[
  {value:4.9,suffix:"/5",label:"App Store Rating",isFloat:true,icon:"⭐"},
  {value:4.7,suffix:"/5",label:"Play Store Rating",isFloat:true,icon:"🌟"},
  {value:35,suffix:"M+",label:"Trusted Members",icon:"👥"},
  {value:750,suffix:"+",label:"Min Credit Score",icon:"🏆"},
]

function StatsSection() {
  const ref=useRef(null); const iv=useInView(ref,{once:true,margin:"-80px"})
  return (
    <section ref={ref} style={{ padding:"100px 0",background:"#0d0d0d",position:"relative" }}>
      <Divider/>
      <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
        <motion.div initial={{opacity:0,y:30}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:0.8}}
          style={{ textAlign:"center",marginBottom:64 }}>
          <Badge>Trusted by Millions</Badge>
          <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:"clamp(32px,4vw,56px)",fontWeight:800,letterSpacing:"-0.03em",color:"#f8f8f8",margin:"20px 0" }}>The Numbers Speak</h2>
        </motion.div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:20 }}>
          {stats.map((s,i)=>(
            <motion.div key={i} initial={{opacity:0,y:30}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:0.6,delay:i*0.1}}
              style={{ padding:"36px 24px",background:"#0a0a0a",borderRadius:20,border:"1px solid #1e1e1e",textAlign:"center",transition:"border-color 0.3s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(200,169,110,0.35)"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="#1e1e1e"}>
              <div style={{ fontSize:28,marginBottom:16 }}>{s.icon}</div>
              <div style={{ fontFamily:"'Syne',sans-serif",fontSize:"clamp(36px,4vw,52px)",fontWeight:800,color:"#f8f8f8",lineHeight:1,marginBottom:10 }}>
                <Counter value={s.value} suffix={s.suffix} isFloat={s.isFloat}/>
              </div>
              <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"#666" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const testimonials=[
  {quote:"CRED has completely transformed how I manage my credit cards. The rewards are incredible and the interface is beautiful.",author:"Priya Sharma",role:"Product Designer",av:"PS"},
  {quote:"I never knew paying bills could be this rewarding. Already earned 50,000 CRED coins in just 3 months!",author:"Rahul Verma",role:"Software Engineer",av:"RV"},
  {quote:"The credit score tracking feature alone is worth it. Plus the exclusive deals on CRED store are amazing.",author:"Ananya Gupta",role:"Business Analyst",av:"AG"},
  {quote:"Best fintech app I have ever used. Clean design, great rewards, and excellent customer support.",author:"Vikram Singh",role:"Entrepreneur",av:"VS"},
  {quote:"CRED makes me feel special. The premium experience and exclusive access to brands is unmatched.",author:"Meera Patel",role:"Marketing Manager",av:"MP"},
]

function TestimonialsSection() {
  const ref=useRef(null); const iv=useInView(ref,{once:true,margin:"-80px"})
  return (
    <section ref={ref} style={{ padding:"120px 0",background:"#0a0a0a",position:"relative",overflow:"hidden" }}>
      <Divider/>
      <div style={{ position:"absolute",inset:0,opacity:0.025,backgroundImage:"radial-gradient(circle at 2px 2px,#f8f8f8 1px,transparent 0)",backgroundSize:"44px 44px" }}/>
      <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
        <motion.div initial={{opacity:0,y:30}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:0.8}} style={{ textAlign:"center",marginBottom:64 }}>
          <Badge>Testimonials</Badge>
          <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:"clamp(36px,5vw,64px)",fontWeight:800,letterSpacing:"-0.03em",color:"#f8f8f8",margin:"20px 0 16px" }}>Loved by Millions</h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:18,color:"#666",maxWidth:480,margin:"0 auto",fontWeight:300 }}>Join the community of creditworthy individuals who trust CRED.</p>
        </motion.div>
        <motion.div initial={{opacity:0,y:40}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:0.9,delay:0.2}}>
          <Swiper modules={[Autoplay,Pagination]} spaceBetween={24} slidesPerView={1}
            breakpoints={{640:{slidesPerView:2},1024:{slidesPerView:3}}}
            autoplay={{delay:3800,disableOnInteraction:false}}
            pagination={{clickable:true}} loop style={{paddingBottom:56}}>
            {testimonials.map((t,i)=>(
              <SwiperSlide key={i}>
                <div style={{ padding:"36px 32px",background:"rgba(17,17,17,0.7)",backdropFilter:"blur(20px)",borderRadius:24,border:"1px solid #1e1e1e",height:"100%" }}>
                  <div style={{ display:"flex",gap:4,marginBottom:24 }}>{[...Array(5)].map((_,j)=><span key={j} style={{color:"#c8a96e",fontSize:18}}>★</span>)}</div>
                  <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:16,color:"#c8c8c8",lineHeight:1.75,fontWeight:300,marginBottom:32 }}>"{t.quote}"</p>
                  <div style={{ display:"flex",alignItems:"center",gap:14 }}>
                    <div style={{ width:48,height:48,borderRadius:"50%",background:"linear-gradient(135deg,#c8a96e,#8a6d3c)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,color:"#0a0a0a",flexShrink:0 }}>{t.av}</div>
                    <div>
                      <div style={{ fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:15,color:"#f8f8f8" }}>{t.author}</div>
                      <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#666" }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
      <style>{`.swiper-pagination-bullet{background:#444!important;opacity:1!important}.swiper-pagination-bullet-active{background:#c8a96e!important}`}</style>
    </section>
  )
}

// ─── SECURITY ─────────────────────────────────────────────────────────────────
const secFeats=[
  {title:"Bank-Grade Encryption",desc:"Your data is protected with 256-bit encryption, the same security used by banks worldwide.",icon:"🔒"},
  {title:"Secure Payments",desc:"All transactions are processed through RBI-licensed payment gateways with real-time monitoring.",icon:"🛡️"},
  {title:"Data Protection",desc:"We never share your personal information. Your data stays private and secure with us always.",icon:"🏛️"},
  {title:"24/7 Monitoring",desc:"Our security team monitors all activities round the clock to detect and prevent fraud instantly.",icon:"👁️"},
]

function SecuritySection() {
  const ref=useRef(null); const iv=useInView(ref,{once:true,margin:"-80px"})
  return (
    <section ref={ref} style={{ padding:"120px 0",background:"#0d0d0d",position:"relative",overflow:"hidden" }}>
      <Divider/>
      <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:600,background:"radial-gradient(circle,rgba(200,169,110,0.05) 0%,transparent 70%)",pointerEvents:"none" }}/>
      <div style={{ position:"relative",maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
        <motion.div initial={{opacity:0,y:30}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:0.8}} style={{ textAlign:"center",marginBottom:72 }}>
          <Badge>Security First</Badge>
          <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:"clamp(32px,5vw,64px)",fontWeight:800,letterSpacing:"-0.03em",color:"#f8f8f8",margin:"20px 0 16px" }}>Your Security is Our Priority</h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:18,color:"#666",maxWidth:520,margin:"0 auto",fontWeight:300,lineHeight:1.7 }}>We use industry-leading security measures to protect your financial data and ensure safe transactions.</p>
        </motion.div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20,marginBottom:56 }}>
          {secFeats.map((f,i)=>(
            <motion.div key={i} initial={{opacity:0,y:30}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:0.6,delay:i*0.1}}
              whileHover={{scale:1.02}}
              style={{ padding:36,background:"#0a0a0a",borderRadius:20,border:"1px solid #1e1e1e",display:"flex",gap:24,alignItems:"flex-start",cursor:"pointer",transition:"border-color 0.3s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(200,169,110,0.35)"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="#1e1e1e"}>
              <div style={{ fontSize:28,width:60,height:60,display:"flex",alignItems:"center",justifyContent:"center",background:"#141414",borderRadius:16,border:"1px solid #222",flexShrink:0 }}>{f.icon}</div>
              <div>
                <h3 style={{ fontFamily:"'Syne',sans-serif",fontSize:19,fontWeight:700,color:"#f8f8f8",marginBottom:10 }}>{f.title}</h3>
                <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"#666",lineHeight:1.7,fontWeight:300 }}>{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{opacity:0,y:20}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:0.8,delay:0.5}}
          style={{ display:"flex",flexWrap:"wrap",justifyContent:"center",gap:16 }}>
          {["RBI Regulated","ISO 27001 Certified","PCI DSS Compliant","256-bit SSL"].map(b=>(
            <div key={b} style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 22px",background:"#111",borderRadius:100,border:"1px solid #1e1e1e" }}>
              <span style={{color:"#c8a96e",fontSize:14}}>✓</span>
              <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"#c8c8c8",fontWeight:500 }}>{b}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── DOWNLOAD ─────────────────────────────────────────────────────────────────
function DownloadSection() {
  const ref=useRef(null); const iv=useInView(ref,{once:true,margin:"-80px"})
  return (
    <section id="download" ref={ref} style={{ padding:"120px 0",background:"#0a0a0a",position:"relative",overflow:"hidden" }}>
      <Divider/>
      <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:700,height:700,background:"radial-gradient(circle,rgba(200,169,110,0.1) 0%,transparent 65%)",pointerEvents:"none" }}/>
      <div style={{ position:"relative",maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:80,alignItems:"center" }}>
          <motion.div initial={{opacity:0,x:-50}} animate={iv?{opacity:1,x:0}:{}} transition={{duration:0.9}} style={{ display:"flex",justifyContent:"center",position:"relative" }}>
            <div style={{ position:"relative" }}>
              <motion.div animate={{y:[0,-14,0]}} transition={{duration:3,repeat:Infinity,ease:"easeInOut"}}
                style={{ position:"absolute",top:-28,left:-28,width:72,height:72,background:"linear-gradient(135deg,#c8a96e,#8a6d3c)",borderRadius:20,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 16px 48px rgba(200,169,110,0.4)",fontSize:28 }}>💰</motion.div>
              <motion.div animate={{y:[0,12,0]}} transition={{duration:4,repeat:Infinity,ease:"easeInOut",delay:0.5}}
                style={{ position:"absolute",bottom:-16,right:-20,width:60,height:60,background:"linear-gradient(135deg,#10b981,#059669)",borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 12px 36px rgba(16,185,129,0.4)",fontSize:24 }}>✓</motion.div>
              <div style={{ width:240,height:500,background:"linear-gradient(180deg,#1c1c1e,#0a0a0a)",borderRadius:44,padding:10,boxShadow:"0 60px 120px rgba(0,0,0,0.8),0 0 0 1px rgba(255,255,255,0.05)" }}>
                <div style={{ position:"relative",width:"100%",height:"100%",background:"linear-gradient(180deg,#0f0f0f,#050505)",borderRadius:36,overflow:"hidden",padding:"40px 20px 20px" }}>
                  <div style={{ position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:100,height:26,background:"#000",borderRadius:"0 0 16px 16px" }}/>
                  <div style={{ width:44,height:44,background:"linear-gradient(135deg,#c8a96e,#8a6d3c)",borderRadius:14,marginBottom:20 }}/>
                  <div style={{ height:10,background:"#1a1a1a",borderRadius:5,width:"70%",marginBottom:8 }}/><div style={{ height:10,background:"#1a1a1a",borderRadius:5,width:"50%",marginBottom:24 }}/>
                  {[1,2,3].map(i=>(<div key={i} style={{ display:"flex",gap:12,padding:"12px 14px",background:"rgba(255,255,255,0.03)",borderRadius:14,marginBottom:10,alignItems:"center" }}>
                    <div style={{ width:36,height:36,background:"#1a1a1a",borderRadius:10,flexShrink:0 }}/>
                    <div style={{flex:1}}><div style={{ height:8,background:"#1a1a1a",borderRadius:4,width:"65%",marginBottom:6 }}/><div style={{ height:8,background:"#141414",borderRadius:4,width:"40%" }}/></div>
                  </div>))}
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,x:50}} animate={iv?{opacity:1,x:0}:{}} transition={{duration:0.9,delay:0.2}}>
            <Badge>Download Now</Badge>
            <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:"clamp(32px,4vw,56px)",fontWeight:800,letterSpacing:"-0.03em",color:"#f8f8f8",margin:"20px 0 24px",lineHeight:1.05 }}>Experience the Future of Payments</h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:17,color:"#666",lineHeight:1.75,fontWeight:300,marginBottom:40,maxWidth:460 }}>Join millions of creditworthy Indians already enjoying premium rewards and benefits. Download CRED today.</p>
            <div style={{ display:"flex",flexWrap:"wrap",gap:16,marginBottom:32 }}>
              {[{label:"Download on the",title:"App Store",icon:"🍎"},{label:"Get it on",title:"Google Play",icon:"▶️"}].map(btn=>(
                <a key={btn.title} href="#"
                  style={{ display:"flex",alignItems:"center",gap:16,padding:"16px 24px",background:"#111",border:"1px solid #1e1e1e",borderRadius:18,textDecoration:"none",transition:"border-color 0.2s,background 0.2s" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(200,169,110,0.4)";e.currentTarget.style.background="#141414"}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="#1e1e1e";e.currentTarget.style.background="#111"}}>
                  <span style={{fontSize:28}}>{btn.icon}</span>
                  <div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#666" }}>{btn.label}</div>
                    <div style={{ fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:700,color:"#f8f8f8" }}>{btn.title}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const fl={Company:["About","Careers","Blog","Press"],Products:["CRED Pay","CRED Cash","CRED Travel","CRED Store"],Legal:["Privacy Policy","Terms of Service","Security","Grievance"],Support:["Help Center","Contact Us","FAQs","Report Fraud"]}
  return (
    <footer style={{ position:"relative",background:"#0a0a0a",paddingTop:100,paddingBottom:48 }}>
      <Divider/>
      <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}}
          style={{ textAlign:"center",marginBottom:80,padding:"64px 32px",background:"#0d0d0d",borderRadius:28,border:"1px solid #1e1e1e",position:"relative",overflow:"hidden" }}>
          <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:500,height:300,background:"radial-gradient(ellipse,rgba(200,169,110,0.1) 0%,transparent 70%)",pointerEvents:"none" }}/>
          <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:"clamp(28px,4vw,52px)",fontWeight:800,letterSpacing:"-0.03em",color:"#f8f8f8",marginBottom:16,position:"relative" }}>Ready to Join the Club?</h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:17,color:"#666",maxWidth:440,margin:"0 auto 36px",lineHeight:1.7,fontWeight:300 }}>Download CRED and start earning rewards on your credit card payments today.</p>
          <div style={{ display:"flex",flexWrap:"wrap",gap:16,justifyContent:"center" }}>
            <NeoButton href="#download">Download for iOS</NeoButton>
            <NeoButton href="#download" variant="outline">Download for Android</NeoButton>
          </div>
        </motion.div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:40,marginBottom:60 }}>
          <div>
            <span style={{ fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:"#f8f8f8",display:"block",marginBottom:12 }}>CRED</span>
            <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#555",lineHeight:1.7,marginBottom:20,fontWeight:300 }}>A members-only club for India's most creditworthy.</p>
            <div style={{ display:"flex",gap:10 }}>
              {["𝕏","IG","IN","YT"].map(s=>(
                <a key={s} href="#"
                  style={{ width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",background:"#111",borderRadius:"50%",border:"1px solid #1e1e1e",color:"#888",fontSize:11,fontFamily:"'Syne',sans-serif",fontWeight:700,textDecoration:"none",transition:"all 0.2s" }}
                  onMouseEnter={e=>{e.currentTarget.style.color="#c8a96e";e.currentTarget.style.borderColor="rgba(200,169,110,0.35)"}}
                  onMouseLeave={e=>{e.currentTarget.style.color="#888";e.currentTarget.style.borderColor="#1e1e1e"}}>{s}</a>
              ))}
            </div>
          </div>
          {Object.entries(fl).map(([group,links])=>(
            <div key={group}>
              <h4 style={{ fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:"#f8f8f8",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:20 }}>{group}</h4>
              <ul style={{ listStyle:"none",display:"flex",flexDirection:"column",gap:12 }}>
                {links.map(l=>(<li key={l}><a href="#" style={{ fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"#555",textDecoration:"none",transition:"color 0.2s" }} onMouseEnter={e=>e.target.style.color="#f8f8f8"} onMouseLeave={e=>e.target.style.color="#555"}>{l}</a></li>))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ paddingTop:32,borderTop:"1px solid #1a1a1a",display:"flex",flexWrap:"wrap",justifyContent:"space-between",gap:12 }}>
          <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#444" }}>© {new Date().getFullYear()} CRED. All rights reserved.</p>
          <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#444" }}>Made with excellence in Bangalore, India</p>
        </div>
      </div>
    </footer>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ minHeight:"100vh",background:"#0a0a0a" }}>
      <Navbar/>
      <HeroSection/>
      <AboutSection/>
      <FeaturesSection/>
      <NeoPopSection/>
      <StatsSection/>
      <TestimonialsSection/>
      <SecuritySection/>
      <DownloadSection/>
      <Footer/>
    </div>
  )
}
