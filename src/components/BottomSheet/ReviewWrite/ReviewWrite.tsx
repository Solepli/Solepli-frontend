import React, { useEffect } from 'react';

import ReviewEmoji from './ReviewEmoji';

import ReviewRatio from './ReviewRatio';
import ReviewTagList from './ReviewTagList';
import { ReviewType } from '../../../types';
import ReviewInput from './ReviewInput';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import useReviewWriteStore from '../../../store/reviewWriteStore';
import { useShallow } from 'zustand/shallow';
import ReviewWriteButton from './ReviewWriteButton';
import { addReview } from '../../../api/reviewApi';
import ReviewPhotosInput from './ReviewPhotosInput';
import TitleHeader from '../../global/TitleHeader';

const ReviewWrite: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const { placeId } = useParams();
  const location = useLocation();

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

  // 리뷰 작성 버튼 활성화 조건
  const isWrittenable =
    moodTags !== null &&
    rating > 0 &&
    moodTags.length > 0 &&
    singleTags.length > 0;

  const placeName = location.state?.place;

  const reviewWrite = async () => {
    const newReview: ReviewType = {
      id: 0,
      username: 'eoksdjeos',
      profileImage: 'https://i.pravatar.cc/50?img=1', // 샘플 이미지 URL
      date: new Date().toLocaleDateString('ko-KR').slice(2),
      rating,
      emoji,
      content: text,
      images: files.map((file) => URL.createObjectURL(file)),
      tags: [...moodTags, ...singleTags],
    };

    await addReview(newReview);
    reset();
    navigateToDetail();
  };
  const navigateToDetail = () => {
    navigate(`/map/detail/${placeId}`, { state: { placeName } });
  };

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
      <ReviewWriteButton onClickFunc={reviewWrite} disabled={!isWrittenable} />
    </div>
  );
};

export default ReviewWrite;
