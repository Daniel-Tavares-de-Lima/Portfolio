export const ERAS = {
  '1986': {
    status: 'ready',
    label: '1986',
    shortLabel: { pt: 'Terminal', en: 'Terminal' },
    seoTitle: { pt: 'BBS Edition', en: 'BBS Edition' },
  },
  '1996': {
    status: 'ready',
    label: '1996',
    shortLabel: { pt: 'Homepage', en: 'Homepage' },
    seoTitle: { pt: 'GeoCities Edition', en: 'GeoCities Edition' },
  },
  '2006': {
    status: 'ready',
    label: '2006',
    shortLabel: { pt: 'Web', en: 'Web' },
    seoTitle: { pt: 'Web 2.0 Edition', en: 'Web 2.0 Edition' },
  },
  '2016': {
    status: 'ready',
    label: '2016',
    shortLabel: { pt: 'Portfólio', en: 'Portfolio' },
    seoTitle: { pt: 'Portfolio', en: 'Portfolio' },
  },
  '2026': {
    status: 'ready',
    label: '2026',
    shortLabel: { pt: 'Agente', en: 'Agent' },
    seoTitle: { pt: 'Agent Edition', en: 'Agent Edition' },
  },
  '2036': {
    status: 'ready',
    label: '2036',
    shortLabel: { pt: 'Firmware', en: 'Firmware' },
    seoTitle: { pt: 'Firmware Edition', en: 'Firmware Edition' },
  },
  '2046': {
    status: 'ready',
    label: '2046',
    shortLabel: { pt: 'Stream', en: 'Stream' },
    seoTitle: { pt: 'Stream Edition', en: 'Stream Edition' },
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
