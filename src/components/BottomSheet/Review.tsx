import { ReviewProps } from '../../types';
import ReviewPhotos from './ReviewPhotos';
import TagList from './TagList';
import EmojiGoodSmall from '../../assets/emojiGoodSmall.svg?react';
import EmojiBadSmall from '../../assets/emojiBadSmall.svg?react';
import Star from '../../assets/star.svg?react';

const Review = ({ review }: { review: ReviewProps }) => {
  return (
    <div className='py-16'>
      <div className='px-16 pb-12 flex items-center justify-between'>
        {/* 왼쪽: 프로필 이미지 + 이름/날짜 */}
        <div className='flex items-center gap-8'>
          <img
            src={review.profileImage}
            alt='profile'
            className='w-38 h-38 rounded-full object-cover'
          />
          <div className='flex flex-col'>
            <span className='text-primary-900 text-xs font-semibold'>
              @{review.username}
            </span>
            <span className='text-primary-400 text-[10px] font-normal'>
              {review.date}
            </span>
          </div>
        </div>

        {/* 오른쪽: 이모지 + 평점 */}
        <div className='flex items-center gap-6 text-sm text-gray-700'>
          <span>
            {review.emoji === 'good' ? <EmojiGoodSmall /> : <EmojiBadSmall />}
          </span>
          <div className='h-14 border-l border-primary-400 mx-1' />
          <div className='flex items-center'>
            <Star />
            <span className='justify-start text-primary-900 text-xs font-medium leading-none'>
              {review.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
      {/* 리뷰 내용 */}
      <div
        className='w-full px-16 pb-12 text-primary-900 text-xs font-normal'>
        {review.content}
      </div>
      <TagList tags={review.tags} />
      {review.images.length > 0 && <ReviewPhotos images={review.images} />}
    </div>
  );
};

export default Review;
