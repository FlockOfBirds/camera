import { CSSProperties, Component, ReactElement, createElement } from "react";
import { snap, stream } from "webcamjs";

import { Alert, AlertProps } from "./Alert";
import { CameraButton } from "./CameraButton";
import { WebCam } from "./WebCam";
import { Image } from "./Image";

import "../ui/Camera.scss";

export type CaptionType = "icons" | "buttons";

export interface CameraProps {
    captureButton: string;
    captureIcon: string;
    caption: CaptionType;
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
    availableDevices: string[];
    cameraDevicePosition: number;
    browserSupport: boolean;
    swapCamera: boolean;
    pictureId: string;
    pictureTaken: boolean;
    retakePhoto: boolean;
    screenshot: string;
}

export interface Web {
    Webcam: HTMLVideoElement;
}

export type FileFormats = "jpeg" | "png" | "webp";

export class Camera extends Component<CameraProps, CameraState> {
    private webcam?: HTMLDivElement;
    private availableDevices: string[];
    private videoElement ?: HTMLVideoElement;

    constructor(props: CameraProps) {
        super(props);

        this.state = {
            availableDevices: [],
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
                });
            this.setState({ availableDevices: this.availableDevices, browserSupport: true });
        }
    }

    render() {
        if (!this.state.browserSupport) {
            return this.renderAlert("This browser does not support the camera widget. Google-chrome is recommended.");
        } else if (this.state.pictureTaken && this.state.screenshot.trim() !== "") {
            return this.renderPhoto();
        } else {
            return this.renderWebCam();
        }
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
                height: this.props.height,
                ref: this.setCameraReference,
                style: this.setStyle(this.props),
                width: this.props.width
            }),
            createElement("div", {},
                createElement(CameraButton, {
                    buttonLabel: this.props.captureButton,
                    caption: this.props.caption,
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
                    caption: this.props.caption,
                    glyphIcon: this.props.captureIcon,
                    onClickAction: this.retakePicture,
                    spanClass: "widget-camera-picture"
                }),
                createElement(CameraButton, {
                    buttonLabel:  this.props.savePictureButton,
                    caption: this.props.caption,
                    glyphIcon: this.props.savePictureIcon,
                    onClickAction: this.onClick,
                    spanClass: "widget-camera-switch-button"
                })
            )
        );
    }

    private createSwitchCameraButton() {
        if (this.state.availableDevices.length > 1) {
            return createElement(CameraButton, {
                buttonLabel: "Switch",
                caption: this.props.caption,
                glyphIcon: this.props.switchCameraIcon,
                onClickAction: this.changeCamera,
                spanClass: "widget-camera-switch-button"
            });
        }

        return;
    }

    private changeCamera() {
        const cameraDevicePosition: number = this.state.cameraDevicePosition < (this.state.availableDevices.length - 1)
            ? this.state.cameraDevicePosition + 1
            : 0;
        this.setState({ cameraDevicePosition, swapCamera: true });
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

            this.videoElement = ((this.webcam as any).Webcam as HTMLVideoElement).lastChild as HTMLVideoElement;
            if (this.videoElement) {
                this.videoElement.srcObject = stream;
                if (this.videoElement.srcObject) {
                    this.videoElement.srcObject.getTracks().filter((mediaTrack: MediaStreamTrack) => {
                        if (mediaTrack.enabled === true) {
                            mediaTrack.stop();
                        }
                    });
                    this.videoElement.srcObject = null;
                }
            }
        }
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
