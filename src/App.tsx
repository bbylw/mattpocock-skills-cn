import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { Philosophy } from "./components/Philosophy"
import { Install } from "./components/Install"
import { PainPoints } from "./components/PainPoints"
import { Skills } from "./components/Skills"
import { Footer } from "./components/Footer"

export default function App() {
  return (
    <div className="min-h-screen bg-ink-950">
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <Install />
        <PainPoints />
        <Skills />
      </main>
      <Footer />
    </div>
  )
}
