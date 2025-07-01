import DragAndDropLine from '../../assets/dragAndDropLine.svg?react';
import Trash from '../../assets/trash.svg?react';

const SolroutePlace = () => {
  return (
    <div className='flex items-start self-stretch'>
      <div className='flex pl-20 items-start gap-16 grow'>
        {/* line */}
        <div className='flex w-9 flex-col justify-center items-center gap-4 self-stretch'>
          <img src={'/solrouteLineDash.svg'} alt='SolrouteLineDash' />
          <div className='flex w-24 h-24 flex-col justify-center items-center gap-10 aspect-square rounded-lg bg-secondary-700'>
            <DragAndDropLine />
          </div>
          <div
            className={`min-h-111 self-stretch bg-repeat-y bg-top bg-[url("/solrouteLineDash.svg")]`}
          />
        </div>

        {/* info */}
        <div className='flex py-12 pr-16 flex-col justify-center items-start gap-8 grow'>
          {/* place */}
          <div className='flex items-center gap-10 self-stretch'>
            <div className='flex flex-col items-start gap-2 grow'>
              <div className='flex justify-center items-center gap-8'>
                <div className='text-primary-950 text-center text-base not-italic font-bold leading-24 tracking-tight'>
                  성수까망
                </div>
                <div className='text-primary-400 text-xs not-italic font-normal leading-18 tracking-[-0.18px]'>
                  카페
                </div>
              </div>
              <div className='text-primary-400 text-sm not-italic font-normal leading-[120%] tracking-[-0.21px]'>
                서울 성동구 연무장5가길 20 2층
              </div>
            </div>
            <div className='flex w-40 h-40 justify-end items-center gap-10'>
              <div className='flex p-4 items-center rounded-lg border-1 border-solid border-primary-700'>
                <Trash className='text-primary-700' />
              </div>
            </div>
          </div>

          {/* memo */}
        </div>
      </div>
    </div>
  );
};

export default SolroutePlace;
