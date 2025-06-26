// src/pages/sollect-write/SollectWriteLayout.tsx
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SollectWriteHeader from '../components/Sollect/SollectWrite/SollectWriteHeader';
import { useShallow } from 'zustand/shallow';
import { useSollectWriteStore } from '../store/sollectWriteStore';
import { toast } from 'react-toastify';
import Warn from '../components/global/Warn';

const SollectWriteLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { title, thumbnail, paragraph, places } = useSollectWriteStore(useShallow((state) => ({
    title: state.title,
    thumbnail: state.thumbnail,
    paragraph: state.paragraphs,
    places: state.places,
  })));

  const isPlaceStep = pathname.endsWith('/place');

  const handleLeft = () => {
    // 임시저장 or 정말 나갈지 모달 띄우기 등을 여기서 처리
    navigate(-1);
  };

  const validateContent = () => {
    if (!title && !thumbnail) {
      toast(<Warn title='썸네일을 사진을 추가하고 제목과 내용을 입력하세요.' />);
      return false;
    }
    if (!title && paragraph.length === 0) {
      toast(<Warn title='제목과 내용을 입력하세요.' />);
      return false;
    }
    if (!title) {
      toast(<Warn title='제목을 입력하세요.'/>);
      return false;
    }
    if (!thumbnail) {
      toast(<Warn title='썸네일 사진을 추가해야합니다.' />);
      return false;
    }
    if (paragraph.length === 0) {
      toast(<Warn title='내용을 입력하세요.' />);
      return false;
    }
    return true;
  }

  const validatePlace = () => {
    if (places.length === 0) {
      toast(<Warn title='아직 장소가 추가되지 않았어요!.' />);
      return false;
    }
    return true;
  }

  const handleRight = () => {
    if (isPlaceStep) {
      if (validatePlace() === false) return;

    } else {
      if(validateContent() === false) return;
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
