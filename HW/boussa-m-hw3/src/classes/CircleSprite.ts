export class CircleSprite{
    static type = "arc";

    x:number;
    y:number;
    radius:number;
    color: string;

    constructor(x:number, y:number, radius:number, color:string){
        // initialize properties
        Object.assign(this, {x, y, radius, color});
    }
    
    draw(ctx:CanvasRenderingContext2D){
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}