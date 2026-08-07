import React from 'react';
import AssessmentForm from '@/components/AssessmentForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1E2D24]">
      <nav className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center border-b border-[#EBE5DF]/60">
        <div className="font-serif text-xl font-bold tracking-tight text-[#1E2D24]">
          FOUNDATIONS
        </div>
        <a 
          href="#assessment" 
          className="text-xs font-semibold uppercase tracking-wider bg-[#1E2D24] text-[#FDFBF7] px-4 py-2.5 rounded-xl hover:bg-[#1E2D24]/90 transition"
        >
          Take Assessment
        </a>
      </nav>

      <section className="max-w-4xl mx-auto text-center px-6 pt-16 pb-12 space-y-6">
        <div className="inline-block px-3 py-1 bg-[#E8E1D9]/50 rounded-full text-xs font-semibold uppercase tracking-wider text-[#1E2D24]/80">
          Intentional Christian Dating
        </div>
        
        <h1 className="text-4xl md:text-6xl font-serif font-medium leading-tight text-[#1E2D24]">
          Most apps match you fast. <br className="hidden md:inline" />
          <span className="italic">We match you well.</span>
        </h1>

        <p className="text-base md:text-lg text-[#1E2D24]/80 max-w-2xl mx-auto leading-relaxed">
          The real problem isn’t finding options—it’s that people aren’t always ready to receive each other. Every match here begins with a simple readiness check-in to ensure you’re both positioned to build something lasting.
        </p>
      </section>

      <section id="assessment" className="py-8">
        <AssessmentForm />
      </section>

      <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-[#EBE5DF]/60 text-center text-xs text-[#1E2D24]/60">
        © 2026 Foundations Dating. Built for intentional relationships.
      </footer>
    </main>
  );
}
