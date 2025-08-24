import React from 'react';
import Tag from './Tag';
import { TagType } from '../../types';

//
interface TagListProps {
  tags?: string[];
  detailTags?: TagType[];
  headerName?: string;
}

const TagList: React.FC<TagListProps> = ({ tags, detailTags, headerName }) => {
  const hasTags = tags && tags.length > 0;
  const showNoTag =
    !hasTags && Array.isArray(detailTags) && detailTags.length === 0;

  return (
    <div className='flex px-16 gap-8'>
      {/* Tag Header */}
      {headerName && (
        <div>
          <Tag name={headerName} header />
        </div>
      )}
      <div className='flex gap-8 pb-4 whitespace-nowrap overflow-x-scroll overflow-y-hidden touch-pan-x'>
        {/* Preview tags */}
        {tags?.map((tag, i) => {
          return <Tag name={tag} key={i} />;
        })}

        {/* Detail tags with number */}
        {!hasTags &&
          detailTags &&
          detailTags.length > 0 &&
          detailTags.map((tag, i) => {
            return <Tag name={tag.tagName} number={tag.tagTotal} key={i} />;
          })}
        {showNoTag && <Tag name='태그 없음' noTag />}
      </div>
    </div>
  );
};

export default TagList;
