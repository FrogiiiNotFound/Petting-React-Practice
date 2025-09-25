import type { formValues } from '@/types/Forms';
import arrows from 'images/user/arrows.png';
import pawsIcon from 'images/user/paws.png';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getUserData, loginUser } from '../redux/Slices/authSlice';
import { useAppDispatch, type RootState } from '../redux/store';

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const form = useForm<formValues>({
    mode: 'onChange',
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const createToast = () => {
    toast('Успешный вход!', {
      description: 'Добро пожаловать',
      action: {
        label: 'Смотреть объявления',
        onClick: () => navigate('/petSearch/all-pets'),
      },
    });
  };
  
  const onSubmit = async (data: formValues) => {
    dispatch(loginUser(data));
    dispatch(getUserData(data));
    createToast();
    reset();
  };

  return (
    <div className="py-block">
      <div className="_container py-[100px] text-black">
        <h2 className="text-3xl mb-[15px] text-center">Войти</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[492px] mx-auto"
          action=""
          noValidate>
          <div className="flex flex-col mb-[20px]">
            <input
              required
              type="text"
              id="Login"
              className={`px-5
                py-3
                pl-5
                border
                border-gray-300
                rounded-xl
                focus:ring-4
                focus:ring-green-200
                text-black
                font-medium
                text-lg
                shadow-md
                transition-all
                duration-300
                font-nunito
                !bg-white ${errors.login ? 'register__error-input' : ''}`}
              placeholder="Логин*"
              {...register('login', {
                required: 'Логин обязателен',
                minLength: {
                  value: 3,
                  message: 'Логин может быть не менее 3 символов',
                },
              })}
            />
            <p className="register__error-message">{errors.login?.message}</p>
          </div>
          <div className="flex flex-col mb-[20px]">
            <input
              required
              type="password"
              placeholder="Пароль*"
              id="password"
              className={`px-5
                py-3
                pl-5
                border
                border-gray-300
                rounded-xl
                focus:ring-4
                focus:ring-green-200
                text-black
                font-medium
                text-lg
                shadow-md
                transition-all
                duration-300
                font-nunito
                !bg-white ${errors.password ? 'register__error-input' : ''}`}
              {...register('password', {
                required: 'Пароль обязателен',
                minLength: {
                  value: 5,
                  message: 'Пароль может быть не менее 5 символов',
                },
              })}
            />
            <p className="register__error-message">{errors.password?.message}</p>
          </div>
          <div className="flex items-center justify-center gap-[10px]">
            <button
              disabled={isAuth}
              type="submit"
              className={`button-dark-green ${isAuth ? '_disabled' : ''}`}
              aria-label="Создать аккаунт">
              <div>
                <img className="w-[20px]" src={pawsIcon} alt="pawsIcon" />
              </div>
              <p>Войти</p>
            </button>
          </div>
          <NavLink to="/sign-up">
            <div className="flex gap-[10px] justify-center items-center cursor-pointer hover:text-gray-500">
              <div>
                <img className="w-[15px]" src={arrows} alt="" />
              </div>
              <p className="cursor-pointer text-center text-sm">Регистрация</p>
            </div>
          </NavLink>
        </form>
      </div>
    </div>
  );
};
