import {
  Briefcase,
  Car,
  Coffee,
  Gift,
  House,
  Music,
  PiggyBank,
  Route,
  ShoppingBag,
  Target,
  TrendingUp,
  Users,
  Wallet,
  CreditCard,
  Zap,
  ArrowDownLeft,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react-native';

export const USER = { name: 'Gabriel Marcato', greeting: 'Bom dia!' };

export const BALANCE = { main: 32680, cents: ',20', available: 'R$ 32.680,20' };

export const CATEGORIES: { icon: LucideIcon; label: string }[] = [
  { icon: Wallet, label: 'Carteira' },
  { icon: CreditCard, label: 'Pagamentos' },
  { icon: Route, label: 'Jornada' },
  { icon: Users, label: 'Grupos' },
  { icon: TrendingUp, label: 'Investir' },
  { icon: Target, label: 'Metas' },
  { icon: Gift, label: 'Doações' },
  { icon: PiggyBank, label: 'Poupança' },
];

export type Highlight = {
  id: string;
  title: string;
  sub: string;
  metrics: { k: string; v: string }[];
  done: number;
  total: number;
  pct: string;
  fee: string;
  since: string;
};

export const HIGHLIGHTS: Highlight[] = [
  {
    id: 'long-term',
    title: 'Rendimento de longo prazo',
    sub: '10 meses • Investimento',
    metrics: [
      { k: 'Valor', v: 'R$ 5.000' },
      { k: 'Mensal', v: 'R$ 500' },
      { k: 'Duração', v: '10 meses' },
    ],
    done: 14,
    total: 20,
    pct: '70%',
    fee: 'Taxas R$ 25',
    since: 'Desde mar/25',
  },
  {
    id: 'emergency',
    title: 'Reserva de emergência',
    sub: '12 meses • Poupança',
    metrics: [
      { k: 'Valor', v: 'R$ 6.000' },
      { k: 'Mensal', v: 'R$ 500' },
      { k: 'Duração', v: '12 meses' },
    ],
    done: 8,
    total: 20,
    pct: '42%',
    fee: 'Taxas R$ 0',
    since: 'Desde jun/26',
  },
  {
    id: 'lisbon',
    title: 'Viagem a Lisboa',
    sub: '8 meses • Meta',
    metrics: [
      { k: 'Valor', v: 'R$ 3.200' },
      { k: 'Mensal', v: 'R$ 400' },
      { k: 'Duração', v: '8 meses' },
    ],
    done: 5,
    total: 20,
    pct: '25%',
    fee: 'Taxas R$ 0',
    since: 'Desde set/26',
  },
];

export type Period = '1S' | '1M' | '6M' | '1A';

export const PERIODS: Period[] = ['1S', '1M', '6M', '1A'];

export const CHART: Record<Period, { pts: number[]; labels: string[]; abs: string; pct: string; range: string }> = {
  '1S': {
    pts: [3598.1, 3600.2, 3599.4, 3602.9, 3601.8, 3605.6, 3607.1, 3606.3, 3609.8, 3612.4],
    labels: ['Qua', 'Qui', 'Sex', 'Sáb', 'Dom', 'Seg', 'Ter'],
    abs: '+R$ 14,30',
    pct: '+0.4%',
    range: 'na semana',
  },
  '1M': {
    pts: [3573.5, 3578.2, 3575.9, 3583.4, 3589.1, 3586.7, 3594.8, 3599.6, 3603.2, 3607.9, 3612.4],
    labels: ['18 out', '25 out', '01 nov', '08 nov', '15 nov'],
    abs: '+R$ 38,90',
    pct: '+1.1%',
    range: 'no mês',
  },
  '6M': {
    pts: [1050, 1240, 1560, 1600, 2080, 2130, 2580, 2650, 3070, 3120, 3560, 3612.4],
    labels: ['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov'],
    abs: '+R$ 97,60',
    pct: '+2.8%',
    range: 'em 6 meses',
  },
  '1A': {
    pts: [500, 520, 1030, 1050, 1560, 1590, 2080, 2120, 2590, 2630, 3100, 3150, 3612.4],
    labels: ['Mar', 'Mai', 'Jul', 'Set', 'Nov'],
    abs: '+R$ 112,40',
    pct: '+3.2%',
    range: 'desde o início',
  },
};

export const INVESTMENT_SUMMARY = [
  { k: 'Aportado', v: 'R$ 3.500' },
  { k: 'Rendimento', v: 'R$ 112,40' },
  { k: 'Taxa a.a.', v: '8.4%' },
];

export const DEPOSITS = [
  { t: 'Aporte mensal', date: '01 nov · Débito automático', v: '+R$ 500,00' },
  { t: 'Aporte mensal', date: '01 out · Débito automático', v: '+R$ 500,00' },
  { t: 'Aporte mensal', date: '01 set · Débito automático', v: '+R$ 500,00' },
  { t: 'Aporte mensal', date: '01 ago · Débito automático', v: '+R$ 500,00' },
];

export type Tx = { n: string; c: string; a: number; icon: LucideIcon };

export const TX_GROUPS: { label: string; items: Tx[] }[] = [
  {
    label: 'Hoje · 17 nov',
    items: [
      { n: 'Starbucks Reserve', c: 'Café · 08:42', a: -6.45, icon: Coffee },
      { n: 'Maya Chen', c: 'Pix recebido · 07:15', a: 120, icon: ArrowDownLeft },
    ],
  },
  {
    label: 'Ontem · 16 nov',
    items: [
      { n: 'Whole Foods Market', c: 'Mercado · 19:03', a: -86.34, icon: ShoppingBag },
      { n: 'Uber', c: 'Transporte · 23:41', a: -18.2, icon: Car },
      { n: 'Dividendos VTI', c: 'Investimentos · 10:00', a: 42.18, icon: TrendingUp },
    ],
  },
  {
    label: 'Sáb · 15 nov',
    items: [
      { n: 'Spotify Premium', c: 'Assinatura · 09:00', a: -11.99, icon: Music },
      { n: 'Northwind Labs', c: 'Salário · 06:00', a: 4200, icon: Briefcase },
      { n: 'Con Edison', c: 'Energia · 06:00', a: -74.6, icon: Zap },
    ],
  },
  {
    label: 'Sex · 14 nov',
    items: [
      { n: 'Aluguel — Apt 4B', c: 'Moradia · 08:00', a: -1850, icon: House },
      { n: 'Daniel Okafor', c: 'Transferência enviada · 21:12', a: -45, icon: ArrowUpRight },
    ],
  },
];

export const MONTH_SUMMARY = { in: 'R$ 4.362,18', out: 'R$ 2.092,58' };

export const CONTACTS = [
  { n: 'Maya', full: 'Maya Chen', ini: 'MC', bg: '#1F4A3C' },
  { n: 'Daniel', full: 'Daniel Okafor', ini: 'DO', bg: '#2A4038' },
  { n: 'Lucía', full: 'Lucía Romero', ini: 'LR', bg: '#33473A' },
  { n: 'Ethan', full: 'Ethan Brooks', ini: 'EB', bg: '#1B3A35' },
  { n: 'Priya', full: 'Priya Nair', ini: 'PN', bg: '#284A40' },
];

export const QUICK_AMOUNTS = [50, 100, 500];
