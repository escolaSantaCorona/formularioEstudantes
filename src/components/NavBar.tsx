import { AppBar, Toolbar, Button, Box,makeStyles } from '@mui/material';
import React from 'react';
import Link from 'next/link';

function MyAppBar() {
  const toolbarStyles = {
    display: 'flex',
    justifyContent: 'space-between',
  };
  
  const linkStyles = {
    textDecoration: 'none',
    color: 'AppWorkspace',
    margin: '0 16px',
    fontWeight: "700",
    fontFamily:'Roboto',
  };
  return (
    <AppBar position="fixed"  style={{ top: 0, height: '64px', zIndex: 1,background: "#202932" }}>
    <Toolbar sx={toolbarStyles}>
      <Link style={linkStyles} href="/UpdateData">
        Atualizar dados dos alunos
      </Link>
      <Link style={linkStyles} href="/Registration">
        Cadastrar novos alunos
      </Link>
      <Link style={linkStyles} href="/Table">
        Lista de alunos
      </Link>
     
    </Toolbar>
  </AppBar>
  );
}

export default MyAppBar;
