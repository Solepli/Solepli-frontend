/* eslint-disable @typescript-eslint/no-explicit-any */

export const initCluster = (
  markerArray: naver.maps.Marker[],
  map: naver.maps.Map
) => {
  const markerClustering = new MarkerClustering({
    map,
    markers: markerArray,
    disableClickZoom: false,
    minClusterSize: 2,
    maxZoom: 20,
    gridSize: 120,
    icons: [
      {
        url: '/src/assets/cluster/defaultCluster.svg',
      },
    ],
    averageCenter: true,
  });

  return markerClustering;
};
