import { CSSProperties, Component, ReactElement, createElement } from "react";
import { attach, set, snap, stream } from "webcamjs";

import { Alert, AlertProps } from "./Alert";
import { CameraButton } from "./CameraButton";
import { WebCam } from "./WebCam";
import { Image } from "./Image";

import "../ui/Camera.scss";

export type CaptionType = "icons" | "buttons";

export interface CameraProps {
    captureButton: string;
    captureIcon: string;
    captionType: CaptionType;
    fileType: string;
    filter: string;
    width: number;
    widthUnit: string;
    onClickAction: (image: {src: string, id: string }) => void;
    recaptureButton: string;
    ref: (camContainer: HTMLDivElement) => void;
    style?: object;
    switchCameraIcon: string;
    savePictureIcon: string;
    savePictureButton: string;
    height: number;
    heightUnit: string;
}

export interface CameraState {
    cameraDevicePosition: number;
    browserSupport: boolean;
    swapCamera: boolean;
    pictureId: string;
    pictureTaken: boolean;
    retakePhoto: boolean;
    screenshot: string;
}

export type FileFormats = "jpeg" | "png" | "webp";

export class Camera extends Component<CameraProps, CameraState> {
    private webcam?: HTMLDivElement;
    private videoElement: MediaStream;
    private availableDevices: string[];

    constructor(props: CameraProps) {
        super(props);

        this.state = {
            browserSupport: false,
            cameraDevicePosition: 0,
            pictureId: "",
            pictureTaken: false,
            retakePhoto: false,
            screenshot: "",
            swapCamera: false
        };

        this.availableDevices = [];
        this.setCameraReference = this.setCameraReference.bind(this);
        this.retakePicture = this.retakePicture.bind(this);
        this.setStyle = this.setStyle.bind(this);
        this.takePicture = this.takePicture.bind(this);
        this.setUpWebCam = this.setUpWebCam.bind(this);
        this.onClick = this.onClick.bind(this);
        this.changeCamera = this.changeCamera.bind(this);
    }

    componentWillMount() {
        if (!navigator.mediaDevices) {

            this.setState({ browserSupport: false });
        } else {
            navigator.mediaDevices.enumerateDevices()
                .then((devices: Array<{ kind: string, deviceId: string }>) => {
                    devices.filter((device: { kind: string, deviceId: string }) => {
                        if (device.kind === "videoinput") {
                            this.availableDevices.push(device.deviceId);
                        }
                    });
                })
                .catch((error: Error) => {
                    mx.ui.error(`${error.name}: ${error.message}`);
                });
            this.setState({ browserSupport: true });
        }
    }

    render() {
        if (!this.state.browserSupport) {
            return this.renderAlert("This browser does not support the camera widget. Google-chrome is recommended.");
        }
        if (this.state.pictureTaken && this.state.screenshot) {
            return this.renderPhoto();
        }

        return this.renderWebCam();
    }

    componentDidUpdate() {
        // if (this.state.pictureTaken === false && this.state.retakePhoto) {
        //     if (!container) {
        //         this.setUpWebCam();
        //     } else {
        //         reset();
        //         this.setUpWebCam();
        //     }
        // } else if (this.state.swapCamera) {
        //         this.setUpWebCam();
        // }
    }

    private renderAlert(message: string): ReactElement<AlertProps> {
        return createElement(Alert, {
            bootstrapStyle: "danger",
            className: "",
            message
        });
    }

    private renderWebCam() {
        return createElement("div", { className: "widget-camera-wrapper", style: this.setStyle(this.props) },
            createElement(WebCam, {
                fileType: this.props.fileType,
                filter: this.props.filter,
                ref: this.setCameraReference,
                style: this.setStyle(this.props)
            }),
            createElement("div", {},
                createElement(CameraButton, {
                    buttonLabel: this.props.captureButton,
                    caption: this.props.captionType,
                    glyphIcon: this.props.captureIcon,
                    onClickAction: this.takePicture,
                    spanClass: "widget-camera-picture"
                }),
                this.createSwitchCameraButton()
            )
        );
    }

