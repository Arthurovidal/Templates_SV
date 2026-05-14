import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { buildBaseMetadata, buildLocalBusinessSchema } from '@template/utils';
import { corporateSeoConfig } from '@/lib/config';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    ...buildBaseMetadata(corporateSeoConfig, locale as 'fr' | 'en'),
    title: t('title'),
    description: t('description'),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  // Schema.org LocalBusiness pour le SEO local
  const schemaJson = buildLocalBusinessSchema(corporateSeoConfig);

  return (
    <>
      {/* Schema.org JSON-LD — invisible mais crucial pour Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />

      {/*
       * Les sections seront ajoutées en Phase 3 (Template Corporate)
       * Structure prévue:
       * <Navbar />
       * <Hero />
       * <Stats />
       * <About />
       * <Services />
       * <Team />
       * <Testimonials />
       * <Contact />
       * <Footer />
       */}

      {/* Placeholder Phase 0 — sera remplacé en Phase 3 */}
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <div className="w-16 h-0.5 bg-[#C9A84C] mx-auto" />
          <h1 className="font-display text-4xl text-[#0A0A0A]">
            Template Corporate
          </h1>
          <p className="text-[#737373] max-w-md mx-auto">
            {locale === 'fr'
              ? 'Phase 0 terminée. Le design complet sera implémenté en Phase 3.'
              : 'Phase 0 complete. The full design will be implemented in Phase 3.'}
          </p>
          <div className="text-sm font-mono text-[#C9A84C] tracking-widest uppercase">
            localhost:3001
          </div>
          <div className="w-16 h-0.5 bg-[#C9A84C] mx-auto" />
        </div>
      </div>
    </>
  );
}
