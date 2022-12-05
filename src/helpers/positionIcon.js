import L from 'leaflet';
import positionIcon from './positionIcon.png';
const iconPerson = new L.Icon({
    iconUrl: positionIcon,
    iconRetinaUrl: positionIcon,
    iconAnchor: [20,40],
    popupAnchor: [0, -40],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(41),
    className: 'leaflet-div-icon positionIcon',
});

export { iconPerson };