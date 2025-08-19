// jest.setup.ts

// ✅ Jest DOM のカスタムマッチャーを追加
// 例: expect(element).toBeInTheDocument()
import '@testing-library/jest-dom'

// ✅ user-event を使う場合の初期設定（必須ではないが推奨）
import userEvent from '@testing-library/user-event'

// ✅ TextEncoder / TextDecoder の Polyfill (Node.jsにはないので追加)
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder as any
global.TextDecoder = TextDecoder as any

// ✅ fetch のモック（必要に応じて）
if (!global.fetch) {
  global.fetch = jest.fn()
}

// ✅ userEvent をグローバルで使えるようにする（任意）
;(global as any).userEvent = userEvent

class MockResizeObserver {
  observe(): void {
    // do nothing
  }

  unobserve(): void {
    // do nothing
  }

  disconnect(): void {
    // do nothing
  }
}

(global as any).ResizeObserver = MockResizeObserver;
