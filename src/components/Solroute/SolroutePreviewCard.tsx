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
      className='p-10 flex bg-white rounded-lg border-1 border-primary-200 items-center gap-9 relative'
      onClick={handleClick}>
      {/* 아이콘*/}
      <div className='w-40 h-40 bg-primary-50 rounded flex items-center justify-center'>
        <Icon />
      </div>

      {/* 쏠루트 제목 */}
      <div className='flex-1'>
        <p className='text-primary-950 text-sm font-bold'>{preview.name}</p>
        <p className='text-primary-600 text-xs'>장소 {preview.placeCount}개</p>
      </div>

      {/* 완료 예정 토글 버튼*/}
      <div className='absolute bottom-10 right-10'>
        <StatusChip id={preview.id} status={preview.status} />
      </div>
    </div>
  );
};

export default SolroutePreviewCard;
