import editWhite from "../../assets/editWhite.svg"
import LoginRequiredAction from '../../auth/LoginRequiredAction';
import { useNavigate } from 'react-router-dom';

const AddSollectButton = () => {
  const navigate = useNavigate();

  const handleAddSollectButton = () => {
    navigate('/sollect/write');
  };
  
  return (
    <LoginRequiredAction
      onAction={handleAddSollectButton}
      targetSource='/sollect/write'>
      <button className='bg-primary-950 rounded-full w-56 h-56 shrink-0 flex justify-center items-center shadow-[2px_2px_4px_0px_rgba(0,0,0,0.10)] border-1 border-primary-950'>
        <img src={editWhite} alt='add' className='w-24 h-24' />
      </button>
    </LoginRequiredAction>
  );
};

export default AddSollectButton;
