import React, { useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import { SelectComponent } from '../parts/SelectComponent';

export const Chart = (data: chartComponentModel) => {

    // 選択された項目を管理するState
    const [category, setCategory] = useState<string>('総人口');
    const categoryList = ['総人口', '年少人口', '生産年齢人口', '老年人口']

    // グラフに表示する用に加工したデータを格納
    // const [viewData, setViewData] = useState();
    // const changeDataModel = (category: string) => {
    //     const newData = [];
    //     for (const key in data) {
    //         if (key.)
    //     }
    // }
    
    return (
        <div>
            <SelectComponent state={category} setfunc={setCategory} allData={categoryList}/>

            {/* <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="uv" stroke="purple" strokeWidth={2} name="My data series name" />
            <XAxis dataKey="name" />
            <YAxis width="auto" label={{ value: 'UV', position: 'insideLeft', angle: -90 }} />
            <Legend align="right" />
            <Tooltip />
            </LineChart> */}
        </div>
    )
}
    
