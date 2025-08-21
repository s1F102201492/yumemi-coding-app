import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { SelectComponent } from "../SelectComponent";
import { Theme } from "@radix-ui/themes";
import React from "react";

describe("SelectComponent", () => {
  const mockSetFunc = jest.fn();
  window.HTMLElement.prototype.hasPointerCapture = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  const allData = ["総人口", "年少人口", "生産年齢人口", "老年人口"];

  beforeEach(() => {
    mockSetFunc.mockClear();
  });

  // --- Test Case 1: 初期描画 ---
  test("初期値が正しく表示される", () => {
    // Arrange & Act: 初期値を持つコンポーネントをレンダリング
    render(
      <Theme>
        <SelectComponent
          state="総人口"
          setfunc={mockSetFunc}
          allData={allData}
        />
      </Theme>,
    );

    // Assert: トリガーボタンが初期値を表示していることを確認
    // Radix UIのSelectトリガーは 'combobox' のroleを持ちます
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent("総人口");
  });

  // --- Test Case 2: 新しいオプションの選択 ---
  test("新しいオプションを選択するとsetfuncが正しい値で呼び出される", async () => {
    // Arrange: インタラクションをシミュレートするためにuserEventをセットアップ
    const user = userEvent.setup();
    render(
      <Theme>
        <SelectComponent
          state="総人口"
          setfunc={mockSetFunc}
          allData={allData}
        />
      </Theme>,
    );

    // Act 1: トリガーをクリックしてドロップダウンを開く
    const trigger = screen.getByRole("combobox");
    await user.click(trigger);

    // Assert 1: オプションが表示されているはず。`role`と`name`で一つを見つける
    const optionToSelect = await screen.findByRole("option", {
      name: "生産年齢人口",
    });
    expect(optionToSelect).toBeInTheDocument();

    // Act 2: 新しいオプションをクリックする
    await user.click(optionToSelect);

    // Assert 2: コールバック関数が正しい新しい値で呼び出されたことを確認
    expect(mockSetFunc).toHaveBeenCalledTimes(1);
    expect(mockSetFunc).toHaveBeenCalledWith("生産年齢人口");
  });
});
