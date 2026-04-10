import { useState } from 'react'
import { UserSearchList } from './challenge-1/UserSearchList'
import { OrderDashboard } from './challenge-2/OrderDashboard'

type Tab = 'challenge-1' | 'challenge-2'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('challenge-1')

  return (
    <div className="app">
      <nav className="tab-nav">
        <button
          className={activeTab === 'challenge-1' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('challenge-1')}
        >
          Challenge 1: User Search
        </button>
        <button
          className={activeTab === 'challenge-2' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('challenge-2')}
        >
          Challenge 2: Order Dashboard
        </button>
      </nav>
      <main className="content">
        {activeTab === 'challenge-1' ? <UserSearchList /> : <OrderDashboard />}
      </main>
    </div>
  )
}

export default App
