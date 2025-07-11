import { deleteUser } from '../../api/profileApi';
import LargeButton from '../../components/global/LargeButton';
import LargeButtonInverted from '../../components/global/LargeButtonInverted';
import TitleHeader from '../../components/global/TitleHeader';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const DeleteProfilePage = () => {
  const navigate = useNavigate();

  const { logout } = useAuthStore();

  const handleDelete = async ()=>{
    await deleteUser();
    logout();
    navigate('/login');
  }
  return (
    <div>
      <TitleHeader title='회원 탈퇴' onClick={() => navigate(-1)} center />
      <div className='pt-58'></div>
      <div className='p-24'>
        <h1 className='text-black text-lg font-bold mb-10'>
          쏠플러님과의 소중한 기록들이 사라져요
        </h1>
        <p className='text-black text-sm'>
          쏠플러님의 여정을 오래도록 기억하고 싶어요. <br />
          계정을 삭제하시면 지금까지 쌓은 쏠렉트, 쏠마크, 쏠맵, 쏠루트의 추억이
          모두 사라지고 복구하기 어려워져요. <br /> <br />
          조금 쉬었다가 다시 돌아오시는 건 어떨까요?
        </p>
      </div>

      <div className='py-24 px-16 flex flex-col gap-8'>
        <LargeButtonInverted text='탈퇴할게요' onClick={handleDelete} />
        <LargeButton text='유지할게요' onClick={() => navigate(-1)} />
      </div>
    </div>
  );
};

export default DeleteProfilePage;
