import { useEffect, useState } from "react";

// 全都道府県のデータを取得するカスタムフック
const useGetAllPrefData = () => {
  // ローディングの管理（allPrefDataを読み込んでいる最中は表示）
  const [loading, setLoading] = useState<boolean>(true);

  // 全都道府県のデータを管理
  const [allPrefData, setAllPrefData] = useState<prefDataModel[] | null>(null);

  // 全都道府県のデータを取得する関数
  const getPrefData = async () => {
    const res = await fetch("api/resas/getPref", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    const result = await res.json();
    const data_final: prefDataModel[] = result.data.result;

    if (!data_final) {
      return null;
    }

    console.log("都道府県: ", data_final);
    return data_final;
  };

  useEffect(() => {
    setLoading(false);

    const getData = async () => {
      setAllPrefData(await getPrefData());
    };

    if (!allPrefData) {
      getData();
    }

    setLoading(true);
  }, []);

  return { allPrefData, setAllPrefData, loading };
};

export default useGetAllPrefData;
