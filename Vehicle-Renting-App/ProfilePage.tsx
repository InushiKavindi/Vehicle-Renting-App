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
    name: 'Lisa Wilson',
    email: 'lisawilson@gmail.com',
    location: 'Colombo, Sri Lanka',
    avatar: require('./assets/profile image.png'),
    joined: 'March 2023',
  };

  const stats = [
    { icon: 'car-side', label: 'Bookings', value: '12', color: colors.primary },
    { icon: 'heart', label: 'Favorites', value: '8', color: colors.favorite },
    { icon: 'star', label: 'Reviews', value: '4.9', color: colors.star },
  ];

  const MenuItem = ({ icon, label, subtitle, onPress }: { icon: string; label: string; subtitle?: string; onPress?: () => void }) => (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIconContainer}>
        <MaterialCommunityIcons name={icon as any} size={24} color={colors.primary} />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuLabel}>{label}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <RNStatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header with Avatar */}
        <View style={styles.headerGradient}>
          <View style={styles.headerContent}>
            <View style={styles.avatarContainer}>
              <Image source={user.avatar} style={styles.avatar} />
              <Pressable style={styles.editAvatarButton}>
                <MaterialCommunityIcons name="camera" size={16} color={colors.white} />
              </Pressable>
            </View>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <View style={styles.locationRow}>
              <MaterialCommunityIcons name="map-marker" size={14} color={colors.white} />
              <Text style={styles.userLocation}>{user.location}</Text>
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: `${stat.color}15` }]}>
                <MaterialCommunityIcons name={stat.icon as any} size={24} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.menuCard}>
            <MenuItem icon="account-edit" label="Edit Profile" subtitle="Update your personal info" onPress={() => { /* TODO */ }} />
            <View style={styles.menuDivider} />
            <MenuItem icon="shield-check" label="Privacy & Security" subtitle="Manage your account settings" onPress={() => { /* TODO */ }} />
            <View style={styles.menuDivider} />
            <MenuItem icon="bell-outline" label="Notifications" subtitle="Manage notification preferences" onPress={() => { /* TODO */ }} />
          </View>
        </View>

        {/* Activity Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity</Text>
          <View style={styles.menuCard}>
            <MenuItem icon="calendar-check" label="My Bookings" subtitle="View booking history" onPress={() => { /* TODO */ }} />
            <View style={styles.menuDivider} />
            <MenuItem icon="car-clock" label="My Listings" subtitle="Manage your vehicles" onPress={() => { /* TODO */ }} />
            <View style={styles.menuDivider} />
            <MenuItem icon="star-outline" label="Reviews" subtitle="See all reviews" onPress={() => { /* TODO */ }} />
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.menuCard}>
            <MenuItem icon="headset" label="Help & Support" subtitle="Get help with your account" onPress={() => { /* TODO */ }} />
            <View style={styles.menuDivider} />
            <MenuItem icon="information-outline" label="About" subtitle="App version 1.0.0" onPress={() => { /* TODO */ }} />
          </View>
        </View>

        {/* Logout Button */}
        <Pressable style={styles.logoutButton} onPress={() => { /* TODO: perform logout */ }}>
          <MaterialCommunityIcons name="logout" size={20} color={colors.favorite} />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingBottom: 100 },
  headerGradient: {
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight ?? 24) + 20 : 40,
    paddingBottom: 80,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: { alignItems: 'center', paddingHorizontal: 20 },
  avatarContainer: { position: 'relative', marginBottom: 12 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 4, borderColor: colors.white },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
  },
  userName: { fontSize: 24, fontWeight: '700', color: colors.white, marginBottom: 4 },
  userEmail: { fontSize: 14, color: 'rgba(255,255,255,0.9)', marginBottom: 6 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  userLocation: { fontSize: 13, color: 'rgba(255,255,255,0.85)' },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -50,
    marginHorizontal: 16,
    paddingHorizontal: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 6,
    elevation: 4,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: { fontSize: 20, fontWeight: '700', color: colors.textPrimary, marginBottom: 2 },
  statLabel: { fontSize: 12, color: colors.textSecondary },
  section: { marginTop: 24, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.textPrimary, marginBottom: 12 },
  menuCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 4,
    elevation: 2,
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    paddingHorizontal: 16,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: `${colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuContent: { flex: 1 },
  menuLabel: { fontSize: 15, fontWeight: '600', color: colors.textPrimary, marginBottom: 2 },
  menuSubtitle: { fontSize: 12, color: colors.textSecondary },
  menuDivider: { height: 1, backgroundColor: colors.borderLight, marginHorizontal: 16 },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.favorite,
    gap: 8,
  },
  logoutText: { fontSize: 16, fontWeight: '700', color: colors.favorite },
});