import { Outlet } from 'react-router'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
