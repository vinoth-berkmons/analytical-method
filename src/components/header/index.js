// Copyright 2019 Vinoth Berkmons. All rights reserved.
// Use of this source code is governed by a closed
// license that can be found in the LICENSE file.

import React from 'react';
import { Link } from "react-router-dom";

/* React UI Material */
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { headerStyle } from './style';

/* 
 * This file contains the header for the application
 */

function Header() {
    const classes = headerStyle();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    <Link to="/" className={classes.title}>LEUCINE Tech</Link>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;