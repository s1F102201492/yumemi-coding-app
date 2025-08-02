'use client'

import { useEffect, useState } from "react";

export default function Home() {
  // 都道府県のデータをStateで管理
  const [prefState, setPrefState] = useState<prefDataModel | null>();

  // 人口構成のデータをStateで管理
  const [popuState, setPopuState] = useState<popuDataModel | null>();

  // データを取得する関数
  const getPrefData = async () => {

    const res = await fetch('api/resas/getPref', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',

      }
    })
    
    const result = await res.json();
    const data_final = result.data.result
    
    if (!data_final) {
      return ;
    }
    
    setPrefState(data_final);
    console.log("都道府県: ", data_final)
  }

  const getPopuData = async () => {
    // prefCodeは後で変数に変更
    const res = await fetch('api/resas/getPopu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({prefCode: 1})
    })
    
    const result = await res.json();
    const data_final = result.data.result
    
    if (!data_final) {
      return ;
    }
    
    setPopuState(data_final);
    console.log("人口構成: ", data_final)
  }

  useEffect(() => {
    getPrefData();
    getPopuData();
  }, [])

  return (
    <div>
      Hello world!
    </div>
  );
}
