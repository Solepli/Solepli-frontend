import Food from '../assets/category-icons/food.svg?react';
import Cafe from '../assets/category-icons/cafe.svg?react';
import Drink from '../assets/category-icons/drink.svg?react';
import Entertainment from '../assets/category-icons/entertainment.svg?react';
import Culture from '../assets/category-icons/culture.svg?react';
import Shop from '../assets/category-icons/shop.svg?react';
import Walk from '../assets/category-icons/walk.svg?react';
import Work from '../assets/category-icons/work.svg?react';

import FoodFill from '../assets/category-icons/foodFill.svg?react';
import CafeFill from '../assets/category-icons/cafeFill.svg?react';
import DrinkFill from '../assets/category-icons/drinkFill.svg?react';
import EntertainmentFill from '../assets/category-icons/entertainmentFill.svg?react';
import CultureFill from '../assets/category-icons/cultureFill.svg?react';
import ShopFill from '../assets/category-icons/shopFill.svg?react';
import WalkFill from '../assets/category-icons/walkFill.svg?react';
import WorkFill from '../assets/category-icons/workFill.svg?react';

import FoodBlack from '../assets/category-icons/foodBlack.svg?react';
import CafeBlack from '../assets/category-icons/cafeBlack.svg?react';
import DrinkBlack from '../assets/category-icons/drinkBlack.svg?react';
import EntertainmentBlack from '../assets/category-icons/entertainmentBlack.svg?react';
import CultureBlack from '../assets/category-icons/cultureBlack.svg?react';
import ShopBlack from '../assets/category-icons/shopBlack.svg?react';
import WalkBlack from '../assets/category-icons/walkBlack.svg?react';
import WorkBlack from '../assets/category-icons/workBlack.svg?react';

import FoodSmall from '../assets/category-icons/small/food.svg?react';
import CafeSmall from '../assets/category-icons/small/cafe.svg?react';
import DrinkSmall from '../assets/category-icons/small/drink.svg?react';
import EntertainmentSmall from '../assets/category-icons/small/entertainment.svg?react';
import CultureSmall from '../assets/category-icons/small/culture.svg?react';
import ShopSmall from '../assets/category-icons/small/shop.svg?react';
import WalkSmall from '../assets/category-icons/small/walk.svg?react';
import WorkSmall from '../assets/category-icons/small/work.svg?react';

import CafeMarker from '../assets/marker/cafeMarker.svg?url';
import CultureMarker from '../assets/marker/cultureMarker.svg?url';
import DrinkMarker from '../assets/marker/drinkMarker.svg?url';
import EntertainmentMarker from '../assets/marker/entertainmentMarker.svg?url';
import FoodMarker from '../assets/marker/foodMarker.svg?url';
import ShopMarker from '../assets/marker/shopMarker.svg?url';
import WalkMarker from '../assets/marker/walkMarker.svg?url';
import WorkMarker from '../assets/marker/workMarker.svg?url';

import Version1 from '../assets/selectableIconSet/version1.svg?react';
import Version2 from '../assets/selectableIconSet/version2.svg?react';
import Version3 from '../assets/selectableIconSet/version3.svg?react';
import Version4 from '../assets/selectableIconSet/version4.svg?react';
import Version5 from '../assets/selectableIconSet/version5.svg?react';
import Version6 from '../assets/selectableIconSet/version6.svg?react';
import Version7 from '../assets/selectableIconSet/version7.svg?react';
import Version8 from '../assets/selectableIconSet/version8.svg?react';
import Version9 from '../assets/selectableIconSet/version9.svg?react';
import Version10 from '../assets/selectableIconSet/version10.svg?react';
import Version11 from '../assets/selectableIconSet/version11.svg?react';
import Version12 from '../assets/selectableIconSet/version12.svg?react';
import Version13 from '../assets/selectableIconSet/version13.svg?react';
import Version14 from '../assets/selectableIconSet/version14.svg?react';

import CafeFillMedium from '../assets/category-icons/medium/cafe-fill-medium.svg?react';
import CityFillMedium from '../assets/locationFill.svg?react';
import CultureFillMedium from '../assets/category-icons/medium/culture-fill-medium.svg?react';
import DrinkFillMedium from '../assets/category-icons/medium/drink-fill-medium.svg?react';
import EntertainmentFillMedium from '../assets/category-icons/medium/entertainment-fill-medium.svg?react';
import FoodFillMedium from '../assets/category-icons/medium/food-fill-medium.svg?react';
import MarkFillMedium from '../assets/heartFill.svg?react';
import ShopFillMedium from '../assets/category-icons/medium/shop-fill-medium.svg?react';
import WalkFillMedium from '../assets/category-icons/medium/walk-fill-medium.svg?react';
import WorkFillMedium from '../assets/category-icons/medium/work-fill-medium.svg?react';

export const iconMap: Record<
  string,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  food: Food,
  cafe: Cafe,
  drink: Drink,
  entertainment: Entertainment,
  culture: Culture,
  shop: Shop,
  walk: Walk,
  work: Work,
};

export const iconFillMap: Record<
  string,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  food: FoodFill,
  cafe: CafeFill,
  drink: DrinkFill,
  entertainment: EntertainmentFill,
  culture: CultureFill,
  shop: ShopFill,
  walk: WalkFill,
  work: WorkFill,
};

export const iconBlackMap: Record<
  string,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  food: FoodBlack,
  cafe: CafeBlack,
  drink: DrinkBlack,
  entertainment: EntertainmentBlack,
  culture: CultureBlack,
  shop: ShopBlack,
  walk: WalkBlack,
  work: WorkBlack,
};

//sollect 장소 추가된 곳에 사용되는 아이콘
export const iconSmallMap: Record<
  string,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  food: FoodSmall,
  cafe: CafeSmall,
  drink: DrinkSmall,
  entertainment: EntertainmentSmall,
  culture: CultureSmall,
  shop: ShopSmall,
  walk: WalkSmall,
  work: WorkSmall,
};

export const IconMarkerMap: Record<string, string> = {
  food: FoodMarker,
  cafe: CafeMarker,
  drink: DrinkMarker,
  entertainment: EntertainmentMarker,
  culture: CultureMarker,
  shop: ShopMarker,
  walk: WalkMarker,
  work: WorkMarker,
};

export const iconNonlabelSearch: Record<
  string,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  cafe: CafeFillMedium,
  city: CityFillMedium,
  culture: CultureFillMedium,
  drink: DrinkFillMedium,
  entertainment: EntertainmentFillMedium,
  food: FoodFillMedium,
  mark: MarkFillMedium,
  shop: ShopFillMedium,
  walk: WalkFillMedium,
  work: WorkFillMedium,
};

export const selectableIconMap: Record<
  number,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  1: Version1,
  2: Version2,
  3: Version3,
  4: Version4,
  5: Version5,
  6: Version6,
  7: Version7,
  8: Version8,
  9: Version9,
  10: Version10,
  11: Version11,
  12: Version12,
  13: Version13,
  14: Version14,
};
