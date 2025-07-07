interface LargeButtonInvertedProps {
  text: string;
  onClick: () => void;
}
const LargeButtonInverted: React.FC<LargeButtonInvertedProps> = ({
  text,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className='w-full h-48 px-20 flex items-center justify-center rounded-lg 
        outline outline-1 outline-offset-[-1px] outline-primary-700'>
      <span className='text-primary-700 text-sm font-medium leading-tight'>
        {text}
      </span>
    </button>
  );
};

export default LargeButtonInverted;
