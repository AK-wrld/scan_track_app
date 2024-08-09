import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { Orientation, OrientationContext } from '../context/OrientationContext';

export const OrientationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orientation, setOrientation] = useState<Orientation>('portrait');

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    const subscription = Dimensions.addEventListener('change', updateOrientation);
    updateOrientation();

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <OrientationContext.Provider value={{ orientation, setOrientation }}>
      {children}
    </OrientationContext.Provider>
  );
};