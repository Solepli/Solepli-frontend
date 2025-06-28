import React from 'react';
import AddButton from '../../assets/addGray.svg?react';
import { useShallow } from 'zustand/shallow';
import { useSolrouteWriteStore } from '../../store/solrouteWriteStore';
const SolrouteTitle: React.FC = () => {
  const { setTitle } = useSolrouteWriteStore(
    useShallow((state) => ({
      setTitle: state.setTitle,
    })),
  );
  return (
    <div className='w-full h-50 pt-8 pb-16 px-16 flex items-center gap-10'>
      <div className='w-28 h-28 p-2 bg-primary-50 rounded justify-center items-center'>
        <AddButton />
      </div>
      <input
        type='text'
        onChange={(e) => setTitle(e.target.value)}
        placeholder='코스명을 입력해주세요'
        className='placeholder:text-primary-500 placeholder:text-sm placeholder:font-normal placeholder:leading-tight
        text-primary-950 text-sm font-bold leading-tight outline-none ring-0 focus:outline-none focus:ring-0 bg-transparent border-none'
      />
    </div>
  );
};

export default SolrouteTitle;
