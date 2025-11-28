"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileVideo, X, Loader2, Copy, Download, Check } from "lucide-react"

export function UploadSection() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [copied, setCopied] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith("video/")) {
      setFile(droppedFile)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleProcess = async () => {
    if (!file) return

    setIsProcessing(true)
    setTranscript("") // clear previous output

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch(`${API_URL}/transcribe`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to process video")
      }

      const data = await response.json()
      setTranscript(data.transcript || "No transcript returned")
    } catch (error: unknown) {
        if (error instanceof Error) {
            setTranscript("Error: " + error.message)
        } else {
            setTranscript("Unexpected error occurred")
        }
    }
    finally {
      setIsProcessing(false)
    }
  }
  // -------------------------------------------------------------------

  const clearFile = () => {
    setFile(null)
    setTranscript("")
  }

  const handleCopyToClipboard = async () => {
    if (!transcript) return

    try {
      await navigator.clipboard.writeText(transcript)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  const handleDownloadAsTxt = () => {
    if (!transcript) return
    const blob = new Blob([transcript], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `lipspeak-transcript-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <section id="upload-section" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Try It Yourself</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Upload a video file and see our AI in action</p>
        </div>

        <div className="mx-auto max-w-3xl space-y-6">
          {/* Upload Area */}
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div
                className={`relative rounded-xl border-2 border-dashed transition-colors ${
                  isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <FileVideo className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={clearFile} className="h-9 w-9">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex cursor-pointer flex-col items-center justify-center p-12">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <p className="mb-2 text-lg font-medium text-foreground">Select File from Computer</p>
                    <p className="text-sm text-muted-foreground">or drag and drop your video here</p>
                    <p className="mt-2 text-xs text-muted-foreground">Supports MP4, WebM, MOV up to 100MB</p>
                    <input type="file" accept="video/*" onChange={handleFileSelect} className="hidden" />
                  </label>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Go Button */}
          <div className="flex justify-center">
            <Button size="lg" onClick={handleProcess} disabled={!file || isProcessing} className="min-w-[200px]">
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "GO - Generate Transcript"
              )}
            </Button>
          </div>

          {/* Transcript Output */}
          <Card className="border-border/50">
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Transcript</h3>
              <div className="min-h-[150px] rounded-lg bg-secondary/50 p-4">
                {transcript ? (
                  <p className="text-foreground leading-relaxed">{transcript}</p>
                ) : (
                  <p className="text-muted-foreground italic">
                    Your transcript will appear here after processing...
                  </p>
                )}
              </div>

              {transcript && (
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy to Clipboard
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownloadAsTxt}>
                    <Download className="mr-2 h-4 w-4" />
                    Download as TXT
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default UploadSection
