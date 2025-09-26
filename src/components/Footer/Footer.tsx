import footerDecor2 from 'images/footer/cat.gif';
import instagram from 'images/footer/instagram.png';
import telegram from 'images/footer/telegram.png';
import tiktok from 'images/footer/tiktok.png';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setActiveLink } from '../../redux/Slices/navigationSlice';

export const Footer = () => {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('+7(987)175-29-73');
  const [phoneNumber2, setPhoneNumber2] = useState('+7(987)281-86-58');

  const copyPhone = (event: React.MouseEvent<HTMLAnchorElement>, number: string, setText: any) => {
    event.preventDefault();
    navigator.clipboard
      .writeText(number)
      .then(() => setText('Номер скопирован!'))
      .finally(() => setTimeout(() => setText(number), 2000));
  };

  return (
    <div className="py-block bg-green-900 pt-[40px] pb-[20px] text-white relative">
      <div className="_container flex gap-[100px]">
        <NavLink to="/">
          <div className="text-3xl cursor-pointer flex">
            <p>Petting</p>
            <p className="text-sm">℗</p>
          </div>
        </NavLink>
        <div>
          <h3 className="text-2xl mb-[20px]">Основное</h3>
          <ul>
            <li className="mb-[7px]">
              <NavLink
                className="cursor-pointer hover:!text-gray-300"
                to="/"
                onClick={() => dispatch(setActiveLink('/'))}>
                Главная
              </NavLink>
            </li>
            <li className="mb-[7px]">
              <NavLink
                className="cursor-pointer hover:!text-gray-300"
                to="/petSearch/all-pets"
                onClick={() => dispatch(setActiveLink('/petSearch/all-pets'))}>
                Все объявления
              </NavLink>
            </li>
            <li>
              <NavLink
                className="cursor-pointer hover:!text-gray-300"
                to="/petSearch/my-pets"
                onClick={() => dispatch(setActiveLink('/petSearch/all-pets'))}>
                Мои объявления
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl mb-[20px]">Дополнительно</h3>
          <ul>
            <li className="mb-[7px]">
              <a
                className="cursor-pointer hover:!text-gray-300"
                href="https://youtu.be/dQw4w9WgXcQ?si=0C4q-rkTuCf22v4X">
                FAQ
              </a>
            </li>
            <li className="mb-[7px]">
              <a
                className="cursor-pointer hover:!text-gray-300"
                href="https://youtu.be/dQw4w9WgXcQ?si=0C4q-rkTuCf22v4X">
                Terms and conditions
              </a>
            </li>
            <li>
              <a
                className="cursor-pointer hover:!text-gray-300"
                href="https://youtu.be/dQw4w9WgXcQ?si=0C4q-rkTuCf22v4X">
                RickRoll
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl mb-[20px]">О компании</h3>
          <ul>
            <li className="mb-[7px]">
              <a
                className="cursor-pointer hover:!text-gray-300"
                href="https://t.me/FrogiiiNotFound">
                Наша команда
              </a>
            </li>
            <li className="mb-[7px]">
              <a
                className="cursor-pointer hover:!text-gray-300"
                href="https://t.me/FrogiiiNotFound">
                Вакансии
              </a>
            </li>
            <li>
              <a
                className="cursor-pointer hover:!text-gray-300"
                href="https://t.me/FrogiiiNotFound">
                Блог
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl mb-[20px]">Наши контакты</h3>
          <ul>
            <li className="mb-[7px]">
              <a
                className="cursor-pointer hover:!text-gray-300"
                href={`tel:${phoneNumber}`}
                onClick={(e) => copyPhone(e, phoneNumber, setPhoneNumber)}>
                {phoneNumber}
              </a>
            </li>
            <li className="mb-[7px]">
              <a
                className="cursor-pointer hover:!text-gray-300"
                href={`tel:${phoneNumber2}`}
                onClick={(e) => copyPhone(e, phoneNumber2, setPhoneNumber2)}>
                {phoneNumber2}
              </a>
            </li>
            <li className="">
              <ul className="flex gap-[7px]">
                <li className="cursor-pointer">
                  <a href="https://t.me/FrogiiiNotFound">
                    <img className="w-[35px]" src={telegram} alt="telegram" />
                  </a>
                </li>
                <li className="cursor-pointer">
                  <a href="https://t.me/FrogiiiNotFound">
                    <img className="w-[35px]" src={instagram} alt="instagram" />
                  </a>
                </li>
                <li className="cursor-pointer">
                  <a href="https://t.me/FrogiiiNotFound">
                    <img className="w-[35px]" src={tiktok} alt="tiktok" />
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex gap-[10px] justify-center items-center mt-[50px] border-t-1 pt-[20px]">
        <div className="flex">
          <p className="text-sm">Petting</p>
          <p className="text-[10px]">℗</p>
        </div>
        <p className="text-sm">All rights reserved</p>
      </div>
      <div className="absolute top-[-12.5%] right-[10px] max-w-[50px]">
        <img src={footerDecor2} alt="" />
      </div>
    </div>
  );
};
