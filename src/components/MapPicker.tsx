import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icons not showing in Vite
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

function LocationPicker({ lat, lng, setPosition }: { lat: number, lng: number, setPosition: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng.lat, e.latlng.lng);
    },
  });
  return <Marker position={[lat, lng]} />;
}

export default function MapPicker({ lat, lng, setPosition }: { lat: number, lng: number, setPosition: (lat: number, lng: number) => void }) {
  return (
    <MapContainer center={[lat, lng]} zoom={13} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <LocationPicker lat={lat} lng={lng} setPosition={setPosition} />
    </MapContainer>
  );
}
