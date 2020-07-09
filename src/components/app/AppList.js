import React from 'react';

import {
  Container, Fade, Paper, Table, TableHead, TableRow, TableCell, makeStyles, Toolbar, Tooltip, IconButton, TablePagination
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
export default ({ header, history, children, data }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
    space: {
      flexGrow: 1,
    },
  }));
  const classes = useStyles();

  function handleChangePage() {

  }
  function handleChangeRowsPerPage() {

  }


  return (
    <Fade in={true}>
      <Container maxWidth="lg">
        <Paper className={classes.root}>
          <Toolbar>
            <div className={classes.space}></div>
            {children[0]}
            <div>
              <Tooltip title="Filtrar">
                <IconButton aria-label="filtrar">
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {header.map(item => (
                  <TableCell key={item} align="center">{item}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            {children[1]}
          </Table>
          <TablePagination
            // rowsPerPageOptions={[5, 10, 25]}
            rowsPerPageOptions={[]}
            component="div"
            count={5}
            rowsPerPage={10}
            page={0}
            labelDisplayedRows={({ from, to, count }) => `${from} - ${to} de ${count}`}
            // labelRowsPerPage="Linhas por página"
            backIconButtonProps={{
              'aria-label': 'previous page',
            }}
            nextIconButtonProps={{
              'aria-label': 'next page',
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </Fade>
  );
}
