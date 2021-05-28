import './App.css'
import { useEffect, useState } from 'react'
import Table from './Table'

const dummy = []

function App() {
  const [dummyData, setDummyData] = useState([])

  useEffect(() => {
    for (let i = 0; i < 1000; i++) {
      dummy.push([Math.random(), Math.random()])
    }

    setDummyData(dummy)
  }, [setDummyData])

  return (
    <div className="App">
      <Table data={dummyData} />
    </div>
  )
}

export default App
