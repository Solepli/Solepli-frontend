import React, { useEffect, useState } from 'react';

import ReviewEmoji from './ReviewEmoji';

import ReviewRatio from './ReviewRatio';
import ReviewTagList from './ReviewTagList';
import ReviewInput from './ReviewInput';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import useReviewWriteStore from '../../../store/reviewWriteStore';
import { useShallow } from 'zustand/shallow';
import ReviewWriteButton from './ReviewWriteButton';
import { postReview } from '../../../api/reviewApi';
import ReviewPhotosInput from './ReviewPhotosInput';
import TitleHeader from '../../global/TitleHeader';
import { toast } from 'react-toastify';
import Warn from '../../global/Warn';

const ReviewWrite: React.FC = () => {
  const navigate = useNavigate();
  const { placeId } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

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

  // 리뷰 작성 버튼 활성화 조건
  const isWrittenable =
    moodTags !== null &&
    rating > 0 &&
    moodTags.length > 0 &&
    singleTags.length > 0;

  const placeName = location.state?.place;

  const reviewWrite = async () => {
    setIsLoading(true);
    try {
      // review 데이터를 request로 만들어 FormData에 추가
      const formData = new FormData();
      const payload = {
        placeId: placeId,
        recommendation: emoji === 'good' ? true : false,
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

      // 성공할 때만 store를 초기화하고, Detail page로 돌아간다
      reset();
      navigateToDetail();
    } catch (e) {
      console.error(e);
      const message =
        e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';
      toast(<Warn title={message} />);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToDetail = () => {
    navigate(`/map/detail/${placeId}`, { state: { placeName } });
  };

  return (
    <div className='flex flex-col items-start justify-start pb-30'>
      {/* 뒤로가기 */}
      <TitleHeader title={placeName} onClick={navigateToDetail} />

      {/* 방문 의향 체크, pt-78: TitleHeader + 해당 컴포넌트 20 */}
      <div className='w-full pt-78'>
        <ReviewEmoji />
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
      <ReviewWriteButton
        onClickFunc={reviewWrite}
        disabled={!isWrittenable || isLoading}
      />
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
