import { useState } from 'react';
import check from '../../../assets/check.svg';
import addBlack from '../../../assets/addBlack.svg';

const AddCourseButton = () => {
  const [isAdded, setIsAdded] = useState(false);
  const clickButton = () => {
    setIsAdded(!isAdded);
    // add to course
  };
  const style = "rounded-full border-1 border-primary-700 py-4 pr-16 pl-8 flex text-sm font-bold items-center"
  return (
    <div onClick={clickButton}>
      {isAdded ? (
        <button className={'bg-primary-700  text-white' + style}>
          <img src={check} alt='check' className='w-24 h-24' /> 코스로 저장
        </button>
      ) : (
        <button className={'bg-white  text-primary-700 ' + style}>
          <img src={addBlack} alt='add' className='w-24 h-24' /> 코스로 저장
        </button>
      )}
    </div>
  );
};

export default AddCourseButton;
