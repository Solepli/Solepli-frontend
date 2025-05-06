import { useState, useEffect } from 'react';

const useDebounce = <T extends string>(value: T, delay: number = 500): T => {
  const [debounceValue, setDebounceValue] = useState<T>(
    () => value.trim() as T
  );

  useEffect(() => {
    // useDebounce 훅은 api로 바로 보낼 문자열을 반환하기 때문에 자체적으로 trim을 수행하도록 한다.
    const trimmed = value.trim() as T;

    if (!trimmed) {
      return;
    }

    const timer = setTimeout(() => {
      setDebounceValue(trimmed);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
