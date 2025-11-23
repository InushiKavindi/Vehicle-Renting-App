import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from './colors';

type Props = {
  visible: boolean;
  onClose: () => void;
  onApply?: (filters: any) => void;
};

export default function FilterModal({ visible, onClose, onApply }: Props) {
  const [vehicleType, setVehicleType] = useState('');
  const [withDriver, setWithDriver] = useState(true);
  const [withoutDriver, setWithoutDriver] = useState(false);
  const [minPrice, setMinPrice] = useState(2000);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  function reset() {
  setVehicleType('');
    setWithDriver(true);
    setWithoutDriver(false);
    setMinPrice(2000);
    setMaxPrice(5000);
    setLocation('');
    setStartDate('');
    setEndDate('');
  }

  function apply() {
    onApply?.({ vehicleType, withDriver, withoutDriver, minPrice, maxPrice, location, startDate, endDate });
    onClose();
  }

  // Price range domain for visual slider mapping
  const PRICE_MIN = 0;
  const PRICE_MAX = 10000;
  const minPct = `${Math.max(0, Math.min(100, ((minPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100))}%`;
  const maxPct = `${Math.max(0, Math.min(100, ((maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100))}%`;
  const fillRightPct = `${100 - Math.max(0, Math.min(100, ((maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100))}%`;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={styles.fullFill} onPress={onClose} />

        <View style={styles.sheet}>
          <View style={styles.handle} />

          <View style={styles.headerRow}>
            <Text style={styles.title}>Filters</Text>
            <Pressable onPress={reset}>
              <Text style={styles.reset}>Reset</Text>
            </Pressable>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Vehicle Type</Text>
            <TouchableOpacity style={styles.select} activeOpacity={0.8} onPress={() => {}}>
              <Text style={[styles.selectText, !vehicleType && { color: colors.textSecondary }]}>
                {vehicleType || 'Select vehicle type'}
              </Text>
              <MaterialIcons name="keyboard-arrow-down" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Driver Option</Text>
            <View style={styles.driverRow}>
              <Pressable
                style={styles.checkboxOption}
                onPress={() => {
                  setWithDriver(true);
                  setWithoutDriver(false);
                }}
              >
                <MaterialIcons
                  name={withDriver ? 'radio-button-checked' : 'radio-button-unchecked'}
                  size={20}
                  color={withDriver ? colors.primary : colors.textSecondary}
                />
                <Text style={[styles.checkboxLabel, withDriver && styles.checkboxLabelSelected]}>With driver</Text>
              </Pressable>

              <Pressable
                style={styles.checkboxOption}
                onPress={() => {
                  setWithoutDriver(true);
                  setWithDriver(false);
                }}
              >
                <MaterialIcons
                  name={withoutDriver ? 'radio-button-checked' : 'radio-button-unchecked'}
                  size={20}
                  color={withoutDriver ? colors.primary : colors.textSecondary}
                />
                <Text style={[styles.checkboxLabel, withoutDriver && styles.checkboxLabelSelected]}>Without driver</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Price Range</Text>

            <View style={styles.sliderTrack}>
              {/* price labels directly above each knob */}
              <View style={[styles.priceLabel, ({ left: minPct } as any)]}>
                <Text style={styles.pricePillText}>LKR {minPrice}</Text>
              </View>
              <View style={[styles.priceLabel, ({ left: maxPct } as any)]}>
                <Text style={styles.pricePillText}>LKR {maxPrice}</Text>
              </View>

              {/* base and filled range */}
              <View style={styles.sliderBase} />
              <View style={[styles.sliderFill, ({ left: minPct, right: fillRightPct } as any)]} />

              {/* knobs */}
              <View style={[styles.knob, ({ left: minPct } as any)]} />
              <View style={[styles.knob, ({ left: maxPct } as any)]} />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Location</Text>
            <View style={styles.locationRow}>
              <TextInput
                placeholder="Enter pickup location (City / Area)"
                placeholderTextColor={colors.textSecondary}
                value={location}
                onChangeText={setLocation}
                style={styles.locationInput}
              />
              <MaterialIcons name="my-location" size={20} color={colors.textSecondary} />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Availability Dates</Text>
            <View style={styles.dateRow}>
              <Pressable style={styles.dateBox} onPress={() => {}}>
                <Text style={styles.dateText}>{startDate || 'Start Date'}</Text>
                <MaterialIcons name="date-range" size={18} color={colors.textSecondary} />
              </Pressable>
              <Pressable style={styles.dateBox} onPress={() => {}}>
                <Text style={styles.dateText}>{endDate || 'End Date'}</Text>
                <MaterialIcons name="date-range" size={18} color={colors.textSecondary} />
              </Pressable>
            </View>
          </View>

          <Pressable style={styles.applyButton} onPress={apply}>
            <Text style={styles.applyText}>Apply</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  fullFill: { flex: 1 },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 28,
    minHeight: 420,
  },
  handle: {
    width: 60,
    height: 6,
    backgroundColor: colors.borderLight,
    borderRadius: 4,
    alignSelf: 'center',
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  reset: {
    color: colors.primary,
    fontWeight: '600',
  },
  field: {
    marginBottom: 12,
  },
  fieldLabel: {
    marginBottom: 12,
    color: colors.textPrimary,
    fontSize: 14,
  },
  select: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    paddingHorizontal: 12,
    paddingVertical: 0,
    height: 48,
    borderRadius: 10,
  backgroundColor: colors.white,
  },
  selectText: {
    color: colors.textPrimary,
    fontSize: 15,
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.borderLight,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxBoxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: {
    marginLeft: 10,
    color: colors.textPrimary,
    fontSize: 14,
  },
  checkboxLabelSelected: {
    color: colors.textPrimary,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  pricePill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  pricePillRight: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  pricePillText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  priceLabel: {
    position: 'absolute',
    top: -40,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
    // center horizontally above knob (knob is centered via translateX:-9)
    marginLeft: -40,
  },
  sliderTrack: {
    height: 36,
    justifyContent: 'center',
    marginTop: 40,
  },
  sliderBase: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: colors.borderLight,
    borderRadius: 4,
  },
  sliderFill: {
    position: 'absolute',
    height: 6,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  knob: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary,
    borderWidth: 0,
    shadowColor: colors.black,
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    transform: [{ translateX: -9 }],
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    paddingHorizontal: 12,
    paddingVertical: 0,
    height: 48,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  locationInput: {
    flex: 1,
    marginRight: 10,
    color: colors.textPrimary,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  dateBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.borderLight,
    paddingHorizontal: 12,
    paddingVertical: 0,
    height: 48,
    borderRadius: 10,
  },
  dateText: {
    color: colors.textSecondary,
  },
  applyButton: {
    marginTop: 10,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
});
