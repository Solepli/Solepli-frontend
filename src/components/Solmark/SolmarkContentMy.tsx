import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchMySolmarkSollect } from '../../api/solmarkApi';
import SollectList from '../Sollect/SollectList';
import SolmarkNoResult from './SolmarkNoResult';
import { useSollectStore } from '../../store/sollectStore';

const SolmarkContentMy = () => {
  const { data } = useQuery({
    queryKey: ['solmarkSollects'],
    queryFn: () => fetchMySolmarkSollect(),
  });

  const { sollects, setSollects } = useSollectStore();

  useEffect(() => {
    if (data) {
      setSollects(data);
    }
  }, [data, setSollects]);

  return (
    <div className='py-16'>
      {sollects.length != 0 ? (
        <SollectList isMine />
      ) : (
        <SolmarkNoResult type='my' />
      )}
    </div>
  );
};

export default SolmarkContentMy;
