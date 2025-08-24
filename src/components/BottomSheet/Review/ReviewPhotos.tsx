import XButton from '../../../assets/xButtonForImage.svg?react';

interface ReviewPhotoProps {
  src: string;
  children?: React.ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
  isEdit?: boolean;
}

const ReviewPhoto = ({
  src,
  children,
  isFirst,
  isLast,
}: ReviewPhotoProps) => {
  return (
    <div
      className={`h-full w-max bg-gray-200 flex items-center justify-center bg-white relative
        ${isFirst ? 'ml-16' : ''}
        ${isLast ? 'mr-16' : ''}
      `}>
      <img
        src={src}
        alt={`Preview ${src}`}
        className={`h-full object-cover rounded-[5px] ${
          isFirst ? 'rounded-tl-[20px]' : ''
        } ${isLast ? 'rounded-br-[20px]' : ''}`}
      />
      {children}
    </div>
  );
};

interface ReviewPhotosProps {
  images: string[];
  onDeleteFunc?: (index: number) => void;
  isEdit?: boolean;
}

const ReviewPhotos = ({
  images,
  onDeleteFunc,
  isEdit = false,
}: ReviewPhotosProps) => {
  if (images.length === 0) return;

  return (
    <div
      className={`w-full overflow-x-scroll touch-pan-x ${isEdit ? 'h-160' : 'h-125'}`}>
      <div className='w-fit h-full flex gap-6'>
        {images.map((image, index) => {
          return (
            <ReviewPhoto
              key={index}
              src={image}
              isFirst={index === 0}
              isLast={index === images.length - 1}
              isEdit={isEdit}>
              {/* onClickFunc이 있다면 삭제 버튼 추가 */}
              {onDeleteFunc && (
                <div
                  className='absolute top-0 right-0 p-6 button'
                  onClick={() => onDeleteFunc(index)}>
                  <XButton />
                </div>
              )}
            </ReviewPhoto>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewPhotos;
