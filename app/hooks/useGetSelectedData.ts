import { useState } from "react"
import { popuDataModel, prefDataModel } from "../models/Model";

// 選択された都道府県の人口構成データを管理するカスタムフック
const useGetSelectedData = () => {

    // 人口構成のデータを取得する関数
    const getPopuData = async (pc: number) => {

        const res = await fetch('api/resas/getPopu', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({prefCode: pc})
        })

        const result = await res.json();
        const data_final = result.data.result.data

        if (!data_final) {
            
            return ;
        }

        console.log("人口構成: ", data_final)
        return data_final;
    }

    // 選択された都道府県の人口構成のデータを管理
    const [selectedData, setSelectedData] = useState<Record<string, popuDataModel[]>>({})

    // 都道府県の選択
    const handlePrefAdd = async (data: prefDataModel) => {
        if (!Object.keys(selectedData).includes(data.prefName)) {
            // 県を追加したときの処理
            const newPopuData = await getPopuData(data.prefCode);

            setSelectedData((prev) => {
              return {...prev, [data.prefName]: newPopuData};
            })
        }
    }

    // 選択されている県を削除する機能
    const handlePrefRemove = (removePrefName: string) => {
        setSelectedData((prev) => {
            const newPopuData: Record<string, popuDataModel[]> = {}
            Object.keys(prev).map((key) => {
              if (key !== removePrefName) {
                newPopuData[key] = prev[key]
              }
            })
            return newPopuData;
          })
    }  

    return { selectedData, handlePrefAdd, handlePrefRemove }
}

export default useGetSelectedData