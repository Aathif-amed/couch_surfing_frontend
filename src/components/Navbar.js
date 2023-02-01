import { AppBar, Container, Toolbar } from '@mui/material'
import React from 'react'

function Navbar() {
  return (
    <AppBar maxWidth='lg'>
        <Container>
            <Toolbar disableGutters></Toolbar>
        </Container>
    </AppBar>
    )
}

export default Navbar