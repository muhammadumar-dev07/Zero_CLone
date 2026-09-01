export interface WatchProduct {
  id: string;
  name: string;
  subtitle: string;
  collection: 'royale' | 'explorer' | 'neural' | 'flagship';
  price: number;
  badge?: 'IN STOCK' | 'LIMITED' | 'PROTOTYPE' | 'NEW';
  badgeType?: 'stock' | 'limited' | 'prototype';
  description: string;
  image: string;
  galleryImages: string[];
  specs: {
    material: string;
    bezel: string;
    glass: string;
    processor: string;
    batteryLife: string;
    waterResistance: string;
    connectivity: string;
    weight: string;
    mohsHardness: string;
    chargingSpeed: string;
  };
  filterTags: {
    material: 'titanium' | 'sapphire' | 'carbon' | 'ceramic';
    connectivity: 'lte' | 'gps' | 'bluetooth' | 'neural';
    style: 'diver' | 'aero' | 'minimal' | 'cyber';
  };
  features: string[];
}

export interface CartItem {
  id: string;
  product: WatchProduct;
  quantity: number;
  customization?: {
    caseFinish: string;
    strap: string;
    accentColor: string;
    engravingText?: string;
  };
  selectedPrice: number;
}

export type ActiveScreen = 'home' | 'collections' | 'product' | 'technology' | 'custom' | 'story';
