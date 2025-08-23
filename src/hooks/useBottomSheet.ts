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
  const grabOffset = useRef(0);
  const gestureAreaRef = useRef<'header' | 'content' | null>(null);

  const location = useLocation();

  const MIN = 58;
  const MAX = window.innerHeight - 70 - 60;
  const MID = window.innerHeight / 2;
  const CATAGORY = window.innerHeight - 270 - 60; // 카테고리 바텀시트 최대로 올렸을 때 높이

  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;

    if (location.pathname === '/map') {
      sheet.style.transform = `translateY(${CATAGORY}px)`;
      sheet.style.height = `${window.innerHeight - CATAGORY}px`;
    } else {
      sheet.style.transform = `translateY(${MID}px)`;
      sheet.style.height = `${window.innerHeight - MID}px`;
    }
  }, [CATAGORY, MID, location.pathname]);

  //현재 높이에서 가장 가까운 스냅 포인트 찾기
  const getClosestSnap = useCallback(
    (top: number) => {
      const snaps = [MIN, MID, MAX];
      let closestSnap = snaps[0];
      let minDist = Math.abs(top - snaps[0]);
      for (let i = 1; i < snaps.length; i++) {
        const dist = Math.abs(top - snaps[i]);
        if (dist < minDist) {
          minDist = dist;
          closestSnap = snaps[i];
        }
      }
      return closestSnap;
    },
    [MAX, MID]
  );

  //현재 위치에서 가장 가까운 스냅 포인트로 이동 및 높이 조정
  const updateHeightFromTop = useCallback(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    const top = sheet.getBoundingClientRect().top;
    // Snap to closest of MIN, MID, MAX
    const closestSnap = getClosestSnap(top);
    sheet.style.transform = `translateY(${closestSnap}px)`;
    sheet.style.height = `${window.innerHeight - closestSnap}px`;
  }, [getClosestSnap]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const sheet = sheetRef.current;
    const header = headerRef.current;
    const content = contentRef.current;
    if (!sheet || !header || !content) return;

    pointerDownTarget.current = e.target;
    dragStartYRef.current = e.clientY;
    const rect = sheet.getBoundingClientRect();

    e.currentTarget.setPointerCapture(e.pointerId);
    grabOffset.current = e.clientY - rect.y;

    const targetNode = e.target as Node;
    // Header gesture start
    if (headerRef.current.contains(targetNode)) {
      gestureAreaRef.current = 'header';
      return;
    }

    // Content gesture start
    if (contentRef.current.contains(targetNode)) {
      gestureAreaRef.current = 'content';
      startScrollTopRef.current = contentRef.current.scrollTop;
      return;
    }

    gestureAreaRef.current = null;
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
      const sheet = sheetRef.current;
      const content = contentRef.current;
      if (!sheet || !content) return;

      const moveSheet = () => {
        let newTop = e.clientY - grabOffset.current;
        if (newTop < MIN) newTop = MIN;
        if (newTop > MAX) newTop = MAX;
        sheet.style.height = '100dvh';
        sheet.style.transform = `translateY(${newTop}px)`;
      };

      // Move sheet by translateY based on grab offset
      if (gestureAreaRef.current === 'header') {
        moveSheet();
        return;
      }

      if (gestureAreaRef.current === 'content') {
        console.log('content move');
        const dy = e.clientY - dragStartYRef.current; // down:+ / up:-
        if (dy < 0) {
          // scroll down
          const max = Math.max(0, content.scrollHeight - content.clientHeight);
          let next = startScrollTopRef.current - dy; // up moves list up
          if (next < 0) next = 0;
          if (next > max) next = max;
          content.scrollTop = next;
          content.style.touchAction = 'pan-y';
        } else if (dy > 10 && content.scrollTop === 0) {
          //만약 스크롤이 최상단이면 시트 이동
          moveSheet();
        }
        return;
      }
    },
    [MAX]
  );

  const getNextSnap = useCallback(
    (currentTop: number, offset: number) => {
      // offset: +up / -down
      currentTop = getClosestSnap(currentTop);
      console.log('get next snap', currentTop, offset);
      if (offset >= 0) {
        // moving up
        if (currentTop === MAX) return MID;
        if (currentTop === MID) return MIN;
        return MIN;
      } else if (offset < 0) {
        // moving down
        if (currentTop === MIN) return MID;
        if (currentTop === MID) return MAX;
        return MAX;
      }
    },
    [MAX, MID, getClosestSnap]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!(e.currentTarget as Element).hasPointerCapture(e.pointerId)) return;
      const sheet = sheetRef.current;
      const content = contentRef.current;
      if (!sheet || !content) return;

      const sheetTop = sheet.getBoundingClientRect().top;

      const offset = dragStartYRef.current - e.clientY; // +up / -down
      if (Math.abs(offset) < 10) {
        return;
      }

      console.log('pointer up', sheet.getBoundingClientRect().top, offset);
      const nextSnap = getNextSnap(sheetTop, offset);

      if (gestureAreaRef.current === 'header') {
        console.log('next snap', nextSnap);
        sheet.style.transform = `translateY(${nextSnap}px)`;
        updateHeightFromTop();
      }

      if (
        gestureAreaRef.current === 'content' &&
        contentRef.current.scrollTop === 0 &&
        nextSnap !== sheetTop
      ) {
        sheet.style.transform = `translateY(${nextSnap}px)`;
        updateHeightFromTop();
        content.style.touchAction = 'none';
      }

      (e.currentTarget as Element).releasePointerCapture(e.pointerId);
      gestureAreaRef.current = null;
      pointerDownTarget.current = null;
    },
    [getNextSnap, updateHeightFromTop]
  );

  const onPointerCancel = useCallback(
    (e: React.PointerEvent) => {
      e.currentTarget.releasePointerCapture(e.pointerId);
      updateHeightFromTop();
      gestureAreaRef.current = null;
      pointerDownTarget.current = null;
    },
    [updateHeightFromTop]
  );

  const onContentScroll = useCallback((e: React.UIEvent) => {
    const el = e.currentTarget as HTMLElement;
    if (el.scrollTop === 0) {
      el.style.touchAction = 'none';
    } else {
      el.style.touchAction = 'pan-y';
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
