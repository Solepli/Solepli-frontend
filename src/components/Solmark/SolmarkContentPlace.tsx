import React, { useEffect, useState } from 'react'
import SolmarkPlaceList from './SolmarkPlaceListCard'
import { useQuery } from '@tanstack/react-query'
import { fetchPlaceCollections } from '../../api/solmarkApi'

const SolmarkContentPlace = () => {
    const {data} = useQuery({
    queryKey:['solmarkPlaceList'],
    queryFn:()=>fetchPlaceCollections(),
  })
  const [listData, setListData] = useState([]);

  useEffect(()=>{
    if(data){
      setListData(data);
    }
  },[data]);
  
  return (
    <div className='py-24 px-16 flex flex-col gap-12'>
        {listData && listData.map((list)=>{
          return <SolmarkPlaceList list={list} />;
        })}
    </div>
  )
}

export default SolmarkContentPlace