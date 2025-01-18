// frontend/src/contexts/AssetContext.tsx

import React, { createContext, useContext, useState } from 'react';
import { Asset } from '../types/shared';

interface AssetContextType {
  selectedAsset: Asset | null;
  setSelectedAsset: (asset: Asset | null) => void;
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const AssetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  return (
    <AssetContext.Provider value={{ selectedAsset, setSelectedAsset }}>
      {children}
    </AssetContext.Provider>
  );
};

export const useAssetContext = () => {
  const context = useContext(AssetContext);
  if (context === undefined) {
    throw new Error('useAssetContext must be used within an AssetProvider');
  }
  return context;
}; 