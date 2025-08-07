'use client'

import { useCallback, useEffect, useMemo, useState } from "react";
import { Checkbox, CheckboxGroup, Flex, Select, Text } from "@radix-ui/themes";
import { getPopuData, getPrefData } from "./components/getData/getData";
import { Chart } from "./components/view/Chart";

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
  const [selectedData, setSelectedData] = useState<Record<number, popuDataModel>>({})
  const handleSelectPref = async (prefCode: number) => {
    if (!Object.keys(selectedData).includes(prefCode.toString())) {
      // falseのチェックボックスをクリックしたときの処理
      const newPopuData = await getPopuData(prefCode);
      setSelectedData((prev) => {
        return {...prev, [prefCode]: newPopuData};
      })

    } else {
      // trueのチェックボックスをクリックしたときの処理
      setSelectedData((prev) => {
        let newPopuData: Record<number, popuDataModel> = {}
        Object.keys(prev).map((key) => {
          if (Number(key) !== prefCode) {
            newPopuData[Number(key)] = prev[Number(key)]
          }
        })
        return newPopuData;
      })
    }


  }

  console.log(selectedData)
  // データ読み込み中はローディング表示
  if (!allPrefData) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Text size="7" weight="medium">都道府県を選択</Text>
      {allPrefData!.map((pref) => (
       <div key={pref.prefCode}>
         <Checkbox
           id={pref.prefCode.toString()}
           checked={Object.keys(selectedData).includes(pref.prefCode.toString())}
           onCheckedChange={() => {
             // checkedを使ってデータを表示させる
             handleSelectPref(pref.prefCode)
           }}
         />
         <label htmlFor={pref.prefName}>{pref.prefName}</label>
       </div>
     ))}

      <Chart data={selectedData} />
      
    </div>
  );
}
