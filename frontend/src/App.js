import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import IPProviderMyPage from './pages/my-page/ip-provider/page';
import StoreOwnerMyPage from './pages/my-page/store-owner/page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ip" element={<IPProviderMyPage />} />
        <Route path="/store" element={<StoreOwnerMyPage />} />
  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
