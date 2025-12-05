/**
 * @authors Anish, Bidipta, Dibyasmita 
 * @date 4-12-2025
 * @description Features Component
 * @returns a tsx page
 */


"use client"

export function Features() {
  const items = [
    "Ultra-fast video processing",
    "Speaker-aware lip analysis",
    "High transcription accuracy",
    "Export to TXT, PDF and JSON",
    "Privacy-first: all processing local or secure",
    "API access for developers",
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6 text-foreground">Powerful Features</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
          Lipspeak brings advanced AI research into an easy-to-use interface.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((f, i) => (
            <div key={i} className="p-5 rounded-xl bg-secondary/20 border border-border/20">
              <p className="text-foreground">{f}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
