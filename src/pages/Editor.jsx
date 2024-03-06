import { useEffect } from "react";
import EditorPanel from "../elements/EditorPanel";
import { Col, Row } from "react-bootstrap";
import { BREAKPOINTS } from "../helpers/constants";
import { useBreakpoint } from "use-breakpoint";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useParams, useSearchParams } from "react-router-dom";
import { getDocument, setCurrentDoc } from "../redux/features/api/apiSlice";

const EditorPage = () => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";

  const dispatch = useAppDispatch();
  const params = useParams();
  const state = useAppSelector((state) => state);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!state.checker.currentDoc || state.checker.currentDoc !== params.id)
      params.id && dispatch(setCurrentDoc(params.id));

    if (params.id && !searchParams.get("new"))
      dispatch(getDocument({ docId: params.id, isEditor: true }));
  }, [params]);

  return (
    <>
      <Row className={isBelowDesktop ? " px-3 flex-fill" : "flex-fill"}>
        <Col>
          <EditorPanel />
        </Col>
      </Row>
    </>
  );
};

export default EditorPage;
