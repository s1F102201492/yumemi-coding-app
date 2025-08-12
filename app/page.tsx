'use client'

import { useCallback, useEffect, useMemo, useState } from "react";
import { getPopuData, getPrefData } from "./components/getData/getData";
import { Chart } from "./components/view/Chart";
import { SelectedPref } from "./components/view/SelectedPref";

export default function Home() {
  
  // 全都道府県のデータを管理
  const [allPrefData, setAllPrefData] = useState<prefDataModel[]|null>(null);

  useEffect(() => {
    const getData = async () => {
        setAllPrefData(await getPrefData());
    }
    
    if (!allPrefData) {
      getData();
    }
  },[])

  // 選択された都道府県の人口構成のデータを管理
  const [selectedData, setSelectedData] = useState<Record<string, popuDataModel[]>>({})
  

  // データ読み込み中はローディング表示
  if (!allPrefData) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <SelectedPref selectedData={selectedData} setSelectedData={setSelectedData} allPrefData={allPrefData} />

      <Chart prefData={selectedData} />
      
    </div>
  );
}
