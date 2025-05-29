import SollectWriteContent from '../components/Sollect/SollectWrite/SollectWriteContent';
import SollectWriteHeader from '../components/Sollect/SollectWrite/SollectWriteHeader';
import SollectWriteImageInput from '../components/Sollect/SollectWrite/SollectWriteImageInput';

const SollectWritePage = () => {
  return (
    <div className='w-full h-dvh flex flex-col relative'>
      <SollectWriteHeader />
      <SollectWriteContent />
      <SollectWriteImageInput />
    </div>
  );
};

export default SollectWritePage;
