import arrow from '../../assets/arrow.svg';
import { useNavigate } from 'react-router-dom';
import LoginRequiredAction from '../../auth/LoginRequiredAction';

const SolmarkNoResult = ({ type }: { type: string }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    let url = '';
    if (type == 'sollect') {
      url = '/sollect';
    } else if (type == 'my') {
      url = '/sollect/write';
    }

    navigate(url);
  };
  const handleAddSollectButton = () => {
    navigate('/sollect/write');
  };
  return (
    <div className='text-center py-250'>
      <p className='font-bold text-primary-950 mb-5'>
        아직 {type === 'sollect' ? '저장된' : '작성된'} 쏠렉트가 없어요!
      </p>
      <div
        className='flex justify-center text-sm text-primary-700 underline items-center'
        onClick={handleClick}>
        {type === 'sollect' && '쏠렉트 보러가기'}
        {type === 'my' && (
          <LoginRequiredAction onAction={handleAddSollectButton}>
            {' '}
            <span>쏠렉트 작성하러 가기</span>
          </LoginRequiredAction>
        )}
        <img src={arrow} alt='arrow' className='w-24 h-24' />{' '}
      </div>

    </div>
  );
};

export default SolmarkNoResult;
