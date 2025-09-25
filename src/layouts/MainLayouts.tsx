import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { Toaster } from '@/components/ui/sonner';

const MainLayout: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
      <Toaster className="absolute top-[10%] left-1/2 -translate-x-1/2 -translate-y-[-50%] !bottom-[inherit]" />
    </div>
  );
};

export default MainLayout;
