import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Solmap from './pages/Solmap';
import PreviewContentList from './components/BottomSheet/Preview/PreviewContentList';
import DetailContent from './components/BottomSheet/DetailContent';
import CategoryButtonList from './components/BottomSheet/Category/CategoryButtonList';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='solmap' element={<Solmap />}>
            <Route index element={<CategoryButtonList />} />
            <Route path='list' element={<PreviewContentList />} />
            <Route path='detail' element={<DetailContent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
