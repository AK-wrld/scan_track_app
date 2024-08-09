import React from 'react';

export type Orientation = 'portrait' | 'landscape';

export interface OrientationContextProps {
  orientation: Orientation;
  setOrientation: React.Dispatch<React.SetStateAction<Orientation>>;
}

export const OrientationContext = React.createContext<OrientationContextProps | undefined>(undefined);