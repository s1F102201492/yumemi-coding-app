'use client'

import { useCallback, useEffect, useMemo, useState } from "react";
import { Select, Text } from "@radix-ui/themes";
import { getPopuData, getPrefData } from "./components/getData/getData";

export default function Home() {
  
  // 全都道府県のデータを管理
  const [allPrefData, setAllPrefData] = useState<prefDataModel[]|null>(null);

  // 人口構成のデータを管理
  const [popuData, setPopuData] = useState<popuDataModel|null>(null);

  useEffect(() => {
    const getData = async () => {
        setAllPrefData(await getPrefData());
    }
    
    if (!allPrefData) {
      getData();
    }
  },[])

  // 選択された都道府県をStateで管理
  const [prefState, setPrefState] = useState<string>('');

  // 都道府県の選択を反映させる関数
  const handlePrefSelect = (e: string) => {
    allPrefData!.map(async pref => {
      if (pref.prefName == e) {
        setPopuData(await getPopuData(pref.prefCode));
        setPrefState(e);
        return;
      }
    })
  }

  // データ読み込み中はローディング表示
  if (allPrefData === null) {
    return <div>Loading…</div>
  }

  return (
    <div>
        <Text size="7" weight="medium">都道府県を選択</Text>
        <Select.Root value={prefState} onValueChange={handlePrefSelect}>
          <Select.Trigger placeholder="都道府県を選択"/>
          <Select.Content>
            <Select.Group>
              {allPrefData!.map((pref) => <Select.Item key={pref.prefCode} value={pref.prefName}>{pref.prefName}</Select.Item>)}
            </Select.Group>
          </Select.Content>
        </Select.Root>
    </div>
  );
}
