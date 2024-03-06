import axios from "axios";
import { API_URL, BEARER_TOKEN } from "./constants";
import Showdown from "showdown";

export const getContentFromLink = async (link, doc_id) => {
  const response = await axios.post(
    `${API_URL}/text-rephrase/create/${doc_id}/`,
    { URL: link },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    }
  );

  const converter = new Showdown.Converter();
  return converter.makeHtml(response.data.rephrased_text);
};
