import { useNavigate, useParams } from 'react-router-dom';
import TitleHeader from '../../components/global/TitleHeader';
import AnnouncementHeader from '../../components/Profile/AnnouncementHeader';
import { fetchAnnouncementDetail } from '../../api/profileApi';
import { useEffect } from 'react';
import { useAnnouncementStore } from '../../store/announcementStore';
import { useQuery } from '@tanstack/react-query';

const AnnouncementDetailPage = () => {
  const navigate = useNavigate();

  const { announcementId } = useParams();
  console.log(announcementId);

  const { setAnnouncement, announcement } = useAnnouncementStore();

  const { data } = useQuery({
    queryKey: ['announcementDetail'],
    queryFn: () => fetchAnnouncementDetail(Number(announcementId)),
  });

  useEffect(() => {
    if (data) {
      setAnnouncement(data);
    }
  }, [data, setAnnouncement]);

  return (
    <div>
      <TitleHeader title='공지사항' onClick={() => navigate(-1)} center />
      {announcement && (
        <div className='pt-58'>
          <AnnouncementHeader announcement={announcement} />
          <p className='border-t-1 border-grayScale-100 p-16 whitespace-pre-line'>
            {announcement.content}
          </p>
        </div>
      )}
    </div>
  );
};

export default AnnouncementDetailPage;
