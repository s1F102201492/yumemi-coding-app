import { renderHook, waitFor } from "@testing-library/react";
import useGetAllPrefData from "../useGetAllPrefData"; // テスト対象のフック

describe("useGetAllPrefData", () => {
  // --- `window.fetch` と `window.alert` をモック化 ---
  // jest.spyOnを使うと、テスト後に自動で元の関数に戻すことができます。
  const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
  const fetchMock = jest.spyOn(window, "fetch");

  // 各テストの前にモックの呼び出し履歴をリセット
  beforeEach(() => {
    alertMock.mockClear();
    fetchMock.mockClear();
  });

  // --- Test Case 1: API取得成功時 ---
  test("データの取得に成功した場合、正しいデータが返される", async () => {
    // Arrange: fetchが成功レスポンスを返すように設定
    const mockPrefData = [{ prefCode: 1, prefName: "北海道" }];
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { result: mockPrefData } }),
    } as Response);

    // Act: フックをレンダリング
    const { result } = renderHook(() => useGetAllPrefData());

    // Assert: useEffect内の非同期処理が完了するのを待ち、データが正しくセットされたか確認
    await waitFor(() => {
      expect(result.current.allPrefData).toEqual(mockPrefData);
    });

    // Assert: alertが呼ばれていないことを確認
    expect(alertMock).not.toHaveBeenCalled();
  });

  // --- Test Case 2: API取得失敗時 (alertのテスト) ---
  test("データの取得に失敗した場合、alertが呼び出される", async () => {
    // Arrange: fetchが不正な形式のデータ (null) を返すように設定
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { result: null } }),
    } as Response);

    // Act: フックをレンダリング
    const { result } = renderHook(() => useGetAllPrefData());

    // Assert: 非同期処理が完了するのを待ち、alertが1回呼び出されたか確認
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledTimes(1);
    });

    // Assert: 正しいメッセージでalertが呼ばれたか確認
    expect(alertMock).toHaveBeenCalledWith("もう一度読み込んでください。");

    // Assert: データはnullのままであることを確認
    expect(result.current.allPrefData).toBeNull();
  });
});
