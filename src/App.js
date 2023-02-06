import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import BaseLayout from "./components/layout/BaseLayout";
import BoardList from "./components/board/board_list";
import BoardView from "./components/board/board_view";
import BoardWrite from "./components/board/board.write";

function App() {
  return (
    <div className="container">
      <h1>My Shop Board</h1>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route path="board" element={<BoardList />}>
            <Route path="list/:currentPage" element={<BoardList />} />
          </Route>

          <Route path="board/view/:currentPage/:num" element={<BoardView />} />
          <Route path="board/write" element={<BoardWrite />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
