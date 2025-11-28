"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize, Minimize } from "lucide-react"

export function DemoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60)
    const s = Math.floor(time % 60)
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => setCurrentTime(video.currentTime)
    const handleLoadedMetadata = () => setDuration(video.duration)
    const handleEnded = () => setIsPlaying(false)

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("ended", handleEnded)
    }
  }, [])

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)

    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000)
    }
  }

  // FIXED togglePlay with Promise-safe play
  const togglePlay = async () => {
    const video = videoRef.current
    if (!video) return

    try {
      if (video.paused) {
        await video.play()
        setIsPlaying(true)
      } else {
        video.pause()
        setIsPlaying(false)
      }
    } catch (err) {
      console.error("Playback failed:", err)
    }
  }

  const handleSeek = (value: number[]) => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = value[0]
    setCurrentTime(value[0])
  }

  const skip = (seconds: number) => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = Math.max(0, Math.min(duration, v.currentTime + seconds))
  }

  const handleVolumeChange = (value: number[]) => {
    const vol = value[0]
    setVolume(vol)
    if (videoRef.current) videoRef.current.volume = vol
    setIsMuted(vol === 0)
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return

    if (isMuted) {
      v.volume = volume || 0.5
      setIsMuted(false)
    } else {
      v.volume = 0
      setIsMuted(true)
    }
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <section id="demo-section" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">See How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch our demo to understand how Lipspeak transforms video content
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto items-center">
          {/* Left side text */}
          <Card className="h-full border-border/50 bg-secondary/30">
            <CardContent className="p-8">
              <h3 className="mb-4 text-2xl font-semibold text-foreground">Revolutionary AI Lip Reading</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Lipspeak uses cutting-edge machine learning models trained on millions of video samples to interpret
                  lip movements.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                    <span>Works with MP4, WebM, MOV and more</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                    <span>Supports multiple speakers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                    <span>Real-time processing</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Video Player */}
          <Card className="overflow-hidden border-border/50">
            <CardContent className="p-0">
              <div
                ref={containerRef}
                className="relative aspect-video bg-muted group"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => isPlaying && setShowControls(false)}
              >
                {/* FIXED VIDEO PATH */}
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover cursor-pointer"
                  poster="/person-speaking-video-demonstration.jpg"
                  preload="metadata"
                  playsInline
                  onClick={togglePlay}
                >
                  <source src="/video/demo-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Play overlay */}
                {!isPlaying && (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
                    onClick={togglePlay}
                  >
                    <Button size="lg" className="h-16 w-16 rounded-full shadow-lg hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 ml-1" />
                    </Button>
                  </div>
                )}

                {/* Controls */}
                <div
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 transition-opacity duration-300 ${
                    showControls || !isPlaying ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="mb-3">
                    <Slider
                      value={[currentTime]}
                      max={duration || 100}
                      step={0.1}
                      onValueChange={handleSeek}
                      className="cursor-pointer [&_[role=slider]]:h-3 [&_[role=slider]]:w-3"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={() => skip(-10)}>
                        <SkipBack className="h-4 w-4" />
                      </Button>

                      <Button variant="ghost" size="icon" className="h-9 w-9 text-white" onClick={togglePlay}>
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>

                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={() => skip(10)}>
                        <SkipForward className="h-4 w-4" />
                      </Button>

                      <span className="ml-2 text-xs text-white/90 font-mono">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <div className="flex items-center gap-1 group/volume">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={toggleMute}>
                          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </Button>

                        <div className="w-0 overflow-hidden group-hover/volume:w-20 transition-all duration-200">
                          <Slider value={[isMuted ? 0 : volume]} max={1} step={0.1} onValueChange={handleVolumeChange} />
                        </div>
                      </div>

                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={toggleFullscreen}>
                        {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default DemoSection
