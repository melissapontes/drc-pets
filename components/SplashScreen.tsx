"use client";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("splashShown")) return;
    setVisible(true);
    const fadeTimer = setTimeout(() => setFading(true), 1800);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("splashShown", "1");
    }, 2300);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="lg:hidden fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#550084] text-white px-8"
      style={{
        backgroundImage: "url('/rimHero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "opacity 0.5s ease",
        opacity: fading ? 0 : 1,
      }}
    >
      <div className="absolute inset-0 bg-[#550084] opacity-80" />
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
          Doença renal crônica<br />em cães e gatos
        </h1>
        <p className="text-lg text-[#e8ccff] mt-3">Guia educativo para responsáveis</p>
      </div>
    </div>
  );
}
