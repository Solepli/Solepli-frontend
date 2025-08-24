export const getCenterFromBounds = (
  bounds: naver.maps.Bounds
): { centerY: number; centerX: number } => {
  const min = bounds?.getMin?.();
  const max = bounds?.getMax?.();
  const centerY = min && max ? (min.y + max.y) / 2 : 0;
  const centerX = min && max ? (min.x + max.x) / 2 : 0;

  return { centerY, centerX };
};
