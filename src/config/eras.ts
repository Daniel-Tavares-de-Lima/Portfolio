export const ERAS = {
  '1986': {
    status: 'ready',
    label: '1986',
    seoTitle: { pt: 'BBS Edition', en: 'BBS Edition' },
  },
  '1996': {
    status: 'placeholder',
    label: '1996',
    seoTitle: { pt: 'GeoCities Edition', en: 'GeoCities Edition' },
  },
  '2006': {
    status: 'placeholder',
    label: '2006',
    seoTitle: { pt: 'Web 2.0 Edition', en: 'Web 2.0 Edition' },
  },
  '2016': {
    status: 'ready',
    label: '2016',
    seoTitle: { pt: 'Portfolio', en: 'Portfolio' },
  },
  '2026': {
    status: 'ready',
    label: '2026',
    seoTitle: { pt: 'Agent Edition', en: 'Agent Edition' },
  },
  '2036': {
    status: 'placeholder',
    label: '2036',
    seoTitle: { pt: 'Neural Edition', en: 'Neural Edition' },
  },
  '2046': {
    status: 'placeholder',
    label: '2046',
    seoTitle: { pt: 'Consciousness Edition', en: 'Consciousness Edition' },
  },
} as const;

export type EraYear = keyof typeof ERAS;
export type EraStatus = (typeof ERAS)[EraYear]['status'];
export type Locale = 'pt' | 'en';

export const ERA_YEARS = Object.keys(ERAS) as EraYear[];

export function isEraYear(value: string): value is EraYear {
  return value in ERAS;
}

export function getEraMeta(year: EraYear) {
  return ERAS[year];
}
