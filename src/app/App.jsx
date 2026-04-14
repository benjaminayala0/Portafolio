import React, { Suspense, lazy } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { LanguageProvider } from '@/core/context/LanguageContext';
import ErrorBoundary from '@/core/ui/ErrorBoundary';
import Hero from '@/features/hero/components/Hero';
import Methodology from '@/features/hero/components/Methodology';
import Navbar from '@/core/ui/Navbar';
import Footer from '@/core/ui/Footer';

// Lazy loaded below-the-fold components
const StudyCard = lazy(() => import('@/features/studies/components/StudyCard'));
const ExperienceAndContact = lazy(() => import('@/features/contact/components/ExperienceAndContact'));
const VideoOutro = lazy(() => import('@/features/contact/components/VideoOutro'));

function App() {
    return (
        <ErrorBoundary>
            <LanguageProvider>
                <div className="min-h-screen bg-surface selection:bg-primary-dark/30">
                    <Navbar />
                    <main>
                        <Hero />
                        <Methodology />
                        
                        <Suspense fallback={<div className="w-full h-32 flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>}>
                            <StudyCard />
                            <ExperienceAndContact />
                            <VideoOutro />
                        </Suspense>
                    </main>
                    <Footer />
                </div>
                <Analytics />
                <SpeedInsights />
            </LanguageProvider>
        </ErrorBoundary>
    );
}

export default App;
