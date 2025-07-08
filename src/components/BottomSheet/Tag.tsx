import React from 'react';

interface TagProps {
  name: string;
  header?: boolean;
  number?: number;
}

const Tag: React.FC<TagProps> = ({ name, header, number }) => {
  const style = 'text-center px-8 text-xs font-regular rounded-sm shrink-0';
  return (
    <>
      {/* default */}
      {!number && !header && (
        <div className={`${style} bg-primary-100 px-8 py-4 flex items-center text-primary-700`}>
          <p>{name}</p>
        </div>
      )}

      {/* text + number */}
      {number && (
        <div
          className={`${style} flex gap-4 bg-primary-100 py-6 text-primary-700`}>
          <p>{name}</p>
          <span className='text-primary-900 font-semibold'>{number}</span>
        </div>
      )}

      {/* green header */}
      {header && (
        <div
          className={`${style} w-60 py-6 bg-secondary-700 text-secondary-50`}>
          <p>{name}</p>
        </div>
      )}
    </>
  );
};

export default Tag;
