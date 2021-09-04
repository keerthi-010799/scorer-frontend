import React, { useState, useEffect } from 'react'
import Loader from './Loader'

const DelayedFallback = () => {
  const [show, setShow] = useState(true)
  useEffect(() => {
    let timeout = setTimeout(() => setShow(false), 1000)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      {show && <Loader status={show} />}
    </>
  )
}
export default DelayedFallback