import { ReviewType } from '../../../types';
import TagList from '../TagList';
import EmojiGoodSmall from '../../../assets/emojiGoodSmall.svg?react';
import EmojiBadSmall from '../../../assets/emojiBadSmall.svg?react';
import Star from '../../../assets/star.svg?react';
import ExpandableText from './ExpandableText';
import ReviewPhotos from './ReviewPhotos';

const Review = ({ review }: { review: ReviewType }) => {
  return (
    <div className='pt-20 pb-12 border-b border-grayScale-100'>
      <div className='px-16 pb-12 flex items-center justify-between'>
        {/* 왼쪽: 프로필 이미지 + 이름/날짜 */}
        <div className='flex items-center gap-8'>
          <img
            src={review.userProfileUrl}
            alt='profile'
            className='w-38 h-38 rounded-full object-cover'
          />
          <div className='flex flex-col'>
            <span className='text-primary-900 text-sm font-bold leading-[150%]'>
              @{review.userNickname}
            </span>
            <span className='text-primary-400 text-xs font-normal leading-[120%]'>
              {formatReviewDate(review.createdAt)}
            </span>
          </div>
        </div>

        {/* 오른쪽: 이모지 + 평점 */}
        <div className='flex items-center gap-6 text-sm text-gray-700'>
          <span>
            {review.isRecommended ? <EmojiGoodSmall /> : <EmojiBadSmall />}
          </span>
          <div className='h-14 border-l border-primary-400 mx-1' />
          <div className='flex items-center'>
            <Star />
            <span className='justify-start text-primary-900 text-sm font-medium leading-[150%]'>
              {review.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
      {/* 리뷰 내용 */}
      <ExpandableText text={review.content} maxLines={3} />
      {/* 태그, div는 단순 padding을 위해 추가 */}
      <div className='pb-4'>
        <TagList tags={review.tags} />
      </div>
      {review.photoUrls.length > 0 && (
        <div className='pb-8'>
          <ReviewPhotos images={review.photoUrls} />
        </div>
      )}
    </div>
  );
};

export default Review;

//createAt 포맷을 yy.mm.dd 형식으로 변환함
function formatReviewDate(createdAt: string) {
  const date = new Date(createdAt);
  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}
