import React, { useEffect, useMemo, useState } from 'react';
import { GoogleMap, HeatmapLayer, useLoadScript } from '@react-google-maps/api';
import axios from 'axios';

const libraries = ['visualization'];
const mapContainerStyle = { width: '100%', height: '500px' };
const center = { lat: 37.0902, lng: -95.7129 }; // USA center
const SAVINGS_PER_SQFT = 0.05; // kWh saved per square foot (example)

const EnergyHeatmap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // store API key in env
    libraries,
  });

  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    const fetchAndPrepareData = async () => {
      const res = await axios.get('http://localhost:5000/api/quotes');

      const dataWithCoords = await Promise.all(
        res.data.map(async (q) => {
          const location = `${q.city}, ${q.state}`;
          const geocoded = await geocodeLocation(location);
          if (!geocoded) return null;

          return {
            location: new window.google.maps.LatLng(geocoded.lat, geocoded.lng),
            weight: q.roofSize * SAVINGS_PER_SQFT
          };
        })
      );

      setHeatmapData(dataWithCoords.filter(Boolean)); // remove failed geocodes
    };

    fetchAndPrepareData();
  }, []);

  const geocodeLocation = async (location) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          location
        )}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await res.json();
      if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      }
    } catch (err) {
      console.error('Geocoding failed for', location, err);
    }
    return null;
  };

  if (!isLoaded) return <p className="text-center">Loading map...</p>;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">🔆 Estimated Energy Savings Heatmap</h2>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={4}
        center={center}
      >
        <HeatmapLayer data={heatmapData} options={{ radius: 30 }} />
      </GoogleMap>
    </div>
  );
};

export default EnergyHeatmap;
