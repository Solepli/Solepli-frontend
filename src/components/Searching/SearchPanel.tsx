import React from 'react';
import RecentSearchList from './RecentSearchList';
import AutoSearchList from './AutoSearchList';
import { useSearchStore } from '../../store/searchStore';

const SearchPanel: React.FC = () => {
  const { inputValue } = useSearchStore();
  const fromSollect = window.location.pathname.includes('/sollect/search');

  return (
    <div className='w-full'>
      {fromSollect && inputValue && <RecentSearchList />}
      {!inputValue && <RecentSearchList />}
      {inputValue && !fromSollect && <AutoSearchList />}
    </div>
  );
};

export default SearchPanel;
