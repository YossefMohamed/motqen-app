import axios from "axios";
import { API_URL, BEARER_TOKEN } from "./constants";

export const exportToFile = async (text, type) => {
  const response = await axios.post(
    `${API_URL}/grammmer-checker/convert-to-${type}/`,
    { rich_text: text },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    }
  );

  window.open(response.data[`${type}_url`], "_blank");

  return;
};
