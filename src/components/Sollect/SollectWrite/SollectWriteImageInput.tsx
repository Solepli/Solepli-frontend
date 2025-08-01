import AddLogo from '../../../assets/photoAddIcon.svg?react';
import FilePicker from '../../global/FilePicker';
import { useShallow } from 'zustand/shallow';
import { useSollectWriteStore } from '../../../store/sollectWriteStore';

const SollectWriteImageInput = () => {
  // const footerRef = useRef<HTMLDivElement>(null);
  const { paragraphs, insertImageAtCaret } = useSollectWriteStore(
    useShallow((state) => ({
      focusSeq: state.focusSeq,
      setFocus: state.setFocus,
      getNextSeq: state.getNextSeq,
      paragraphs: state.paragraphs,
      setParagraphs: state.setParagraphs,
      insertImageAtCaret: state.insertImageAtCaret,
    }))
  );

  const onFileChange = (newFiles: File[]) => {
    if (newFiles.length === 0) return;

    // if (focusSeq) {
    //   // console.log('Inserting images at caret position:', caretPosition);
    //   // const focusTextarea = focusTextareaRef.current;
    //   // console.log('before paragraphs:', paragraphs);
    //   // console.log('seq:', seq);

    //   // const newParagraphs: Paragraph[] = [
    //   //   ...paragraphs.slice(0, seq).map((p) => ({ ...p, seq: getNextSeq()})),
    //   //   { ...paragraphs[seq], content: focusTextarea!.value.slice(0, caretPosition) } as Paragraph,
    //   //   ...newFiles.map((file) => ({
    //   //     seq: getNextSeq(),
    //   //     type: 'IMAGE',
    //   //     content: file.name,
    //   //     file: file,
    //   //     imageUrl: URL.createObjectURL(file),
    //   //   } as Paragraph)),
    //   //   { seq: getNextSeq(), type:'TEXT', content: focusTextarea!.value.slice(caretPosition) } as Paragraph,
    //   //   ...paragraphs.slice(focusTextareaRef.seq + 1),
    //   // ];

    //   // console.log('New paragraphs after image insert:', newParagraphs);

    //   //textarea에서 저장한 caretPostion 을 이용해 사용
    //   //기존 방식은 모바일에서 작동 안함
    //   setTimeout(() => {
    //     newFiles.reverse().forEach((file) => {
    //       insertImageAtCaret(file, focusSeq, );
    //     });
    //   }, 0);
    // } else {
    //   newFiles.reverse().forEach((file) => {
    //     insertImageAtCaret(file);
    //   });
    // }
    newFiles.reverse().forEach((file) => {
      insertImageAtCaret(file);
    });
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className='w-full h-44 flex items-center justify-start px-16 border-t border-grayScale-100 bg-white button'>
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
