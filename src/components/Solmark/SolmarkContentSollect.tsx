import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchSolmarkSollect } from '../../api/solmarkApi';
import SollectList from '../Sollect/SollectList';
import SolmarkNoResult from './SolmarkNoResult';
import { useSollectStore } from '../../store/sollectStore';

const SolmarkContentSollect = () => {
  const { data } = useQuery({
    queryKey: ['solmarkSollects'],
    queryFn: () => fetchSolmarkSollect(),
  });

  const { sollects, setSollects } = useSollectStore();

  useEffect(() => {
    if (data) {
      setSollects(data);
    }
  }, [data, setSollects]);

  return (
    <div className='py-16'>
      {sollects.length !== 0 ? (
        <SollectList />
      ) : (
        <SolmarkNoResult type='sollect' />
      )}
    </div>
  );
};

export default SolmarkContentSollect;