    private setCameraReference(webcam: HTMLDivElement) {
        if (!this.webcam || webcam) {
            this.webcam = webcam;
        }
    }

    private renderPhoto(): ReactElement<{}> {
        return createElement("div", { className: "widget-camera-wrapper" },
            createElement(Image, {
                src: this.state.screenshot,
                style: this.setStyle(this.props, this.props.filter)
            }),
            createElement("div", { style: { width: this.setStyle(this.props).width } },
                createElement(CameraButton, {
                    buttonLabel: this.props.recaptureButton,
                    caption: this.props.captionType,
                    glyphIcon: this.props.captureIcon,
                    onClickAction: this.retakePicture,
                    spanClass: "widget-camera-picture"
                }),
                createElement(CameraButton, {
                    buttonLabel:  this.props.savePictureButton,
                    caption: this.props.captionType,
                    glyphIcon: this.props.savePictureIcon,
                    onClickAction: this.onClick,
                    spanClass: "widget-camera-switch-button"
                })
            )
        );
    }

    private createSwitchCameraButton() {
        if (this.availableDevices.length > 1) {
            return createElement(CameraButton, {
                buttonLabel: "Switch",
                caption: this.props.captionType,
                glyphIcon: this.props.switchCameraIcon,
                onClickAction: this.changeCamera,
                spanClass: "widget-camera-switch-button"
            });
        }

        return;
    }

    private changeCamera() {
        const cameraDevicePosition: number = this.state.cameraDevicePosition < (this.availableDevices.length - 1)
            ? this.state.cameraDevicePosition + 1
            : 0;
        this.setState({ cameraDevicePosition, swapCamera: true });
    }

    private setUpWebCam() {
        if (this.webcam && this.webcam.parentElement) {
            set("constraints", {
                deviceId: this.availableDevices[this.state.cameraDevicePosition],
                height: this.webcam.parentElement.clientHeight,
                width: this.webcam.parentElement.clientWidth
            });
            set({
                dest_height: this.webcam.parentElement.clientHeight,
                dest_width: this.webcam.parentElement.clientWidth,
                height: this.webcam.parentElement.clientHeight,
                image_format: this.props.fileType,
                width: this.webcam.parentElement.clientWidth
            });
            attach(this.webcam);
        }
    }

    private takePicture() {
        if (this.webcam) {
            snap((base64Image: string) => {
                this.setState({
                    pictureId: stream.id,
                    pictureTaken: true,
                    retakePhoto: true,
                    screenshot: base64Image
                });
            });
        }

        // if (this.webcam) {
        //     this.videoElement = this.webcam.lastChild as HTMLVideoElement;
        // }

        // tslint:disable-next-line:no-unused-expression
        this.videoElement = stream;
        if (this.videoElement) {
            this.videoElement.getTracks().filter((mediaTrack: MediaStreamTrack) => {
                if (mediaTrack.enabled === true) {
                    mediaTrack.stop();
                }
            });
        }
        // this.videoElement.srcObject = null;
        // tslint:disable-next-line:no-console
        console.log(this.videoElement);
    }

    private retakePicture() {
        this.setState({ pictureTaken: false });
    }

    private onClick() {
        this.props.onClickAction({
            id: this.state.pictureId,
            src: this.state.screenshot
        });
    }

    private setStyle(props: CameraProps, imageFilter?: string): CSSProperties {
        const style: CSSProperties = {
            filter: imageFilter,
            width: props.widthUnit === "percentage" ? `${props.width}%` : `${props.width}px`
        };
        if (props.heightUnit === "percentageOfWidth") {
            style.paddingBottom = `${props.height}%`;
        } else if (props.heightUnit === "pixels") {
            style.height = `${props.height}px`;
        }

        return style;
    }
}
