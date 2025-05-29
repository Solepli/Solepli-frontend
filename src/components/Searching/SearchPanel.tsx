import React from 'react';
import RecentSearchList from './RecentSearchList';
import RelatedSearch from './RelatedSearchList';
import { useSearchStore } from '../../store/searchStore';

const SearchPanel: React.FC = () => {
  const { inputValue } = useSearchStore();
  const fromSollect = window.location.pathname.includes('/sollect/search');

  return (
    <div className='w-full'>
      {fromSollect && inputValue && <RecentSearchList />}
      {!inputValue && <RecentSearchList />}
      {inputValue && !fromSollect && <RelatedSearch />}
    </div>
  );
};

export default SearchPanel;
