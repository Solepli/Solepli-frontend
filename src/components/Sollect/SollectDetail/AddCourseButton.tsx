import addBlack from '../../../assets/addBlack.svg';
import { useMutation } from '@tanstack/react-query';
import { postSolroute } from '../../../api/solrouteApi';
import { SolroutePayload } from '../../../types';
import { queryClient } from '../../../main';
import { useSollectDetailStore } from '../../../store/sollectDetailStore';
import LoginRequiredAction from '../../../auth/LoginRequiredAction';
import { useState } from 'react';
import Modal from '../../global/Modal';
import { useNavigate } from 'react-router-dom';

const AddCourseButton = () => {
  const [showModal, setShowModal] = useState(false);
  const { title, placeSummaries } = useSollectDetailStore();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (payload: SolroutePayload) => postSolroute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['solroutes'] });
    },
  });

  const saveCourse = async () => {
    const payload: SolroutePayload = {
      iconId: 1,
      name: title ?? '제목 없는 쏠렉트',
      placeInfos: placeSummaries.map((place, i) => ({
        id: place.id,
        seq: i + 1, // 순서 아이콘 1부터 시작
        memo: '',
      })),
    };
    // add to course
    await mutation.mutateAsync(payload);
    queryClient.invalidateQueries({ queryKey: ['solroutes'] });
    setShowModal(true);
  };

  const style =
    'rounded-full border-1 border-primary-700 py-4 pr-16 pl-8 flex text-sm font-bold items-center';
  return (
    <>
      <LoginRequiredAction onAction={saveCourse}>
        <button className={'bg-white  text-primary-700 ' + style}>
          <img src={addBlack} alt='add' className='w-24 h-24' /> 코스로 저장
        </button>
      </LoginRequiredAction>
      {showModal && (
        <Modal
          title='코스로 저장 완료!'
          subtitle='저장한 코스를 쏠루트에서 확인할 수 있어요'
          leftText='쏠렉트 이어보기'
          rightText='쏠루트 보러가기'
          onLeftClick={() => setShowModal(false)}
          onRightClick={() => {
            navigate('/solroute');
          }}
        />
      )}
    </>
  );
};

export default AddCourseButton;
