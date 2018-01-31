class HomePage {
    public get button() { return browser.element(".widget-camera-wrapper"); }

    public open(): void {
        browser.url("/");
    }
}

const page = new HomePage();

export default page;
