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
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
 * Swap is the form parameter for the bioBurden
 */
function Swab(props) {

  const classes = formStyle();

  const passedState = props.passedState;

  const [state, setState] = useState(passedState ? passedState : {
    enabled: false,
    percentage: '',
    recovery: 'true',
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
      <Paper className={classes.root}>
        {!state.enabled && (
          <Button variant="outlined" startIcon={<AddIcon />} color="primary" className={classes.mainButton}
            onClick={() => {
              enableFn({ target: { value: !(state.enabled) } })
            }}>Configure Swab Sampling Parameters</Button>
        )}
        {state.enabled &&
          (<Fragment>
            <Button variant="outlined" startIcon={<DeleteIcon />} color="secondary" className={classes.mainButton}
              onClick={() => {
                enableFn({ target: { value: !state.enabled } })
              }}>Remove Swab Sampling Parameters</Button>
            <div className={classes.fragment}>
              <FormControl className={classes.formControl}>
                <label>* Use Recovery for Swab?</label>
                <RadioGroup className={clsx(classes.fragment, classes.row)} aria-label="limits"
                  name="recovery"
                  id="recovery"
                  value={state.recovery}
                  onChange={handleChange('recovery')}>
                  <FormControlLabel
                    value="true"
                    control={<Radio color="primary" />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio color="primary" />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  required
                  label="Recovery (%)"
                  className={clsx(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                  value={state.percentage}
                  type="number"
                  inputProps={{
                    name: 'percentage',
                    id: 'percentage',
                  }}
                  onChange={handleChange('percentage')}
                />
              </FormControl>
            </div>

            <Moc onChange={handleChange('mocs')} passedState={state.mocs} />
          </Fragment>
          )}
      </Paper>
    </Fragment>
  )
}

export default Swab;