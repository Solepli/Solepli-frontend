import React, { useEffect } from 'react';
import TitleHeader from '../../components/global/TitleHeader';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAnnouncement } from '../../api/profileApi';
import AnnouncementHeader from '../../components/Profile/AnnouncementHeader';
import { useAnnouncementStore } from '../../store/announcementStore';

const Announcement = () => {
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchAnnouncement,
  });

  const { setAnnouncementList, announcementList } = useAnnouncementStore();

  useEffect(() => {
    if (data) {
      setAnnouncementList(data);
    }
  }, [data, setAnnouncementList]);

  return (
    <div>
      <TitleHeader title='공지사항' onClick={() => navigate(-1)} center />
      <div className='pt-58'>
        {announcementList?.map((announcement) => {
          return (
            <AnnouncementHeader announcement={announcement} arrow={true} />
          );
        })}
      </div>
    </div>
  );
};

export default Announcement;
