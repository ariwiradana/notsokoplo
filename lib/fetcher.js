import client from "./axios";

const fetcher = async (url) => {
  const response = await client.get(url);
  return response.data;
};

export default fetcher;
