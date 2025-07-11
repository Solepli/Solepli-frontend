import { useState } from 'react';
import TitleHeader from '../../components/global/TitleHeader';
import { useNavigate } from 'react-router-dom';
import arrowIcon from '../../assets/arrow.svg';
import useAuthStore from '../../store/authStore';
import { useShallow } from 'zustand/shallow';
import LargeButtonInverted from '../../components/global/LargeButtonInverted';
import Modal from '../../components/global/Modal';
import { usePlaceStore } from '../../store/placeStore';
import useReviewWriteStore from '../../store/reviewWriteStore';
import { useSearchStore } from '../../store/searchStore';
import { useSollectDetailStore } from '../../store/sollectDetailStore';
import { useSollectStore } from '../../store/sollectStore';
import { useSollectWriteStore } from '../../store/sollectWriteStore';
import { useSolrouteWriteStore } from '../../store/solrouteWriteStore';
import { useSolmarkStore } from '../../store/solmarkStore';
import { useQueryClient } from '@tanstack/react-query';

const SettingPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { logout } = useAuthStore(
    useShallow((state) => ({
      logout: state.logout,
    }))
  );

  const { clearPlaceStore } = usePlaceStore();
  const { reset:clearReviewWriteStore } = useReviewWriteStore();
  const { clearSearchStore } = useSearchStore();
  const { clearSollectDetailStore } = useSollectDetailStore();
  const { clearSollectStore } = useSollectStore();
  const {reset:clearSollectWriteStore} = useSollectWriteStore();
  const {reset:clearSolrouteWriteStore} = useSolrouteWriteStore();
  const { clearSolmarkStore } = useSolmarkStore();

  const [modal, setModal] = useState(false);

  const style =
    'p-16 flex justify-between items-center border-b border-grayScale-100';

  const clear = () => {
    clearPlaceStore();
    clearReviewWriteStore();
    clearSearchStore();
    clearSollectDetailStore();
    clearSollectStore();
    clearSollectWriteStore();
    clearSolrouteWriteStore();
    clearSolmarkStore();
  };

  const handleLogout = () => {
    setModal(false);
    clear();
    queryClient.clear();
    // queryClient.removeQueries({ queryKey: ['solroutes'] }); 이건 solroute만 지우기
    logout();
    navigate('/login');
  };

  return (
    <div className='flex flex-col h-screen justify-between'>
      <TitleHeader title='설정' onClick={() => navigate(-1)} center />
      <div className='pt-58'>
        <div className={style}>
          <p>알림</p>
          <img src={arrowIcon} alt='arrow' className='w-24 h-24' />
        </div>
        <div className={style}>
          <p>화면 테마</p>
          <img src={arrowIcon} alt='arrow' className='w-24 h-24' />
        </div>
        <div className='p-16 flex flex-col gap-16'>
          <div className='flex justify-between items-center'>
            <p>국가</p>
            <p>대한민국</p>
          </div>
          <div className='flex justify-between items-center'>
            <p>언어</p>
            <p>한국어</p>
          </div>
          <div className='flex justify-between items-center'>
            <p>버전</p>
            <p>1.1</p>
          </div>
        </div>
      </div>
      <div className='p-16 flex flex-col gap-12 mb-80'>
        <LargeButtonInverted text='로그아웃' onClick={() => setModal(true)} />
        {modal && (
          <Modal
            title='로그아웃 하시겠습니까?'
            leftText='취소'
            rightText='로그아웃'
            onLeftClick={() => setModal(false)}
            onRightClick={handleLogout}
          />
        )}
        <p
          className='text-center text-primary-700 text-xs underline'
          onClick={() => navigate('/profile/delete')}>
          회원탈퇴
        </p>
      </div>
    </div>
  );
};

export default SettingPage;
