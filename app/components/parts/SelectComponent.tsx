import React, { JSX } from 'react'
import { Select, Text } from "@radix-ui/themes";

type SelectComponentProps<T extends string> = {
  state: T
  setfunc: (value: T) => void
  allData: T[]
}

// どこでもコンポーネントを使用できるように設定
export const SelectComponent = <T extends string>({
  state,
  setfunc,
  allData,
}: SelectComponentProps<T>): JSX.Element => {

    // 選択したものをsetStateする関数
    const handleSelect = (e: string) => {
        setfunc(e as T);
    }

    console.log(state)
  return (
    <div>
        <Select.Root value={state} onValueChange={handleSelect}>
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              {allData!.map((element: string) => <Select.Item key={element} value={element}>{element}</Select.Item>)}
            </Select.Group>
          </Select.Content>
        </Select.Root>
    </div>
  )
}
