import { mount, shallow } from "enzyme";
import { createElement } from "react";

import { Alert } from "../Alert";
import { CameraButton } from "../CameraButton";
import { Camera, CameraProps } from "../Camera";
import { Image } from "../Image";
import { WebCam } from "../WebCam";

describe("Camera", () => {
    const shallowRenderCamera = (props: CameraProps) => shallow(createElement(Camera, props));

    const defaultProps: CameraProps = {
        captureButton: "Take Photo",
        captureIcon: "camera",
        captionType: "icons",
        fileType: "jpeg",
        filter: "none" || undefined,
        width: 60,
        widthUnit: "pixels",
        onClickAction: jasmine.createSpy("onClick"),
        recaptureButton: "Retake photo",
        ref: jasmine.createSpy("setref"),
        style: {},
        switchCameraIcon: "refresh",
        savePictureIcon: "download",
        savePictureButton: "Save",
        height: 45,
        heightUnit: "pixels"
    };

    it("should render the structure correctly", () => {
        const camera = shallowRenderCamera(defaultProps);
        camera.setProps({ filter: "none" });
        expect(camera).toBeElement(
            createElement("div", { className: "widget-camera-wrapper", style: { filter: undefined, width: "60px" , height: "45px" } },
                createElement(WebCam, {
                    ref: jasmine.createSpy("setRef"),
                    fileType: "jpeg",
                    filter: "none",
                    style: { filter: undefined, width: "60px" , height: "45px" }
                }),
                createElement("div", {},
                    createElement(CameraButton, {
                        spanClass: "widget-camera-picture",
                        glyphIcon: "camera",
                        onClickAction: jasmine.createSpy("TakePicture"),
                        buttonLabel: "Take Photo",
                        caption: "icons"
                    })
                )
            ));
    });

    it("should render an alert when browser does not support the widget", () => {
        const createAlert = shallowRenderCamera(defaultProps);
        createAlert.setState({ browserSupport: false });
        expect(createAlert).toBeElement(
            createElement(Alert, {
                bootstrapStyle: "danger",
                className: "",
                message: "This browser does not support the camera widget. Google-chrome is recommended."
            }
            )
        );
    });

    describe("with take picture/camera button clicked", () => {
        it("should stop all media video devices", () => {
            const sshallowRenderCamera = (props: CameraProps) => mount(createElement(Camera, props));
            const camerae = sshallowRenderCamera(defaultProps);
            camerae.setProps({ style: { filter: undefined, width: "60px" , height: "45px" } });
            camerae.childAt(1).childAt(0).simulate("click");
        });

        it("should render the picture structure correctly", () => {
            const createPicture = shallowRenderCamera(defaultProps);
            createPicture.setState({ pictureTaken: true, screenshot: "base64image string" });
            createElement("div", { className: "widget-camera-wrapper", style: { filter: undefined, width: "60px" } },
                createElement(Image, {
                    src: "base64image string",
                    style: { filter: undefined, width: "60px" }
                }),
                createElement("div", {},
                    createElement(CameraButton, {
                        spanClass: "widget-camera-picture",
                        glyphIcon: "camera",
                        onClickAction: jasmine.createSpy("onClick"),
                        buttonLabel: "Take Photo",
                        caption: "icons"
                    }),
                    createElement(CameraButton, {
                        spanClass: "widget-camera-switch-button",
                        glyphIcon: "download",
                        onClickAction: jasmine.createSpy("onClick"),
                        buttonLabel: "Save Photo",
                        caption: "icons"
                    })
                )
            );
        });
    });

    describe("with multiple media devices", () => {
        it("should render with 'switch icon'", () => {
            //
        });

        it("should render with 'switch button'", () => {
            //
        });
    });

    describe("with icons configuration", () => {
        it("should render with the correct 'capture icon'", () => {
            const createCamera = shallowRenderCamera(defaultProps);

            createCamera.setProps({ captionType: "icons" });
            expect(createCamera.childAt(1).childAt(0).prop("glyphIcon")).toBe("camera");
        });

        it("should render with the correct 'retake icon'", () => {
            const createCamera = shallowRenderCamera(defaultProps);

            createCamera.setProps({ captionType: "icons" });
            createCamera.setState({ pictureTaken: true, screenshot: "base64image string" });
            expect(createCamera.childAt(1).childAt(0).prop("glyphIcon")).toBe("camera");
        });

        it("should render with the correct 'save icon'", () => {
            const createCamera = shallowRenderCamera(defaultProps);

            createCamera.setProps({ captionType: "icons" });
            createCamera.setState({ pictureTaken: true, screenshot: "base64image string" });
            expect(createCamera.childAt(1).childAt(1).prop("glyphIcon")).toBe("download");
        });
    });

    describe("with buttons configuration", () => {
        it("should render with 'capture button'", () => {
            const createCameraWithButtons = shallowRenderCamera(defaultProps);

            createCameraWithButtons.setProps({ captionType: "buttons" });
            expect(createCameraWithButtons.childAt(1).childAt(0).prop("buttonLabel")).toBe("Take Photo");
        });

        it("should render with 'retake button'", () => {
            const createCamera = shallowRenderCamera(defaultProps);

            createCamera.setProps({ captionType: "buttons" });
            createCamera.setState({ pictureTaken: true, screenshot: "base64image string" });
            expect(createCamera.childAt(1).childAt(0).prop("buttonLabel")).toBe("Retake photo");
        });

        it("should render with 'save button'", () => {
            const createCamera = shallowRenderCamera(defaultProps);

            createCamera.setProps({ captionType: "buttons" });
            createCamera.setState({ pictureTaken: true, screenshot: "base64image string" });
            expect(createCamera.childAt(1).childAt(1).prop("buttonLabel")).toBe("Save");
        });
    });

    it("should switch/swap camera when switch camera button is clicked", () => {
        // k
    });

    it("should respond to onclick actions", () => {
        // const camera = shallowRenderCamera(defaultProps);
        // camera.setProps({ onClickAction: jasmine.createSpy("onClick") });
        // camera.childAt(1).childAt(0).simulate("click");

        // expect(defaultProps.onClickAction).toHaveBeenCalled();
    });
});
