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
      queryClient.invalidateQueries({ queryKey: ['solroute'] });
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
    <div className='w-58 flex py-2 px-16 justify-center items-center gap-10 rounded-lg border-1 border-secondary-700 bg-secondary-700'>
      <span className='overflow-hidden text-secondary-50 overflow-ellipsis text-sm font-bold leading-[150%] tracking-[-0.21px]'>
        완료
      </span>
    </div>
  );
};

const PlannedChip: React.FC = () => {
  return (
    <div className='w-58 flex py-2 px-16 justify-center items-center gap-10 rounded-lg border-1 border-solid border-secondary-700'>
      <span className='overflow-hidden text-secondary-600 overflow-ellipsis text-sm font-bold leading-[150%] tracking-[-0.21px]'>
        예정
      </span>
    </div>
  );
};
