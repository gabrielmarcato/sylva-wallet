import { LinearGradient } from 'expo-linear-gradient';
import type { LucideIcon } from 'lucide-react-native';
import { ReactNode } from 'react';
import { Pressable, StyleProp, StyleSheet, Text, TextProps, TextStyle, View, ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { colors, fonts, radius } from '@/theme';

type Weight = keyof typeof fonts;

export function AppText({
  weight = 'regular',
  size = 15,
  color = colors.text,
  style,
  ...rest
}: TextProps & { weight?: Weight; size?: number; color?: string }) {
  return (
    <Text
      {...rest}
      style={[{ fontFamily: fonts[weight], fontSize: size, color, fontVariant: ['tabular-nums'] }, style]}
    />
  );
}

/** Dark card: tone + 1px border + 1px inner top highlight. */
export function Surface({
  children,
  style,
  radiusSize = radius.card,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  radiusSize?: number;
}) {
  return (
    <View style={[styles.surface, { borderRadius: radiusSize }, style]}>
      <View pointerEvents="none" style={[styles.topGlow, { left: radiusSize / 2, right: radiusSize / 2 }]} />
      {children}
    </View>
  );
}

export function SquareButton({
  icon: Icon,
  onPress,
  badge,
  size = 44,
  active,
}: {
  icon: LucideIcon;
  onPress?: () => void;
  badge?: boolean;
  size?: number;
  active?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.square,
        { width: size, height: size },
        (pressed || active) && { backgroundColor: colors.elevated },
      ]}
    >
      <Icon size={20} color={colors.text} strokeWidth={1.5} />
      {badge ? <View style={styles.badge} /> : null}
    </Pressable>
  );
}

export function PrimaryButton({
  label,
  icon: Icon,
  onPress,
  disabled,
  height = 56,
  style,
}: {
  label: string;
  icon?: LucideIcon;
  onPress?: () => void;
  disabled?: boolean;
  height?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        {
          height,
          backgroundColor: pressed ? colors.mintHover : colors.mint,
          opacity: disabled ? 0.4 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        style,
      ]}
    >
      {Icon ? <Icon size={20} color={colors.onMint} strokeWidth={1.5} /> : null}
      <AppText weight="bold" size={16} color={colors.onMint}>
        {label}
      </AppText>
    </Pressable>
  );
}

export function SecondaryButton({
  label,
  icon: Icon,
  onPress,
  style,
}: {
  label: string;
  icon?: LucideIcon;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        styles.btnSecondary,
        pressed && { backgroundColor: colors.elevated },
        style,
      ]}
    >
      {Icon ? <Icon size={20} color={colors.text} strokeWidth={1.5} /> : null}
      <AppText weight="semibold" size={16}>
        {label}
      </AppText>
    </Pressable>
  );
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  variant = 'mint',
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  variant?: 'mint' | 'tone';
}) {
  return (
    <View style={styles.seg}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <Pressable
            key={o.value}
            onPress={() => onChange(o.value)}
            style={[
              styles.segOpt,
              on && (variant === 'mint' ? { backgroundColor: colors.mint } : styles.segTone),
            ]}
          >
            <AppText
              weight="semibold"
              size={14}
              color={on ? (variant === 'mint' ? colors.onMint : colors.text) : colors.textSecondary}
            >
              {o.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

export function SegmentedProgress({
  done,
  total,
  colorFor,
}: {
  done: number;
  total: number;
  colorFor: (i: number) => string;
}) {
  return (
    <View style={{ flexDirection: 'row', gap: 3, height: 12 }}>
      {Array.from({ length: total }, (_, i) => (
        <View
          key={i}
          style={{
            flex: 1,
            borderRadius: 3,
            backgroundColor: i < done ? colorFor(i) : 'rgba(255,255,255,0.1)',
            opacity: i < done ? 1 : 0.9,
          }}
        />
      ))}
    </View>
  );
}

export function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <View style={styles.sectionHeader}>
      <AppText weight="medium" size={20} style={{ letterSpacing: -0.2 }}>
        {title}
      </AppText>
      {action ? (
        <AppText size={13} color={colors.textSecondary}>
          {action}
        </AppText>
      ) : null}
    </View>
  );
}

export function GradientPill({ label }: { label: string }) {
  return (
    <LinearGradient
      colors={[colors.dataFrom, colors.dataTo]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradPill}
    >
      <AppText weight="bold" size={12} color={colors.onMint}>
        {label}
      </AppText>
    </LinearGradient>
  );
}

export function Logo({ size = 26 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16.6 7.2C15.7 5.8 14 5 12.1 5 9.4 5 7.4 6.5 7.4 8.6c0 4.6 9.4 2.6 9.4 7 0 2.1-2 3.6-4.8 3.6-2.1 0-3.9-.9-4.8-2.4"
        stroke={colors.mint}
        strokeWidth={2.4}
        strokeLinecap="round"
      />
      <Circle cx={17.6} cy={18.2} r={1.4} fill={colors.mint} />
    </Svg>
  );
}

export function LogoTile({ size = 44 }: { size?: number }) {
  return (
    <View style={[styles.square, { width: size, height: size }]}>
      <Logo size={size * 0.6} />
    </View>
  );
}

export const textStyles: Record<string, TextStyle> = {
  title: { letterSpacing: -0.2 },
};

const styles = StyleSheet.create({
  surface: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  topGlow: {
    position: 'absolute',
    top: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  square: {
    borderRadius: radius.icon,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.mint,
    borderWidth: 2,
    borderColor: colors.surface,
    boxSizing: 'content-box',
  },
  btn: {
    borderRadius: radius.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  btnSecondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  seg: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  segOpt: { flex: 1, height: 40, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
  segTone: { backgroundColor: colors.elevated, borderWidth: 0 },
  sectionHeader: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gradPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill, overflow: 'hidden' },
});
