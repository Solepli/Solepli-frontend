import { NavLink, useNavigate } from 'react-router-dom';
import Sollect from '../assets/nav/sollect.svg?react';
import SollectActive from '../assets/nav/sollect-active.svg?react';
import Map from '../assets/nav/solmap.svg?react';
import MapActive from '../assets/nav/solmap-active.svg?react';
import Solroute from '../assets/nav/solroute.svg?react';
import SolrouteActive from '../assets/nav/solroute-active.svg?react';
import Mark from '../assets/nav/solmark.svg?react';
import MarkActive from '../assets/nav/solmark-active.svg?react';
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
    {
      name: 'solroute',
      path: '/solroute',
      icon: <Solroute />,
      activeIcon: <SolrouteActive />,
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
      <div className='w-full shadow-[0px_-4px_20px_0px_rgba(18,18,18,0.08)] border-t border-grayScale-50 px-24 pt-12 pb-4 bg-white flex inline-flex justify-between items-center z-150'>
        {menu.map((item) => {
          return (
            <div>
              {(item.name === 'mark' || item.name === 'solroute') ? (
                <LoginRequiredAction onAction={() => navigate(`/${item.name}`)} targetSource={`/${item.name}`}>
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
