// src/stores/useSollectWriteStore.ts
import { create } from 'zustand';
import { Paragraph, PlaceInfo } from '../types';

type SollectWriteState = {
  id?: number; //수정일 경우에만 id가 존재
  seq: number;
  focusSeq: number | null;
  focusTextarea?: HTMLTextAreaElement | null; // 포커스된 텍스트 영역을 저장할 수 있는 속성
  caretPosition?: number | null;
  title: string | null;
  thumbnail: Paragraph | null;
  paragraphs: Paragraph[];
  places: PlaceInfo[];
  getNextSeq: () => number; // 다음 시퀀스를 가져오는 함수
  setTitle: (title: string | null) => void; // 제목을 설정하는 함수
  setThumbnail: (thumbnail: Paragraph | null) => void; // 썸네일을 설정하는 함수
  addTextParagraph: (seq?: number) => void;
  addImageParagraph: (file: File, afterSeq?: number) => void;
  updateParagraphContent: (seq: number, content: string) => void;
  deleteParagraph: (seq: number) => void;
  setParagraphs: (paragraphs: Paragraph[]) => void;
  setFocus: (seq: number, el: HTMLTextAreaElement | null) => void;
  setCaretPosition: (caret: number) => void;
  insertImageAtCaret: (file: File, seq?:number, caret?: number | null) => void;
  addPlace: (place: PlaceInfo) => void; // 장소 ID 목록을 설정하는 함수
  removePlace: (id: number | null) => void; // 선택된 place 해제
  reset: () => void;
  flushParagraphsFromRefs: (refMap: Map<number, HTMLTextAreaElement>) => void;
};

export const useSollectWriteStore = create<SollectWriteState>((set) => ({
  seq: 1, // 시퀀스 0은 썸네일을 의미하기에 1부터 시작
  focusSeq: null, // 초기 포커스 시퀀스는 -1로 설정
  paragraphs: [],
  focusTextarea: null,
  title: null, // 제목을 저장하는 속성
  thumbnail: null, // 썸네일 이미지 URL을 저장하는 속성
  places: [], // 장소 ID 목록을 저장하는 속성

  setId: (id: number) => set(() => ({ id })),

  setTitle: (title) =>
    set(() => ({
      title,
    })),

  setThumbnail: (thumbnail) =>
    set(() => ({
      thumbnail,
    })),

  addTextParagraph: (seq) =>
    set((state) => {
      const newPara: Paragraph = {
        seq: state.seq++,
        type: 'TEXT',
        content: '',
      };

      if (seq === undefined) {
        return { paragraphs: [...state.paragraphs, newPara] };
      }

      const updated = [
        ...state.paragraphs.slice(0, seq),
        newPara,
        ...state.paragraphs.slice(seq + 1),
      ];
      return { paragraphs: updated };
    }),

  addImageParagraph: (file, afterSeq?) =>
    set((state) => {
      const newPara: Paragraph = {
        seq: state.seq++,
        type: 'IMAGE',
        content: file.name, // 파일 이름을 content에 저장
        imageUrl: URL.createObjectURL(file), // 이미지 URL 생성
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
  set((state) => {
    const index = state.paragraphs.findIndex((p) => p.seq === seq);
    if (index === -1) return {}; // 없는 seq면 변경 없음

    const updated = [...state.paragraphs];
    updated[index] = { ...updated[index], content };

    return { paragraphs: updated };
  }),

  deleteParagraph: (seq) =>
    set((state) => ({
      paragraphs: [...state.paragraphs].filter((p) => p.seq !== seq),
    })),

  setParagraphs: (paragraphs: Paragraph[]) => {
    set(() => ({
      paragraphs,
    }));
  },

  getNextSeq: () => {
  let next: number;
  set((state) => {
    next = state.seq;
    return { seq: state.seq + 1 };
  });
  return next!;
},

  setFocus: (seq, el) =>
    set(() => ({
      focusSeq: seq,
      focusTextarea: el,
    })),

  setCaretPosition: (caretPosition: number | null) =>
    set(() => ({ caretPosition })),

  insertImageAtCaret: (file, ) => {
    set((state) => {
      // focus된 텍스트 영역이 없으면 새 단락 추가
      if (!state.focusTextarea) {
        state.addImageParagraph(file);
        return {};
      }

      const idx = state.paragraphs.findIndex((p) => p.seq === state.focusSeq);
      const caret = state.focusTextarea?.selectionStart ?? null;
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
        content: file.name, // 이미지 URL 생성
        file: file, // 파일 정보 저장
        imageUrl: URL.createObjectURL(file), // 이미지 URL 생성
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

  addPlace: (place) =>
    set((state) => {
      const isExisted = state.places.some((p) => p.id === place.id);
      if (isExisted) return {};
      return { places: [...state.places, place] };
    }),

  removePlace: (id) =>
    set((state) => ({
      places: [...state.places].filter((p) => p.id !== id),
    })),

  flushParagraphsFromRefs: (refMap: Map<number, HTMLTextAreaElement>) => {
    set((state) => {
      const updated = state.paragraphs.map((p) => ({
        ...p,
        content: refMap.get(p.seq)?.value ?? p.content,
      }));
      return { paragraphs: updated };
    });
  },

  reset: () =>
    set({
      seq: 1, // 시퀀스 0은 썸네일을 의미하기에 1부터 시작
      focusSeq: null, // 초기 포커스 시퀀스는 -1로 설정
      paragraphs: [],
      focusTextarea: null,
      title: null, // 제목을 저장하는 속성
      thumbnail: null, // 썸네일 이미지 URL을 저장하는 속성
      places: [], // 장소 ID 목록을 저장하는 속성
    }),
}));
