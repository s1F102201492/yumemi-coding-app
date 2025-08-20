import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import PrefSelector from "../PrefSelector";
import useGetAllPrefData from "@/app/hooks/useGetAllPrefData";
import { prefDataModel, popuDataModel } from "@/app/models/Model";
import React from "react";

// --- カスタムフックのモック化 ---
jest.mock("@/app/hooks/useGetAllPrefData");
const mockedUseGetAllPrefData = useGetAllPrefData as jest.Mock;

describe("PrefSelector", () => {
  // テスト用のモックデータ
  const mockPrefData: prefDataModel[] = [
    { prefCode: 1, prefName: "北海道" },
    { prefCode: 2, prefName: "青森県" },
    { prefCode: 13, prefName: "東京都" },
  ];

  // モックのハンドラ関数
  const handlePrefAddMock = jest.fn();

  // 各テストの前にモックをリセット
  beforeEach(() => {
    handlePrefAddMock.mockClear();
    mockedUseGetAllPrefData.mockClear();
  });

  // --- Test Case 1: ローディング状態 ---
  test("ローディング中にLoadingSpinnerが表示される", () => {
    // Arrange: フックがローディング状態を返すようにモック化
    mockedUseGetAllPrefData.mockReturnValue({
      allPrefData: null,
      loading: true,
    });

    // Act: コンポーネントをレンダリング
    render(
      <PrefSelector selectedData={{}} handlePrefAdd={handlePrefAddMock} />,
    );

    // Assert: ローディングスピナーの`role`が存在することを確認
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  // --- Test Case 2: データ取得後の状態 ---
  test("データ取得後、都道府県のリストがボタンとして表示される", () => {
    // Arrange: フックがデータを返すようにモック化
    mockedUseGetAllPrefData.mockReturnValue({
      allPrefData: mockPrefData,
      loading: false,
    });

    // Act: コンポーネントをレンダリング
    render(
      <PrefSelector selectedData={{}} handlePrefAdd={handlePrefAddMock} />,
    );

    // Assert: タイトルと各都道府県のボタンが表示されていることを確認
    expect(screen.getByText("都道府県を選択")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "北海道" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "青森県" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "東京都" })).toBeInTheDocument();
  });

  // --- Test Case 3: ボタンクリックのインタラクション ---
  test("未選択の都道府県ボタンをクリックすると、handlePrefAddが呼び出される", async () => {
    // Arrange: フックをモック化し、userEventをセットアップ
    const user = userEvent.setup();
    mockedUseGetAllPrefData.mockReturnValue({
      allPrefData: mockPrefData,
      loading: false,
    });

    render(
      <PrefSelector
        selectedData={{}} // 初期状態では何も選択されていない
        handlePrefAdd={handlePrefAddMock}
      />,
    );

    // Act: ユーザーが「北海道」ボタンをクリックする操作をシミュレート
    const hokkaidoButton = screen.getByRole("button", { name: "北海道" });
    await user.click(hokkaidoButton);

    // Assert: モック関数が正しいデータで1回呼び出されたことを確認
    expect(handlePrefAddMock).toHaveBeenCalledTimes(1);
    expect(handlePrefAddMock).toHaveBeenCalledWith({
      prefCode: 1,
      prefName: "北海道",
    });
  });

  // --- Test Case 4: 選択済み（無効化）状態 ---
  test("選択済みの都道府県ボタンは無効化されている", async () => {
    // Arrange: フックをモック化し、userEventをセットアップ
    const user = userEvent.setup();
    mockedUseGetAllPrefData.mockReturnValue({
      allPrefData: mockPrefData,
      loading: false,
    });

    const selectedData: Record<string, popuDataModel[]> = {
      東京都: [],
    };

    render(
      <PrefSelector
        selectedData={selectedData}
        handlePrefAdd={handlePrefAddMock}
      />,
    );

    // Act: 「東京都」ボタンを取得
    const tokyoButton = screen.getByRole("button", { name: "東京都" });

    // Assert: ボタンが無効化されていることを確認
    expect(tokyoButton).toBeDisabled();

    // Act: 無効化されたボタンをクリックしてみる
    await user.click(tokyoButton);

    // Assert: ボタンが無効なのでハンドラが呼び出されなかったことを確認
    expect(handlePrefAddMock).not.toHaveBeenCalled();
  });
});
