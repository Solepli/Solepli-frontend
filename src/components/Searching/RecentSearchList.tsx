import React from 'react';
import RecentSearch from './RecentSearch';
import SearchTitle from './SearchTitle';
import { useQuery } from '@tanstack/react-query';
import { getRecentSearchWords } from '../../api/searchApi';

const RecentSearchList: React.FC = () => {
  const mode = window.location.pathname.includes('/sollect/search')
    ? 'sollect'
    : 'solmap';

  const accessToken = localStorage.getItem('accessToken');
  
  const { data } = useQuery({
    queryKey: ['recentSearchWords'],
    queryFn: () => getRecentSearchWords(mode),
    enabled: !!accessToken,
  });

  return (
    <div>
      <SearchTitle title={'최근 검색어'} />

      {data?.map((text, i) => <RecentSearch text={text} key={i} mode={mode} />)}
    </div>
  );
};

export default RecentSearchList;
