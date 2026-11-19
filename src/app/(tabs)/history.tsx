import { Calendar, Search } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { View } from 'react-native';

import { Screen } from '@/components/Screen';
import { AppText, SegmentedControl, SquareButton, Surface } from '@/components/ui';
import { MONTH_SUMMARY, TX_GROUPS } from '@/data';
import { signedBRL } from '@/lib/format';
import { colors, radius } from '@/theme';

type Filter = 'all' | 'in' | 'out';

export default function History() {
  const [filter, setFilter] = useState<Filter>('all');

  const groups = useMemo(
    () =>
      TX_GROUPS.map((g) => ({
        ...g,
        items: g.items.filter((t) => filter === 'all' || (filter === 'in' ? t.a > 0 : t.a < 0)),
      })).filter((g) => g.items.length > 0),
    [filter],
  );

  return (
    <Screen bottomPadding={124}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 20 }}>
        <AppText weight="semibold" size={28} style={{ flex: 1, letterSpacing: -0.6 }}>
          Histórico
        </AppText>
        <SquareButton icon={Search} />
        <SquareButton icon={Calendar} />
      </View>

      <View style={{ flexDirection: 'row', gap: 10, marginHorizontal: 20, marginTop: 20 }}>
        <Summary label="Entradas · nov" value={MONTH_SUMMARY.in} />
        <Summary label="Saídas · nov" value={MONTH_SUMMARY.out} />
      </View>

      <View style={{ marginHorizontal: 20, marginTop: 16 }}>
        <SegmentedControl<Filter>
          variant="tone"
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'all', label: 'Tudo' },
            { value: 'in', label: 'Entradas' },
            { value: 'out', label: 'Saídas' },
          ]}
        />
      </View>

      {groups.map((g) => (
        <View key={g.label} style={{ paddingHorizontal: 20, paddingTop: 24 }}>
          <AppText size={12} color={colors.textTertiary} style={{ paddingBottom: 6 }}>
            {g.label}
          </AppText>
          {g.items.map((tx) => (
            <View key={tx.n + tx.c} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 }}>
              <Surface radiusSize={radius.tile} style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
                <tx.icon size={20} color={colors.text} strokeWidth={1.5} />
              </Surface>
              <View style={{ flex: 1, gap: 2 }}>
                <AppText weight="semibold" size={15} numberOfLines={1}>
                  {tx.n}
                </AppText>
                <AppText size={12} color={colors.textSecondary}>
                  {tx.c}
                </AppText>
              </View>
              <AppText weight="semibold" size={16} color={tx.a > 0 ? colors.mint : colors.text}>
                {signedBRL(tx.a)}
              </AppText>
            </View>
          ))}
        </View>
      ))}
    </Screen>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <Surface style={{ flex: 1, padding: 16, gap: 4 }}>
      <AppText size={12} color={colors.textSecondary}>
        {label}
      </AppText>
      <AppText weight="semibold" size={16}>
        {value}
      </AppText>
    </Surface>
  );
}
