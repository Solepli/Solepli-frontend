import React from 'react';

interface SearchTitleProps {
  title: string;
}

const SearchTitle: React.FC<SearchTitleProps> = ({ title }) => {
  return (
    <div className='flex pt-24 px-16 pb-12 items-center gap-10 self-stretch border-b border-solid border-primary-100'>
      <div className="font-semibold text-sm leading-[120%] tracking-[-0.35px] text-primary-600">
        {title}
      </div>
    </div>
  );
};

export default SearchTitle;
