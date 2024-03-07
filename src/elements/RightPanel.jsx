import { Card, Col, Stack } from "react-bootstrap";
import Toolbar from "../components/Toolbar";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Typography from "@tiptap/extension-typography";
import { FontSize } from "../helpers/tiptap-fontsize";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  checkMistakes,
  correctMistakes,
  setContent,
  setText,
} from "../redux/features/api/apiSlice";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "../helpers/constants";
import CustomButton from "../components/Button";
import CopyIcon from "../icons/Copy";
import DownloadIcon from "../icons/Download";
import ArrowIcon from "../icons/Arrow";
import { themeColors } from "../theme";
import CheckerEditor from "../components/CheckerEditor";
import MultiOptionDropDown from "../components/MultiOptionDropDown";
import { useEffect, useState } from "react";
import { exportToFile } from "../helpers/exportToFile";

const RightPanel = () => {
  const dispatch = useAppDispatch();
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  const state = useAppSelector((state) => state);
  const editor = useEditor(
    {
      content: state.checker.content,
      editable: true,
      onUpdate: ({ editor }) => {
        dispatch(setContent(editor.getHTML()));
        dispatch(setText(editor.getText()));
        dispatch(checkMistakes({ content: editor.getText() }));
      },
      extensions: [
        StarterKit,
        TextStyle,
        Placeholder.configure({
          placeholder: "/press / lol....",
        }),
        TextAlign.configure({
          types: ["heading", "paragraph"],
          alignments: ["left", "center", "right", "justify"],
          defaultAlignment: "right",
        }),
        Link.configure({
          linkOnPaste: false,
          openOnClick: false,
        }),
        Typography,
        FontSize,
        Color.configure({
          types: ["textStyle"],
        }),
        Highlight.configure({
          multicolor: true,
        }),
      ],
    },
    []
  );
  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {
    if (editor) {
      const { from, to } = editor.state.selection;
      editor.commands.setContent(state.checker.content, false, {
        preserveWhitespace: "full",
      });
      editor.commands.setTextSelection({ from, to });
    }
  }, [state.checker.content]);

  if (editor === null) return null;
  return (
    <>
      <Stack className={`${isBelowDesktop ? "px-0" : "px-3 h-100"}`} gap={4}>
        <Stack className="justify-content-center" direction="horizontal">
          <Toolbar editor={editor} />
        </Stack>
        <Stack
          className="flex-fill editor border rounded-3 fs-5 position-relative p-3"
          style={{
            minHeight: isBelowDesktop ? "75vh" : "",
          }}
          onClick={() => editor.commands.focus()}
        >
          <CheckerEditor editor={editor} />
        </Stack>
      </Stack>
      {isBelowDesktop && (
        <Col className="my-3">
          <Card className=" bg-light">
            <Stack
              direction={`${"horizontal"}`}
              gap={1}
              style={{
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
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
                  className="rounded-circle border border-primary align-items-center justify-content-center position-relative"
                  style={{
                    width: "35px",
                    height: "35px",
                  }}
                >
                  <span className="position-absolute top-50 start-50 translate-middle">
                    14
                  </span>
                </Stack>
              </CustomButton>
            </Stack>
          </Card>
        </Col>
      )}
    </>
  );
};

export default RightPanel;
