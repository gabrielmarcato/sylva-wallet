import { colors } from '@/theme';

/** 1234567 -> "1.234.567" */
export const groupThousands = (n: number | string) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const formatBRL = (n: number) => {
  const [i, d] = Math.abs(n).toFixed(2).split(".");
  return (n < 0 ? "-" : "") + "R$ " + groupThousands(i) + "," + d;
};

/** Signed money with a typographic minus: +R$ 120,00 / −R$ 6,45 */
export const signedBRL = (n: number) => (n < 0 ? "−" : "+") + formatBRL(Math.abs(n));

export const lerpHex = (a: string, b: string, t: number) => {
  const pa = a.replace('#', '').match(/\w\w/g)!.map((x) => parseInt(x, 16));
  const pb = b.replace('#', '').match(/\w\w/g)!.map((x) => parseInt(x, 16));
  return '#' + pa.map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, '0')).join('');
};

export const segmentColor = (i: number, done: number) =>
  lerpHex(colors.dataFrom, colors.dataTo, done > 1 ? i / (done - 1) : 0);
