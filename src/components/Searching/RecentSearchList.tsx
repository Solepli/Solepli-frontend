import React from 'react';
import { recentSearchText } from '../../recentSearchText';
import RecentSearch from './RecentSearch';

const RecentSearchList: React.FC = () => {
  const getRecentSearchText = recentSearchText;

  return (
    <div>
      {getRecentSearchText.map((text, i) => (
        <RecentSearch text={text} key={i} />
      ))}
    </div>
  );
};

export default RecentSearchList;
