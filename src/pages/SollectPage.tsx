import { useEffect } from 'react';
import SollectGNB from '../components/Sollect/SollectGNB';
import SollectChipList from '../components/Sollect/SollectChip/SollectChipList';
import SollectGroupList from '../components/Sollect/SollectGroup/SollectGroupList';
import { useSearchStore } from '../store/searchStore';
import PopularSollectSlider from '../components/Sollect/PopularSollectSlider';
import { useSollectStore } from '../store/sollectStore';
import AddSollectButton from '../components/Sollect/AddSollectButton';

const SollectPage = () => {
  const { setInputValue } = useSearchStore();
  const { clearCategory } = useSollectStore();

  useEffect(() => {
    setInputValue('');
    clearCategory();
  }, [clearCategory, setInputValue]);

  return (
    <div className='touch-pan-y'>
      {/* GNB */}
      <div className='fixed w-full z-10'>
        <SollectGNB />
      </div>

      {/* popular Sollect */}
      <h1 className='text-primary-950 text-xl font-bold pt-64 px-20 pb-8'>
        인기 많은 쏠렉트
      </h1>
      <div className='flex justify-center'>
        {/* <PopularSollectList /> */}
        <PopularSollectSlider />
      </div>

      {/* Sollect Chip List */}
      <SollectChipList />

      {/* Sollect Group List*/}
      <SollectGroupList />

      {/* AddSollectButton */}
      <div className='fixed z-10 bottom-73 right-12'>
        <AddSollectButton />
      </div>
    </div>
  );
};

export default SollectPage;
