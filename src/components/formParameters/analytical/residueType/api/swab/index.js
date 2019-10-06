// Copyright 2019 Vinoth Berkmons. All rights reserved.
// Use of this source code is governed by a closed
// license that can be found in the LICENSE file.

import React, { Fragment, useState } from 'react';
import clsx from 'clsx';

/* Materil UI */
import { FormControl } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/DeleteRounded';

import Moc from 'components/formParameters/analytical/moc';

import { formStyle } from './style';

/*
 * This file conatins the definitions of the api swab form parameter component
 */

const onChangeFn = (props) => {
  const { onChange } = props;
  return (state) => {
    if (onChange) {
      onChange({ target: { value: state } })
    }
  }
}

/**
 * Swap is the form parameter for the api
 */
function Swab(props) {

  const classes = formStyle();

  const passedState = props.passedState;

  const [state, setState] = useState(passedState ? passedState : {
    enabled: false,
    solvent: '',
    quantity: '',
    recovery: '',
  });

  const onChange = onChangeFn({ onChange: props.onChange })

  const handleChange = name => event => {
    const newState = {
      ...state,
      [name]: event.target.value
    }
    setState(newState);
    onChange(newState);
  };
  const enableFn = handleChange('enabled');
  return (
    <Fragment>
      {!state.enabled && (
        <Button variant="outlined" startIcon={<AddIcon />} color="primary" className={classes.mainButton}
          onClick={() => {
            enableFn({ target: { value: !(state.enabled) } })
          }}> Configure Swab Sampling Parameters</Button>
      )}
      {state.enabled &&
        (<Fragment>
          <Button variant="outlined" startIcon={<DeleteIcon />} color="secondary" className={classes.mainButton}
            onClick={() => {
              enableFn({ target: { value: !state.enabled } })
            }}>Remove Swab Sampling Parameters</Button>

          <Paper className={classes.root}>
            <FormControl className={classes.formControl}>
              <TextField
                required
                label="Method Used"
                className={clsx(classes.textField, classes.dense)}
                margin="dense"
                variant="outlined"
                value={state.method}
                inputProps={{
                  name: 'method',
                  id: 'method',
                }}
                onChange={handleChange('method')}
              />
            </FormControl>
            <div className={classes.fragment}>
              <FormControl>
                <TextField
                  required
                  label="Solvent Name"
                  className={clsx(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                  value={state.solvent}
                  inputProps={{
                    name: 'solvent',
                    id: 'solvent',
                  }}
                  onChange={handleChange('solvent')}
                />
              </FormControl>
              <FormControl>
                <TextField
                  required
                  label="Solvent Quantity"
                  className={clsx(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                  type="number"
                  value={state.quantity}
                  inputProps={{
                    name: 'quantity',
                    id: 'quantity',
                  }}
                  onChange={handleChange('quantity')}
                />
              </FormControl>
            </div>
            <FormControl className={classes.formControl}>
              <TextField
                required
                label="Default Recovery"
                className={clsx(classes.textField, classes.dense)}
                margin="dense"
                variant="outlined"
                value={state.recovery}
                inputProps={{
                  name: 'recovery',
                  id: 'recovery',
                }}
                onChange={handleChange('recovery')}
              />
            </FormControl>
            <Moc onChange={handleChange('mocs')} passedState={state.mocs} />
          </Paper>
        </Fragment>
        )}
    </Fragment>
  )
}

export default Swab;