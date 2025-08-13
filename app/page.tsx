'use client'

import { useCallback, useEffect, useMemo, useState } from "react";
import { getPopuData, getPrefData } from "./components/getData/getData";
import { Chart } from "./components/view/Chart";
import { SelectedPref } from "./components/view/SelectedPref";
import { LoadingSpinner } from "./components/parts/LoadingSpinner";

export default function Home() {
  
  // ローディングの管理（allPrefDataを読み込んでいる最中は表示）
  const [loading, setLoading] = useState<boolean>(true);

  // 全都道府県のデータを管理
  const [allPrefData, setAllPrefData] = useState<prefDataModel[]|null>(null);

  useEffect(() => {
    setLoading(false);

    const getData = async () => {
        setAllPrefData(await getPrefData());
    }
    
    if (!allPrefData) {
      getData();
    }

    setLoading(true);
  },[])

  // 選択された都道府県の人口構成のデータを管理
  const [selectedData, setSelectedData] = useState<Record<string, popuDataModel[]>>({})
  

  // データ読み込み中はローディング表示
  if (!allPrefData) {
    return (
      <div>
        <LoadingSpinner loading={loading} />
      </div>
    )
  }

  return (
    <div>
      <SelectedPref selectedData={selectedData} setSelectedData={setSelectedData} allPrefData={allPrefData} />

      <Chart prefData={selectedData} />
      
    </div>
  );
}
