// src/stores/useSollectWriteStore.ts
import { create } from 'zustand';
import { RelatedSearchWord, ReleatedSearchPlace } from '../types';

type Paragraph = {
  seq: number;
  type: 'TEXT' | 'IMAGE';
  content?: string;
  file?: File; // 이미지 파일을 저장할 수 있는 속성 추가
};

type SollectWriteState = {
  seq: number;
  focusSeq: number | null;
  focusTextarea?: HTMLTextAreaElement | null; // 포커스된 텍스트 영역을 저장할 수 있는 속성
  title: string | null;
  thumbnail: string | null;
  paragraphs: Paragraph[];
  places: ReleatedSearchPlace[]; // 장소 ID 목록을 저장하는 속성 추가
  setTitle: (title: string | null) => void; // 제목을 설정하는 함수
  addTextParagraph: (afterSeq?: number) => void;
  addImageParagraph: (file: File, afterSeq?: number) => void;
  updateParagraphContent: (seq: number, content: string) => void;
  deleteParagraph: (seq: number) => void;
  setParagraphs: (paragraphs: Paragraph[]) => void;
  setFocus: (seq: number, el: HTMLTextAreaElement | null) => void;
  insertImageAtCaret: (file: File, caret?: number | null) => void;
  addPlaces: (places: RelatedSearchWord[]) => void; // 장소 ID 목록을 설정하는 함수
  removePlace: (id: number | null) => void; // 선택된 place 해제
};

export const useSollectWriteStore = create<SollectWriteState>((set) => ({
  seq: 0,
  focusSeq: null, // 초기 포커스 시퀀스는 -1로 설정
  paragraphs: [],
  focusTextarea: null,
  title: null, // 제목을 저장하는 속성
  thumbnail: null, // 썸네일 이미지 URL을 저장하는 속성
  places: [], // 장소 ID 목록을 저장하는 속성

  setTitle: (title: string | null) =>
    set(() => ({
      title,
    })),

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

  addImageParagraph: (file, afterSeq?) =>
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

  setFocus: (seq, el) =>
    set(() => ({
      focusSeq: seq,
      focusTextarea: el,
    })),

  insertImageAtCaret: (file, caret = null) => {
    set((state) => {
      // focus된 텍스트 영역이 없으면 새 단락 추가
      if (!state.focusTextarea) {
        state.addImageParagraph(file);
        return {};
      }

      const idx = state.paragraphs.findIndex((p) => p.seq === state.focusSeq);
      if (idx === -1 || state.paragraphs[idx].type !== 'TEXT') {
        // focus된 단락이 없거나 텍스트 단락이 아니면 새 단락 추가
        state.addImageParagraph(file);
        return {};
      }

      const target = state.paragraphs[idx];

      const beforeText = (target.content || '').slice(0, caret ?? 0);
      const afterText = (target.content || '').slice(caret ?? 0);

      const newImage: Paragraph = {
        seq: state.seq++,
        type: 'IMAGE',
        content: URL.createObjectURL(file), // 이미지 URL 생성
      };

      const rebuilt: Paragraph[] = [
        { ...target, content: beforeText }, // 수정된 앞쪽 텍스트
        newImage, // 이미지
        ...(afterText
          ? [{ seq: state.seq++, type: 'TEXT' as const, content: afterText }]
          : []),
      ];

      return {
        paragraphs: [
          ...state.paragraphs.slice(0, idx),
          ...rebuilt,
          ...state.paragraphs.slice(idx + 1),
        ],
      };
    });
  },

  addPlaces: (places) =>
    set((state) => {
      const existingIds = new Set(state.places.map((p) => p.id));
      const newPlaces = places
        .filter((p) => !existingIds.has(p.id))
        .map((p) => ({ ...p, isAdded: true }));
      return { places: [...state.places, ...newPlaces] };
    }),

  removePlace: (id) =>
    set((state) => ({
      places: state.places.filter((p) => p.id !== id),
    })),
}));
