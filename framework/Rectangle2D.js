// return a point in center of a rectangle
function center(rect){
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
}


// Rectangle2D object
class Rectangle2D
{
   constructor(x, y, width, height){
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      this.shape = new Path2D()
      this.shape.rect(this.x, this.y, this.width, this.height)
   }
   //return true if this rectangle equals rectangle b
   equals(b){
      if (this.x === b.x && this.y ===b.y && this.width ===b.width && this.height === b.height) return true
      else return false
   }
   //return x of this rectangle
   getX(){
      return this.x   
   }
   //return y of this rectangle
   getY(){
      return this.y
   }
   //return max x of this rectangle
   getMaxX(){
      return this.x+this.width
   }
   //return max y of this rectangle
   getMaxY(){
      return this.y+this.height
   }
   //return bounds of this rectangle
   getBounds(){
      return this.bounds
   }
   //return true if this rectangle contains p(x,y)
   contains (p) {
      return (this.x <= p.x && p.x <= this.x + this.width &&
             this.y <= p.y && p.y <= this.y + this.height)
   }
   
}
