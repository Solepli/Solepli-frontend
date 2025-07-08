import { useState } from 'react';
import check from '../../../assets/check.svg';
import addBlack from '../../../assets/addBlack.svg';
import { useMutation } from '@tanstack/react-query';
import { postSolroute } from '../../../api/solrouteApi';
import { SolroutePayload } from '../../../types';
import { queryClient } from '../../../main';
import { useSollectDetailStore } from '../../../store/sollectDetailStore';

const AddCourseButton = () => {
  const [isAdded, setIsAdded] = useState(false);
  const { title, placeSummaries } = useSollectDetailStore();
  const mutation = useMutation({
    mutationFn: (payload: SolroutePayload) => postSolroute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['solroutes'] });
    },
  });
  const clickButton = async () => {
    //추가하면 일단 제거 못하게 막음
    if (!isAdded) setIsAdded(!isAdded);
    console.log(placeSummaries);
    const payload: SolroutePayload = {
      iconId: 1,
      name: title ?? '제목 없는 쏠렉트',
      placeInfos: placeSummaries.map((place, i) => ({
        id: place.id,
        seq: i,
        memo: '',
      })),
    };
    console.log(payload);
    // add to course
    await mutation.mutateAsync(payload);
    queryClient.invalidateQueries({ queryKey: ['solroutes'] });
  };
  const style =
    'rounded-full border-1 border-primary-700 py-4 pr-16 pl-8 flex text-sm font-bold items-center';
  return (
    <div onClick={clickButton}>
      {isAdded ? (
        <button className={'bg-primary-700  text-white ' + style}>
          <img src={check} alt='check' className='w-24 h-24' /> 코스로 저장
        </button>
      ) : (
        <button className={'bg-white  text-primary-700 ' + style}>
          <img src={addBlack} alt='add' className='w-24 h-24' /> 코스로 저장
        </button>
      )}
    </div>
  );
};

export default AddCourseButton;
