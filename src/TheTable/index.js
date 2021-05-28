import { useCallback, useEffect, useState } from 'react'
import './index.css'

const windowSize = 20

export default function Table ({data}) {
  const [state, setState] = useState({
    visualScrollPos: 0,
    windowStart: 0,
    windowEnd: 0,
    drag: false,
  })

  const onMouseWheel = useCallback((ev) => {
    const delta = ev.deltaY > 0 ? 1 : -1

    if (state.windowStart <= 0 && delta < 0) {
      // top reached
      return
    }

    if (state.windowStart + windowSize >= data.length && delta > 0) {
      // bottom reached
      return
    }

    state.windowStart += delta

    const
      startingPos = state.windowStart,
      endingPos = state.windowStart + windowSize

    setState({
      ...state,
      visualScrollPos: state.windowStart / (data.length - windowSize),
      windowStart: startingPos,
      windowEnd: endingPos,
    })
  }, [data.length, state])

  const onKnobMouseDown = useCallback((ev) => {
    setState({...state, drag: true})
  }, [state])

  const onScrollMouseUp = useCallback((ev) => {
    setState({...state, drag: false})
  }, [state])

  const onScrollMouseMove = useCallback((ev) => {
    if (state.drag) {
      const dragPos = (data.length - windowSize) * ev.clientY / 400

      if (dragPos < 0 || dragPos > data.length) {
        return
      }

      setState({
        ...state,
        visualScrollPos: dragPos / (data.length - windowSize),
        windowStart: dragPos,
        windowEnd: dragPos + windowSize,
      })
    }
  }, [data.length, state])

  useEffect(() => {
    // re-init state when props change
    setState({
      drag: false,
      visualScrollPos: 0,
      windowStart: 0,
      windowEnd: data.length > windowSize ? windowSize : data.length,
    })
  }, [data.length])

  return (
    <div className="the-table">
      <table onWheel={onMouseWheel}>
        <thead>
        <tr>
          <td>Column 1</td>
          <td>Column 2</td>
        </tr>
        </thead>
        <tbody>
        {
          (data || []).slice(state.windowStart, state.windowEnd).map((el, i) =>
            <tr key={i}>
              <td>{el[0]}</td>
              <td>{el[1]}</td>
            </tr>
          )
        }
        </tbody>
      </table>
      <div className="the-table__scroll"
         onMouseUp={onScrollMouseUp}
         onMouseMove={onScrollMouseMove}
      >
        <div
          className="the-table__scroll-knob"
          onMouseDown={onKnobMouseDown}

          style={{transform: `translateY(${385 * state.visualScrollPos}px)`}}
        />
      </div>
    </div>
  )
}
