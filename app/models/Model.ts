// 取得した都道府県のデータの型
interface prefDataModel {
    prefCode: number,
    prefName: string
}

// 取得した人口構成のデータの型
interface popuDataModel {
    label: string,
    data: {
        year: number,
        value: number,
        rate: number | null
    }[]
}

interface chartDataModel {
    year: number;
    [seriesLabel: string]: number | null;
}

interface RechartDataResult {
    data: chartDataModel[];
    series: string[];
  }

// Chartコンポーネントに受け渡しする際の型
interface ChartProps {
    prefData: Record<string, popuDataModel[]>
}

// PrefSelectorコンポーネントに受け渡しする際の型
interface PrefSelectorProps {
    selectedData: Record<string, popuDataModel[]>
    handlePrefAdd: (data: prefDataModel) => Promise<void>
}

// SelectedPrefコンポーネントに受け渡しする際の型
interface useGetSelectedDataProps {
    selectedData: Record<string, popuDataModel[]>
    handlePrefAdd: (data: prefDataModel) => Promise<void>
    handlePrefRemove: (removePrefName: string) => void
}