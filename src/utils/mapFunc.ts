import { NavigateFunction } from 'react-router-dom';
import { MarkerInfoType } from '../types';
import { IconMarkerMap } from './icon';
import MarkedMarker from '../assets/marker/markedMarker.svg?url';

// 마커를 객체로 생성 후 반환 (마커의 id List도 별도로 반환)
export const createMarkerObjectList = (
  markers: MarkerInfoType[]
): {
  objectList: naver.maps.Marker[];
  idList: number[];
} => {
  const objectList: naver.maps.Marker[] = [];
  const idList: number[] = [];

  if (!markers || markers.length === 0) return { objectList, idList };

  markers?.forEach((m: MarkerInfoType) => {
    const position = new naver.maps.LatLng(m.latitude, m.longitude);
    const icon = IconMarkerMap[m.category];
    const marker = new naver.maps.Marker({
      position: position,
      icon: {
        url: m.isMarked ? MarkedMarker : icon,
        anchor: naver.maps.Position.CENTER,
      },
    });
    objectList.push(marker);
    idList.push(m.id);
  });

  return { objectList, idList };
};

// 마커 객체 바운드 생성 후 반환 함수
export const createMarkersBounds = (
  objectList: naver.maps.Marker[]
): naver.maps.LatLngBounds | undefined => {
  if (!objectList.length) return;

  const bounds = new naver.maps.LatLngBounds(
    new naver.maps.LatLng(0, 0),
    new naver.maps.LatLng(0, 0)
  );

  objectList.forEach((m: naver.maps.Marker) => {
    const position = new naver.maps.LatLng(
      m.getPosition().y,
      m.getPosition().x
    );
    bounds.extend(position);
  });

  return bounds;
};

// 픽셀 당 실제 거리 확인 함수
/**
 * https://www.ncloud-forums.com/topic/141/
 */
export const checkDistance = (map: naver.maps.Map) => {
  const p1 = new naver.maps.Point(0, 0),
    p2 = new naver.maps.Point(1, 0);
  const proj = map.getProjection(),
    c1 = proj.fromOffsetToCoord(p1),
    c2 = proj.fromOffsetToCoord(p2),
    dist1px = proj.getDistance(c1, c2);

  console.log('1px:', dist1px, 'meter');
};

// 좌표 변환 함수: lng/lat -> [0~1] Mercator 좌표
/**
 * 참고
 * https://github.com/maplibre/maplibre-gl-js/blob/fd0dcd710c565b01861606e7e6ea90316a3f7e20/src/geo/projection/mercator_utils.ts#L48
 * https://github.com/maplibre/maplibre-gl-js/blob/main/src/geo/mercator_coordinate.ts#L17
 * https://github.com/maplibre/maplibre-gl-js/blob/main/src/geo/mercator_coordinate.ts#L21
 */
function lngLatToMercator([lng, lat]: [number, number]): [number, number] {
  const clampedLat = Math.max(-85.0511, Math.min(85.0511, lat));
  const x = (lng + 180) / 360;
  const y =
    0.5 -
    Math.log(
      (1 + Math.sin((clampedLat * Math.PI) / 180)) /
        (1 - Math.sin((clampedLat * Math.PI) / 180))
    ) /
      (4 * Math.PI);
  return [x, y];
}

// 새로운 bounds의 zoom level 계산 함수
function calculateZoom(
  bounds: naver.maps.Bounds,
  width: number,
  height: number
) {
  const [x1, y1] = lngLatToMercator([bounds.getMax().x, bounds.getMax().y]);
  const [x2, y2] = lngLatToMercator([bounds.getMin().x, bounds.getMin().y]);

  // 크기 계산 (절댓값)
  const boundsWidth = Math.abs(x2 - x1);
  const boundsHeight = Math.abs(y2 - y1);

  // bounds의 범위가 없을 경우 (좌표 1개일 때) 기본 zoom을 14로 반환
  if (boundsWidth === 0 || boundsHeight === 0) {
    return 14;
  }

  // 가로/세로 비율로 해당 worldSize 계산
  /**
   * tileSize * 2^zoom = worldSize (zoom 0에서 tileSize)
   * boundsWidth(0~1) * worldSize = bounds가 차지하는 픽셀
   * availableWidth / boundsWidthInPixels = scale 비율
   * log2(mapWidth / (tileSize * boundsWidth)) = zoom
   */
  const tileSize = 512; // 지도를 그리는 타일 사이즈 (MapLibre GL JS 기본값)
  const zoomX = Math.log2(width / (tileSize * boundsWidth));
  const zoomY = Math.log2(height / (tileSize * boundsHeight));

  // 둘 중 작은 쪽이 bounds를 완전히 담음 (tight fit)
  const openStreetMapZoom = Math.min(zoomX, zoomY);
  const newZoom = Math.floor(openStreetMapZoom);

  // newZoom이 범위 밖일 경우 undefined 반환
  if (newZoom < 5 || newZoom > 20) {
    return;
  }

  return newZoom;
}

