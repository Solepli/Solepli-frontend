import React from 'react'
import Tag from './Tag';
import { TagType } from '../../types';

interface TagListProps{
    tags:TagType[];
    headerName?: string;
    counts?:number[];
}

const TagList:React.FC<TagListProps> = ({tags, headerName, counts}) => {
  return (
    <div className='flex gap-8 px-16 pb-4 whitespace-nowrap overflow-x-scroll overflow-y-hidden touch-pan'>
      {headerName && <Tag name={headerName} header/>}
        {tags.map((tag, i) => {
          return <Tag name={tag.text} number={counts && counts[i]} />;
        })}
      </div>


  )
}

export default TagList