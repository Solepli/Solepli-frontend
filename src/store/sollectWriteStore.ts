// src/stores/useSollectWriteStore.ts
import { create } from 'zustand';

type Paragraph = {
  seq: number;
  type: 'TEXT' | 'IMAGE';
  content?: string;
};

type SollectWriteState = {
  seq: number;
  paragraphs: Paragraph[];
  addTextParagraph: (afterSeq?: number) => void;
  addImageParagraph: (afterSeq?: number) => void;
  updateParagraphContent: (seq: number, content: string) => void;
  deleteParagraph: (seq: number) => void;
};

export const useSollectWriteStore = create<SollectWriteState>((set) => ({
  seq: 0,
  paragraphs: [],

  addTextParagraph: (afterSeq) =>
    set((state) => {
      const newPara: Paragraph = {
        seq: state.seq++,
        type: 'TEXT',
        content: '',
      };
      if (!afterSeq) return { paragraphs: [...state.paragraphs, newPara] };

      const newSeq = state.paragraphs.findIndex((p) => p.seq === afterSeq);
      const updated = [
        ...state.paragraphs.slice(0, newSeq + 1),
        newPara,
        ...state.paragraphs.slice(newSeq + 1),
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
}));
