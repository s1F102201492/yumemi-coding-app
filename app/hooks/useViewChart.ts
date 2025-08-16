import { useEffect, useState } from "react";
import { chartDataModel, popuDataModel } from "../models/Model";

// Rechartにデータを表示するためstate、関数のカスタムフック
const useViewChart = (prefData: Record<string, popuDataModel[]>) => {

    // 選択された項目を管理するState
    const [category, setCategory] = useState<string>('総人口');
    const categoryList = ['総人口', '年少人口', '生産年齢人口', '老年人口']

    // グラフに表示する用に加工したデータを格納
    const [viewData, setViewData] = useState<chartDataModel[]|null>(null);
    const [viewSeries, setViewSeries] = useState<string[]|null>(null);

    const toRechartData = (
        selectedCategory: string
      ) => {
        const series = Object.keys(prefData);
        const categoryIdx = categoryList.indexOf(selectedCategory)

        // rechart用にデータの型を変えたもの
        const newData: chartDataModel[] = [];
        
        // 年ごとに分けるために年を先に格納しておく
        for (let i = 1960; i <= 2045; i += 5) {
            const addYear = {year: i}
            newData.push(addYear);
        }
        // seriesでループして県ごとに処理→categoryのindexで総人口などの使うデータを決める
        // →年ごとにループ、新しい変数に年(1960-2050を格納)→

        for (const onePrefName of series) {
            const onePrefData = prefData[onePrefName][categoryIdx].data
            for (let i = 0; i <= 17; i++) {
                newData[i][onePrefName] = onePrefData[i].value;
            }
        }

        setViewData(newData);
        setViewSeries(series);
    }

    useEffect(() => {
        toRechartData(category);
    }, [category, prefData])

  return {category, setCategory, categoryList, viewData, viewSeries, toRechartData}
}

export default useViewChart