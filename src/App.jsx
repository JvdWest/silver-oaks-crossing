import { useState, useEffect, useRef } from "react";

const STORES = [
  { name: "SUPERSPAR Silver Oaks", category: "Grocery", hours: "07:00–20:00 daily", featured: true },
  { name: "Woolworths Foods", category: "Grocery", hours: "Mon–Fri 09:00–19:00 · Sat 08:00–18:00 · Sun & PH 08:30–17:00", featured: true },
  { name: "Clicks", category: "Health & Beauty", hours: "Mon–Fri 09:00–19:00 · Sat 08:00–18:00 · Sun & PH 08:30–17:00", featured: true },
  { name: "PEP", category: "Fashion & Retail", hours: "Mon–Fri 09:00–18:00 (Wed from 09:30) · Sat 09:00–15:00 · Sun 09:00–13:00" },
  { name: "Debonairs Pizza", category: "Restaurant", hours: "09:00 – till late" },
  { name: "Galito's", category: "Restaurant", hours: "Mon–Sat 10:00–21:00 · Sun 10:00–19:00" },
  { name: "On Demand Doctor", category: "Health & Medical", hours: "Mon–Fri 09:00–17:30 · Sat 09:00–15:00 · Sun 09:00–13:00" },
  { name: "3@1 Silver Oaks", category: "Services", hours: "Mon–Fri 08:00–17:30 · Sat 09:00–14:00 · Sun Closed" },
  { name: "Life Medical Centre", category: "Health & Medical", hours: "Contact store for hours" },
];

const CATEGORIES = ["All", "Grocery", "Restaurant", "Health & Beauty", "Health & Medical", "Fashion & Retail", "Services"];

const CENTRE_HOURS = [
  { day: "Monday – Friday", time: "09:00 – 18:00" },
  { day: "Saturday", time: "09:00 – 15:00" },
  { day: "Sunday & Public Holidays", time: "09:00 – 15:00" },
  { day: "Restaurants", time: "09:00 – till late" },
];

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?w=1600&q=80",
  about1: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
  about2: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
  dining1: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
  dining2: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
  dining3: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
  grocery: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
  lifestyle: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  medical: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80",
  fashion: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "", style = {} }) {
  const [ref, visible] = useInView();
  return (
      <div ref={ref} className={className} style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}>
        {children}
      </div>
  );
}

