import { useEffect } from "react";
import { useRef } from "react";
import leaflet from "leaflet"
import L, {Map as LeafletMap} from "leaflet"

export default function Map() {
    const mapRef = useRef(null);
    const mapInstance = useRef<LeafletMap | null>(null);

    useEffect(()=> {
        mapInstance.current = leaflet.map("map").setView([51.505, -0.09], 13)

    }, [])

    return <div id = "newMap" ref ={mapRef}></div>;
}