import type { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';

type TabBarFn = NonNullable<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>;
type BottomTabBarProps = Parameters<TabBarFn>[0];
import * as Haptics from 'expo-haptics';
import { BlurView } from 'expo-blur';
import { House, Search, Star, User, Wallet, type LucideIcon } from 'lucide-react-native';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/theme';

const ICONS: Record<string, LucideIcon> = {
  index: House,
  favorites: Star,
  explore: Search,
  history: Wallet,
  profile: User,
};

export function FloatingTabBar({ state, navigateToTab }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View pointerEvents="box-none" style={[styles.wrap, { bottom: Math.max(insets.bottom, 12) + 8 }]}>
      <View style={styles.bar}>
        <BlurView intensity={Platform.OS === 'web' ? 0 : 40} tint="dark" style={StyleSheet.absoluteFill} />
        <View style={styles.topGlow} pointerEvents="none" />
        {state.routes.map((route, i) => {
          const Icon = ICONS[route.name] ?? House;
          const active = state.index === i;
          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              onPress={() => {
                Haptics.selectionAsync().catch(() => {});
                if (!active) navigateToTab(route.key);
              }}
              style={[styles.tab, active && { backgroundColor: colors.mint }]}
            >
              <Icon size={22} strokeWidth={1.5} color={active ? colors.onMint : colors.textSecondary} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 20, right: 20 },
  bar: {
    height: 72,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: 'rgba(16,38,32,0.72)',
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  topGlow: { position: 'absolute', top: 0, left: 30, right: 30, height: 1, backgroundColor: 'rgba(255,255,255,0.1)' },
  tab: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
});
