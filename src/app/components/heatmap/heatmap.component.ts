// import { Component, OnInit } from '@angular/core';
// import { ListingService } from 'src/app/services/listing.service';
// import { Listing } from 'src/app/models/listing';
// import * as l from 'leaflet'
// import 'leaflet.heat';
// @Component({
//   selector: 'app-heatmap',
//   standalone:true,
//   templateUrl: './heatmap.component.html',
//   styleUrls: ['./heatmap.component.css']
// })
// export class HeatmapComponent implements OnInit {

//   map:l.Map |undefined
//   listings:Listing[]=[]

//   constructor(private ListingService:ListingService) { }

//   ngOnInit() {
//     this.ListingService.getAllListings().subscribe((listings)=>
//     {
//       this.listings=listings
//       this.createMap()
//     })
//   }

//   private createMap():void{
//     this.map = l.map('map').setView([30.0330 , 31.2330],13)

//     l.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
//       attribution:'© openstreetmap'
//   }).addTo(this.map)

//   const heatmapdata = this.listings.map(lising=>{
//     return [lising.location.latitude , lising.location.longitude ,lising.price ]
//   })

//    const heatLayer:l.HeatLayer  = l.heatLayer(heatmapdata, {
//     radius: 25,
//     blur: 15,
//     maxZoom: 17
//   })

//   heatLayer.addTo(this.map);

//   }

// }


import { Component, OnInit } from '@angular/core';
import { ListingService } from 'src/app/services/listing.service';
import { Listing } from 'src/app/models/listing';
import { MaterialModule } from '../../material.module';
import { TranslateModule } from '@ngx-translate/core';

import * as L from 'leaflet';
import 'leaflet.heat'; // Important: Make sure leaflet.heat is imported
import 'leaflet.markercluster'
// declare module 'leaflet'{
//   interface HeatLayerOptions{
//     radius?:number;
//     blur?:number;
//     maxZoom?:number;
//   }

//   function heatLayer(
//     latlngs:[number,number,number][],
//     options?:HeatLayerOptions
//   ):L.Layer
// }
@Component({
  selector: 'app-heatmap',
  standalone: true,
  imports:[MaterialModule,TranslateModule],
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {

  map!: L.Map ;
  listings: Listing[] = [];

  constructor(private listingService: ListingService) { }

  ngOnInit() {
    this.listingService.getAllListings().subscribe((listings) => {
      this.listings = listings;
      this.createMap();
    });
  }

  private createMap(): void {
    this.map = L.map('map').setView([26.9135119, 31.4641516], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© openstreetmap'
    }).addTo(this.map);

    console.log("listing",this.listings);


    // const heatmapData: Array<[number, number, number]> = this.listings
    // .map(listing =>{
    //   const {latitude,longitude} = listing.location
    //   const{ price} = listing
    //   console.log("data",latitude,longitude,price);

    //   return[latitude, longitude,price]})
    // .filter((data): data is [number, number, number] => data.every(value => value !== undefined));

    // console.log("Heatmap Data:", heatmapData);
    // // Explicitly using L.HeatLayer here
    // const heatLayer: L.Layer = L.heatLayer(heatmapData, {
    //   radius: 20,
    //   blur: 15,
    //   maxZoom: 17,
    //   gradient: {  // تدرج الألوان حسب الكثافة
    //     0.1: 'blue',
    //     0.4: 'lime',
    //     0.6: 'yellow',
    //     0.8: 'orange',
    //     1.0: 'red'  // يعبر عن أعلى كثافة
    //   }
    // });

    // heatLayer.addTo(this.map);

    const markers = L.markerClusterGroup()

    this.listings.forEach(listing=>{
      const {location,price} = listing
if(location&&price&&location.latitude&&location.longitude){
  const marker = L.marker([location.latitude,location.longitude]).addTo(this.map)

  const customIcon = L.divIcon({
    className: 'custom-icon',
    html: `<div style="font-size: 20px; font-weight: bold; color: red;"><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000"><path d="M220-180h150v-250h220v250h150v-390L480-765 220-570v390Zm-60 60v-480l320-240 320 240v480H530v-250H430v250H160Zm320-353Z"/></svg></div>`,
    iconSize: [70, 70],
    iconAnchor: [35, 35],
  });

  marker.setIcon(customIcon)
  marker.bindPopup(`price:${price}$`)
  markers.addLayer(marker)
}
    })

    markers.on('clusterclick', function(event) {
      const cluster = event.layer;
      const count = cluster.getAllChildMarkers().length; // عدد المساكن في هذه المجموعة
      const customIcon = L.divIcon({

        html: `<div style="font-size: 20px; font-weight: bold; color: black; margin: 0; padding: 0; border:none;">${count}</div>`, // إظهار الرقم فقط
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      cluster.setIcon(customIcon);
    });

    this.map.addLayer(markers)
  }
}



// const icon = L.icon({
//   iconUrl: 'path_to_your_icon.png', // ضع هنا مسار الأيقونة التي تريد استخدامها
//   iconSize: [32, 32], // الحجم
//   iconAnchor: [16, 32], // نقطة الارتكاز
//   popupAnchor: [0, -32] // مكان النافذة المنبثقة بالنسبة للأيقونة
// });

// const marker = L.marker([location.latitude, location.longitude], { icon }).addTo(this.map);
// marker.bindPopup(`Price: ${price}$`);
