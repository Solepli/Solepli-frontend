import React from 'react'
import SollectGNB from '../components/Sollect/SollectGNB'
import PopularSollectList from '../components/Sollect/PopularSollectList';

const SollectPage = () => {
  return (
    <div>
      {/* GNB */}
      <SollectGNB />

      {/* popular Sollect */}
      <h1 className='text-primary-950 text-xl font-bold pt-12 px-20 pb-8'>인기 많은 솔렉트</h1>
      <div className='flex justify-center'>
        <PopularSollectList />
      </div>


      {/* Sollect Chip List */}

      {/* Sollect Group */}
    </div>
  );
}

export default SollectPage