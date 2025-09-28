export type TPetInfo = {
  id: number;
  category: {
    id: number;
    name: string;
  };
  name: string;
  photoUrls: string[];
  tags: { id: number; name: string }[];
  status: string;
};

export interface ISearchState {
  loading: 'idle' | 'success';
  currentPage: number;
  availablePets: TPetInfo[];
}
