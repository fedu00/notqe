import { Dispatch, SetStateAction } from "react";

export const getdataFromSessionStorage = async (
  itemName: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setData: Dispatch<SetStateAction<any>>,
  dataIsString: boolean = false
) => {
  const jsonData = await sessionStorage.getItem(itemName);
  setLoading(false);
  if (dataIsString) {
    setData(jsonData);
  } else {
    const data = JSON.parse(jsonData!);
    setData(data);
  }
};
