import { useEffect } from 'react';
import TitleHeader from '../components/global/TitleHeader';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPlacesByCollectionId } from '../api/solmarkApi';
import { useSolmarkStore } from '../store/solmarkStore';
import PreviewContentSummary from '../components/Place/PreviewContentSummary';
import { useShallow } from 'zustand/shallow';
import { SolroutePreviewSummary } from '../types';

const SolmarkPlacePreviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { collectionId } = useParams();

  const { list, places, setPlaces } = useSolmarkStore(
    useShallow((state) => ({
      list: state.list,
      places: state.places,
      setPlaces: state.setPlaces,
    }))
  );
  const isSolroute = location.pathname.includes('solroute');

  const handleClick = () => {
    navigate(-1);
  };

  const { data } = useQuery({
    queryKey: ['collectionPlaces', collectionId],
    queryFn: () => fetchPlacesByCollectionId(Number(collectionId)),
  });

  useEffect(() => {
    if (data) {
      setPlaces(data);
    }
  }, [data, setPlaces]);

  return (
    <div>
      <TitleHeader
        title={list.collectionName || '저장 리스트'}
        center
        onClick={handleClick}
      />
      <div className='pt-58'>
        <p className='text-primary-950 text-sm py-24 px-16 pb-8'>
          장소 {places.length}개
        </p>
        <div>
          {data && data.map((place: SolroutePreviewSummary)=>{
            return(
              <PreviewContentSummary place={place} isMarked={true} key={place.id} isSolroute={isSolroute}/>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default SolmarkPlacePreviewPage;
