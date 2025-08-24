import { useEffect, useState } from 'react';
import Logo from '../../assets/logo.svg?react';

/*
  response가 0.5초 이내로 왔을 때 그 사이에도 Loading 컴포넌트가 나타나면 사용자가 피곤함을 느낌.
  이를 방지하기 위해 delay를 추가함.
  delay 이내로 response가 오면 Loading 컴포넌트가 나타나지 않음

  text 뒤 자동으로 애니메이션이 추가된 ...을 붙여 진행 중임을 나타냄
*/

const Loading = ({
  text,
  active,
  delayMs = 500,
}: {
  text: string;
  active: boolean;
  delayMs?: number; //delay 시간 (ms)
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (active) {
      timer = setTimeout(() => {
        setShow(true);
      }, delayMs);
    } else {
      if (timer) clearTimeout(timer);
      setShow(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [active, delayMs]);

  if (!show) return null;

  return (
    <div className='fixed inset-0 bg-black/80 flex justify-center items-center z-500'>
      <div className='w-160 h-200 rounded-lg bg-white flex flex-col justify-center items-center gap-24'>
        <Logo className='w-50 h-50 animate-breathe' />
        <p className='text-primary-950 text-sm'>
          <span>{text}</span>
          <span className='animate-updown delay-0'>.</span>
          <span className='animate-updown delay-1'>.</span>
          <span className='animate-updown delay-2'>.</span>
        </p>
      </div>
    </div>
  );
};

export default Loading;
