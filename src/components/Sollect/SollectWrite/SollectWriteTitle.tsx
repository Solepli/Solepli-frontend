import Add from '../../../assets/addBlack.svg?react';
import { useShallow } from 'zustand/shallow';
import { useSollectWriteStore } from '../../../store/sollectWriteStore';
import FilePicker from '../../global/FilePicker';

const ImageAdd = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className='flex flex-col items-center justify-center'
      onClick={onClick}>
      <Add />
      <span className='text-primary-900 text-xs font-normal leanding-none'>
        사진 추가
      </span>
    </div>
  );
};

const SollectWriteTitle = () => {
  const { title, setTitle, thumbnail, setThumbnail } = useSollectWriteStore(
    useShallow((state) => ({
      title: state.title,
      setTitle: state.setTitle,
      thumbnail: state.thumbnail,
      setThumbnail: state.setThumbnail,
    }))
  );

  const handleFileChange = (newFiles: File[]) => {
    if (newFiles.length === 0) return;
    const file = newFiles[0];
    setThumbnail({
      seq: 0,
      type: 'IMAGE',
      content: file.name,
      file: file,
      imageUrl: URL.createObjectURL(file),
    });
  };

  return (
    <FilePicker
      files={thumbnail?.file ? [thumbnail.file] : []}
      onChange={handleFileChange}
      accept='.png, .jpg, .jpeg'
      multiple={false}
      maxCount={1}
      keepFiles={false}
    >
      {(open) => (
        <div
          className='w-full min-h-[214px] pt-66 pb-8 relative'
          style={{
            backgroundImage: thumbnail?.imageUrl
              ? `url(${thumbnail.imageUrl})`
              : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: thumbnail?.imageUrl ? '#18181866' : '#ECEEF2',
          }}>
          {thumbnail?.imageUrl ? (
            <div
              onClick={open}
              className='absolute bg-white w-81 h-26 top-12 right-12 flex items-center justify-center rounded outline outline-1 outline-offset-[-1px] outline-grayScale-100'
            >
              <span className='text-grayScale-600 text-xs font-normal leading-none'>커버 변경하기</span>
            </div>
          ) : (
            <div className='w-full h-68 py-13 px-12 flex justify-center items-center'>
              <ImageAdd onClick={open} />
            </div>
          )}
          <input
            type='text'
            value={title ?? ''}
            placeholder='제목을 입력해주세요.'
            maxLength={25}
            className={`w-full h-60 px-16 pt-16 pb-8  text-2xl font-bold leading-9 focus:outline-none absolute bottom-8 text-white placeholder-primary-400`}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      )}
    </FilePicker>
  );
};

export default SollectWriteTitle;
