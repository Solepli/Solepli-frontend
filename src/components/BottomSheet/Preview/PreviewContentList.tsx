import React, { useEffect } from 'react';
import PreviewContent from './PreviewContent';
import { usePlaceStore } from '../../../store/placeStore';
import { useMapStore } from '../../../store/mapStore';
import { useShallow } from 'zustand/shallow';
import { useSearchParams } from 'react-router-dom';
import { useSearchStore } from '../../../store/searchStore';
import { useQuery } from '@tanstack/react-query';
import { getPlacesRegion } from '../../../api/placeApi';

const PreviewContentList: React.FC = () => {
  const filteredPlaces = usePlaceStore((state) => state.filteredPlaces);

  const [searchParams] = useSearchParams();
  const queryType = searchParams.get('queryType');

  const { userLatLng } = useMapStore(
    useShallow((state) => ({
      userLatLng: state.userLatLng,
    }))
  );

  const { selectedRegion } = useSearchStore();

  const placesRegionQuery = useQuery({
    queryKey: ['placesRegion'],
    queryFn: () =>
      getPlacesRegion(selectedRegion, userLatLng!.lat, userLatLng!.lng),
    enabled: queryType === 'region',
  });

  // complete api: 지역 이름으로 프리뷰 리스트 호출 api
  useEffect(() => {
    console.log('placesRegionQuery:', placesRegionQuery.data);
  }, [placesRegionQuery]);

  return (
    <div>
      <div>
        {filteredPlaces.map((place) => (
          <PreviewContent key={place.title} place={place} />
        ))}
      </div>
    </div>
  );
};

export default PreviewContentList;
