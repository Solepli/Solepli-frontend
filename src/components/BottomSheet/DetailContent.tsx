import React from 'react'
import ContentTitle from './ContentTitle'
import { places } from '../../places'
import ReviewRange from './ReviewRange'
import TagList from './TagList'

const DetailContent:React.FC = () => {
  const place = places[0];
  const tags1 = ["조용한", "편안한", "고급스러운"];
  const tags2 = ["1인 좌석이 있는", "1인 메뉴가 있는", "콘센트가 많은"];
  const counts = [2, 3, 1];

  return (
    <div>
        {/* ContentTitle */}
        <ContentTitle place={place} property='detail'/>

        {/* ReviewRange */}
        <ReviewRange rating={place.rating} recommend={90}/>

        {/* tags */}
        <TagList headerName='분위기' tags={tags1} counts={counts}/>
        <TagList headerName='1인 이용' tags={tags2} counts={counts}/>

        {/* ReviewPhotoList */}
        

    </div>
  )
}

export default DetailContent