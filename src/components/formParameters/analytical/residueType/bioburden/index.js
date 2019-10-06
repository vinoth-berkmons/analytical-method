// Copyright 2019 Vinoth Berkmons. All rights reserved.
// Use of this source code is governed by a closed
// license that can be found in the LICENSE file.

import React, { Fragment, useState } from 'react';

/* Materil UI */
import { FormControl } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { formStyle } from './style'
import Swab from './swab';
import Rinse from './rinse';

/*
 * This file conatins the definitions of the api form parameter component
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
 * BioBurden has the form parameter for the bio burden residual type
 */
function BioBurden(props) {

  const classes = formStyle();

  const passedState = props.passedState;

  const [state, setState] = useState(passedState ? passedState : {
    method: '',
    limits: 'true',
    tntc: '',
    tftc: '',
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

  return (
    <Fragment>
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
      <FormControl className={classes.formControl}>
        <label>* Define TNTC and TFTC Limits?</label>
        <RadioGroup className={classes.fragment} aria-label="limits"
          name="limits"
          id="limits"
          value={state.limits}
          onChange={handleChange('limits')}>
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
      <div className={classes.fragment}>
        <FormControl className={classes.formControl}>
          <TextField
            required
            label="TNTC Limit (in CFU)"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            value={state.tntc}
            inputProps={{
              name: 'tntc',
              id: 'tntc',
            }}
            type="number"
            onChange={handleChange('tntc')}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            required
            label="TFTC Limit (in CFU)"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            value={state.tftc}
            inputProps={{
              name: 'tftc',
              id: 'tftc',
            }}
            type="number"
            onChange={handleChange('tftc')}
          />
        </FormControl>
      </div>

      <FormControl className={clsx(classes.formControl, classes.actionField)}>
        <Swab onChange={handleChange('swab')} passedState={state.swab} />
        <Rinse onChange={handleChange('rinse')} passedState={state.rinse} />
      </FormControl>
    </Fragment>
  )

}

export default BioBurden;