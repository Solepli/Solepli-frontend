// TODO: disable 기능 validatio과 함께 추가하기.

interface ReviewWriteButtonProps {
  onClickFunc: () => void;
}

const ReviewWriteButton: React.FC<ReviewWriteButtonProps> = ({ onClickFunc }) => {
  return (
      <div className='self-stretch h-34 flex items-center justify-end px-20'>
        <button
          // disabled=
          onClick={onClickFunc}
          className='flex items-center justify-center py-10 px-14 bg-primary-700 rounded-[8px]'>
          <div className="text-[14px] leading-[100%] tracking-[-0.35px] font-[500] text-white whitespace-nowrap">
            리뷰 등록
          </div>
        </button>
      </div>
  );
}

export default ReviewWriteButton;