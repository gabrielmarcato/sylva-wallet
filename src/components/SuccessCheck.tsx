import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { colors } from '@/theme';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const SIZE = 120;

function Ring({ delay }: { delay: number }) {
  const p = useSharedValue(0);
  useEffect(() => {
    p.value = withDelay(delay, withRepeat(withTiming(1, { duration: 2400, easing: Easing.out(Easing.quad) }), -1));
  }, [delay, p]);
  const style = useAnimatedStyle(() => ({
    opacity: 0.7 * (1 - p.value),
    transform: [{ scale: 1 + 0.55 * p.value }],
  }));
  return <Animated.View style={[styles.ring, style]} />;
}

/** Mint check: pops in, draws the tick, then pulses rings and a soft glow. */
export function SuccessCheck() {
  const pop = useSharedValue(0);
  const draw = useSharedValue(24);
  const glow = useSharedValue(0.7);

  useEffect(() => {
    pop.value = withSpring(1, { damping: 9, stiffness: 140 });
    draw.value = withDelay(400, withTiming(0, { duration: 450, easing: Easing.out(Easing.quad) }));
    glow.value = withRepeat(withSequence(withTiming(1, { duration: 1500 }), withTiming(0.7, { duration: 1500 })), -1);
  }, [pop, draw, glow]);

  const circle = useAnimatedStyle(() => ({ opacity: Math.min(pop.value, 1), transform: [{ scale: 0.4 + 0.6 * pop.value }] }));
  const glowStyle = useAnimatedStyle(() => ({ opacity: glow.value, transform: [{ scale: 0.95 + (glow.value - 0.7) * 0.33 }] }));
  const tick = useAnimatedProps(() => ({ strokeDashoffset: draw.value }));

  return (
    <View style={{ width: SIZE, height: SIZE, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={[styles.glow, glowStyle]} />
      <Ring delay={600} />
      <Ring delay={1400} />
      <Animated.View style={[styles.circle, circle]}>
        <Svg width={56} height={56} viewBox="0 0 24 24" fill="none">
          <AnimatedPath
            d="M20 6 9 17l-5-5"
            stroke={colors.onMint}
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={24}
            animatedProps={tick}
          />
        </Svg>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    ...StyleSheet.absoluteFill,
    borderRadius: SIZE / 2,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.mint,
    shadowOpacity: 0.4,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 0 },
  },
  ring: {
    ...StyleSheet.absoluteFill,
    borderRadius: SIZE / 2,
    borderWidth: 1.5,
    borderColor: 'rgba(61,235,180,0.5)',
  },
  glow: {
    position: 'absolute',
    width: SIZE + 70,
    height: SIZE + 70,
    borderRadius: (SIZE + 70) / 2,
    backgroundColor: 'rgba(61,235,180,0.14)',
  },
});
