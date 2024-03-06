import axios from "axios";
import { API_URL, BEARER_TOKEN } from "./constants";

export const removeTashkeel = async (text) => {
  const response = await axios.post(
    `${API_URL}/grammmer-checker/remove_tashkeel_text/`,
    { text },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    }
  );

  return response.data.normal_text;
};
