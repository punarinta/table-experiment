import { useEffect, useState } from 'react'
import TheTable from './TheTable'
import './App.css'

const dummy = []

function createLongString () {
  return Math.random().toString().padEnd(22, '0')
}

function App() {
  const [dummyData, setDummyData] = useState([])

  useEffect(() => {
    for (let i = 0; i < 100; i++) {
      dummy.push([createLongString(), createLongString()])
    }

    setDummyData(dummy)
  }, [setDummyData])

  return (
    <div className="App">
      <TheTable data={dummyData} />
    </div>
  )
}

export default App
