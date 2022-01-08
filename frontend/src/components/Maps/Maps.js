import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  // width: '700px',
  // height: '700px',
  width: '100%',
  height: '82rem',
};

const center = {
  lat: 53.58007771089779,
  lng: -1.9821929670470553,
};

const Maps = ({ apiKey }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={8}
        >
          <Marker
            position={{lat: 53.58007771089779, lng: -1.9821929670470553}}>

          </Marker>
        </GoogleMap>
      )}
    </>
  );
};

export default React.memo(Maps);
