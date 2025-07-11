import { PlaceRequest } from '../types';
import { privateAxios } from './axios';
import { ENDPOINT } from './urls';

export const fetchProfile = async () => {
  try {
    const res = await privateAxios.post(ENDPOINT.PROFILE);
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};

export const patchProfile = async (
  profileData: { nickname: string },
  imageFile?: File
) => {
  const formData = new FormData();
  const jsonBlob = new Blob([JSON.stringify(profileData)], {
    type: 'application/json',
  });
  formData.append('request', jsonBlob);

  if (imageFile) {
    formData.append('file', imageFile);
  }

  try {
    const res = await privateAxios.patch(ENDPOINT.PROFILE, formData);
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};

// 닉네임 검증 필요

// 공지사항 목록 조회
export const fetchAnnouncement = async () => {
  try {
    const res = await privateAxios.get(ENDPOINT.ANNOUNCEMENT);
    console.log(res.data.data);
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};

// 공지사항 상세 조회 해야됨
export const fetchAnnouncementDetail = async (announcementId: number) => {
  try {
    const res = await privateAxios.get(
      ENDPOINT.ANNOUNCEMENT_ID(announcementId)
    );
    console.log(res.data.data);
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};

export const postFeedback = async (feedback: string) => {
  try {
    const res = await privateAxios.post(ENDPOINT.FEEDBACK, {
      feedback: feedback,
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const postPlaceRequest = async (requestBody: PlaceRequest) => {
  try {
    const res = await privateAxios.post(ENDPOINT.REQUEST_PLACE, requestBody);
    console.log(res);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const deleteUser = async () => {
  try {
    const res = await privateAxios.delete(ENDPOINT.PROFILE_DELETE);
    console.log(res);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const validateNickname = async (nickname: string) => {
  try {
    const res = await privateAxios.get(ENDPOINT.PROFILE_VALIDATE_NICKNAME, {
      params: {
        nickname,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (e: any) {
    return { success: false, message: e.response?.data?.message || '오류' };
  }
};
