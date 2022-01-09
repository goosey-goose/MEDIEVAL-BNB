import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  // width: '700px',
  // height: '700px',
  width: '100%',
  height: '82rem',
};

const center = {
  lat: 54.36773066801807,
  lng: -2.2193425918966483,
};

const allCastleCoordinates = [
  [57.48446481263117, -5.40315671963956],
  [55.3334412856341, -3.5354802375348724],
  [56.71278087130002, -5.383831943644952],
  [55.84448921385617, -1.7018837513144025],
  [55.62627992399523, -1.715725661811888],
  [53.0614756969584, -4.207269545589252],
  [52.944860568040184, -3.155284347780522],
  [52.60153033307975, -2.698501301363574],
  [52.55105959475292, -1.5357808195749814],
  [52.2215820530271, -1.3973617146001478],
  [51.92380048629138, -4.940890801955864],
  [51.98351572935602, -0.6637404582335353],
  [51.70988211028928, -0.5253213532587047],
  [51.389957744199506, 0.5014518121866981],
  [51.40005345002988, -0.01317066485182366],
  [51.00241451331841, 0.543484625674327],
  [51.00979553192081, -0.5114794427612194],
  [50.80905214546581, -2.006405776489412],
  [50.660119833598, -4.747104054991098],
  [50.36083329191669, -5.120835638423146]
];

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
          zoom={7}
        >
          {allCastleCoordinates.map((castle) => {
            return (
              <Marker
                position={{lat: castle[0], lng: castle[1]}}>

              </Marker>
            );
          })}
        </GoogleMap>
      )}
    </>
  );
};

export default React.memo(Maps);
