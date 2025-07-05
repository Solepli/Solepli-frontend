import React from 'react';
import { SollectGroupProps } from '../../../interface';
import SollectList from '../SollectList';

const SollectGroup: React.FC<SollectGroupProps> = ({ sollects, title }) => {
  return (
    <div className='pb-30'>
      <h3 className='py-8 pl-20 text-primary-950 text-lg font-bold'>{title}</h3>

      <SollectList recommendSollect={sollects} horizontal />
    </div>
  );
};

export default SollectGroup;
