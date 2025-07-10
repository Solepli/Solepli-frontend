import { RefObject, useEffect, } from 'react';
import { SCALE_16_14 } from '../constants';

export const useInputAdjustScale = (
  inputRef: RefObject<HTMLInputElement | null>
) => {
  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      const inputWidth = inputElement.offsetWidth / SCALE_16_14 - 34;
      console.log(inputWidth);
      inputElement.style.width = `${inputWidth}px`;
      const inputWidthtMargin = inputWidth * (1 - SCALE_16_14);
      inputElement.style.marginRight = `-${inputWidthtMargin}px`;
    }
  }, []);

  return inputRef;
};
