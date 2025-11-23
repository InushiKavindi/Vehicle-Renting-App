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
    <View style={styles.card}>
      <Pressable style={styles.favoriteButton} onPress={() => handleRemove(item.name)}>
        <MaterialCommunityIcons name="heart" size={20} color={colors.favorite} />
      </Pressable>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.price}>{item.price} <Text style={styles.priceUnit}>{item.priceUnit}</Text></Text>
          <View style={styles.ratingWrap}>
            <MaterialCommunityIcons name="star" size={14} color={colors.star} />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <RNStatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <View style={styles.back} />
        <Text style={styles.title}>Favorites</Text>
        <View style={styles.headerSpacer} />
      </View>

      {items.length === 0 ? (
        <View style={styles.empty}> 
          <MaterialCommunityIcons name="heart-off" size={64} color={colors.inactive} />
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptySubtitle}>Tap the heart on any vehicle to save it for later.</Text>
          <Pressable style={styles.browseButton} onPress={() => { onNavigate?.('home'); onClose?.(); }}>
            <Text style={styles.browseText}>Browse Vehicles</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => i.name}
          contentContainerStyle={styles.list}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight ?? 24) : 0,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    backgroundColor: colors.white,
  },
  back: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerSpacer: { width: 40 },
  title: { flex: 1, fontSize: 20, fontWeight: '700', color: colors.textPrimary, textAlign: 'center' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  emptyTitle: { marginTop: 12, fontSize: 18, fontWeight: '700', color: colors.textPrimary },
  emptySubtitle: { marginTop: 8, color: colors.textSecondary, textAlign: 'center' },
  browseButton: { marginTop: 16, backgroundColor: colors.primary, paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10 },
  browseText: { color: colors.white, fontWeight: '700' },
  list: { padding: 16, paddingBottom: 120 },
  card: { backgroundColor: colors.cardBackground, borderRadius: 16, padding: 12, flexDirection: 'row', alignItems: 'center', elevation: 4 },
  favoriteButton: { position: 'absolute', top: 12, right: 12, zIndex: 10, width: 36, height: 36, borderRadius: 18, backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center' },
  image: { width: 110, height: 90, marginRight: 12, borderRadius: 8, backgroundColor: colors.imageBackground },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  location: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  price: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  priceUnit: { fontSize: 13, fontWeight: '400', color: colors.textSecondary },
  ratingWrap: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rating: { marginLeft: 6, color: colors.textSecondary },
});
