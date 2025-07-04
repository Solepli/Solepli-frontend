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
  /** 외부에서 클릭 트리거를 어떻게 그릴지 */
  children: (open: () => void) => React.ReactNode;
}

const DEFAULT_MAX_COUNT = 5;
const MAX_FILE_SIZE: number = Number(import.meta.env.VITE_MAX_FILE_SIZE);

const FilePicker: React.FC<FilePickerProps> = ({
  files,
  onChange,
  multiple = true,
  maxCount = DEFAULT_MAX_COUNT,
  maxSize = MAX_FILE_SIZE,
  accept = '.png,.jpg,.jpeg',
  keepFiles = true,
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
    if (
      keepFiles
        ? files.length + selected.length > maxCount
        : selected.length > maxCount
    ) {
      toast(<Warn title={`최대 ${maxCount}개까지 등록 가능해요`} />);
      selected = selected.slice(0, maxCount - files.length);
    }

    // 크기 제한
    selected = selected.filter((file) => {
      if (file.size > maxSize) {
        toast(
          <Warn
            title='해당 사진은 첨부할 수 없어요.'
            message={`사진은 ${maxSize / 1024 / 1024}MB 이하만 첨부 가능해요.`}
          />
        );
        return false;
      }
      return true;
    });

    if (keepFiles) {
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
