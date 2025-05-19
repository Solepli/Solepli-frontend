import React from 'react';
import RecentSearch from './RecentSearch';
import SearchTitle from './SearchTitle';
import { useQuery } from '@tanstack/react-query';
import { fetchRecentSearchWords } from '../../api/searchApi';

const RecentSearchList: React.FC = () => {
  const { data } = useQuery({
    queryKey: ['recentSearchWords'],
    queryFn: fetchRecentSearchWords,
  });

  return (
    <div>
      <SearchTitle title={'최근 검색어'} />

      {data?.map((text, i) => <RecentSearch text={text} key={i} />)}
    </div>
  );
};

export default RecentSearchList;
