import Add from '../../../assets/addBlack.svg?react';
import { useShallow } from 'zustand/shallow';
import { useSollectWriteStore } from '../../../store/sollectWriteStore';
import FilePicker from '../../global/FilePicker';

const MAX_FILE_SIZE: number = Number(import.meta.env.VITE_MAX_FILE_SIZE);

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
      content: URL.createObjectURL(file),
      file: file,
    });
  };

  return (
    <div
      className='w-full min-h-[214px] pt-66 pb-8 relative'
      style={{
        backgroundImage: thumbnail?.content
          ? `url(${thumbnail.content})`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: thumbnail?.content ? '#18181866' : '#ECEEF2', //이미지 배경색 결정. 이미지가 있을 경우 #18181866, 없을 경우 #ECEEF2(primary-100)
      }}>
      {!thumbnail?.content && (
        <div className='w-full h-68 py-13 px-12 flex justify-center items-center'>
          <FilePicker
            files={thumbnail?.file ? [thumbnail.file] : []}
            onChange={handleFileChange}
            accept='.png, .jpg, .jpeg'
            multiple={false}
            maxCount={1}
            maxSize={MAX_FILE_SIZE}
            keepFiles={false}>
            {(open) => <ImageAdd onClick={open} />}
            </FilePicker>
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
  );
};

export default SollectWriteTitle;
