import setting from "../../assets/setting.svg";
import feedback from "../../assets/feedback.svg";
import addLocation from "../../assets/addLocation.svg";
import announcement from "../../assets/announcement.svg";
import document from "../../assets/document.svg";

const ProfileMenu = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const menus = [
    { name: '설정', path: '', common: true, icon: setting},
    { name: '의견 남기기', path: '', common: false, icon: feedback },
    { name: '장소 추가 요청', path: '', common: false, icon: addLocation },
    { name: '공지사항', path: '', common: true, icon: announcement },
    { name: '약관 및 정책', path: '', common: true, icon: document },
  ];

  const visibleMenus = menus.filter((menu) => menu.common || isLoggedIn);
  return (
    <div className='p-16 flex flex-col gap-8'> 
        {visibleMenus.map((menu)=>{
            return(
                <div className='flex gap-8 items-center py-8 text-sm'>
                    <img src={menu.icon} alt="" />
                    <p>{menu.name}</p>
                </div>
            )
        })}
    </div>
  );
};

export default ProfileMenu;
