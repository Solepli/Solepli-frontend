import { useRef } from 'react';
import SollectWriteContent from '../components/Sollect/SollectWrite/SollectWriteContent';
import SollectWriteImageInput from '../components/Sollect/SollectWrite/SollectWriteImageInput';

const SollectWritePage = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  return (
    <div className='w-full h-full flex flex-col relative overflow-hidden'>
      <SollectWriteContent footerRef={footerRef} />
      <div>
        <SollectWriteImageInput footerRef={footerRef} />
      </div>
    </div>
  );
};

export default SollectWritePage;
