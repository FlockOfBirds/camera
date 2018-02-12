import { Component, ReactElement, createElement } from "react";
import { CaptionType } from "./Camera";

export interface CameraButtonProps {
    spanClass: string;
    glyphIcon: string;
    onClickAction: () => void;
    buttonLabel: string;
    caption: CaptionType;
}

export class CameraButton extends Component<CameraButtonProps, {}> {
    render() {
        return createElement("span", {
            className: this.props.spanClass,
            onClick: this.props.onClickAction
        },
            this.createIcon(this.props.buttonLabel, this.props.glyphIcon, this.props.caption)
        );
    }

    private createIcon(buttonLabel: string, glyphiconName: string , caption: CaptionType): ReactElement<{}> {
        return(caption === "icons")
            ? createElement("span", { className: `glyphicon glyphicon-${glyphiconName}` })
            : createElement("button", { className: "btn btn-inverse active" }, buttonLabel);
    }
}
