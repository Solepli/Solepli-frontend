import { useSollectDetailStore } from '../../../store/sollectDetailStore';
import PreviewContentSummary from '../../Place/PreviewContentSummary';

const PlaceSummaryList = () => {
  const { placeSummaries } = useSollectDetailStore();

  return (
    <div>
      {placeSummaries.map((place, index) => {
        return <PreviewContentSummary key={index} place={place} />;
      })}
    </div>
  );
};

export default PlaceSummaryList;
