import type { LucideIcon } from 'lucide-react-native';
import { View } from 'react-native';

import { Screen } from '@/components/Screen';
import { AppText, Surface } from '@/components/ui';
import { colors } from '@/theme';

export function ComingSoon({ title, icon: Icon }: { title: string; icon: LucideIcon }) {
  return (
    <Screen scroll={false} contentStyle={{ paddingHorizontal: 20 }}>
      <AppText weight="semibold" size={28} style={{ letterSpacing: -0.6 }}>
        {title}
      </AppText>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 100 }}>
        <Surface style={{ padding: 32, alignItems: 'center', gap: 12, alignSelf: 'stretch' }}>
          <Icon size={32} color={colors.mint} strokeWidth={1.5} />
          <AppText weight="semibold" size={17}>
            Em breve
          </AppText>
          <AppText size={13} color={colors.textSecondary} style={{ textAlign: 'center' }}>
            Esta tela ainda não faz parte do protótipo.
          </AppText>
        </Surface>
      </View>
    </Screen>
  );
}
