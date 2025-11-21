import { StatusBar } from 'expo-status-bar';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';

const categories = [
  { label: 'Car', icon: 'car' as const },
  { label: 'Van', icon: 'van-passenger' as const },
  { label: 'Bike', icon: 'bike' as const },
  { label: 'Bicycle', icon: 'bicycle' as const },
  { label: 'Tuk-Tuk', icon: 'rickshaw' as const },
];

const vehicles = [
  {
    name: 'Toyota Premio',
    location: 'Colombo',
    price: 'Rs.9500',
    priceUnit: 'P/day',
    rating: 4.8,
    image:
      'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800',
    isFavorite: true,
  },
  {
    name: 'Honda Civic',
    location: 'Colombo',
    price: 'Rs.8500',
    priceUnit: 'P/day',
    rating: 4.5,
    image:
      'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=800',
    isFavorite: false,
  },
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.brandMark}>
              <MaterialCommunityIcons name="target" size={20} color="#F9A826" />
            </View>
            <Text style={styles.brandText}>Creavint</Text>
            <Pressable style={styles.notificationButton}>
              <MaterialIcons name="notifications-none" size={22} color="#1B8BA6" />
            </Pressable>
          </View>
          <View style={styles.searchRow}>
            <View style={styles.searchInput}>
              <Octicons name="search" size={18} color="#8B9AA8" />
              <TextInput
                placeholder="Search"
                placeholderTextColor="#A0AABB"
                style={styles.searchText}
                cursorColor="#1B8BA6"
              />
            </View>
            <Pressable style={styles.filterButton}>
              <MaterialCommunityIcons name="tune-variant" size={26} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        <View style={styles.promoCard}>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>Best Car For Rent Today</Text>
            <Text style={styles.promoPrice}>
              LKR 9,500 <Text style={styles.promoPriceUnit}>P/day</Text>
            </Text>
            <Pressable style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </Pressable>
          </View>
          <Image
            source={{ uri: vehicles[0].image }}
            style={styles.promoImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((category) => (
            <Pressable key={category.label} style={styles.categoryCard}>
              <View style={styles.categoryIcon}>
                <MaterialCommunityIcons name={category.icon} size={24} color="#5B7C99" />
              </View>
              <Text style={styles.categoryLabel}>{category.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Popular Vehicles</Text>
        {vehicles.map((vehicle) => (
          <View key={vehicle.name} style={styles.vehicleCard}>
            <Pressable style={styles.favoriteButton}>
              <MaterialCommunityIcons
                name={vehicle.isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color={vehicle.isFavorite ? '#FF3B30' : '#8E8E93'}
              />
            </Pressable>
            <Image source={{ uri: vehicle.image }} style={styles.carImage} resizeMode="contain" />
            <View style={styles.cardInfo}>
              <View style={styles.cardTopRow}>
                <Text style={styles.carName}>{vehicle.name}</Text>
                <View style={styles.ratingContainer}>
                  <MaterialCommunityIcons name="star" size={16} color="#F9A826" />
                  <Text style={styles.ratingText}>{vehicle.rating}</Text>
                </View>
              </View>
              <View style={styles.cardBottomRow}>
                <Text style={styles.locationText}>{vehicle.location}</Text>
                <Text style={styles.priceText}>
                  {vehicle.price} <Text style={styles.priceUnit}>{vehicle.priceUnit}</Text>
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem}>
          <MaterialCommunityIcons name="home" size={28} color="#1B8BA6" />
        </Pressable>
        <Pressable style={styles.navItem}>
          <MaterialCommunityIcons name="heart-outline" size={28} color="#A8B4C0" />
        </Pressable>
        <Pressable style={styles.navItem}>
          <MaterialCommunityIcons name="plus-circle-outline" size={28} color="#A8B4C0" />
        </Pressable>
        <Pressable style={styles.navItem}>
          <MaterialCommunityIcons name="account-circle-outline" size={28} color="#A8B4C0" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingBottom: 90,
  },
  header: {
    backgroundColor: '#1B8BA6',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    padding: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  brandMark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  brandText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  notificationButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E8F4F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
  },
  searchText: {
    flex: 1,
    marginLeft: 6,
    color: '#1d2b3b',
    fontSize: 15,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F9A826',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  promoCard: {
    backgroundColor: '#000000',
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 34,
  },
  promoPrice: {
    color: '#F9A826',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  promoPriceUnit: {
    fontSize: 14,
    fontWeight: '400',
  },
  bookButton: {
    backgroundColor: 'transparent',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 22,
    alignSelf: 'flex-start',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  promoImage: {
    width: 140,
    height: 100,
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  categoryScroll: {
    paddingLeft: 16,
    marginBottom: 8,
  },
  categoryCard: {
    width: 76,
    height: 94,
    borderRadius: 16,
    backgroundColor: '#F5F7FA',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E9F2',
  },
  categoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4A5568',
  },
  vehicleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginHorizontal: 16,
    marginTop: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 28,
    right: 28,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  carImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#E8ECEF',
    borderRadius: 16,
    marginBottom: 16,
  },
  cardInfo: {
    backgroundColor: '#FFFFFF',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  carName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666666',
    marginLeft: 4,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 15,
    color: '#666666',
    fontWeight: '400',
  },
  priceText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
  },
  priceUnit: {
    fontSize: 13,
    fontWeight: '400',
    color: '#666666',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingBottom: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
});
