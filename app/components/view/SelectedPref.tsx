import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import PrefSelector from "../parts/PrefSelector";
import useGetAllPrefData from "@/app/hooks/useGetAllPrefData";
import useShowSelector from "@/app/hooks/useShowSelector";
import { useGetSelectedDataProps } from "@/app/models/Model";

export const SelectedPref = ({
  selectedData,
  handlePrefAdd,
  handlePrefRemove,
}: useGetSelectedDataProps) => {
  // 県を選択するコンポーネントの表示を管理
  const { showSelector, handleOpenClose } = useShowSelector();

  // カスタムフックuseGetSelectedDataからインポート
  const { allPrefData } = useGetAllPrefData();

  return (
    <div className="w-auto bg-white rounded-lg border border-gray-200 shadow-sm m-6">
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-600">選択中:</span>
          {Object.keys(selectedData).map((prefName) => {
            const pref = allPrefData?.find((p) => p.prefName === prefName);
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
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </span>
            );
          })}
          <button
            onClick={handleOpenClose}
            className="inline-flex items-center gap-1 px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {showSelector ? (
              <>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.85355 2.14645C5.04882 2.34171 5.04882 2.65829 4.85355 2.85355L3.70711 4H9C11.4853 4 13.5 6.01472 13.5 8.5C13.5 10.9853 11.4853 13 9 13H5C4.72386 13 4.5 12.7761 4.5 12.5C4.5 12.2239 4.72386 12 5 12H9C10.933 12 12.5 10.433 12.5 8.5C12.5 6.567 10.933 5 9 5H3.70711L4.85355 6.14645C5.04882 6.34171 5.04882 6.65829 4.85355 6.85355C4.65829 7.04882 4.34171 7.04882 4.14645 6.85355L2.14645 4.85355C1.95118 4.65829 1.95118 4.34171 2.14645 4.14645L4.14645 2.14645C4.34171 1.95118 4.65829 1.95118 4.85355 2.14645Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                閉じる
              </>
            ) : (
              <>
                <PlusIcon className="h-4 w-4" />
                追加
              </>
            )}
          </button>
        </div>

        {showSelector && (
          <PrefSelector
            selectedData={selectedData}
            handlePrefAdd={handlePrefAdd}
          />
        )}
      </div>
    </div>
  );
};
