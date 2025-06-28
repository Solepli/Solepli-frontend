import React from 'react';
import Tag from './Tag';
import { TagType } from '../../types';

interface TagListProps {
  tags?: string[];
  detailTags?: TagType[];
  headerName?: string;
}


const TagList: React.FC<TagListProps> = ({
  tags,
  detailTags,
  headerName
}) => {

  return (
    <div className='flex gap-8 px-16 pb-4 whitespace-nowrap overflow-x-scroll overflow-y-hidden touch-pan'>
      {/* Tag Header */}
      {headerName && <Tag name={headerName} header />}

      {/* Preview tags */}
      {tags?.map((tag, i) => {
        return <Tag name={tag} key={i} />;
      })}

      {/* Detail tags with number */}
      {detailTags &&
        detailTags.map((tag, i) => {
          return <Tag name={tag.tagName} number={tag.tagTotal} key={i} />;
        })}
    </div>
  );
};

export default TagList;
