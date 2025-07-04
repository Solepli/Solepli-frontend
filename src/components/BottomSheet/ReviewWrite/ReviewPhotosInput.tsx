import { useRef } from 'react';
import Photo from '../../../assets/photo.svg?react';

import useReviewWriteStore from '../../../store/reviewWriteStore';
import { useShallow } from 'zustand/shallow';
import ReviewPhotos from '../Review/ReviewPhotos';

const MAX_FILE_SIZE: number = Number(import.meta.env.VITE_MAX_FILE_SIZE);

const ReviewPhotosInput = () => {
  const { files, setFiles } = useReviewWriteStore(
    useShallow((state) => ({
      files: state.files,
      setFiles: state.setFiles,
    }))
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let selectedFiles = Array.from(event.target.files || []);
    console.log('Selected files:', selectedFiles);
    if (!selectedFiles) return;

    // Check if the number of selected files exceeds 5
    if (files.length + selectedFiles.length > 5) {
      alert('사진은 최대 5장까지 추가할 수 있습니다.');
      selectedFiles = Array.from(selectedFiles).slice(0, 5 - files.length);
    }

    selectedFiles = selectedFiles.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        alert('파일 크기는 5MB를 초과할 수 없습니다.');
        return false;
      }
      return true;
    });
    setFiles([...files, ...selectedFiles]);
  };

  const handleDelete = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className='self-stretch flex flex-col items-start justify-center'>
      <div className='w-full py-8'>
        <ReviewPhotos
          images={files.map((file) => URL.createObjectURL(file))}
          onDeleteFunc={handleDelete}
        />
      </div>
      <div
        className='flex flex-row items-center gap-4 py-4 px-20'
        onClick={handleClick}>
        <Photo />
        <button className='text-[12px] leading-[120%] tracking-[-0.18px] text-primary-500 whitespace-nowrap'>
          사진 추가하기
        </button>
        <input
          type='file'
          accept='.png, .jpg, .jpeg'
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          className='hidden'
        />
      </div>
    </div>
  );
};

export default ReviewPhotosInput;
