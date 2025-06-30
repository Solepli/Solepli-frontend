import React from 'react';
import ReviewTag from './ReviewTag';

interface ReviewTagProps {
  title: string;
  tags: string[];
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}

const ReviewTagList: React.FC<ReviewTagProps> = ({
  title,
  tags,
  selectedTags,
  setSelectedTags,
}) => {
  const handleTagClick = (tag: string) => {
    if (selectedTags.some((selectedTag) => selectedTag === tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className='flex flex-col gap-[6px] pt-[32px] px-[16px]'>
      <div className='flex flex-row items-center justify-start py-4'>
        <div className='text-sm leading-[150%] tracking-[-0.18px] font-[600] text-grayScale-700 whitespace-nowrap'>
          {title}
        </div>
      </div>
      <div className='self-stretch flex flex-wrap items-center justify-start gap-0'>
        {tags.map((v) => {
          return (
            <div key={v} className='w-1/3'>
              <ReviewTag
                text={v}
                selected={selectedTags.some((selectedTag) => selectedTag === v)}
                onClick={() => handleTagClick(v)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewTagList;
