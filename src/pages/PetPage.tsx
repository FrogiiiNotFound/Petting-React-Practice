import { receivePet } from '@/redux/Slices/petsSlice';
import { useAppDispatch } from '@/redux/store';
import type { TPetInfo } from '@/types/Slices/SearchSlice';
import petTemplateImage from 'images/petPage/templateImage.jpg';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

const PetPage = () => {
  const dispatch = useAppDispatch();
  const [phoneNumber, setPhoneNumber] = useState('+7(987)175-29-73');
  const [currentPet, setCurrentPet] = useState<TPetInfo>({
    id: 100,
    category: {
      id: 100,
      name: '',
    },
    name: '',
    photoUrls: [],
    tags: [],
    status: '',
  });
  const { id } = useParams();

  const receivePetData = async () => {
    const petData = await dispatch(receivePet('1001'));

    setCurrentPet(petData.payload);
    console.log(petData.payload);
  };
  const copyPhone = (event: React.MouseEvent<HTMLAnchorElement>, number: string, setText: any) => {
    event.preventDefault();
    navigator.clipboard
      .writeText(number)
      .then(() => setText('Номер скопирован!'))
      .finally(() => setTimeout(() => setText(number), 2000));
  };

  useEffect(() => {
    receivePetData();
  }, []);

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
                  <p className="text-[14px]">Имя</p>
                  <p className="text-2xl">{currentPet.name}</p>
                </div>
                <div>
                  <p className="text-[14px]">Вид</p>
                  <p className="text-xl">{currentPet.category.name}</p>
                </div>
              </div>
              <div>
                <p className="text-[14px] mb-[10px]">Теги:</p>
                <div className="flex flex-wrap gap-[10px] max-w-[500px] mb-[30px]">
                  {currentPet.tags.map((tag) => {
                    return (
                      <p className="bg-green-200 py-[3px] px-[5px] rounded-md text-[15px]">
                        {tag.name}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-[80px]">
                <div>
                  <p className="text-[14px]">Статус:</p>
                  <p className="text-xl">Ищет хозяина</p>
                </div>
                <div>
                  <p className="text-[14px]">Написать:</p>
                  <div>
                    <a
                      className="cursor-pointer hover:!text-gray-500"
                      href={`tel:${phoneNumber}`}
                      onClick={(e) => copyPhone(e, phoneNumber, setPhoneNumber)}>
                      {phoneNumber}
                    </a>
                    <div className="cursor-pointer hover:!text-gray-500">
                      <a href={`mailto:frogiiinotfound@gmail.com`} className="text-[16px]">
                        frogiiinotfound@gmail.com
                      </a>
                    </div>
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
              <div>
                <a
                  href="https://t.me/FrogiiiNotFound"
                  className="text-sm mb-[3px] cursor-pointer hover:!text-gray-500">
                  Наша команда
                </a>
              </div>
              <div>
                <a
                  href="https://t.me/FrogiiiNotFound"
                  className="text-sm cursor-pointer hover:!text-gray-500">
                  Вакансии
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetPage;
