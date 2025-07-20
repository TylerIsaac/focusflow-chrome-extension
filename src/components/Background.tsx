import React, { useState, useEffect, ReactNode } from "react";
import backgrounds from "../backgrounds.json";
import BackgroundSwitcher from "./BackgroundSwitcher";

interface BackgroundProps {
  children: ReactNode;
}

export default function Background({ children }: BackgroundProps) {
  const [bgUrl, setBgUrl] = useState<string>("");

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const storedDate = localStorage.getItem("bgDate");
    const storedUrl = localStorage.getItem("bgUrl");

    if (storedDate === today && storedUrl) {
      setBgUrl(storedUrl);
    } else {
      const idx = Math.floor(Math.random() * backgrounds.length);
      const url = backgrounds[idx];
      setBgUrl(url);
      localStorage.setItem("bgDate", today);
      localStorage.setItem("bgUrl", url);
      localStorage.setItem("bgIdx", idx.toString());
    }
  }, []);

  const changeBg = () => {
    const today = new Date().toISOString().slice(0, 10);
    let idx = parseInt(localStorage.getItem("bgIdx") || "0", 10);
    idx = (idx + 1) % backgrounds.length;
    const url = backgrounds[idx];
    setBgUrl(url);
    localStorage.setItem("bgDate", today);
    localStorage.setItem("bgUrl", url);
    localStorage.setItem("bgIdx", idx.toString());
  };

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* tint overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* full-screen flex container for centering */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">{children}</div>

      {/* fixed position controls */}
      <BackgroundSwitcher onSkip={changeBg} />
    </div>
  );
}
