import { useEffect } from "react";
import Hammer from "hammerjs";
import { useNavigate } from "react-router-dom";

interface Options {
  excludedSelector?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export function useGlobalSwipeNavigation({
  excludedSelector = ".no-global-swipe",
  onSwipeLeft,
  onSwipeRight,
}: Options = {}) {
  const navigate = useNavigate();

  useEffect(() => {
    const hammer = new Hammer(document.body);
    hammer.get("swipe").set({ direction: Hammer.DIRECTION_HORIZONTAL });

    hammer.on("swipeleft swiperight", (e) => {
      if (e.target instanceof Element && e.target.closest(excludedSelector)) {
        return;
      }

      if (e.type === "swipeleft") {
        if (onSwipeLeft) onSwipeLeft();
        else navigate(1); // 앞으로 가기
      } else if (e.type === "swiperight") {
        if (onSwipeRight) onSwipeRight();
        else navigate(-1); // 뒤로 가기
      }
    });

    return () => {
      hammer.destroy();
    };
  }, [excludedSelector, onSwipeLeft, onSwipeRight, navigate]);
}
