export type Store = {
  slug: string;
  name: string;
  shortDescription: string;
  website: string;
  phone: string;
  rating: number | null;
  products: { gold: boolean; diamond: boolean; jewelry: boolean };
  features: string[];
  cities: string[];
  branches: { name: string; city: string; address: string; lat: number | null; lng: number | null }[];
};

export type GoldPricePoint = {
  karat: 24 | 22 | 21 | 18;
  pricePerGram: number;
};

export type GoldPriceData = {
  available: boolean;
  updatedAt: string | null;
  source: string | null;
  currency: string;
  prices: GoldPricePoint[];
  ouncePrice: number | null;
};
