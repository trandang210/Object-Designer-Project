/**
   An edge that is shaped like a line with up to 
   three segments with an arrowhead
*/
class ClassRelationshipEdge extends SegmentedLineEdge{
  /**
      Constructs a straight edge.
   */
  constructor(){
    super()
    this.bentStyle = new BentStyle('STRAIGHT')
  }
  clone(){
   return new ClassRelationshipEdge()
 }

 /**
      Sets the bentStyle property
      @param newValue the bent style
   */
  setBentStyle(newValue){
     this.bentStyle.style = newValue
  }
  
  /**
      Gets the bentStyle property
      @return the bent style
   */
  getBenStyle(){
     return this.bentStyle.style
  }
  
  /**
      Gets the corner points of this segmented line edge
      @return an array list of Point2D objects, containing
      the corner points
   */
  getPoints(){
   
     return this.bentStyle.getPath(this.start.getBounds(), this.end.getBounds())
  }

  popup () {
   //document.getElementById('benStyle').value = this.bentStyle.style
   let dialog = document.getElementById('edgedialog')
   dialog.style.display = 'table'
 }
  
}
