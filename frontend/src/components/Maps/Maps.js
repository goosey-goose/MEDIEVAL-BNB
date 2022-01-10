import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  // width: '700px',
  // height: '700px',
  width: '100%',
  height: '82rem',
};

// const center = {
//   lat: 54.36773066801807,
//   lng: -2.2193425918966483,
// };

const allCastleCoordinates = [
  [57.27558511009566, -5.514336289406147, "Eilean Donan Castle"], // Eilean Donan Castle
  [54.97562349263635, -3.523871326546733, "Caerlaverock Castle"], // Caerlaverock Castle
  [56.57157929538872, -5.386098064937756, "Castle Stalker"], // Castle Stalker
  [55.60901602571192, -1.7100777806141991, "Bamburgh Castle"], // Bamburgh Castle
  [55.41558644118809, -1.7059967728095131, "Alnwick Castle"], // Alnwick Castle
  [52.91598718775115, -4.232461572880605, "Castell Criccieth"], // Castell Criccieth
  [52.65017068446961, -3.1608175750373833, "National Trust - Powis Castle and Garden"], // National Trust - Powis Castle and Garden
  [52.36712551505242, -2.723062906387981, "Ludlow Castle"], // Ludlow Castle
  [52.34820829106588, -1.5922047477486319, "Kenilworth Castle and Elizabethan Garden"], // Kenilworth Castle and Elizabethan Garden
  [52.04093473458676, -1.3919554015798132, "Broughton Castle"], // Broughton Castle
  [51.676906883527785, -4.920642006111735, "Pembroke Castle"], // Pembroke Castle
  [51.76392051479024, -0.5592580852473291, "Berkhamsted Castle"], // Berkhamsted Castle
  [51.483899248732534, -0.6044672800624181, "Windsor Castle"], // Windsor Castle
  [51.38978935131128, 0.501397185939447, "Rochester Castle"], // Rochester Castle
  [51.18688581485589, 0.1138182943296132, "Hever Castle & Gardens"], // Hever Castle & Gardens
  [51.00226419129706, 0.5434766701917676, "Bodiam Castle"], // Bodiam Castle
  [50.85629459841467, -0.5539587920864971, "Arundel Castle"], // Arundel Castle
  [50.6401334784455, -2.058900595066213, "National Trust - Corfe Castle"], // National Trust - Corfe Castle
  [50.42158894767256, -4.671358184063197, "Restormel Castle"], // Restormel Castle
  [50.1461230180009, -5.04682627808686, "Pendennis Castle"] // Pendennis Castle
];


const Maps = ({ apiKey, newZoom, setNewZoom, newCenter, setNewCenter }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

const options = {
  // disableDefaultUI: true,
  // zoom: 7,
  gestureHandling: "greedy"
}

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={newCenter}
          zoom={newZoom}
          options={options || 7}
          onZoomChanged={() => {
            // setNewZoom(7);
          }}
        >
          {allCastleCoordinates.map((castle, index) => {
            return (
              <Marker
                key={index}
                position={{lat: castle[0], lng: castle[1]}}
                title={castle[2]}
                onClick={() => {
                  console.log("poi clicked");
                  setNewCenter({lat: castle[0], lng: castle[1]});
                  setNewZoom(14);
                  setNewZoom(18);
                }}
              >
              </Marker>
            );
          })}
        </GoogleMap>
      )}
    </>
  );
};

export default React.memo(Maps);
