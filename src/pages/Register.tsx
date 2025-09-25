import { registerUser } from '@/redux/Slices/authSlice';
import { useAppDispatch, type RootState } from '@/redux/store';
import type { RegisterFormValue } from '@/types/Forms';
import arrows from 'images/user/arrows.png';
import pawsIcon from 'images/user/paws.png';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import '../css/register.css';

export const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<RegisterFormValue>();
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const createToast = () => {
    toast('Аккаунт успешно создан', {
      description: 'Войдите в созданный аккаунт',
      action: {
        label: 'Войти',
        onClick: () => navigate('/sign-in'),
      },
    });
  };

  const onSubmit = async (data: RegisterFormValue) => {
    dispatch(registerUser(data));
    createToast();
    reset();
  };

  return (
    <div className="py-block">
      <div className="_container py-[100px] text-black">
        <h2 className="text-3xl mb-[15px] text-center">Регистрация</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[492px] mx-auto"
          action=""
          noValidate>
          <div className="flex flex-col mb-[20px]">
            <input
              required
              type="text"
              id="login"
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
                !bg-white ${errors.username ? 'register__error-input' : ''}`}
              placeholder="Никнейм*"
              {...register('username', {
                required: 'Никнейм обязателен',
                minLength: {
                  value: 3,
                  message: 'Никнейм должен включать минимум 3 символа',
                },
              })}
            />
            <p className="register__error-message">{errors.username?.message}</p>
          </div>
          <div className="flex gap-[10px]">
            <div className="flex flex-col mb-[20px]">
              <input
                required
                type="text"
                placeholder="Имя*"
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
                !bg-white ${errors.firstName ? 'register__error-input' : ''}`}
                {...register('firstName', { required: 'Имя обязательно' })}
              />
              <p className="register__error-message">{errors.firstName?.message}</p>
            </div>
            <div className="flex flex-col mb-[20px]">
              <input
                type="text"
                placeholder="Фамилия"
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
                !bg-white ${errors.lastName ? 'register__error-input' : ''}`}
                {...register('lastName')}
              />
              <p className="register__error-message">{errors.lastName?.message}</p>
            </div>
          </div>
          <div className="flex flex-col mb-[20px]">
            <input
              required
              type="password"
              placeholder="Пароль*"
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
                  message: 'Пароль должен включать минимум 5 символа',
                },
              })}
            />
            <p className="register__error-message">{errors.password?.message}</p>
          </div>
          <div className="flex flex-col mb-[20px]">
            <input
              required
              type="text"
              placeholder="Телефон*"
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
                !bg-white ${errors.phone ? 'register__error-input' : ''}`}
              {...register('phone', {
                required: 'Телефон обязателен',
                minLength: {
                  value: 5,
                  message: 'Такого номера не существует',
                },
              })}
            />
            <p className="register__error-message">{errors.phone?.message}</p>
          </div>
          <div className="flex flex-col mb-[20px]">
            <input
              required
              type="text"
              placeholder="Email"
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
                !bg-white ${errors.email ? 'register__error-input' : ''}`}
              {...register('email', {
                required: 'Почта обязательна',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Такой почты не существует',
                },
              })}
            />
            <p className="register__error-message">{errors.email?.message}</p>
          </div>
          <button
            disabled={isAuth}
            type="submit"
            className="
              mx-auto
              button-dark-green
            "
            aria-label="Создать аккаунт">
            <div>
              <img className="w-[20px]" src={pawsIcon} alt="pawsIcon" />
            </div>
            <p>Создать аккаунт</p>
          </button>
        </form>
        <NavLink to="/sign-in">
          <div className="flex gap-[10px] justify-center items-center cursor-pointer hover:text-gray-500">
            <div>
              <img className="w-[15px]" src={arrows} alt="" />
            </div>
            <p className="text-center text-sm">Войти</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};
