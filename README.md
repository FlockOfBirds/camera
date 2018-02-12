[![Build Status](https://travis-ci.org/FlockOfBirds/camera.svg?branch=feature%2Finitial)](https://travis-ci.org/FlockOfBirds/camera "Travis build status")
[![codecov](https://codecov.io/gh/flockofbirds/camera/graph/badge.svg?/branch=feature%2Finitial)](https://codecov.io/gh/flockofbirds/camera "Percentage of code coverage")
![badge](https://img.shields.io/badge/mendix-7.11.0-green.svg)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/FlockOfBirds/camera.svg)](http://isitmaintained.com/project/FlockOfBirds/camera "Percentage of issues still open")

# Camera
Allows users to take and save pictures on their mendix applications

## Features
* Supports webp, jpeg and png image file formats
* Set capturing window dimensions
* Take pictures and store them
* Detect presence of multi camera devices
* Swap between the different camera devices

## Dependencies
Mendix 7.11

## Demo project
https://cameratest100.mxapps.io/

## Usage
The widget requires a context and should be configured as shown below
 ### Appearance
 ![Appearance](assets/appearance.PNG)
  #### Width unit
    The unit to be applied to the width of the capturing window.
 #### Width
    The value of the width property of the capturing window.
 #### Height unit
    The unit to be applied to the height of the capturing window.
 #### Height
    The value of the height property of the capturing window.
 #### Image Filter
    The filter type to applied to the capturing window of the web cam.
### Behaviour
 ![Behaviour](assets/behaviour.PNG)
 #### Select Entity type
    An entity that inherits/generalized from system.images is selected.
 #### File type
    The file format of image/photo that is taken and stored.
### Buttons
 ![Buttons](assets/buttons.PNG)
 #### Capture button
    This caption acts as the take picture button. This button should not have an action.
 #### Recapture button
    This caption acts as the retake picture button. This button is hidden in capture mode.
 #### Save button
    This caption acts as the save/submit button. This button is hidden in capture mode.
 #### Capture icon
    The name of the Glyphicon for the take picture button. Append the only last name of the glyphicon like "camera".
 #### Use picture icon
    The name of the Glyphicon for the save/submit picture button. Append the only last name of the glyphicon like "download".
 #### Switch camera icon
    The name of the Glyphicon for the switch camera button. Append the only last name of the glyphicon like "refresh.
 #### Caption
    The type of labels for the buttons.

## Issues, suggestions and feature requests
Please report issues at https://github.com/FlockOfBirds/camera/issues

## Development and contribution
Please follow [development guide](/development.md)
