import { useSollectDetailStore } from '../../../store/sollectDetailStore';

const SollectDetailContent = () => {
  const { contents } = useSollectDetailStore();

  return (
    <div className='flex flex-col'>
      {contents.map((paragraph, index) => {
        return (
          <div key={index} className='pb-16'>
            {paragraph.type === 'TEXT' ? (
              <div className='px-16 text-primary-950 text-sm'>
                {paragraph.content}
              </div>
            ) : (
              <img src={paragraph.content} alt='' className='w-full' />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SollectDetailContent;
