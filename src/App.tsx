import { Route, Routes } from 'react-router-dom';
import './App.css';
import './css/elements.css';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { Register } from './pages/Register';
import MainLayout from './layouts/MainLayouts';
import { Profile } from './pages/Profile';
import { MyProfile } from './pages/MyProfile';
import { AddPet } from './components/AddPet/AddPet';
import PetSearch from './components/PetSearch/PetSearch';
import PetPage from './pages/PetPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<Login />} />
        <Route path="sign-up" element={<Register />} />
        <Route path="profile" element={<Profile />} />
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="add-pet" element={<AddPet />} />
        <Route path="petSearch/all-pets" element={<PetSearch />} />
        <Route path="petPage:id" element={<PetPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
