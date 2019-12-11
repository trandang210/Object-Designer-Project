/**
   An S- or C-shaped edge with an arrowhead.
*/
class ObjectReferenceEdge extends ShapeEdge{
   
   constructor(){
     super() 
     this.ENDSIZE = 10
      
   }
   //draw method
   draw(){
      const canvas = document.getElementById('editor')
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = 'black'
      ctx.stroke(this.getShape())
      let line = this.getConnectionPoints()
      let x1 = undefined
      let x2 = line.getX2()
      let y = line.getY2()
      if (this.isSShaped())
         x1 = x2 - this.ENDSIZE
      else
         x1 = x2 + this.ENDSIZE
      //draw arrow head
      let arrow = new ArrowHead('BLACK_TRIANGLE')
      arrow.draw(new Point2D(x1, y), new Point2D(x2, y))    
   }
   //Shows popup dialog
   popup(){}

 //getShape method
   getShape(){
      let line = this.getConnectionPoints()
      let y1 = line.start.y
      let y2 = line.end.y
      let xmid = (line.start.x + line.end.x) / 2
      let ymid = (line.start.y + line.end.y) / 2
      let p = new Path2D()
      if (this.isSShaped())
      {
         let x1 = line.start.x + this.ENDSIZE
         let x2 = line.end.x - this.ENDSIZE
         
         p.moveTo(line.start.x, y1)
         p.lineTo(x1, y1)
         p.quadraticCurveTo(((x1 + xmid) / 2), y1, xmid, ymid)
         p.quadraticCurveTo(((x2 + xmid) / 2), y2, x2, y2)
         p.lineTo(line.end.x, y2)
      }
      else // reverse C shaped
      {
         let x1 = Math.max(line.start.x, line.end.x) + this.ENDSIZE
         let x2 = x1 + this.ENDSIZE
         p.moveTo(line.start.x, y1)
         p.lineTo(x1, y1)
         p.quadraticCurveTo(x2, y1, x2, ymid)
         p.quadraticCurveTo(x2, y2, x1, y2)
         p.lineTo(line.end.x, y2)
      }
      return p
   }
 //getConnectionPoints() method
   getConnectionPoints(){
      let b = this.end.getBounds()
      let p = this.start.getConnectionPoint(new Direction(1,0))
      if (this.isSShaped())
         return new Line2D(p, this.end.getConnectionPoint(new Direction(-1,0)))
      else 
         return new Line2D(p, this.end.getConnectionPoint(new Direction(1,0)))
   }

 /**
      Tests whether the node should be S- or C-shaped.
      @return true if the node should be S-shaped
   */
   isSShaped(){
      let b = this.end.getBounds()
      let p = this.start.getConnectionPoint(new Direction(1,0))
      return (b.x >= p.x + 2 * this.ENDSIZE)
   }
   clone(){
      return new ObjectReferenceEdge()
   }
 // 
}

/**
   A dotted line that connects a note to its attachment.
*/
class NoteEdge extends ShapeEdge{
   constructor(){
      const DOTTED_STROKE = '[1, 5]'
      super()
   } 

   draw(){
     //draw note edge ,change to line dash
      const canvas = document.getElementById('editor')
      const ctx = canvas.getContext('2d')     
      ctx.save()
      ctx.setLineDash([2, 5])
      ctx.fillStyle = 'black'
      ctx.stroke(this.getShape())
      ctx.setLineDash([])
      ctx.globalAlpha = 0.0
      ctx.lineWidth = 10
      ctx.stroke(this.getShape())
      ctx.restore()
      
   }
   clone(){
          return new NoteEdge()
   }
   getConnectionPoints(){
     let startBounds = this.start.getBounds()
     let endBounds = this.end.getBounds()
      
        
     let d = new Direction(center(endBounds).x - center(startBounds).x, center(endBounds).y - center(startBounds).y)
  
     return new Line2D(this.start.getConnectionPoint(d), this.end.getConnectionPoint(d.turn(180)))
     
  }  

  getShape(){
   let path = new Path2D()
   
      let conn = this.getConnectionPoints()
      path.moveTo(conn.getX1(), conn.getY1())
      path.lineTo(conn.getX2(), conn.getY2())
      return path
   }

  //Show pop up dialog
  popup(){}
}
