/**
   This class defines line styles of various shapes.
*/
class LineStyle extends SerializableEnumeration{
  //@param s is a string describe style of line 
  constructor(s){
       super()
      this.style = s
   }
   /**
      Gets a stroke with which to draw this line style.
      @return the style to strokes this line style
   */
   getStyle(){
      if (this.style === 'DOTTED') return [2,5]
      return []
   }
}
