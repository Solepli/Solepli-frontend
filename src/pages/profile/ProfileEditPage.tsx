import React, { useState } from 'react'
import SollectWriteHeader from '../../components/Sollect/SollectWrite/SollectWriteHeader'
import addProfileImg from '../../assets/addProfileImg.svg';

const ProfileEditPage = () => {
  const [nickname, setNickname] = useState("");
  return (
    <div>
      <SollectWriteHeader
        leftText='취소'
        rightText='저장'
        title='프로필 수정'
        onLeft={() => window.history.back()}
        onRight={() => console.log('완료 버튼 클릭')}
      />

      {/* profile img */}
      <div className='flex justify-center items-center py-25'>
        <div
          style={{
            backgroundImage: `url(${'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*'})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
          className='w-100 h-100 relative rounded-full'>
          <img
            src={addProfileImg}
            alt=''
            className='absolute bottom-[-15px] right-[-15px]'
          />
        </div>
      </div>

      <div className='py-24 px-16 flex flex-col gap-4'>
        {/* 닉네임 */}
        <p>닉네임*</p>
        <div className='flex justify-between border-b-1 border-primary-200'>
          <input
            type='text'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className='w-300'
          />
          <span className='text-sm text-primary-500'>(17/20)</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditPage