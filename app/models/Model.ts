// 取得した都道府県のデータの型
export interface prefDataModel {
  prefCode: number;
  prefName: string;
}

// 取得した人口構成のデータの型
export interface popuDataModel {
  label: string;
  data: {
    year: number;
    value: number;
    rate: number | null;
  }[];
}

export interface chartDataModel {
  year: number;
  [seriesLabel: string]: number | null;
}

// Chartコンポーネントに受け渡しする際の型
export interface ChartProps {
  prefData: Record<string, popuDataModel[]>;
}

// PrefSelectorコンポーネントに受け渡しする際の型
export interface PrefSelectorProps {
  selectedData: Record<string, popuDataModel[]>;
  handlePrefAdd: (data: prefDataModel) => Promise<void>;
}

// SelectedPrefコンポーネントに受け渡しする際の型
export interface useGetSelectedDataProps {
  selectedData: Record<string, popuDataModel[]>;
  handlePrefAdd: (data: prefDataModel) => Promise<void>;
  handlePrefRemove: (removePrefName: string) => void;
}
