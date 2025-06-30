import { useState } from 'react';
import check from '../../../assets/check.svg';
import addBlack from '../../../assets/addBlack.svg';

const AddCourseButton = () => {
  const [isAdded, setIsAdded] = useState(false);
  const clickButton = () => {
    setIsAdded(!isAdded);
    // add to course
  };

  return (
    <div onClick={clickButton}>
      {isAdded ? (
        <button className='bg-primary-700 rounded-full border-1 border-primary-700 py-5 text-white pr-16 pl-4 flex text-sm font-bold items-center'>
          <img src={check} alt='check' className='w-24 h-24' /> 코스로 저장
        </button>
      ) : (
        <button className='bg-white rounded-full border-1 border-primary-700 py-5 text-primary-700 pr-16 pl-4 flex text-sm font-bold items-center'>
          <img src={addBlack} alt='add' className='w-24 h-24' /> 코스로 저장
        </button>
      )}
    </div>
  );
};

export default AddCourseButton;
