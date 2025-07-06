import SollectGroup from './SollectGroup';
import { fetchRecommendSollect } from '../../../api/sollectApi';
import { useQuery } from '@tanstack/react-query';

const SollectGroupList = () => {
  const recPlaces1 = useQuery({
    queryKey:['rec1'],
    queryFn:()=>fetchRecommendSollect("조용한","work"),
  })
  const recPlaces2 = useQuery({
    queryKey:['rec2'],
    queryFn:()=>fetchRecommendSollect("","food"),
  })
  const recPlaces3= useQuery({
    queryKey:['rec3'],
    queryFn:()=>fetchRecommendSollect("","walk"),
  })

  return (
    <div className='mt-32'>
      <SollectGroup
        sollects={recPlaces1.data}
        title='조용히 집중하고 싶은 당신을 위해'
      />
      <SollectGroup
        sollects={recPlaces2.data}
        title='편하게 들러서 혼밥하기 딱 좋은 곳'
      />
      <SollectGroup
        sollects={recPlaces3.data}
        title='혼자 걷기 좋은 힐링 코스'
      />
    </div>
  );
};

export default SollectGroupList;
