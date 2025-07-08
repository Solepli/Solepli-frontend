import { NavLink, useNavigate } from 'react-router-dom';
import Sollect from '../assets/nav/sollect.svg?react';
import SollectActive from '../assets/nav/sollect-active.svg?react';
import Map from '../assets/nav/map.svg?react';
import MapActive from '../assets/nav/map-active.svg?react';
import Mark from '../assets/nav/mark.svg?react';
import MarkActive from '../assets/nav/mark-active.svg?react';
import Profile from '../assets/nav/profile.svg?react';
import ProfileActive from '../assets/nav/profile-active.svg?react';
import LoginRequiredAction from '../auth/LoginRequiredAction';

const BottomNav = () => {
  const menu = [
    {
      name: 'sollect',
      path: '/sollect',
      icon: <Sollect />,
      activeIcon: <SollectActive />,
    },
    {
      name: 'map',
      path: '/map',
      icon: <Map />,
      activeIcon: <MapActive />,
    },
    { name: 'mark', path: '/mark', icon: <Mark />, activeIcon: <MarkActive /> },
    {
      name: 'profile',
      path: '/profile',
      icon: <Profile />,
      activeIcon: <ProfileActive />,
    },
  ];

  const navigate = useNavigate();

  return (
    <nav>
      <div className='w-full shadow-[0px_-4px_20px_rgba(18,_18,_18,_0.08)] px-30 pt-5 bg-white flex inline-flex justify-between items-center z-150'>
        {menu.map((item) => {
          return (
            <div>
              {item.name === 'mark' ? (
                <LoginRequiredAction onAction={() => navigate('/mark')} targetSource="/mark">
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className='flex flex-col items-center gap-1'>
                    {({ isActive }) => (isActive ? item.activeIcon : item.icon)}
                  </NavLink>
                </LoginRequiredAction>
              ) : (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className='flex flex-col items-center gap-1'>
                  {({ isActive }) => (isActive ? item.activeIcon : item.icon)}
                </NavLink>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
