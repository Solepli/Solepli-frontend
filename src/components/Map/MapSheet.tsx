/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import CurrentLocationButton from '../BottomSheet/CurrentLocationButton';
import { useQuery } from '@tanstack/react-query';
import { fetchPlacesNearby } from '../../api/mapApi';
import { useMapStore } from '../../store/mapStore';
import { useShallow } from 'zustand/shallow';
import { useMarkersStore } from '../../store/markersStore';
import { initCluster } from '../../utils/clusterManager';
import { getCurrentBounds, getUserLatLng, initMap } from '../../utils/mapFunc';
import { addMarkers, deleteMarkers } from '../../utils/markerFunc';
import ReloadMarkerButton from '../BottomSheet/ReloadMarkerButton';

const MapSheet: React.FC = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);
  const boundsRef = useRef<naver.maps.LatLngBounds>(null);

  const { currentLatLng, setCurrentLatLng } = useMapStore(
    useShallow((state) => ({
      currentLatLng: state.currentLatLng,
      setCurrentLatLng: state.setCurrentLatLng,
    }))
  );

  const {
    markersInfo,
    setMarkersInfo,
    markersObject,
    setMarkersObject,
    clearMarkersObject,
  } = useMarkersStore(
    useShallow((state) => ({
      markersInfo: state.markersInfo,
      setMarkersInfo: state.setMarkersInfo,
      markersObject: state.markersObject,
      setMarkersObject: state.setMarkersObject,
      clearMarkersObject: state.clearMarkersObject,
    }))
  );

  const { data, error, isError } = useQuery({
    queryKey: ['placesNearby', currentLatLng],
    queryFn: () =>
      fetchPlacesNearby(
        currentLatLng!.swX,
        currentLatLng!.swY,
        currentLatLng!.neX,
        currentLatLng!.neY
      ),
  });

  if (isError) {
    console.log('fetchPlacesNearby isError :::', error);
  }

  useLayoutEffect(() => {
    if (!mapElement.current) return;

    getUserLatLng().then((userLatLng) => {
      initMap(mapElement, mapInstance, userLatLng);
      getCurrentBounds(mapInstance.current, setCurrentLatLng);
    });
  }, []);

  useEffect(() => {
    if (data) {
      setMarkersInfo(data);
    }
  }, [data, setMarkersInfo]);

  useEffect(() => {
    console.log('mapMarkers :::', markersInfo);
    if (markersInfo.length > 0) {
      deleteMarkers(markersObject, clearMarkersObject);
      addMarkers(mapInstance, markersInfo, setMarkersObject);
    }
  }, [markersInfo]);

  // 임시 버튼: 표시된 마커 기준으로 지도 이동
  // const moveToMarkers = useCallback(() => {
  //   if (!mapInstance.current || !boundsRef.current) return;

  //   mapInstance.current.panToBounds(
  //     boundsRef.current,
  //     {
  //       duration: 1000,
  //       easing: 'easeOutCubic',
  //     },
  //     {
  //       top: 30,
  //       right: 30,
  //       bottom: 200,
  //       left: 30,
  //     }
  //   );
  // }, []);

  const moveToCurrentLocation = useCallback(() => {
    if (!mapInstance.current) {
      console.warn('mapInstance.current가 null입니다!');
      return;
    }

    getUserLatLng().then((userLatLng) => {
      mapInstance.current?.panTo(userLatLng);
    });
  }, []);

  return (
    <div className='relative w-dvw h-dvh'>
      <div ref={mapElement} className='w-full h-full' />

      {/* 임시 버튼: 표시된 마커 기준으로 지도 이동*/}
      {/* <button
        onClick={moveToMarkers}
        className='absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow px-4 py-2 rounded text-sm z-10'>
        표시된 마커로 지도 이동
      </button> */}

      <ReloadMarkerButton
        handleClick={() =>
          getCurrentBounds(mapInstance.current!, setCurrentLatLng)
        }
      />

      <CurrentLocationButton handleClick={moveToCurrentLocation} />
    </div>
  );
};

export default MapSheet;
