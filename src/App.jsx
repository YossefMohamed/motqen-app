import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import CheckAndRedirect from "./helpers/CheckAndRedirect";
import EditorPage from "./pages/Editor";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/hooks";
import { actionsTypes } from "./helpers/constants";

function App() {
  return (
    <BrowserRouter>
      <CloseHistoryPanel>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CheckAndRedirect />} />

            <Route path=":id" element={<Home />} />
          </Route>
          <Route path="/editor" element={<Layout />}>
            <Route index element={<CheckAndRedirect />} />

            <Route path=":id" element={<EditorPage />} />
          </Route>
        </Routes>
      </CloseHistoryPanel>
    </BrowserRouter>
  );
}

export default App;

const CloseHistoryPanel = ({ children }) => {
  const pathname = useLocation();

  const dispatch = useAppDispatch();
  const closePanel = () => {
    dispatch({ type: actionsTypes.TOGGLE_HISTORY_PANEL_FALSE });
  };
  useEffect(() => {
    closePanel();
  }, [pathname]);
  return children;
};
