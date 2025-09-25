import { addPet } from '@/redux/Slices/petsSlice';
import { useAppDispatch } from '@/redux/store';
import type { TagType } from '@/types/Tags';
import closeButton from 'images/addPet/close.png';
import upload from 'images/addPet/upload.png';
import pawsIcon from 'images/user/paws.png';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Типы для данных формы
type FormValues = {
  name: string;
  type: string;
  images: FileList;
  tags: TagType[];
};

// Тип для отправляемых данных
type PetData = {
  id: number;
  category: {
    id: number;
    name: string;
  };
  name: string;
  photoUrls: string[];
  tags: {
    id: number;
    name: string;
  }[];
  status: 'available' | 'pending' | 'sold';
};

export const AddPet = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const imageInputRef = React.useRef<HTMLInputElement | null>(null);

  const [showTagInput, setShowTagInput] = React.useState(false);
  const [petTags, setPetTags] = React.useState<TagType[]>([]);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [inputImages, setInputImages] = React.useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);

  const createToast = () => {
    toast('Вы выложили питомца!', {
      action: {
        label: 'Смотреть объявления',
        onClick: () => navigate('/petSearch/all-pets'),
      },
    });
  };

  const form = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      tags: [],
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = form;

  React.useEffect(() => {
    setValue('tags', petTags);
  }, [petTags, setValue]);

  const onSubmit = async (data: FormValues) => {
    try {
      const petData: PetData = {
        id: Date.now(),
        category: {
          id: 1,
          name: data.type || 'pet',
        },
        name: data.name,
        photoUrls: inputImages,
        tags: data.tags.map((tag) => ({
          id: tag.id,
          name: tag.name,
        })),
        status: 'available',
      };
      console.log(petData);
      dispatch(addPet(petData));

      reset();
      setPetTags([]);
      setInputImages([]);
      setUploadedFiles([]);
      createToast();
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const onTagClick = () => {
    setShowTagInput(true);
  };

  const onTagDelete = (id: number) => {
    setPetTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      event.preventDefault();
      const newTag: TagType = {
        id: Date.now(),
        name: inputValue.trim(),
      };
      setPetTags([...petTags, newTag]);
      setInputValue('');
      setShowTagInput(false);
    }
  };

  const handleImageInput = () => {
    imageInputRef.current?.click();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setUploadedFiles(fileArray);
      setValue('images', files);

      Promise.all(
        fileArray.map(
          (file) =>
            new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve(reader.result as string);
              };
              reader.readAsDataURL(file);
            }),
        ),
      ).then((results) => {
        setInputImages(results);
      });
    }
  };

  const handleTagBlur = () => {
    if (inputValue.trim()) {
      const newTag: TagType = {
        id: Date.now(),
        name: inputValue.trim(),
      };
      setPetTags([...petTags, newTag]);
      setInputValue('');
    }
    setShowTagInput(false);
  };

  React.useEffect(() => {
    if (showTagInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showTagInput]);

  return (
    <div className="py-block py-[80px] max-w-[600px] m-auto">
      <div className="_container">
        <h2 className="text-3xl mb-[30px] text-center">Создание объявления</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex justify-between border-gray-400 border p-[30px] rounded-2xl shadow-md">
            <div className="w-full">
              <h3 className="text-2xl mb-[20px]">Информация о питомце</h3>
              <div>
                <div>
                  <p className="register__error-message mb-[5px] text-red-500">
                    {errors.name?.message}
                  </p>
                  <input
                    className="px-5 py-3 pl-5 border border-gray-300 rounded-xl text-black font-medium text-lg shadow-md transition-all duration-300 font-nunito !bg-white mb-[20px] w-full"
                    type="text"
                    placeholder="Имя питомца"
                    {...register('name', {
                      required: 'Имя питомца обязательно',
                      minLength: {
                        value: 2,
                        message: 'Имя питомца должно быть больше 2 символов',
                      },
                    })}
                  />
                </div>
                <div>
                  <p className="register__error-message mb-[5px] text-red-500">
                    {errors.type?.message}
                  </p>
                  <input
                    className="px-5 py-3 pl-5 border border-gray-300 rounded-xl text-black font-medium text-lg shadow-md transition-all duration-300 font-nunito !bg-white mb-[20px] w-full"
                    type="text"
                    placeholder="Тип/порода питомца"
                    {...register('type', {
                      required: 'Укажите тип питомца',
                    })}
                  />
                </div>
                <div className="mb-[20px]">
                  <p className="text-sm text-gray-600 mb-2">Теги питомца:</p>
                  <ul className="flex gap-[10px] items-center flex-wrap">
                    {petTags.map((obj: TagType) => {
                      return (
                        <div
                          key={obj.id}
                          className="bg-green-200 p-[8px] rounded-md text-[13px] flex gap-[5px] items-center">
                          <p>{obj.name}</p>
                          <div
                            onClick={() => onTagDelete(obj.id)}
                            className="max-w-[20px] cursor-pointer">
                            <img src={closeButton} alt="Удалить тег" />
                          </div>
                        </div>
                      );
                    })}
                    {showTagInput ? (
                      <div>
                        <input
                          maxLength={15}
                          className="border border-gray-300 rounded-xl !bg-white py-1 px-3 shadow-md text-[14px]"
                          ref={inputRef}
                          type="text"
                          value={inputValue}
                          onChange={handleChange}
                          onKeyDown={handleKeyDown}
                          onBlur={handleTagBlur}
                          placeholder="Введите тег"
                        />
                      </div>
                    ) : (
                      <div
                        onClick={onTagClick}
                        className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-md cursor-pointer">
                        <p className="text-lg">+</p>
                      </div>
                    )}
                  </ul>
                </div>
                <div>
                  <div className="flex gap-[10px] flex-wrap mb-4">
                    {inputImages.map((image, index) => (
                      <img
                        className="w-[100px] h-[100px] object-cover rounded-lg"
                        key={index}
                        src={image}
                        alt={`Preview ${index + 1}`}
                      />
                    ))}
                  </div>
                  <div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleInputChange}
                      ref={imageInputRef}
                      style={{ display: 'none' }}
                    />
                  </div>
                  <div
                    onClick={handleImageInput}
                    className="flex gap-[5px] p-[10px] max-w-[230px] justify-center rounded-xl bg-white shadow-md border border-gray-400 cursor-pointer hover:bg-gray-100 mb-[40px]">
                    <div>
                      <img className="max-w-[20px]" src={upload} alt="Загрузить" />
                    </div>
                    <p className="text-[14px]">Загрузить изображения</p>
                  </div>
                  {errors.images && (
                    <p className="text-red-500 text-sm mb-4">{errors.images.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="button-dark-green flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                  aria-label="Добавить объявление">
                  <div>
                    <img className="w-[20px]" src={pawsIcon} alt="Лапка" />
                  </div>
                  <p>Добавить объявление</p>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
