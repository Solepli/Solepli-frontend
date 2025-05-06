import React from 'react'
import Tag from './Tag';

interface TagListProps{
    tags:string[];
    headerName?: string;
    counts?:number[];
}

const TagList:React.FC<TagListProps> = ({tags, headerName, counts}) => {
  return (
    <div className='flex gap-4 px-16 pt-2 pb-4 whitespace-nowrap overflow-x-scroll overflow-y-hidden touch-pan-x'>
      {headerName && <Tag name={headerName} header/>}
        {tags.map((tag, i) => {
          return <Tag name={tag} number={counts && counts[i]} />;
        })}
      </div>
  )
}

export default TagList