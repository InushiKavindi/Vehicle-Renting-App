import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar as RNStatusBar,
  Platform,
  Modal,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from './colors';
import ContactDetailsPage from './ContactDetailsPage';

type Vehicle = {
  name: string;
  location: string;
  price: string;
  priceUnit: string;
  rating: number;
  image: any;
  isFavorite: boolean;
};

type Props = {
  visible: boolean;
  vehicle: Vehicle;
  onClose?: () => void;
};

export default function VehicleDetailsPage({ visible, vehicle, onClose }: Props) {
  const [contactDetailsVisible, setContactDetailsVisible] = useState(false);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <RNStatusBar barStyle="dark-content" />

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Main Image Section with Header */}
          <View style={styles.imageSection}>
            {/* Header inside image section */}
            <View style={styles.headerInImage}>
              <Pressable onPress={onClose} style={styles.backButtonInImage}>
                <MaterialIcons name="chevron-left" size={28} color={colors.textPrimary} />
              </Pressable>
              <View style={styles.headerActions}>
                <Pressable style={styles.actionButtonInImage}>
                  <MaterialIcons name="share" size={24} color={colors.textPrimary} />
                </Pressable>
                <Pressable style={styles.actionButtonInImage}>
                  <MaterialIcons name="favorite-outline" size={24} color={colors.textPrimary} />
                </Pressable>
              </View>
            </View>

            {/* Main Vehicle Image */}
            <View style={styles.mainImageContainer}>
              <Image
                source={vehicle.image}
                style={styles.mainImage}
                resizeMode="contain"
              />
            </View>

            {/* Thumbnail Images */}
            <View style={styles.thumbnailRow}>
              <Image
                source={require('./assets/Car 1.1.jpg')}
                style={styles.thumbnail}
                resizeMode="cover"
              />
              <Image
                source={require('./assets/Car 1.2.jpeg')}
                style={styles.thumbnail}
                resizeMode="cover"
              />
              <Image
                source={require('./assets/Car 1.3.jpg')}
                style={styles.thumbnail}
                resizeMode="cover"
              />
            </View>

            {/* Rating - positioned at bottom right */}
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={16} color={colors.star} />
              <Text style={styles.ratingText}>{vehicle.rating}</Text>
            </View>
          </View>

          {/* Vehicle Title and Price - on same row */}
          <View style={styles.titleSection}>
            <View style={styles.titlePriceRow}>
              <Text style={styles.vehicleTitle}>{vehicle.name}</Text>
              <Text style={styles.priceText}>
                <Text style={styles.priceAmount}>{vehicle.price} </Text>
                <Text style={styles.priceUnit}>{vehicle.priceUnit}</Text>
              </Text>
            </View>
          </View>

          {/* Vehicle Specs - 2 Column Layout */}
          <View style={styles.specsSection}>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Vehicle Type</Text>
              <Text style={styles.specValue}>Car</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Engine Capacity</Text>
              <Text style={styles.specValue}>1500cc</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Transmission</Text>
              <Text style={styles.specValue}>Automatic</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Fuel Type</Text>
              <Text style={styles.specValue}>Petrol</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Seating</Text>
              <Text style={styles.specValue}>5 Seats</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Fuel Economy</Text>
              <Text style={styles.specValue}>12-16 km/L</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Mileage</Text>
              <Text style={styles.specValue}>75,000 km</Text>
            </View>
          </View>

          {/* Availability Section */}
          <View style={styles.availabilitySection}>
            <View style={styles.availabilityRow}>
              <Text style={styles.infoLabel}>Availability:</Text>
              <Text style={styles.infoValue}>12 Nov – 30 Dec 2025</Text>
            </View>
            <View style={styles.availabilityRow}>
              <Text style={styles.infoLabel}>Pickup Location:</Text>
              <Text style={styles.infoValue}>Colombo 06 – Wellawatte</Text>
            </View>
          </View>

          {/* Renter Details Section */}
          <View style={styles.renterSection}>
            <Text style={styles.renterTitle}>Renter Details</Text>
            <View style={styles.renterRow}>
              <Text style={styles.renterLabel}>Owner Name:</Text>
              <Text style={styles.renterValue}>*******</Text>
            </View>
            <View style={styles.renterRow}>
              <Text style={styles.renterLabel}>Phone Number:</Text>
              <Text style={styles.renterValue}>**********</Text>
            </View>
          </View>

          {/* Contact Button */}
          <Pressable style={styles.contactButton} onPress={() => setContactDetailsVisible(true)}>
            <Text style={styles.contactButtonText}>View Contact Details</Text>
          </Pressable>
        </ScrollView>

        {contactDetailsVisible && (
          <ContactDetailsPage
            visible={true}
            vehicleName={vehicle.name}
            vehicleLocation={vehicle.location}
            onClose={() => setContactDetailsVisible(false)}
          />
        )}

        {/* Bottom navigation removed for vehicle details page */}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight ?? 24) + 8 : 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  imageSection: {
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight ?? 24) + 8 : 16,
    paddingBottom: 8,
    marginBottom: 8,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerInImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  backButtonInImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonInImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImageContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  thumbnailRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  thumbnail: {
    flex: 1,
    height: 70,
    borderRadius: 12,
    backgroundColor: colors.background,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: 2,
  },
  titleSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  titlePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
  },
  priceAmount: {
    color: colors.primary,
    fontWeight: '700',
  },
  priceUnit: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '400',
  },
  specsSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  specLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '400',
  },
  specValue: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
  },
  availabilitySection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  availabilityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoRow: {
    paddingVertical: 10,
  },
  infoLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 4,
  },
  infoValue: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  renterSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  renterTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  renterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  renterLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '400',
  },
  renterValue: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
  },
  contactButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  contactButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  // bottom navigation removed
});
