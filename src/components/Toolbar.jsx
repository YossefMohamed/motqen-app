import TashkilIcon from "../icons/Tashkil";
import RemoveTashkilIcon from "../icons/RemoveTashkil";
import MagicStickIcon from "../icons/MagicStick";
import LinkIcon from "../icons/Link";
import AIIcon from "../icons/AI";
import BoldIcon from "../icons/Bold";
import ItalicIcon from "../icons/Italic";
import PenIcon from "../icons/Pen";
import ArrowIcon from "../icons/Arrow";
import { themeColors } from "../theme";
import UnderlineIcon from "../icons/Underline";
import RightAlignIcon from "../icons/RightAlign";
import CenterAlignIcon from "../icons/CenterAlign";
import LeftAlignIcon from "../icons/LeftAlign";
import ListIcon from "../icons/List";
import OrderedListIcon from "../icons/OrderedList";
import LeftTabIcon from "../icons/LeftTab";
import RightTabIcon from "../icons/RightTab";
import UndoIcon from "../icons/Undo";
import RedoIcon from "../icons/Redo";
import { Stack } from "react-bootstrap";
import DropdownColor from "./DropdownColor";
import React, { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import MultiOptionDropDown from "./MultiOptionDropDown";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "../helpers/constants";
import AIModal from "./AIModal";
import LinkModal from "./LinkModal";
import { tashkeel } from "../helpers/tashkeel";
import { removeTashkeel } from "../helpers/removeTashkeel";
import { useAppDispatch } from "../redux/hooks";
import { rephraseText } from "../redux/features/api/apiSlice";

const Toolbar = ({ editor }) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const dispatch = useAppDispatch();
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className={` border rounded-4 py-2 px-2 bg-light  ${
        breakpoint !== "desktop" ? "w-100 mt-4 py-1 px-2" : ""
      }`}
      style={
        breakpoint !== "desktop"
          ? { flexWrap: "wrap", justifyContent: "space-between" }
          : { flexWrap: "wrap" }
      }
    >
      {getToolbarData(editor, dispatch).map((item, index) => (
        <ToolbarItem key={index} {...item} />
      ))}
    </Stack>
  );
};

const ToolbarItem = ({
  icon,
  title,
  action,
  isColorDropDown,
  dropDownAction,
  isMultiOptionDropDown,
  options,
  Modal,
  isActiveOption,
}) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = () => {
    setOpenDropDown(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <>
      {Modal && (
        <Modal
          onClose={() => {
            setOpenModal(false);
          }}
          show={openModal}
        />
      )}
      <Stack
        direction="horizontal"
        gap={1}
        className="align-content-center"
        role="button"
        onClick={() => {
          if (action) {
            action();
          }
          if (isColorDropDown || isMultiOptionDropDown) {
            setOpenDropDown((prev) => !prev);
          }
          if (Modal) {
            setOpenModal(true);
          }
        }}
        ref={ref}
        style={{ width: "max-content" }}
      >
        <span className="position-relative">
          {icon}
          {openDropDown && isColorDropDown && (
            <DropdownColor dropDownAction={dropDownAction} />
          )}
          {openDropDown && isMultiOptionDropDown && (
            <MultiOptionDropDown
              options={options}
              dropDownAction={dropDownAction}
              isActive={isActiveOption || 0}
            />
          )}
        </span>
        {!!title && (
          <span className="fw-medium text-primary fs-6">{title}</span>
        )}
      </Stack>
    </>
  );
};

