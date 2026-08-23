import storesData from "@/data/stores.json";
import type { Store } from "./types";

export function getAllStores(): Store[] {
  return storesData.stores as Store[];
}

export function getStoreBySlug(slug: string): Store | undefined {
  return getAllStores().find((s) => s.slug === slug);
}
