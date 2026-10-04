import { useState, useCallback, lazy, Suspense } from 'react';
import GlowBackground from './components/GlowBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Benefits from './components/Benefits';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import { useQueryRouting } from './hooks/useQueryRouting';

const BioLinks = lazy(() => import('./components/BioLinks'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const CookieConsentManager = lazy(() => import('./components/CookieConsentManager'));

export default function App() {
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const { currentView, openLanding } = useQueryRouting();

  const handleOpenBudgetModal = useCallback(() => setIsBudgetModalOpen(true), []);
  const handleCloseBudgetModal = useCallback(() => setIsBudgetModalOpen(false), []);

  return (
    <div className="relative min-h-screen text-zinc-100 font-sans selection:bg-[#df2531]/30 selection:text-white bg-[#050505]">
      {/* 1. Global Atmospheric Glow Background */}
      <GlowBackground />

      {currentView === 'biolinks' ? (
        /* Visualização BioLinks / Hub de Links Mobile-First (?page=links) */
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#050505] text-[#df2531]">Carregando...</div>}>
          <BioLinks
            onNavigateToLanding={openLanding}
            onOpenBudgetModal={handleOpenBudgetModal}
          />
        </Suspense>
      ) : (
        /* Visualização Landing Page Completa */
        <>
          {/* 2. Dynamic Glassmorphic Navigation Bar */}
          <Header onOpenBudgetModal={handleOpenBudgetModal} />

          {/* 3. Main content structures */}
          <main className="relative z-10">
            {/* Hero Section with Dashboard */}
            <Hero onOpenBudgetModal={handleOpenBudgetModal} />

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

            {/* Elegant Horizontal workflow process */}
            <Process />

            {/* Testimonials Quote Cards */}
            <Testimonials />

            {/* Questions & Answers / Structured FAQ Section (Google Schema Aligned) */}
            <FAQ onOpenBudgetModal={handleOpenBudgetModal} />

            {/* Final CTA call, Contact Forms & Estimator Dialog wizard */}
            {isBudgetModalOpen && (
              <Suspense fallback={null}>
                <ContactForm 
                  isBudgetModalOpen={isBudgetModalOpen} 
                  onCloseBudgetModal={handleCloseBudgetModal}
                  onOpenBudgetModal={handleOpenBudgetModal}
                />
              </Suspense>
            )}
          </main>

          {/* 4. Brand Copyrights & Site footer directory */}
          <Footer />
        </>
      )}

      {/* Modal de Orçamento disponível também na visão BioLinks */}
      {currentView === 'biolinks' && isBudgetModalOpen && (
        <Suspense fallback={null}>
          <ContactForm 
            isBudgetModalOpen={isBudgetModalOpen} 
            onCloseBudgetModal={handleCloseBudgetModal}
            onOpenBudgetModal={handleOpenBudgetModal}
          />
        </Suspense>
      )}

      {/* Botão Flutuante de Atendimento WhatsApp */}
      <WhatsAppFloatingButton />

      {/* Sistema de Gestão de Cookies e LGPD (carregado assincronamente) */}
      <Suspense fallback={null}>
        <CookieConsentManager />
      </Suspense>
    </div>
  );
}
