import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Pressable,
  ScrollView,
  Platform,
  StatusBar as RNStatusBar,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from './colors';

const { width, height } = Dimensions.get('window');

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor: string;
  backgroundColor: string;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Find Your Perfect Ride',
    description: 'Browse through hundreds of vehicles available for rent. From cars to bikes, we have everything you need.',
    icon: 'car-search',
    iconColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  {
    id: 2,
    title: 'Easy Booking Process',
    description: 'Book your vehicle in just a few taps. Select your dates, choose your vehicle, and hit the road.',
    icon: 'calendar-check',
    iconColor: colors.accent,
    backgroundColor: '#FFF4E6',
  },
  {
    id: 3,
    title: 'Safe & Secure',
    description: 'All vehicles are verified and insured. Enjoy your journey with complete peace of mind.',
    icon: 'shield-check',
    iconColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };

  const scrollToNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({
        x: width * nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    } else {
      onComplete();
    }
  };

  const skip = () => {
    onComplete();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Skip Button */}
      <View style={styles.topBar}>
        <Pressable onPress={skip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>

      {/* Slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {slides.map((slide) => (
          <View key={slide.id} style={styles.slide}>
            <View style={[styles.iconContainer, { backgroundColor: slide.backgroundColor }]}>
              <MaterialCommunityIcons
                name={slide.icon}
                size={120}
                color={slide.iconColor}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.description}>{slide.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      {/* Next/Get Started Button */}
      <View style={styles.bottomContainer}>
        <Pressable
          style={styles.nextButton}
          onPress={scrollToNext}
        >
          <Text style={styles.nextButtonText}>
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topBar: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight ?? 24) + 8 : 8,
    paddingBottom: 8,
    alignItems: 'flex-end',
  },
  skipButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 220,
    height: 220,
    borderRadius: 110,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 48,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  activeDot: {
    width: 32,
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    width: 10,
    backgroundColor: colors.inactive,
  },
  bottomContainer: {
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
  nextButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
});
