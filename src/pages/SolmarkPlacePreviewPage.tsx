import React from 'react'
import TitleHeader from '../components/global/TitleHeader'
import { useNavigate } from 'react-router-dom';

const SolmarkPlacePreviewPage = () => {
    const navigate = useNavigate();
    const handleClick = () =>{
        navigate(-1);
    }
  return (
    <div>
        <TitleHeader title='성수동 모음' center onClick={handleClick}/>
    </div>
  )
}

export default SolmarkPlacePreviewPage