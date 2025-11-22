import React from 'react';
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

type Props = {
  visible: boolean;
  vehicleName: string;
  vehicleLocation: string;
  onClose?: () => void;
};

export default function ContactDetailsPage({ visible, vehicleName, vehicleLocation, onClose }: Props) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <RNStatusBar barStyle="dark-content" />

        {/* Map Section */}
        <View style={styles.mapSection}>
          <Pressable onPress={onClose} style={styles.backButton}>
            <MaterialIcons name="chevron-left" size={28} color={colors.textPrimary} />
          </Pressable>
          
          {/* Map Placeholder - You can integrate actual map here */}
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapText}>Map View</Text>
            <View style={styles.locationMarker}>
              <MaterialIcons name="location-on" size={32} color="#E53935" />
            </View>
          </View>
          
          <View style={styles.locationLabel}>
            <Text style={styles.locationText}>{vehicleLocation}</Text>
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Vehicle Title and ID */}
          <View style={styles.titleSection}>
            <Text style={styles.vehicleTitle}>{vehicleName}</Text>
            <Text style={styles.vehicleId}>CAY-4587</Text>
          </View>

          {/* Contact Details Section */}
          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Contact Details</Text>
            <View style={styles.contactCard}>
              <Image
                  source={require('./assets/profile image.png')}
                  style={styles.avatar}
                />
              <View style={styles.contactInfo}>
                <Text style={styles.ownerName}>Lisa Wilson</Text>
                <Text style={styles.ownerLocation}>{vehicleLocation}</Text>
              </View>
              <View style={styles.contactActions}>
                <Pressable style={styles.actionIcon}>
                  <MaterialIcons name="phone" size={24} color={colors.primary} />
                </Pressable>
                <Pressable style={styles.actionIcon}>
                  <MaterialCommunityIcons name="whatsapp" size={24} color="#25D366" />
                </Pressable>
              </View>
            </View>
          </View>

          {/* Notes from Owner Section */}
          <View style={styles.notesSection}>
            <Text style={styles.sectionTitle}>Notes from Owner</Text>
            <View style={styles.noteItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.noteText}>Please bring your passport or NIC.</Text>
            </View>
            <View style={styles.noteItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.noteText}>Return with same fuel level.</Text>
            </View>
          </View>

          {/* Book Now Button */}
          <Pressable style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mapSection: {
    height: 300,
    backgroundColor: colors.background,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? (RNStatusBar.currentHeight ?? 24) + 8 : 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
  },
  mapText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 100,
  },
  locationMarker: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    marginLeft: -16,
    marginTop: -32,
  },
  locationLabel: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: [{ translateX: -100 }],
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  vehicleTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  vehicleId: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  contactSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.background,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  ownerLocation: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  contactActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notesSection: {
    marginBottom: 24,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.textPrimary,
    marginTop: 7,
    marginRight: 10,
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: 20,
  },
  bookButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  bookButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
});
