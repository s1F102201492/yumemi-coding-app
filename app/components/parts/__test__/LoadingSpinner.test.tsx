import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoadingSpinner } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  // --- Test Case 1: ローディング中の場合 ---
  test('`loading`が`true`の場合、スピナーとメッセージが表示される', () => {
    // 1. コンポーネントをレンダリング
    render(<LoadingSpinner loading={true} />);

    // 2. メッセージが表示されていることを確認
    const messageElement = screen.getByText('データを読み込んでいます...');
    expect(messageElement).toBeInTheDocument();

    // 3. スピナーが表示されていることを確認
    const spinnerElement = screen.getByRole('status');
    expect(spinnerElement).toBeInTheDocument();
  });

  // --- Test Case 2: ローディングが完了した場合 ---
  test('`loading`が`false`の場合、スピナーが表示されない', () => {
    // 1. コンポーネントをレンダリング
    render(<LoadingSpinner loading={false} />);
    
    // 2. メッセージは現在の実装では表示されたままなので、そのことを確認
    const messageElement = screen.getByText('データを読み込んでいます...');
    expect(messageElement).toBeInTheDocument();

    // 3. スピナーが "表示されていない" ことを確認
    const spinnerElement = screen.queryByRole('status');
    expect(spinnerElement).not.toBeInTheDocument();
  });
});