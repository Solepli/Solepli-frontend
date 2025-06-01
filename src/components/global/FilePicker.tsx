// src/components/common/FilePicker.tsx
import { useRef } from 'react';

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
    if (files.length + selected.length > maxCount) {
      alert(`사진은 최대 ${maxCount}장까지 추가할 수 있습니다.`);
      selected = selected.slice(0, maxCount - files.length);
    }

    // 크기 제한
    selected = selected.filter((file) => {
      if (file.size > maxSize) {
        alert(
          `파일 크기는 ${(maxSize / 1024 / 1024).toFixed(1)} MB 이하만 가능합니다.`
        );
        return false;
      }
      return true;
    });

    onChange([...files, ...selected]);
    // 同 이벤트에서 같은 파일 다시 고를 수 있도록 value 초기화
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
