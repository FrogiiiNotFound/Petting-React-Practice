import catPaw from 'images/not-found/cat-footprint.png';
import arrow from 'images/not-found/arrow.png';
import { NavLink } from 'react-router-dom';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';

export const NotFound = () => {
  return (
    <div className="py-block py-[150px] text-center h-[64vh]">
      <div className="_container">
        <div className="flex gap-[20px] items-center justify-center">
          <div className="rotate-[-20deg]">
            <img src={catPaw} alt="" />
          </div>
          <p className="text-8xl mb-[20px]">404</p>
          <div className="rotate-[20deg]">
            <img src={catPaw} alt="" />
          </div>
        </div>
        <p className="text-xl mb-[20px]">
          Страница, которую вы ищете, не найдена или была удалена.
        </p>
        <NavLink to="/">
          <div className="button-green mx-auto items-center max-w-[190px] cursor-pointer">
            <p className="min-w-[100px]">На главную</p>
            <div>
              <img src={arrow} alt="" />
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};
