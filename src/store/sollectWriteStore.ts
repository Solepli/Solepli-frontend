// src/stores/useSollectWriteStore.ts
import { create } from 'zustand';

type Paragraph = {
  seq: number;
  type: 'TEXT' | 'IMAGE';
  content?: string;
  file?: File; // 이미지 파일을 저장할 수 있는 속성 추가
};

type SollectWriteState = {
  seq: number;
  focusSeq: number | null;
  paragraphs: Paragraph[];
  addTextParagraph: (afterSeq?: number) => void;
  addImageParagraph: (file: File, afterSeq?: number) => void;
  updateParagraphContent: (seq: number, content: string) => void;
  deleteParagraph: (seq: number) => void;
  setParagraphs: (paragraphs: Paragraph[]) => void;
  setFocusSeq: (seq: number | null) => void;
};

export const useSollectWriteStore = create<SollectWriteState>((set) => ({
  seq: 0,
  focusSeq: null, // 초기 포커스 시퀀스는 -1로 설정
  paragraphs: [],

  addTextParagraph: (afterSeq) =>
    set((state) => {
      const newPara: Paragraph = {
        seq: state.seq++,
        type: 'TEXT',
        content: '',
      };
      if (!afterSeq) return { paragraphs: [...state.paragraphs, newPara] };

      const updated = [
        ...state.paragraphs.slice(0, afterSeq + 1),
        newPara,
        ...state.paragraphs.slice(afterSeq + 1),
      ];
      return { paragraphs: updated };
    }),

  addImageParagraph: (file, afterSeq?,) =>
    set((state) => {
      const newPara: Paragraph = {
        seq: state.seq++,
        type: 'IMAGE',
        content: URL.createObjectURL(file), // 이미지 URL 생성
        file: file, // 파일 정보 저장
      };
      if (!afterSeq) return { paragraphs: [...state.paragraphs, newPara] };

      const idx = state.paragraphs.findIndex((p) => p.seq === afterSeq);
      const updated = [
        ...state.paragraphs.slice(0, idx + 1),
        newPara,
        ...state.paragraphs.slice(idx + 1),
      ];
      return { paragraphs: updated };
    }),

  updateParagraphContent: (seq, content) =>
    set((state) => ({
      paragraphs: state.paragraphs.map((p) =>
        p.seq === seq ? { ...p, content } : p
      ),
    })),

  deleteParagraph: (seq) =>
    set((state) => ({
      paragraphs: state.paragraphs.filter((p) => p.seq !== seq),
    })),

  setParagraphs: (paragraphs: Paragraph[]) =>
    set(() => ({
      paragraphs,
    })),

  setFocusSeq: (seq) =>
    set(() => ({
      focusSeq: seq,
    })),
}));
