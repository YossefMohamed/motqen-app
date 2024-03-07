import { EditorContent } from "@tiptap/react";
import { Spinner, Stack } from "react-bootstrap";
import CustomButton from "./Button";
import { useEffect, useState } from "react";
import PlusCircleIcon from "../icons/PlusCircle";
import AskAIModal from "./AskAIModal";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  editorAskAi,
  setTitle,
  updateDocument,
} from "../redux/features/api/apiSlice";
import { useLocation } from "react-router-dom";

const Editor = ({ editor }) => {
  const [askAi, setAskAi] = useState(false);
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
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
  const { pathname } = useLocation();
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
          value={state.checker.title}
          placeholder="أكتب اسم للملف"
          onChange={(e) => {
            dispatch(setTitle(e.target.value));
            dispatch(
              updateDocument({
                content: state.checker.content,
                isEditor: pathname.includes("/editor"),
                title: e.target.value,
              })
            );
          }}
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
