// Point 2D object
class Point2D
{
  constructor(x,y){
     this.x = x
     this.y = y
  }
   //distance method
  distance(p){
  return Math.sqrt((p.x-this.x)^2 + (p.y-this.y)^2)
  }
  equals(p){
     if (this.x === p.x && this.y ===p.y)return true
     else return false
  }
}