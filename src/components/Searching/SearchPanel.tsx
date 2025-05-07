import React from 'react';
import RecentSearchList from './RecentSearchList';
import AutoSearchList from './AutoSearchList';
import useSearchStore from '../../store/searchStore';

const SearchPanel: React.FC = () => {
  const { inputValue } = useSearchStore();

  return (
    <div className='fixed top-0 left-0 w-full z-70 min-h-full bg-[#fff] pt-[46px]'>
      {!inputValue && <RecentSearchList />}
      {inputValue && <AutoSearchList />}
    </div>
  );
};

export default SearchPanel;
