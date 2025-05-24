/* eslint-disable @typescript-eslint/no-explicit-any */

export const initCluster = (
  markerArray: naver.maps.Marker[],
  map: naver.maps.Map
) => {
  const htmlMarker1 = {
    url: './food_Cluster.png',
    size: new naver.maps.Size(40, 40),
    anchor: new naver.maps.Point(20, 20),
  };

  const markerClustering = new MarkerClustering({
    map,
    markers: markerArray,
    disableClickZoom: false,
    minClusterSize: 2,
    maxZoom: 20,
    gridSize: 120,
    icons: [htmlMarker1],
    indexGenerator: [10],
    averageCenter: true,
    stylingFunction: (clusterMarker: any, count: number) => {
      const firstChild = clusterMarker
        .getElement()
        .querySelector('div:first-child');
      if (firstChild) {
        firstChild.innerHTML = count;
      }
    },
  });

  return markerClustering;
};
