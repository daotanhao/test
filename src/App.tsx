// import './App.css'
import DataSourceDetails from './components/DataSourceDetails'
import DataDisplay from './components/DataDisplay'

function App() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: window.innerWidth }}>
      <div style={{ display: 'flex', width: '50%' }}>
        <DataSourceDetails />
      </div>
      <div style={{ display: 'flex', width: '50%' }}>
        <DataDisplay />
      </div>
    </div>
  )
}

export default App
