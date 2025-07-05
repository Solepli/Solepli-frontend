import { useLocation } from 'react-router-dom';
import AddSmall from '../../assets/addSmallIcon.svg?react';
import Check from '../../assets/check.svg?react';
import { PlaceInfo, } from '../../types';
import { useSollectWriteStore } from '../../store/sollectWriteStore';
import { useSolrouteWriteStore } from '../../store/solrouteWriteStore';
import { useShallow } from 'zustand/shallow';

interface SelectableChipProps {
  place: PlaceInfo;
}

const SelectableChip: React.FC<SelectableChipProps> = ({ place }) => {
  const { places, addPlace, removePlace } = useWriteStoreByPath();

  const isSelected = Array.from(places).some((p) => p.id === place.id);
  const searchedPlace = { ...place, isSelected };

  const handleAdd = () => addPlace(place);
  const handleRemove = () => removePlace(place.id);

  return (
    <>
      {searchedPlace.isSelected ? (
        <SelectededButton onClickFunc={handleRemove} />
      ) : (
        <SelectButton onClickFunc={handleAdd} />
      )}
    </>
  );
};

export default SelectableChip;

//Url 주소에 sollect가 있으면 sollect store를, 없다면 solroute store를 이용
function useWriteStoreByPath() {
  const path = useLocation().pathname;
  const sollect = useSollectWriteStore(
    useShallow((state) => ({
      places: state.places,
      addPlace: state.addPlace,
      removePlace: state.removePlace,
    }))
  );

  const solroute = useSolrouteWriteStore(
    useShallow((state) => ({
      places: state.placeInfos,
      addPlace: state.addPlace,
      removePlace: state.deletePlaceInfo,
    }))
  );

  return path.includes('sollect') ? sollect : solroute;
}

{
  /* 추가 됐을 때 보여지는 버튼 */
}
const SelectButton: React.FC<{ onClickFunc: () => void }> = ({
  onClickFunc,
}) => {
  return (
    <div
      className='w-55 h-28 pl-2 pr-8 py-2 rounded-xl outline outline-1 outline-offset-[-1px] outline-primary-700 inline-flex justify-start items-center'
      onClick={() => {
        onClickFunc();
      }}>
      <AddSmall />
      <div className="text-center justify-start text-primary-700 text-xs font-semibold font-['Pretendard'] leading-none">
        추가
      </div>
    </div>
  );
};

{
  /* 추가 되기 전 보여지는 버튼 */
}
const SelectededButton: React.FC<{ onClickFunc: () => void }> = ({
  onClickFunc,
}) => {
  return (
    <div
      className='w-55 h-28 pl-2 pr-8 py-2 rounded-xl bg-primary-700 inline-flex justify-start items-center'
      onClick={() => {
        onClickFunc();
      }}>
      <Check />
      <div className="text-center justify-start text-primary-50 text-xs font-semibold font-['Pretendard'] leading-none">
        추가
      </div>
    </div>
  );
};
