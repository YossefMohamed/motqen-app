import CenteredModal from "./Modal";
import { Spinner, Stack } from "react-bootstrap";
import CustomButton from "./Button";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { checkerAskAi, editorAskAi } from "../redux/features/api/apiSlice";
import { useLocation } from "react-router-dom";

const AIModal = ({ onClose, show }) => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const isEditor = pathname.includes("editor");
  const state = useAppSelector((state) => state);
  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      !isEditor
        ? checkerAskAi({
            content: value,
          })
        : editorAskAi({
            content: value,
          })
    );
    onClose();
  };

  return (
    <CenteredModal onClose={onClose} show={show}>
      <form onSubmit={onSubmit}>
        <Stack gap={3}>
          <div className="title text-primary fs-4">مساعد Ai</div>
          <div className="input">
            <input
              type="text"
              className="form-control"
              placeholder="أخبر Ai ماذا تريد أن تفعل؟"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <Stack direction="horizontal" gap={2}>
            <button disabled={state.checker.checkerAi.aiStatus === "loading"}>
              <CustomButton>
                {state.checker.checkerAi.aiStatus === "loading" ? (
                  <span>
                    <Spinner size="sm" /> جاري التحميل
                  </span>
                ) : (
                  <span>تنفيذ</span>
                )}
              </CustomButton>
            </button>
            <CustomButton outline onClick={onClose}>
              إلغاء
            </CustomButton>
          </Stack>
        </Stack>
      </form>
    </CenteredModal>
  );
};

export default AIModal;
