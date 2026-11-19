import { router } from 'expo-router';
import { ChevronLeft, Plus, Share2 as Share, ArrowDownLeft } from 'lucide-react-native';
import { useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LineChart } from '@/components/LineChart';
import { Screen } from '@/components/Screen';
import { AppText, GradientPill, PrimaryButton, SectionHeader, SegmentedControl, SquareButton, Surface } from '@/components/ui';
import { CHART, DEPOSITS, INVESTMENT_SUMMARY, PERIODS, type Period } from '@/data';
import { colors, radius } from '@/theme';

export default function Investment() {
  const [period, setPeriod] = useState<Period>('6M');
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const ch = CHART[period];

  return (
    <Screen
      bottomPadding={116 + insets.bottom}
      footer={
        <LinearGradient
          colors={['rgba(10,26,20,0)', colors.bg]}
          locations={[0, 0.4]}
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 20, paddingTop: 20, paddingBottom: Math.max(insets.bottom, 14) + 8 }}
        >
          <PrimaryButton label="Novo aporte" icon={Plus} />
        </LinearGradient>
      }
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
        <SquareButton icon={ChevronLeft} onPress={() => router.back()} />
        <AppText weight="semibold" size={17}>
          Investimento
        </AppText>
        <SquareButton icon={Share} />
      </View>

      <View style={{ paddingTop: 28, paddingHorizontal: 20, gap: 10 }}>
        <AppText size={12} color={colors.textSecondary}>
          Rendimento de longo prazo · saldo atual
        </AppText>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <AppText weight="semibold" size={44} style={{ letterSpacing: -1.3 }}>
            R$ 3.612
          </AppText>
          <AppText weight="semibold" size={28} style={{ opacity: 0.5, letterSpacing: -0.8 }}>
            ,40
          </AppText>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <GradientPill label={ch.pct} />
          <AppText size={13} color={colors.textSecondary}>
            {ch.abs} {ch.range}
          </AppText>
        </View>
      </View>

      <View style={{ marginHorizontal: 20, marginTop: 24 }}>
        <SegmentedControl<Period> value={period} onChange={setPeriod} options={PERIODS.map((p) => ({ value: p, label: p }))} />
      </View>

      <View style={{ paddingTop: 28, paddingHorizontal: 20 }}>
        <LineChart points={ch.pts} width={width - 40} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
          {ch.labels.map((l) => (
            <AppText key={l} size={11} color={colors.textTertiary}>
              {l}
            </AppText>
          ))}
        </View>
      </View>

      <Surface style={{ marginHorizontal: 20, marginTop: 24, flexDirection: 'row' }}>
        {INVESTMENT_SUMMARY.map((s, i) => (
          <View
            key={s.k}
            style={{ flex: 1, padding: 16, gap: 4, borderLeftWidth: i ? 1 : 0, borderLeftColor: colors.border }}
          >
            <AppText size={12} color={colors.textSecondary}>
              {s.k}
            </AppText>
            <AppText weight="semibold" size={16}>
              {s.v}
            </AppText>
          </View>
        ))}
      </Surface>

      <View style={{ paddingTop: 32, paddingBottom: 12 }}>
        <SectionHeader title="Aportes" action="7 de 10" />
      </View>
      <Surface style={{ marginHorizontal: 20, paddingHorizontal: 16, paddingVertical: 4 }}>
        {DEPOSITS.map((d, i) => (
          <View
            key={d.date}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              paddingVertical: 12,
              borderTopWidth: i ? 1 : 0,
              borderTopColor: colors.hairline,
            }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: radius.tile,
                backgroundColor: colors.elevated,
                borderWidth: 1,
                borderColor: colors.border,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowDownLeft size={20} color={colors.text} strokeWidth={1.5} />
            </View>
            <View style={{ flex: 1, gap: 2 }}>
              <AppText weight="semibold" size={15}>
                {d.t}
              </AppText>
              <AppText size={12} color={colors.textSecondary}>
                {d.date}
              </AppText>
            </View>
            <AppText weight="semibold" size={16}>
              {d.v}
            </AppText>
          </View>
        ))}
      </Surface>
    </Screen>
  );
}
