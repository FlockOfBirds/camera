import { Component, createElement } from "react";
import { Camera, CaptionType, FileFormats } from "./Camera";
import { parseStyle } from "../utils/ContainerUtils";

interface WrapperProps {
    mxObject: mendix.lib.MxObject;
    style: string;
    class: string;
    friendlyId: string;
}

export interface ModelerProps extends WrapperProps {
    saveImage: string;
    captureButton: string;
    recaptureButton: string;
    savePictureButton: string;
    fileType: FileFormats;
    photo: string;
    widthUnit: string;
    heightUnit: string;
    width: number;
    height: number;
    captureIcon: string;
    switchCameraIcon: string;
    savePictureIcon: string;
    caption: CaptionType;
}

export interface CameraContainerProps extends ModelerProps {
    onClickAction: (image: {src: string, id: string}) => {};
    imageFilter: string;
    filter: string;
}

export default class CameraContainer extends Component<CameraContainerProps> {
    private base64Image: string;
    private imageData: ImageData;

    constructor(props: CameraContainerProps) {
        super(props);

        this.base64Image = "";
        this.imageData = new ImageData(1, 1);
        this.setFilter = this.setFilter.bind(this);
        this.savePhoto = this.savePhoto.bind(this);
        this.base64toBlob = this.base64toBlob.bind(this);
    }

    render() {
        return createElement(Camera as any, {
            ...this.props as ModelerProps,
            filter: this.setFilter(),
            onClickAction: this.savePhoto,
            style: parseStyle(this.props.style)
        });
    }

    private setFilter(): string {
        if (this.props.imageFilter === "grayscale") {
            return "grayscale(1)";
        } else if (this.props.imageFilter === "sepia") {
            return "sepia(1)";
        } else {
            return "none";
        }
    }

    private filterImage(src: string) {
        const newImage = document.createElement("img");
        newImage.setAttribute("src", src);

        const canvas = document.createElement("canvas");
        canvas.height = newImage.height;
        canvas.width = newImage.width;
        const context = canvas.getContext("2d");

        if (context) {
            context.drawImage(newImage, 0, 0, canvas.width, canvas.height);
            this.imageData = context.getImageData(0, 0, newImage.width, newImage.height);
            const d = this.imageData.data;
            if (this.props.imageFilter === "grayscale") {
                for (let i = 0; i < d.length; i += 4) {
                    const red = d[i];
                    const green = d[i + 1];
                    const blue = d[i + 2];
                    const v = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
                    d[i] = d[i + 1] = d[i + 2] = v;
                }
                context.putImageData(this.imageData, 0, 0);
                this.base64Image = canvas.toDataURL();
            } else if (this.props.imageFilter === "sepia") {
                for (let x = 0; x < d.length; x += 4) {
                    const r = d[x];
                    const g = d[x + 1];
                    const b = d[x + 2];
                    const sepiaR = r * .393 + g * .769 + b * .189;
                    const sepiaG = r * .349 + g * .686 + b * .168;
                    const sepiaB = r * .272 + g * .534 + b * .131;
                    d[x] = sepiaR;
                    d[x + 1] = sepiaG;
                    d[x + 2] = sepiaB;
                }
                context.putImageData(this.imageData, 0, 0);
                this.base64Image = canvas.toDataURL();
            } else {
                this.base64Image = src;
            }
        }
    }

    private savePhoto(image: {src: string, id: string}) {
        this.filterImage(image.src);
        if (this.props.mxObject.inheritsFrom("System.Image") && image.src) {
            mx.data.saveDocument(
                this.props.mxObject.getGuid(),
                `${image.id}.${this.props.fileType}`,
                {},
                this.base64toBlob(this.base64Image),
                () => {
                    mx.ui.info("Image has been saved", false);
                },
                error => { mx.ui.error(error.message, false); }
            );
        } else {
            mx.ui.error("The entity does not inherit from System Image", false);
        }
    }

    private base64toBlob(base64Uri: string): Blob {
        const byteString = atob(base64Uri.split(",")[1]);
        const bufferArray = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(bufferArray);

        for (let i = 0; i < byteString.length; i++) {
            uintArray[i] = byteString.charCodeAt(i);
        }

        return new Blob([ bufferArray ]);
    }
}
