import { useState, useEffect } from 'react';
import { Camera, MessageCircle, Mic2, Music, ArrowRight, Mouse, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from './supabaseClient';

export default function LandingCantante() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showData, setShowData] = useState({ text: '', link: '', active: false });

  // EFECTO 1: Escuchar el scroll para borrar la flechita
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // EFECTO 2: Leer Supabase para el Banner de Próximo Show
  useEffect(() => {
    const fetchProximoShow = async () => {
      const { data, error } = await supabase
        .from('shows')
        .select('text, link, active')
        .eq('active', true)
        .limit(1);

      if (error) {
        console.error("Error consultando Supabase:", error);
        return;
      }

      if (data && data.length > 0) {
        setShowData({
          text: data[0].text,
          link: data[0].link,
          active: data[0].active
        });
      }
    };

    fetchProximoShow();
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. BANNER INTELIGENTE (Flota superpuesto sin empujar la navegación) */}
      {showData.active && (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, x: "-50%" }}
          animate={{ scale: 1, opacity: 1, x: "-50%" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
          className="fixed bottom-6 md:bottom-auto md:top-6 left-1/2 w-[90%] md:w-auto max-w-3xl bg-[#D4AF37] text-black px-6 py-3 rounded-2xl md:rounded-full flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 z-[60] shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-[#B5952F]/30"
        >
          <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-center">
            {showData.text}
          </span>
          <a 
            href={showData.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] sm:text-xs bg-black text-[#D4AF37] px-5 py-2.5 rounded-full uppercase tracking-widest font-bold hover:bg-neutral-800 transition-colors shrink-0 shadow-md"
          >
            !GRATIS!
          </a>
        </motion.div>
      )}

      {/* 2. HERO SECTION */}
      <header className="relative h-[100dvh] flex flex-col items-center justify-center text-center px-6">
        
        {/* NAVEGACIÓN (Firme en el techo en todo momento, top-0 absoluto) */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-0 left-0 w-full flex justify-between items-center p-6 md:px-12 z-40 bg-black/50 backdrop-blur-sm border-b border-white/5"
        >
          <span className="font-serif text-xl leading-tight text-white">Alfonsina<br/>GUIBELALDE</span>
          <a href="#contacto" className="text-sm font-medium tracking-wide uppercase text-neutral-300 hover:text-[#E6C762] transition-colors">
            Contacto
          </a>
        </motion.nav>

        {/* FONDO DEL HERO */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/alfon3.webp" 
            alt="Fondo de escenario" 
            className="w-full h-full object-cover object-[center_40%] grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/70 to-black"></div>
        </motion.div>
        
        {/* TEXTOS DEL HERO */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl w-full"
        >
          <motion.p variants={fadeUp} className="text-[#D4AF37] font-semibold tracking-widest uppercase mb-4 text-sm md:text-base drop-shadow-md">
            Cantante Profesional
          </motion.p>
          
          <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-8xl leading-tight text-white mb-6">
            Soulful Vocals<br className="hidden md:block" />
          </motion.h1>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="https://wa.me/5492954227417?text=Hola%20Alfonsina,%20me%20gustaría%20saber%20más%20sobre%20las%20clases%20de%20canto!" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#D4AF37] text-[#D4AF37] w-full sm:w-auto px-8 py-4 rounded-none uppercase tracking-widest text-xs font-bold hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
              Agendar Clases <ArrowRight size={16} />
            </a>
            
            <a href="#contacto" className="inline-flex items-center justify-center gap-2 border border-[#D4AF37] text-[#D4AF37] w-full sm:w-auto px-8 py-4 rounded-none uppercase tracking-widest text-xs font-bold hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
              Agendar Show <ArrowRight size={16} />
            </a>
          </motion.div>
        </motion.div>

        {/* INDICADOR DE SCROLL INTELIGENTE */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isScrolled ? 0 : 1 }}
          transition={{ delay: isScrolled ? 0 : 1.5, duration: 0.5 }}
          className={`absolute ${showData.active ? 'bottom-32 md:bottom-12' : 'bottom-8 md:bottom-12'} left-1/2 -translate-x-1/2 text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors cursor-pointer animate-bounce z-20 ${isScrolled ? 'pointer-events-none' : ''}`}
        >
          <a href="#bio" className="flex flex-col items-center gap-2">
            <div className="hidden sm:flex flex-col items-center gap-2">
              <Mouse size={24} />
              <span className="text-[10px] uppercase tracking-widest font-bold">Scroll Down</span>
            </div>
            <div className="flex sm:hidden flex-col items-center">
              <ChevronDown size={32} />
            </div>
          </a>
        </motion.div>
      </header>

      {/* BIO / PERFIL */}
      <section id="bio" className="py-24 px-6 md:px-12 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 overflow-hidden bg-black">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2"
        >
          <div className="aspect-[3/4] overflow-hidden border border-[#D4AF37]/20 relative">
            <div className="absolute inset-0 bg-[#D4AF37]/10 z-10 mix-blend-overlay hover:opacity-0 transition-opacity duration-700"></div>
            <img 
              src="/alfon14.webp" 
              alt="Retrato de Alfonsina" 
              className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full md:w-1/2 space-y-6"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-white">Más que técnica,<br/><span className="text-[#D4AF37]">es emoción.</span></h2>
          <div className="w-12 h-0.5 bg-[#D4AF37]"></div>
          <p className="text-neutral-400 leading-relaxed text-justify">
            Soy cantante, arregladora vocal y docente. Mi identidad musical se construye a través del Soul, el RnB y el Jazz, géneros que exploré profundamente durante mi formación en la EMBA y mi paso por el Seminario del CLAEM en República Dominicana, donde fui becada para perfeccionar mi técnica y estilo vocal.
          </p>
          <p className="text-neutral-400 leading-relaxed text-justify">
            Para mí, el escenario es el lugar donde todo cobra sentido. He tenido el placer de recorrer la escena porteña presentándome en espacios como Bebop Club, La Tangente, Niceto Club, Ciudad Cultural Konex y Café Berlín, tanto en proyectos propios como en sesiones en vivo. Esa misma pasión por la interpretación es la que hoy vuelco en mi labor docente, acompañando a cada estudiante a descubrir su propia voz y sensibilidad musical.
          </p>
        </motion.div>
      </section>

      {/* SERVICIOS DUALES */}
      <section className="py-24 bg-neutral-950 px-6 md:px-12 border-y border-neutral-900">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-center mb-16 text-white">Servicios</motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} className="group bg-black p-12 hover:border-[#D4AF37] transition-colors duration-500 border border-neutral-800">
              <Mic2 size={32} className="text-[#D4AF37] group-hover:text-[#E6C762] mb-8 transition-colors" />
              <h3 className="font-serif text-2xl mb-4 text-white">Eventos & Shows</h3>
              <p className="text-neutral-400 group-hover:text-neutral-300 mb-8 leading-relaxed">
                Repertorio versátil para casamientos, eventos corporativos y acústicos íntimos. Un show armado a la medida del clima que quieras generar.
              </p>
              <a href="#contacto" className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] border-b border-[#D4AF37]/30 group-hover:border-[#D4AF37] pb-1 transition-colors">Consultar via mail</a>
            </motion.div>

            <motion.div variants={fadeUp} className="group bg-black p-12 hover:border-[#D4AF37] transition-colors duration-500 border border-neutral-800">
              <Music size={32} className="text-[#D4AF37] group-hover:text-[#E6C762] mb-8 transition-colors" />
              <h3 className="font-serif text-2xl mb-4 text-white">Clases de Canto</h3>
              <p className="text-neutral-400 group-hover:text-neutral-300 mb-8 leading-relaxed">
                Clases particulares presenciales o virtuales. Enfoque anatómico, cuidado de la voz, respiración y armado de repertorio propio.
              </p>
              <a href="https://wa.me/5492954227417?text=Hola%20Alfonsina,%20me%20gustaría%20saber%20más%20sobre%20las%20clases%20de%20canto!" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] border-b border-[#D4AF37]/30 group-hover:border-[#D4AF37] pb-1 transition-colors">Consultar Horarios
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* PORTFOLIO ROTATIVO (CARRUSEL INFINITO) */}
      <section className="py-12 bg-black relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

            <motion.div 
              className="flex gap-4 w-max will-change-transform"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 30, repeat: Infinity }}
  >
              {[
               "/alfon9.webp", "/alfon2.webp", "/alfon12.webp", "/alfon4.webp", 
               "/alfon5.webp", "/alfon6.webp", "/alfon13.webp", "/alfon9.webp", 
               "/alfon2.webp", "/alfon12.webp", "/alfon4.webp", "/alfon5.webp", 
               "/alfon6.webp", "/alfon13.webp"
              ].map((src, index) => (
               /* Agregamos transform-gpu al contenedor para forzar el renderizado por placa de video */
              <div key={index} className="w-64 md:w-96 shrink-0 overflow-hidden border border-neutral-900 bg-neutral-950 transform-gpu">
                <img 
                   loading="lazy"
                   src={src} 
                   alt={`Portfolio ${index + 1}`} 
               /* OPTIMIZACIÓN ACÁ: Cambiamos transition-all por transition-transform y sacamos el scale si sigue tironeando */
                   className="w-full h-64 md:h-96 object-cover opacity-80 hover:opacity-100 transition-transform duration-500 ease-out hover:scale-102 transform-gpu" 
                />
              </div>
               ))}
            </motion.div>
      </section>

      {/* CONTACTO */}
      <motion.section 
        id="contacto" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center bg-black"
      >
        <motion.h2 variants={fadeUp} className="font-serif text-4xl mb-6 text-white">Hablemos!</motion.h2>
        <motion.p variants={fadeUp} className="text-neutral-400 mb-12">Por consultas o contrataciones no dudes en contactarme.</motion.p>
        
        <motion.form 
          action="https://formspree.io/f/xvzypzbk" 
          method="POST"
          variants={fadeUp} 
          className="space-y-6 max-w-xl mx-auto mb-16 text-left"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input 
              type="text" 
              name="nombre"
              required
              placeholder="Tu Nombre" 
              className="w-full border-b border-neutral-800 bg-transparent py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-neutral-600" 
            />
            <input 
              type="email" 
              name="email"
              required
              placeholder="Tu Email" 
              className="w-full border-b border-neutral-800 bg-transparent py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-neutral-600" 
            />
          </div>
          <textarea 
            name="mensaje"
            required
            placeholder="¿En qué te puedo ayudar?" 
            rows="1" 
            className="w-full border-b border-neutral-800 bg-transparent py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-neutral-600 resize-none"
          ></textarea>
          <button type="submit" className="w-full bg-[#D4AF37] text-black py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#B5952F] transition-colors">
            Enviar Mensaje
          </button>
        </motion.form>

        <motion.div variants={fadeUp} className="flex justify-center gap-8">
          <a href="https://www.instagram.com/alfonguibe/" className="flex flex-col items-center gap-2 text-neutral-500 hover:text-[#D4AF37] transition-colors hover:-translate-y-1 duration-300">
            <Camera size={24} />
            <span className="text-xs uppercase tracking-widest font-bold">Instagram</span>
          </a>
        </motion.div>
      </motion.section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-neutral-900 text-center px-6 bg-black pb-32 md:pb-8">
        <p className="text-xs text-neutral-600 tracking-widest uppercase">
          © {new Date().getFullYear()} Alfonsina Guibelalde. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}