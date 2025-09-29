import type { TPetInfo } from '@/types/Slices/SearchSlice';
import { getSafeImageUrl } from '@/utils/functions';
import arrowSliderContent from 'images/home/arrow.png';
import defaultImage from 'images/petSearch/default.jpg';
import { useNavigate } from 'react-router-dom';

const PetCard: React.FC<TPetInfo> = ({ category, name, photoUrls, tags, status, id }) => {
  const navigate = useNavigate();
  const navigateToPetPage = () => {
    navigate(`/petPage/${id}`);
  };

  return (
    <div className="bg-white max-w-[345px] rounded-xl p-[15px]">
      <div className="mb-[10px] text-center mx-[auto]">
        <img
          className="min-w-[200px] min-h-[200px]"
          src={getSafeImageUrl(photoUrls[0], defaultImage)}
          alt=""
        />
      </div>
      <div className="flex gap-[10px] items-end mb-[15px]">
        <h3 className="text-[26px]">{name}</h3>
        <p className="text-[14px]">{category?.name}</p>
      </div>
      <div className="mb-[20px]">
        <p>Теги</p>
        <ul className="flex flex-wrap gap-[10px] max-w-[300px]">
          {tags[0]?.name &&
            tags.map((obj) => {
              return (
                <p className="bg-green-200 py-[3px] px-[5px] rounded-md text-[13px]">{obj?.name}</p>
              );
            })}
          <p className="bg-green-200 py-[3px] px-[5px] rounded-md text-[13px]">Общительная</p>
          <p className="bg-green-200 py-[3px] px-[5px] rounded-md text-[13px]">Загрызла 2 людей</p>
          <p className="bg-green-200 py-[3px] px-[5px] rounded-md text-[13px]">Умная</p>
        </ul>
      </div>
      <div>
        <p>Статус</p>
        <div className="flex justify-between mb-[30px]">
          <p className="bg-green-200 py-[3px] px-[5px] rounded-md text-[13px] max-w-[100px]">
            {status}
          </p>
          <p className="text-[14px] cursor-pointer">+7(987)281-86-58</p>
        </div>
        <div onClick={navigateToPetPage} className="flex gap-[3px] cursor-pointer">
          <p>Узнать больше</p>
          <div>
            <img src={arrowSliderContent} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
