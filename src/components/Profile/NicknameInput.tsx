import XButtonCircle from '../XButtonCircle';
import useNicknameValidation from '../../hooks/useNicknameValidation';
import success from '../../assets/successGreen.svg';
import error from '../../assets/error.svg';
import { useRef } from 'react';
import { useInputAdjustScale } from '../../hooks/useInputAdjustScale';
const NicknameInput = ({
  setNicknameInput,
  nicknameInput,
}: {
  setNicknameInput: (input: string) => void;
  nicknameInput: string;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { isAvailable, message } = useNicknameValidation(nicknameInput);
  useInputAdjustScale(inputRef);

  return (
    <div>
      <div className='flex justify-between border-b-1 items-center border-primary-200 py-4'>
        <input
          ref={inputRef}
          maxLength={20}
          type='text'
          value={nicknameInput}
          onChange={(e) => setNicknameInput(e.target.value)}
          className='w-300 focus:outline-none text-primary-950
          text-base scale-[var(--scale-16-14)] origin-top-left w-[calc(100%/var(--scale-16-14))]'
        />

        <div className='flex'>
          <XButtonCircle onClickFunc={() => setNicknameInput('')} />

          <p className='text-sm text-end text-primary-500'>
            ({nicknameInput.length}/20)
          </p>
        </div>
      </div>
      <p
        className={`${message ? 'opacity-100' : 'opacity-0'} block text-xs font-semibold ${isAvailable ? 'text-success' : 'text-error'} mt-5 flex gap-2`}>
        <img src={isAvailable ? success : error} alt='' />
        {message || '메세지'}
      </p>
    </div>
  );
};

export default NicknameInput;
