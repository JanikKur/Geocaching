import { useMapEvents } from 'react-leaflet';
/**
 * Updates the View of a Leaflet Map by clicking on it
 * @param {Boolean} showForm
 * @returns null
 */
export default function GetMapPosition({ setPosition }) {
    let lat = 0;
    let lng = 0;
        useMapEvents({
            click: e => {
                let coord = e.latlng;
                lat = coord.lat;
                lng = coord.lng;
                setPosition([lat, lng]);
        }
    }); 
    return null
}