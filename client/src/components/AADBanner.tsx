import { useState, useEffect } from "react";
import { X, MapPin, Calendar, Star } from "lucide-react";

// EDT: show from May 1 9am, hide after May 2 midnight
const CONF_START = new Date("2026-05-01T09:00:00-04:00");
const CONF_END   = new Date("2026-05-03T00:00:00-04:00");

export function AADBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("acog-banner-dismissed") === "true") {
      setDismissed(true);
    }
    setIsLive(new Date() >= CONF_START && new Date() < CONF_END);
  }, []);

  if (new Date() >= CONF_END) return null;
  if (dismissed) return null;

  return (
    <>
      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 8px 2px rgba(201,162,39,0.5), 0 0 20px 4px rgba(201,162,39,0.2); }
          50%       { box-shadow: 0 0 16px 4px rgba(201,162,39,0.9), 0 0 40px 8px rgba(201,162,39,0.4); }
        }
      `}</style>

      <div
        className="w-full z-40 relative overflow-hidden"
        style={{
          background: "linear-gradient(90deg, #060e1f 0%, #0d1f40 30%, #1a3566 50%, #0d1f40 70%, #060e1f 100%)",
          borderTop: "2px solid #c9a227",
          borderBottom: "2px solid #c9a227",
          animation: "glow-pulse 2.5s ease-in-out infinite",
          padding: "10px 0",
        }}
      >
        {/* Shimmer overlay */}
        <div
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "linear-gradient(105deg, transparent 30%, rgba(255,220,100,0.07) 50%, transparent 70%)",
            backgroundSize: "800px 100%",
            animation: "shimmer 3s linear infinite",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4 relative">

          {/* Left badge */}
          <div className="flex items-center gap-2 shrink-0">
            <span
              className="font-black tracking-widest uppercase px-3 py-1 rounded text-sm"
              style={{
                background: "linear-gradient(135deg, #c9a227, #f0d060, #c9a227)",
                color: "#060e1f",
                boxShadow: "0 0 12px rgba(201,162,39,0.6)",
              }}
            >
              ACOG 2026
            </span>
            {isLive && (
              <span
                className="text-xs font-bold tracking-widest uppercase px-2 py-1 rounded animate-pulse"
                style={{ background: "#16a34a", color: "#fff", boxShadow: "0 0 8px rgba(34,197,94,0.6)" }}
              >
                LIVE NOW
              </span>
            )}
          </div>

          {/* Centre */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-center flex-1 min-w-0">

            <Star className="w-4 h-4 hidden sm:block" style={{ color: "#c9a227" }} fill="#c9a227" />

            <span
              className="font-bold whitespace-nowrap"
              style={{
                color: "#ffffff",
                fontSize: "1rem",
                letterSpacing: "0.01em",
                textShadow: "0 0 20px rgba(201,162,39,0.4)",
              }}
            >
              {isLive
                ? "We are LIVE at ACOG! Come and visit us at"
                : "Join us at the ACOG Annual Meeting — Come visit us at"}
              &nbsp;
              <span style={{ color: "#f0d060", fontWeight: 900 }}>Booth #1431</span>
            </span>

            <span className="hidden sm:flex items-center gap-1.5 text-sm font-medium" style={{ color: "#c9c9c9" }}>
              <MapPin className="w-3.5 h-3.5" style={{ color: "#c9a227" }} />
              Washington, D.C
            </span>

            <span className="hidden md:flex items-center gap-1.5 text-sm font-medium" style={{ color: "#c9c9c9" }}>
              <Calendar className="w-3.5 h-3.5" style={{ color: "#c9a227" }} />
              May 1 – 2
            </span>

            <Star className="w-4 h-4 hidden sm:block" style={{ color: "#c9a227" }} fill="#c9a227" />
          </div>

          {/* Dismiss */}
          <button
            onClick={() => {
              sessionStorage.setItem("acog-banner-dismissed", "true");
              setDismissed(true);
            }}
            className="shrink-0 p-1.5 rounded-full transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.15)" }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "rgba(255,255,255,0.4)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
            }}
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );
}
