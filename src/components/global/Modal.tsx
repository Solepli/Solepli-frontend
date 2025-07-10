import React from 'react'

interface ModalProps{
    title:string,
    subtitle:string,
    leftText:string,
    rightText:string,
    onLeftClick:()=>void,
    onRightClick:()=>void
}

const Modal:React.FC<ModalProps> = ({title, subtitle, leftText, rightText, onLeftClick, onRightClick}) => {
  return (
    <div className='fixed inset-0 bg-black/80 flex justify-center items-center z-150'>
      <div className='bg-white rounded-lg p-20 pt-32 w-min-340 h-min-112 text-center'>
        <h3 className='text-primary-950 font-bold mb-8'>{title}</h3>
        <p className='text-primary-950 text-sm mb-24 whitespace-pre-line'>{subtitle}</p>

        <div className='flex justify-between gap-8'>
          <div
            onClick={onLeftClick}
            className='w-146 h-40 bg-primary-100 rounded flex justify-center items-center text-primary-950 text-sm text-center'>
            {leftText}
          </div>
          <div onClick={onRightClick} className='w-146 h-40 bg-primary-700 rounded flex justify-center items-center text-primary-50 text-sm text-center'>{rightText}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal