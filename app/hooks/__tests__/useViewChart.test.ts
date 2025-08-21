import { renderHook, act } from "@testing-library/react";
import useViewChart from "../../hooks/useViewChart";
import { popuDataModel } from "../../models/Model";

describe("useViewChart", () => {
  const mockPopuData: Record<string, popuDataModel[]> = {
    Tokyo: [
      {
        label: "総人口",
        data: Array.from({ length: 18 }, (_, i) => ({
          year: 1960 + i * 5,
          value: 1000 + i,
          rate: null,
        })),
      },
      {
        label: "年少人口",
        data: Array.from({ length: 18 }, (_, i) => ({
          year: 1960 + i * 5,
          value: 500 + i,
          rate: null,
        })),
      },
      {
        label: "生産年齢人口",
        data: Array.from({ length: 18 }, (_, i) => ({
          year: 1960 + i * 5,
          value: 300 + i,
          rate: null,
        })),
      },
      {
        label: "老年人口",
        data: Array.from({ length: 18 }, (_, i) => ({
          year: 1960 + i * 5,
          value: 200 + i,
          rate: null,
        })),
      },
    ],
  };

  it("initializes with default category and generates viewData", () => {
    const { result } = renderHook(() => useViewChart(mockPopuData));

    expect(result.current.category).toBe("総人口");
    expect(result.current.categoryList).toEqual([
      "総人口",
      "年少人口",
      "生産年齢人口",
      "老年人口",
    ]);

    expect(result.current.viewSeries).toEqual(["Tokyo"]);
    expect(result.current.viewData).not.toBeNull();
    expect(result.current.viewData?.[0]).toHaveProperty("year", 1960);
    expect(result.current.viewData?.[0]).toHaveProperty("Tokyo", 1000);
  });

  it("updates viewData when category changes", () => {
    const { result } = renderHook(() => useViewChart(mockPopuData));

    act(() => {
      result.current.setCategory("年少人口");
    });

    expect(result.current.viewData?.[0]).toHaveProperty("Tokyo", 500);
  });
});
