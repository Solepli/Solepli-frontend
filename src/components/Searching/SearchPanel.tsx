import React from 'react';
import SearchTitle from './SearchTitle';
import SearchArea from './SearchArea';
import RecentSearchList from './RecentSearchList';

const SearchPanel: React.FC = () => {
  return (
    <div className='z-100 min-h-full bg-[#fff]'>
      <SearchArea />

      <SearchTitle title={'최근 검색어'} />
      <RecentSearchList />
    </div>
  );
};

export default SearchPanel;
