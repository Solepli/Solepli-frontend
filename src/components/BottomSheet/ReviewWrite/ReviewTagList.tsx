import React from 'react';
import ReviewTag from './ReviewTag';
import { TagType } from '../../../types';

interface ReviewTagProps {
  title: string;
  tag: TagType[];
  selectedTags: TagType[];
  setSelectedTags: (tags: TagType[]) => void;
}

const ReviewTagList: React.FC<ReviewTagProps> = ({ title, tag, selectedTags, setSelectedTags }) => {
  const handleTagClick = (tag: TagType) => {
    if (selectedTags.some((selectedTag) => selectedTag.id === tag.id)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag.id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className='flex flex-col gap-[6px] pt-[32px] px-[16px]'>
      <div className='flex flex-row items-center justify-start py-4'>
        <div className="text-sm leading-[150%] tracking-[-0.18px] font-[600] text-grayScale-700 whitespace-nowrap">
          {title}
        </div>
      </div>
      <div className='self-stretch flex flex-wrap items-center justify-start gap-0'>
        {tag.map(({ id, text }) => {
          return (
            <div key={id} className='w-1/3'>
              <ReviewTag text={text} selected={selectedTags.some((selectedTag) => selectedTag.id === id)} onClick={() => handleTagClick({ id, text })}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewTagList;
