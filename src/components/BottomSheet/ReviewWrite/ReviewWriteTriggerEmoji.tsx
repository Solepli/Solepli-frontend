import { useNavigate } from 'react-router-dom';
import LoginRequiredAction from '../../../auth/LoginRequiredAction';
import ReviewEmoji from './ReviewEmoji';

interface ReviewWriteTriggerEmojiProps {
  placeId: number;
  placeName: string;
}

const ReviewWriteTriggerEmoji: React.FC<ReviewWriteTriggerEmojiProps> = ({
  placeId,
  placeName,
}) => {
  //로그인을 안했다면 로그인을 요청한 후 리뷰 작성 page로 넘어감
  const navigate = useNavigate();
  const handleEmojiClick = () => {
    navigate(`/map/review-write/${placeId}`, {
      state: { place: placeName },
    });
  };

  return (
    <LoginRequiredAction onAction={handleEmojiClick}>
      <ReviewEmoji />
    </LoginRequiredAction>
  );
};

export default ReviewWriteTriggerEmoji;
