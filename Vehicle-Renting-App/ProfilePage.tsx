import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  StatusBar as RNStatusBar,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { colors } from './colors';

type Tab = 'home' | 'favorites' | 'post' | 'profile';

type Props = {
  asPage?: boolean;
  onClose?: () => void;
  onNavigate?: (tab: Tab) => void;
  activeTab?: Tab;
};

export default function ProfilePage({ asPage = false, onNavigate, onClose }: Props) {
  const user = {
    name: 'John Doe',
    location: 'Colombo, LK',
    // use existing asset file in the project (space in filename preserved)
    avatar: require('./assets/profile image.png'),
    joined: 'Mar 2023',
  };

  const Row = ({ icon, label, onPress }: { icon: string; label: string; onPress?: () => void }) => (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={styles.rowLeft}>
        <MaterialCommunityIcons name={icon as any} size={22} color={colors.textSecondary} />
        <Text style={styles.rowLabel}>{label}</Text>
      </View>
      <MaterialIcons name="keyboard-arrow-right" size={22} color={colors.textSecondary} />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <RNStatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.back} />
            <Text style={styles.title}>Profile</Text>
            <View style={styles.headerSpacer} />
          </View>

        <View style={styles.profileCard}>
          <Image source={user.avatar} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.location}>{user.location}</Text>
            <Text style={styles.joined}>Joined {user.joined}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Row icon="account-edit" label="Edit Profile" onPress={() => { /* TODO */ }} />
          <Row icon="calendar-check" label="My Bookings" onPress={() => { /* TODO */ }} />
          <Row icon="credit-card" label="Payment Methods" onPress={() => { /* TODO */ }} />
          <Row icon="headset" label="Help & Support" onPress={() => { /* TODO */ }} />
        </View>

        <View style={styles.section}>
          <Pressable style={styles.logoutButton} onPress={() => { /* TODO: perform logout */ }}>
            <Text style={styles.logoutText}>Log out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 16, paddingBottom: 120 },
  header: {
    paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight ?? 24) : 0,
    paddingBottom: 12,
    paddingHorizontal: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  back: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerSpacer: { width: 40 },
  title: { flex: 1, textAlign: 'center', fontSize: 20, fontWeight: '700', color: colors.textPrimary },
  profileCard: { backgroundColor: colors.cardBackground, borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 16, elevation: 4 },
  avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: colors.imageBackground, marginRight: 12 },
  profileInfo: { flex: 1 },
  name: { fontSize: 18, fontWeight: '700', color: colors.textPrimary },
  location: { color: colors.textSecondary, marginTop: 4 },
  joined: { color: colors.textSecondary, marginTop: 6, fontSize: 12 },
  section: { marginTop: 12, backgroundColor: colors.white },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomColor: colors.borderLight, borderBottomWidth: 1 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowLabel: { marginLeft: 12, fontSize: 15, color: colors.textPrimary },
  logoutButton: { backgroundColor: colors.primary, paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  logoutText: { color: colors.white, fontWeight: '700' },
});
