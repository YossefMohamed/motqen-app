import { Stack } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Toaster from "./components/Toaster";
import HistoryPanel from "./elements/HistoryPanel";

const Layout = () => {
  return (
    <Stack
      style={{
        minHeight: "100vh",
      }}
    >
      <Header />
      <Stack className="position-relative p-0 m-0">
        <Toaster />
        <Outlet />
        <HistoryPanel />
      </Stack>
    </Stack>
  );
};

export default Layout;
