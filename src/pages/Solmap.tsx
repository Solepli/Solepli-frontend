import React from 'react'
import BottomSheet from '../components/BottomSheet/BottomSheet'
import { Outlet } from 'react-router-dom';

const Solmap:React.FC = () => {
  return (
    <div>
        <div>
            map
        </div>

        <div className='absolute bottom-0'>

        <BottomSheet>
            <Outlet />
        </BottomSheet>
        </div>
    </div>
  )
}

export default Solmap