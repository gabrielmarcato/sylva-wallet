import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/theme';

type Props = {
  children: ReactNode;
  scroll?: boolean;
  bottomPadding?: number;
  contentStyle?: StyleProp<ViewStyle>;
  footer?: ReactNode;
};

export function Screen({ children, scroll = true, bottomPadding = 0, contentStyle, footer }: Props) {
  const insets = useSafeAreaInsets();
  const top = insets.top + 8;
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[colors.bgTop, colors.bg]}
        locations={[0, 0.62]}
        style={StyleSheet.absoluteFill}
      />
      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[{ paddingTop: top, paddingBottom: bottomPadding }, contentStyle]}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[{ flex: 1, paddingTop: top }, contentStyle]}>{children}</View>
      )}
      {footer}
    </View>
  );
}

const styles = StyleSheet.create({ root: { flex: 1, backgroundColor: colors.bg } });
