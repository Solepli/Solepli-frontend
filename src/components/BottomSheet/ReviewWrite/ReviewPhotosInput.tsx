import React from 'react';
import Photo from '../../../assets/photoAddIcon.svg?react';

import useReviewWriteStore from '../../../store/reviewWriteStore';
import { useShallow } from 'zustand/shallow';
import ReviewPhotos from '../Review/ReviewPhotos';
import FilePicker from '../../global/FilePicker';

const AddPhoto: React.FC<{
  onClick: React.MouseEventHandler<HTMLDivElement>;
}> = ({ onClick }) => {
  return (
    <div onClick={onClick} className='flex py-4 gap-2'>
      <Photo />
      <button className='pl-2 text-sm leading-tight text-primary-500 font-normal whitespace-nowrap'>
        사진 추가하기
      </button>
    </div>
  );
};

const ReviewPhotosInput = () => {
  const { files, setFiles } = useReviewWriteStore(
    useShallow((state) => ({
      files: state.files,
      setFiles: state.setFiles,
    }))
  );

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
      <div className='pl-20'>
        <FilePicker files={files} onChange={(files) => setFiles(files)}>
          {(open) => <AddPhoto onClick={open} />}
        </FilePicker>
      </div>
    </div>
  );
};

export default ReviewPhotosInput;
