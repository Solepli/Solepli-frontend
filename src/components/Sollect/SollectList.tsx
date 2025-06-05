import React from 'react';
import SollectPhoto from './SollectPhoto';
import { SollectListProps } from '../../interface';

const SollectList: React.FC<SollectListProps> = ({ horizontal, sollects, customStyle }) => {
  let style = customStyle;
  if (horizontal) {
    style += ' px-16 flex overflow-x-scroll flex-row gap-4';
  } else {
    style += ' flex flex-wrap gap-12 justify-center';
  }
  return (
    <div className={style}>
      {sollects.map((sollect) => {
        return <SollectPhoto sollect={sollect} key={sollect.sollectId} />;
      })}
    </div>
  );
};

export default SollectList;
