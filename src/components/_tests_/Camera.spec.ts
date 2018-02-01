import { mount, shallow } from "enzyme";
import { createElement } from "react";

import { CameraButton } from "../CameraButton";
import { Camera, CameraProps } from "../Camera";
import { Image } from "../Image";
import { WebCam } from "../WebCam";

describe("Camera", () => {
    const shallowRenderCamera = (props: CameraProps) => shallow(createElement(Camera, props));
    const fullRenderCamera = (props: CameraProps) => mount(createElement(Camera, props));
    const defaultProps: CameraProps = {
        captureButton: "Take Photo",
        captureIcon: "camera",
        caption: "icons",
        fileType: "jpeg",
        filter: "none" || undefined,
        width: 60,
        widthUnit: "pixels",
        onClickAction: jasmine.any(Function),
        recaptureButton: "Retake photo",
        ref:  jasmine.any(Function),
        style: {},
        switchCameraIcon: "refresh",
        savePictureIcon: "download",
        savePictureButton: "Save",
        height: 45,
        heightUnit: "pixels"
    };
    const createCamera = shallowRenderCamera(defaultProps);
    const camerabuttons = createCamera.find({ spanClass: "widget-camera-picture" });

    it("should render the structure correctly", () => {
        const camera = shallowRenderCamera(defaultProps);
        camera.setProps({ filter: "none" });
        expect(camera).toBeElement(
            createElement("div", { className: "widget-camera-wrapper", style: { filter: undefined, width: "60px" , height: "45px" } },
                createElement(WebCam, {
                    ref: jasmine.any(Function),
                    fileType: "jpeg",
                    width: 60,
                    height: 45,
                    filter: "none",
                    style: { filter: undefined, width: "60px" , height: "45px" }
                }),
                createElement("div", {},
                    createElement(CameraButton, {
                        spanClass: "widget-camera-picture",
                        glyphIcon: "camera",
                        onClickAction: jasmine.any(Function) ,
                        buttonLabel: "Take Photo",
                        caption: "icons"
                    })
                )
            ));
    });

    it("should render an alert when browser does not support the widget", () => {
        const createAlert = shallowRenderCamera(defaultProps);
        const alertInstance = createAlert.instance() as any;
        const renderAlertSpy = spyOn(alertInstance, "renderAlert").and.callThrough();

        createAlert.setState({ browserSupport: false });
        expect(renderAlertSpy).toHaveBeenCalled();
    });

    describe("when 'take picture' or camera icon is clicked", () => {
        it("should render the picture", () => {
            const createPicture = shallowRenderCamera(defaultProps);
            createPicture.setProps({ heightUnit: "percentageOfWidth" , widthUnit: "percentage" });
            createPicture.setState({ browserSupport: true, pictureTaken: true, screenshot: "base64image string" });
            createElement("div", { className: "widget-camera-wrapper", style: { filter: undefined, width: "60px" } },
                createElement(Image, {
                    src: "base64image string",
                    style: { filter: undefined, width: "60px" }
                }),
                createElement("div", {},
                    createElement(CameraButton, {
                        spanClass: "widget-camera-picture",
                        glyphIcon: "camera",
                        onClickAction: jasmine.any(Function),
                        buttonLabel: "Take Photo",
                        caption: "icons"
                    }),
                    createElement(CameraButton, {
                        spanClass: "widget-camera-switch-button",
                        glyphIcon: "download",
                        onClickAction: jasmine.any(Function),
                        buttonLabel: "Save Photo",
                        caption: "icons"
                    })
                )
            );
        });

        it("should call take picture method", () => {
            const camera = fullRenderCamera(defaultProps);
            const cameraInstance = camera.instance() as any;
            const takePicture = spyOn(cameraInstance, "takePicture").and.callThrough();

            camera.setProps({ caption: "buttons" , width: 70, height: 50 });
            camera.setState({ browserSupport: true, pictureTaken: false, screenshot: "" });
            camera.find(".widget-camera-picture").simulate("click");

            expect(takePicture).toHaveBeenCalledTimes(1);
        });
    });

    describe("with multiple media devices", () => {
        it("should render with 'switch icon'", () => {
            createCamera.setProps({ filter: "none", caption: "icons" });
            createCamera.setState({ availableDevices: [ "deviceOne", "deviceTwo" ] });

            expect(createCamera.find({ spanClass: "widget-camera-switch-button" }).prop("glyphIcon")).toBe(defaultProps.switchCameraIcon);
        });

        it("should render with 'switch button'", () => {
            createCamera.setProps({ filter: "none", caption: "buttons" });
            createCamera.setState({ availableDevices: [ "deviceOne", "deviceTwo" ] });

            expect(createCamera.find({ spanClass: "widget-camera-switch-button" }).prop("buttonLabel")).toBe("Switch");
        });

        it("should switch/swap camera when switch camera button is clicked", () => {
            const camera = fullRenderCamera(defaultProps);
            const cameraInstance = camera.instance() as any;
            const changeCamera = spyOn(cameraInstance, "changeCamera").and.callThrough();

            camera.setProps({ filter: "none", width: 70, height: 50 });
            camera.setState({ availableDevices: [ "deviceOne", "deviceTwo" ] , browserSupport: true, pictureTaken: false, screenshot: "" });
            camera.find(".widget-camera-switch-button").simulate("click");

            expect(changeCamera).toHaveBeenCalled();
        });
    });

    describe("with icons configuration", () => {
        it("should render with the correct 'capture icon'", () => {
            createCamera.setProps({ caption: "icons" });
            expect(camerabuttons.prop("glyphIcon")).toBe(defaultProps.captureIcon);
        });

        it("should render with the correct 'retake icon'", () => {
            createCamera.setProps({ caption: "icons" });
            createCamera.setState({ pictureTaken: true, screenshot: "base64image string" });
            expect(camerabuttons.prop("glyphIcon")).toBe(defaultProps.captureIcon);
        });

        it("should render with the correct 'save icon'", () => {
            createCamera.setProps({ caption: "icons" });
            createCamera.setState({ pictureTaken: true, screenshot: "base64image string" });
            expect(createCamera.find({ spanClass: "widget-camera-switch-button" }).prop("glyphIcon")).toBe(defaultProps.savePictureIcon);
        });
    });

    describe("with buttons configuration", () => {
        it("should render with 'capture button'", () => {
            createCamera.setProps({ caption: "buttons" });
            expect(camerabuttons.prop("buttonLabel")).toBe(defaultProps.captureButton);
        });

        it("should render with 'retake button'", () => {
            createCamera.setProps({ caption: "buttons" });
            createCamera.setState({ pictureTaken: true, screenshot: "base64image string" });
            expect(createCamera.find({ spanClass: "widget-camera-picture" }).prop("buttonLabel")).toBe(defaultProps.recaptureButton);
        });

        it("should render with 'save button'", () => {
            createCamera.setProps({ caption: "buttons" });
            createCamera.setState({ pictureTaken: true, screenshot: "base64image string" });
            expect(createCamera.find({ spanClass: "widget-camera-switch-button" }).prop("buttonLabel")).toBe(defaultProps.savePictureButton);
        });
    });

    it("should render webcam when retake button is clicked", () => {
        const createfullCamera = fullRenderCamera(defaultProps);
        const cameraInstance = createfullCamera.instance() as any;
        const retakePicture = spyOn(cameraInstance, "retakePicture").and.callThrough();

        createfullCamera.setProps({ caption: "buttons" });
        createfullCamera.setState({ pictureTaken: true, screenshot: "base64image string" });
        createfullCamera.find(".widget-camera-picture").simulate("click");

        expect(retakePicture).toHaveBeenCalledTimes(1);
    });
});
