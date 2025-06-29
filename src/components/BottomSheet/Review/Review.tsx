import { ReviewType } from '../../../types';
import ReviewPhotos from './ReviewPhotos';
import TagList from '../TagList';
import EmojiGoodSmall from '../../../assets/emojiGoodSmall.svg?react';
import EmojiBadSmall from '../../../assets/emojiBadSmall.svg?react';
import Star from '../../../assets/star.svg?react';
import ExpandableText from './ExpandableText';

const Review = ({ review }: { review: ReviewType }) => {
  return (
    <div className='pt-20 pb-12 border-b border-grayScale-100'>
      <div className='px-16 pb-12 flex items-center justify-between'>
        {/* 왼쪽: 프로필 이미지 + 이름/날짜 */}
        <div className='flex items-center gap-8'>
          <img
            src={review.profileImage}
            alt='profile'
            className='w-38 h-38 rounded-full object-cover'
          />
          <div className='flex flex-col'>
            <span className='text-primary-900 text-sm font-bold leading-[150%]'>
              @{review.username}
            </span>
            <span className='text-primary-400 text-xs font-normal leading-[120%]'>
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
      {review.images.length > 0 && (
        <div className='px-16'>
          <ReviewPhotos images={review.images} />
        </div>
      )}
    </div>
  );
};

export default Review;
