import setting from "../../assets/setting.svg";
import feedback from "../../assets/feedback.svg";
import addLocation from "../../assets/addLocation.svg";
import announcement from "../../assets/announcement.svg";
import document from "../../assets/document.svg";
import { useNavigate } from "react-router-dom";
import LargeButton from "../global/LargeButton";

const ProfileMenu = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const menus = [
    { name: '설정', path: '/profile/settings', common: true, icon: setting},
    { name: '의견 남기기', path: '/profile/feedback', common: false, icon: feedback },
    { name: '장소 추가 요청', path: '/profile/location', common: false, icon: addLocation },
    { name: '공지사항', path: '/profile/announcement', common: true, icon: announcement },
    { name: '약관 및 정책', path: '/profile/document', common: true, icon: document },
  ];
  
  const navigate = useNavigate();

  const handleClick = (path:string)=>{
    navigate(path)
  }

  const visibleMenus = menus.filter((menu) => menu.common || isLoggedIn);
  return (
    <div className="">
      <div className='p-16 flex flex-col gap-8'>
        {visibleMenus.map((menu) => {
          return (
            <div
              key={menu.name}
              className='flex gap-8 items-center py-8 text-sm'
              onClick={() => handleClick(menu.path)}>
              <img src={menu.icon} alt='' />
              <p>{menu.name}</p>
            </div>
          );
        })}
      </div>

      <div className='px-16'>
        {!isLoggedIn && (
          <LargeButton
            text='간편 로그인'
            onClick={() => navigate('/login')}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
