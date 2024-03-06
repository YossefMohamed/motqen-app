import CenteredModal from "./Modal";
import { Spinner, Stack } from "react-bootstrap";
import CustomButton from "./Button";
import DownloadIcon from "../icons/Download";
import { getContentFromLink } from "../helpers/getContentFromLink";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useState } from "react";
import { setContent } from "../redux/features/api/apiSlice";

const LinkModal = ({ onClose, show }) => {
  const [link, setLink] = useState("");
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  return (
    <CenteredModal onClose={onClose} show={show} size="lg">
      <Stack gap={1} className="text-secondary text-center p-5">
        <div>
          <DownloadIcon width={150} height={150} />
        </div>
        <p className="fs-1 ">إسترداد مقال من الويب</p>
        <p>ستيم اضافة المحتوي من الرابط تلقائيا</p>
        <div className="input">
          <input
            type="text"
            className="form-control"
            placeholder="أدخل الرابط هنا"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <Stack direction="horizontal" gap={2} className="justify-center mt-5">
          <CustomButton
            onClick={() => {
              setLoading(true);
              getContentFromLink(link, state.checker.currentDoc).then((res) => {
                dispatch(setContent(res));
                onClose();
                setLoading(false);
              });
            }}
          >
            {loading ? (
              <Stack
                direction="horizontal"
                gap={2}
                className="justify-center items-center"
              >
                <Spinner size="sm" />
                جاري التحميل
              </Stack>
            ) : (
              "استرداد المحتوي"
            )}
          </CustomButton>
          <CustomButton outline onClick={onClose}>
            إلغاء
          </CustomButton>
        </Stack>
      </Stack>
    </CenteredModal>
  );
};

export default LinkModal;
