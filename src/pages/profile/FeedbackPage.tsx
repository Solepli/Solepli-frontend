import React, { useState } from 'react';
import TitleHeader from '../../components/global/TitleHeader';
import { useNavigate } from 'react-router-dom';
import { postFeedback } from '../../api/profileApi';
import LargeButton from '../../components/global/LargeButton';

const FeedbackPage = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async()=>{
    await postFeedback(feedback);
    navigate('/profile')
  }
  return (
    <div className='w-full'>
      <TitleHeader title='의견 남기기' onClick={() => navigate(-1)} center />
      <div className='pt-58'></div>
      <div className='p-16'>
        <h1 className='text-primary-950 font-semibold mb-8'>
          쏠플리가 더 나아갈 수 있도록 의견을 들려주세요!
        </h1>
        <p className='text-primary-950 text-sm'>
          여러분의 목소리에 귀기울이고 있어요.
        </p>
        <p className='text-primary-950 text-sm mb-16'>
          혼자서도 즐거운 공간, 함께 만들어가요.
        </p>

        <div className='border-1 border-primary-100 px-12 py-8 rounded-xl bg-primary-50 self-stretch w-full mb-24'>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder='의견을 남겨주세요!'
            className='text-primary-950 placeholder:text-primary-500 focus:outline-none focus:ring-0 resize-none self-stretch] text-sm min-h-86 w-full'
          />
          <div className='self-stretch text-secondary-500 text-right text-xs'>
            ({feedback.length}/1000)
          </div>
        </div>
        <LargeButton text="전송" onClick={handleSubmit}/>
      </div>
    </div>
  );
};

export default FeedbackPage;
