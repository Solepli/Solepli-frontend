import React from 'react'
import Tag from './Tag';
import { TagType } from '../../types';

interface TagListProps{
    tags:TagType[];
    headerName?: string;
    counts?:number[];
}
// Tag type과 Tag 컴포넌트 이름이 겹쳐서 문제가 있음
const TagList:React.FC<TagListProps> = ({tags, headerName, counts}) => {
  return (
    <div className='flex gap-4 px-16 pt-2 pb-4 whitespace-nowrap overflow-x-scroll overflow-y-hidden touch-pan-x'>
      {headerName && <Tag name={headerName} header/>}
        {tags.map((tag, i) => {
          return <Tag name={tag.text} number={counts && counts[i]} />;
        })}
      </div>


  )
}

export default TagList