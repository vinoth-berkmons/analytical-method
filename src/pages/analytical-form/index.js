// Copyright 2019 Vinoth Berkmons. All rights reserved.
// Use of this source code is governed by a closed
// license that can be found in the LICENSE file.

import React, { useState, useEffect, useRef } from 'react'
import clsx from 'clsx';
import { withRouter } from 'react-router-dom'

/* Materil UI */
import { FormControl } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import Api from 'components/formParameters/analytical/residueType/api';
import { Save, Get, Update } from 'services/analytical';

import { formStyle } from './style'
import { ResidueTypes } from './constants';
import BioBurden from 'components/formParameters/analytical/residueType/bioburden';



/*
 * This file contains the defnition of the analytical form page
 */


/**
 * AddButton on clicksaves the analytical form information and navigates to the home page
 */
const AddButton = withRouter(({ history, state, id, setState }) => (
  <Button color="primary" size="small" variant="outlined"
    onClick={() => {
      if (id) {
        Update(state);
      } else {
        if (!state.id) {
          state.error = 'ID Cannot be empty';
          setState(state)
          return;
        }
        else if (Get(state.id)) {
          return;
        }
        state.error = null;
        Save(state);
      }
      history.push('/');
    }}>{
      id ? 'Update' : 'Save'}</Button>
))

/**
 * CancelButton on click navigates back to the home page
 */
const CancelButton = withRouter(({ history }) => (
  <Button size="small" variant="outlined"
    onClick={() => {
      history.push('/');
    }}>Cancel</Button>
))

/**
 * AnalyticalForm has the form for adding/editing an analytical method
 */
function AnalyticalForm(props) {
  const { id } = props.match.params;

  const defaultState = {
    id: '',
    residueType: '',
    reason: '',
  };

  const [state, setState] = useState(defaultState);

  useEffect(() => {
    setState(id ? Get(id) : state)
  }, []);

  const classes = formStyle();

  const handleChange = name => event => {
    const newState = {
      ...state,
      [name]: event.target.value,
    }
    if (!newState.id || (newState.id && newState.id.length === 0)) {
      newState.error = 'Must provide an ID'
    }
    setState(newState);
  };

  const handleChangeID = event => {
    const newId = event.target.value;
    const newState = {
      ...state,
      id: newId,
      error: Get(newId) ? 'ID Already Taken' : null,
    }
    setState(newState);
  }

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <FormControl className={classes.formControl}>
          <TextField
            required
            label={state.error ? state.error : 'Analytical Method Id'}
            className={clsx(classes.textField, classes.dense)}
            onChange={handleChangeID}
            margin="dense"
            disabled={id ? true : false}
            error={state.error ? true : false}
            variant="outlined"
            value={state.id}
            inputProps={{
              name: 'id',
              id: 'analytical-method-id',
            }}
          />
        </FormControl>


        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} htmlFor="residue-type"> Target Residue Type</InputLabel>
          <Select
            native
            required
            onChange={handleChange('residueType')}
            labelWidth={labelWidth}
            value={state.residueType}
            inputProps={{
              name: 'residueType',
              id: 'analytical-residue-type',
            }}
          >
            <option value="" />
            <option value={ResidueTypes.API}>API</option>
            <option value={ResidueTypes.CLEANINGAGENT}>Cleaning Agent</option>
            <option value={ResidueTypes.BIOBURDEN}>Bioburden</option>
            <option value={ResidueTypes.ENDOTOXIN}>Endotoxin</option>
          </Select>
        </FormControl>
        {state.residueType === ResidueTypes.API && (
          <Api onChange={handleChange(ResidueTypes.API)} passedState={state[ResidueTypes.API]} />
        )}
        {state.residueType === ResidueTypes.CLEANINGAGENT && (
          <Api onChange={handleChange(ResidueTypes.CLEANINGAGENT)} passedState={state[ResidueTypes.CLEANINGAGENT]} />
        )}
        {state.residueType === ResidueTypes.BIOBURDEN && (
          <BioBurden onChange={handleChange(ResidueTypes.BIOBURDEN)} passedState={state[ResidueTypes.BIOBURDEN]} />
        )}
        {state.residueType === ResidueTypes.ENDOTOXIN && (
          <BioBurden onChange={handleChange(ResidueTypes.ENDOTOXIN)} passedState={state[ResidueTypes.ENDOTOXIN]} />
        )}
        <FormControl className={classes.formControl}>
          <TextField
            label="Reason"
            required
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            onChange={handleChange('reason')}
            value={state.reason}
            inputProps={{
              name: 'reason',
              id: 'analytical-reason',
            }}
          />
        </FormControl>

      </CardContent>
      <CardActions className={classes.footer}>
        <CancelButton />
        <AddButton state={state} id={id} setState={setState} />
      </CardActions>
    </Card>
  )
}

export default AnalyticalForm;