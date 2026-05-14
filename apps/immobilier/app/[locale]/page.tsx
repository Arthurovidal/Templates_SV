import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildBaseMetadata, buildLocalBusinessSchema } from '@template/utils';
import { immobilierSeoConfig } from '@/lib/config';

interface Props { params: Promise<{ locale: string }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return { ...buildBaseMetadata(immobilierSeoConfig, locale as 'fr' | 'en'), title: t('title'), description: t('description') };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const schemaJson = buildLocalBusinessSchema(immobilierSeoConfig);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'hsl(var(--color-background))' }}>
        <div className="text-center space-y-6 p-8">
          <div className="w-12 h-px mx-auto" style={{ background: '#D4AF37' }} />
          <h1 className="font-display" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: 'hsl(var(--color-foreground))' }}>
            Template Immobilier
          </h1>
          <p style={{ color: 'hsl(var(--color-muted-foreground))' }}>
            {locale === 'fr' ? 'Phase 0 terminée. Design complet en Phase 5.' : 'Phase 0 complete. Full design in Phase 5.'}
          </p>
          <div className="font-mono text-sm tracking-widest uppercase" style={{ color: '#D4AF37' }}>
            localhost:3003
          </div>
          <div className="w-12 h-px mx-auto" style={{ background: '#D4AF37' }} />
        </div>
      </div>
    </>
  );
}
