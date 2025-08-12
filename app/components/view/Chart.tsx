import React, { useEffect, useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import { SelectComponent } from '../parts/SelectComponent';

export const Chart: React.FC<ChartProps> = ({ prefData }) => {

    // 選択された項目を管理するState
    const [category, setCategory] = useState<string>('総人口');
    const categoryList = ['総人口', '年少人口', '生産年齢人口', '老年人口']

    // グラフに表示する用に加工したデータを格納
    const [viewData, setViewData] = useState<chartDataModel[]|null>(null);
    const [viewSeries, setViewSeries] = useState<string[]|null>(null);

    const toRechartData = (
        selectedCategory: string
      ) => {
        console.log(prefData)
        const series = Object.keys(prefData);
        const categoryIdx = categoryList.indexOf(selectedCategory)
        console.log(categoryIdx)

        // rechart用にデータの型を変えたもの
        let newData: chartDataModel[] = [];
        
        // 年ごとに分けるために年を先に格納しておく
        for (let i = 1960; i <= 2045; i += 5) {
            let addYear = {year: i}
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

        console.log(newData)

        setViewData(newData);
        setViewSeries(series);
    }
    
    console.log(viewData)
    console.log(viewSeries)
    const COLORS: string[] = [
        "#1f77b4", // muted blue
        "#ff7f0e", // safety orange
        "#2ca02c", // cooked asparagus green
        "#d62728", // brick red
        "#9467bd", // muted purple
        "#8c564b", // chestnut brown
        "#e377c2", // raspberry yogurt pink
        "#7f7f7f", // middle gray
        "#bcbd22", // curry yellow-green
        "#17becf"  // blue-teal
      ];

    // const testData = {
    //     data: [
    //       { year: 2000, 北海道: 4.53, 青森県: 1.13, 東京都: 9.55 },
    //       { year: 2005, 北海道: 4.48, 青森県: 1.09, 東京都: 9.90 },
    //       { year: 2010, 北海道: 4.37, 青森県: 1.04, 東京都: 10.45 },
    //       { year: 2015, 北海道: 4.20, 青森県: 1.02, 東京都: 10.70 },
    //       { year: 2020, 北海道: 4.18, 青森県: 1.00, 東京都: 11.15 }
    //     ],
    //     series: ['北海道', '青森県', '東京都']
    //   }

    useEffect(() => {
        toRechartData(category);
    }, [category, prefData])

    if (!viewData || !viewSeries || viewSeries!.length == 0) {
        return (
            <h3 className="font-medium text-gray-600 pl-10 pt-5">都道府県を選択すると人口グラフが表示されます。</h3>
        )
    } else {
        return (
            <div>
                <article className='pt-8 pb-3 pl-4'>
                    <SelectComponent state={category} setfunc={setCategory} allData={categoryList} />
                </article>
                
                <article className='px-4'>
                    <LineChart width={600} height={300} data={viewData!} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid />
                    {viewSeries!.map((name, i) => (
                    <Line type="monotone" key={name} dataKey={name} name={name} stroke={COLORS[i%10]} />))}
                    <XAxis dataKey="year" />
                    <YAxis width="auto" />
                    <Legend align="right" />
                    <Tooltip />
                    </LineChart>
                </article>
                
            </div>
        )
    }

    
}
    
