import React from 'react'
import useGetAllPrefData from '@/app/hooks/useGetAllPrefData';
import { LoadingSpinner } from './LoadingSpinner';
import { PrefSelectorProps } from '@/app/models/Model';


// 県を選択するためのコンポーネント
const PrefSelector = ({ selectedData, handlePrefAdd }: PrefSelectorProps) => {

    const { allPrefData, loading } = useGetAllPrefData();

    if (!allPrefData) {
        return (
            <div>
                <LoadingSpinner loading={loading} />
            </div>
        )
    }

  return (
    <div>
        <article className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <section className="p-6">
            <h3 className="text-sm font-medium pb-2">都道府県を選択</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {allPrefData!.map((data) => {
                    const isSelected = Object.keys(selectedData).includes(data.prefName)
                    return (
                        <li key={data.prefCode}>
                            {isSelected
                            ? <button disabled
                            className='w-full text-left text-xs h-auto py-2 px-3 rounded-md border transition-colors
                            bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'>
                                {data.prefName}
                            </button>
                            :
                            <button onClick={() => handlePrefAdd(data)}
                            className="w-full text-left text-xs h-auto py-2 px-3 rounded-md border transition-colors
                                bg-white border-gray-300 text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-pressed={isSelected}>
                                    <article className="flex flex-col items-start">
                                        <h4 className="font-medium">{data.prefName}</h4>
                                    </article>
                            </button>
                            }
                            
                        </li> 
                    )
                })}
            </ul>
            </section>
        </article>
    </div>
  )
}

export default PrefSelector