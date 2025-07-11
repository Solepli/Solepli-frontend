import { useQuery } from '@tanstack/react-query';
import { validateNickname } from '../api/profileApi';
import useAuthStore from '../store/authStore';

const useNicknameValidation = (nickname: string) => {
  const { nickname: currentNickname } = useAuthStore();
  const isValidFormat = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9._-]{1,20}$/.test(nickname);
  const isSameAsCurrent = nickname === currentNickname;
  const isEmpty = nickname.length === 0;
  const isValid = !isEmpty && !isSameAsCurrent && isValidFormat;

  const { data, isError } = useQuery({
    queryKey: ['validateNickname', nickname],
    queryFn: () => validateNickname(nickname),
    enabled: isValid,
    retry: false,
  });

  const isAvailable = data?.success === true;

  let message = '';
  if (isEmpty) {
    message = '닉네임을 입력해주세요.';
  } else if (!isValidFormat) {
    message = '입력 불가능한 기호가 포함되어 있습니다 (. _ - 만 허용)';
  } else if (data?.success === false) {
    message = data.message || '이미 사용 중인 닉네임입니다.';
  } else if (data?.success === true) {
    message = '사용 가능한 닉네임입니다.';
  }

  return {
    isAvailable,
    isError,
    isSameAsCurrent,
    isValidFormat,
    message,
  };
};

export default useNicknameValidation;
