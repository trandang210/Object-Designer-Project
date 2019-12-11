//calculate distance between 2 point
function distance(p,q){
  return Math.sqrt((p.x-q.x)*(p.x-q.x) + (p.y-q.y)*(p.y-q.y))
} 



// Line 2D object 
class Line2D
{
   constructor(start,end){
      this.start = start
      this.end = end
      this.shape = this.getShape()
   }
   
   //return shape of Line
   getShape(){
      let s = new Path2D()
      s.moveTo(this.start.x,this.start.y)
      s.lineTo(this.end.x,this.end.y)
      return s
   }

   //return x of start point
   getX1(){
      return this.start.x 
   }
   //return y of end point
   getX2(){
      return this.end.x 
   }
   //return y of start point
   getY1(){
      return this.start.y 
   }
   //return y pf end point
   getY2(){
      return this.end.y 
   }
   //return start point(x,y)
   getP1(){
      return new Point2D(this.start.x,this.start.y)
   }
   //return end point(x,y)
   getP2(){
      return new Point2D(this.end.x,this.end.y)
   }
   //@param p is a point (x,y)
   //return true if line contains point p(x,y)
   contains(p){
      return this.shape.isPointInStroke(p.x,p.y)
   }
}
