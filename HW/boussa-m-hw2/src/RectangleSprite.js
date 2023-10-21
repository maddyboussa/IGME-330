export class RectangleSprite{
    constructor(x, y, width, height, color){
        // initialize properties
        Object.assign(this, {x, y, width, height, color});
    }
    
    update(){

    }
    
    draw(ctx){
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}