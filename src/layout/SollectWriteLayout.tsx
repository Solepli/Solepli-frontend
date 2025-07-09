// src/pages/sollect-write/SollectWriteLayout.tsx
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SollectWriteHeader from '../components/Sollect/SollectWrite/SollectWriteHeader';
import { useShallow } from 'zustand/shallow';
import { useSollectWriteStore } from '../store/sollectWriteStore';
import { toast } from 'react-toastify';
import Warn from '../components/global/Warn';
import { postSollect, postSollectUpload, putSollect } from '../api/sollectApi';
import { useState } from 'react';
import Modal from '../components/global/Modal';

const SollectWriteLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { id, title, thumbnail, paragraph, places, reset } =
    useSollectWriteStore(
      useShallow((state) => ({
        id: state.id,
        title: state.title,
        thumbnail: state.thumbnail,
        paragraph: state.paragraphs,
        places: state.places,
        reset: state.reset,
      }))
    );

  const isPlaceStep = pathname.endsWith('/place');

  const handleLeft = () => {
    if (isPlaceStep) {
      navigate(-1);
    } else {
      //쏠렉트 내용 작성일  경우
      setShowDeleteModal(true);
    }
  };

  //모달 나가기 버튼 클릭시
  const onLeftClick = () => {
    reset();
    navigate(-1);
  };

  const validateContent = () => {
    if (!title && !thumbnail && paragraph.length === 0) {
      toast(
        <Warn title='썸네일 사진을 추가하고 제목과 본문을 입력해주세요.' />
      );
      return false;
    }
    if (!thumbnail && paragraph.length === 0) {
      toast(<Warn title='썸네일 사진을 추가하고 본문을 입력해주세요.' />);
      return false;
    }
    if (!title && !thumbnail) {
      toast(<Warn title='썸네일 사진을 추가하고 제목을 입력해주세요' />);
      return false;
    }
    if (!title && paragraph.length === 0) {
      toast(<Warn title='제목과 본문을 입력해주세요.' />);
      return false;
    }
    if (!title) {
      toast(<Warn title='제목을 입력해주세요.' />);
      return false;
    }
    if (!thumbnail) {
      toast(<Warn title='썸네일 사진을 추가해주세요.' />);
      return false;
    }
    if (paragraph.length === 0) {
      toast(<Warn title='본문을 입력해주세요.' />);
      return false;
    }
    return true;
  };

  const validatePlace = () => {
    if (places.length === 0) {
      toast(<Warn title='장소를 추가해주세요.' message='장소가 한 개 이상 추가되어야 쏠렉트를 등록할 수 있어요.' />);
      return false;
    }
    return true;
  };

  const validateToPost = () => {
    if (isPlaceStep) {
      if (places.length === 0) {
        return false;
      }
      return true;
    } else {
      if (!title || !thumbnail || paragraph.length === 0) {
        return false;
      }
      return true;
    }
  };

  const handleRight = async () => {
    if (isPlaceStep) {
      if (validatePlace() === false) return;
      await submitSollect();
    } else {
      if (validateContent() === false) return;
      // place 스텝으로 이동
      navigate('place');
    }
  };

  const submitSollect = async () => {
    // 현재 작성된 paragraphs 순서대로 seq를 재설정
    const renumberParagraphs = paragraph.map((p, index) => ({
      ...p,
      seq: index + 1, // seq를 1부터 시작하도록 재설정
    }));

    // 쏠렉트 request payload 생성
    const payload = {
      title,
      contents: [thumbnail, ...renumberParagraphs],
      placeIds: places.map((place) => place.id),
    };

    // id가 있으면 sollect 수정
    // id가 없으면 sollect 등록
    const res = id ? await putSollect(id, payload) : await postSollect(payload);
    console.log('Sollect ID:', res);
    if (!res) {
      toast(<Warn title='솔렉트를 등록하는데 실패했습니다.' />);
      return;
    }

    // 기존 id가 있다면 id를, 없다면 응답 값을 가져와 사용
    // 생성된 쏠렉트의 ID를 이용해 파일 업로드
    // 기존 contents에서 이미지 파일만 추출하여 FormData 생성
    const sollectId = id ?? res.data.data.sollectId;
    const formData = new FormData();
    const files = payload.contents
      .filter((item) => item?.type === 'IMAGE')
      .map((item) => (item && item.file ? item.file : null));
    files.forEach((file) => {
      if (file) {
        formData.append('files', file);
      }
    });
    await postSollectUpload(sollectId, formData);
    reset();
    // Sollect 등록 후 어디로 가야할지?
    navigate(`/sollect`);
  };

  return (
    <div className='w-full h-dvh flex flex-col relative overflow-hidden'>
      {/* header */}
      <SollectWriteHeader
        leftText='취소'
        rightText={isPlaceStep ? '등록' : '다음'}
        onLeft={handleLeft}
        onRight={handleRight}
        validation={validateToPost()}
      />

      {/* content */}
      <div className='flex-1 overflow-y-auto'>
        <Outlet /> {/* editor, place … */}
      </div>

      {/* modal */}
      {showDeleteModal && (
        <Modal
          title='아직 작성 중인 내용이 있어요!'
          subtitle={
            '페이지를 벗어날 경우,\n 지금까지 작성된 내용이 사라지게 돼요.'
          }
          leftText='취소'
          rightText='나가기'
          onLeftClick={() => setShowDeleteModal(false)}
          onRightClick={onLeftClick}
        />
      )}
    </div>
  );
};

export default SollectWriteLayout;
