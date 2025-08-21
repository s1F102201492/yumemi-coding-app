// このカスタムフックでは全データの都道府県を取得します。
// allPrefData: 全都道府県のデータを格納する変数(型はprefDataModel[] | null)
// getPrefData: 全都道府県のデータを取得する関数(型は() => Promise<prefDataModel[] | null>)
// loading: getPrefDataでデータを取得している際に読み込み中を表示するための変数(型はboolean)

import { useEffect, useState } from "react";
import { prefDataModel } from "../models/Model";

const useGetAllPrefData = () => {
  // ローディングの管理（allPrefDataを読み込んでいる最中は表示）
  const [loading, setLoading] = useState<boolean>(true);

  const [allPrefData, setAllPrefData] = useState<prefDataModel[] | null>(null);

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
      alert("もう一度読み込んでください。");
      return null;
    }

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

  return { allPrefData, loading };
};

export default useGetAllPrefData;
