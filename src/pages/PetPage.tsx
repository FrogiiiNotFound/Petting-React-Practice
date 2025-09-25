import { receivePet } from '@/redux/Slices/petsSlice';
import { useAppDispatch } from '@/redux/store';
import petTemplateImage from 'images/petPage/templateImage.jpg';
import { NavLink, useSearchParams } from 'react-router-dom';

const PetPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');
  console.log(id);

  // const petData = dispatch(receivePet())
  return (
    <div className="py-block">
      <div className="_container">
        <div className="flex justify-between my-[60px]">
          <div className="flex gap-[40px] mb-[100px] !bg-white p-[30px] shadow-xl rounded-md">
            <div>
              <img className="w-[300px]" src={petTemplateImage} alt="petImage" />
            </div>
            <div>
              <div className="flex gap-[40px] mb-[30px]">
                <div>
                  <p className="text-lg">Имя</p>
                  <p className="text-2xl">Dogyyy</p>
                </div>
                <div>
                  <p className="text-lg">Вид</p>
                  <p className="text-2xl">Собака</p>
                </div>
              </div>
              <div>
                <p className="text-lg mb-[10px]">Теги:</p>
                <div className="flex flex-wrap gap-[10px] max-w-[500px] mb-[30px]">
                  <p className="bg-green-200 py-[3px] px-[5px] rounded-md text-[15px]">
                    Общительная
                  </p>
                  <p className="bg-green-200 py-[3px] px-[5px] rounded-md text-[15px]">
                    Общительная
                  </p>
                  <p className="bg-green-200 py-[3px] px-[5px] rounded-md text-[15px]">
                    Общительная
                  </p>
                  <p className="bg-green-200 py-[3px] px-[5px] rounded-md text-[15px]">
                    Общительная
                  </p>
                  <p className="bg-green-200 py-[3px] px-[5px] rounded-md text-[15px]">
                    Общительная
                  </p>
                  <p className="bg-green-200 py-[3px] px-[5px] rounded-md text-[15px]">
                    Общительная
                  </p>
                </div>
              </div>
              <div className="flex gap-[40px]">
                <div>
                  <p className="text-lg">Статус:</p>
                  <p className="text-2xl">Ищет хозяина</p>
                </div>
                <div>
                  <p className="text-lg">Написать:</p>
                  <div>
                    <p className="text-[20px]">+7 987 875 38 98</p>
                    <p className="text-[20px]">igonAndrey@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-2xl p-[20px] pl-[50px] flex flex-col justify-between text-right">
            <div>
              <NavLink to="petSearch/all-pets">
                <p className="text-[18px] mb-[10px] border-b border-black hover:!text-gray-500">
                  Все объявления
                </p>
              </NavLink>
              <p className="mb-[6px] hover:!text-gray-500 cursor-pointer">Мои объявления</p>
              <p className="mb-[6px] hover:!text-gray-500 cursor-pointer">Собаки</p>
              <p className="mb-[6px] hover:!text-gray-500 cursor-pointer">Кошки</p>
              <p className="mb-[6px] hover:!text-gray-500 cursor-pointer">Хомяки</p>
              <p className="mb-[6px] hover:!text-gray-500 cursor-pointer">Привитые</p>
              <p className="mb-[6px] hover:!text-gray-500 cursor-pointer">С документами</p>
              <p className="mb-[6px] hover:!text-gray-500 cursor-pointer">Экзотические</p>
              <p className="mb-[6px] hover:!text-gray-500 cursor-pointer">Дресированные</p>
              <p className="mb-[6px] hover:!text-gray-500 cursor-pointer">Популярные</p>
            </div>
            <div>
              <div className="flex mb-[10px] justify-end">
                <p>Petting</p>
                <p className="text-sm">℗</p>
              </div>
              <p className="text-sm mb-[3px] cursor-pointer hover:!text-gray-500">Наша команда</p>
              <p className="text-sm cursor-pointer hover:!text-gray-500">Вакансии</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetPage;
