import Products from './components/Products';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Success from './components/Success';
import Cancle from './components/Cancle';
const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancle" element={<Cancle />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;