import { useState } from 'react';
import TitleHeader from '../../components/global/TitleHeader';
import { useNavigate } from 'react-router-dom';
import XButtonCircle from '../../components/XButtonCircle';
import { categories } from '../../utils/category';
import CategoryTag from '../../components/Profile/CategoryTag';
import LargeButton from '../../components/global/LargeButton';
import { postPlaceRequest } from '../../api/profileApi';

const AddPlacePage = () => {
  const navigate = useNavigate();
  const [placeName, setPlaceName] = useState('');
  const [address, setAdderss] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [note, setNote] = useState('');

  const deletePlaceName = () => {
    setPlaceName('');
  };

  const deleteAddress = () => {
    setAdderss('');
  };

  const handleCategoryClick = (categoryId: string) => {
    if (
      selectedCategories.some(
        (selectedCategory) => selectedCategory === categoryId
      )
    ) {
      setSelectedCategories(
        selectedCategories.filter(
          (selectedCategory) => selectedCategory !== categoryId
        )
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleSubmit = async () => {
    const requestBody = {
    placeName: placeName.trim(),
    address: address.trim(),
    category: selectedCategories,
    note: note,
  };

  await postPlaceRequest(requestBody);
  navigate('/profile');
  };

  const headerStyle = 'text-primary-950 text-sm font-bold';
  const divStyle = 'text-sm gap-8 flex flex-col';
  return (
    <div>
      <TitleHeader title='장소 추가 요청' onClick={() => navigate(-1)} center />
      <div className='pt-58'></div>
      <div className='p-16 flex flex-col gap-32'>
        <div className={divStyle}>
          <p className={headerStyle}>
            장소명<span className='text-error'>*</span>
          </p>
          <div className='flex justify-between border-b-1 items-center border-primary-200 py-4'>
            <input
              type='text'
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
              className='w-300 focus:outline-none'
            />

            <div className='flex'>
              <XButtonCircle onClickFunc={deletePlaceName} />

              <p className='text-sm text-end text-primary-500'>
                ({placeName.length}/30)
              </p>
            </div>
          </div>
        </div>
        <div className={divStyle}>
          <p className={headerStyle}>
            주소<span className='text-error'>*</span>
          </p>
          <div className='flex justify-between border-b-1 items-center border-primary-200 py-4'>
            <input
              type='text'
              value={address}
              onChange={(e) => setAdderss(e.target.value)}
              className='w-300 focus:outline-none'
            />

            <div className='flex'>
              <XButtonCircle onClickFunc={deleteAddress} />

              <p className='text-sm text-end text-primary-500'>
                ({address.length}/30)
              </p>
            </div>
          </div>
        </div>
        <div className={divStyle}>
          <p className={headerStyle}>
            카테고리 선택<span className='text-error'>*</span>
          </p>
          <div className='grid grid-cols-4 grid-rows-2'>
            {categories.map((category) => {
              return (
                <CategoryTag
                  key={category.id}
                  category={category}
                  selected={selectedCategories.some(
                    (selectedCategory) => selectedCategory === category.id
                  )}
                  onClick={() => handleCategoryClick(category.id)}
                />
              );
            })}
          </div>
        </div>

        <div className={divStyle}>
          <p className={headerStyle}>추가 메모</p>
          <div className='border-1 border-primary-100 px-12 py-8 rounded-xl bg-primary-50 self-stretch w-full mb-24'>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder='(선택) 장소와 관련해 더 남기실 말이 있다면 적어주세요.'
              className='text-primary-950 placeholder:text-primary-500 focus:outline-none focus:ring-0 resize-none self-stretch] text-sm min-h-86 w-full'
            />
            <div className='self-stretch text-secondary-500 text-right text-xs'>
              ({note.length}/500)
            </div>
          </div>
          <LargeButton text='전송' onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default AddPlacePage;
