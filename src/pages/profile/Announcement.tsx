import React from 'react'
import TitleHeader from '../../components/global/TitleHeader'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { fetchAnnouncement } from '../../api/profileApi';

const Announcement = () => {
    const navigate = useNavigate();

    const { data } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchAnnouncement,
  });
  return (
    <div>
      <TitleHeader title='공지사항' onClick={() => navigate(-1)} center />
      <div className='pt-58'>
        {data.map((notice) => {
          return (
            <div>
              <div>
                <p>{notice.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Announcement