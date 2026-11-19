import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { ChevronLeft, Delete, Plus, Search } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Screen } from '@/components/Screen';
import { AppText, PrimaryButton, SquareButton } from '@/components/ui';
import { BALANCE, CONTACTS, QUICK_AMOUNTS } from '@/data';
import { formatBRL, groupThousands } from '@/lib/format';
import { colors, radius } from '@/theme';

const ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', 'del'],
] as const;
const KEYS = ROWS.flat();

export default function Transfer() {
  const insets = useSafeAreaInsets();
  const [contact, setContact] = useState(0);
  const [amt, setAmt] = useState('250');

  const press = (k: (typeof KEYS)[number]) => {
    Haptics.selectionAsync().catch(() => {});
    setAmt((a) => {
      if (k === 'del') return a.slice(0, -1);
      if (k === '.') return a.includes('.') ? a : (a || '0') + '.';
      const [ip, dp] = a.split('.');
      if (dp !== undefined && dp.length >= 2) return a;
      if (dp === undefined && ip.length >= 6) return a;
      return a === '0' ? k : a + k;
    });
  };

  const [ip, dp] = amt.split('.');
  const display = (ip ? groupThousands(Number(ip)) : '0') + (dp !== undefined ? ',' + dp : '');
  const amtNum = parseFloat(amt || '0') || 0;
  const ct = CONTACTS[contact];

  const send = () => {
    if (amtNum <= 0) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    router.replace({ pathname: '/success', params: { amount: String(amtNum), contact: String(contact) } });
  };

  return (
    <Screen scroll={false}>
      <View style={styles.header}>
        <SquareButton icon={ChevronLeft} onPress={() => router.back()} />
        <AppText weight="semibold" size={17}>
          Transferir
        </AppText>
        <SquareButton icon={Search} />
      </View>

      <AppText size={12} color={colors.textSecondary} style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        Para
      </AppText>
      <View style={{ height: 96 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contacts}>
          <View style={styles.contact}>
            <View style={styles.newAvatar}>
              <Plus size={20} color={colors.text} strokeWidth={1.5} />
            </View>
            <AppText size={12} color={colors.textSecondary}>
              Novo
            </AppText>
          </View>
          {CONTACTS.map((c, i) => {
            const on = i === contact;
            return (
              <Pressable key={c.ini} onPress={() => setContact(i)} style={styles.contact}>
                <View style={[styles.avatar, { backgroundColor: c.bg }, on && styles.avatarOn]}>
                  <AppText weight="semibold" size={16}>
                    {c.ini}
                  </AppText>
                </View>
                <AppText size={12} color={on ? colors.text : colors.textSecondary}>
                  {c.n}
                </AppText>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.amountWrap}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 4 }}>
          <AppText weight="semibold" size={32} color={colors.textSecondary} style={{ marginTop: 8 }}>
            R$
          </AppText>
          <AppText weight="semibold" size={64} style={{ letterSpacing: -2.5, lineHeight: 72 }}>
            {display}
          </AppText>
        </View>
        <AppText size={13} color={colors.textTertiary}>
          Disponível: {BALANCE.available}
        </AppText>
        <View style={{ flexDirection: 'row', gap: 8, paddingTop: 6 }}>
          {QUICK_AMOUNTS.map((v) => (
            <Pressable
              key={v}
              onPress={() => setAmt(String(Math.round(((parseFloat(amt) || 0) + v) * 100) / 100))}
              style={({ pressed }) => [styles.quick, pressed && { backgroundColor: colors.elevated }]}
            >
              <AppText weight="semibold" size={13}>
                +R$ {v}
              </AppText>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.keys}>
        {ROWS.map((row, r) => (
          <View key={r} style={styles.keyRow}>
            {row.map((k) => (
              <Pressable
                key={k}
                onPress={() => press(k)}
                style={({ pressed }) => [styles.key, pressed && { backgroundColor: colors.elevated }]}
              >
                {k === 'del' ? (
                  <Delete size={24} color={colors.text} strokeWidth={1.5} />
                ) : (
                  <AppText weight="medium" size={26}>
                    {k === '.' ? ',' : k}
                  </AppText>
                )}
              </Pressable>
            ))}
          </View>
        ))}
      </View>

      <View
        style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: Math.max(insets.bottom, 14) + 20 }}
      >
        <PrimaryButton
          label={amtNum > 0 ? `Enviar ${formatBRL(amtNum)} para ${ct.n}` : 'Digite um valor'}
          disabled={amtNum <= 0}
          onPress={send}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  contacts: { gap: 14, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 4 },
  contact: { alignItems: 'center', gap: 8 },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  avatarOn: { borderWidth: 2, borderColor: colors.mint },
  newAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
  quick: {
    height: 32,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keys: { paddingHorizontal: 20, gap: 6 },
  keyRow: { flexDirection: 'row', gap: 6 },
  key: {
    flex: 1,
    height: 56,
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
