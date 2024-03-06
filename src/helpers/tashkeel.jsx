import axios from "axios";
import { API_URL, BEARER_TOKEN } from "./constants";

export const tashkeel = async (text) => {
  const response = await axios.post(
    `${API_URL}/grammmer-checker/tashkeel_text/`,
    { text, lastmark: true },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    }
  );
  return response.data.tashkeel_text;
};
