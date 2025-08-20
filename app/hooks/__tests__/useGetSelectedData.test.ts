import { renderHook, act } from "@testing-library/react";
import useGetSelectedData from "../useGetSelectedData";
import { prefDataModel, popuDataModel } from "../../models/Model";

// mock用データ
const mockPopuData: popuDataModel[] = [
  {
    label: "総人口",
    data: [
      { year: 2000, value: 1000, rate: null },
      { year: 2010, value: 1200, rate: null },
    ],
  },
];

// fetch をモック
global.fetch = jest.fn();

describe("useGetSelectedData", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("都道府県を追加したら人口データが保存される", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ data: { result: { data: mockPopuData } } }),
    });

    const { result } = renderHook(() => useGetSelectedData());

    const pref: prefDataModel = { prefCode: 1, prefName: "北海道" };

    await act(async () => {
      await result.current.handlePrefAdd(pref);
    });

    expect(result.current.selectedData["北海道"]).toEqual(mockPopuData);
  });

  it("同じ県を二重追加しても追加されない", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ data: { result: { data: mockPopuData } } }),
    });

    const { result } = renderHook(() => useGetSelectedData());
    const pref: prefDataModel = { prefCode: 1, prefName: "北海道" };

    await act(async () => {
      await result.current.handlePrefAdd(pref);
      await result.current.handlePrefAdd(pref);
    });

    expect(Object.keys(result.current.selectedData)).toHaveLength(1);
  });

  it("県を削除できる", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ data: { result: { data: mockPopuData } } }),
    });

    const { result } = renderHook(() => useGetSelectedData());
    const pref: prefDataModel = { prefCode: 1, prefName: "北海道" };

    await act(async () => {
      await result.current.handlePrefAdd(pref);
    });

    expect(result.current.selectedData["北海道"]).toBeDefined();

    act(() => {
      result.current.handlePrefRemove("北海道");
    });

    expect(result.current.selectedData["北海道"]).toBeUndefined();
  });

  it("APIがnullを返したらnullが保存される", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ data: { result: { data: null } } }),
    });

    const { result } = renderHook(() => useGetSelectedData());
    const pref: prefDataModel = { prefCode: 1, prefName: "北海道" };

    await act(async () => {
      await result.current.handlePrefAdd(pref);
    });

    expect(result.current.selectedData["北海道"]).toBeNull();
  });
});
