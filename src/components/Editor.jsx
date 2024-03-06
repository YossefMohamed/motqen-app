import { EditorContent } from "@tiptap/react";
import { Spinner, Stack } from "react-bootstrap";
import CustomButton from "./Button";
import Card from "./Card";
import CopyIcon from "../icons/Copy";
import DownloadIcon from "../icons/Download";
import ArrowIcon from "../icons/Arrow";
import { themeColors } from "../theme";
import { BREAKPOINTS } from "../helpers/constants";
import { useBreakpoint } from "use-breakpoint";
import { useEffect, useState } from "react";
import PlusCircleIcon from "../icons/PlusCircle";
import AskAIModal from "./AskAIModal";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { correctMistakes, editorAskAi } from "../redux/features/api/apiSlice";
import MultiOptionDropDown from "./MultiOptionDropDown";
import { exportToFile } from "../helpers/exportToFile";

const Editor = ({ editor }) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  const [askAi, setAskAi] = useState(false);
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const [docTitle, setDocTitle] = useState(state.checker.title || "مستند جديد");
  const onAskAi = (content) => {
    dispatch(editorAskAi({ content }));
  };
  useEffect(() => {
    editor
      .chain()
      .focus("end")
      .createParagraphNear()
      .insertContent(state.checker.ai.aiResponse)
      .run();
  }, [state.checker.ai.aiResponse]);
  const [dropDown, setDropDown] = useState(false);
  return (
    <>
      {askAi && (
        <AskAIModal
          onClose={() => setAskAi(false)}
          show={askAi}
          action={onAskAi}
        />
      )}
      <Stack
        direction="horizontal"
        gap={3}
        className={`position-absolute top-0 end-0 m-4 `}
      >
        <input
          type="text"
          className="text-primary fw-medium border-0 outline-0"
          value={docTitle}
          placeholder="أكتب اسم للملف"
          onChange={(e) => setDocTitle(e.target.value)}
        />
      </Stack>

      <>
        <EditorContent
          editor={editor}
          onClick={() => editor.commands.focus()}
        />
        <CustomButton onlyIcon onClick={() => setAskAi(true)}>
          <Stack
            direction="horizontal"
            className="justify-center items-center"
            gap={3}
          >
            <PlusCircleIcon />
            {state.checker.ai.aiStatus === "loading" && <Spinner />}
          </Stack>
        </CustomButton>
      </>
      {!editor.getText() && (
        <Stack
          className="place-holder position-absolute text-text-gray "
          onClick={() => editor.commands.focus()}
        >
          ابدأ بكتابة نص
        </Stack>
      )}
    </>
  );
};

export default Editor;
