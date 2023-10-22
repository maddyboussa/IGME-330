export class RectangleSprite{
    constructor(x, y, width, height, color){
        // initialize properties
        Object.assign(this, {x, y, width, height, color});
    }
    
    draw(ctx){
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.restore();
    }
}