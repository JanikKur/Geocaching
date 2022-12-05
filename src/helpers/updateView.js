import { useMap } from 'react-leaflet';
/**
 * Updates the View of a Leaflet Map
 * @param {Number[]} location
 * @param {Number} zoom
 * @returns {null}
 */
export default function UpdateView({ center, zoom }) {
    const map = useMap();
    map.flyTo(center, zoom*1.75);
    return null;
}