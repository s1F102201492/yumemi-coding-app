"use client";

import React from "react";
import { Chart } from "./components/view/Chart";
import { SelectedPref } from "./components/view/SelectedPref";
import { LoadingSpinner } from "./components/parts/LoadingSpinner";
import useGetAllPrefData from "./hooks/useGetAllPrefData";
import useGetSelectedData from "./hooks/useGetSelectedData";

export default function Home() {
  // useGetDataから都道府県データを取得
  const { allPrefData, loading } = useGetAllPrefData();

  // 選択された都道府県の人口構成のデータを管理
  const { selectedData, handlePrefAdd, handlePrefRemove } =
    useGetSelectedData();

  // データ読み込み中はローディング表示
  if (!allPrefData) {
    return (
      <div>
        <LoadingSpinner loading={loading} />
      </div>
    );
  }

  return (
    <div>
      <SelectedPref
        selectedData={selectedData}
        handlePrefAdd={handlePrefAdd}
        handlePrefRemove={handlePrefRemove}
      />

      <Chart prefData={selectedData} />
    </div>
  );
}
