import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SelectComponent } from "../parts/SelectComponent";
import useViewChart from "@/app/hooks/useViewChart";
import { ChartProps } from "@/app/models/Model";

export const Chart: React.FC<ChartProps> = ({ prefData }) => {
  const { category, setCategory, categoryList, viewData, viewSeries } =
    useViewChart(prefData);

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
    "#17becf", // blue-teal
  ];

  if (!viewData || !viewSeries || viewSeries!.length == 0) {
    return (
      <h3 className="font-medium text-gray-600 pl-10 pt-5">
        都道府県を選択すると人口グラフが表示されます。
      </h3>
    );
  } else {
    return (
      <div>
        <article className="pt-8 pb-3 pl-4">
          <SelectComponent
            state={category}
            setfunc={setCategory}
            allData={categoryList}
          />
        </article>

        <article className="px-4 h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={viewData!}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid />
              {viewSeries!.map((name, i) => (
                <Line
                  type="monotone"
                  key={name}
                  dataKey={name}
                  name={name}
                  stroke={COLORS[i % 10]}
                />
              ))}
              <XAxis dataKey="year" />
              <YAxis width="auto" />
              <Legend align="right" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </article>
      </div>
    );
  }
};
