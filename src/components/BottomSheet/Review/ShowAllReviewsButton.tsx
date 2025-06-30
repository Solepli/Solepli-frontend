import Arrow from './../../../assets/arrow.svg?react';

const ShowAllReviewsButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className='w-full p-16 flex justify-center items-center cursor-pointer'>
      <span className='text-primary-500 text-xs font-normal underline leading-none'>
        리뷰 더보기
      </span>
      <Arrow />
    </div>
  );
};

export default ShowAllReviewsButton;
