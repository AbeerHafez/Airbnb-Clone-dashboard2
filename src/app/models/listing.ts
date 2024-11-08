import { Amenity } from "./amenity"
import { Category} from './category'

export interface Address {
  country: string;
  city: string;
  street: string;
  governorate: string;
  postalCode: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface AvailableDate {
  start_date: Date;
  end_date: Date;
}

export interface owner {
  _id:string;
  firstName:string;
  lastName:string;
}


export interface Listing {
  _id: string;
  type: string;
  category: Category;
  address: Address;
  location: Location;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities?: Amenity[];
  photos: string[];
  title: string;
  description: string;
  price: number;
  owner: owner;
  availableDates: AvailableDate[];
  verified:boolean
}
