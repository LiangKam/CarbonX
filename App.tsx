
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Instagram, Facebook, Phone, Mail, ArrowRight, ExternalLink, Globe, ChevronDown } from 'lucide-react';
import { AIChatbot } from './components/AIChatbot';
import { Customizer } from './components/Customizer';
import { LanguageProvider, useLanguage } from './services/i18n';
import { Language } from './types';
import { IMAGES } from './constants';

// --- Components defined locally to avoid too many files, adhering to "handful of files" but keeping structure clean ---

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#' },
    { name: t.nav.products, href: '#products' },
    { name: t.nav.customize, href: '#customize' },
    { name: t.nav.technology, href: '#technology' },
  ];

  const langOptions = [
    { code: 'zh', label: '中文' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' }
  ];

  const currentLangLabel = langOptions.find(l => l.code === language)?.label || 'EN';

  return (
    <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-neutral-950/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-black tracking-tighter text-white italic">
          CARBON<span className="text-neon-400">X</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-neutral-300 hover:text-white hover:text-glow transition">
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA & Lang */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* Custom Language Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              onBlur={() => setTimeout(() => setLangMenuOpen(false), 200)}
              className="flex items-center gap-2 bg-neutral-800 rounded-full px-3 py-1.5 border border-neutral-700 hover:border-neutral-500 transition group"
            >
               <Globe size={14} className="text-neutral-400 group-hover:text-white transition" />
               <span className="text-xs text-white font-medium min-w-[24px] text-center">{currentLangLabel}</span>
               <ChevronDown size={12} className={`text-neutral-500 transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {langMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-28 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl overflow-hidden py-1 z-50 flex flex-col animate-in fade-in zoom-in-95 duration-150">
                 {langOptions.map((opt) => (
                   <button
                     key={opt.code}
                     onClick={() => {
                        setLanguage(opt.code as Language);
                        setLangMenuOpen(false);
                     }}
                     className={`w-full text-left px-4 py-2 text-xs transition hover:bg-neutral-800 flex items-center justify-between ${language === opt.code ? 'text-neon-400 font-bold bg-neutral-800/50' : 'text-neutral-300'}`}
                   >
                     {opt.label}
                   </button>
                 ))}
              </div>
            )}
          </div>

          <a 
            href="https://wa.me/1234567890" 
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 rounded-full border border-neutral-600 text-neutral-300 hover:border-neon-400 hover:text-neon-400 transition text-sm font-medium"
          >
            WhatsApp
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-neutral-900 border-b border-neutral-800 p-6 flex flex-col gap-4 md:hidden">
           {navLinks.map(link => (
            <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white py-2 border-b border-neutral-800">
              {link.name}
            </a>
          ))}
          <div className="flex items-center justify-between py-2 border-b border-neutral-800">
            <span className="text-neutral-400">Language</span>
            <div className="flex gap-3">
              <button onClick={() => setLanguage('zh')} className={`text-sm ${language === 'zh' ? 'text-neon-400' : 'text-white'}`}>中文</button>
              <button onClick={() => setLanguage('en')} className={`text-sm ${language === 'en' ? 'text-neon-400' : 'text-white'}`}>EN</button>
              <button onClick={() => setLanguage('es')} className={`text-sm ${language === 'es' ? 'text-neon-400' : 'text-white'}`}>ES</button>
            </div>
          </div>
          <a href="https://wa.me/1234567890" className="text-neon-400 font-bold mt-2 flex items-center gap-2">
            WhatsApp <ArrowRight size={16}/>
          </a>
        </div>
      )}
    </header>
  );
};

const Hero = () => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={IMAGES.heroBg} 
          alt="Carbon Fiber Supercar" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent"></div>
        <div className="absolute inset-0 bg-carbon-pattern opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-block px-3 py-1 bg-neon-500/10 border border-neon-500/20 rounded-full text-neon-400 text-xs font-bold tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {t.hero.badge}
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
            {t.hero.title_1}<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">{t.hero.title_2}</span><br/>
            {t.hero.title_3}
          </h1>
          <p className="text-lg text-neutral-400 mb-8 max-w-lg animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            {t.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <a href="#products" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition flex items-center justify-center gap-2">
              {t.hero.cta_products} <ArrowRight size={18} />
            </a>
            <a href="#customize" className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition backdrop-blur-sm flex items-center justify-center">
              {t.hero.cta_customize}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ title, price, image, category }: { title: string, price: string, image: string, category: string }) => (
  <div className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neon-500/50 transition-all duration-300">
    <div className="aspect-[4/3] overflow-hidden bg-neutral-800">
      <img src={image} alt={title} className="w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
      <div className="absolute top-4 left-4 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs font-bold text-white uppercase tracking-wider">
        {category}
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <div className="flex justify-between items-end">
        <span className="text-neon-400 font-mono text-lg">{price}</span>
        <button className="text-sm text-neutral-400 hover:text-white flex items-center gap-1 transition">
           <ExternalLink size={14} />
        </button>
      </div>
    </div>
  </div>
);

const Products = () => {
  const { t } = useLanguage();
  
  // Dynamic products list based on translation
  const products = [
    { title: t.products.items.military_plate, price: "$$$", category: t.products.categories.military, image: IMAGES.products.militaryPlate },
    { title: t.products.items.drone_frame, price: "$85", category: t.products.categories.tech, image: IMAGES.products.droneFrame },
    { title: t.products.items.steering_wheel, price: "$$$", category: t.products.categories.automotive, image: IMAGES.products.steeringWheel },
    { title: t.products.items.spoiler, price: "$350", category: t.products.categories.automotive, image: IMAGES.products.spoiler },
    { title: t.products.items.engine_cover, price: "$$$", category: t.products.categories.automotive, image: IMAGES.products.engineCover },
    { title: t.products.items.cardholder, price: "$45", category: t.products.categories.lifestyle, image: IMAGES.products.cardholder },
  ];

  return (
    <section id="products" className="py-24 bg-neutral-950 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.products.title}</h2>
            <p className="text-neutral-500">{t.products.subtitle}</p>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-neon-400 font-bold hover:gap-3 transition-all">
            {t.products.view_all} <ArrowRight size={20} />
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p, i) => (
            <ProductCard 
              key={i} 
              title={p.title} 
              price={p.price} 
              image={p.image} 
              category={p.category}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <a href="#" className="inline-flex items-center gap-2 text-neon-400 font-bold">
            {t.products.view_all} <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

const Technology = () => {
  const { t } = useLanguage();
  return (
    <section id="technology" className="py-24 bg-neutral-900 border-y border-neutral-800 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">{t.technology.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 flex items-center justify-center mb-6 shadow-xl">
              <span className="text-3xl">🪶</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{t.technology.lightweight.title}</h3>
            <p className="text-neutral-400 leading-relaxed">
              {t.technology.lightweight.desc}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 flex items-center justify-center mb-6 shadow-xl">
              <span className="text-3xl">🛡️</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{t.technology.strength.title}</h3>
            <p className="text-neutral-400 leading-relaxed">
              {t.technology.strength.desc}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 flex items-center justify-center mb-6 shadow-xl">
              <span className="text-3xl">🔥</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{t.technology.durability.title}</h3>
            <p className="text-neutral-400 leading-relaxed">
              {t.technology.durability.desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-neutral-950 pt-24 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="text-2xl font-black text-white italic mb-6">
              CARBON<span className="text-neon-400">X</span>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed mb-6">
              {t.footer.desc}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{t.footer.explore}</h4>
            <ul className="space-y-4 text-sm text-neutral-500">
              <li><a href="#" className="hover:text-neon-400 transition">{t.nav.home}</a></li>
              <li><a href="#products" className="hover:text-neon-400 transition">{t.nav.products}</a></li>
              <li><a href="#customize" className="hover:text-neon-400 transition">{t.nav.customize}</a></li>
              <li><a href="#technology" className="hover:text-neon-400 transition">{t.nav.technology}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{t.footer.legal}</h4>
            <ul className="space-y-4 text-sm text-neutral-500">
              <li><a href="#" className="hover:text-neon-400 transition">Privacy</a></li>
              <li><a href="#" className="hover:text-neon-400 transition">Terms</a></li>
              <li><a href="#" className="hover:text-neon-400 transition">Shipping</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{t.footer.contact}</h4>
            <div className="space-y-4">
              <a href="https://wa.me/1234567890" className="flex items-center gap-3 text-neutral-400 hover:text-white transition group">
                <div className="w-8 h-8 rounded bg-green-500/10 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-black transition">
                  <Phone size={14} />
                </div>
                <span className="text-sm">+1 (555) 123-4567</span>
              </a>
              <a href="mailto:info@carbonx.com" className="flex items-center gap-3 text-neutral-400 hover:text-white transition group">
                <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-black transition">
                  <Mail size={14} />
                </div>
                <span className="text-sm">info@carbonx.com</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600">
          <p>&copy; {new Date().getFullYear()} {t.footer.rights}</p>
          <p>Design meets Performance.</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <div className="bg-neutral-950 min-h-screen text-white font-sans selection:bg-neon-500/30 selection:text-neon-200">
        <Header />
        <main>
          <Hero />
          <Products />
          <Technology />
          <Customizer />
        </main>
        <Footer />
        <AIChatbot />
      </div>
    </LanguageProvider>
  );
}
