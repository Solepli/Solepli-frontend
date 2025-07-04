import AddLogo from '../../../assets/photoAddIcon.svg?react';
import FilePicker from '../../global/FilePicker';
import { useShallow } from 'zustand/shallow';
import { useSollectWriteStore } from '../../../store/sollectWriteStore';

const SollectWriteImageInput = () => {
  const { paragraphs, focusTextarea, insertImageAtCaret } = useSollectWriteStore(
    useShallow((state) => ({
      paragraphs: state.paragraphs,
      focusTextarea: state.focusTextarea,
      insertImageAtCaret: state.insertImageAtCaret,
    }))
  );

  const onFileChange = (newFiles: File[]) => {
    if (newFiles.length === 0) return;
    let caret = null;
    if (focusTextarea) {
      caret = focusTextarea.selectionStart ?? 0;
    }
    newFiles.reverse().forEach((file) => {
      insertImageAtCaret(file, caret);
    })
  };

  return (
    <div className='w-full h-44 flex items-center justify-start px-16 fixed bottom-0 border-t border-grayScale-100 bg-white'>
      <FilePicker
        files={paragraphs.filter((p) => p.type === 'IMAGE').map((p) => p.file).filter((file): file is File => file !== undefined)}
        onChange={onFileChange}
        multiple={true}
        maxCount={100}
        keepFiles={false}>
        {(open) => <AddLogo onClick={open} />}
      </FilePicker>
    </div>
  );
};

export default SollectWriteImageInput;
