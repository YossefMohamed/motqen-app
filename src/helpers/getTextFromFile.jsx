import axios from "axios";
import { API_URL, BEARER_TOKEN } from "./constants";

export const getTextFromFile = async (formData, doc_id) => {
  const response = await axios({
    method: "post",
    url: `${API_URL}/grammmer-checker/upload/file/${doc_id}/`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  });

  const { data } = await axios.get(
    `${API_URL}/grammmer-checker/document/${doc_id}/file/${response.data.id}/read/`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    }
  );

  return data.text;
};
