import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
  
  // window.location은 경로가 바뀌어도 리액트 컴포넌트가 감지를 못해서 리렌더링이 일어나지 않음 -> useLocation() 사용
  const location = useLocation();
  useEffect(()=>{
    if(location.pathname === '/mark' || location.pathname === '/mark/place'){
      setActive(0);
    }else if(location.pathname === '/mark/sollect'){
      setActive(1);
    }else if(location.pathname === '/mark/my'){
      setActive(2);
    }
  },[location.pathname])

  return (
    <div className='border-b border-primary-100 w-full px-16'>
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
