import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // 次のパスをあなたのNext.jsアプリに指定して、テスト環境でnext.config.jsと.envファイルを読み込みます
  dir: './',
})

// Jestに渡されるカスタム設定を追加します
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // 各テストが実行される前に、さらに設定オプションを追加します
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  }
}

// createJestConfigは、非同期であるnext/jestがNext.jsの設定を読み込めるように、この方法でエクスポートされます
export default createJestConfig(config)
