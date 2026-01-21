import React from 'react'
import { Helmet } from 'react-helmet'

export default function NotFound() {
  return (
    <>
    <Helmet>
      <title>NotFound - ConnecSo</title>
    </Helmet>
    <div className='bg-white dark:bg-black'>
      <img className='m-auto' src="https://miro.medium.com/v2/resize:fit:1400/1*DeBkx8vjbumpCO-ZkPE9Cw.png" alt="" />
    </div>
    </>
  )
}
