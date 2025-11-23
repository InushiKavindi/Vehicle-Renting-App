import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar as RNStatusBar,
  Platform,
  Image,
  Modal,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from './colors';

type DriverOption = 'with' | 'without';

type Props = {
  visible?: boolean;
  asPage?: boolean;
  onClose?: () => void;
  onNavigate?: (tab: 'home' | 'favorites' | 'post' | 'profile') => void;
  activeTab?: 'home' | 'favorites' | 'post' | 'profile';
};

export default function PostVehiclePage({ visible, asPage = false, onClose, onNavigate, activeTab = 'post' }: Props) {
  const [vehicleType, setVehicleType] = useState('');
  const [driverOption, setDriverOption] = useState<DriverOption>('with');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  console.log('PostVehiclePage rendered, visible:', visible);

  const handleImageUpload = () => {
    // Placeholder for image picker functionality
    console.log('Image upload triggered');
  };

  const handlePostVehicle = () => {
    console.log('Post vehicle:', {
      vehicleType,
      driverOption,
      description,
      location,
      contactNumber,
      images: uploadedImages,
    });
  };

  const Content = (
    <SafeAreaView style={styles.container}>
      <RNStatusBar barStyle="light-content" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Post a Vehicle</Text>
            <Text style={styles.headerSubtitle}>List your vehicle for rent</Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Vehicle Type */}
          <View style={styles.fieldSection}>
            <Text style={styles.fieldLabel}>Vehicle Type</Text>
            <Pressable style={styles.dropdown}>
              <Text style={[styles.dropdownText, !vehicleType && styles.placeholderText]}>{vehicleType || 'select vehicle type'}</Text>
              <MaterialIcons name="keyboard-arrow-down" size={24} color={colors.textSecondary} />
            </Pressable>
          </View>

          {/* Driver Option */}
          <View style={styles.fieldSection}>
            <Text style={styles.fieldLabel}>Driver Option</Text>
            <View style={styles.radioGroup}>
              <Pressable
                style={styles.radioOption}
                onPress={() => setDriverOption('with')}
              >
                <View style={styles.radioOuter}>
                  {driverOption === 'with' && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioLabel}>With driver</Text>
              </Pressable>

              <Pressable
                style={styles.radioOption}
                onPress={() => setDriverOption('without')}
              >
                <View style={styles.radioOuter}>
                  {driverOption === 'without' && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioLabel}>Without driver</Text>
              </Pressable>
            </View>
          </View>

          {/* Vehicle Images */}
          <View style={styles.fieldSection}>
            <Text style={styles.fieldLabel}>Vehicle Images</Text>
            <View style={styles.imagesContainer}>
              <Pressable style={styles.uploadBox} onPress={handleImageUpload}>
                <MaterialIcons name="add" size={32} color={colors.textSecondary} />
              </Pressable>
            </View>
            <Text style={styles.uploadHint}>Upload up to 4 images</Text>
          </View>

          {/* Description */}
          <View style={styles.fieldSection}>
            <Text style={styles.fieldLabel}>Description</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Enter Features..."
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
            />
          </View>

          {/* Location */}
          <View style={styles.fieldSection}>
            <Text style={styles.fieldLabel}>Location</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter pickup location (City / Area)"
                placeholderTextColor={colors.textSecondary}
                value={location}
                onChangeText={setLocation}
              />
              <MaterialIcons name="my-location" size={20} color={colors.textSecondary} />
            </View>
          </View>

          {/* Contact Number */}
          <View style={styles.fieldSection}>
            <Text style={styles.fieldLabel}>Contact Number</Text>
            <View style={styles.contactInputWrapper}>
              <TextInput
                style={styles.contactTextInput}
                placeholder="Enter your phone number"
                placeholderTextColor={colors.textSecondary}
                keyboardType="phone-pad"
                value={contactNumber}
                onChangeText={setContactNumber}
              />
            </View>
          </View>

          {/* Post Vehicle Button */}
          <Pressable style={styles.postButton} onPress={handlePostVehicle}>
            <Text style={styles.postButtonText}>Post Vehicle</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Bottom Tab Bar - hidden when rendered inline as a page */}
      {!asPage && (
        <View style={styles.tabBar}>
          <Pressable style={styles.tabItem} onPress={() => { onNavigate?.('home'); onClose?.(); }}>
            <MaterialIcons name="home" size={28} color={activeTab === 'home' ? colors.primary : colors.inactive} />
          </Pressable>
          <Pressable style={styles.tabItem} onPress={() => { onNavigate?.('favorites'); onClose?.(); }}>
            <MaterialIcons name="favorite-border" size={28} color={activeTab === 'favorites' ? colors.primary : colors.inactive} />
          </Pressable>
          <Pressable style={styles.tabItem} onPress={() => { /* stay on post */ }}>
            <MaterialCommunityIcons name="plus-circle-outline" size={28} color={activeTab === 'post' ? colors.primary : colors.inactive} />
          </Pressable>
          <Pressable style={styles.tabItem} onPress={() => { onNavigate?.('profile'); onClose?.(); }}>
            <MaterialCommunityIcons name="account-outline" size={28} color={activeTab === 'profile' ? colors.primary : colors.inactive} />
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );

  if (asPage) {
    return Content;
  }

  return (
    <Modal visible={!!visible} animationType="slide" onRequestClose={onClose}>
      {Content}
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  headerSection: {
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight ?? 24) + 16 : 32,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
  },
  content: {
    padding: 20,
    paddingTop: 24,
    paddingBottom: 100,
  },
  fieldSection: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
  },
  dropdownText: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  placeholderText: {
    color: colors.textSecondary,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 24,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  radioLabel: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  imagesContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  uploadBox: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  uploadedImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  removeImageButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadHint: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  textArea: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.textPrimary,
    minHeight: 120,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    height: '100%',
    padding: 0,
  },

  /* Contact number input styles */
  contactInputWrapper: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    justifyContent: 'center',
  },
  contactTextInput: {
    fontSize: 15,
    color: colors.textPrimary,
    height: '100%',
    padding: 0,
  },
  postButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  postButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 10,
    elevation: 8,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonActive: {
    backgroundColor: colors.primary,
  },
  addButtonInactive: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
});
