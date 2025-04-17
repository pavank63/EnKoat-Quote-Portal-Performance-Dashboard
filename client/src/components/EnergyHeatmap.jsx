import React, { useEffect, useState } from 'react';
import { useJsApiLoader, GoogleMap, HeatmapLayer } from '@react-google-maps/api';
import axios from 'axios';

const libraries = ['visualization'];
const mapContainerStyle = { width: '100%', height: '400px' };
const center = { lat: 39.8283, lng: -98.5795 }; // geographic center of USA
const SAVINGS_PER_SQFT = 0.05; // example constant

export default function EnergyHeatmap() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.GOOGLE_MAPS_API_KEY,
    libraries
  });
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    if (!isLoaded) return;

    const geocoder = new window.google.maps.Geocoder();
    axios.get('http://localhost:5000/api/quotes').then(res => {
      const promises = res.data.map(q => {
        return new Promise(resolve => {
          geocoder.geocode({ address: `${q.city}, ${q.state}` }, (results, status) => {
            if (status === 'OK' && results[0]) {
              const { lat, lng } = results[0].geometry.location;
              resolve({
                location: new window.google.maps.LatLng(lat(), lng()),
                weight: q.roofSize * SAVINGS_PER_SQFT
              });
            } else {
              resolve(null);
            }
          });
        });
      });

      Promise.all(promises).then(points =>
        setHeatmapData(points.filter(p => p))
      );
    });
  }, [isLoaded]);

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={4}
    >
      <HeatmapLayer data={heatmapData} options={{ radius: 30 }} />
    </GoogleMap>
  );
}
