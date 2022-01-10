// frontend/src/components/Maps/index.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getKey } from '../../store/maps';
import Maps from './Maps';

const MapContainer = () => {
  const key = useSelector((state) => state.maps.key);
  const dispatch = useDispatch();

  const [newZoom, setNewZoom] = useState(7);
  const [newCenter, setNewCenter] = useState({lat: 54.36773066801807, lng: -2.2193425918966483});

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);

  if (!key) {
    return null;
  }

  return (
    <Maps apiKey={key} newZoom={newZoom} setNewZoom={setNewZoom} newCenter={newCenter} setNewCenter={setNewCenter} />
  );
};

export default MapContainer;
