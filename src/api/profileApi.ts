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
