import { SollectPhotoType } from "./types";

export interface CurrentLocationButtonProps {
  handleClick: () => void;
}

export interface TitleHeaderProps{
  title:string;
  onClick():void;
}

export interface SollectPhotoProps{
  sollect:SollectPhotoType;
}