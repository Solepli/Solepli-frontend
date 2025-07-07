import { patchStatus } from '../../api/solrouteApi';
import { queryClient } from '../../main';
import { useMutation } from '@tanstack/react-query';

interface StatusChipProps {
  id: number;
  status: boolean;
}

const StatusChip: React.FC<StatusChipProps> = ({ id, status }) => {

const mutation = useMutation({
  mutationFn: () => patchStatus(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['solroutes'] });
  },
});

const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
  mutation.mutate();
};

  return (
    <div onClick={(e) => handleClick(e)}>
      {status ? <CompletedChip /> : <PlannedChip />}
    </div>
  );
};

export default StatusChip;

const CompletedChip: React.FC = () => {
  return (
    <div className='self-stretch px-16 py-2 bg-secondary-700 rounded-lg outline outline-1 outline-offset-[-1px] outline-secondary-700 inline-flex justify-center items-center'>
      <span className='justify-start text-secondary-50 text-sm font-bold leading-tight'>
        완료
      </span>
    </div>
  );
};

const PlannedChip: React.FC = () => {
  return (
    <div className='self-stretch px-16 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-secondary-700 inline-flex justify-center items-center'>
      <span className='justify-start text-secondary-600 text-sm font-bold leading-tight'>
        예정
      </span>
    </div>
  );
};
