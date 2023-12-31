import { useEffect, useState } from "react";
import { getUser } from "../Services/allRequests";

const useGetReceiver = (item, userId) => {
  const [receiver, setReceiver] = useState("");
  const id = item?.members?.find((id) => id !== userId);
  async function getData() {
    const response = await getUser(id);
    setReceiver(response.data.user);
  }

  useEffect(() => {
    getData();
  }, [item]);
  return [receiver, setReceiver];
};
export default useGetReceiver;
