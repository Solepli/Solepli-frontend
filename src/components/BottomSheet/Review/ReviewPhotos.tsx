import XButton from '../../../assets/xButtonForImage.svg?react';

interface ReviewPhotoProps {
  src: string;
  children?: React.ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
}

const ReviewPhoto = ({ src, children, isFirst, isLast }: ReviewPhotoProps) => {
  return (
    <div className='h-160 w-max bg-gray-200 flex items-center justify-center bg-white relative'>
      <img
        src={src}
        alt={`Preview ${src}`}
        className={`w-full h-full object-cover rounded-[5px] ${
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
}

const ReviewPhotos = ({ images, onDeleteFunc }: ReviewPhotosProps) => {
  if (images.length === 0) return;

  return (
    <div className='w-full overflow-x-auto'>
      <div className='inline-flex gap-6'>
        {images.map((image, index) => {
          return (
            <ReviewPhoto
              key={index}
              src={image}
              isFirst={index === 0}
              isLast={index === images.length - 1}>
              {/* onClickFunc이 있다면 삭제 버튼 추가 */}
              {onDeleteFunc && (
                <div
                  className='absolute top-2 right-2 p-6'
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