// projection을 통한 bounds 확장 함수
export const expandBounds = (
  bounds: naver.maps.LatLngBounds | undefined,
  mapRef: React.RefObject<naver.maps.Map | null>
): naver.maps.LatLngBounds | undefined => {
  if (!bounds || !mapRef.current) return;

  // 단계 1 : 새로운 bounds의 zoom level 계산하기
  const zoom = calculateZoom(
    bounds,
    mapRef.current.getSize().width,
    mapRef.current.getSize().height
  );
  console.log('calculated zoom:', zoom);

  // zoom을 계산할 수 없을 경우 bounds를 확장하지 않고 기존 bounds 반환
  if (!zoom) {
    return bounds;
  }

  // 단계 2 : 계산한 zoom level과 비례하게 bounds 확장하기

  // projection 객체
  const projection = mapRef.current.getProjection();

  // scale (단위: * 10,000)
  /**
   * 네이버는 Static Map에서 20 레벨로 조회 시, 참고 사이트에서의 21레벨 기준으로 축척을 계산함.
   * 출처 : https://www.ncloud-forums.com/topic/141/
   * 참고 : https://wiki.openstreetmap.org/wiki/Zoom_levels
   */
  const scale: { [key: number]: number } = {
    5: 1000.0,
    6: 400.0,
    7: 200.0,
    8: 100.0,
    9: 50.0,
    10: 25.0,
    11: 15.0,
    12: 7.0,
    13: 3.5,
    14: 1.5,
    15: 0.8,
    16: 0.4,
    17: 0.2,
    18: 0.1,
    19: 0.05,
    20: 0.025,
  };

  // bounds의 Coord(Lat, Lng)
  const lowerLeft = bounds.getMin();
  const upperRight = bounds.getMax();

  // Coord to Pixel: 좌측 상단을 (0,0)으로 하는 픽셀 좌표
  const minPixel = projection.fromCoordToOffset(lowerLeft);
  const maxPixel = projection.fromCoordToOffset(upperRight);

  // Pixel 확장
  const px = 13;
  const newMinPixelX = minPixel.x - px * scale[zoom];
  const newMinPixelY = minPixel.y + px * scale[zoom];
  const newMaxPixelX = maxPixel.x + px * scale[zoom];
  const newMaxPixelY = maxPixel.y - px * scale[zoom];

  // Pixel to Coord
  const newLowerLeftCoord = projection.fromOffsetToCoord(
    new naver.maps.Point(newMinPixelX, newMinPixelY)
  );
  const newUpperRightCoord = projection.fromOffsetToCoord(
    new naver.maps.Point(newMaxPixelX, newMaxPixelY)
  );

  // Coord to LatLng
  const newLowerLeft = new naver.maps.LatLng(
    newLowerLeftCoord.y,
    newLowerLeftCoord.x
  );
  const newUpperRight = new naver.maps.LatLng(
    newUpperRightCoord.y,
    newUpperRightCoord.x
  );

  // newBounds
  const newBounds = new naver.maps.LatLngBounds(newLowerLeft, newUpperRight);

  return newBounds;
};

// 지도 생성 함수
export const initMap = (
  divRef: React.RefObject<HTMLDivElement | null>,
  mapRef: React.RefObject<naver.maps.Map | null>,
  isGl: boolean = true,
  isBounds: boolean = false,
  lastBounds?: naver.maps.Bounds | undefined,
  lastZoom?: number,
  center?: naver.maps.LatLng
) => {
  if (!divRef.current) return;

  const MapOptions = {
    zoom: lastZoom,
    center: lastBounds?.getCenter() || center,
    gl: isGl,
    customStyleId: import.meta.env.VITE_MAP_STYLE_ID,
    scaleControl: false,
    mapDataControl: false,
    logoControl: false,
    logoControlOptions: {
      position: naver.maps.Position.RIGHT_TOP,
    },
    keyboardShortcuts: false,
    disableKineticPan: false,
  } as naver.maps.MapOptions & {
    bounds?: naver.maps.Bounds;
  };
  // 조건부로 bounds 추가 (center, zoom 무시)
  if (isBounds && lastBounds) {
    MapOptions.bounds = lastBounds;
  }

  // divRef에 지도를 생성
  const map = new naver.maps.Map(divRef.current, MapOptions);
  // mapRef에 객체 지정
  mapRef.current = map;

  return map;
};

// 마커 추가 함수
export const addMarkers = (
  mapRef: React.RefObject<naver.maps.Map | null>,
  objectList: naver.maps.Marker[] | null,
  isClickAble: boolean = false,
  markerIdList?: number[] | null,
  navigate?: NavigateFunction,
  fitCenterLocation?: (lat: number, lng: number) => void
) => {
  if (!mapRef.current || !objectList) return;

  objectList.forEach((m: naver.maps.Marker, index: number) => {
    // 지도에 마커 객체 설정
    m.setMap(mapRef.current);

    // 이벤트 리스너 (마커 클릭)
    if (!isClickAble || !markerIdList || !navigate || !fitCenterLocation)
      return;
    naver.maps.Event.addListener(m, 'click', () => {
      fitCenterLocation(m.getPosition().y, m.getPosition().x);

      // todo : improve
      const isSame = window.location.pathname.includes(
        `/map/detail/${markerIdList[index]}`
      );

      if (!isSame) {
        navigate(`/map/detail/${markerIdList[index]}`);
      }
    });
  });

  // const clustering = initCluster(markerObjectList, mapRef.current!);
  /* todo : naver cloud api map forum에서 클러스터별 최상단 마커의 종류에 따른 (클러스터 아이콘) 설정이 가능하다고 답변받을시
   * clustering.setIcons([clusterIconList[카테고리]])를 사용하여 클러스터 아이콘 지정 구현
   */
};

// 마커 제거 함수
export const deleteMarkers = (objectList: naver.maps.Marker[] | null) => {
  if (!objectList) return;

  objectList.forEach((m) => {
    m.setMap(null);
  });
};
