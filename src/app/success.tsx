import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { Share2, X } from 'lucide-react-native';
import { Share, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SuccessCheck } from '@/components/SuccessCheck';
import { AppText, PrimaryButton, SecondaryButton, SquareButton, Surface } from '@/components/ui';
import { CONTACTS } from '@/data';
import { formatBRL } from '@/lib/format';
import { colors } from '@/theme';

export default function Success() {
  const insets = useSafeAreaInsets();
  const { amount, contact } = useLocalSearchParams<{ amount?: string; contact?: string }>();
  const ct = CONTACTS[Number(contact) || 0];
  const amt = formatBRL(Number(amount) || 0);

  const receipt = [
    ['Para', ct.full],
    ['Data', '17 nov 2026 · 09:41'],
    ['Origem', 'Saldo Sylva · BRL'],
    ['Taxa', 'R$ 0,00'],
    ['ID', 'TRX-8F3K-2291'],
  ];

  const goHome = () => router.dismissAll();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <LinearGradient colors={['#15392E', colors.bg]} locations={[0, 0.7]} style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '65%' }} />
      <View style={{ flex: 1, paddingTop: insets.top + 8 }}>
        <View style={{ alignItems: 'flex-end', paddingHorizontal: 20 }}>
          <SquareButton icon={X} onPress={goHome} />
        </View>

        <View style={{ alignItems: 'center', gap: 36, paddingTop: 56 }}>
          <SuccessCheck />
          <View style={{ alignItems: 'center', gap: 8 }}>
            <AppText weight="semibold" size={24} style={{ letterSpacing: -0.5 }}>
              Transferência enviada
            </AppText>
            <AppText size={15} color={colors.textSecondary}>
              {amt} para {ct.full}
            </AppText>
          </View>
        </View>

        <Surface style={{ marginHorizontal: 20, marginTop: 40, paddingHorizontal: 20, paddingVertical: 6 }}>
          {receipt.map(([k, v], i) => (
            <View
              key={k}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 12,
                borderTopWidth: i ? 1 : 0,
                borderTopColor: colors.hairline,
              }}
            >
              <AppText size={13} color={colors.textSecondary}>
                {k}
              </AppText>
              <AppText weight="semibold" size={14}>
                {v}
              </AppText>
            </View>
          ))}
        </Surface>

        <View style={{ marginTop: 'auto', paddingHorizontal: 20, gap: 10, paddingBottom: Math.max(insets.bottom, 14) + 20 }}>
          <SecondaryButton
            label="Compartilhar comprovante"
            icon={Share2}
            onPress={() =>
              Share.share({ message: `Sylva · Transferência de ${amt} para ${ct.full} · TRX-8F3K-2291` }).catch(() => {})
            }
          />
          <PrimaryButton label="Voltar ao início" onPress={goHome} />
        </View>
      </View>
    </View>
  );
}
