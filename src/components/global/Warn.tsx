import WarnIcon from '../../assets/warn.svg?react';
const Warn: React.FC<{ title: string; message?: string }> = ({
  title,
  message,
}) => {
  return (
    <div className='flex w-full px-12 py-8 bg-primary-950 rounded-lg gap-4 items-center'>
      <WarnIcon className='min-w-24' />
      <div className='flex flex-col gap-2'>
        <span className='text-primary-50 text-sm font-semibold leading-tight'>
          {title}
        </span>
        {message && (
          <span className='text-primary-50 text-xs font-normal leading-none'>
            {message}
          </span>
        )}
      </div>
    </div>
  );
};

export default Warn;
