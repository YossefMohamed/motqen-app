import { Stack } from "react-bootstrap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Typography from "@tiptap/extension-typography";
import { FontSize } from "../helpers/tiptap-fontsize";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "../helpers/constants";
import EditorToolbar from "../components/EditorToolbar";
import Image from "@tiptap/extension-image";
import { useEffect, useState } from "react";
import Editor from "../components/Editor";
import {
  setContent,
  setText,
  updateDocument,
} from "../redux/features/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const EditorPanel = () => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  const state = useAppSelector((state) => state);
  const editor = useEditor({
    content: "",
    editable: true,

    onUpdate: ({ editor }) => {
      dispatch(setContent(editor.getHTML()));
      dispatch(updateDocument({ content: editor.getText(), isEditor: true }));
      dispatch(setText(editor.getText()));
    },

    extensions: [
      StarterKit,
      TextStyle,
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
      Image.configure({
        inline: true,
      }),
    ],
  });

  useEffect(() => {
    if (editor) {
      const { from, to } = editor.state.selection;
      editor.commands.setContent(state.checker.content, false, {
        preserveWhitespace: "full",
      });
      editor.commands.setTextSelection({ from, to });
    }
  }, [state.checker.content]);
  const dispatch = useAppDispatch();
  if (editor === null) return null;
  return (
    <>
      <Stack className={`${isBelowDesktop ? "px-0" : "px-5 h-100"}`} gap={4}>
        <Stack className="justify-content-center" direction="horizontal">
          <EditorToolbar editor={editor} />
        </Stack>
        <Stack
          className="flex-fill editor border rounded-3 fs-5 position-relative p-4"
          style={{
            minHeight: isBelowDesktop ? "75vh" : "",
          }}
        >
          <Stack
            style={{
              marginTop: "3rem",
            }}
          >
            <Editor editor={editor} />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default EditorPanel;
