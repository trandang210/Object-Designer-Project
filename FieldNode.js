/**
 * A field node in the object diagram
 * @class
 * @augments RectangularNode
 */
class FieldNode extends RectangularNode {
  /**
   * Construct a field node with default name and value
   * @constructs
   * @property {string} name the name of field
   * @property {string} value the value of the field
   * @property {number} totalWidth the total width of the string text
   */
  constructor () {
    super()
    this.name = 'name'
    this.value = 'value'
    this.boxWidth
    this.bounds = { x: 0, y: 0, width: 84, height: 25 }
    this.totalWidth
  }

  /**
   * Draws the field node
   */
  draw () {
    const canvas = document.getElementById('editor')
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'black'
    ctx.font = '12px sans-serif'
    ctx.textAlign = 'center'
    const leftWidth = ctx.measureText(this.name).width
    const equal = ' = '
    const midWidth = ctx.measureText(equal).width
    const rightWidth = ctx.measureText(this.value).width
    this.totalWidth = leftWidth + midWidth + rightWidth
    if (this.totalWidth > this.bounds.width) this.bounds.width = this.totalWidth + 10
    ctx.fillText(this.name + equal + this.value, this.getBounds().x + this.getBounds().width / 2
      , this.getBounds().y + this.getBounds().height / 2 + 6)
  }

  /**
   * Adds the edge at this node
   * @param {object} e the given edge to add
   * @param {object} p1 the first connection point 
   * @param {object} p2 the second connection point
   * @return {boolean} true if the edge is added 
   */
  addEdge (e, p1, p2) {
    if (e instanceof ObjectReferenceEdge && e.end instanceof ObjectNode) {
      this.value = ' '
      return true
    }
    return false
  }

  /**
   * Adds a node as a child node to this node
   * @param {object} n the children node to add
   * @param {object} p 
   * @return {boolean} true if the children node is a point node
   */
  addNode (n, p) {
    if (n instanceof PointNode) return true
  }

  /**
   * Gets the best connection point to connect to another node
   * @param {object} d the direction of the other node
   * @return {object} the best connection point of the node
   */
  getConnectionPoint (d) {
    return { x: this.getBounds().x + this.getBounds().width - 10,
      y: this.getBounds().y + this.bounds.height / 2 }
  }

  /**
   * clone a field node
   */
  clone () {
    return new FieldNode()
  }

  /**
   * Shows the dialog for the node properties
   */
  popup () {
    document.getElementById('fieldname').value = this.name
    document.getElementById('fieldvalue').value = this.value
    let dialog = document.getElementById('fielddialog')
    dialog.style.display = 'table'
  }
}
