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

import FoodBlack from "../assets/category-icons/foodBlack.svg?react"
import CafeBlack from "../assets/category-icons/cafeBlack.svg?react"
import DrinkBlack from "../assets/category-icons/DrinkBlack.svg?react"
import EntertainmentBlack from "../assets/category-icons/entertainmentBlack.svg?react"
import CultureBlack from "../assets/category-icons/cultureBlack.svg?react"
import ShopBlack from '../assets/category-icons/shopBlack.svg?react';
import WalkBlack from '../assets/category-icons/walkBlack.svg?react';
import WorkBlack from '../assets/category-icons/workBlack.svg?react';


export const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  food: Food,
  cafe: Cafe,
  drink: Drink,
  entertainment: Entertainment,
  culture: Culture,
  shop: Shop,
  walk: Walk,
  work: Work,
};


export const iconFillMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  food: FoodFill,
  cafe: CafeFill,
  drink: DrinkFill,
  entertainment: EntertainmentFill,
  culture: CultureFill,
  shop: ShopFill,
  walk: WalkFill,
  work: WorkFill,
};


export const iconBlackMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  food: FoodBlack,
  cafe: CafeBlack,
  drink: DrinkBlack,
  entertainment: EntertainmentBlack,
  culture: CultureBlack,
  shop: ShopBlack,
  walk: WalkBlack,
  work: WorkBlack,
};

