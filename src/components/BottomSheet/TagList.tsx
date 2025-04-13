import React from 'react'
import Tag from '../Tag';

interface TagListProps{
    tags:string[];
}

const TagList:React.FC<TagListProps> = ({tags}) => {
  return (
    <div className='flex gap-4 px-16 pt-2 pb-4'>
        {tags.map((tag) => {
          return <Tag name={tag} />;
        })}
      </div>
  )
}

export default TagList