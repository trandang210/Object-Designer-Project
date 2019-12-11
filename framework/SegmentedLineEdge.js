/**
   An edge that is composed of multiple line segments
*/
class SegmentedLineEdge extends ShapeEdge{
  /**
      Costructs an edge with no adornments.
   */
  constructor(){
    super()
    this.lineStyle = new LineStyle('SOLID')
    this.startArrowHead = new ArrowHead('NONE')
    this.endArrowHead = new ArrowHead('NONE')
    this.startLabel = ''
    this.middleLabel = ''
    this.endLabel = ''
    this.label = new label()
 }
 
 getPoints(){
 }
 
 /**
      Sets the line style property.
      @param newValue the new value
   */
 setLineStyle(newValue){
    this.lineStyle.style = newValue
 }
 
 /**
      Gets the line style property.
      @return the line style
   */
 getLineStyle(){
    return this.lineStyle.getStyle()
 }
 
 /**
      Sets the start arrow head property
      @param newValue the new value
   */
 setStartArrowHead(newValue){ 
   this.startArrowHead.style = newValue
 }

 /**
      Gets the start arrow head property
      @return the start arrow head style
   */
 getStartArrowHead(){
   return this.startArrowHead.style
 }

 /**
      Sets the end arrow head property
      @param newValue the new value
   */
 setEndArrowHead(newValue){
   this.endArrowHead.style = newValue
 }

 /**
      Gets the end arrow head property
      @return the end arrow head style
   */
 getEndArrowHead(){
   return this.endArrowHead.style
 }

 /**
      Sets the start label property
      @param newValue the new value
   */
 setStartLabel(newValue){
   this.startLabel = newValue
 }

 /**
      Gets the start label property
      @return the label at the start of the edge
   */
 getStartLabel(){
   return this.startLabel
 }

 /**
      Sets the middle label property
      @param newValue the new value
   */
 setMiddleLabel(newValue){
   this.middleLabel = newValue
 }

 /**
      Gets the middle label property
      @return the label at the middle of the edge
   */
 getMiddleLabel(){
   return this.middleLabel
 }

 /**
      Sets the end label property
      @param newValue the new value
   */
 setEndLabel(newValue){
   this.endLabel = newValue
 }

 /**
      Gets the end label property
      @return the label at the end of the edge
   */
 getEndLabel(){
   return this.endLabel
 }

 /**
      Draws the edge.
      
   */
 draw(){
 let points = this.getPoints()
 
 const canvas = document.getElementById('editor')
 const ctx = canvas.getContext('2d')
 
 // draw path of the edge
 ctx.fillStyle = 'black'
 ctx.save()
 ctx.setLineDash(this.lineStyle.getStyle())
 ctx.stroke(this.getSegmentPath())
 ctx.restore()
 
 // draw arrow 
 this.startArrowHead.draw(points[1], points[0])
 this.endArrowHead.draw(points[points.length - 2], points[points.length - 1])
 
 //draw label
 this.drawString(points[1], points[0], 
       this.startArrowHead, this.startLabel, false)
 this.drawString(points[Math.round(points.length / 2) - 1],
       points[Math.round(points.length / 2)],
       undefined, this.middleLabel, true)
 this.drawString(points[points.length - 2],
       points[points.length - 1], 
       this.endArrowHead, this.endLabel, false)
             
 }

