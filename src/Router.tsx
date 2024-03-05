import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProps {
  modeChange: () => void;
  isDark: boolean;
}

function Router({ modeChange, isDark }: IRouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinId/*" element={<Coin isDark={isDark} />}></Route>
        <Route path="/" element={<Coins modeChange={modeChange} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
