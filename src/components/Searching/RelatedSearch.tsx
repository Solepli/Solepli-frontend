import React from 'react';
import { RelatedSearchWord } from '../../types';
import { iconNonlabelSearch } from '../../utils/icon';
import { useNavigate } from 'react-router-dom';
import { useSearchStore } from '../../store/searchStore';
import { postRecentSearchWord } from '../../api/searchApi';
import { usePlaceStore } from '../../store/placeStore';
import { useShallow } from 'zustand/shallow';

const ResultIcon: React.FC<{
  isMarked: boolean | null;
  category: string;
}> = ({ isMarked, category }) => {
  const style = {
    backgroundColor: `var(--color-chip-light-bg-${category})`,
    color: `var(--color-chip-${category})`,
  };
  const Icon =
    isMarked === null
      ? iconNonlabelSearch['city'] // null === 지역명
      : isMarked
        ? iconNonlabelSearch['mark'] // true === 장소 추가 O
        : iconNonlabelSearch[category]; // true === 장소 추가 X
  return (
    <div
      className='inline-flex p-4 items-center gap-6 rounded-sm'
      style={style}>
      <Icon />
    </div>
  );
};

interface RelatedSearchProps {
  relatedSearchWord: RelatedSearchWord;
}

const RelatedSearch: React.FC<RelatedSearchProps> = ({ relatedSearchWord }) => {
  const navigate = useNavigate();

  const { setSelectedRegion, setInputValue } = useSearchStore(
    useShallow((state) => ({
      setSelectedRegion: state.setSelectedRegion,
      setInputValue: state.setInputValue,
    }))
  );

  const { setCategory } = usePlaceStore();

  const mode = window.location.pathname.includes('/sollect/search')
    ? 'sollect'
    : 'solmap';

  const clickResult = async () => {
    if (relatedSearchWord.type === 'PLACE') {
      // 클릭한 장소 디테일뷰로 이동
      navigate(`/map/detail/${relatedSearchWord.id}?detailType=searching`);
    } else if (relatedSearchWord.type === 'DISTRICT') {
      // 클릭한 지역명 저장
      setSelectedRegion(relatedSearchWord.name);
      navigate('/map/list?queryType=region');
    }

    setInputValue(relatedSearchWord.name);
    postRecentSearchWord(relatedSearchWord.name, mode);
    setCategory(null);
  };

  return (
    <div
      className='flex p-[16px_16px_4px_16px] items-center gap-10 self-stretch'
      onClick={clickResult}>
      <ResultIcon
        isMarked={relatedSearchWord.isMarked}
        category={relatedSearchWord.category!}
      />

      <div className='flex flex-col items-start grow'>
        {/* 이름 */}
        <div className='flex flex-col items-start grow'>
          <div className='text-sm font-semibold leading-[150%] tracking-[-0.35px] text-start text-primary-950'>
            {relatedSearchWord.name}
          </div>
        </div>
        {relatedSearchWord.type === 'PLACE' && (
          <div className='flex gap-8 justify-between items-center self-stretch'>
            {/* 주소 */}
            <div className='text-xs font-normal leading-[120%] tracking-[-0.18px] text-start text-primary-400'>
              {relatedSearchWord.address}
            </div>
            {/* 거리 */}
            <div className='flex items-center'>
              <div className='text-xs leading[120%] tracking-[-0.18px] text-end text-primary-400'>
                {relatedSearchWord.distance.value +
                  relatedSearchWord.distance.unit}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedSearch;
