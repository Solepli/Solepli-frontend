import { categories } from '../../../utils/category';
import SollectChip from './SollectChip';

const SollectChipList = () => {
  return (
    <div className='flex p-16 pt-4 gap-10 overflow-x-scroll border-b-1 border-grayScale-100'>
      {categories.map((category) => {
        return <SollectChip category={category} key={category.id} />;
      })}
    </div>
  );
};

export default SollectChipList;
