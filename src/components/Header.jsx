import { Image, Navbar, Stack } from "react-bootstrap";
import Logo from "../assets/logo.svg";
import CustomButton from "./Button";
import ArrowIcon from "../icons/Arrow";
import { themeColors } from "../theme";
import HistoryIcon from "../icons/History";
import Ellipse from "../icons/Ellipse";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { BREAKPOINTS, actionsTypes } from "../helpers/constants";
import MenuIcon from "../icons/Menu";
import { useBreakpoint } from "use-breakpoint";
import { useRef, useState } from "react";
import MultiOptionDropDown from "./MultiOptionDropDown";
import { useOnClickOutside } from "usehooks-ts";
import { setTitle, updateDocument } from "../redux/features/api/apiSlice";
import { exportToFile } from "../helpers/exportToFile";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useAppDispatch();
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  const [exportDropDown, setExportDropDown] = useState(false);
  const [optionsDropDown, setOptionsDropDown] = useState(false);
  const [dropDownHeader, setDropDownHeader] = useState(false);
  const ref = useRef(null);
  const refOptions = useRef(null);
  const state = useAppSelector((state) => state);
  const handleClickOutside = () => {
    setExportDropDown(false);
  };

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useOnClickOutside(ref, handleClickOutside);
  useOnClickOutside(refOptions, () => setOptionsDropDown(false));
  const [dropDownProfile, setDropDownProfile] = useState(false);
  return (
    <Navbar className="border-bottom bg-light py-3 px-4 position-relative">
      <Stack direction="horizontal" className="justify-content-between w-100">
        <Stack
          className="justify-content-end text-end align-items-center"
          direction="horizontal"
          gap={4}
        >
          <div>
            <img src={Logo} className="logo react" alt="React logo" />
          </div>

          {!isBelowDesktop && (
            <>
              <CustomButton onlyIcon>
                <ArrowIcon
                  color={themeColors.colors.primary}
                  width={15}
                  height={15}
                />
              </CustomButton>
              <CustomButton
                onlyIcon
                onClick={() =>
                  dispatch({ type: actionsTypes.TOGGLE_HISTORY_PANEL })
                }
              >
                <HistoryIcon width={20} height={20} />
              </CustomButton>

              <Stack className="align-items-center justify-content-center ">
                {/* <span className="text-primary fw-medium">مستند جديد</span> */}

                <input
                  type="text"
                  className="text-primary fw-medium border-0 outline-0"
                  value={state.checker.title}
                  placeholder="أكتب اسم للملف"
                  onChange={(e) => {
                    dispatch(setTitle(e.target.value));
                    dispatch(
                      updateDocument({
                        title: e.target.value,
                        isEditor: pathname.includes("/editor"),
                        content: state.checker.content,
                      })
                    );
                  }}
                />
              </Stack>
            </>
          )}
        </Stack>
        {isBelowDesktop ? (
          <Stack direction="horizontal">
            <CustomButton
              onlyIcon
              onClick={() => setDropDownProfile((prev) => !prev)}
              className="position-relative z-3"
            >
              <div>
                <img
                  src="https://react-bootstrap-v3.netlify.app/thumbnail.png"
                  width="50"
                  height="50"
                  className="border rounded-circle"
                />
              </div>
              {dropDownProfile && (
                <MultiOptionDropDown
                  options={[
                    {
                      value: "حسابي",
                      className: "border border-primary px-3 py-3",
                    },
                    {
                      value: `${
                        state.checker.text.split(" ").length - 1
                      }/2500 متبقي`,
                      className: "border border-primary px-3 py-3",
                    },
                  ]}
                  dropDownAction={(value) => {
                    exportToFile(state.checker.content, value);
                    setDropDownProfile(false);
                  }}
                />
              )}
            </CustomButton>
            <CustomButton
              onlyIcon
              onClick={() => setDropDownHeader((prev) => !prev)}
            >
              <MenuIcon width={50} height={50} />
            </CustomButton>
          </Stack>
        ) : (
          <Stack direction="horizontal" gap={4} ref={ref}>
            <CustomButton
              iconPrefix={
                <ArrowIcon
                  width={10}
                  height={10}
                  rotate={90}
                  color={themeColors.colors.secondary}
                />
              }
              iconSuffix={<Ellipse color={themeColors.colors.secondary} />}
              variant="transparent"
              onClick={() => setOptionsDropDown((prev) => !prev)}
            >
              <Stack
                direction="horizontal"
                gap={1}
                className="fw-medium  align-items-center mx-2 items-center justify-center  position-relative"
                ref={refOptions}
              >
                <span>{state.checker.text.split(" ").length - 1}/2500</span>
                <span>الاستخدام</span>

                {optionsDropDown && (
                  <MultiOptionDropDown
                    options={[
                      {
                        value: "المدقق",
                        className: `px-5 border  ${
                          !pathname.includes("/editor") && "border-secondary"
                        }`,
                      },
                      {
                        value: "المحرر",
                        className: `px-5  border ${
                          pathname.includes("/editor") && "border-secondary"
                        }`,
                      },
                    ]}
                    dropDownAction={(value) => {
                      if (value === "المدقق" && pathname.includes("/editor")) {
                        navigate("/");
                        setOptionsDropDown(false);
                      } else if (
                        value === "المحرر" &&
                        !pathname.includes("/editor")
                      ) {
                        navigate("/editor");
                        setOptionsDropDown(false);
                      }
                    }}
                  />
                )}
              </Stack>
            </CustomButton>

            <div className="position-relative">
              <CustomButton
                iconSuffix={<ArrowIcon width={10} height={10} rotate={90} />}
                onClick={() => setExportDropDown((prev) => !prev)}
              >
                تصدير
              </CustomButton>

              {exportDropDown && (
                <MultiOptionDropDown
                  options={[
                    {
                      value: "pdf",
                      className: "px-4 border-bottom mt-2",
                    },
                    {
                      value: "word",
                      className: "px-4 border-bottom mt-2",
                    },
                    {
                      value: "text",
                      className: "px-4 border-bottom mt-2",
                    },
                  ]}
                  dropDownAction={(value) => {
                    exportToFile(state.checker.content, value);
                    setExportDropDown(false);
                  }}
                />
              )}
            </div>
            <Image
              src="https://react-bootstrap-v3.netlify.app/thumbnail.png"
              roundedCircle
              width="50"
              height="50"
              className="border"
            />
          </Stack>
        )}
      </Stack>
      <Stack
        className="position-absolute top-100  bg-light w-100 start-0 z-3 "
        style={{
          transform: dropDownHeader ? "translateY(0)" : "translateX(125%)",
        }}
      >
        <>
          <div className="border-bottom p-2 px-3">
            <CustomButton
              onlyIcon
              onClick={() =>
                dispatch({ type: actionsTypes.TOGGLE_HISTORY_PANEL })
              }
            >
              <Stack className="fs-3 fw-medium" direction="horizontal" gap={4}>
                سجل الملفات
              </Stack>
            </CustomButton>
          </div>

          <div className="border-bottom p-2 px-3 position-relative">
            <CustomButton
              onlyIcon
              onClick={() => setExportDropDown((prev) => !prev)}
            >
              <Stack className="fs-3 fw-medium" direction="horizontal" gap={5}>
                تصدير
              </Stack>
            </CustomButton>
            <Stack
              style={{
                visibility: exportDropDown ? "visible" : "hidden",
              }}
            >
              <MultiOptionDropDown
                options={[
                  {
                    value: "pdf",
                    className: "px-4 border-bottom mt-2",
                  },
                  {
                    value: "word",
                    className: "px-4 border-bottom mt-2",
                  },
                  {
                    value: "text",
                    className: "px-4 border-bottom mt-2",
                  },
                ]}
                dropDownAction={(value) => exportToFile(value)}
              />
            </Stack>
          </div>
          <div className="border-bottom p-2 px-3">
            <CustomButton
              onlyIcon
              onClick={() =>
                dispatch({ type: actionsTypes.TOGGLE_HISTORY_PANEL })
              }
            >
              <Stack className="fs-3 fw-medium" direction="horizontal" gap={5}>
                سجل الملفات
              </Stack>
            </CustomButton>
          </div>
          <div className="border-bottom p-2 px-3">
            <Stack className="justify-content-center fs-3 fw-medium text-primary ">
              <input
                type="text"
                className="text-primary fw-medium border-0 outline-0"
                value={state.checker.title}
                placeholder="أكتب اسم للملف"
                onChange={(e) => {
                  dispatch(setTitle(e.target.value));
                  dispatch(
                    updateDocument({
                      title: e.target.value,
                      isEditor: pathname.includes("/editor"),
                      content: state.checker.content,
                    })
                  );
                }}
              />
            </Stack>
          </div>
        </>
      </Stack>
    </Navbar>
  );
};

export default Header;
