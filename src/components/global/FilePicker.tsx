// src/components/common/FilePicker.tsx
import { useRef } from 'react';
import Warn from './Warn';
import { toast } from 'react-toastify';

export interface FilePickerProps {
  /** 선택 후 보유 중인 파일 목록 */
  files: File[];
  /** 파일 배열을 갱신할 때 호출 */
  onChange: (files: File[]) => void;
  //** multiple 허용 여부 */
  multiple?: boolean;
  /** 최대 장수 (기본 5) */
  maxCount?: number;
  /** 단일 파일 최대 크기(바이트, 기본 5 MB) */
  maxSize?: number;
  /** input accept 속성 (기본 이미지) */
  accept?: string;
  /** 기존 file을 기억할지  */
  keepFiles?: boolean;
  /* 외부 함수에 의해서만 파일이 관리될 경우 ex 쏠렉트*/
  managedExternally?: boolean;
  /** 외부에서 클릭 트리거를 어떻게 그릴지 */
  children: (open: () => void) => React.ReactNode;
}

const DEFAULT_MAX_COUNT = 5;
const MAX_FILE_SIZE: number = Number(
  import.meta.env.VITE_IMAGE_UPLOAD_MAX_SIZE
);

const FilePicker: React.FC<FilePickerProps> = ({
  files,
  onChange,
  multiple = true,
  maxCount = DEFAULT_MAX_COUNT,
  maxSize = MAX_FILE_SIZE,
  accept = '.png,.jpg,.jpeg',
  keepFiles = true,
  managedExternally = false,
  children,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  /** 외부에서 호출할 ‘열기’ 함수 */
  const open = () => inputRef.current?.click();

  /** 변경 이벤트 */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let selected = Array.from(e.target.files ?? []);
    if (!selected.length) return;

    // 장수 제한
    if (keepFiles) {
      if (files.length + selected.length > maxCount) {
        toast(<Warn title={`최대 ${maxCount}개까지 등록 가능해요`} />);
        selected = selected.slice(0, maxCount - files.length);
      }
    } else {
      if (selected.length > maxCount) {
        toast(<Warn title={`최대 ${maxCount}개까지 등록 가능해요`} />);
        selected = selected.slice(0, maxCount); // 여기선 files.length 무시
      }
    }

    // 크기 제한
    let tooLargeFileExists = false;

    //이미지 크기 큰 파일 필터링
    selected = selected.filter((file) => {
      if (file.size > maxSize) {
        tooLargeFileExists = true;
        return false;
      }
      return true;
    });

    if (tooLargeFileExists) {
      toast(
        <Warn
          title='해당 사진은 첨부할 수 없어요.'
          message={`사진은 ${maxSize / 1024 / 1024}MB 이하만 첨부 가능해요.`}
        />
      );
    }

    if (managedExternally) {
      onChange(selected);
    } else if (keepFiles) {
      onChange([...files, ...selected]);
    } else {
      onChange(selected);
    }

    // 이벤트에서 같은 파일 다시 고를 수 있도록 value 초기화
    e.target.value = '';
  };

  return (
    <>
      {children(open)}
      <input
        type='file'
        multiple={multiple}
        ref={inputRef}
        accept={accept}
        className='hidden'
        onChange={handleFileChange}
      />
    </>
  );
};

export default FilePicker;
