export class CircleSprite{
    static type = "arc";
    constructor(x, y, radius, color){
        // initialize properties
        Object.assign(this, {x, y, radius, color});
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