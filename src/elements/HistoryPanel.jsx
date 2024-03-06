import { Spinner, Stack } from "react-bootstrap";
import PaperIcon from "../icons/Paper";
import MenuIcon from "../icons/Menu";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useBreakpoint } from "use-breakpoint";
import {
  API_URL,
  BEARER_TOKEN,
  BREAKPOINTS,
  actionsTypes,
} from "../helpers/constants";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const HistoryPanel = () => {
  const isOpenHistoryPanel = useAppSelector(
    (state) => state.isOpenHistoryPanel
  );

  const { pathname } = useLocation();
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  const dispatch = useAppDispatch();
  const closePanel = () => {
    dispatch({ type: actionsTypes.TOGGLE_HISTORY_PANEL });
  };
  const [docs, setDocs] = useState([]);
  const [searchDoc, setSearchDoc] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpenHistoryPanel) {
      setLoading(true);

      const url = !pathname.includes("/editor")
        ? "/grammmer-checker/documents?search=" + searchDoc
        : "/writing-assistant/get_user_documents/?search=" + searchDoc;
      axios
        .get(API_URL + url, {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        })
        .then((res) => {
          setDocs(res.data.results);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [searchDoc, isOpenHistoryPanel, pathname]);

  return (
    <Stack
      className={`flex-fill position-absolute h-100 top-0 bg-light py-4 border-start px-3 bg-light`}
      style={{
        transform: isOpenHistoryPanel ? "translateX(0)" : "translateX(150%)",
        width: isBelowDesktop ? "100%" : "320px",
        maxHeight: "100vh",
        overflowY: "auto",
        zIndex: 100,
      }}
      gap={3}
    >
      <div className="d-flex justify-content-between">
        <div className="title text-secondary fs-5 fw-medium">سجل الملفات</div>
        <span onClick={closePanel} role="button">
          <MenuIcon />
        </span>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder="بحث..."
        value={searchDoc}
        onChange={(e) => setSearchDoc(e.target.value)}
      />
      <Stack gap={3} className="z-top">
        {loading ? (
          <Stack className="items-center justify-center">
            <Spinner variant="secondary" />
          </Stack>
        ) : docs.length === 0 ? (
          <div className="text-center">لا يوجد نتائج</div>
        ) : (
          docs.map((doc) => {
            return;
            <Link to={`/${doc.unique_id}`} key={doc.content}>
              <div className="border rounded-3  ">
                <div className="top text-center py-4 border-bottom px-3">
                  <PaperIcon />
                </div>

                <div className="details p-3">
                  <div className="title  text-primary fw-medium">
                    {doc.title}{" "}
                  </div>

                  <div
                    className="sub-title text-text-gray fw-medium label"
                    dangerouslySetInnerHTML={{
                      __html: doc?.content?.substring(0, 100),
                    }}
                  ></div>
                </div>
              </div>
            </Link>;
          })
        )}
      </Stack>
    </Stack>
  );
};

export default HistoryPanel;
