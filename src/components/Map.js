import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import UpdateView from '../helpers/updateView';
import '../css/Map.css';


/**
 * Creates a Leaflet Map which can be interacted with
 * @param {Number[]} position 
 * @param {Number[]} showForm 
 * @param {Number[]} setPosition 
 * @param {Number} zoom
 * @returns HTML Element
 */
export default function Map({position, zoom, children}) {
    return (
        <MapContainer center={position} zoom={zoom} scrollWheelZoom={true} zoomDelta={0.25} zoomSnap={0} minZoom={2.5}>
            <UpdateView center={position} zoom={zoom}/>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {children}
        </MapContainer>
    )
}
