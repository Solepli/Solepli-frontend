import { publicAxios } from './axios';
import { privateAxios } from './axios';
import { ENDPOINT } from './urls';

//쏠렉트 수정시 장소 값을 가져오기 위해 사용됨
//추후 쏠렉트 장소 리스트 가져오는 api 생성 후 이로 대체할 예정
export const getPlaceInfo = async (id: number) => {
  const res = await publicAxios.get(ENDPOINT.SOLROUTE_PLACE(id));
  const place = res.data.data;

  const placeInfo = {
    ...place,
    id: place.placeId,
    name: place.placeName,
  };

  return placeInfo;
};

export const fetchSolroutes = async () => {
  try {
    const res = await privateAxios.get(ENDPOINT.SOLROUTE.GET);
    return res.data.data;
  } catch (e) {
    console.error(e);
  }
};

export const fetchSolroute = async (id: number) => {
  try {
    const res = await privateAxios.get(ENDPOINT.SOLROUTE.GET_DETAIL(id));
    return res.data.data;
  } catch (e) {
    console.error(e);
  }
};

// export const postSolroute = async (payload) => {
//   try {
//     await privateAxios.post(ENDPOINT.SOLROUTE.POST, {payload});
//   } catch (e) {
//     console.error(e);
//   }
// };

export const deleteSolroute = async (id: number) => {
  try {
    await privateAxios.delete(ENDPOINT.SOLROUTE.DELETE(id));
  } catch (e) {
    console.log(e);
  }
};

export const patchStatus = async (id: number) => {
  try {
    await privateAxios.patch(ENDPOINT.SOLROUTE_STATUS(id));
  } catch (e) {
    console.error(e);
  }
};
