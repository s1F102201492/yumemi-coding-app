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

// SelectedPrefコンポーネントに受け渡しする際の型
interface SelectedPrefProps {
    selectedData: Record<string, popuDataModel[]>;
    setSelectedData: React.Dispatch<React.SetStateAction<Record<string, popuDataModel[]>>>;
    allPrefData: prefDataModel[]|null
}

// PrefSelectorコンポーネントに受け渡しする際の型
interface PrefSelectorProps {
    selectedData: Record<string, popuDataModel[]>;
    setSelectedData: React.Dispatch<React.SetStateAction<Record<string, popuDataModel[]>>>;
    allPrefData: prefDataModel[]|null
    setShowSelector: React.Dispatch<React.SetStateAction<boolean>>;
}