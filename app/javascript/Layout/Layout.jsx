import React from 'react'
import './Layout.scss'

const Layout = ({ children }) => (
  <div className='Layout'>
    <header>
      <h1>Contact Book</h1>
    </header>
    <article>
      { children }
    </article>
  </div>
)

export default Layout
