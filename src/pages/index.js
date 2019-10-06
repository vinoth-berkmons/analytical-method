// Copyright 2019 Vinoth Berkmons. All rights reserved.
// Use of this source code is governed by a closed
// license that can be found in the LICENSE file.

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from 'components/header';
import Home from 'pages/home';
import AnalyticalForm from 'pages/analytical-form';

/*
 * This file contains the defnitions of a page.
 * Components like routing, header will be set here
 */

function Pages() {
    return (
        <Router>
            {/* Router for the application */}

            {/* Header for the application */}
            <Header />

            <Switch>
                <Route path="/home">
                    <Home />
                </Route>
                <Route path="/analytical-form/:id" component={AnalyticalForm}></Route>
                <Route path="/analytical-form" component={AnalyticalForm}>
                </Route>
                {/* Default is the home page */}
                <Route path="/" component={Home} />
            </Switch>
        </Router>
    );
}

export default Pages;