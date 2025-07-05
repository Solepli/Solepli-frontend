import { Category, SollectPhotoType } from './types';

export interface ReloadMarkerButtonProps {
  handleClick: () => void;
}

export interface CurrentLocationButtonProps {
  handleClick: () => void;
}

export interface TitleHeaderProps {
  title: string;
  onClick(): void;
  center?:boolean;
}

export interface SollectPhotoProps {
  sollect: SollectPhotoType;
}

export interface SollectChipProps {
  category: Category;
}

export interface SollectListProps {
  horizontal?: boolean;
  customStyle?: string;
  isMine?:boolean;
  recommendSollect?:SollectPhotoType[];
}

export interface SollectGroupProps {
  sollects: SollectPhotoType[];
  title: string;
}
