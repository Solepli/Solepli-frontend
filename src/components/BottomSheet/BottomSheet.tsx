import React from 'react';
import { useLocation } from 'react-router-dom';
import MapChipList from './Category/MapChipList';
import { useBottomSheet } from '../../hooks/useBottomSheet';

const Header: React.FC<{
  children?: React.ReactNode;
  headerRef: React.Ref<HTMLDivElement>;
}> = ({ children, headerRef }) => {
  return (
    <div ref={headerRef} className='touch-none select-none'>
      <div className='w-full h-20 py-8 flex justify-center items-center z-100 rounded-t-[16px] bg-white'>
        <div className='w-40 h-4 bg-gray-200 rounded-[10px]' />
      </div>
      <div>{children}</div>
    </div>
  );
};

const BottomSheet: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isList = location.pathname === '/map/list';

  const { sheetRef, headerRef, contentRef, rootHandlers, contentOnScroll } =
    useBottomSheet();

  return (
    <div
      ref={sheetRef}
      {...rootHandlers}
      className={`fixed w-full shadow-[0px_-1px_20px_0px_rgba(0,0,0,0.10)] z-50 select-none flex flex-col`}
      style={{
        height: `100dvh`,
        top: `0`,
        transform: `translateY(100dvh)`,
      }}>
      {/* 드래그 핸들 */}
      <Header headerRef={headerRef}>{isList && <MapChipList />}</Header>

      <div
        ref={contentRef}
        className={`flex-1 pb-100 bg-white`}
        onScroll={contentOnScroll}
        style={{ touchAction: 'none', overflowY: 'auto' }}>
        {/* BottomSheet 내용 */}
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;
