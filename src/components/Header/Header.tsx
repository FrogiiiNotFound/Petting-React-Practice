import plus from 'images/Header/plus.svg';
import avatar from 'images/Header/profile.svg';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setActiveLink } from '../../redux/Slices/navigationSlice';
import type { RootState } from '../../redux/store';

export const Header = () => {
  const dispatch = useDispatch();

  const { isAuth } = useSelector((state: RootState) => state.auth);
  const { activeLink } = useSelector((state: RootState) => state.navigation);

  return (
    <div className="py-block bg-[#F8F8F8] py-[20px]">
      <div className="_container text-black ">
        <div className="flex justify-between items-center">
          <div className="flex gap-[40px] items-center">
            <NavLink to="/" onClick={() => dispatch(setActiveLink('/'))}>
              <div className="text-4xl cursor-pointer flex max-md:text-2xl">
                <p>Petting</p>
                <p className="text-sm">℗</p>
              </div>
            </NavLink>
            <div className="flex gap-[20px] max-[530px]:hidden">
              <NavLink to="/" onClick={() => dispatch(setActiveLink('/'))}>
                <p
                  className={`cursor-pointer hover:scale-110 ${
                    activeLink === '/' ? '_active' : ''
                  }`}>
                  Главная
                </p>
              </NavLink>
              <NavLink
                to="/petSearch/all-pets"
                onClick={() => dispatch(setActiveLink('/petSearch/all-pets'))}>
                <p
                  className={`cursor-pointer hover:scale-110 ${
                    activeLink === '/petSearch/all-pets' ? '_active' : ''
                  }`}>
                  Все объявления
                </p>
              </NavLink>
            </div>
          </div>
          <div className="flex gap-[20px] items-center">
            <div className="flex gap-[10px] max-[900px]:hidden">
              <p className="cursor-pointer hover:scale-104">RU</p>
              <p className="select-none">|</p>
              <p className=" text-gray-600 ">EN</p>
            </div>
            <div className="flex gap-[20px] items-center max-[530px]:!gap-[10px]">
              {isAuth ? (
                <NavLink to="add-pet" onClick={() => dispatch(setActiveLink(''))}>
                  <div className="max-[900px]:block md:hidden flex gap-[10px] items-center bg-green-300 p-[10px] rounded-xl cursor-pointer hover:scale-104">
                    <div>
                      <img className="w-[20px]" src={plus} alt="" />
                    </div>
                    <p className="md:hidden">Добавить объявление</p>
                  </div>
                </NavLink>
              ) : (
                <NavLink to="sign-up" onClick={() => dispatch(setActiveLink(''))}>
                  <div className="flex gap-[10px] items-center bg-green-300 p-[10px] rounded-xl cursor-pointer hover:scale-104">
                    <div>
                      <img className="w-[20px] max-[530px]:w-[10px]" src={plus} alt="" />
                    </div>
                    <p className="max-[900px]:hidden">Добавить объявление</p>
                  </div>
                </NavLink>
              )}
              <div>
                {isAuth ? (
                  <NavLink to="/my-profile">
                    <div
                      className="flex gap-[10px] items-center cursor-pointer hover:scale-110"
                      onClick={() => dispatch(setActiveLink(''))}>
                      <div className="bg-gray-200 p-[10px] border-gray-300 rounded-[50%]">
                        <img className="w-[20px]" src={avatar} alt="" />
                      </div>
                    </div>
                  </NavLink>
                ) : (
                  <div
                    className="flex gap-[10px] items-center cursor-pointer hover:scale-110"
                    onClick={() => dispatch(setActiveLink(''))}>
                    <NavLink to="/sign-up">
                      <p className="text-md max-[530px]:text-sm">Создать аккаунт</p>
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
