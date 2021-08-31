export interface Address {
  street: string;
  houseNumber: string;
  city: string;
  postcode: string;
  voivodeship?: string;
  district?: string;
  community?: string;
  apartmentNumber?: string;
  country?: string;
}