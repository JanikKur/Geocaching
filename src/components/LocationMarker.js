import {useEffect, useState} from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { iconPerson } from '../helpers/positionIcon';
import '../css/LocationMarker.css';


/**
 * If enabled returns a Marker of the Users current GPS Position
 * @returns {Marker} Marker
 */
export default function LocationMarker({setPosition}) {
    const [homePosition, setHomePosition] = useState(null);
    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        setHomePosition([e.latlng.lat, e.latlng.lng]);
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
      });
    }, [map,setPosition]);

    return homePosition === null ? null : (
      <Marker position={homePosition} icon={iconPerson}>
        <Popup>
          Your Position.
        </Popup>
      </Marker>
    );
  }