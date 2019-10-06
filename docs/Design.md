# Analytical Method Assignment

The Problem statement can be found in [this](./Problem_Statement.pdf) document

## Scope
We are building a small react app where one can add/update the analytical methods using basic form.
Will be primarily focusing on the form component where analytical method can be created.
If time allows will perfect the home page to list the existing analytical methods and update it.

## Assumptions
* Local storage is enough for the task
* Though the actual project can be big, this task is considerably small and redux saga is not required.
* Services defnitions can be changed when real backend has to be used for the app.
* More focus is not required on the accuracy of the form contents as I lack the domain knowledge.

## Design
The app will be divided into separate pages
* Home Page
    * List existing analytical method [If time allows]
    * Update existing analytical method [If time allows]
    * Create an analytical method
* Analytical Method Form
    * Cancel - Go back to home
    * Update - Add/Update the analytical form and navigate to home
    * Form
        * Inputs for Method ID, Residue Type and Reason
        * Based on the Residue type will enable 2 components
            * API Input component
            * Bio Burden Input component