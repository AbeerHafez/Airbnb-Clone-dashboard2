import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:widget-add-line-duotone',
    route: '/dashboard',
  },
  {
    navCap: 'Ui Components',
    divider: true
  },
  {
    displayName: 'listing',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: '/components/listing',
  },
  {
    displayName: 'New Listing',
    iconName: 'solar:sticker-smile-circle-2-line-duotone',
    route: '/components/new_Listing',
  },
  {
    displayName:'categories',
    iconName:'solar:danger-circle-line-duotone',
    route:'/components/category'
  },{
    displayName:'reservations.reservations',
    iconName:'solar:danger-circle-line-duotone',
    route:'/components/reservation'
  },
  {
    displayName:'User.user',
    iconName: 'solar:sticker-smile-circle-2-line-duotone',
    route:'/components/user'
  },
  {
    displayName:'User.admins',
    iconName: 'solar:sticker-smile-circle-2-line-duotone',
    route:'/components/admin'
  },
  {
    displayName: 'reviews',
    iconName: 'solar:file-text-line-duotone',
    route: '/components/reviews',
  },
  {
    displayName: 'amenity',
    iconName: 'solar:sticker-smile-circle-2-line-duotone',
    route: '/components/amenity',
  },
  // {
  //   navCap: 'Auth',
  //   divider: true
  // },
  // {
  //   displayName: 'Login',
  //   iconName: 'solar:login-3-line-duotone',
  //   route: '/authentication/login',
  // },
];
