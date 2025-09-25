import firstImage from 'images/about-us/1.png';
import secondImage from 'images/about-us/2.png';
import thirdImage from 'images/about-us/3.png';
import fourthImage from 'images/about-us/4.png';
import dogIcon from 'images/home/dog-icon.png';
import mainIcon from 'images/home/main.jpg';
import arrow from 'images/recent/arrow-slider.svg';
import { NavLink } from 'react-router-dom';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import PetCard from '../components/PetCard/PetCard';

// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';

import { searchAllPets, searchFilter } from '@/redux/Slices/searchSlice';
import { useAppDispatch } from '@/redux/store';
import type { TPetInfo } from '@/types/Slices/SearchSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import '../css/home.css';

export const Home = () => {
  const dispatch = useAppDispatch();
  const [recentItems, setRecentItems] = React.useState<TPetInfo[]>([]);
  const { availablePets } = useSelector(searchFilter);

  React.useEffect(() => {
    dispatch(searchAllPets());
  }, [dispatch]);

  React.useEffect(() => {
    if (availablePets.length > 0) {
      const slicedPets = availablePets.slice(0, 6);
      setRecentItems(slicedPets);
    }
  }, [availablePets]);

  return (
    <div className="">
      <div className="py-block relative">
        <div className="_container py-[80px] text-black flex gap-[200px]">
          <div>
            <div className="mb-[30px]">
              <h1 className="text-4xl mb-[20px]">
                Petting - доска объявлений для передачи домашних питомцев в хорошие руки!
              </h1>
              <p className="text-md max-w-[800px] m-[auto]">
                Мы верим, что каждый питомец заслуживает любящую семью, а каждая семья - верного
                компаньона. Здесь вы найдете тех, кто готов подарить вам свою любовь и преданность.
                Посмотрите на наших андреев, и, возможно, именно здесь вас ждет ваша судьба!
              </p>
            </div>
            <NavLink to="/petSearch/all-pets">
              <div className="cursor-pointer flex gap-[15px] items-center bg-green-300 max-w-[200px] justify-center p-[15px] rounded-xl hover:scale-104">
                <div className="mt-[-10px]">
                  <img className="w-[30px]" src={dogIcon} alt="dogIcon" />
                </div>
                <p>Все объявления</p>
              </div>
            </NavLink>
          </div>
          <div>
            <img className="max-w-[100%]" src={mainIcon} alt="" />
          </div>
        </div>
      </div>
      <div className="py-block">
        <div className="_container py-[80px]">
          <h2 className="text-3xl mb-[40px]">Последние объявления</h2>
          <div className="relative">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              spaceBetween={30}
              slidesPerView={4}>
              {recentItems.map((obj: TPetInfo) => (
                <SwiperSlide key={obj.id}>
                  <PetCard {...obj} />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="swiper-button-prev-custom absolute top-[220px] left-[-70px] cursor-pointer">
              <img className="w-[60px] rotate-180" src={arrow} alt="Предыдущий" />
            </div>
            <div className="swiper-button-next-custom absolute top-[220px] right-[-70px] cursor-pointer">
              <img className="w-[60px]" src={arrow} alt="Следующий" />
            </div>
          </div>
        </div>
      </div>
      <div className="py-block bg">
        <div className="_container py-[80px]">
          <h2 className="text-3xl mb-[20px]">О нас</h2>
          <div className="flex gap-[100px] items-center">
            <div>
              <div className="max-w-[1500px] bg-white p-[40px] rounded-4xl">
                <p className="mb-[10px] max-w-[90%]">
                  Мы - команда <span className="">преданных</span> своему делу людей, объединенных
                  любовью к животным и искренним желанием помочь им найти любящие дома. Мы верим,
                  что каждое животное заслуживает заботы, внимания и семьи, где его будут ценить.
                </p>
                <p className="mb-[10px] max-w-[90%]">
                  Наша платформа - это не просто доска объявлений. Мы тщательно отбираем животных,
                  представленных на нашем сайте, и стараемся предоставить максимально полную
                  информацию о каждом питомце, включая его характер, историю и особенности.
                </p>
                <p className="mb-[10px] max-w-[90%]">
                  Мы тесно сотрудничаем с приютами, волонтерами и временными опекунами, чтобы
                  убедиться, что животные находятся в безопасности и получают необходимый уход.
                </p>
                <p className="mb-[10px] max-w-[90%]">
                  Если вы готовы открыть свое сердце и дом для нуждающегося животного, просмотрите
                  объявления и найдите своего компаньона.
                </p>
              </div>
            </div>
            <div>
              <div className="about-us__aside">
                <div className="about-us__column">
                  <div className="about-us__column-row">
                    <img className="about-us__image" src={secondImage} alt="" />
                    <img className="about-us__image" src={thirdImage} alt="" />
                  </div>
                  <div className="about-us__column-horizontal">
                    <img className="about-us__image" src={firstImage} alt="" />
                  </div>
                </div>
                <div className="about-us__imageVertical">
                  <img className="about-us__image" src={fourthImage} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
