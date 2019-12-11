/**
   A style for a segmented line that indicates the number
   and sequence of bends.
*/
class BentStyle extends SerializableEnumeration{
  
   //@param s is a string describe style of line 
   constructor(s){
    super()
   this.MIN_SEGMENT = 10
   this.SELF_WIDTH = 30
   this.SELF_HEIGHT = 25
   this.style = s
   }
   /**
      Gets the points at which a line joining two rectangles
      is bent according to this bent style.
      @param start the starting rectangle
      @param end the ending rectangle
      @return an array list of points at which to bend the
      segmented line joining the two rectangles
   */
   getPath(start, end){
      
      let r = this.getPathS(this.style,start,end)
      if (r !== undefined) return r
      
      if (start.x === end.x && start.y===end.y && start.width===end.width && start.height===end.height) r = this.getSelfPath(start)
      else if (this.style === 'HVH') r = this.getPathS('HVH', start, end)
      else if (this.style === 'VHV') r = this.getPathS('VHV', start, end)
      else if (this.style === 'HV') r = this.getPathS('HV', start, end)
      else if (this.style === 'VH') r = this.getPathS('VH', start, end)
      
      if (r !== undefined) return r

      return this.getPathS('STRAIGHT', start, end)
   }
   
   /**
      Gets the four connecting points at which a bent line
      connects to a rectangle.
   */
   connectionPoints(rec){
     
      let a = new Array()
      a.push(new Point2D(rec.x, center(rec).y))
      a.push(new Point2D(rec.x+rec.width, center(rec).y))
      a.push(new Point2D(center(rec).x, rec.y))
      a.push(new Point2D(center(rec).x, rec.y+rec.height)) 
      
      return a
   }
   /**
      Gets the points at which a line joining two rectangles
      is bent according to a bent style.
      @param start the starting rectangle
      @param end the ending rectangle
      @return an array list of points at which to bend the
      segmented line joining the two rectangles
   */
   getPathS(bent, s, e){
    
      let r = new Array()
      if (bent === 'STRAIGHT')
      {
        
         let a = this.connectionPoints(s)
         let b = this.connectionPoints(e)
         let p = a[0]
         let q = b[0]
         
         let distance = Math.sqrt((q.x-p.x)*(q.x-p.x)+(q.y-p.y)*(q.y-p.y))
         
         if (distance === 0) return undefined
         for (let i = 0; i < a.length; i++){
            for (let j = 0; j < b.length; j++)
            {
               let d = Math.sqrt((b[j].x-a[i].x)*(b[j].x-a[i].x)+(b[j].y-a[i].y)*(b[j].y-a[i].y))
              
               if (d < distance)
               {
                  p = a[i]
                  q = b[j]
                  distance = d
                  
               }
            }
         }
         r.push(p)
         r.push(q)
      }
      else if (bent === 'HV')
      {
         let x1 = undefined
         let x2 = center(e).x
         let y1 = center(s).y
         let y2 = undefined
         if ((x2 + this.MIN_SEGMENT) <= s.x)
            x1 = s.x
         else if ((x2 - this.MIN_SEGMENT) >= (s.x +s.width))
            x1 = s.x +s.width
         else return undefined
         if ((y1 + this.MIN_SEGMENT) <= e.y)
            y2 = e.y
         else if ((y1 - this.MIN_SEGMENT) >= (e.y+e.height))
            y2 = e.y+e.height
         else return undefined
         r.push(new Point2D(x1, y1))
         r.push(new Point2D(x2, y1))
         r.push(new Point2D(x2, y2))
      }
      else if (bent === 'VH')
      {
          
         let x1 = center(s).x
         let x2 = undefined
         let y1 = undefined
         let y2 = center(e).y
         
         if ((x1 + this.MIN_SEGMENT) <= e.x)
            x2 = e.x
         else if ((x1 - this.MIN_SEGMENT) >= (e.x+e.width))
            x2 = e.x+e.width
         else return undefined
         if ((y2 + this.MIN_SEGMENT) <= s.y)
            y1 = s.y
         else if ((y2 - this.MIN_SEGMENT) >= (s.y+s.height))
            y1 = s.y + s.height
         else return undefined
         r.push(new Point2D(x1, y1))
         r.push(new Point2D(x1, y2))
         r.push(new Point2D(x2, y2))
         
      }
      else if (bent === 'HVH')
      {
         let x1 = undefined
         let x2 = undefined
         let y1 = center(s).y
         let y2 = center(e).y
         if (((s.x+s.width) + 2 * this.MIN_SEGMENT) <= e.x)
         {
            x1 = s.x+s.width
            x2 = e.x
         }
         else if (((e.x+e.width) + 2 * this.MIN_SEGMENT) <= s.x)
         {
            x1 = s.x
            x2 = e.x+e.width
         }
         else return undefined
         if (Math.abs(y1 - y2) <= this.MIN_SEGMENT)
         {
            r.push(new Point2D(x1, y2))
            r.push(new Point2D(x2, y2))
         }
         else
         {
            r.push(new Point2D(x1, y1))
            r.push(new Point2D((x1 + x2) / 2, y1))
            r.push(new Point2D((x1 + x2) / 2, y2))
            r.push(new Point2D(x2, y2))
         }
      }
      else if (bent === 'VHV')
      {
         let x1 = center(s).x
         let x2 = center(e).x
         let y1 = undefined
         let y2 = undefined
         if (((s.y+s.height) + 2 * this.MIN_SEGMENT) <= e.y)
         {
            y1 = s.y+s.height
            y2 = e.y
         }
         else if (((e.y+e.height) + 2 * this.MIN_SEGMENT) <= s.y)
         {
            y1 = s.y
            y2 = e.y+e.height

         }
         else return undefined
         if (Math.abs(x1 - x2) <= this.MIN_SEGMENT)
         {
            r.push(new Point2D(x2, y1))
            r.push(new Point2D(x2, y2))
         }
         else
         {
            r.push(new Point2D(x1, y1))
            r.push(new Point2D(x1, (y1 + y2) / 2))
            r.push(new Point2D(x2, (y1 + y2) / 2))
            r.push(new Point2D(x2, y2))
         }
      }
      else return undefined
      
      return r
   }

   /**
      Gets the points at which a line joining two rectangles
      is bent according to a bent style.
      @param s the starting and ending rectangle
   */
   getSelfPath(s){
      let r = new Array()
      let x1 = s.x + s.width * 3 / 4
      let y1 = s.y
      let y2 = s.y - this.SELF_HEIGHT
      let x2 = s.x + s.width + this.SELF_WIDTH
      let y3 = s.y + s.height / 4
      let x3 = s.x + s.width
      r.push(new Point2D(x1, y1));
      r.push(new Point2D(x1, y2));
      r.push(new Point2D(x2, y2));
      r.push(new Point2D(x2, y3));
      r.push(new Point2D(x3, y3));
      return r;
   }
}

// label class on segmented line edge
class label{
   constructor(){
      this.text = undefined
      this.font = 'serif'
      this.size = 15
      this.color = 'black'
      this.bounds = undefined
   }
   // paint method to draw label on canvas
   paint(x,y){
      const canvas = document.getElementById('editor')
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = 'black'
      ctx.save()
      ctx.font = '15px serif'
      //ctx.font = this.size+'px '+this.font
      ctx.fillText(this.text, x, y);
      ctx.restore()   
   }
   //set bounds of label
   setBounds(x, y, w, h){
      this.bounds = new Rectangle2D(x, y, w, h)
   }
}
