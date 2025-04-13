import React from 'react';

interface TagProps {
  name: string;
  header?: boolean;
  number?: number;
}

const Tag: React.FC<TagProps> = ({ name, header, number }) => {
  const style = 'text-center px-8 text-xs font-regular rounded-sm';
  return (
    <>
      {/* default */}
      {!number && !header && (
        <div className={`${style} bg-gray-100 px-8 py-4  text-gray-900`}>
          #{name}
        </div>
      )}

      {/* number */}
      {number && (
        <div className={`${style} flex gap-4 bg-gray-100 py-6 text-gray-900`}>
          <p>#{name}</p>
          <span className='font-medium'>{number}</span>
        </div>
      )}

      {/* header */}
      {header && (
        <div className={`${style} py-6 bg-green-700 text-white`}>
          <p>{name}</p>
        </div>
      )}
    </>
  );
};

export default Tag;
