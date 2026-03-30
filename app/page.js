"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function WeddingInvite() {
  const weddingDate = new Date("2026-04-25T19:00:00");
  const [timeLeft, setTimeLeft] = useState({});
  const [musicOn, setMusicOn] = useState(false);
  const [name, setName] = useState("");
  const [allowed, setAllowed] = useState(null);

  const carouselRef = useRef(null);
  const scrollInterval = useRef(null);

  const portadaImg = "/images/portada.png";

  const gallery = [
    "/images/photo1.jpeg",
    "/images/photo2.jpeg",
    "/images/photo3.jpeg",
    "/images/photo4.jpeg",
    "/images/photo5.jpeg",
    "/images/photo6.jpeg",
    "/images/photo7.jpeg",
    "/images/photo8.jpeg",
    "/images/photo9.jpeg",
    "/images/photo10.jpeg",
    "/images/photo11.jpeg",
  ];

  const guestList = [
    "Alex Lerma",
    "Alexandra Lerma",
    "Mary",
    "Astiano Murillo",
    "Sharon Anchico",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = weddingDate - now;
      if (diff <= 0) return;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    scrollInterval.current = setInterval(() => {
      el.scrollBy({ left: 1, behavior: "smooth" });

      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 30);

    return () => clearInterval(scrollInterval.current);
  }, []);

  const pauseScroll = () => clearInterval(scrollInterval.current);

  const resumeScroll = () => {
    const el = carouselRef.current;
    if (!el) return;

    scrollInterval.current = setInterval(() => {
      el.scrollBy({ left: 1, behavior: "smooth" });

      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 30);
  };

  const validateGuest = () => {
    const normalized = guestList.map((n) => n.toLowerCase().trim());
    setAllowed(normalized.includes(name.toLowerCase().trim()));
  };

  const fadeUp = {
    hidden: { y: 40 },
    visible: { y: 0 },
  };

  return (
    <div className="text-center text-[#3e2f25] relative overflow-hidden bg-[#f6efe7]" style={{ fontFamily: "'Playfair Display', serif" }}>

      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Great+Vibes&display=swap" rel="stylesheet" />

      {/* DECORACIÓN GLOBAL */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-30"></div>

      {/* FLORES ACUARELA PREMIUM (sin opacidad animada) */}
      <motion.img
        src="/images/flowers1.jpg"
        className="absolute top-0 left-0 w-72 opacity-70 pointer-events-none"
        initial={{ y: -20 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.img
        src="/images/flowers2.jpg"
        className="absolute top-1/3 right-0 w-64 opacity-70 pointer-events-none rotate-12"
        initial={{ y: 20 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity }}
      />

      <motion.img
        src="/images/flowers3.jpg"
        className="absolute bottom-0 left-10 w-60 opacity-70 pointer-events-none -rotate-12"
        initial={{ y: 15 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.img
        src="/images/flowers4.jpg"
        className="absolute bottom-20 right-10 w-56 opacity-70 pointer-events-none rotate-180"
        initial={{ y: -15 }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 11, repeat: Infinity }}
      />

      {/* MÚSICA */}
      <audio id="music" loop>
        <source src="/music/boda.mp3" type="audio/mp3" />
      </audio>

      <button
        onClick={() => {
          const audio = document.getElementById("music");
          audio.volume = 0.3;
          musicOn ? audio.pause() : audio.play();
          setMusicOn(!musicOn);
        }}
        className="fixed top-4 right-4 bg-white/80 backdrop-blur px-4 py-2 rounded-xl shadow-lg z-50"
      >
        {musicOn ? "🔊 Música activada" : "🔇 Activar música"}
      </button>

      {/* PORTADA MEJORADA */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 relative">
        <img src={portadaImg} className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#00000060] to-[#00000030]"></div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 text-white"
        >
          <h1 className="text-7xl md:text-9xl font-light tracking-[0.4em]" style={{ fontFamily: "Great Vibes" }}>
            J & V
          </h1>

          <p className="text-3xl mt-6 font-semibold">Juan & Verónica</p>
          <p className="italic text-lg mt-2">Nos casamos</p>
          <p className="mt-4 text-lg">25 Abril 2026 - 7:00 PM</p>

          <div className="mt-6 flex gap-6 justify-center text-lg">
            <span>{timeLeft.days}d</span>
            <span>{timeLeft.hours}h</span>
            <span>{timeLeft.minutes}m</span>
            <span>{timeLeft.seconds}s</span>
          </div>
        </motion.div>
      </section>

      {/* INVITACIÓN */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }} className="p-8 max-w-2xl mx-auto">
        <div className="bg-white/80 rounded-3xl shadow-xl p-8 border border-[#d6c3a3]">
          <p className="italic">“No es bueno que el hombre esté solo…” – Génesis 2,18</p>

          <h2 className="mt-6 text-2xl font-semibold">Juan Camilo Montaño & Lesly Verónica Obregón</h2>

          <div className="mt-6">
            <p className="font-semibold">Ceremonia</p>
            <p>7:00 PM - Parroquia San Juan Bosco</p>
            <a href="https://maps.app.goo.gl/o9f6TPctt82EVftp6" target="_blank" className="underline">Ver ubicación</a>
          </div>

          <div className="mt-6">
            <p className="font-semibold">Recepción</p>
            <p>9:00 PM - Finca Hotel Los Guacamayos</p>
            <a href="https://maps.app.goo.gl/m123xDgmpxXahdsF6" target="_blank" className="underline">Ver ubicación</a>
          </div>
        </div>
      </motion.section>

      {/* GALERÍA */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }} className="p-10">
        <h2 className="text-3xl mb-6">Nuestra historia</h2>
        <div ref={carouselRef} onMouseEnter={pauseScroll} onMouseLeave={resumeScroll} className="flex gap-6 overflow-x-auto snap-x px-4">
          {gallery.map((img, i) => (
            <motion.img key={i} src={img} className="min-w-[250px] md:min-w-[300px] h-[300px] md:h-[400px] object-cover rounded-2xl shadow-xl border border-[#d6c3a3]" whileHover={{ scale: 1.08 }} />
          ))}
        </div>
      </motion.section>

      {/* CONFIRMACIÓN */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }} className="p-10">
        <h2 className="text-3xl mb-6">Confirmación de asistencia</h2>
        <div className="bg-white/80 rounded-3xl shadow-xl p-6 border border-[#d6c3a3] inline-block">
          <p className="mb-4 text-sm italic">Por favor confirma tu asistencia antes del evento</p>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScVhCEAtqJb-zwlF6PZwAKj8pcUl2U1CXqVEfG0I6OKxVZpJA/viewform?usp=publish-editor"
            target="_blank"
            className="inline-block px-8 py-4 rounded-xl font-semibold text-white shadow-lg bg-[#C68642] hover:bg-[#a86b2d] transition"
          >
            Confirmar asistencia aquí
          </a>

          <div className="mt-4">
            <a href="https://wa.me/573234017625" className="underline">Confirmar por WhatsApp</a>
          </div>
        </div>
      </motion.section>

      {/* VALIDACIÓN */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }} className="p-8">
        <div className="bg-white/80 rounded-2xl p-6 inline-block shadow">
          <h2 className="text-2xl mb-4">Validación de invitados</h2>
          <input type="text" placeholder="Ingresa tu nombre" value={name} onChange={(e) => setName(e.target.value)} className="border p-3 rounded-xl" />
          <button onClick={validateGuest} className="ml-3 bg-[#5a4636] text-white px-4 py-2 rounded-xl">Validar</button>

          {allowed === true && <p className="text-green-700 mt-3">Bienvenido 🎉</p>}
          {allowed === false && <p className="text-red-600 mt-3">No encontramos tu nombre</p>}
        </div>
      </motion.section>

      {/* FINAL */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }} className="p-10">
        <p className="italic max-w-xl mx-auto">¡Tu presencia es el mayor regalo! Gracias por acompañarnos en este momento tan especial.</p>
      </motion.section>

    </div>
  );
}