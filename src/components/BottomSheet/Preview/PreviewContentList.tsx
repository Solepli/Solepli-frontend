import React from 'react';
import PreviewContent from './PreviewContent';
import { usePlaceStore } from '../../../store/placeStore';

const PreviewContentList: React.FC = () => {
const filteredPlaces = usePlaceStore((state)=>state.filteredPlaces);;

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
