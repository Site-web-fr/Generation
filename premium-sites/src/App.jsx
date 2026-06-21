import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Showcase from './pages/Showcase';
import Lumiere from './pages/Lumiere';
import ApexRealty from './pages/ApexRealty';
import DubaiWave from './pages/DubaiWave';
import NautiPrestige from './pages/NautiPrestige';
import PrestigeDrive from './pages/PrestigeDrive';
import AeroPrive from './pages/AeroPrive';
import VillaLumiere from './pages/VillaLumiere';
import LeConciergerie from './pages/LeConciergerie';
import EspaceInteriors from './pages/EspaceInteriors';
import Chronos from './pages/Chronos';

export default function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Showcase />} />
          <Route path="/lumiere" element={<Lumiere />} />
          <Route path="/apex-realty" element={<ApexRealty />} />
          <Route path="/dubai-wave" element={<DubaiWave />} />
          <Route path="/nauti-prestige" element={<NautiPrestige />} />
          <Route path="/prestige-drive" element={<PrestigeDrive />} />
          <Route path="/aero-prive" element={<AeroPrive />} />
          <Route path="/villa-lumiere" element={<VillaLumiere />} />
          <Route path="/le-conciergerie" element={<LeConciergerie />} />
          <Route path="/espace-interiors" element={<EspaceInteriors />} />
          <Route path="/chronos" element={<Chronos />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}
