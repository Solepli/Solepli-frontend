import React, { useEffect } from 'react';
import PreviewContent from './PreviewContent';
import { usePlaceStore } from '../../../store/placeStore';
import { useMapStore } from '../../../store/mapStore';
import { useShallow } from 'zustand/shallow';
import { useSearchParams } from 'react-router-dom';
import { useSearchStore } from '../../../store/searchStore';
import { useQuery } from '@tanstack/react-query';
import {
  getPlaceByIdList,
  getPlacesByDisplay,
  getPlacesByRegion,
} from '../../../api/placeApi';

const PreviewContentList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const queryType = searchParams.get('queryType');

  const { filteredPlaces, selectedCategory } = usePlaceStore(
    useShallow((state) => ({
      filteredPlaces: state.filteredPlaces,
      selectedCategory: state.selectedCategory,
    }))
  );

  const { userLatLng, lastBounds } = useMapStore(
    useShallow((state) => ({
      userLatLng: state.userLatLng,
      lastBounds: state.lastBounds,
    }))
  );

  const { selectedRegion, relatedPlaceIdList } = useSearchStore(
    useShallow((state) => ({
      selectedRegion: state.selectedRegion,
      relatedPlaceIdList: state.relatedPlaceIdList,
    }))
  );

  const placesRegionQuery = useQuery({
    queryKey: ['placesRegion'],
    queryFn: () =>
      getPlacesByRegion(selectedRegion, userLatLng!.lat, userLatLng!.lng),
    enabled: queryType === 'region',
  });

  const placesIdListQuery = useQuery({
    queryKey: ['placesIdList'],
    queryFn: () => getPlaceByIdList(relatedPlaceIdList),
    enabled: queryType === 'idList',
  });

  const placesDisplayQuery = useQuery({
    queryKey: ['placesDisplay', lastBounds, userLatLng, selectedCategory],
    queryFn: () =>
      getPlacesByDisplay(
        lastBounds!.getMin().y,
        lastBounds!.getMin().x,
        lastBounds!.getMax().y,
        lastBounds!.getMax().x,
        userLatLng!.lat,
        userLatLng!.lng,
        selectedCategory ?? undefined
      ),
    enabled: queryType === 'category',
  });

  // complete api: 지역 이름으로 프리뷰 리스트 호출 api
  useEffect(() => {
    console.log('places[Region]Query:', placesRegionQuery.data);
  }, [placesRegionQuery]);

  // complete api: 검색창에서 enter시 연관검색어에서 추출한 장소 id 리스트로 프리뷰 리스트 호출 api
  useEffect(() => {
    console.log('places[IdList]Query:', placesIdListQuery.data);
  }, [placesIdListQuery]);

  // complete api: 카테고리 선택시 현재 화면 기준으로 프리뷰 리스트 호출 api
  useEffect(() => {
    console.log('places[Display]Query:', placesDisplayQuery.data);
  }, [placesDisplayQuery]);

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
