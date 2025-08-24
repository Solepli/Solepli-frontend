import React, { useRef } from 'react';
import { useShallow } from 'zustand/shallow';
import { useSolrouteWriteStore } from '../../store/solrouteWriteStore';
import IconAddButton from '../global/selectableIconSet/IconAddButton';
import { useInputAdjustScale } from '../../hooks/useInputAdjustScale';
const SolrouteTitle: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { title, icon, setTitle, setIcon } = useSolrouteWriteStore(
    useShallow((state) => ({
      title: state.title,
      icon: state.icon,
      setTitle: state.setTitle,
      setIcon: state.setIcon,
    }))
  );

  useInputAdjustScale(inputRef);
  return (
    <div className='w-full h-50 pt-8 pb-16 px-16 flex items-center gap-10'>
      <IconAddButton initIcon={icon} setSelectedIcon={setIcon} />
      <input
        ref={inputRef}
        type='text'
        onChange={(e) => setTitle(e.target.value)}
        value={title ?? ''}
        maxLength={25}
        placeholder='제목을 입력해주세요'
        className='placeholder:text-primary-500 placeholder:text-sm placeholder:font-normal placeholder:leading-tight
        text-primary-950 font-bold leading-tight outline-none ring-0 focus:outline-none focus:ring-0 bg-transparent border-none
        text-base scale-[var(--scale-16-14)] origin-top-left w-[calc(100%/var(--scale-16-14))]
        grow'
      />
    </div>
  );
};

export default SolrouteTitle;
