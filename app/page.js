"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const WEDDING_DATE = new Date("2026-04-25T19:00:00");

const GALLERY = [
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

const CEREMONY_DETAILS = [
  {
    label: "Fecha",
    value: "Sábado, 25 de abril de 2026",
  },
  {
    label: "Hora",
    value: "7:00 PM",
  },
  {
    label: "Lugar",
    value: "Parroquia San Juan Bosco",
  },
  {
    label: "Invitación",
    value: "Válida para la ceremonia religiosa",
  },
];

const GOSPEL_MESSAGE = {
  eyebrow: "Evangelio de Juan 10:1-10",
  quote:
    "En Cristo encontramos la puerta que nos conduce a la vida plena, y deseamos comenzar nuestro matrimonio caminando de su mano.",
  note: "Inspirado en Juan 10:9-10",
};

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

function formatCountdown(targetDate) {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    return { days: "00", hours: "00", minutes: "00", seconds: "00" };
  }

  return {
    days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0"),
    hours: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
    minutes: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0"),
    seconds: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
  };
}

export default function WeddingInvite() {
  const [scrollY, setScrollY] = useState(0);
  const [timeLeft, setTimeLeft] = useState(() => formatCountdown(WEDDING_DATE));
  const [musicOn, setMusicOn] = useState(false);

  const audioRef = useRef(null);
  const carouselRef = useRef(null);
  const scrollInterval = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const timer = setInterval(() => {
      setTimeLeft(formatCountdown(WEDDING_DATE));
    }, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const startAutoScroll = () => {
      scrollInterval.current = setInterval(() => {
        if (!el) return;

        el.scrollBy({ left: 1, behavior: "auto" });

        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
          el.scrollTo({ left: 0, behavior: "auto" });
        }
      }, 18);
    };

    startAutoScroll();

    return () => {
      clearInterval(scrollInterval.current);
    };
  }, []);

  const pauseScroll = () => clearInterval(scrollInterval.current);

  const resumeScroll = () => {
    const el = carouselRef.current;
    if (!el) return;

    clearInterval(scrollInterval.current);
    scrollInterval.current = setInterval(() => {
      el.scrollBy({ left: 1, behavior: "auto" });

      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
        el.scrollTo({ left: 0, behavior: "auto" });
      }
    }, 18);
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.25;

    try {
      if (musicOn) {
        audio.pause();
      } else {
        await audio.play();
      }

      setMusicOn((current) => !current);
    } catch {
      console.warn("La reproducción automática fue bloqueada hasta interactuar.");
    }
  };

  return (
    <main className="relative overflow-hidden bg-[var(--color-ivory)] text-[var(--color-ink)]">
      <audio ref={audioRef} loop>
        <source src="/music/boda.mp3" type="audio/mp3" />
      </audio>

      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,162,92,0.18),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(146,114,72,0.16),_transparent_30%)]" />
        <motion.div
          aria-hidden
          className="absolute left-0 top-0 h-[24rem] w-[20rem] md:h-[34rem] md:w-[28rem]"
          style={{ y: scrollY * 0.08 }}
        >
          <Image
            src="/images/flowers1.png"
            alt=""
            fill
            className="object-contain object-top-left opacity-70"
          />
        </motion.div>
        <motion.div
          aria-hidden
          className="absolute right-0 top-[18%] h-[20rem] w-[18rem] rotate-[8deg] md:h-[28rem] md:w-[22rem]"
          style={{ y: scrollY * 0.12 }}
        >
          <Image
            src="/images/flowers2.png"
            alt=""
            fill
            className="object-contain object-top-right opacity-70"
          />
        </motion.div>
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-0 h-[22rem] w-[18rem] -rotate-[8deg] md:h-[30rem] md:w-[24rem]"
          style={{ y: scrollY * 0.18 }}
        >
          <Image
            src="/images/flowers3.png"
            alt=""
            fill
            className="object-contain object-bottom-left opacity-65"
          />
        </motion.div>
        <motion.div
          aria-hidden
          className="absolute bottom-[6%] right-[2%] h-[18rem] w-[16rem] rotate-180 md:h-[24rem] md:w-[20rem]"
          style={{ y: scrollY * 0.22 }}
        >
          <Image
            src="/images/flowers4.png"
            alt=""
            fill
            className="object-contain object-bottom-right opacity-60"
          />
        </motion.div>
      </div>

      <button
        type="button"
        onClick={toggleMusic}
        className="fixed right-4 top-4 z-50 rounded-full border border-white/50 bg-white/72 px-4 py-2 text-sm font-medium text-[var(--color-ink)] shadow-[0_16px_40px_rgba(40,28,19,0.12)] backdrop-blur md:right-6 md:top-6"
      >
        {musicOn ? "Silenciar música" : "Activar música"}
      </button>

      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            style={{ scale: 1 + scrollY * 0.00025 }}
          >
            <Image
              src="/images/portada.png"
              alt="Juan y Verónica en una fotografía de portada"
              fill
              priority
              className="object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,20,12,0.18)_0%,rgba(31,20,12,0.40)_48%,rgba(31,20,12,0.72)_100%)]" />
        </div>

        <div className="relative z-10 flex min-h-screen items-end px-6 pb-12 pt-28 md:px-10 md:pb-16 md:pt-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(320px,430px)] md:items-end"
          >
            <div className="max-w-2xl text-white">
              <p className="mb-4 text-xs uppercase tracking-[0.5em] text-white/78 md:text-sm">
                Invitación a nuestra ceremonia
              </p>
              <h1 className="font-display text-6xl leading-none md:text-[8.5rem]">
                J
                <span className="mx-2 inline-block text-[0.42em] align-middle text-[var(--color-champagne)] md:mx-4">
                  &
                </span>
                V
              </h1>
              <p className="mt-4 max-w-xl font-display text-3xl md:text-5xl">
                Juan Camilo Montaño
                <span className="mx-3 text-[var(--color-champagne)]">&</span>
                Lesly Verónica Obregón
              </p>
              <p className="mt-6 max-w-lg text-base leading-7 text-white/84 md:text-lg">
                Con inmensa alegría queremos compartir contigo el inicio de esta
                nueva etapa y celebrar juntos nuestro matrimonio ante Dios.
              </p>
            </div>

            <div className="backdrop-blur-xs rounded-[2rem] border border-white/25 bg-[linear-gradient(180deg,rgba(255,248,240,0.82),rgba(255,248,240,0.64))] p-6 text-[var(--color-ink)] shadow-[0_28px_80px_rgba(24,14,9,0.16)] md:p-8">
              <div className="flex items-center justify-between gap-4 border-b border-[var(--color-line)] pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.36em] text-[var(--color-muted)]">
                    Ceremonia
                  </p>
                  <p className="mt-2 font-display text-3xl">25 abril 2026</p>
                </div>
                <div className="h-12 w-12 rounded-full border border-[var(--color-line)] bg-white/60" />
              </div>

              <div className="mt-6 grid grid-cols-4 gap-3 text-center">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div
                    key={unit}
                    className="rounded-[1.3rem] border border-white/50 bg-white/70 px-2 py-4 shadow-[0_10px_30px_rgba(24,14,9,0.06)]"
                  >
                    <div className="font-display text-3xl">{value}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-[var(--color-muted)]">
                      {unit === "days" && "Días"}
                      {unit === "hours" && "Horas"}
                      {unit === "minutes" && "Min"}
                      {unit === "seconds" && "Seg"}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 rounded-[1.4rem] border border-[rgba(162,122,73,0.18)] bg-[rgba(162,122,73,0.08)] px-4 py-4 text-sm leading-6 text-[var(--color-deep)]">
                Una noche para encontrarnos, agradecer y vivir con emoción este
                momento tan sagrado.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-5xl px-6 py-6 md:px-10 md:py-10"
      >
        <div className="overflow-hidden rounded-[2.4rem] border border-[var(--color-line)] bg-[linear-gradient(135deg,rgba(255,251,246,0.92),rgba(246,237,226,0.82))] px-7 py-10 shadow-[0_20px_60px_rgba(40,28,19,0.10)] md:px-12 md:py-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.42em] text-[var(--color-muted)]">
              {GOSPEL_MESSAGE.eyebrow}
            </p>
            <p className="mt-6 font-display text-3xl leading-tight text-[var(--color-deep)] md:text-5xl">
              “{GOSPEL_MESSAGE.quote}”
            </p>
            <p className="mt-6 text-sm uppercase tracking-[0.26em] text-[var(--color-muted)]">
              {GOSPEL_MESSAGE.note}
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto -mt-10 grid max-w-6xl gap-6 px-6 pb-10 md:-mt-16 md:grid-cols-[1.15fr_0.85fr] md:px-10"
      >
        <div className="rounded-[2rem] border border-[var(--color-line)] bg-[rgba(255,251,246,0.82)] p-8 shadow-[0_18px_50px_rgba(40,28,19,0.08)] backdrop-blur">
          <p className="text-xs uppercase tracking-[0.38em] text-[var(--color-muted)]">
            Detalles del día
          </p>
          <p className="mt-5 font-display text-4xl text-[var(--color-deep)] md:text-5xl">
            Nos haría muy felices contar con tu presencia
          </p>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-copy)]">
            Tu compañía hará aún más especial este instante que llevamos en el
            corazón. Gracias por acompañarnos en una ceremonia llena de fe,
            amor y gratitud.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {CEREMONY_DETAILS.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.6rem] border border-[var(--color-line)] bg-white/72 p-5"
              >
                <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--color-muted)]">
                  {item.label}
                </p>
                <p className="mt-3 text-lg leading-7 text-[var(--color-deep)]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[var(--color-line)] bg-[rgba(96,68,43,0.93)] p-8 text-[var(--color-cream)] shadow-[0_18px_50px_rgba(40,28,19,0.14)]">
          <p className="text-xs uppercase tracking-[0.38em] text-[var(--color-champagne)]">
            Ubicación
          </p>
          <p className="mt-5 font-display text-4xl md:text-[2.8rem]">
            Parroquia San Juan Bosco
          </p>
          <p className="mt-4 text-sm leading-7 text-[rgba(255,246,236,0.82)]">
            Hemos preparado esta invitación para compartir contigo los detalles
            de nuestra ceremonia y acompañarnos en un momento que recordaremos
            para siempre.
          </p>
          <a
            href="https://maps.app.goo.gl/o9f6TPctt82EVftp6"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center rounded-full border border-[rgba(255,247,236,0.34)] bg-white/10 px-6 py-3 text-sm font-medium tracking-[0.14em] text-white transition duration-300 hover:bg-white/18"
          >
            Ver ubicación en Maps
          </a>
        </div>
      </motion.section>

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-18"
      >
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.38em] text-[var(--color-muted)]">
              Nuestra historia
            </p>
            <p className="mt-4 font-display text-4xl text-[var(--color-deep)] md:text-5xl">
              Fragmentos de un amor que florece
            </p>
            <p className="mt-4 max-w-md text-base leading-8 text-[var(--color-copy)]">
              Una selección de instantes que guardan la esencia de nuestro
              camino y la emoción de lo que estamos por vivir.
            </p>
          </div>

          <div
            ref={carouselRef}
            onMouseEnter={pauseScroll}
            onMouseLeave={resumeScroll}
            className="flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {GALLERY.map((img, index) => (
              <motion.div
                key={img}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`relative shrink-0 overflow-hidden rounded-[1.8rem] border border-[rgba(151,118,75,0.18)] shadow-[0_16px_40px_rgba(35,24,16,0.10)] ${
                  index % 3 === 0
                    ? "h-[22rem] w-[17rem] md:h-[28rem] md:w-[20rem]"
                    : "h-[18rem] w-[15rem] md:h-[24rem] md:w-[18rem]"
                }`}
              >
                <Image
                  src={img}
                  alt={`Fotografía ${index + 1} de Juan y Verónica`}
                  fill
                  sizes="(max-width: 768px) 60vw, 22rem"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-6xl px-6 py-8 md:px-10"
      >
        <div className="rounded-[2rem] border border-[var(--color-line)] bg-[rgba(255,250,245,0.78)] p-8 shadow-[0_18px_50px_rgba(40,28,19,0.08)] backdrop-blur md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.38em] text-[var(--color-muted)]">
                Confirmación
              </p>
              <p className="mt-5 font-display text-4xl text-[var(--color-deep)] md:text-5xl">
                Confirma tu presencia
              </p>
              <p className="mt-4 max-w-xl text-base leading-8 text-[var(--color-copy)]">
                Nos encantará compartir contigo este día tan significativo.
                Agradecemos tu confirmación para acompañarnos en la ceremonia.
              </p>
            </div>

            <div className="rounded-[1.8rem] border border-[var(--color-line)] bg-white/70 p-6 md:p-7">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--color-muted)]">
                Responder
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-copy)]">
                Puedes confirmar tu asistencia en el medio que te resulte más
                cómodo.
              </p>

              <div className="mt-6 flex flex-col gap-4">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScVhCEAtqJb-zwlF6PZwAKj8pcUl2U1CXqVEfG0I6OKxVZpJA/viewform?usp=publish-editor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-7 py-4 text-sm font-semibold tracking-[0.14em] text-white shadow-[0_18px_40px_rgba(162,122,73,0.26)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-accent-strong)]"
                >
                  Confirmar asistencia
                </a>
                <a
                  href="https://wa.me/573234017625"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--color-line-strong)] px-7 py-4 text-sm font-semibold tracking-[0.14em] text-[var(--color-deep)] transition duration-300 hover:bg-white/70"
                >
                  Confirmar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-4xl px-6 pb-20 pt-14 text-center md:px-10"
      >
        <div className="mx-auto h-px w-32 bg-[linear-gradient(90deg,transparent,var(--color-line-strong),transparent)]" />
        <p className="mt-10 font-display text-4xl text-[var(--color-deep)] md:text-5xl">
          Tu presencia será nuestro mayor regalo
        </p>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--color-copy)]">
          Gracias por ser parte de nuestra historia y por acompañarnos en este
          capítulo que comienza con ilusión, amor y gratitud.
        </p>
      </motion.section>
    </main>
  );
}
