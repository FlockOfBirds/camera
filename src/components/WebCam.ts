import { CSSProperties, Component, createElement } from "react";
import { attach, container, reset, set } from "webcamjs";

export interface WebCamProps {
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
        this.setUpWebCame = this.setUpWebCame.bind(this);
    }

    componentDidMount() {
        if (!container) {
            this.setUpWebCame();
        } else {
            reset();
            window.setTimeout(() => {
                this.setUpWebCame();
            }, 40);
        }
    }

    componentDidUpdate() {
            if (!container) {
                this.setUpWebCame();
            } else {
                reset();
                this.setUpWebCame();
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

    private setUpWebCame() {
        if (this.webcam && this.webcam.parentElement) {
            set("constraints", {
                height: this.webcam.parentElement.clientHeight,
                width: this.webcam.parentElement.clientWidth
            });
            set({
                dest_height: this.webcam.parentElement.clientHeight,
                dest_width: this.webcam.parentElement.clientWidth,
                image_format: this.props.fileType,
                height: this.webcam.parentElement.clientHeight,
                width: this.webcam.parentElement.clientWidth
            });
            attach(this.webcam);
        }
    }
}
