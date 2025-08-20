import React from 'react';
import CategoryButton from './CategoryButton';
import { categories } from '../../../utils/category';
import { usePlaceStore } from '../../../store/placeStore';
import RecommendedPreviewContentList from '../Preview/RecommendedPreviewContentList';

const CategoryButtonList: React.FC = () => {
  const { recommendedPlaces } = usePlaceStore();

  return (
    <div>
      <div className='px-16 pb-16'>
        <h1 className='pl-4 py-12 text-black text-lg font-bold'>카테고리</h1>
        <div className='flex flex-wrap justify-between gap-y-8'>
          {categories.map((category) => {
            return <CategoryButton category={category} key={category.id} />;
          })}
        </div>
      </div>

      {recommendedPlaces.length > 0 && <RecommendedPreviewContentList />}
    </div>
  );
};

export default CategoryButtonList;
