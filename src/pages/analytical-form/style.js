// Copyright 2019 Vinoth Berkmons. All rights reserved.
// Use of this source code is governed by a closed
// license that can be found in the LICENSE file.

import { makeStyles } from '@material-ui/core/styles';

/*
 * This file contains the styles for the analytical form page
 */

export const formStyle = makeStyles({
    card: {
        width: '70%',
        marginLeft: '20%',
        marginTop: '20px',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '10px',
    },
    formControl: {
        width: '70%',
        margin: '5px',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
    }
});