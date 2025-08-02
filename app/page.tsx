'use client'

import { useEffect, useState } from "react";

export default function Home() {
  // 取得したデータを格納
  const [dataState, setDataState] = useState([]);

  // データを取得する関数
  const getData = async () => {

    const res = await fetch('api/resas', {
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
    console.log(data_final)
    setDataState(data_final);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div>
      Hello world!
    </div>
  );
}
