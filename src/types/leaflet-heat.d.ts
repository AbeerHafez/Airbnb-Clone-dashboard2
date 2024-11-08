import * as L from 'leaflet';

  declare module 'leaflet'{
    interface HeatLayerOptions{
      radius?:number;
      blur?:number;
      maxZoom?:number;
      gradient?:{}
    }
  
    function heatLayer(
      latlngs:[number,number,number][],
      options?:HeatLayerOptions
    ):L.Layer

    // export function markerClusterGroup() {
    //   throw new Error('Function not implemented.');
    // }
  }

