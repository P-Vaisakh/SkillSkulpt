import axios from "axios";

export const req = async (method, url, data, headers) => {
  const config = {
    method,
    url,
    data,
    headers: headers ? headers : { "Content-Type": "application/json" },
  };
  return await axios(config)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
