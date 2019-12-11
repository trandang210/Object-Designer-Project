//Direction class 
class Direction{
   
   constructor(dx, dy){
      /** 
      const NORTH = {dx: 0, dy: -1}
      const SOUTH = {dx: 0, dy: 1}
      const EAST = {dx: 1, dy: 0}
      const WEST = {dx: -1, dy: 0}
      */
      this.x = dx
      this.y = dy
      this.l = Math.sqrt(this.x * this.x + this.y * this.y)
      if(this.l === 0) return undefined;
      this.x = this.x/this.l
      this.y = this.y/this.l
   }
   
       
   turn(angle)
   {
      let a = angle*(Math.PI/180)
      return new Direction(this.x * Math.cos(a) - this.y * Math.sin(a), 
                          this.x * Math.sin(a) + this.y * Math.cos(a))
   } 
}
