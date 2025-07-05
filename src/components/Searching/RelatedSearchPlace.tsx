import React from 'react';
import food from '../../assets/category-icons/foodFill.svg';
import cafe from '../../assets/category-icons/cafeFill.svg';
import drink from '../../assets/category-icons/drinkFill.svg';
import entertainment from '../../assets/category-icons/entertainmentFill.svg';
import culture from '../../assets/category-icons/cultureFill.svg';
import shop from '../../assets/category-icons/shopFill.svg';
import walk from '../../assets/category-icons/walkFill.svg';
import work from '../../assets/category-icons/workFill.svg';
import location from '../../assets/locationFill.svg';
import AddSmall from '../../assets/addSmallIcon.svg?react';
import Check from '../../assets/check.svg?react';
import type { PlaceInfo, SelectablePlace, } from '../../types';

const iconMap: Record<string, string> = {
  food,
  cafe,
  drink,
  entertainment,
  culture,
  shop,
  walk,
  work,
  location,
};

interface RelatedSearchPlaceProps{
  selectablePlace: SelectablePlace;
  addPlace: (place: PlaceInfo) => void;
  removePlace: (id: number) => void;
}

const RelatedSearchPlace: React.FC<RelatedSearchPlaceProps> = ({
  selectablePlace, addPlace, removePlace
}) => {

  const icon = iconMap[selectablePlace.category!]

  function handleAdd() {
    addPlace(selectablePlace);
  }

  function handleRemove() {
    removePlace(selectablePlace.id);
  }

  return (
    <div className='flex p-[16px_16px_4px_16px] items-center gap-10 self-stretch'>
      {/* 아이콘 */}
      <div className='flex p-4 items-start rounded-[4px] bg-gray-400/10'>
        <img
          className='w-24 h-24'
          src={icon}
          alt={selectablePlace.category}
        />
      </div>

      {/* 이름 */}
      <div className='flex flex-col items-start gap-4 flex-[1_0_0]'>
        <div className='flex flex-col items-start gap-4 flex-[1_0_0]'>
          <div className='text-[14px] leading-[100%] font-[500] tracking-[-0.35px] text-center text-primary-950'>
            {selectablePlace.name}
          </div>
        </div>
        {/* 위치 */}
        <div className='flex justify-between items-center self-stretch'>
          <div className='text-[12px] leading-[120%] tracking-[-0.18px] text-center text-primary-400'>
            {selectablePlace.address}
          </div>
          <div className='flex items-center'></div>
        </div>
      </div>
      {/* 추가 버튼 */}
      {selectablePlace.isSelected ? (
        <SelectededButton onClickFunc={handleRemove} />
      ) : (
        <SelectButton onClickFunc={handleAdd} />
      )}
    </div>
  );
};

export default RelatedSearchPlace;

{/* 추가 됐을 때 보여지는 버튼 */}
const SelectButton: React.FC<{ onClickFunc: () => void }> = ({ onClickFunc }) => {
  return (
      <div className='w-55 h-28 pl-2 pr-8 py-2 rounded-xl outline outline-1 outline-offset-[-1px] outline-primary-700 inline-flex justify-start items-center' onClick={() => {onClickFunc()}}>
        <AddSmall />
        <div className="text-center justify-start text-primary-700 text-xs font-semibold font-['Pretendard'] leading-none">
          추가
        </div>
      </div>
  );
};

{/* 추가 되기 전 보여지는 버튼 */}
const SelectededButton: React.FC<{ onClickFunc: () => void }> = ({ onClickFunc }) => {
  return (
      <div className='w-55 h-28 pl-2 pr-8 py-2 rounded-xl bg-primary-700 inline-flex justify-start items-center' onClick={() => {onClickFunc()}}>
        <Check />
        <div className="text-center justify-start text-primary-50 text-xs font-semibold font-['Pretendard'] leading-none">
          추가
        </div>
      </div>
  );
}