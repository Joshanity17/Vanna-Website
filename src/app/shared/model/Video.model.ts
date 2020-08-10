
export class Video {
    public id: number;
    public name: string;
    public path: string;
    public viewCount: number;
    public viewHistory: { leftAt: number }[];
    public hasBeenLoaded: boolean;

    constructor(id: number, name: string, path: string) {
        this.id = id;
        this.name = name;
        this.path = path;
        this.viewCount = 0;
        this.viewHistory = [];
    }

    getVideoPlayer() {
        const selector = this.name + this.id;
        return document.getElementById(selector);
    }
}