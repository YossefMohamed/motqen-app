import { Col, Row, Stack } from "react-bootstrap";
import RightPanel from "../elements/RightPanel";
import LeftPanel from "../elements/LeftPanel";
import { BREAKPOINTS } from "../helpers/constants";
import { useBreakpoint } from "use-breakpoint";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useParams, useSearchParams } from "react-router-dom";
import { getDocument, setCurrentDoc } from "../redux/features/api/apiSlice";
import WelcomeModal from "../components/WelcomeModal";

const Home = () => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const dispatch = useAppDispatch();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const state = useAppSelector((state) => state);
  useEffect(() => {
    if (!state.checker.currentDoc || state.checker.currentDoc !== params.id)
      params.id && dispatch(setCurrentDoc(params.id));
    if (params.id && !searchParams.get("new"))
      dispatch(getDocument({ docId: params.id }));
  }, [params]);

  const [showModal, setShowModal] = useState(false);
  if (state.checker.status === "loading")
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
  return (
    <>
      <WelcomeModal onClose={() => setShowModal(false)} show={showModal} />

      <Row className="my-3 px-3 flex-fill">
        <Col md={breakpoint === "desktop" ? 10 : 12}>
          <RightPanel />
        </Col>
        <Col md={breakpoint === "desktop" ? 2 : 12}>
          <LeftPanel />
        </Col>
      </Row>
    </>
  );
};

export default Home;
