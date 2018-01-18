import { CSSProperties, Component, ReactElement, createElement } from "react";
import { attach, container, reset, set, snap, stream, userMedia } from "webcamjs";
import { findDOMNode } from "react-dom";
import * as classNames from "classnames";

import { Alert, AlertProps } from "./Alert";

import "../ui/Camera.scss";

export interface CameraProps {
    captureButtonName: string;
    captureButtonIcon: string;
    captionsToUse: string;
    fileType: string;
    filter: string;
    width: number;
    widthUnit: string;
    onClickAction: (image: {src: string, id: string }) => void;
    recaptureButtonName: string;
    style?: object;
    usePictureButtonIcon: string;
    usePictureButtonName: string;
    height: number;
    heightUnit: string;
}

export interface CameraState {
    pictureId: string;
    pictureTaken: boolean;
    retakePhoto: boolean;
    screenshot: string;
}

export type FileFormats = "jpeg" | "png" | "webp";

export class Camera extends Component<CameraProps, CameraState> {
    private webcam?: HTMLDivElement;
    private videoElement: HTMLVideoElement;
    private pictureWidth: number;

    constructor(props: CameraProps) {
        super(props);

        this.state = {
            pictureId: "",
            pictureTaken: false,
            retakePhoto: false,
            screenshot: ""
        };

        this.setCameraReference = this.setCameraReference.bind(this);
        this.retakePicture = this.retakePicture.bind(this);
        this.setStyle = this.setStyle.bind(this);
        this.takePicture = this.takePicture.bind(this);
        this.setUpWebCam = this.setUpWebCam.bind(this);
        this.bindDimensions = this.bindDimensions.bind(this);
    }

    render() {
        if (!userMedia) {
            return this.renderAlert("This browser does not support the camera widget. Google-chrome is recommended.");
        }
        if (this.state.pictureTaken && this.state.screenshot) {
            return this.renderPhoto();
        }

        return this.renderWebCam();
    }

    componentDidMount() {
        if (!container) {
            this.setUpWebCam();
        } else {
            reset();
            window.setTimeout(() => {
                this.setUpWebCam();
            }, 500);
        }
    }

    componentDidUpdate() {
        if (this.state.pictureTaken === false && this.state.retakePhoto) {
            if (!container) {
                this.setUpWebCam();
            } else {
                reset();
                window.setTimeout(() => {
                    this.setUpWebCam();
                }, 500);
            }
        }
    }

    private setUpWebCam() {
        if (this.webcam && this.webcam.parentElement) {
            set("constraints", {
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
            this.pictureWidth = this.webcam.parentElement.clientWidth;
            attach(this.webcam);
        }
    }

    private setCameraReference(webcam: HTMLDivElement) {
        if (!this.webcam || webcam) {
            this.webcam = webcam;
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

        this.videoElement = findDOMNode(this).firstChild as HTMLVideoElement;
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

    private retakePicture() {
        this.setState({ pictureTaken: false });
    }

    private renderWebCam(): ReactElement<{}> {
        return createElement("div", { className: "widget-camera-parent", style: this.setStyle(this.props) },
            createElement("div", {
                ref: this.setCameraReference,
                style: { filter: this.props.filter }
            }),
            createElement("span", {
                className: classNames("picture-class1"),
                onClick: this.takePicture
            },
                this.createIcons(this.props.captureButtonName, this.props.captureButtonIcon)
            )
        );
    }

    private renderPhoto(): ReactElement<{}> {
        return createElement("div", { className: classNames("widget-camera-parent") },
            createElement("img", {
                alt: "Image could not be found!",
                src: this.state.screenshot,
                style:  this.bindDimensions()
            }),
            createElement("div", { style: { width: this.pictureWidth } },
                createElement("span", {
                    className: classNames("picture-class"),
                    onClick: this.retakePicture
                },
                    this.createIcons(this.props.recaptureButtonName, this.props.captureButtonIcon)
                ),
                createElement("span", {
                    className: classNames("switch-button"),
                    onClick: () => this.props.onClickAction({
                        id: this.state.pictureId,
                        src: this.state.screenshot
                    })
                },
                    this.createIcons(this.props.usePictureButtonName, this.props.usePictureButtonIcon)
                )
            )
        );
    }

    private createIcons(buttonLabel: string, styleName: string): ReactElement<{}> {
        return (this.props.captionsToUse === "icons")
            ? createElement("span", { className: classNames(`glyphicon glyphicon-${styleName}`) })
            : createElement("button", { className: classNames("btn btn-inverse active") }, buttonLabel);
    }

    private setStyle(props: CameraProps): CSSProperties {
        const style: CSSProperties = {
            width: props.widthUnit === "percentage" ? `${props.width}%` : `${props.width}px`
        };
        if (props.heightUnit === "percentageOfWidth") {
            style.paddingBottom = `${props.height}%`;
        } else if (props.heightUnit === "pixels") {
            style.height = `${props.height}px`;
        }

        return style;
    }

    private bindDimensions(): object {
        if (this.webcam && this.webcam.parentElement) {
            return {
                filter: this.props.filter,
                height: this.webcam.parentElement.clientHeight,
                width: this.webcam.parentElement.clientWidth
            };
        }

        return {};
    }

    private renderAlert(message: string): ReactElement<AlertProps> {
        return createElement(Alert, {
            bootstrapStyle: "danger",
            className: "",
            message
        });
    }
}
