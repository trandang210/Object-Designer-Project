/**
   An edge in a graph.
*/
class ShapeEdge{
   constructor(){
   this.start = undefined
   this.end = undefined
   }
    
   clone(){
      return new ShapeEdge()
   }
   
   /**
      Connect this edge to two nodes.
      @param aStart the starting node
      @param anEnd the ending node
   */
   connect(s, e){  
      this.start = s
      this.end = e
   }
   
   /**
      Gets the points at which this edge is connected to
      its nodes.
      @return a line joining the two connection points
   */
   getConnectionPoints(){
      let startBounds = this.start.bounds //return a rectangular node
      let endBounds = this.end.bounds   //this is a rectangular node
      let startCenter = {x:startBounds.x+startBounds.width/2,y:startBounds.y+startBounds.height/2}
      let endCenter = {x:endBounds.x+endBounds.width/2,y:endBounds.y+endBounds.height/2} 
      let toEnd = new Direction(startCenter, endCenter)
      return new  Line2D(this.start.getConnectionPoint(toEnd), this.end.getConnectionPoint(toEnd.turn(180)))
   }
 
   getshape(){ 
   }  
   
   /**
      Gets the smallest rectangle that bounds this edge.
      The bounding rectangle contains all labels.
      @return the bounding rectangle
   */
   getbounds(){
      return this.getShape().getBounds()
   }
   
   /**
      Tests whether the edge contains a point.
      @param aPoint the point to test
      @return true if this edge contains aPoint
   */
   contains(aPoint){
      const MAX_DIST = 3
      const conn = this.getConnectionPoints() 
      if (distance(aPoint,conn.start) <= MAX_DIST || distance(aPoint,conn.end) <= MAX_DIST)
         return false
      const canvas = document.getElementById('editor')
      const ctx = canvas.getContext('2d')
      let p = this.getShape() // assume it is path2D
     
      if (ctx.isPointInStroke(p,aPoint.x,aPoint.y)) return true
   }
}
