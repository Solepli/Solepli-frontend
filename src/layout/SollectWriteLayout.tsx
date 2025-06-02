// src/pages/sollect-write/SollectWriteLayout.tsx
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SollectWriteHeader from '../components/Sollect/SollectWrite/SollectWriteHeader';

const SollectWriteLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isPlaceStep = pathname.endsWith('/place');

  const handleLeft = () => {
    // 임시저장 or 정말 나갈지 모달 띄우기 등을 여기서 처리
    navigate(-1);
  };

  const handleRight = () => {
    if (isPlaceStep) {
      //TODO: Sollect 등록 로직
    } else {
      // place 스텝으로 이동
      navigate('place');
    }
  };

  return (
    <div className='w-full h-dvh flex flex-col relative overflow-hidden'>
      {/* header */}
      <SollectWriteHeader
        leftText='취소'
        rightText={isPlaceStep ? '등록' : '다음'}
        onLeft={handleLeft}
        onRight={handleRight}
      />

      {/* content */}
      <div className='flex-1 overflow-y-auto'>
        <Outlet /> {/* editor, place … */}
      </div>
    </div>
  );
};

export default SollectWriteLayout;
