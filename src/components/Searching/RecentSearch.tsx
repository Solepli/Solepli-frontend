import React from 'react';
import xBottonCircle from '../../assets/xButtonCircle.svg';
import ClockFill from '../../assets/clockFill.svg?react';
import XButtonCircle from '../XButtonCircle';
import { deleteRecentSearchWords } from '../../api/searchApi';
import { useQueryClient } from '@tanstack/react-query';

interface RecentSearchTextProps {
  text: string;
  mode: string;
}

const RecentSearch: React.FC<RecentSearchTextProps> = ({ text, mode }) => {
  const queryClient = useQueryClient();

  async function onClickDeleteRow() {
    await deleteRecentSearchWords(mode, text);
    queryClient.invalidateQueries({ queryKey: ['recentSearchWords'] });
  }

  return (
    <div className='flex pt-8 pl-12 pr-8 pb-0 items-center gap-10'>
      <div className='flex h-36 items-center gap-4 flex-[1_0_0] justify-start'>
        <div className='flex items-center gap-4 flex-[1_0_0]'>
          <ClockFill />
          <div className='flex-[1_0_0] text-[12px] leading-[120%] tracking-[-0.18px] text-primary-950'>
            {text}
          </div>
        </div>
      
        <XButtonCircle onClickFunc={() => onClickDeleteRow()} />
      </div>
    </div>
  );
};

export default RecentSearch;
