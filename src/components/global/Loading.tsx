import Logo from '../../assets/logo.svg?react';

const Loading = ({ text }: { text: string }) => {
  return (
    <div className='absolute inset-0 bg-black/80 flex justify-center items-center'>
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
