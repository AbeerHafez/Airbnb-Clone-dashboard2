import { Routes } from '@angular/router';
import {listingComponent} from './listing/listing.component'
import { RoomDetailsComponent } from './RoomDetails/RoomDetails.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AmenityComponent } from './amenity/amenity.component';
import { CategoryComponent } from './category/category.component';
import { ReservationsComponent } from './reservations/reservations.component'
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { NewListingComponent } from './NewListing/NewListing.component'
export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [

      {
        path: 'reviews',
        component: ReviewsComponent,
      },
      {
        path: 'amenity',
        component: AmenityComponent,
      },
      {
        path: 'listing',
        component: listingComponent,
      },
      {
        path:'details/:id' ,
        component:RoomDetailsComponent,
      },
      {
        path:'category',
        component:CategoryComponent,
      },
      {
        path:'new_Listing',
        component:NewListingComponent,
      },
      {
        path:'reservation',
        component:ReservationsComponent,
      },
      {
        path:'user',
        component:UserComponent,
      },
      {
        path:'admin',
        component:AdminComponent,
      }




    ],
  },
];
