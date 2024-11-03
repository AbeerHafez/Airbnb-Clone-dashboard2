import { owner } from "./listing";


export interface Reservations {
  userId: owner;
  reservations:{
    title:string;
    price:number;
    _id:string;
  };
  startDate:Date;
  endDate:Date;
  guestsCount:number;
  totalPrice:number;
}
