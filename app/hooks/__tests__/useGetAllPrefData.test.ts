import { renderHook, act } from "@testing-library/react";
import useShowSelector from "../../hooks/useShowSelector";

describe("useShowSelector", () => {
  it("toggles showSelector state", () => {
    const { result } = renderHook(() => useShowSelector());

    // 初期状態
    expect(result.current.showSelector).toBe(false);

    // 切り替え
    act(() => {
      result.current.handleOpenClose();
    });
    expect(result.current.showSelector).toBe(true);

    // 再度切り替え
    act(() => {
      result.current.handleOpenClose();
    });
    expect(result.current.showSelector).toBe(false);
  });
});
