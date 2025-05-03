import React from 'react';


const BottomSheet: React.FC<{ children: React.ReactNode }> = ({children}) => {


  return (
    <div className='bottom-sheet w-390 h-400'>
      <div className='bottom-sheet-content'>
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;
