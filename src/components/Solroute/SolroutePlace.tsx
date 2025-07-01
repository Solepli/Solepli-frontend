import DragAndDropLine from '../../assets/dragAndDropLine.svg?react';

const SolroutePlace = () => {
  return (
    <div className='flex items-start self-stretch'>
      <div className='flex pl-20 items-start gap-16 flex-[1_0_0]'>
        <div className='flex w-9 flex-col justify-center items-center gap-4 self-stretch'>
          <img src={'/solrouteLineDash.svg'} alt='SolrouteLineDash' />
          <div className='flex w-24 h-24 flex-col justify-center items-center gap-10 aspect-square rounded-[8px] bg-secondary-700'>
            <DragAndDropLine />
          </div>
          <div
            className={`min-h-111 self-stretch bg-repeat-y bg-top bg-[url("/solrouteLineDash.svg")]`}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default SolroutePlace;
