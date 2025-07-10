import { useNavigate } from 'react-router-dom';
import { selectableIconMap } from '../../utils/icon';
import { SolroutePreview } from '../../types';
import StatusChip from './StatusChip';

interface SolrouteListCardProps {
  preview: SolroutePreview;
}

const SolroutePreviewCard: React.FC<SolrouteListCardProps> = ({ preview }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/solroute/${preview.id}`);
  };

  const Icon = selectableIconMap[preview.iconId];

  return (
    <div
      className='p-10 flex bg-white rounded-lg border-1 border-primary-200 items-center gap-9 self-stretch'
      onClick={handleClick}>
      {/* 아이콘*/}
      <div className='w-40 h-40 p-8 bg-primary-50 rounded flex items-center justify-center'>
        <Icon />
      </div>

      {/* 쏠루트 제목 */}
      <div className='flex flex-col grow min-w-0'>
        <p
          className='grow text-primary-950 text-sm font-bold leading-[150%] tracking-[-0.21px] text-ellipsis overflow-hidden'
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
          }}>
          {preview.name.length > 15
            ? preview.name.substring(0, 15) + '...'
            : preview.name}
        </p>
        <p className='text-primary-600 text-xs'>장소 {preview.placeCount}개</p>
      </div>

      {/* 완료 예정 토글 버튼*/}
      <div className='flex w-fit flex-col justify-end items-end gap-10'>
        <StatusChip id={preview.id} status={preview.status} />
      </div>
    </div>
  );
};

export default SolroutePreviewCard;
