import React from 'react';
import SearchArea from './SearchArea';
import RecentSearchList from './RecentSearchList';
import AutoSearchList from './AutoSearchList';
import useSearchStore from '../../store/searchStore';

const SearchPanel: React.FC = () => {
  const { inputValue } = useSearchStore();

  return (
    <div className='z-100 min-h-full bg-[#fff]'>
      <SearchArea />

      {!inputValue && <RecentSearchList />}

      {inputValue && <AutoSearchList />}
    </div>
  );
};

export default SearchPanel;
