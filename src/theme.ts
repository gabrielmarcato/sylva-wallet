export const colors = {
  bg: '#0A1A14',
  bgTop: '#12302A',
  surface: '#102620',
  elevated: '#163229',
  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(255,255,255,0.1)',
  hairline: 'rgba(255,255,255,0.06)',
  glow: 'rgba(255,255,255,0.07)',
  mint: '#3DEBB4',
  mintHover: '#5BF0C2',
  onMint: '#062018',
  dataFrom: '#E4F55A',
  dataTo: '#7BE07A',
  text: '#F2F7F4',
  textSecondary: '#8FA89C',
  textTertiary: '#5E7A6E',
} as const;

export const radius = { card: 24, button: 18, tile: 16, icon: 14, pill: 999 } as const;

export const space = { gutter: 20 } as const;

export const fonts = {
  regular: 'Manrope_400Regular',
  medium: 'Manrope_500Medium',
  semibold: 'Manrope_600SemiBold',
  bold: 'Manrope_700Bold',
} as const;
