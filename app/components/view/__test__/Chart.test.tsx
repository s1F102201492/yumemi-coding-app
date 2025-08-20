import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Theme } from '@radix-ui/themes';
import { Chart } from '../Chart';
import useViewChart from '@/app/hooks/useViewChart';

// --- `recharts`ライブラリのモック化 ---
jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts');
  return {
    ...OriginalModule,
    LineChart: ({ children }: { children: React.ReactNode }) => <div data-testid="line-chart">{children}</div>,
    Line: () => <div data-testid="line" />,
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    CartesianGrid: () => <div data-testid="cartesian-grid" />,
    Legend: () => <div data-testid="legend" />,
    Tooltip: () => <div data-testid="tooltip" />,
  };
});

// --- `useViewChart`カスタムフックのモック化 ---
jest.mock('@/app/hooks/useViewChart');
const mockedUseViewChart = useViewChart as jest.Mock;

describe('Chart', () => {
  // 各テストの前にモックをクリア
  beforeEach(() => {
    mockedUseViewChart.mockClear();
  });

  // --- Test Case 1: データがない場合（初期表示） ---
  test('都道府県が選択されていない場合、案内メッセージが表示される', () => {
    // Arrange: フックが空のデータを返すように設定
    mockedUseViewChart.mockReturnValue({
      category: '総人口',
      setCategory: jest.fn(),
      categoryList: ['総人口'],
      viewData: null,
      viewSeries: [], // 空の配列
    });

    // Act: コンポーネントをレンダリング
    render(<Chart prefData={{}} />);

    // Assert: 案内メッセージが表示されていることを確認
    expect(screen.getByText('都道府県を選択すると人口グラフが表示されます。')).toBeInTheDocument();
    // Assert: チャートが表示されていないことを確認
    expect(screen.queryByTestId('line-chart')).not.toBeInTheDocument();
  });

  // --- Test Case 2: データがある場合 ---
  test('都道府県が選択されている場合、グラフとカテゴリセレクターが表示される', () => {
    // Arrange: フックがテスト用のデータを返すように設定
    mockedUseViewChart.mockReturnValue({
      category: '総人口',
      setCategory: jest.fn(),
      categoryList: ['総人口', '年少人口'],
      viewData: [{ year: 2020, 東京都: 1000 }],
      viewSeries: ['東京都'],
    });

    // Act: コンポーネントをレンダリング（Radix UIのためにThemeでラップ）
    render(
      <Theme>
        <Chart prefData={{ '東京都': [] }} />
      </Theme>
    );

    // Assert: 案内メッセージが表示されていないことを確認
    expect(screen.queryByText('都道府県を選択すると人口グラフが表示されます。')).not.toBeInTheDocument();

    // Assert: カテゴリセレクター（SelectComponent）が表示されていることを確認
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('総人口')).toBeInTheDocument();

    // Assert: モック化したrechartsの各コンポーネントが表示されていることを確認
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
    expect(screen.getByTestId('line')).toBeInTheDocument(); // viewSeriesに'東京都'があるのでLineは1つ
    expect(screen.getByTestId('x-axis')).toBeInTheDocument();
  });
});
