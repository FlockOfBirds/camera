import { shallow } from "enzyme";
import { createElement } from "react";
import { CameraButton, CameraButtonProps } from "../CameraButton";

describe("CameraButton", () => {
    const createCameraButton = (props: CameraButtonProps) => shallow(createElement(CameraButton, props));
    const defaultProps: CameraButtonProps = {
        buttonLabel: "Take photo",
        caption: "buttons",
        glyphIcon: "camera",
        onClickAction: jasmine.createSpy("onClick"),
        spanClass: "widget-camera-picture"
    };

    describe("with action labels as 'buttons'", () => {
        it("should render the structure correctly", () => {
            const cameraButton = createCameraButton(defaultProps);
            expect(cameraButton).toBeElement(
                createElement("span", {
                    className: defaultProps.spanClass,
                    onClick: defaultProps.onClickAction
                },
                    createElement("button", { className: "btn btn-inverse active" }, defaultProps.buttonLabel)
                )
            );
        });

        it(" should renders a button with the specified class", () => {
            const cameraButton = createCameraButton(defaultProps);
            const Label = cameraButton.childAt(0);

            expect(Label).toHaveClass("active");
        });
    });

    describe("with action labels as 'icons'", () => {
        it("should render the structure correctly", () => {
            defaultProps.caption = "icons";
            const cameraButton = createCameraButton(defaultProps);
            expect(cameraButton).toBeElement(
                createElement("span", {
                    className: defaultProps.spanClass,
                    onClick: defaultProps.onClickAction
                },
                    createElement("span", { className: `glyphicon glyphicon-${defaultProps.glyphIcon}` })
                )
            );
        });

        it(" should renders a button with the specified class", () => {
            const cameraButton = createCameraButton(defaultProps);
            const Label = cameraButton.childAt(0);

            expect(Label).toHaveClass(`glyphicon-${defaultProps.glyphIcon}`);
        });
    });

    it("should respond to onclick actions", () => {
        const CamerasButton = createCameraButton(defaultProps);

        CamerasButton.simulate("click");
        expect(defaultProps.onClickAction).toHaveBeenCalled();
    });
});
