interface prefDataModel {
    prefCode: number,
    prefName: string
}

interface popuDataModel {
    label: string,
    data: {
        year: number,
        value: number,
        rate: number | null
    }
}