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
}

export interface SollectPhotoProps {
  sollect: SollectPhotoType;
}

export interface SollectChipProps {
  category: Category;
}

export interface SollectListProps {
  sollects: SollectPhotoType[];
  horizontal?: boolean;
  customStyle?: string;
}

export interface SollectGroupProps {
  sollects: SollectPhotoType[];
  title: string;
}
