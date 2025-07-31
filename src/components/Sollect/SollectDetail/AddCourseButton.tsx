import addBlack from '../../../assets/addBlack.svg';
import { useMutation } from '@tanstack/react-query';
import { postSolroute } from '../../../api/solrouteApi';
import { SolroutePayload } from '../../../types';
import { queryClient } from '../../../main';
import { useSollectDetailStore } from '../../../store/sollectDetailStore';
import LoginRequiredAction from '../../../auth/LoginRequiredAction';
import Success from '../../global/Success';
import { toast } from 'react-toastify';

const AddCourseButton = () => {
  const { title, placeSummaries } = useSollectDetailStore();
  const mutation = useMutation({
    mutationFn: (payload: SolroutePayload) => postSolroute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['solroutes'] });
    },
  });
  const clickButton = async () => {
    const payload: SolroutePayload = {
      iconId: 1,
      name: title ?? '제목 없는 쏠렉트',
      placeInfos: placeSummaries.map((place, i) => ({
        id: place.id,
        seq: i + 1,
        memo: '',
      })),
    };
    console.log(payload);
    // add to course
    await mutation.mutateAsync(payload);
    queryClient.invalidateQueries({ queryKey: ['solroutes'] });
    toast(<Success title='코스로 저장됐습니다.' />, { autoClose: 2000 });
  };
  const style =
    'rounded-full border-1 border-primary-700 py-4 pr-16 pl-8 flex text-sm font-bold items-center';
  return (
    <LoginRequiredAction onAction={clickButton}>
      <button className={'bg-white  text-primary-700 ' + style}>
        <img src={addBlack} alt='add' className='w-24 h-24' /> 코스로 저장
      </button>
    </LoginRequiredAction>
  );
};

export default AddCourseButton;
