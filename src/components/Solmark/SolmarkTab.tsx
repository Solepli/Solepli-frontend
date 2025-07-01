import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SolmarkTab = () => {
  const navigate = useNavigate();
  const tabStyle = 'py-12 w-full text-sm ';
  const activeStyle = 'border-b-2 border-primary-950 font-bold';
  const [active, setActive] = useState(0);
  const tabs = ['place', 'sollect', 'my'];
  const tabNames = ['장소', '쏠렉트', '마이'];

  const handleClickTab = (i: number) => {
    setActive(i);
    navigate(`/mark/${tabs[i]}`);
  };

  useEffect(()=>{
    const path = location.pathname
    if(path.includes("place")){
      setActive(0);
    }else if(path.includes("sollect")){
      setActive(1);
    }else if(path.includes("my")){
      setActive(2);
    }
  },[])

  return (
    <div className='border-b border-primary-100 w-full mt-24 px-16'>
      <ul className='flex justify-stretch text-center'>
        {tabNames.map((tab, i) => (
          <li
            className={tabStyle + (active === i ? activeStyle : '')}
            onClick={() => handleClickTab(i)}
            key={i}>
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SolmarkTab;
