import { useEffect, useState } from "react";
import EditorPanel from "../elements/EditorPanel";
import { Col, Row } from "react-bootstrap";
import { BREAKPOINTS } from "../helpers/constants";
import { useBreakpoint } from "use-breakpoint";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useParams, useSearchParams } from "react-router-dom";
import { getDocument, setCurrentDoc } from "../redux/features/api/apiSlice";
import WelcomeModal from "../components/WelcomeModal";

const EditorPage = () => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";

  const dispatch = useAppDispatch();
  const params = useParams();
  const state = useAppSelector((state) => state);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!state.checker.currentDoc || state.checker.currentDoc !== params.id)
      params.id && dispatch(setCurrentDoc(params.id));

    if (params.id && !searchParams.get("new"))
      dispatch(getDocument({ docId: params.id, isEditor: true }));
  }, [params]);
  useEffect(() => {
    if (state.checker.content) {
      searchParams.delete("new");
      setSearchParams(searchParams);
    }
  }, [state.checker.content]);

  const [showModal, setShowModal] = useState(
    state.user.subscription_plan === "Free"
  );
  return (
    <>
      <WelcomeModal onClose={() => setShowModal(false)} show={showModal} />

      <Row className={isBelowDesktop ? " px-3 flex-fill" : "flex-fill"}>
        <Col>
          <EditorPanel />
        </Col>
      </Row>
    </>
  );
};

export default EditorPage;
