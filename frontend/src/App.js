import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import IPProviderMyPage from "./pages/my-page/ip-provider/page";
import StoreOwnerMyPage from "./pages/my-page/store-owner/page";
import SentProposals from "./pages/my-page/sent-apply/page";
import ReceivedProposals from "./pages/my-page/received-apply/page";
import MyPosts from "./pages/my-page/my-recruit/page";
import CreateStoreProfile from "./pages/my-page/create-store-profile/page";
import CreateCharacterProfile from "./pages/my-page/create-character-profile/page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ip" element={<IPProviderMyPage />} />
        <Route path="/store" element={<StoreOwnerMyPage />} />
        <Route path="/sent-apply" element={<SentProposals />} />
        <Route path="/received-apply" element={<ReceivedProposals />} />
        <Route path="/my-recruit" element={<MyPosts />} />
        <Route path="/create-store" element={<CreateStoreProfile />} />
        <Route path="/create-character" element={<CreateCharacterProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
