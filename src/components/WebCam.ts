import { CSSProperties, Component, createElement } from "react";
import { attach, container, reset, set } from "webcamjs";

export interface WebCamProps {
    height: number;
    width: number;
    filter: string;
    fileType: string;
    style: CSSProperties;
    ref: (webcamContainer: HTMLDivElement) => void;
}

export class WebCam extends Component<WebCamProps, {}> {
    private Webcam?: HTMLDivElement;

    constructor(props: WebCamProps) {
        super(props);

        this.setCameraReference = this.setCameraReference.bind(this);
        this.setUpWebCam = this.setUpWebCam.bind(this);
    }

    componentDidMount() {
        if (!container) {
            this.setUpWebCam();
        } else {
            reset();
            this.setUpWebCam();
        }
    }

    componentDidUpdate() {
        if (!container) {
            this.setUpWebCam();
        }
    }

    render() {
        return createElement("div", {
            ref: this.setCameraReference,
            style: { filter: this.props.filter }
        });
    }

    private setCameraReference(webcam: HTMLDivElement) {
        if (!this.Webcam || webcam) {
            this.Webcam = webcam;
        }
    }

    private setUpWebCam() {
        if (this.Webcam && this.Webcam.parentElement) {
            set("constraints", {
                height: this.props.height,
                width: this.props.width
            });
            set({
                dest_height:  this.Webcam.parentElement.clientHeight,
                dest_width: this.Webcam.parentElement.clientWidth,
                height:  this.props.height,
                image_format: this.props.fileType,
                width: this.props.width
            });
            attach(this.Webcam);
        }
    }

}
