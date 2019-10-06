// Copyright 2019 Vinoth Berkmons. All rights reserved.
// Use of this source code is governed by a closed
// license that can be found in the LICENSE file.

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'

/* React UI Material */
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { GetAll } from 'services/analytical';
import { Paper } from '@material-ui/core';

/*
 * This file contains the home page defintions
 */


/**
 * AddButton redirects to the form add page on click
 */
const AddButton = withRouter(({ history }) => (
  <Button variant="contained" color="primary"
    type='button'
    onClick={() => { history.push('/analytical-form') }}
  >ADD</Button>
))

const EditButton = withRouter(({ history, id }) => (
  <EditIcon onClick={() => { history.push(`/analytical-form/${id}`) }} />
))

/**
 * Home Page contains the add analytical form button and list of existing methods
 */
function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(GetAll());
  }, []);

  return (
    <Container fixed>
      <Grid container spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}>

        {/* center aligned items with add button */}
        <Grid item xs={12}>
          <AddButton />
          <Paper>
            {data.length > 0 ?
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell>Analytical Id</TableCell>
                    <TableCell align="right">Residue Type</TableCell>
                    <TableCell align="right">Reason</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map(row => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.residueType}</TableCell>
                      <TableCell align="right">{row.reason}</TableCell>
                      <TableCell align="right" >

                        <EditButton id={row.id} />
                      </TableCell>
                    </TableRow>
                  )
                  )}

                </TableBody>
              </Table> : <h2>No Data Available.</h2>}

          </Paper>
        </Grid>

      </Grid>


    </Container>
  )
}

export default Home;