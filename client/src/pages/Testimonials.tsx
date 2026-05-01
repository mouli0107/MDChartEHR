import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Star, Quote, ArrowRight, Users, Play, Pause, Volume2, VolumeX,
  SkipBack, SkipForward, Maximize, Minimize
} from "lucide-react";

const testimonials = [
  {
    quote: "The specialty-specific templates have transformed how we document patient visits. Our providers are happier and more efficient.",
    name: "Practice Administrator",
    specialty: "Multi-Specialty Practice"
  },
  {
    quote: "Switching to MD Charts was one of the best decisions we made for our practice. The support team has been exceptional.",
    name: "Office Manager",
    specialty: "Family Medicine"
  },
  {
    quote: "The integrated billing features have helped us reduce claim denials and improve our revenue cycle significantly.",
    name: "Billing Manager",
    specialty: "Dermatology Practice"
  },
  {
    quote: "Our patients love the patient portal. It has reduced phone calls and improved communication with our practice.",
    name: "Front Desk Coordinator",
    specialty: "Pediatric Practice"
  },
  {
    quote: "The telehealth integration was seamless. We were able to continue seeing patients without interruption.",
    name: "Clinical Director",
    specialty: "Internal Medicine"
  },
  {
    quote: "Implementation was smooth and the training was comprehensive. Our staff was productive from day one.",
    name: "Practice Owner",
    specialty: "OB/GYN Practice"
  }
];

