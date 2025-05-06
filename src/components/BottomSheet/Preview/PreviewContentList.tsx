import React from 'react';
import PreviewContent from './PreviewContent';
import { places } from '../../../places';

const PreviewContentList: React.FC = () => {

const filteredPlaces = places;

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
