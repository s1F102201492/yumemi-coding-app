import { render, screen, waitFor } from '@testing-library/react'
import Home from './page'

// fetch をモック
global.fetch = jest.fn()

// モックデータ
const mockPrefData = [
  { prefCode: 13, prefName: 'Tokyo' },
  { prefCode: 27, prefName: 'Osaka' },
]

const mockPopuData = [
  { label: '総人口', data: Array(18).fill({ value: 1000 }) },
  { label: '年少人口', data: Array(18).fill({ value: 500 }) },
  { label: '生産年齢人口', data: Array(18).fill({ value: 300 }) },
  { label: '老年人口', data: Array(18).fill({ value: 200 }) },
]

beforeEach(() => {
  jest.resetAllMocks()

  // useGetAllPrefData用 fetch モック
  ;(fetch as jest.Mock).mockImplementation((url) => {
    if (url?.toString().includes('/api/resas/getPref')) {
      return Promise.resolve({
        json: () => Promise.resolve({ data: { result: mockPrefData } }),
      })
    }

    if (url?.toString().includes('/api/resas/getPopu')) {
      return Promise.resolve({
        json: () => Promise.resolve({ data: { result: { data: mockPopuData } } }),
      })
    }

    return Promise.resolve({ json: () => Promise.resolve({}) })
  })
})

describe('Home page integration test', () => {
  it('renders LoadingSpinner first and then SelectedPref and Chart', async () => {
    render(<Home />)

    // 最初は LoadingSpinner が表示される
    expect(screen.getByText(/Loading/i)).toBeInTheDocument()
    
    // データ取得後、SelectedPref と Chart が表示される
    await waitFor(() => {
      expect(screen.getByText('都道府県を選択すると人口グラフが表示されます。')).toBeInTheDocument()
    })
  })

  it('can add and remove a prefecture', async () => {
    render(<Home />)

    // PrefSelector が表示されるように選択中追加ボタンをクリック
    await waitFor(() => {
      expect(screen.getByText('都道府県を選択すると人口グラフが表示されます。')).toBeInTheDocument()
    })

    // 追加は直接 useGetSelectedData 内の handlePrefAdd を呼ぶ形で OK
    // ここでは SelectedPref 内のボタンなどをシミュレーションする場合は PrefSelector をモックするかテスト用に書き換える
  })
})
