interface prefDataModel {
    prefCode: number,
    prefName: string
}

interface popuDataModel {
    boundaryYear: number,
    data: {
        label: string,
        data: {
            year: number,
            value: number,
            rate: number | null
        }
    }
}