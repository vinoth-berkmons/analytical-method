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
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/core/Icon';
import { MocTypes } from './constants';

import { formStyle } from './style'

/*
 * This file contains the Moc component defnitions
 */

const onChangeFn = (props) => {
  const { onChange } = props;
  return (state) => {
    if (onChange) {
      onChange({ target: { value: state } })
    }
  }
}

function Moc(props) {

  const classes = formStyle();

  const passedState = props.passedState;

  const [state, setState] = useState(passedState ? passedState : {
    enabled: false,
    labelWidth: 100,
    items: [],
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

  const handleChangeIndex = (name, index) => event => {
    const items = state.items;
    items[index][name] = event.target.value;
    const newState = {
      ...state,
      items,
    }
    setState(newState);
    onChange(newState);
  }

  const enableFn = (enable) => {
    const newState = {
      ...state,
      enabled: enable,
      items: enable ? [{ moc: '', recovery: '', id: new Date() }] : []
    }
    setState(newState);
    onChange(newState);
  }
  const setItems = handleChange('items');

  const labelWidth = state.labelWidth;

  return (
    <Fragment>
      {!state.enabled && (
        <Button variant="outlined" startIcon={<AddIcon />} color="primary" className={classes.mainButton}
          onClick={() => {
            enableFn(true)
          }}>Add MOC</Button>
      )}
      {state.enabled && (
        <Paper className={classes.root}>
          {state.items.map((item, index) => (
            <div className={classes.fragment} key={item.id}>
              <FormControl variant="outlined" className={clsx(classes.formControl, classes.select)}>
                <InputLabel htmlFor="moc"> *Select MOC</InputLabel>
                <Select
                  native
                  required
                  className={classes.selectInput}
                  labelWidth={labelWidth}
                  value={state.items[index].moc}
                  inputProps={{
                    name: 'moc',
                    id: 'moc',
                  }}
                  onChange={handleChangeIndex('moc', index)}
                >
                  <option value="" />
                  <option value={MocTypes.STAINLESSSTELL}>Stainless Steel</option>
                  <option value={MocTypes.GLASS}>Glass</option>
                  <option value={MocTypes.TEFLON}>Teflon</option>
                  <option value={MocTypes.PLASTIC}>Plastic</option>
                </Select>

              </FormControl>
              <FormControl className={clsx(classes.formControl, classes.recovery)}>
                <TextField
                  required
                  label="Recovery"
                  className={clsx(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                  value={state.items[index].recovery}
                  type="number"
                  inputProps={{
                    name: 'recovery',
                    id: 'recovery',
                  }}
                  onChange={handleChangeIndex('recovery', index)}
                />
              </FormControl>
              <IconButton color="secondary" className={classes.button} aria-label="delete" onClick={() => {
                const items = state.items;
                items.splice(index, 1);
                if (items.length === 0) {
                  enableFn(false);
                } else {
                  setItems({ target: { value: items } });
                }
              }}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <FormControl className={classes.formControl}>
            <Button color="primary" className={classes.button} onClick={() => {
              const items = state.items;
              items.push({ moc: '', recovery: '', id: new Date() });
              setItems({ target: { value: items } });
            }}>Add another or Create a new MOC</Button>
          </FormControl>

        </Paper>
      )}
    </Fragment>
  )
}

export default Moc;