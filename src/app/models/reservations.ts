import { owner } from "./listing";


export interface Reservations {
  userId: owner;
  listingId:{
    title:string;
    price:number;
    _id:string;
  };
  startDate:Date;
  endDate:Date;
  guestsCount:number;
  totalPrice:number;
}
