import React, { useEffect, useState } from 'react';

import ReviewEmoji from '../components/BottomSheet/ReviewWrite/ReviewEmoji';

import ReviewRatio from '../components/BottomSheet/ReviewWrite/ReviewRatio';
import ReviewTagList from '../components/BottomSheet/ReviewWrite/ReviewTagList';
import ReviewInput from '../components/BottomSheet/ReviewWrite/ReviewInput';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import useReviewWriteStore from '../store/reviewWriteStore';
import { useShallow } from 'zustand/shallow';
import { postReview } from '../api/reviewApi';
import ReviewPhotosInput from '../components/BottomSheet/ReviewWrite/ReviewPhotosInput';
import TitleHeader from '../components/global/TitleHeader';
import { toast } from 'react-toastify';
import Warn from '../components/global/Warn';
import LargeButton from '../components/global/LargeButton';
import Modal from '../components/global/Modal';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../main';

const ReviewWrite: React.FC = () => {
  const navigate = useNavigate();
  const { placeId } = useParams();
  const location = useLocation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //리렌더링을 방지하기 위해 useShallow 사용
  const {
    moodTags,
    setMoodTags,
    emoji,
    rating,
    text,
    setSingleTags,
    singleTags,
    files,
    reset,
  } = useReviewWriteStore(
    useShallow((state) => ({
      moodTags: state.moodTags,
      setMoodTags: state.setMoodTags,
      singleTags: state.singleTags,
      setSingleTags: state.setSingleTags,
      emoji: state.emoji,
      rating: state.rating,
      text: state.text,
      files: state.files,
      reset: state.reset,
    }))
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => reviewWrite(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['placeDetail', placeId] });
      navigateToDetail();
    },
  });

  const onBackClick = () => {
    setShowDeleteModal(true);
  };

  const submitReview = async () => {
    await mutateAsync();
  };

  // 리뷰 작성 버튼 활성화 조건
  const isWrittenable =
    emoji !== null &&
    moodTags !== null &&
    rating > 0 &&
    moodTags.length > 0 &&
    singleTags.length > 0;

  const placeName = location.state?.place;

  const reviewWrite = async () => {
    try {
      // review 데이터를 request로 만들어 FormData에 추가
      const formData = new FormData();
      const payload = {
        placeId: placeId,
        recommendation: emoji,
        rating: rating,
        moodTag: moodTags,
        soloTag: singleTags,
        content: text,
      };
      formData.append('request', JSON.stringify(payload));

      // 파일들을 FormData에 추가
      files.forEach((file) => {
        formData.append('files', file);
      });

      // 서버에 리뷰 등록 요청
      await postReview(formData);
    } catch (e) {
      console.error(e);
      const message =
        e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';
      toast(<Warn title={message} />);
      throw e;
    }
  };

  const navigateToDetail = () => {
    reset();
    navigate(`/map/detail/${placeId}`, { state: { placeName, from: 'map' } });
  };

  return (
    <div className='flex flex-col items-start justify-start pb-30 relative'>
      {/* 뒤로가기 */}
      <TitleHeader title={placeName} onClick={onBackClick} />

      {/* 방문 의향 체크, pt-78: TitleHeader + 해당 컴포넌트 20 */}
      <div className='w-full pt-58'>
        <ReviewEmoji pt={20} />
      </div>

      {/* 만족도 체크 */}
      <ReviewRatio />

      <div className='flex flex-col pb-32 border-gray-100 border-[0_0_1px]'>
        {/* 분위기 태그 */}
        <ReviewTagList
          title={'분위기'}
          tags={mood}
          selectedTags={moodTags}
          setSelectedTags={setMoodTags}
        />

        {/* 분위기 태그 */}
        <ReviewTagList
          title={'1인 이용'}
          tags={single}
          selectedTags={singleTags}
          setSelectedTags={setSingleTags}
        />
      </div>

      {/* 리뷰 글 작성 */}
      <ReviewInput />

      {/* 사진 추가하기 */}
      <ReviewPhotosInput />

      {/* 리뷰 작성 완료 버튼 */}
      <div className='w-full pt-32 px-16 pb-16'>
        <LargeButton
          text={'리뷰 등록'}
          onClick={submitReview}
          disable={!isWrittenable || isPending}
          bold={true}
        />
      </div>
      {showDeleteModal && (
        <Modal
          title='아직 작성 중인 내용이 있어요!'
          subtitle={
            '페이지를 벗어날 경우,\n 지금까지 작성된 내용이 사라지게 돼요.'
          }
          leftText='취소'
          rightText='나가기'
          onLeftClick={() => setShowDeleteModal(false)}
          onRightClick={navigateToDetail}
        />
      )}
    </div>
  );
};

export default ReviewWrite;

const mood: string[] = [
  '조용한',
  '시끌벅적한',
  '편안한',
  '고급스러운',
  '색다른',
  '힙한',
  '트렌디한',
  '자연친화적인',
  '사진 찍기 좋은',
  '뷰가 좋은',
];
const single: string[] = [
  '1인 좌석이 있는',
  '1인 메뉴가 있는',
  '콘센트가 많은',
  '오래 머물기 좋은',
  '가볍게 들르기 좋은',
  '낮에 가기 좋은',
  '밤에 가기 좋은',
  '넓은',
  '좁은',
];