 /**
      Draws a string.
      
      @param p an endpoint of the segment along which to
      draw the string
      @param q the other endpoint of the segment along which to
      draw the string
      @param s the string to draw
      @param center true if the string should be centered
      along the segment
   */
 drawString(p,q,arrow,s,center)
 {
   const canvas = document.getElementById('editor')
   const ctx = canvas.getContext('2d')
   if (s !== undefined && s.length !== 0) {
   this.label.text = s
   this.label.font = 'serif'
   let d = ctx.measureText(this.label.text)
       
   this.label.setBounds(0, 0, d.width,this.label.size)
   
   let b = this.getStringBounds( p, q, arrow, s, center)
   
   ctx.fillStyle = '#deeaee'
   ctx.fillRect(b.x,b.y,b.width,b.height)
   ctx.fillStyle = 'black'
   this.label.paint(b.x+b.width/2, b.y+b.height)
   }       
 }
/**
      Computes the attachment point for drawing a string.
      
      @param p an endpoint of the segment along which to
      draw the string
      @param q the other endpoint of the segment along which to
      draw the string
      @param b the bounds of the string to draw
      @param center true if the string should be centered
      along the segment
      @return the point at which to draw the string
   */
getAttachmentPoint(p, q, arrow, d, center)
{    
   const GAP = 3
   let xoff = GAP
   let yoff = -GAP - this.label.size
   let attach = q
   if (center)
   {        
      if (p.x > q.x) 
      { 
         return this.getAttachmentPoint(q, p, arrow, d, center)
      }
      attach = new Point2D((p.x + q.x) / 2, (p.y + q.y) / 2)
      if (p.y < q.y)
         yoff =  - GAP - this.label.size
      else if (p.y === q.y)
         xoff = -d.width / 2
      else
         yoff = GAP
   }
   else 
   {
      if (p.x < q.x)
      {
         xoff = -GAP - d.width
      }
      if (p.y > q.y)
      {
         yoff = GAP
      }
      if (arrow !== undefined)
      {
         if (p.x < q.x)
         {
            xoff -= arrow.ENDSIZE
         }
         else
         {
            xoff += arrow.ENDSIZE
         }
      }
   }
   return new Point2D(attach.x + xoff, attach.y + yoff)
}

/**
      Computes the extent of a string that is drawn along a line segment.
      
      @param p an endpoint of the segment along which to
      draw the string
      @param q the other endpoint of the segment along which to
      draw the string
      @param s the string to draw
      @param center true if the string should be centered
      along the segment
      @return the rectangle enclosing the string
   */
getStringBounds(p, q, arrow, s, center)
{
   const canvas = document.getElementById('editor')
   const ctx = canvas.getContext('2d')
   if (s === undefined || s ==='') return new Rectangle2D(q.x, q.y, 0, 0)
   this.label.text=s
   let d = ctx.measureText(this.label.text)
   let a = this.getAttachmentPoint(p, q, arrow, d, center)
   return new Rectangle2D(a.x, a.y, d.width, this.label.size)
}

getBounds()
{
   points = this.getPoints()
   let r = this.getShape()
   let sl = this.getStringBounds(points[1], points[0], 
    startArrowHead, startLabel, false)
   let slp = new Path2D()
   slp.rect(sl.x,sl.y,sl.width,sl.height) 
   r.addPath(slp)
   let ml = this.getStringBounds(points[points.length / 2 - 1],
    points[points.length / 2], undefined, middleLabel, true)
   let mlp = new Path2D()
   mlp.rect(ml.x,ml.y,ml.width,ml.height) 
   r.addPath(mlp)
   let el = this.getStringBounds(points[points.length - 2],
    points[points.length - 1], 
    endArrowHead, endLabel, false)
   let elp = new Path2D()
   elp.rect(el.x,el.y,el.width,el.height) 
   r.addPath(elp)
   return r
}

getShape()
{
   let path = this.getSegmentPath()
   let points = this.getPoints()
   
   path.addPath(this.startArrowHead.getShape(points[1],points[0]))
   path.addPath(this.endArrowHead.getShape(points[points.length - 2],
         points[points.length - 1]))
   return path
}

getSegmentPath(){
   let points = this.getPoints()
   
   let path = new Path2D()
   let p = points[points.length - 1]
   path.moveTo(p.x, p.y)
   for (let i = points.length - 2; i >= 0; i--)
   {
      p = points[i]
      path.lineTo(p.x, p.y)
   }
   return path
}

getConnectionPoints(){
   let points = this.getPoints()
   return new Line2D(points[0], points[points.length - 1])
}

}