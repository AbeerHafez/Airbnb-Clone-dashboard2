// export interface Address {
//   country: string;
//   city: string;
//   street: string;
//   governorate: string;
//   postalCode: string;
// }

export interface Location {
  latitude: number;
  longitude: number;
}

export interface AvailableDate {
  start_date: Date;
  end_date: Date;
}

// export interface Amenity {
//   // Define fields as needed based on the Amenity structure.
//   name: string;  // Just an example, adjust it according to your schema
// }

export interface Listing {
  _id: string;  // Assuming MongoDB ObjectId as string
  type: string;
  category: string;  // This can be string or ID depending on your backend structure
  address: {
    country: string;
    city: string;
    street: string;
    governorate: string;
    postalCode: string;
  };
  location: Location;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  // amenities?: Amenity[];  // Optional field
  photos: string[];
  title: string;
  description: string;
  price: number;
  owner: string;  // User ID, assuming it's a string
  availableDates: AvailableDate[];
  verified:boolean
}
