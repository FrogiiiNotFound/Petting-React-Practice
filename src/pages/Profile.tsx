import { useSelector } from 'react-redux';
import defaultPicture from 'images/Header/profile.svg';
import type { RootState } from '../redux/store';
import phone from 'images/profile/phone.png';
import email from 'images/profile/email.png';
import { NavLink } from 'react-router-dom';

export const Profile = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  console.log(userData);

  return (
    <div className="py-block my-[40px]">
      <div className="_container pt-[20px] text-black flex justify-center gap-[50px]">
        <div className="bg-white rounded-xl shadow-2xl p-[20px] pr-[60px] flex flex-col justify-between">
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
            <div className="flex mb-[10px]">
              <p>Petting</p>
              <p className="text-sm">℗</p>
            </div>
            <p className="text-sm mb-[3px] cursor-pointer hover:!text-gray-500">Наша команда</p>
            <p className="text-sm cursor-pointer hover:!text-gray-500">Вакансии</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-2xl p-[40px]">
          <div className="flex gap-[40px] justify-center">
            <div>
              <img
                className="w-[150px] p-[10px] border border-black rounded-[10%]"
                src={defaultPicture}
                alt="defaultPicture"
              />
            </div>
            <div>
              <div className="flex gap-[400px] items-center">
                <div>
                  <div className="flex gap-[7px] items-center mb-[5px]">
                    <h2 className="text-2xl">{userData.firstName}</h2>
                    <p className="text-2xl">{userData.lastName}</p>
                  </div>
                  <h2 className="text-[16px]">@{userData.username}</h2>
                </div>
                <div className="flex gap-[10px] items-center">
                  <a href={`tel:${userData.phone}`}>
                    <div
                      className="
                    cursor-pointer
                  text-white
                  mx-auto
                  flex gap-[10px]
                  font-semibold
                  py-3
                  px-6
                  rounded-md
                  shadow-xl
                  hover:shadow-lg
                  !bg-green-600
                  hover:!bg-green-800
                  focus:ring-4
                  focus:ring-green-200
                  focus:!bg-green-300
                  focus:ring-opacity-75
                  transition-colors
                  duration-300
                ">
                      <p>Позвонить</p>
                    </div>
                  </a>
                  <a href="">
                    <div
                      className="
                    cursor-pointer
                    font-semibold
                  py-2
                  px-4
                  rounded-md
                  shadow-md
                  border
                  border-gray-300
                  hover:bg-gray-100">
                      <p>Написать</p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="mt-[40px]">
                <h3 className="text-[24px] mb-[15px]">Контакты для связи:</h3>
                <a href={`tel:${userData.phone}`}>
                  <div className="mb-[10px] flex gap-[10px] items-center cursor-pointer">
                    <div>
                      <img className="max-w-[20px]" src={phone} alt="" />
                    </div>
                    <p>{userData.phone}</p>
                  </div>
                </a>
                <a href={`mailto:${userData.phone}`}>
                  <div className="flex gap-[10px] items-center cursor-pointer">
                    <div>
                      <img className="max-w-[20px]" src={email} alt="" />
                    </div>
                    <p>{userData.email}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div>
            <p className="text-2xl mt-[100px] ml-[40px]">Объявления пользователя:</p>
            <div>
              <p className="p-[100px] text-center text-xl">У пользователя пока нет объявлений</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