const getToolbarData = (editor, dispatch) => [
  {
    icon: <TashkilIcon />,
    title: "تشكيل",
    action: () => {
      const { view, state } = editor;
      const { from, to } = view.state.selection;
      const text = state.doc.textBetween(from, to);
      tashkeel(text).then((res) =>
        editor
          .chain()
          .focus()
          .insertContentAt(
            {
              from: from - 1,
              to,
            },
            res
          )
          .run()
      );
    },
  },
  {
    icon: <RemoveTashkilIcon />,
    title: "إزالة التشكيل",
    action: async () => {
      const { view, state } = editor;
      const { from, to } = view.state.selection;
      const text = state.doc.textBetween(from, to);
      const removeedText = await removeTashkeel(text);
      editor
        .chain()
        .focus()
        .insertContentAt(
          {
            from: from,
            to,
          },
          removeedText
        )
        .run();
    },
  },
  {
    icon: <MagicStickIcon />,
    title: "إعادة الصياغة",
    action: () => {
      dispatch(rephraseText());
    },
  },
  {
    icon: <LinkIcon />,
    Modal: LinkModal,
  },
  {
    icon: <AIIcon />,
    Modal: AIModal,
  },
  {
    icon: <BoldIcon />,
    action: () => editor.chain().focus().toggleBold().run(),
  },
  {
    icon: <ItalicIcon />,
    action: () => editor.chain().focus().toggleItalic().run(),
  },
  {
    icon: (
      <Stack direction="horizontal" gap={1} className="align-content-center">
        <span>
          <PenIcon />
        </span>
        <span>
          <ArrowIcon
            rotate={90}
            width={10}
            height={10}
            color={themeColors.colors.primary}
          />
        </span>
      </Stack>
    ),
    isColorDropDown: true,
    dropDownAction: (color) =>
      editor.chain().focus().setHighlight({ color }).run(),
  },
  {
    icon: (
      <Stack direction="horizontal" gap={1} className="align-content-center">
        <span>
          <UnderlineIcon />
        </span>
        <span>
          <ArrowIcon
            rotate={90}
            width={10}
            height={10}
            color={themeColors.colors.primary}
          />
        </span>
      </Stack>
    ),
    isColorDropDown: true,
    dropDownAction: (color) => editor.chain().focus().setColor(color).run(),
  },
  {
    icon: (
      <Stack
        direction="horizontal"
        gap={1}
        className="items-center justify-center"
      >
        <input
          type="text"
          pattern="[0-9]{5}"
          defaultValue={
            editor.getAttributes("textStyle")?.fontSize?.split("px")[0] || 13
          }
          style={{
            width: "27px",
            height: "27px",
            fontSize: "15px",
          }}
          className="text-center border border-primary rounded text-primary fw-medium"
          onBlur={(e) => {
            editor.chain().focus().setFontSize(`${e.target.value}px`).run();
          }}
        />
        <span>
          <ArrowIcon
            rotate={90}
            width={10}
            height={10}
            color={themeColors.colors.primary}
          />
        </span>
      </Stack>
    ),
    isMultiOptionDropDown: true,
    options: [
      {
        value: "8",
        className: "px-2",
      },
      {
        value: "10",
        className: "px-2",
      },
      {
        value: "12",
        className: "px-2",
      },
      {
        value: "14",
        className: "px-2",
      },
    ],
    dropDownAction: (value) =>
      editor.chain().focus().setFontSize(`${value}px`).run(),
  },
  {
    icon: (
      <Stack
        direction="horizontal"
        gap={1}
        className="align-content-center p-1 px-2 text-primary bg-reverse rounded"
      >
        <span>
          <ArrowIcon
            rotate={90}
            width={10}
            height={10}
            color={themeColors.colors.primary}
          />
        </span>
        <span>
          {`${
            editor.getAttributes("heading").level
              ? `Heading ${editor.getAttributes("heading").level}`
              : "paragraph"
          }`}
        </span>
      </Stack>
    ),
    options: [
      {
        value: "paragraph",
        className: "fs-6",
      },
      { value: "heading 1", className: "fs-1" },
      {
        value: "heading 2",
        className: "fs-2",
      },
      {
        value: "heading 3",
        className: "fs-3",
      },
      {
        value: "heading 4",
        className: "fs-4",
      },
      {
        value: "heading 5",
        className: "fs-5",
      },
      {
        value: "heading 6",
        className: "fs-6",
      },
    ],
    isMultiOptionDropDown: true,
    dropDownAction: (value) => {
      editor.chain().focus().unsetFontSize().run();

      if (value === "paragraph") editor.chain().focus().setParagraph().run();
      if (value === "heading 1") {
        editor.chain().focus().setHeading({ level: 1 }).run();
      }
      if (value === "heading 2") {
        editor.chain().focus().setHeading({ level: 2 }).run();
      }
      if (value === "heading 3") {
        editor.chain().focus().setHeading({ level: 3 }).run();
      }
      if (value === "heading 4") {
        editor.chain().focus().setHeading({ level: 4 }).run();
      }
      if (value === "heading 5") {
        editor.chain().focus().setHeading({ level: 5 }).run();
      }
      if (value === "heading 6") {
        editor.chain().focus().setHeading({ level: 6 }).run();
      }
    },
    isActiveOption: editor.getAttributes("heading").level,
  },
  {
    icon: <RightAlignIcon />,
    action: () => editor.chain().focus().setTextAlign("right").run(),
  },
  {
    icon: <CenterAlignIcon />,
    action: () => editor.chain().focus().setTextAlign("center").run(),
  },
  {
    icon: <LeftAlignIcon />,
    action: () => editor.chain().focus().setTextAlign("left").run(),
  },
  {
    icon: (
      <>
        <span>
          <ListIcon />
        </span>
        <span>
          <ArrowIcon
            rotate={90}
            width={10}
            height={10}
            color={themeColors.colors.primary}
          />
        </span>
      </>
    ),
  },
  {
    icon: (
      <>
        <span>
          <OrderedListIcon />
        </span>
        <span>
          <ArrowIcon
            rotate={90}
            width={10}
            height={10}
            color={themeColors.colors.primary}
          />
        </span>
      </>
    ),
    isListDropDown: true,
  },
  {
    icon: <LeftTabIcon />,
    action: () =>
      editor
        .chain()
        .focus("end")

        .createParagraphNear()
        .insertContent("\t")
        .run(),
  },
  {
    icon: <RightTabIcon />,
    action: () =>
      editor
        .chain()
        .focus("start")
        .createParagraphNear()
        .insertContent("\t")
        .run(),
  },
  {
    icon: <UndoIcon />,
    action: () => editor.chain().focus().undo().run(),
  },
  {
    icon: <RedoIcon />,
    action: () => editor.chain().focus().redo().run(),
  },
];

export default Toolbar;
