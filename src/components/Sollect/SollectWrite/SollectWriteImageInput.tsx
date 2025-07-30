import AddLogo from '../../../assets/photoAddIcon.svg?react';
import FilePicker from '../../global/FilePicker';
import { useShallow } from 'zustand/shallow';
import { useSollectWriteStore } from '../../../store/sollectWriteStore';
import { RefObject } from 'react';

const SollectWriteImageInput = ({
  footerRef,
}: {
  footerRef: RefObject<HTMLDivElement | null>;
}) => {
  // const footerRef = useRef<HTMLDivElement>(null);
  const { paragraphs, focusTextarea, caretPosition, insertImageAtCaret } =
    useSollectWriteStore(
      useShallow((state) => ({
        paragraphs: state.paragraphs,
        focusTextarea: state.focusTextarea,
        caretPosition: state.caretPosition,
        insertImageAtCaret: state.insertImageAtCaret,
      }))
    );

  const onFileChange = (newFiles: File[]) => {
    if (newFiles.length === 0) return;

    if (focusTextarea) {
      focusTextarea.focus(); // ensure focus

      //textarea에서 저장한 caretPostion 을 이용해 사용
      //기존 방식은 모바일에서 작동 안함
      setTimeout(() => {
        newFiles.reverse().forEach((file) => {
          insertImageAtCaret(file, caretPosition);
        });
      }, 0);
    } else {
      // fallback: 그냥 맨 뒤에 삽입
      newFiles.reverse().forEach((file) => {
        insertImageAtCaret(file, null);
      });
    }
  };

  return (
    <div
      ref={footerRef}
      onClick={(e) => {
        e.stopPropagation();
      }}
      // footer는 -translate-y-full로 설정해 footer의 top이 전체 화면 bottom 0에 위치할 경우 footer가 다 보임
      className='w-full h-44 flex items-center justify-start px-16 fixed -translate-y-full border-t border-grayScale-100 bg-white button'>
      <FilePicker
        files={paragraphs
          .filter((p) => p.type === 'IMAGE')
          .map((p) => p.file)
          .filter((file): file is File => file !== undefined)}
        onChange={onFileChange}
        multiple={true}
        maxCount={100}
        managedExternally={true}>
        {(open) => <AddLogo onClick={open} />}
      </FilePicker>
    </div>
  );
};

export default SollectWriteImageInput;
