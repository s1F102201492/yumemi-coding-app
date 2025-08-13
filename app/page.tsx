'use client'

import { useCallback, useEffect, useMemo, useState } from "react";
import { getPopuData, getPrefData } from "./components/getData/getData";
import { Chart } from "./components/view/Chart";
import { SelectedPref } from "./components/view/SelectedPref";
import { LoadingSpinner } from "./components/parts/LoadingSpinner";
import useGetAllPrefData from "./hooks/useGetAllPrefData";

export default function Home() {
  
  // useGetDataから都道府県データを取得
  const { allPrefData, loading } = useGetAllPrefData();

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
