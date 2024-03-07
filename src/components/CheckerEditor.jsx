import { EditorContent } from "@tiptap/react";
import { Stack } from "react-bootstrap";
import CustomButton from "./Button";
import PasteIcon from "../icons/Paste";
import UploadIcon from "../icons/Upload";
import Card from "./Card";
import CopyIcon from "../icons/Copy";
import DownloadIcon from "../icons/Download";
import ArrowIcon from "../icons/Arrow";
import { themeColors } from "../theme";
import { BREAKPOINTS } from "../helpers/constants";
import { useBreakpoint } from "use-breakpoint";
import MultiOptionDropDown from "./MultiOptionDropDown";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { correctMistakes, setContent } from "../redux/features/api/apiSlice";
import { getTextFromFile } from "../helpers/getTextFromFile";
import { exportToFile } from "../helpers/exportToFile";

const CheckerEditor = ({ editor }) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";

  const [dropDown, setDropDown] = useState(false);
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  useEffect(() => {
    editor
      .chain()
      .focus("end")
      .createParagraphNear()
      .insertContent(state.checker.checkerAi.aiResponse)
      .run();
  }, [state.checker.checkerAi.aiResponse]);

  return (
    <>
      {!editor.getText().length && (
        <Stack
          direction="horizontal"
          gap={3}
          className={`position-absolute ${
            isBelowDesktop
              ? "bottom-0 start-50 translate-middle w-100 justify-content-center "
              : "top-0 start-0 m-4"
          } `}
        >
          <CustomButton
            iconPrefix={<PasteIcon />}
            outline
            onClick={() => {
              try {
                navigator.clipboard.readText().then((text) => {
                  dispatch(setContent(text));
                });
              } catch (error) {}
            }}
          >
            ضع النص
          </CustomButton>
          <CustomButton
            iconPrefix={<UploadIcon />}
            outline
            className="position-relative"
          >
            <input
              type="file"
              className="
              opacity-0
              position-absolute
              w-100
              h-100
              top-0
              start-0
            "
              accept=".doc,.docx,.pdf,.txt"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const formData = new FormData();
                  formData.append("file", file);
                  getTextFromFile(formData, state.checker.currentDoc).then(
                    (text) => {
                      dispatch(setContent(text));
                    }
                  );
                }
              }}
            />
            تحميل ملف
          </CustomButton>
        </Stack>
      )}

      <>
        <EditorContent editor={editor} />
      </>
      {!editor.getText() && (
        <Stack className="place-holder position-absolute text-text-gray">
          ابدأ بكتابة نص أو ضع النص الذي تريد تدقيقه لُغَوِيّاً في المحرر (+V)
          أو تحميل مستند (DOC،PDF،TXT).
        </Stack>
      )}
      {!isBelowDesktop && (
        <Card className="position-absolute  bottom-0 start-50 translate-middle mb-2 bg-light">
          <Stack direction="horizontal" gap={5}>
            <CustomButton
              onlyIcon
              onClick={() => {
                navigator.clipboard.writeText(editor.getText());
              }}
            >
              <CopyIcon />
            </CustomButton>

            <CustomButton
              onlyIcon
              onClick={() => {
                exportToFile(state.checker.content, "pdf");
              }}
            >
              <DownloadIcon />
            </CustomButton>

            <div className="position-relative">
              <CustomButton
                iconSuffix={
                  <ArrowIcon color={themeColors.colors.primary} rotate={90} />
                }
                outline
                onClick={() => setDropDown((prev) => !prev)}
              >
                5 كلمات
              </CustomButton>
              {dropDown && (
                <MultiOptionDropDown
                  top
                  options={[
                    {
                      value: "٥ كلمات",
                      className: "px-4 border-bottom mt-2",
                    },
                    {
                      value: "١٠ كلمات",
                      className: "px-4 border-bottom mt-2",
                    },
                    {
                      value: "١٥ كلمة",
                      className: "px-4 border-bottom mt-2",
                    },
                  ]}
                />
              )}
            </div>

            <CustomButton onClick={() => dispatch(correctMistakes({}))}>
              صحح الأخطاء
            </CustomButton>
            <CustomButton onlyIcon>
              <Stack
                direction="horizontal"
                className="rounded-circle border border-primary items-center justify-center position-relative"
                style={{
                  width: "40px",
                  height: "40px",
                }}
              >
                <div
                  className="position-absolute top-50 start-50"
                  style={{
                    transform: "translate(-50%,-40%)",
                  }}
                >
                  14
                </div>
              </Stack>
            </CustomButton>
          </Stack>
        </Card>
      )}
    </>
  );
};

export default CheckerEditor;