export default function SilverOaksCrossing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterCat, setFilterCat] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const filtered = filterCat === "All" ? STORES : STORES.filter(s => s.category === filterCat);
  const catColors = {
    "Grocery": { bg: "#e8f0e4", text: "#3a6b35" },
    "Restaurant": { bg: "#fce8dc", text: "#a8552a" },
    "Health & Beauty": { bg: "#ede4f0", text: "#6b3570" },
    "Health & Medical": { bg: "#ddeef8", text: "#2a5f8a" },
    "Fashion & Retail": { bg: "#fceae4", text: "#8a3a2a" },
    "Services": { bg: "#e4ecf0", text: "#35556b" },
  };
  const navItems = [["home","Home"],["about","About"],["stores","Stores"],["dining","Dining"],["hours","Hours"],["location","Location"]];

  return (
      <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#2c2c2c", background: "#faf9f6", minHeight: "100vh", overflowX: "hidden" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
        <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        ::selection { background:#8b9e6b; color:#fff; }
        .nav-link { position:relative; color:#5a5a5a; text-decoration:none; font-size:14px; font-weight:500; letter-spacing:0.5px; text-transform:uppercase; padding:4px 0; transition:color 0.3s; cursor:pointer; }
        .nav-link:hover { color:#3a6b35; }
        .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1.5px; background:#8b9e6b; transition:width 0.3s; }
        .nav-link:hover::after { width:100%; }
        .btn-primary { display:inline-flex; align-items:center; gap:8px; padding:14px 32px; background:#3a6b35; color:#fff; border:none; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:600; letter-spacing:1px; text-transform:uppercase; cursor:pointer; transition:all 0.4s ease; }
        .btn-primary:hover { background:#2d5429; transform:translateY(-2px); box-shadow:0 8px 24px rgba(58,107,53,0.25); }
        .btn-outline { display:inline-flex; align-items:center; gap:8px; padding:14px 32px; background:transparent; color:#fff; border:1.5px solid rgba(255,255,255,0.6); font-family:'DM Sans',sans-serif; font-size:14px; font-weight:600; letter-spacing:1px; text-transform:uppercase; cursor:pointer; transition:all 0.4s ease; }
        .btn-outline:hover { background:rgba(255,255,255,0.15); border-color:#fff; transform:translateY(-2px); }
        .cat-btn { padding:8px 20px; border:1.5px solid #d0ccc4; background:transparent; color:#6a6a6a; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500; cursor:pointer; transition:all 0.3s; border-radius:100px; }
        .cat-btn:hover { border-color:#8b9e6b; color:#3a6b35; }
        .cat-btn.active { background:#3a6b35; border-color:#3a6b35; color:#fff; }
        .store-card { background:#fff; border:1px solid #e8e6e1; padding:28px; transition:all 0.4s ease; }
        .store-card:hover { transform:translateY(-4px); box-shadow:0 12px 32px rgba(0,0,0,0.08); border-color:#8b9e6b; }
        .store-card.featured { border-left:3px solid #8b9e6b; }
        .hour-row { display:flex; justify-content:space-between; padding:16px 0; border-bottom:1px solid #ece9e3; }
        .hour-row:last-child { border-bottom:none; }
        .img-cover { width:100%; height:100%; object-fit:cover; display:block; }
        .img-zoom { transition:transform 0.6s ease; }
        .img-zoom:hover { transform:scale(1.05); }
        .hamburger { display:none; flex-direction:column; gap:5px; cursor:pointer; padding:8px; background:none; border:none; z-index:1001; }
        .hamburger span { display:block; width:24px; height:2px; transition:all 0.3s; }
        .mobile-menu,.mobile-overlay { display:none; }
        @media (max-width:768px) {
          .hamburger { display:flex; }
          .desktop-nav { display:none !important; }
          .mobile-menu { display:flex; position:fixed; top:0; right:0; width:280px; height:100vh; background:#faf9f6; z-index:1000; padding:80px 32px 32px; flex-direction:column; gap:24px; box-shadow:-8px 0 32px rgba(0,0,0,0.1); transform:translateX(100%); transition:transform 0.4s ease; }
          .mobile-menu.open { transform:translateX(0); }
          .mobile-overlay { display:block; position:fixed; inset:0; background:rgba(0,0,0,0.3); z-index:999; opacity:0; pointer-events:none; transition:opacity 0.3s; }
          .mobile-overlay.open { opacity:1; pointer-events:auto; }
          .about-grid { grid-template-columns:1fr !important; }
          .about-images { display:none !important; }
          .dining-grid { grid-template-columns:1fr !important; }
          .location-grid { grid-template-columns:1fr !important; }
          .gallery-grid { grid-template-columns:1fr 1fr !important; }
          .footer-grid { grid-template-columns:1fr 1fr !important; }
        }
        @keyframes kenburns { 0% { transform:scale(1); } 100% { transform:scale(1.08); } }
      `}</style>

        {/* NAV */}
        <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:scrolled?"rgba(250,249,246,0.95)":"transparent", backdropFilter:scrolled?"blur(12px)":"none", borderBottom:scrolled?"1px solid rgba(0,0,0,0.06)":"none", transition:"all 0.4s ease", padding:scrolled?"12px 0":"20px 0" }}>
          <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ cursor:"pointer" }} onClick={() => scrollTo("home")}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:scrolled?"#2c2c2c":"#fff", lineHeight:1.1, transition:"color 0.4s" }}>Silver Oaks</div>
              <div style={{ fontSize:10, fontWeight:600, letterSpacing:3, textTransform:"uppercase", color:"#8b9e6b" }}>Crossing</div>
            </div>
            <div className="desktop-nav" style={{ display:"flex", gap:32, alignItems:"center" }}>
              {navItems.map(([id,label]) => (<span key={id} className="nav-link" style={{ color:scrolled?"#5a5a5a":"rgba(255,255,255,0.85)" }} onClick={() => scrollTo(id)}>{label}</span>))}
            </div>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <span style={{ transform:menuOpen?"rotate(45deg) translate(5px,5px)":"none", background:scrolled?"#2c2c2c":"#fff" }} />
              <span style={{ opacity:menuOpen?0:1, background:scrolled?"#2c2c2c":"#fff" }} />
              <span style={{ transform:menuOpen?"rotate(-45deg) translate(5px,-5px)":"none", background:scrolled?"#2c2c2c":"#fff" }} />
            </button>
          </div>
        </nav>

        <div className={`mobile-overlay ${menuOpen?"open":""}`} onClick={() => setMenuOpen(false)} />
        <div className={`mobile-menu ${menuOpen?"open":""}`}>
          {navItems.map(([id,label]) => (<span key={id} className="nav-link" style={{ fontSize:18 }} onClick={() => scrollTo(id)}>{label}</span>))}
        </div>

        {/* HERO */}
        <section id="home" style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:`url(${IMAGES.hero})`, backgroundSize:"cover", backgroundPosition:"center", animation:"kenburns 20s ease-in-out infinite alternate" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.65) 100%)" }} />
          <div style={{ textAlign:"center", maxWidth:800, padding:"0 24px", position:"relative", zIndex:1 }}>
            <FadeIn><div style={{ fontSize:12, fontWeight:600, letterSpacing:4, textTransform:"uppercase", color:"#8b9e6b", marginBottom:24 }}>Pretoria East's Premier Lifestyle Destination</div></FadeIn>
            <FadeIn delay={0.15}><h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(40px,7vw,80px)", fontWeight:700, lineHeight:1.05, color:"#fff", marginBottom:24 }}>Silver Oaks<br /><span style={{ color:"#8b9e6b", fontStyle:"italic" }}>Crossing</span></h1></FadeIn>
            <FadeIn delay={0.3}><p style={{ fontSize:18, lineHeight:1.7, color:"rgba(255,255,255,0.8)", maxWidth:560, margin:"0 auto 40px" }}>A delightful shopping experience for you and your family. Stylish, convenient, and full of flavour.</p></FadeIn>
            <FadeIn delay={0.45}>
              <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
                <button className="btn-primary" onClick={() => scrollTo("stores")}>Explore Our Stores <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg></button>
                <button className="btn-outline" onClick={() => scrollTo("hours")}>View Trading Hours</button>
              </div>
            </FadeIn>
          </div>
          <div style={{ position:"absolute", bottom:40, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:8, opacity:0.5 }}>
            <div style={{ fontSize:11, letterSpacing:2, textTransform:"uppercase", color:"#fff" }}>Scroll</div>
            <div style={{ width:1, height:32, background:"linear-gradient(to bottom, #fff, transparent)" }} />
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" style={{ padding:"120px 24px", maxWidth:1200, margin:"0 auto" }}>
          <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
            <FadeIn>
              <div>
                <div style={{ fontSize:12, fontWeight:600, letterSpacing:3, textTransform:"uppercase", color:"#8b9e6b", marginBottom:16 }}>About the Centre</div>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(32px,4vw,48px)", fontWeight:600, lineHeight:1.15, marginBottom:24, color:"#2c2c2c" }}>Your Neighbourhood,<br /><span style={{ fontStyle:"italic", color:"#3a6b35" }}>Elevated</span></h2>
                <p style={{ fontSize:16, lineHeight:1.8, color:"#5a5a5a", marginBottom:20 }}>Silver Oaks Crossing is a convenient neighbourhood shopping centre located at the intersection of Solomon Mahlangu and Von Backstrom Drive, Willow Acres — an upmarket shopping and lifestyle destination in the vibrant Pretoria East.</p>
                <p style={{ fontSize:16, lineHeight:1.8, color:"#5a5a5a" }}>Designed with your convenience in mind, the centre boasts a large variety of restaurants and grocery outlets, alongside lifestyle services including a comprehensive Life Medical Centre, automotive, home interiors, health & beauty, and fashion.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="about-images">
              <div style={{ position:"relative", height:500 }}>
                <div style={{ position:"absolute", top:0, right:0, width:"70%", height:"65%", overflow:"hidden", boxShadow:"0 16px 48px rgba(0,0,0,0.12)" }}>
                  <img src={IMAGES.about1} alt="Shopping at Silver Oaks" className="img-cover img-zoom" />
                </div>
                <div style={{ position:"absolute", bottom:0, left:0, width:"60%", height:"55%", overflow:"hidden", boxShadow:"0 16px 48px rgba(0,0,0,0.12)", border:"6px solid #faf9f6" }}>
                  <img src={IMAGES.about2} alt="Retail experience" className="img-cover img-zoom" />
                </div>
                <div style={{ position:"absolute", top:"30%", left:"25%", width:80, height:80, background:"#8b9e6b", opacity:0.15, zIndex:-1 }} />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* GALLERY STRIP */}
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px 80px" }}>
          <FadeIn>
            <div className="gallery-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, height:220 }}>
              {[
                { src: IMAGES.grocery, label: "Grocery & Retail" },
                { src: IMAGES.dining1, label: "Restaurants" },
                { src: IMAGES.medical, label: "Health & Medical" },
                { src: IMAGES.fashion, label: "Fashion & Lifestyle" },
              ].map((item, i) => (
                  <div key={i} style={{ position:"relative", overflow:"hidden" }}>
                    <img src={item.src} alt={item.label} className="img-cover img-zoom" style={{ height:220 }} />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)", display:"flex", alignItems:"flex-end", padding:20 }}>
                      <span style={{ color:"#fff", fontSize:13, fontWeight:600, letterSpacing:1, textTransform:"uppercase" }}>{item.label}</span>
                    </div>
                  </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px" }}><div style={{ height:1, background:"linear-gradient(to right, transparent, #d0ccc4, transparent)" }} /></div>

        {/* STORES */}
        <section id="stores" style={{ padding:"120px 24px", maxWidth:1200, margin:"0 auto" }}>
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:60 }}>
              <div style={{ fontSize:12, fontWeight:600, letterSpacing:3, textTransform:"uppercase", color:"#8b9e6b", marginBottom:16 }}>Our Stores</div>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(32px,4vw,48px)", fontWeight:600, lineHeight:1.15, color:"#2c2c2c" }}>Shopping <span style={{ fontStyle:"italic", color:"#3a6b35" }}>Directory</span></h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center", marginBottom:48 }}>
              {CATEGORIES.map(cat => (<button key={cat} className={`cat-btn ${filterCat===cat?"active":""}`} onClick={() => setFilterCat(cat)}>{cat}</button>))}
            </div>
          </FadeIn>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))", gap:20 }}>
            {filtered.map((store, i) => (
                <FadeIn key={store.name} delay={i*0.05}>
                  <div className={`store-card ${store.featured?"featured":""}`}>
                    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:12 }}>
                      <h3 style={{ fontSize:17, fontWeight:600, color:"#2c2c2c" }}>{store.name}</h3>
                      {store.featured && <span style={{ fontSize:10, fontWeight:600, letterSpacing:1, textTransform:"uppercase", color:"#8b9e6b", background:"#e8f0e4", padding:"4px 10px", borderRadius:100, whiteSpace:"nowrap" }}>Anchor</span>}
                    </div>
                    <div style={{ display:"inline-block", fontSize:12, fontWeight:500, padding:"4px 12px", borderRadius:100, marginBottom:16, background:catColors[store.category]?.bg||"#f0f0f0", color:catColors[store.category]?.text||"#555" }}>{store.category}</div>
                    <div style={{ display:"flex", alignItems:"flex-start", gap:8, color:"#777", fontSize:13, lineHeight:1.6 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginTop:3, flexShrink:0 }}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                      <span>{store.hours}</span>
                    </div>
                  </div>
                </FadeIn>
            ))}
          </div>
        </section>

        {/* DINING */}
        <section id="dining" style={{ position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0 }}>
            <img src={IMAGES.dining1} alt="" className="img-cover" style={{ height:"100%" }} />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(30,30,30,0.92) 0%, rgba(30,30,30,0.85) 100%)" }} />
          </div>
          <div style={{ maxWidth:1200, margin:"0 auto", padding:"120px 24px", position:"relative", zIndex:1 }}>
            <FadeIn>
              <div style={{ textAlign:"center", marginBottom:60 }}>
                <div style={{ fontSize:12, fontWeight:600, letterSpacing:3, textTransform:"uppercase", color:"#8b9e6b", marginBottom:16 }}>Dine With Us</div>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(32px,4vw,48px)", fontWeight:600, lineHeight:1.15, color:"#fff" }}>A Menu for Every<br /><span style={{ fontStyle:"italic", color:"#8b9e6b" }}>Discerning Palate</span></h2>
                <p style={{ fontSize:16, lineHeight:1.8, color:"rgba(255,255,255,0.6)", maxWidth:560, margin:"24px auto 0" }}>From flame-grilled favourites to classic pizza, Silver Oaks Crossing offers an array of restaurants open from 09:00 till late.</p>
              </div>
            </FadeIn>
            <div className="dining-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
              {[
                { name:"Debonairs Pizza", desc:"Freshly made pizza delivered to your table or your door.", hours:"09:00 – till late", img:IMAGES.dining2 },
                { name:"Galito's", desc:"Flame-grilled chicken with bold, authentic flavours.", hours:"Mon–Sat 10:00–21:00 · Sun 10:00–19:00", img:IMAGES.dining3 },
                { name:"More to Discover", desc:"Explore all our dining options for a meal that suits every craving.", hours:"Various hours", img:IMAGES.dining1 },
              ].map((r,i) => (
                  <FadeIn key={r.name} delay={i*0.15}>
                    <div style={{ border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.05)", transition:"all 0.4s", overflow:"hidden" }}>
                      <div style={{ height:200, overflow:"hidden" }}><img src={r.img} alt={r.name} className="img-cover img-zoom" style={{ height:200 }} /></div>
                      <div style={{ padding:28 }}>
                        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:600, marginBottom:12, color:"#fff" }}>{r.name}</h3>
                        <p style={{ fontSize:14, lineHeight:1.7, color:"rgba(255,255,255,0.55)", marginBottom:20 }}>{r.desc}</p>
                        <div style={{ display:"flex", alignItems:"center", gap:8, color:"#8b9e6b", fontSize:13 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                          {r.hours}
                        </div>
                      </div>
                    </div>
                  </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* HOURS */}
        <section id="hours" style={{ padding:"120px 24px", maxWidth:900, margin:"0 auto" }}>
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:60 }}>
              <div style={{ fontSize:12, fontWeight:600, letterSpacing:3, textTransform:"uppercase", color:"#8b9e6b", marginBottom:16 }}>Plan Your Visit</div>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(32px,4vw,48px)", fontWeight:600, lineHeight:1.15, color:"#2c2c2c" }}>Trading <span style={{ fontStyle:"italic", color:"#3a6b35" }}>Hours</span></h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ background:"#fff", border:"1px solid #e8e6e1", padding:"16px 36px" }}>
              {CENTRE_HOURS.map((h,i) => (<div key={i} className="hour-row"><span style={{ fontWeight:500, color:"#2c2c2c" }}>{h.day}</span><span style={{ color:"#3a6b35", fontWeight:600 }}>{h.time}</span></div>))}
            </div>
            <p style={{ textAlign:"center", fontSize:13, color:"#999", marginTop:20, fontStyle:"italic" }}>Individual store hours may vary. Please check the store directory for specific times.</p>
          </FadeIn>
        </section>

        {/* NEWSLETTER */}
        <section style={{ position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0 }}>
            <img src={IMAGES.lifestyle} alt="" className="img-cover" style={{ height:"100%" }} />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(232,235,227,0.93) 0%, rgba(221,229,213,0.93) 100%)" }} />
          </div>
          <div style={{ maxWidth:640, margin:"0 auto", padding:"100px 24px", textAlign:"center", position:"relative", zIndex:1 }}>
            <FadeIn>
              <div style={{ fontSize:12, fontWeight:600, letterSpacing:3, textTransform:"uppercase", color:"#3a6b35", marginBottom:16 }}>Stay in the Loop</div>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,4vw,40px)", fontWeight:600, lineHeight:1.2, color:"#2c2c2c", marginBottom:16 }}>News, Promotions & Events</h2>
              <p style={{ fontSize:15, lineHeight:1.7, color:"#5a5a5a", marginBottom:36 }}>The latest news, promotions, competitions and events delivered straight to your inbox.</p>
              {subscribed ? (
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, color:"#3a6b35", fontWeight:600, fontSize:16 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>Thank you for subscribing!
                  </div>
              ) : (
                  <div style={{ display:"flex", gap:0, maxWidth:480, margin:"0 auto" }}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" style={{ flex:1, padding:"16px 20px", border:"1.5px solid #c8c4bc", borderRight:"none", fontSize:14, fontFamily:"'DM Sans',sans-serif", color:"#2c2c2c", background:"#fff", outline:"none", minWidth:0 }} onFocus={(e) => e.target.style.borderColor="#8b9e6b"} onBlur={(e) => e.target.style.borderColor="#c8c4bc"} />
                    <button className="btn-primary" style={{ borderRadius:0, whiteSpace:"nowrap" }} onClick={() => { if(email.includes("@")) setSubscribed(true); }}>Sign Up</button>
                  </div>
              )}
            </FadeIn>
          </div>
        </section>

        {/* LOCATION */}
        <section id="location" style={{ padding:"120px 24px", maxWidth:1200, margin:"0 auto" }}>
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:60 }}>
              <div style={{ fontSize:12, fontWeight:600, letterSpacing:3, textTransform:"uppercase", color:"#8b9e6b", marginBottom:16 }}>Find Us</div>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(32px,4vw,48px)", fontWeight:600, lineHeight:1.15, color:"#2c2c2c" }}>Location & <span style={{ fontStyle:"italic", color:"#3a6b35" }}>Directions</span></h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="location-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"start" }}>
              <div style={{ width:"100%", aspectRatio:"4/3", background:"#e8ebe3", border:"1px solid #e8e6e1", overflow:"hidden" }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2412.7835821409667!2d28.35875975837772!3d-25.76554499598912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e955f7ba70f0b9f%3A0x5079680848fc371f!2sPEP%20PTA%20Silver%20Oaks%20Crossing!5e1!3m2!1sen!2sza!4v1770806055280!5m2!1sen!2sza" style={{ width:"100%", height:"100%", border:0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Silver Oaks Crossing Map" />
              </div>
              <div>
                <div style={{ marginBottom:32 }}>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:600, marginBottom:12 }}>Address</h3>
                  <p style={{ fontSize:15, lineHeight:1.8, color:"#5a5a5a" }}>Corner of Solomon Mahlangu Drive<br />& Von Backstrom Drive<br />Willow Acres, Pretoria East<br />Gauteng, South Africa</p>
                </div>
                <div style={{ marginBottom:32 }}>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:600, marginBottom:12 }}>Getting Here</h3>
                  <p style={{ fontSize:15, lineHeight:1.8, color:"#5a5a5a" }}>Conveniently situated at the intersection of Solomon Mahlangu (previously Nelmapius Road) and Von Backstrom Drive, with ample parking available.</p>
                </div>
                <button className="btn-primary" onClick={() => window.open("https://maps.google.com/?q=Silver+Oaks+Crossing+Pretoria","_blank")}>Get Directions <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg></button>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* FOOTER */}
        <footer style={{ background:"#2c2c2c", color:"#999", padding:"60px 24px 36px" }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr 1fr", gap:40, marginBottom:48 }}>
              <div>
                <div style={{ marginBottom:16 }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:"#fff", lineHeight:1.1 }}>Silver Oaks</div>
                  <div style={{ fontSize:10, fontWeight:600, letterSpacing:3, textTransform:"uppercase", color:"#8b9e6b" }}>Crossing</div>
                </div>
                <p style={{ fontSize:14, lineHeight:1.7, maxWidth:300 }}>Your stylish one-stop shopping destination in the heart of Pretoria East.</p>
              </div>
              <div>
                <div style={{ fontSize:12, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:"#fff", marginBottom:16 }}>Quick Links</div>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {[["about","About"],["stores","Stores"],["dining","Dining"],["hours","Trading Hours"],["location","Location"]].map(([id,label]) => (
                      <span key={id} style={{ fontSize:14, color:"#999", cursor:"pointer", transition:"color 0.3s" }} onClick={() => scrollTo(id)} onMouseEnter={(e) => e.target.style.color="#8b9e6b"} onMouseLeave={(e) => e.target.style.color="#999"}>{label}</span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize:12, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:"#fff", marginBottom:16 }}>Contact</div>
                <div style={{ display:"flex", flexDirection:"column", gap:10, fontSize:14 }}>
                  <span>Cnr Solomon Mahlangu &</span><span>Von Backstrom Drive</span><span>Willow Acres, Pretoria East</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize:12, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:"#fff", marginBottom:16 }}>Follow Us</div>
                <div style={{ display:"flex", gap:12 }}>
                  {["Facebook","Instagram"].map(p => (
                      <div key={p} style={{ width:40, height:40, border:"1px solid rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all 0.3s", fontSize:12, color:"#999" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor="#8b9e6b"; e.currentTarget.style.color="#8b9e6b"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor="rgba(255,255,255,0.15)"; e.currentTarget.style.color="#999"; }}>{p[0]}</div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ height:1, background:"rgba(255,255,255,0.08)", marginBottom:24 }} />
            <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12, fontSize:13 }}>
              <span>&copy; {new Date().getFullYear()} Silver Oaks Crossing. All rights reserved.</span>
              <span style={{ color:"#666" }}>Designed with care in Pretoria East</span>
            </div>
          </div>
        </footer>
      </div>
  );
}
