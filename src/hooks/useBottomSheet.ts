import { useRef, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export type BottomSheetController = {
  sheetRef: React.RefObject<HTMLDivElement>;
  headerRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  rootHandlers: {
    onPointerDown: (e: React.PointerEvent) => void;
    onPointerMove: (e: React.PointerEvent) => void;
    onPointerUp: (e: React.PointerEvent) => void;
    onPointerCancel: (e: React.PointerEvent) => void;
  };
  contentOnScroll: (e: React.UIEvent) => void;
};

export function useBottomSheet(): BottomSheetController {

  // Refs shared by header/content
  const sheetRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const headerRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const contentRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;

  const pointerDownTarget = useRef<EventTarget | null>(null);

  const dragStartYRef = useRef(0);
  const startScrollTopRef = useRef(0);
  const headerGrabOffset = useRef(0);
  const isFristContentTop = useRef(true);
  const gestureAreaRef = useRef<'header' | 'content' | null>(null);

  const location = useLocation();

  const MIN = 58;
  const MAX = window.innerHeight - 60 - 60;
  const MID = window.innerHeight / 2;
  const CATAGORY = window.innerHeight - 270 - 60; // 카테고리 바텀시트 최대로 올렸을 때 높이

  useEffect(() => {
    isFristContentTop.current = true;

    if (location.pathname === '/map') {
      const sheet = sheetRef.current;
      if (sheet) {
        sheet.style.transform = `translateY(${CATAGORY}px)`;
        sheet.style.height = `${window.innerHeight - CATAGORY}px`;
        console.log(sheet.getBoundingClientRect());
      }
    }
  }, [CATAGORY, location.pathname]);

  const updateHeightFromTop = useCallback(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    const rect = sheet.getBoundingClientRect();
    sheet.style.height = `${window.innerHeight - rect.top}px`;
  }, []);

  // ==== Unified root handlers (branch by ref.contains) ====
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    pointerDownTarget.current = e.target;
    dragStartYRef.current = e.clientY;

    const targetNode = e.target as Node;
    if (headerRef.current?.contains(targetNode)) {
      // Header gesture start
      gestureAreaRef.current = 'header';
      const sheet = sheetRef.current;
      if (sheet) {
        const rect = sheet.getBoundingClientRect();
        headerGrabOffset.current = e.clientY - rect.y;
        sheet.style.height = '100dvh';
      }
      (e.currentTarget as Element).setPointerCapture(e.pointerId);
      e.preventDefault(); // avoid text selection / native scroll during header drag
      return;
    }

    if (contentRef.current?.contains(targetNode)) {
      // Content gesture start
      gestureAreaRef.current = 'content';
      if (contentRef.current) {
        startScrollTopRef.current = contentRef.current.scrollTop;
      }
      (e.currentTarget as Element).setPointerCapture(e.pointerId);
      return;
    }

    gestureAreaRef.current = null;
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!(e.currentTarget as Element).hasPointerCapture(e.pointerId)) return;

      if (gestureAreaRef.current === 'header') {
        // Move sheet by translateY based on grab offset
        const sheet = sheetRef.current;
        if (!sheet) return;
        let newTop = e.clientY - headerGrabOffset.current;
        if (newTop < 0) newTop = 0;
        if (newTop > MAX) newTop = MAX;
        sheet.style.transform = `translateY(${newTop}px)`;
        return;
      }

      console.log(gestureAreaRef.current, isFristContentTop.current);
      if (gestureAreaRef.current === 'content' && isFristContentTop.current) {
        console.log('content move');
        // Optional: emulate vertical scroll based on pointer delta (absolute mapping)
        const el = contentRef.current;
        if (!el) return;
        const dy = e.clientY - dragStartYRef.current; // down:+ / up:-
        const max = Math.max(0, el.scrollHeight - el.clientHeight);
        let next = startScrollTopRef.current - dy; // up moves list up
        if (next < 0) next = 0;
        if (next > max) next = max;
        el.scrollTop = next;
        contentRef.current.style.touchAction = 'auto';
        return;
      }
    },
    [MAX]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!(e.currentTarget as Element).hasPointerCapture(e.pointerId)) return;

      if (gestureAreaRef.current === 'header') {
        // Snap by Y thresholds
        const sheet = sheetRef.current;
        if (sheet) {
          if (e.clientY < MID) sheet.style.transform = `translateY(${MIN}px)`;
          else if (e.clientY >= MID && e.clientY < MAX)
            sheet.style.transform = `translateY(${MID}px)`;
          else sheet.style.transform = `translateY(${MAX}px)`;
          updateHeightFromTop();
        }
      } else if (gestureAreaRef.current === 'content') {
        // Decide next snap based on motion from content
        const sheet = sheetRef.current;
        if (sheet) {
          const nowTop = sheet.getBoundingClientRect().top;
          const offset = dragStartYRef.current - e.clientY; // +up / -down
          let nextSnap = nowTop;
          if (offset > 0 && nowTop === MAX) nextSnap = MID;
          else if (offset < 0 && nowTop === MID) nextSnap = MAX;
          else if (offset < 0 && nowTop === MIN) nextSnap = MID;
          const changed = nextSnap !== nowTop;
          if (changed) {
            const target = `translateY(${nextSnap}px)`;
            if (sheet.style.transform !== target)
              sheet.style.transform = target;
            updateHeightFromTop();
            isFristContentTop.current = true;
          } else {
            isFristContentTop.current = false;
          }
        }
      }

      (e.currentTarget as Element).releasePointerCapture(e.pointerId);
      gestureAreaRef.current = null;
      pointerDownTarget.current = null;
    },
    [MAX, MID, MIN, updateHeightFromTop]
  );

  const onPointerCancel = useCallback((e: React.PointerEvent) => {
    (e.currentTarget as Element).releasePointerCapture(e.pointerId);
    gestureAreaRef.current = null;
    pointerDownTarget.current = null;
  }, []);

  const onContentScroll = useCallback((e: React.UIEvent) => {
    const el = e.currentTarget as HTMLElement;
    if (el.scrollTop === 0) {
      isFristContentTop.current = true;
      el.style.touchAction = 'none';
    } else {
      el.style.touchAction = 'auto';
    }
  }, []);

  return {
    sheetRef,
    headerRef,
    contentRef,
    rootHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
    contentOnScroll: onContentScroll,
  };
}
