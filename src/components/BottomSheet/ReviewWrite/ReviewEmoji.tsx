import React from 'react';
import EmojiGood from '../../../assets/emojiGood.svg?react';
import EmojiCheckedGood from '../../../assets/emojiCheckedGood.svg?react';
import EmojiBad from '../../../assets/emojiBad.svg?react';
import EmojiCheckedBad from '../../../assets/emojiCheckedBad.svg?react';
import useEmojiStore from '../../../store/useEmojiStore';

const ReviewEmoji: React.FC = () => {
  const { selectedEmoji, selectEmoji } = useEmojiStore();
  return (
    <div className='self-stretch flex flex-col items-center justify-center pt-0 px-0 pb-[40px] border-primary-100 border-[0_0_1px]'>
      <div className='self-stretch flex flex-row items-center justify-center pt-0 px-0 pb-[8px]'>
        <div className="text-[14px] leading-[120%] tracking-[-0.35px] font-[600] text-primary-900 text-center whitespace-nowrap">
          혼자 또 방문할 의향이 있나요?
        </div>
      </div>
      <div className='self-stretch flex flex-row items-center justify-center gap-[12px]'>
        <div className='flex flex-row items-center justify-center p-[4px]'>
          <div className='p-[2px] w-[32px] h-[32px]' onClick={() => selectEmoji('good')}>
            {selectedEmoji === 'good' ? <EmojiCheckedGood /> : <EmojiGood />}
          </div>
        </div>
        <div className='flex flex-row items-center justify-center p-[4px]'>
          <div className='p-[2px] w-[32px] h-[32px]' onClick={() => selectEmoji('bad')}>
            {selectedEmoji === 'bad' ? <EmojiCheckedBad /> : <EmojiBad />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewEmoji;
