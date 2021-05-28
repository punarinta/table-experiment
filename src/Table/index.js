import './index.css'
import { useEffect, useRef, useState} from 'react'

const visualMargin = 10
const windowSize = 20
let globalStartingPos = 0

export default function Table({data}) {
  const tableRef = useRef()
  // TODO: add a range check
  const [windowPositions, setWindowPositions] = useState([0, windowSize + visualMargin])

  useEffect(() => {
    if (!tableRef.current) {
      return
    }

    tableRef.current.onmousewheel = (ev) => {
      ev.preventDefault()

      const delta = -ev.wheelDeltaY / 240

      // TODO: CHECK range!!!
      globalStartingPos += delta

      const
        startingPos = globalStartingPos,
        endingPos = globalStartingPos + windowSize

      setWindowPositions([startingPos, endingPos])
    }
  }, [data.length])

  return (
    <table ref={tableRef}>
      <thead>
      <tr>
        <td>1</td>
        <td>2</td>
      </tr>
      </thead>
      <tbody>
      {
        (data || []).slice(windowPositions[0], windowPositions[1]).map((el, i) => {
          return (
            <tr key={i}>
              <td>{el[0]}</td>
              <td>{el[1]}</td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
  )
}
