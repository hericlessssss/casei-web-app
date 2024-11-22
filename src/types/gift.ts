export interface Gift {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  suggestedStores: {
    name: string;
    url: string;
  }[];
  reserved: boolean;
  reservedBy?: string;
}