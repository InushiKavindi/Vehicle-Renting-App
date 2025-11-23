import React, { useState } from 'react';
import Home from './Home';
import OnboardingScreen from './OnboardingScreen';

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return <Home />;
}
