// Copyright 2019 Vinoth Berkmons. All rights reserved.
// Use of this source code is governed by a closed
// license that can be found in the LICENSE file.

import React, { Fragment, useState } from 'react';
import clsx from 'clsx';

/* Materil UI */
import { FormControl } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/DeleteRounded';

import Moc from 'components/formParameters/analytical/moc';

import { formStyle } from './style';

/*
 * This file conatins the definitions of the api rinse form parameter component
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
 * Rinse is the form parameter for the api
 */
function Rinse(props) {

  const classes = formStyle();

  const passedState = props.passedState;

  const [state, setState] = useState(passedState ? passedState : {
    enabled: false,
    method: '',
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
          }}>Configure Rinse Sampling Parameters</Button>
      )}
      {state.enabled &&
        (<Fragment>
          <Button variant="outlined" startIcon={<DeleteIcon />} color="secondary" className={classes.mainButton}
            onClick={() => {
              enableFn({ target: { value: !state.enabled } })
            }}>Remove Rinse Sampling Parameters</Button>
          <Paper className={classes.root}>
            <FormControl className={classes.formControl}>
              <TextField
                required
                label="Method Used"
                className={clsx(classes.textField, classes.dense)}
                margin="dense"
                value={state.method}
                variant="outlined"
                inputProps={{
                  name: 'method',
                  id: 'method',
                }}
                onChange={handleChange('method')}
              />
            </FormControl>

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

export default Rinse;