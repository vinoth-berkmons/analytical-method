// Copyright 2019 Vinoth Berkmons. All rights reserved.
// Use of this source code is governed by a closed
// license that can be found in the LICENSE file.

/*
 * This file contains the services required by the analytical forms
 * It includes create/update/list
 */

/**
 * GetAll will return the list of all the analytical methods
 */
export function GetAll() {
    var list = window.localStorage.getItem('list');
    if (!list) {
        list = `[]`;
    }
    return JSON.parse(list)
}

/**
 * Save will save an analytical method
 */
export function Save(analyticalMethod) {
    const parsedList = GetAll();
    parsedList.push(analyticalMethod);
    window.localStorage.setItem('list', JSON.stringify(parsedList))
}

/**
 * Update will update an analytical method
 */
export function Update(analyticalMethod) {
    const parsedList = GetAll();
    for (let i = 0; i < parsedList.length; i++) {
        if (parsedList[i].id === analyticalMethod.id) {
            parsedList[i] = analyticalMethod;
        }
    }
    window.localStorage.setItem('list', JSON.stringify(parsedList))
}

/**
 * Get will return the analytical method for a given id
 */
export function Get(id) {
    const parsedList = GetAll();
    return parsedList.find(item => item.id === id)
}