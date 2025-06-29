import logo from '../../assets/logo.svg';
import add from '../../assets/add.svg';
import search from '../../assets/search.svg';
import { useSearchStore } from '../../store/searchStore';
import { useNavigate } from 'react-router-dom';
import LoginRequiredAction from '../../auth/LoginRequiredAction';

const SollectGNB = () => {
  const { inputValue, setInputValue } = useSearchStore();
  const navigate = useNavigate();

  const handleAddSollectButton = () => {
    navigate('/sollect/write');
  }
  return (
    <div className='flex px-16 py-12 gap-8 bg-white'>
      {/* logo */}
      <img
        src={logo}
        alt='logo'
        className='w-34 h-34'
        onClick={() => navigate('/sollect')}
      />

      {/* search */}
      <div className='px-8 py-4 border-1 border-primary-100 rounded-xl flex gap-4 w-full'>
        <img src={search} alt='search' />
        <input
          type='text'
          placeholder='오늘은 어디서 시간을 보내나요?'
          className='text-sm flex-1 focus:outline-none focus:ring-0 resize-none'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onClick={() => navigate('/sollect/search')}
        />
      </div>

      {/* AddSollectButton */}
      <LoginRequiredAction
        onAction={handleAddSollectButton}
        targetSource='/sollect/write'>
        <button className='bg-primary-900 rounded-xl w-34 h-34 shrink-0 flex justify-center items-center'>
          <img src={add} alt='add' className='w-24 h-24' />
        </button>
      </LoginRequiredAction>
    </div>
  );
};

export default SollectGNB;
