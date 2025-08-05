// 都道府県データを取得する関数
export const getPrefData = async () => {

    const res = await fetch('api/resas/getPref', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',

      }
    })
    
    const result = await res.json();
    const data_final: prefDataModel[] = result.data.result
    
    if (!data_final) {
      return null;
    }
    
    console.log("都道府県: ", data_final)
    return data_final;
  }

// 人口構成のデータを取得する関数
export const getPopuData = async (pc: number) => {

    // prefCodeは後で変数に変更
    const res = await fetch('api/resas/getPopu', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({prefCode: pc})
    })

    const result = await res.json();
    const data_final = result.data.result

    if (!data_final) {
        
        return ;
    }

    console.log("人口構成: ", data_final)
    return data_final;
}