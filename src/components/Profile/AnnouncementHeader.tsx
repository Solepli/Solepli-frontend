import { Announcement } from '../../types';
import arrowIcon from '../../assets/arrow.svg';

interface AnnouncementHeaderProps {
  announcement: Announcement;
  arrow?: boolean;
}

const AnnouncementHeader: React.FC<AnnouncementHeaderProps> = ({
  announcement,
  arrow,
}) => {
  return (
    <div className='p-16 flex gap-8 justify-between items-center'>
      <div>
        <p className='mb-4 text-primary-950 font-semibold'>
          {announcement.title}
        </p>
        <p className='text-primary-500 text-xs'>{announcement.createdAt}</p>
      </div>
      {arrow && <img src={arrowIcon} alt='' className='w-24 h-24' />}
    </div>
  );
};

export default AnnouncementHeader;
