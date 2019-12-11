/**
 * Defines a note node in the object diagram
 * @class
 * @augments RectangularNode
 */
class NoteNode extends RectangularNode {
  /**
   * Constructs a note node with default name and color
   * @constructs
   * @property {object} bounds the bounding rectangle of the node
   * @property {string} objname the content of the note node
   * @property {string} color the color of the node
   */
  constructor () {
    super()
    this.bounds = { x: 0, y: 0, width: 60, height: 40 }
    this.objname = ' '
    this.color = '#ffff99'
  }

  /**
   * Adds the edge at this node
   * @param {object} e the given edge to add
   * @param {object} p1 the first connection point 
   * @param {object} p2 the second connection point
   * @return {boolean} true if the edge is added 
   */
  addEdge (e, p1, p2) {
    let end = new PointNode()
    end.translate(p2.x, p2.y)
    e.connect(this, end)
    return super.addEdge(e, p1, p2)
  }

  /**
   * Notifies this node that an edge is being removed
   * @param {object} g the graph that the node is drawn on 
   * @param {object} e the edge to be removed 
   */
  removeEdge (g, e) {
    if (e.start === this) e.end.needremove = true
  }
  
  /**
   * Draws the note node with the content
   */
  draw () {
    // super.draw()
    const canvas = document.getElementById('editor')
    const ctx = canvas.getContext('2d')
    // draw the text
    const text = ctx.measureText(this.objname)
    if (text.width > this.getBounds().width) this.bounds.width = text.width + 10
    let path = this.getShape()
    ctx.fillStyle = this.color
    ctx.fill(path)
    ctx.fillStyle = 'black'
    ctx.font = '12px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(this.objname, this.getBounds().x + this.getBounds().width / 2
      , this.getBounds().y + this.getBounds().height / 2 + 7.5)
    ctx.stroke(path)
    // draw the fold
    let fold = new Path2D()
    fold.moveTo(this.bounds.x + this.bounds.width - 8
      , this.bounds.y)
    fold.lineTo(this.bounds.x + this.bounds.width - 8
      , this.bounds.y + 8)
    fold.lineTo(this.bounds.x + this.bounds.width,
      this.bounds.y + 8)
    fold.closePath()
    ctx.stroke(fold)
    ctx.fillStyle = 'white'
    ctx.fill(fold)
  }

  /**
   * Gets the shape of the node
   * @return {object} the 2D path of the shape
   */
  getShape () {
    let path = new Path2D()
    path.moveTo(this.bounds.x, this.bounds.y)
    path.lineTo(this.bounds.x + this.bounds.width - 8
      , this.bounds.y)
    path.lineTo(this.bounds.x + this.bounds.width
      , this.bounds.y + 8)
    path.lineTo(this.bounds.x + this.bounds.width
      , this.bounds.y + this.bounds.height)
    path.lineTo(this.bounds.x, this.bounds.y + this.bounds.height)
    path.closePath()
    return path
  }

  /**
   * Clones a note node
   * @return the note node
   */
  clone () {
    return new NoteNode()
  }

  /**
   * Show the dialog for the node properties
   */
  popup () {
    document.getElementById('notename').value = this.objname
    let dialog = document.getElementById('notedialog')
    dialog.style.display = 'table'
  }
}