import { useEffect } from "react";
import { Stack } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createDocument } from "../redux/features/api/apiSlice";
import { useLocation, useNavigate } from "react-router-dom";

const CheckAndRedirect = () => {
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const isEditor = location.pathname === "/editor";
    if (
      state.checker.status !== "succeeded" &&
      state.checker.status !== "loading"
    ) {
      dispatch(createDocument(isEditor));
    }
    if (state.checker.status === "succeeded") {
      navigate(`${state.checker.currentDoc}?new=true`);
    }
  }, [state.checker.status]);

  return (
    <Stack
      direction="horizontal"
      className="justify-content-center align-items-center flex-fill"
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </Stack>
  );
};

export default CheckAndRedirect;
