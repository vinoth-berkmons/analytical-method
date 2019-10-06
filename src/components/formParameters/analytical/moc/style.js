// Copyright 2019 Vinoth Berkmons. All rights reserved.
// Use of this source code is governed by a closed
// license that can be found in the LICENSE file.

import { makeStyles } from '@material-ui/core/styles';

/*
 * This file contains the styles for the analytical form page
 */

export const formStyle = makeStyles({
    formControl: {
    },
    root: {
        backgroundColor: '#F0F0F0',
        padding: '10px 0',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    fragment: {
        display: 'flex',
        margin: '10px',
        width: 'calc(100% - 20px)',
    },
    mainButton: {
        fontSize: '12px;',
        textTransform: "lowercase",
        marginBottom: '15px',
        margin: '10px',
        width: 'calc(100% - 20px)',
    },
    select: {
        width: '49%',
    },
    recovery: {
        width: '39%',
    },
    button: {
        fontSize: '12px;',
        textTransform: "lowercase",
        marginBottom: '15px'
    },
    textField: {
        margin: '10px',
        backgroundColor: 'white',
    },
    selectInput: {
        backgroundColor: 'white',
    }
});