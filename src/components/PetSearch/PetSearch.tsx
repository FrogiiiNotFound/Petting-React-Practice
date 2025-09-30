import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { onPageChange, searchAllPets, searchFilter } from '@/redux/Slices/searchSlice';
import { useAppDispatch } from '@/redux/store';
import type { TPetInfo } from '@/types/Slices/SearchSlice';
import message from 'images/petSearch/searching.jpg';
import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import { useSelector } from 'react-redux';
import PetCard from '../PetCard/PetCard';
import { Checkbox } from '../ui/checkbox';
import Pagination from './Pagination';
import { Loading } from '../Loading/Loading';

const frameworks = [
  {
    value: 'Собака',
    label: 'Собака',
  },
  {
    value: 'Кошка',
    label: 'Кошка',
  },
  {
    value: 'Хомяк',
    label: 'Хомяк',
  },
  {
    value: 'Крокодил',
    label: 'Крокодил',
  },
  {
    value: 'Попугай',
    label: 'Попугай',
  },
];
const petsPerPage = 20;

const PetSearch = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [currentItems, setCurrentItems] = React.useState<TPetInfo[]>([]);
  const { currentPage, availablePets, loading } = useSelector(searchFilter);

  const countPetsPerPage = () => {
    const offset = currentPage * petsPerPage;
    const slicedPets = availablePets.slice(offset, offset + petsPerPage);

    setCurrentItems(slicedPets);
  };

  const onChangePage = (page: number) => {
    dispatch(onPageChange(page));
  };
  const searchPetList = async () => {
    dispatch(searchAllPets());
  };
  const pets = currentItems.map((obj: TPetInfo) => {
    return <PetCard {...obj} />;
  });

  React.useEffect(() => {
    searchPetList();
  }, []);
  React.useEffect(() => {
    countPetsPerPage();
  }, [currentPage, availablePets]);

  return (
    <div className="py-block">
      <div className="_container">
        <div className="flex justify-between items-center mt-[50px] mb-[20px] flex-wrap max-[630px]:justify-center max-[630px]:gap-[30px]">
          <div className="flex gap-[10px] items-center flex-wrap max-[475px]:justify-center max-[475px]:gap-[20px]">
            <div>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between !bg-[#f8f8f8]">
                    {value
                      ? frameworks.find((framework) => framework.value === value)?.label
                      : 'Тип питомца...'}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Выбор питомца..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>Тип не найден</CommandEmpty>
                      <CommandGroup>
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setValue(currentValue === value ? '' : currentValue);
                              setOpen(false);
                            }}>
                            {framework.label}
                            <Check
                              className={cn(
                                'ml-auto',
                                value === framework.value ? 'opacity-100' : 'opacity-0',
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex gap-[10px]">
              <div>
                <div className="flex items-center gap-2 !select-auto">
                  <Checkbox
                    id="documents"
                    className="!bg-gray-300 !text-white data-[state=checked]:!bg-green-600 data-[state=checked]:text-black !select-auto"
                  />
                  <Label className="!select-auto" htmlFor="documents">
                    Документы
                  </Label>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 !select-auto ">
                  <Checkbox
                    id="documents"
                    className="!bg-gray-300 !text-white data-[state=checked]:!bg-green-600 data-[state=checked]:text-black !select-auto"
                  />
                  <Label className="!select-auto" htmlFor="documents">
                    От заводчиков
                  </Label>
                </div>
              </div>
            </div>
          </div>
          <AlertDialog>
            <AlertDialogTrigger className="!bg-inherit cursor-pointer !text-sm hover:!text-gray-500">
              <div onClick={searchPetList} className="button-dark-green !mb-0">
                <p className="text-[14px]">Найти питомца</p>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-black text-center text-lg">
                  К сожалению API которое я использую не предоставляет адекватной возможности поиска
                  питомцев
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <img src={message} alt="" />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mx-auto">
                <AlertDialogAction className="min-w-[200px] cursor-pointer">
                  Выйти
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        {loading === 'success' ? (
          <div className="flex gap-[20px] flex-wrap mb-[40px] justify-center">{pets}</div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default PetSearch;
