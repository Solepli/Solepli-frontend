const LargeButton = ({ text, onClick }: {text: string, onClick: () => void}) => {
  return (
    <div
      className='w-full h-48 flex-shrink-0 rounded-lg bg-primary-700 flex justify-center items-center text-primary-50 text-sm font-normal leading-tight'
      onClick={onClick}>
      {text}
    </div>
  );
};

export default LargeButton;
