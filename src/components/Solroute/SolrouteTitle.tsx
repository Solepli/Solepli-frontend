import React from 'react';
import { useShallow } from 'zustand/shallow';
import { useSolrouteWriteStore } from '../../store/solrouteWriteStore';
import IconAddButton from '../global/selectableIconSet/IconAddButton';
const SolrouteTitle: React.FC = () => {
  const { title, icon, setTitle, setIcon } = useSolrouteWriteStore(
    useShallow((state) => ({
      title: state.title,
      icon: state.icon,
      setTitle: state.setTitle,
      setIcon: state.setIcon,
    })),
  );
  return (
    <div className='w-full h-50 pt-8 pb-16 px-16 flex items-center gap-10'>
      <IconAddButton initIcon={icon} setSelectedIcon={setIcon} />
      <input
        type='text'
        onChange={(e) => setTitle(e.target.value)}
        value={title ?? ''}
        placeholder='코스명을 입력해주세요'
        className='flex-1 placeholder:text-primary-500 placeholder:text-sm placeholder:font-normal placeholder:leading-tight
        text-primary-950 text-sm font-bold leading-tight outline-none ring-0 focus:outline-none focus:ring-0 bg-transparent border-none'
      />
    </div>
  );
};

export default SolrouteTitle;
