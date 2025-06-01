// src/stores/useSollectWriteStore.ts
import { create } from 'zustand';

type Paragraph = {
  seq: number;
  type: 'TEXT' | 'IMAGE';
  content?: string;
};

type SollectWriteState = {
  seq: number;
  focusSeq: number | null;
  paragraphs: Paragraph[];
  addTextParagraph: (afterSeq?: number) => void;
  addImageParagraph: (afterSeq?: number) => void;
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

  addImageParagraph: (afterSeq) =>
    set((state) => {
      const newPara: Paragraph = {
        seq: state.seq++,
        type: 'IMAGE',
        content: '',
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
