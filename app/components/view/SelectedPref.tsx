import { PlusIcon } from '@radix-ui/react-icons'
import React, { useState } from 'react'
import PrefSelector from '../parts/PrefSelector';

export const SelectedPref = ({ selectedData, setSelectedData, allPrefData }: SelectedPrefProps) => {

    // 県を選択するコンポーネントの表示を管理
    const [showSelector, setShowSelector] = useState<boolean>(false);


    // trueのチェックボックスをクリックしたときの処理
    const handlePrefRemove = (removePrefName: string) => {
        console.log(removePrefName)
        setSelectedData((prev) => {
            let newPopuData: Record<string, popuDataModel[]> = {}
            Object.keys(prev).map((key) => {
              if (key !== removePrefName) {
                newPopuData[key] = prev[key]
              }
            })
            return newPopuData;
          })
    }    

    if (!allPrefData) {
        return <div>データを読み込んでいます...</div>
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm m-6">
            <div className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">選択中:</span>
                    {Object.keys(selectedData).map((prefName) => {
                    const pref = allPrefData.find((p) => p.prefName === prefName)
                    return (
                    <span
                        key={prefName}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full"
                    >
                        {pref?.prefName}
                        <button
                        onClick={() => handlePrefRemove(prefName)}
                        className="inline-flex items-center justify-center w-4 h-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </button>
                    </span>
                    )
                })}
                <button
                onClick={() => setShowSelector(!showSelector)}
                className="inline-flex items-center gap-1 px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <PlusIcon className="h-4 w-4" />
                    追加
                </button>
                </div>

                {showSelector && <PrefSelector selectedData={selectedData} setSelectedData={setSelectedData} allPrefData={allPrefData} setShowSelector={setShowSelector} />}
            </div>
        </div>
  )
}
