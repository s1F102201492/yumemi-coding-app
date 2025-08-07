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
    }
}

// Chartコンポーネントに渡す際の型
interface chartComponentModel {
    data: Record<number, popuDataModel>
}

// 