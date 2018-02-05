class Grayscale {
    // public get home() { return browser.element(".mx-name-159b6aef-dbc3-5b23-a735-cf99f8341771-1"); }
    public get webImage() { return browser.element(".widget-camera-wrapper"); }

    public open(): void {
        browser.url("/p/Grayscale");
    }
}

const GrayscalePage = new Grayscale();

export default GrayscalePage;
