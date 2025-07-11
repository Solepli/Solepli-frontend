import React from 'react';
import SollectPhoto from './SollectPhoto';
import { SollectListProps } from '../../interface';
import { useSollectStore } from '../../store/sollectStore';

const SollectList: React.FC<SollectListProps> = ({
  horizontal,
  customStyle,
  isMine,
  recommendSollect,
}) => {
  const { sollects } = useSollectStore();
  let style = customStyle;

  if (horizontal) {
    style += ' px-16 flex overflow-x-scroll flex-row gap-4 overflow-y-auto';
  } else {
    style +=
      ' px-16 gap-12 overflow-y-auto grid grid-cols-2 w-full w-max-100vw';
  }

  return (
    <div className={`flex ${!horizontal && 'justify-center'}`}>
      <div className={style}>
        {recommendSollect &&
          recommendSollect.map((sollect) => {
            return (
              <SollectPhoto
                horizontal={horizontal}
                sollect={sollect}
                key={sollect.sollectId}
                isMine={isMine}
              />
            );
          })}
        {!recommendSollect &&
          sollects.map((sollect) => {
            return (
              <SollectPhoto
                horizontal={horizontal}
                sollect={sollect}
                key={sollect.sollectId}
                isMine={isMine}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SollectList;
