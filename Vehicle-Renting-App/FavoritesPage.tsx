import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  StatusBar as RNStatusBar,
  Platform,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from './colors';

type Tab = 'home' | 'favorites' | 'post' | 'profile';

type Props = {
  visible?: boolean;
  asPage?: boolean;
  onClose?: () => void;
  onNavigate?: (tab: Tab) => void;
  activeTab?: Tab;
  favorites?: Array<any>;
};

export default function FavoritesPage({ asPage = false, onNavigate, onClose, activeTab = 'favorites', favorites = [] }: Props) {
  const [items, setItems] = useState(favorites);

  const handleRemove = (name: string) => {
    setItems((prev) => prev.filter((i) => i.name !== name));
  };

  const renderItem = ({ item }: { item: any }) => (
    <Pressable style={styles.vehicleCard}>
      <Pressable 
        style={styles.favoriteButton} 
        onPress={() => handleRemove(item.name)}
      >
        <MaterialCommunityIcons name="heart" size={24} color={colors.favorite} />
      </Pressable>
      <Image source={item.image} style={styles.carImage} resizeMode="contain" />
      <View style={styles.cardInfo}>
        <View style={styles.cardTopRow}>
          <Text style={styles.carName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <MaterialCommunityIcons name="star" size={16} color={colors.star} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.cardBottomRow}>
          <View style={styles.locationRow}>
            <MaterialCommunityIcons name="map-marker" size={16} color={colors.textSecondary} />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <Text style={styles.priceText}>
            {item.price} <Text style={styles.priceUnit}>{item.priceUnit}</Text>
          </Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <RNStatusBar barStyle="light-content" />

      {/* Header with Primary Background */}
      <View style={styles.headerSection}>
        <View style={styles.headerContent}>
          <View style={styles.headerSpacer} />
          <Text style={styles.title}>My Favorites</Text>
          <View style={styles.headerSpacer} />
        </View>
        <Text style={styles.subtitle}>
          {items.length} {items.length === 1 ? 'vehicle' : 'vehicles'} saved
        </Text>
      </View>

      {items.length === 0 ? (
        <ScrollView contentContainerStyle={styles.emptyContainer}>
          <View style={styles.emptyContent}>
            <View style={styles.emptyIconContainer}>
              <MaterialCommunityIcons name="heart-off-outline" size={80} color={colors.inactive} />
            </View>
            <Text style={styles.emptyTitle}>No Favorites Yet</Text>
            <Text style={styles.emptySubtitle}>
              Start adding vehicles to your favorites by tapping the heart icon on any vehicle card.
            </Text>
            <Pressable 
              style={styles.browseButton} 
              onPress={() => { onNavigate?.('home'); onClose?.(); }}
            >
              <MaterialCommunityIcons name="magnify" size={20} color={colors.white} />
              <Text style={styles.browseText}>Browse Vehicles</Text>
            </Pressable>
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => i.name}
          contentContainerStyle={styles.list}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerSection: {
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight ?? 24) + 16 : 32,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  headerSpacer: { width: 40 },
  title: { 
    flex: 1, 
    fontSize: 24, 
    fontWeight: '700', 
    color: colors.white, 
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginTop: 4,
  },
  emptyContainer: { 
    flex: 1, 
    minHeight: 500,
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyIconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: { 
    fontSize: 22, 
    fontWeight: '700', 
    color: colors.textPrimary,
    marginBottom: 8,
  },
  emptySubtitle: { 
    fontSize: 15,
    color: colors.textSecondary, 
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
    marginBottom: 24,
  },
  browseButton: { 
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primary, 
    paddingHorizontal: 24, 
    paddingVertical: 14, 
    borderRadius: 12,
    elevation: 4,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  browseText: { 
    color: colors.white, 
    fontWeight: '700',
    fontSize: 16,
  },
  list: { 
    padding: 16, 
    paddingTop: 20,
    paddingBottom: 120,
  },
  vehicleCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    marginBottom: 16,
    padding: 16,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  favoriteButton: {
    position: 'absolute',
    top: 24,
    right: 24,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  carImage: {
    width: '100%',
    height: 180,
    backgroundColor: colors.imageBackground,
    borderRadius: 14,
    marginBottom: 14,
  },
  cardInfo: {
    backgroundColor: 'transparent',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  carName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 10,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '400',
    marginLeft: 2,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  priceUnit: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textSecondary,
  },
});
