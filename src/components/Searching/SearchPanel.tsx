import React from 'react';
import RecentSearchList from './RecentSearchList';
import RelatedSearch from './RelatedSearchList';
import { useSearchStore } from '../../store/searchStore';
import RelatedSearchPlaceList from './RelatedSearchPlaceList';

const SearchPanel: React.FC = () => {
  const { inputValue } = useSearchStore();
  const pathname = window.location.pathname;
  const fromSollect = pathname.includes('/sollect/search');
  const fromPlace = pathname.includes('/sollect/write/search');

  return (
    <div className='w-full'>
      {fromSollect && inputValue && !fromPlace && <RecentSearchList />}
      {!inputValue && !fromPlace && <RecentSearchList />}
      {inputValue && !fromSollect && !fromPlace && <RelatedSearch />}
      {fromPlace && <RelatedSearchPlaceList />}
    </div>
  );
};

export default SearchPanel;
