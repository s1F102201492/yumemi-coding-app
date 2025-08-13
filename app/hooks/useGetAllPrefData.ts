import { useEffect, useState } from "react";
import { getPrefData } from "../components/getData/getData";

// 全都道府県のデータを取得するカスタムフック
const useGetAllPrefData = () => {

    // ローディングの管理（allPrefDataを読み込んでいる最中は表示）
    const [loading, setLoading] = useState<boolean>(true);

    // 全都道府県のデータを管理
    const [allPrefData, setAllPrefData] = useState<prefDataModel[]|null>(null);

    useEffect(() => {
        setLoading(false);

        const getData = async () => {
            setAllPrefData(await getPrefData());
        }
        
        if (!allPrefData) {
        getData();
        }

        setLoading(true);
    },[])

    return { allPrefData, setAllPrefData, loading }
}

export default useGetAllPrefData;