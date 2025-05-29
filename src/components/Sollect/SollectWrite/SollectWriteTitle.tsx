import { useRef, useState } from 'react';
import Add from '../../../assets/addBlack.svg?react';

const MAX_FILE_SIZE: number = Number(import.meta.env.VITE_MAX_FILE_SIZE);

const SollectWriteTitle = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    if (!image) return;

    if (image.size > 5 * MAX_FILE_SIZE) {
      alert('파일 크기는 5MB를 초과할 수 없습니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setBackgroundImage(reader.result as string);
    };
    reader.readAsDataURL(image);
  };

  return (
    <div
      className='w-full min-h-[214px] pt-66 pb-8 relative bg-primary-100'
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      {!backgroundImage && (
        <div className='w-full h-68 py-13 px-12 flex justify-center items-center'>
          <div
            className='flex flex-col items-center justify-center'
            onClick={handleClick}>
            <Add />
            <span className='text-primary-900 text-xs font-normal leanding-none'>
              사진 추가
            </span>
            <input
              type='file'
              accept='.png, .jpg, .jpeg'
              ref={fileInputRef}
              onChange={handleFileChange}
              className='hidden'
            />
          </div>
        </div>
      )}
      <input
        type='text'
        placeholder='제목을 입력해주세요.'
        maxLength={25}
        className={`w-full h-60 px-16 pt-16 pb-8  text-2xl font-bold leading-9 focus:outline-none absolute bottom-8 text-white placeholder-primary-400`}
      />
    </div>
  );
};

export default SollectWriteTitle;
