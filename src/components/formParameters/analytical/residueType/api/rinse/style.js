// Copyright 2019 Vinoth Berkmons. All rights reserved.
// Use of this source code is governed by a closed
// license that can be found in the LICENSE file.

import { makeStyles } from '@material-ui/core/styles';

/*
 * This file contains the styles for the analytical form page
 */

export const formStyle = makeStyles({
    formControl: {
        width: '100%',
    },
    fragment: {
        display: 'flex',
    },
    mainButton: {
        fontSize: '12px;',
        textTransform: "lowercase",
        marginBottom: '15px',
        marginTop: '15px',
    },
    button: {
        fontSize: '12px;',
        textTransform: "lowercase",
        marginBottom: '15px'
    },
    textField: {
        margin: '10px',
    },
});