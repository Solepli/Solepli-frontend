import SollectWriteContent from '../components/Sollect/SollectWrite/SollectWriteContent';
import SollectWriteImageInput from '../components/Sollect/SollectWrite/SollectWriteImageInput';

const SollectWritePage = () => {
  return (
    <div className='w-full h-full flex flex-col relative overflow-hidden'>
      <SollectWriteContent />
      <SollectWriteImageInput />
    </div>
  );
};

export default SollectWritePage;
