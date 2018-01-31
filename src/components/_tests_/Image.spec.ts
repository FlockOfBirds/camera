import { shallow } from "enzyme";
import { createElement } from "react";
import { Image, ImageProps } from "../Image";

describe("Image", () => {
    const shallowRenderImage = (props: ImageProps) => shallow(createElement(Image, props));
    const defaultProps: ImageProps = {
        src: "image string",
        style: { width: 370, height: 180, filter: "grayscale" }
    };

    it("should render the structure correctly", () => {
        const renderImage = shallowRenderImage(defaultProps);
        expect(renderImage).toBeElement(
            createElement("img", {
                alt: "Image could not be found!",
                src: defaultProps.src,
                style: defaultProps.style
            })
        );
    });

    it("should not render without src", () => {
        const renderImage = shallowRenderImage(defaultProps);

        renderImage.setProps({ src: "" });
        expect(renderImage.prop("src").trim()).toEqual("");
    });

    it("should not render without style", () => {
        const renderImage = shallowRenderImage(defaultProps);
        expect(renderImage.prop("style")).toBeDefined();
    });

});
