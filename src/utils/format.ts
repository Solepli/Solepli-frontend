export const formatDistance = (distance: number): string => {
  if (distance < 1000) {
    return `${distance}m`;
  }

  const km = distance / 1000;
  return Number.isInteger(km)
    ? `${km}km`
    : `${km.toFixed(3).replace(/\.?0+$/, '')}km`;
};
