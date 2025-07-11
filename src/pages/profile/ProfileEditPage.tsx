import { useEffect, useState } from 'react';
import SollectWriteHeader from '../../components/Sollect/SollectWrite/SollectWriteHeader';
import addProfileImg from '../../assets/addProfileImg.svg';
import useAuthStore from '../../store/authStore';
import { useShallow } from 'zustand/shallow';
import { patchProfile } from '../../api/profileApi';
import google from '../../assets/google.svg';
import kakaoTalk from '../../assets/kakaoTalk.svg';
import naver from '../../assets/naver.svg';
import FilePicker from '../../components/global/FilePicker';
import NicknameInput from '../../components/Profile/NicknameInput';

const ProfileEditPage = () => {
  const { nickname, profileImageUrl, loginType } = useAuthStore(
    useShallow((state) => ({
      nickname: state.nickname,
      profileImageUrl: state.profileImageUrl,
      loginType: state.loginType,
    }))
  );
  const [nicknameInput, setNicknameInput] = useState(nickname);
  const [profileFiles, setProfileFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string>(profileImageUrl);

  useEffect(() => {
    if (profileFiles.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(profileFiles[0]);
    } else {
      setPreviewUrl(profileImageUrl);
    }
  }, [profileFiles, profileImageUrl]);

  const handleSubmit = async () => {
    try {
      await patchProfile({ nickname: nicknameInput }, profileFiles[0]);
      window.history.back();
    } catch (e) {
      console.error('프로필 수정 실패:', e);
    }
  };

  return (
    <div>
      <SollectWriteHeader
        leftText='취소'
        rightText='저장'
        title='프로필 수정'
        onLeft={() => window.history.back()}
        onRight={handleSubmit}
      />

      {/* profile img */}
      <div className='flex justify-center items-center py-25'>
        <div className='relative'>
          <img
            src={previewUrl}
            className='w-100 h-100 relative rounded-full object-cover'
            alt='img'
          />
          {/* 프로필 사진 수정 버튼 */}
          <FilePicker
            files={profileFiles}
            onChange={setProfileFiles}
            multiple={false}
            maxCount={1}>
            {(open) => (
              <img
                src={addProfileImg}
                alt='addProfileImg'
                onClick={open}
                className='absolute bottom-[-15px] right-[-15px]'
              />
            )}
          </FilePicker>
        </div>
      </div>

      <div className='py-24 px-16 flex flex-col gap-40'>
        {/* 닉네임 */}
        <div>
          <p className='font-bold mb-4'>
            닉네임 <span className='text-error'>*</span>
          </p>
          <NicknameInput
            setNicknameInput={setNicknameInput}
            nicknameInput={nicknameInput}
          />
        </div>

        {/* 계정 */}
        <div>
          <p className='font-bold mb-4'>연동 소셜 계정</p>
          <div className='flex items-center gap-4 text-grayScale-500 py-4 border-b border-grayScale-200 text-sm'>
            {loginType === 'NAVER' && (
              <>
                <img src={naver} alt='naver' />
                <p>naver</p>
              </>
            )}
            {loginType === 'GOOGLE' && (
              <>
                <img src={google} alt='google' />
                <p>google</p>
              </>
            )}
            {loginType === 'KAKAO' && (
              <>
                <img src={kakaoTalk} alt='kakaoTalk' />
                <p>kakao</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
