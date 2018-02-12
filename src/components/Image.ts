import { CSSProperties, Component, createElement } from "react";

export interface ImageProps {
    src: string;
    style: CSSProperties;
}

export class Image extends Component<ImageProps, {}> {
    render() {
        return createElement("img", {
            alt: "Image could not be found!",
            className: "widget-camera image",
            src: this.props.src,
            style: this.props.style
        });
    }
}
