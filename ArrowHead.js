/**
   This class defines arrowheads of various shapes.
*/
class ArrowHead extends SerializableEnumeration{
  //@param s is s string describe style of arrow head 
  constructor(s){
       super()
      this.style = s
      this.ENDSIZE = 10
      this.start = undefined
      this.end = undefined
   }

   /**
      Gets the path of the arrowhead
      @param p a point on the axis of the arrow head
      @param q the end point of the arrow head
      @return the path
   */
   getShape(p,q){
      this.start = p
      this.end = q
      let path = new Path2D()
      if (this.style === 'NONE') return path
      const ARROW_ANGLE = Math.PI / 6
      const ARROW_LENGTH = 10

      let dx = q.x - p.x
      let dy = q.y - p.y
      let angle = Math.atan2(dy, dx)
      let x1 = q.x - ARROW_LENGTH * Math.cos(angle + ARROW_ANGLE)
      let y1 = q.y - ARROW_LENGTH * Math.sin(angle + ARROW_ANGLE)
      let x2 = q.x - ARROW_LENGTH * Math.cos(angle - ARROW_ANGLE)
      let y2 = q.y - ARROW_LENGTH * Math.sin(angle - ARROW_ANGLE)

      path.moveTo(q.x, q.y)
      path.lineTo(x1, y1)
      if (this.style === 'V')
      {
         path.moveTo(x2, y2)
         path.lineTo(q.x, q.y)
      }
      else if (this.style === 'TRIANGLE' || this.style === 'BLACK_TRIANGLE')
      {
         path.lineTo(x2, y2)
         path.closePath()
      }
      else if (this.style === 'DIAMOND' || this.style === 'BLACK_DIAMOND')
      {
         let x3 = x2 - ARROW_LENGTH * Math.cos(angle + ARROW_ANGLE)
         let y3 = y2 - ARROW_LENGTH * Math.sin(angle + ARROW_ANGLE)
         path.lineTo(x3, y3)
         path.lineTo(x2, y2)
         path.closePath()
      }      
      return path
    
   }

   /**
      Draws the arrowhead.
      @param p a point on the axis of the arrow head
      @param q the end point of the arrow head
   */
   draw(p,q){
      const canvas = document.getElementById('editor')
      const ctx = canvas.getContext('2d')
      let path = this.getShape(p,q)
      ctx.save()
      if (this.style === 'BLACK_DIAMOND' || this.style === 'BLACK_TRIANGLE')
         ctx.fillStyle = 'black'
      else
         ctx.fillStyle = 'white'
      ctx.fill(path)
      ctx.restore()
      ctx.stroke(path)
   }

   //return bounds of arrayhead
   getBounds(){
       return new Rectangle2D(this.end.x-this.ENDSIZE,this.end.y-this.ENDSIZE/2,this.ENDSIZE,this.ENDSIZE)
   }

}