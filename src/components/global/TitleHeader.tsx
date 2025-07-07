import React from 'react';
import Arrow from '../../assets/arrowLeft.svg?react';
import { TitleHeaderProps } from '../../interface';
import { selectableIconMap } from '../../utils/icon';

const TitleHeader: React.FC<
  TitleHeaderProps & { children?: React.ReactNode }
> = ({ title, onClick, center, iconId, children }) => {
  const Icon = iconId ? selectableIconMap[iconId] : null;
  return (
    <header
      className={`w-full flex items-center py-8 fixed z-101 bg-white top-0 ${center ? 'text-center' : ''}`}>
      <div className='p-9 flex items-center justify-content' onClick={onClick}>
        <Arrow />
      </div>
      {/* iconId가 있다면 아이콘을 표시 */}
      <div className='text-primary-950 text-base font-bold leading-normal w-full flex items-center justify-center'>
        {Icon && <Icon className='bg-primary-50 p-2 rounded mr-8' />}
        {title}
      </div>
      {/* 헤더 오른쪽에 올 컴포넌트를 자식으로 받음 */}
      <div className='w-42'>{children}</div>
    </header>
  );
};

export default TitleHeader;
