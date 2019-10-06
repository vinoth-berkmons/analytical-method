// Copyright 2019 Vinoth Berkmons. All rights reserved.
// Use of this source code is governed by a closed
// license that can be found in the LICENSE file.

import { makeStyles } from '@material-ui/core/styles';

/*
 * This file contains the styles for the analytical form page
 */

export const formStyle = makeStyles({
    fragment: {
        display: 'flex',
        flexDirection: 'row',
    },
    formControl: {
        margin: '5px',
        width: '70%',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        fontSize: '12px;',
        textTransform: "lowercase",
        marginBottom: '15px'
    },
    actionField: {
        width: '70%',
    }
});