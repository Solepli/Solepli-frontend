import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SolmarkTab = () => {
  const navigate = useNavigate();
  const tabStyle = 'py-12 w-full text-sm ';
  const activeStyle = 'border-b-2 border-primary-950 font-bold';
  const [active, setActive] = useState(0);
  const tabs = ['장소', '쏠렉트', '마이'];

  const handleClickTab = (i: number) => {
    setActive(i);
    navigate(`/mark?tab=${tabs[i]}`);
  };

  return (
    <div className='border-b border-primary-100 w-full mt-24 px-16'>
      <ul className='flex justify-stretch text-center'>
        {tabs.map((tab, i) => (
          <li
            className={tabStyle + (active === i ? activeStyle : '')}
            onClick={() => handleClickTab(i)}>
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SolmarkTab;
