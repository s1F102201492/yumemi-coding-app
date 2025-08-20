import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SelectedPref } from '../SelectedPref';
import useShowSelector from '@/app/hooks/useShowSelector';
import useGetAllPrefData from '@/app/hooks/useGetAllPrefData';

// --- カスタムフックのモック化 ---
jest.mock('@/app/hooks/useShowSelector');
jest.mock('@/app/hooks/useGetAllPrefData');
// PrefSelectorも内部でフックを使っているため、ダミーコンポーネントとしてモック化
jest.mock('../../parts/PrefSelector', () => () => <div data-testid="pref-selector" />);

const mockedUseShowSelector = useShowSelector as jest.Mock;
const mockedUseGetAllPrefData = useGetAllPrefData as jest.Mock;

describe('SelectedPref', () => {
  const handlePrefAddMock = jest.fn();
  const handlePrefRemoveMock = jest.fn();
  const handleOpenCloseMock = jest.fn();

  // テスト用のモックデータ
  const mockSelectedData = {
    '東京都': [],
    '大阪府': [],
  };
  const mockAllPrefData = [
    { prefCode: 13, prefName: '東京都' },
    { prefCode: 27, prefName: '大阪府' },
  ];

  // 各テストの前にモックをリセット
  beforeEach(() => {
    jest.clearAllMocks();
    // フックのデフォルトの戻り値を設定
    mockedUseGetAllPrefData.mockReturnValue({ allPrefData: mockAllPrefData });
    mockedUseShowSelector.mockReturnValue({
      showSelector: false,
      handleOpenClose: handleOpenCloseMock,
    });
  });

  // --- Test Case 1: 選択済み都道府県の表示 ---
  test('propsで渡された選択済みの都道府県が正しく表示される', () => {
    // Act
    render(
      <SelectedPref
        selectedData={mockSelectedData}
        handlePrefAdd={handlePrefAddMock}
        handlePrefRemove={handlePrefRemoveMock}
      />
    );

    // Assert
    expect(screen.getByText('選択中:')).toBeInTheDocument();
    expect(screen.getByText('東京都')).toBeInTheDocument();
    expect(screen.getByText('大阪府')).toBeInTheDocument();
  });

  // --- Test Case 2: 削除ボタンのクリック ---
  test('都道府県の削除ボタンをクリックするとhandlePrefRemoveが呼び出される', async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <SelectedPref
        selectedData={mockSelectedData}
        handlePrefAdd={handlePrefAddMock}
        handlePrefRemove={handlePrefRemoveMock}
      />
    );

    const removeButton = screen.getByRole('button', { name: '東京都を削除' });
    await user.click(removeButton);

    // Assert
    expect(handlePrefRemoveMock).toHaveBeenCalledTimes(1);
    expect(handlePrefRemoveMock).toHaveBeenCalledWith('東京都');
  });

  // --- Test Case 3: 「追加」ボタンのクリックとセレクターの表示 ---
  test('「追加」ボタンをクリックするとhandleOpenCloseが呼び出され、セレクターが表示される', async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <SelectedPref
        selectedData={{}}
        handlePrefAdd={handlePrefAddMock}
        handlePrefRemove={handlePrefRemoveMock}
      />
    );

    // Act: 「追加」ボタンをクリック
    const addButton = screen.getByRole('button', { name: /追加/ });
    await user.click(addButton);

    // Assert: フックの関数が呼ばれたことを確認
    expect(handleOpenCloseMock).toHaveBeenCalledTimes(1);

    // Arrange 2: フックが showSelector: true を返すように再設定して再レンダリング
    mockedUseShowSelector.mockReturnValue({
      showSelector: true, // 表示状態にする
      handleOpenClose: handleOpenCloseMock,
    });
    render(
      <SelectedPref
        selectedData={{}}
        handlePrefAdd={handlePrefAddMock}
        handlePrefRemove={handlePrefRemoveMock}
      />
    );

    // Assert 2: PrefSelector（のモック）が表示されていることを確認
    expect(screen.getByTestId('pref-selector')).toBeInTheDocument();
    // Assert 2: ボタンのテキストが「閉じる」に変わっていることを確認
    expect(screen.getByRole('button', { name: /閉じる/ })).toBeInTheDocument();
  });
});
