import React from 'react';
import SollectPhoto from './SollectPhoto';
import { SollectListProps } from '../../interface';
import { useSollectStore } from '../../store/sollectStore';

const SollectList: React.FC<SollectListProps> = ({
  horizontal,
  customStyle,
  isMine
}) => {
  const { sollects } = useSollectStore();
  let style = customStyle;

  if (horizontal) {
    style += ' px-16 flex overflow-x-scroll flex-row gap-4 overflow-y-auto';
  } else {
    style += ' gap-12 overflow-y-auto grid grid-cols-2';
  }

  return (
    <div className='flex justify-center'>
      <div className={style}>
        {sollects.map((sollect) => {
          return <SollectPhoto sollect={sollect} key={sollect.sollectId} isMine={isMine}/>;
        })}
      </div>
    </div>
  );
};

export default SollectList;
