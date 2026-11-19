import { router } from 'expo-router';
import { ArrowDownLeft, ArrowUpRight, Bell, ChevronDown, Eye, EyeOff, EllipsisVertical, Heart, Sun } from 'lucide-react-native';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { Screen } from '@/components/Screen';
import {
  AppText,
  LogoTile,
  PrimaryButton,
  SecondaryButton,
  SectionHeader,
  SegmentedProgress,
  SquareButton,
  Surface,
} from '@/components/ui';
import { BALANCE, CATEGORIES, HIGHLIGHTS, USER, type Highlight } from '@/data';
import { groupThousands, segmentColor } from '@/lib/format';
import { colors, radius } from '@/theme';

const CARD_W = 296;
const GAP = 12;

export default function Home() {
  const [hidden, setHidden] = useState(false);
  const [liked, setLiked] = useState<Record<string, boolean>>({ 'long-term': true });

  return (
    <Screen bottomPadding={124}>
      <View style={styles.header}>
        <LogoTile />
        <View style={{ flex: 1, gap: 2 }}>
          <AppText size={13} color={colors.textSecondary}>
            {USER.greeting}
          </AppText>
          <AppText weight="semibold" size={17} style={{ letterSpacing: -0.2 }}>
            {USER.name}
          </AppText>
        </View>
        <SquareButton icon={Sun} />
        <SquareButton icon={Bell} badge />
      </View>

      <View style={{ paddingTop: 32, paddingHorizontal: 20, gap: 8 }}>
        <Pressable onPress={() => setHidden((h) => !h)} style={styles.balanceLabel} hitSlop={8}>
          <AppText size={12} color={colors.textSecondary}>
            Saldo total
          </AppText>
          {hidden ? (
            <EyeOff size={14} color={colors.textSecondary} strokeWidth={1.5} />
          ) : (
            <Eye size={14} color={colors.textSecondary} strokeWidth={1.5} />
          )}
        </Pressable>
        <View style={styles.balanceRow}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <AppText weight="semibold" size={44} style={{ letterSpacing: -1.3 }}>
              {hidden ? 'R$ ••••••' : 'R$ ' + groupThousands(BALANCE.main)}
            </AppText>
            {!hidden && (
              <AppText weight="semibold" size={28} style={{ opacity: 0.5, letterSpacing: -0.8 }}>
                {BALANCE.cents}
              </AppText>
            )}
          </View>
          <Pressable style={styles.currency}>
            <AppText weight="semibold" size={14}>
              BRL
            </AppText>
            <ChevronDown size={16} color={colors.textSecondary} strokeWidth={1.5} />
          </Pressable>
        </View>
      </View>

      <View style={styles.actions}>
        <SecondaryButton label="Receber" icon={ArrowDownLeft} style={{ flex: 1, height: 56 }} />
        <PrimaryButton
          label="Transferir"
          icon={ArrowUpRight}
          height={60}
          style={{ flex: 1.3 }}
          onPress={() => router.push('/transfer')}
        />
        <SquareButton icon={EllipsisVertical} size={56} />
      </View>

      <Surface style={styles.categories}>
        <View style={styles.rowBetween}>
          <AppText weight="medium" size={20} style={{ letterSpacing: -0.2 }}>
            Categorias
          </AppText>
          <AppText size={13} color={colors.textSecondary}>
            Editar
          </AppText>
        </View>
        <View style={styles.grid}>
          {CATEGORIES.map(({ icon: Icon, label }) => (
            <Pressable key={label} style={styles.category}>
              <View style={styles.tile}>
                <Icon size={22} color={colors.text} strokeWidth={1.5} />
              </View>
              <AppText size={12} color={colors.textSecondary} numberOfLines={1}>
                {label}
              </AppText>
            </Pressable>
          ))}
        </View>
      </Surface>

      <View style={{ paddingTop: 32, paddingBottom: 14 }}>
        <SectionHeader title="Destaques" action="Ver todos" />
      </View>
      <FlatList
        horizontal
        data={HIGHLIGHTS}
        keyExtractor={(h) => h.id}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_W + GAP}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 20, gap: GAP }}
        renderItem={({ item }) => (
          <HighlightCard
            item={item}
            liked={!!liked[item.id]}
            onLike={() => setLiked((l) => ({ ...l, [item.id]: !l[item.id] }))}
            onOpen={() => router.push('/investment')}
          />
        )}
      />
    </Screen>
  );
}

function HighlightCard({
  item,
  liked,
  onLike,
  onOpen,
}: {
  item: Highlight;
  liked: boolean;
  onLike: () => void;
  onOpen: () => void;
}) {
  return (
    <Surface style={{ width: CARD_W, padding: 20, gap: 18 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
        <View style={{ flex: 1, gap: 4 }}>
          <AppText weight="semibold" size={16} numberOfLines={1} style={{ letterSpacing: -0.2 }}>
            {item.title}
          </AppText>
          <AppText size={12} color={colors.textSecondary}>
            {item.sub}
          </AppText>
        </View>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          <Pressable onPress={onLike} style={styles.round} hitSlop={6}>
            <Heart
              size={16}
              color={colors.text}
              strokeWidth={1.5}
              fill={liked ? colors.text : 'transparent'}
            />
          </Pressable>
          <Pressable onPress={onOpen} style={styles.round} hitSlop={6}>
            <ArrowUpRight size={16} color={colors.text} strokeWidth={1.5} />
          </Pressable>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        {item.metrics.map((m) => (
          <View key={m.k} style={{ flex: 1, gap: 4 }}>
            <AppText size={12} color={colors.textSecondary}>
              {m.k}
            </AppText>
            <AppText weight="semibold" size={16}>
              {m.v}
            </AppText>
          </View>
        ))}
      </View>

      <View style={{ gap: 8 }}>
        <View style={styles.rowBetween}>
          <AppText size={12} color={colors.textSecondary}>
            Progresso
          </AppText>
          <AppText weight="semibold" size={12}>
            {item.pct}
          </AppText>
        </View>
        <SegmentedProgress done={item.done} total={item.total} colorFor={(i) => segmentColor(i, item.done)} />
      </View>

      <View style={[styles.rowBetween, styles.cardFooter]}>
        <AppText size={12} color={colors.textSecondary}>
          {item.fee}
        </AppText>
        <AppText size={12} color={colors.textSecondary}>
          {item.since}
        </AppText>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20 },
  balanceLabel: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start' },
  balanceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  currency: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 36,
    paddingLeft: 14,
    paddingRight: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 20, paddingTop: 24 },
  categories: { marginHorizontal: 20, marginTop: 28, padding: 20, gap: 18 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 16 },
  category: { width: '25%', alignItems: 'center', gap: 8 },
  tile: {
    width: 64,
    height: 64,
    borderRadius: radius.tile,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  round: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardFooter: { paddingTop: 14, borderTopWidth: 1, borderTopColor: colors.border },
});
