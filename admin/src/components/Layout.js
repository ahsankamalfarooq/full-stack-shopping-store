// import styled from '@emotion/styled'
import React from 'react'
import { Outlet } from 'react-router-dom/dist'
import Sidebar from './sidebar/Sidebar'
import Topbar from './topbar/Topbar'
import styled from 'styled-components'

const Container = styled.div`
  /* .container */
  /* { */
    display: flex;
    margin-top: 10px;
/* }

.link{
    text-decoration: none;
    color: inherit;
} */
 `

const Layout = () => {
  return (
    <>
      <Topbar/>
        {/* <div className='container'>
        <Sidebar/>
      </div> */}
        <Container>
            <Sidebar/>
        <Outlet/>
        </Container>
    </>
  )
}

export default Layout
