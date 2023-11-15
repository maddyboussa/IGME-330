export class RectangleSprite{

    x:number;
    y:number;
    width:number;
    height:number;
    color: CanvasRenderingContext2D;

    constructor(x:number, y:number, width:number, height:number, color){
        // initialize properties
        Object.assign(this, {x, y, width, height, color});
    }
    
    draw(ctx:CanvasRenderingContext2D){
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.restore();
    }
}