// ─── Utility ──────────────────────────────────────────────────────────────────
function formatTime(seconds: number): string {
  if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─── Custom Video Player ───────────────────────────────────────────────────────
function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // ── Auto-hide controls ──────────────────────────────────────────────────────
  const scheduleHide = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setShowControls(false), 3000);
  }, []);

  const handleActivity = useCallback(() => {
    setShowControls(true);
    if (playing) scheduleHide();
  }, [playing, scheduleHide]);

  useEffect(() => {
    if (playing) scheduleHide();
    else {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      setShowControls(true);
    }
    return () => { if (hideTimerRef.current) clearTimeout(hideTimerRef.current); };
  }, [playing, scheduleHide]);

  // ── Fullscreen listener ─────────────────────────────────────────────────────
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // ── Keyboard shortcuts ──────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!videoRef.current) return;
      // Only respond when the video container is focused/fullscreen
      if (!containerRef.current?.contains(document.activeElement) && !isFullscreen) return;
      if (e.key === " " || e.key === "k") { e.preventDefault(); togglePlay(); }
      if (e.key === "ArrowRight") { e.preventDefault(); skip(10); }
      if (e.key === "ArrowLeft") { e.preventDefault(); skip(-10); }
      if (e.key === "m") toggleMute();
      if (e.key === "f") toggleFullscreen();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, muted, isFullscreen, currentTime, duration]);

  // ── Controls ────────────────────────────────────────────────────────────────
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) videoRef.current.play();
    else videoRef.current.pause();
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  const skip = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
  };

  const setSpeed = (rate: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSpeedMenu(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) containerRef.current.requestFullscreen();
    else document.exitFullscreen();
  };

  // ── Progress bar seek ───────────────────────────────────────────────────────
  const seekToRatio = (clientX: number) => {
    if (!videoRef.current || !progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    videoRef.current.currentTime = ratio * duration;
    setCurrentTime(ratio * duration);
  };

  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    seekToRatio(e.clientX);

    const onMove = (ev: MouseEvent) => seekToRatio(ev.clientX);
    const onUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const handleProgressTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    seekToRatio(e.touches[0].clientX);

    const onMove = (ev: TouchEvent) => seekToRatio(ev.touches[0].clientX);
    const onEnd = () => {
      setIsDragging(false);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onEnd);
  };

  const playedPct = duration ? (currentTime / duration) * 100 : 0;
  const bufferedPct = duration ? (buffered / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="relative bg-black rounded-2xl overflow-hidden shadow-2xl outline-none"
      onMouseMove={handleActivity}
      onMouseLeave={() => playing && setShowControls(false)}
      onClick={(e) => {
        // Click on the video area (not on controls) toggles play
        if ((e.target as HTMLElement).closest("[data-controls]")) return;
        togglePlay();
      }}
    >
      {/* ── Video element ───────────────────────────────────────────────────── */}
      <video
        ref={videoRef}
        src={src}
        className="w-full max-h-[520px] object-contain cursor-pointer"
        onTimeUpdate={() => {
          if (!videoRef.current) return;
          if (!isDragging) setCurrentTime(videoRef.current.currentTime);
          const buf = videoRef.current.buffered;
          if (buf.length > 0) setBuffered(buf.end(buf.length - 1));
        }}
        onLoadedMetadata={() => {
          if (!videoRef.current) return;
          setDuration(videoRef.current.duration);
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setShowControls(true); }}
        playsInline
      />

      {/* ── Big center play button (when paused) ────────────────────────────── */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-20 w-20 rounded-full bg-primary/90 flex items-center justify-center shadow-xl">
            <Play className="h-9 w-9 text-white ml-1" />
          </div>
        </div>
      )}

      {/* ── Controls overlay ─────────────────────────────────────────────────── */}
      <div
        data-controls
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-4 pb-3 pt-12 transition-opacity duration-300 ${
          showControls || !playing ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* ── Progress bar ────────────────────────────────────────────────────── */}
        <div
          ref={progressBarRef}
          className="relative h-1.5 bg-white/30 rounded-full mb-3 cursor-pointer group/bar"
          onMouseDown={handleProgressMouseDown}
          onTouchStart={handleProgressTouchStart}
          style={{ touchAction: "none" }}
        >
          {/* buffered */}
          <div
            className="absolute top-0 left-0 h-full bg-white/40 rounded-full transition-all"
            style={{ width: `${bufferedPct}%` }}
          />
          {/* played */}
          <div
            className="absolute top-0 left-0 h-full bg-primary rounded-full"
            style={{ width: `${playedPct}%` }}
          />
          {/* hover height expand via CSS group */}
          <div className="absolute inset-0 rounded-full group-hover/bar:scale-y-150 transition-transform origin-bottom" />
          {/* thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white shadow-lg border-2 border-primary opacity-0 group-hover/bar:opacity-100 transition-opacity"
            style={{ left: `calc(${playedPct}% - 8px)` }}
          />
        </div>

        {/* ── Button row ──────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 text-white select-none">
          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            className="hover:text-primary transition-colors flex-shrink-0"
            title={playing ? "Pause (k)" : "Play (k)"}
          >
            {playing
              ? <Pause className="h-5 w-5" />
              : <Play className="h-5 w-5" />}
          </button>

          {/* Skip back 10s */}
          <button
            onClick={() => skip(-10)}
            className="hover:text-primary transition-colors flex-shrink-0 flex items-center gap-0.5 text-xs font-semibold"
            title="Back 10 seconds (←)"
          >
            <SkipBack className="h-4 w-4" />
            <span>10</span>
          </button>

          {/* Skip forward 10s */}
          <button
            onClick={() => skip(10)}
            className="hover:text-primary transition-colors flex-shrink-0 flex items-center gap-0.5 text-xs font-semibold"
            title="Forward 10 seconds (→)"
          >
            <span>10</span>
            <SkipForward className="h-4 w-4" />
          </button>

          {/* Mute */}
          <button
            onClick={toggleMute}
            className="hover:text-primary transition-colors flex-shrink-0"
            title="Mute / Unmute (m)"
          >
            {muted
              ? <VolumeX className="h-4 w-4" />
              : <Volume2 className="h-4 w-4" />}
          </button>

          {/* Time */}
          <span className="text-xs tabular-nums text-white/90 flex-1 whitespace-nowrap">
            {formatTime(currentTime)}
            <span className="text-white/50"> / {formatTime(duration)}</span>
          </span>

          {/* Speed selector */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowSpeedMenu((v) => !v)}
              className="text-xs font-bold hover:text-primary transition-colors px-2 py-0.5 border border-white/30 rounded hover:border-primary"
              title="Playback speed"
            >
              {playbackRate === 1 ? "1x" : `${playbackRate}x`}
            </button>
            {showSpeedMenu && (
              <div className="absolute bottom-full right-0 mb-2 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl w-20">
                <div className="px-3 py-1.5 text-xs text-slate-400 border-b border-slate-700 font-semibold">Speed</div>
                {[0.5, 1, 1.25, 1.5, 2].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setSpeed(rate)}
                    className={`block w-full px-3 py-1.5 text-xs text-left transition-colors ${
                      playbackRate === rate
                        ? "bg-primary/20 text-primary font-bold"
                        : "text-white hover:bg-slate-700"
                    }`}
                  >
                    {rate === 1 ? "Normal" : `${rate}x`}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="hover:text-primary transition-colors flex-shrink-0"
            title="Fullscreen (f)"
          >
            {isFullscreen
              ? <Minimize className="h-4 w-4" />
              : <Maximize className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Testimonials() {
  const [videos, setVideos] = useState<(string | null)[]>([]);

  useEffect(() => {
    fetch("/api/settings/testimonials-videos")
      .then((r) => r.json())
      .then((data) => {
        const list = [data.url1, data.url2, data.url3].filter(Boolean) as string[];
        setVideos(list);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />

      <section className="pt-28 pb-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6">
              <Users className="h-4 w-4" />
              Testimonials
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              What Our <span className="text-primary">Customers Say</span>
            </h1>

            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Hear from practices across the country about their experience with MD Charts EHR.
            </p>
          </div>
        </div>
      </section>

      {/* Video Section — only renders when at least one video has been uploaded */}
      {videos.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                Hear It From Our <span className="text-primary">Customers</span>
              </h2>
              <p className="text-slate-600">Real stories from practices using MD Charts EHR</p>
            </div>
            <div className={`grid gap-6 ${
              videos.length === 1 ? "max-w-4xl mx-auto" :
              videos.length === 2 ? "grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto" :
              "grid-cols-1 md:grid-cols-3"
            }`}>
              {videos.map((src, i) => (
                <VideoPlayer key={i} src={src} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-slate-700 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="font-semibold text-slate-900">{testimonial.name}</p>
                <p className="text-sm text-slate-500">{testimonial.specialty}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Our Growing Community
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            See why practices trust MD Charts for their EHR and practice management needs.
          </p>
          <Link href="/book-demo">
            <Button size="lg" variant="secondary" className="h-12 px-8">
              Schedule Your Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
