import { renderHook, act } from "@testing-library/react";
import useGetSelectedData from "../useGetSelectedData";
import { prefDataModel } from "../../models/Model";

// --- `window.fetch` と `window.alert` をモック化 ---
const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
global.fetch = jest.fn(); // 既存のモックも活かす

describe("useGetSelectedData", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    alertMock.mockClear(); // alertのモックもクリア
  });
  
  // --- Test Case: API取得失敗時 (alertのテスト) ---
  it("API取得に失敗した場合、alertが表示されデータは保存されない", async () => {
    // Arrange: fetchが不正な形式のデータ (null) を返すように設定
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ data: { result: { data: null } } }),
    });

    const { result } = renderHook(() => useGetSelectedData());
    const pref: prefDataModel = { prefCode: 1, prefName: "北海道" };

    // Act: handlePrefAddを実行
    await act(async () => {
      await result.current.handlePrefAdd(pref);
    });

    // Assert: alertが1回呼び出されたことを確認
    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith("もう一度読み込んでください。");

    // Assert: データが追加されていないことを確認
    // このフックのロジックではキー自体が追加されない
    expect(result.current.selectedData["北海道"]).toBeNull();
  });
});
