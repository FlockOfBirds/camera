import { CSSProperties, Component, createElement } from "react";
import { attach, container, reset, set } from "webcamjs";

export interface WebCamProps {
    height: number;
    width: number;
    filter: string;
    fileType: string;
    style: CSSProperties;
    ref: (camContainer: HTMLDivElement) => void;
}

export class WebCam extends Component<WebCamProps, {}> {
    private webcam?: HTMLDivElement;

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
            window.setTimeout(() => {
                this.setUpWebCam();
            }, 40);
        }
    }

    componentDidUpdate() {
            if (!container) {
                this.setUpWebCam();
            } else {
                reset();
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
        if (!this.webcam || webcam) {
            this.webcam = webcam;
        }
    }

    private setUpWebCam() {
        if (this.webcam && this.webcam.parentElement) {
            set("constraints", {
                height: this.props.height,
                width: this.props.width
            });
            set({
                dest_height:  this.props.height,
                dest_width: this.props.width,
                height:  this.props.height,
                image_format: this.props.fileType,
                width: this.props.width
            });
            attach(this.webcam);
        }
    }
}
