import React, { useEffect } from 'react'
import SollectGNB from '../components/Sollect/SollectGNB'
import PopularSollectList from '../components/Sollect/PopularSollectList';
import SollectChipList from '../components/Sollect/SollectChip/SollectChipList';
import SollectGroupList from '../components/Sollect/SollectGroup/SollectGroupList';
import { useSearchStore } from '../store/searchStore';

const SollectPage = () => {
  const {setInputValue} = useSearchStore();
  useEffect(()=>{
    setInputValue("");
  },[]);
  return (
    <div>
      {/* GNB */}
      <div className='fixed w-full'>
        <SollectGNB />

      </div>

      {/* popular Sollect */}
      <h1 className='text-primary-950 text-xl font-bold pt-64 px-20 pb-8'>인기 많은 솔렉트</h1>
      <div className='flex justify-center'>
        <PopularSollectList />
      </div>


      {/* Sollect Chip List */}
      <SollectChipList />

      {/* Sollect Group List*/}
      <SollectGroupList />
    </div>
  );
}

export default SollectPage