import { NavLink } from 'react-router-dom';
import Sollect from '../assets/nav/sollect.svg?react';
import Map from '../assets/nav/map.svg?react';
import Mark from '../assets/nav/mark.svg?react';
import Profile from '../assets/nav/profile.svg?react';

const BottomNav = () => {
  const menu = [
    { name: 'sollect', path: '/sollect', icon: <Sollect /> },
    { name: 'map', path: '/map', icon: <Map /> },
    { name: 'mark', path: '/mark', icon: <Mark /> },
    { name: 'profile', path: '/profile', icon: <Profile /> },
  ];

  return (
    <nav>
      <div className='w-full shadow-[0px_-4px_20px_rgba(18,_18,_18,_0.08)] px-[30px] pt-[5px] bg-white flex inline-flex justify-between items-center z-150'>
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[10px] font-pretendard ${isActive ? 'text-gray-900' : 'text-gray-300'}`
            }>
            {item.icon}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
