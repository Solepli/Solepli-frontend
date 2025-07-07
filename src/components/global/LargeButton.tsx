interface LargeButtonProps {
  text: string;
  onClick: () => void;
  disable?: boolean;
  bold?: boolean;
}

const LargeButton: React.FC<LargeButtonProps> = ({
  text,
  onClick,
  disable = false,
  bold = false,
}) => {
  return (
    <button
      type='button'
      disabled={disable}
      onClick={onClick}
      className={`
        w-full h-48 flex-shrink-0 rounded-lg
        flex justify-center items-center
        text-sm leading-tight
        ${disable ? 'bg-primary-200 text-primary-400 cursor-not-allowed' : 'bg-primary-700 text-primary-50 cursor-pointer'}
        ${bold ? 'font-bold' : 'font-normal'}
      `}>
      {text}
    </button>
  );
};

export default LargeButton;
