// Copyright 2019 Vinoth Berkmons. All rights reserved.
// Use of this source code is governed by a closed
// license that can be found in the LICENSE file.

import React, { Fragment, useState } from 'react';
import clsx from 'clsx';

/* Materil UI */
import { FormControl } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

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
 * Api component has the form parameter for the api residue method
 */
function Api(props) {

  const classes = formStyle();

  const passedState = props.passedState;

  const [state, setState] = useState(passedState ? passedState : {
    lod: '',
    loq: '',
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
      <div className={classes.fragment}>
        <FormControl>
          <TextField
            required
            label="LOD(in ppm)"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            type="number"
            value={state.lod}
            inputProps={{
              name: 'lod',
              id: 'lod',
            }}
            onChange={handleChange('lod')}
          />
        </FormControl>
        <FormControl>
          <TextField
            required
            label="LOQ(in ppm)"
            className={clsx(classes.textField, classes.dense)}
            type="number"
            margin="dense"
            variant="outlined"
            value={state.loq}
            inputProps={{
              name: 'loq',
              id: 'loq',
            }}
            onChange={handleChange('loq')}
          />
        </FormControl>
      </div>

      <FormControl className={clsx(classes.formControl, classes.actionField)}>
        <Swab onChange={handleChange('swab')} passedState={state.swab}/>
        <Rinse onChange={handleChange('rinse')} passedState={state.rinse}/>
      </FormControl>
    </Fragment>
  )

}

export default Api;