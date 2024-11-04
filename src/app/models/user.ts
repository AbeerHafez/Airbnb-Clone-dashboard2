export interface User {
    firstName: string;

    lastName: string;
  
    email: string;
  
    password: string;
  
    phoneNumber?: string;
  
    image?: string;
  
    address: {
        country: string;
        street: string;
        city: string;
        zip: number;
    };
  
    roles?: string;
    _id?: string;
  
}
