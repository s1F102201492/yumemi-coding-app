// このカスタムフックでは都道府県を選択するコンポーネントの表示を管理します。
// showSelector: コンポーネントの表示を管理する変数(型はboolean)
// handleOpenClose: コンポーネントを表示、非表示にする関数

import { useState } from "react";

const useShowSelector = () => {
  const [showSelector, setShowSelector] = useState<boolean>(false);

  const handleOpenClose = () => setShowSelector(!showSelector);

  return { showSelector, handleOpenClose };
};

export default useShowSelector;
