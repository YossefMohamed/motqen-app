import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import CheckAndRedirect from "./helpers/CheckAndRedirect";
import EditorPage from "./pages/Editor";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { actionsTypes } from "./helpers/constants";
import { getCurrentUser } from "./redux/features/api/userSlice";
import { Spinner } from "react-bootstrap";
import EndTrial from "./components/EndTrial";

function App() {
  return (
    <BrowserRouter>
      <WrapperComponent>
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
      </WrapperComponent>
    </BrowserRouter>
  );
}

export default App;

const WrapperComponent = ({ children }) => {
  const pathname = useLocation();

  const dispatch = useAppDispatch();
  const closePanel = () => {
    dispatch({ type: actionsTypes.TOGGLE_HISTORY_PANEL_FALSE });
  };
  const state = useAppSelector((state) => state);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    !state.user.username && dispatch(getCurrentUser());
    closePanel();
    setLoading(false);
  }, [pathname]);
  const [endTrial, setEndTrial] = useState(false);

  useEffect(() => {
    if (
      state.checker.text.split(" ").length - 1 > 2500 &&
      state.user.subscription_plan === "Free"
    ) {
      setEndTrial(true);
    }
  }, [state.checker.text]);
  if (loading) return <Spinner />;

  return (
    <>
      <EndTrial onClose={() => setEndTrial(false)} show={endTrial} />
      {children}
    </>
  );
};
