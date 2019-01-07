export class Helper {
    static noImage(e) {
        if (e.target.src != "image/no-image.png") {
            e.target.src = "image/no-image.png";
        }
    }    
}