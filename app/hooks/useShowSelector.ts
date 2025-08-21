import { useState } from "react";

const useShowSelector = () => {
  // 県を選択するコンポーネントの表示を管理
  const [showSelector, setShowSelector] = useState<boolean>(false);

  const handleOpenClose = () => setShowSelector(!showSelector);

  return { showSelector, handleOpenClose };
};

export default useShowSelector;
