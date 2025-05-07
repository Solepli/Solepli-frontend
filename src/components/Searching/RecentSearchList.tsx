import React from 'react';
import { recentSearchText } from '../../recentSearchResults';
import RecentSearch from './RecentSearch';
import SearchTitle from './SearchTitle';

const RecentSearchList: React.FC = () => {
  const getRecentSearchText = recentSearchText;

  return (
    <div>
      <SearchTitle title={'최근 검색어'} />

      {getRecentSearchText.map((text, i) => (
        <RecentSearch text={text} key={i} />
      ))}
    </div>
  );
};

export default RecentSearchList;
