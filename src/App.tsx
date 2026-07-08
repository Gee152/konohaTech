import { useState } from 'react';
import GlowBackground from './components/GlowBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Benefits from './components/Benefits';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Technologies from './components/Technologies';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function App() {
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen text-zinc-100 font-sans selection:bg-[#df2531]/30 selection:text-white bg-[#050505]">
      {/* 1. Global Atmospheric Glow Background */}
      <GlowBackground />

      {/* 2. Dynamic Glassmorphic Navigation Bar */}
      <Header onOpenBudgetModal={() => setIsBudgetModalOpen(true)} />

      {/* 3. Main content structures */}
      <main className="relative z-10">
        
        {/* Hero Section with Dashboard */}
        <Hero onOpenBudgetModal={() => setIsBudgetModalOpen(true)} />

        {/* Problem Section with pain-point cards */}
        <Problem />

        {/* Solution section with timeline */}
        <Solution />

        {/* Benefits Section with custom glass tiles and 32px borders */}
        <Benefits />

        {/* Services Showcase (Product style) */}
        <Services />

        {/* Portfolio Section featuring dynamic case modals */}
        <Portfolio />

        {/* Technologies Utilized Badge list */}
        <Technologies />

        {/* Elegant Horizontal workflow process */}
        <Process />

        {/* Testimonials Quote Cards */}
        <Testimonials />

        {/* Final CTA call, Contact Forms & Estimator Dialog wizard */}
        <ContactForm 
          isBudgetModalOpen={isBudgetModalOpen} 
          onCloseBudgetModal={() => setIsBudgetModalOpen(false)}
          onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
        />
        
      </main>

      {/* 4. Brand Copyrights & Site footer directory */}
      <Footer />
    </div>
  );
}
