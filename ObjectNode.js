/**
 * A class defines an object node in the object diagram
 * @class
 * @augments RectangularNode
 */
class ObjectNode extends RectangularNode {
  /**
   * Construct an object node with a default size and empty name
   * @constructs
   * @property {object} bounds the bounding rectangle of node
   * @property {string} objname the name of the node
   */
  constructor () {
    super()
    this.bounds = { x: 0, y: 0, width: 80, height: 60 } 
    this.objname = ' '
  }

  /**
   * Draws the node with name
   */
  draw () {
    const canvas = document.getElementById('editor')
    const ctx = canvas.getContext('2d')

    const text = ctx.measureText(this.objname) //measure length of the text
    ctx.fillStyle = 'black'
    ctx.font = '15px sans-serif'
    ctx.textAlign = 'center'
    const fields = this.children

    if (text.width > this.getBounds().width) this.bounds.width = text.width + 6 //adjust length of the node if the text is longer

    //check the length of child node
    for (let i = 0;i< fields.length; i++) {
      const leftWidth = ctx.measureText(fields[i].name).width
      const midWidth = ctx.measureText(' = ').width
      const rightWidth = ctx.measureText(fields[i].value).width
      const totalWidth = leftWidth + midWidth + rightWidth
      if (totalWidth > fields[i].bounds.width) fields[i].bounds.width = totalWidth + 6 //adjust length of child node if the text is longer
      if (fields[i].bounds.width > this.bounds.width) this.bounds.width = fields[i].bounds.width //adjust length of the node if child node's length is longer
    }
 
    //top rectangle of the node
    let top = { x: this.getBounds().x, y: this.getBounds().y, width: this.getBounds().width, height: 60 }

    //set underline for text
    let underline = new Path2D()
    underline.moveTo(top.x+top.width/2-text.width/2,top.y+top.height/2+ 10.5)
    underline.lineTo(top.x+top.width/2 +text.width/2,top.y+top.height/2+ 10.5)

    //draw text and underline
    ctx.fillText(this.objname, top.x + top.width / 2
      , top.y + top.height / 2 + 7.5)
    if (this.objname !== ' ') ctx.stroke(underline)

    //draw the top rectangle
    ctx.strokeRect(top.x, top.y, top.width, top.height)
    let fieldheight = 0

    //draw child node
    let start = { x: this.getBounds().x, y: this.getBounds().y + top.height }
    for (let i = fields.length - 1; i >= 0; i--) {
      fields[i].bounds.x = start.x
      fields[i].bounds.y = start.y
      fields[i].bounds.width = this.getBounds().width
      ctx.strokeRect(start.x, start.y, this.getBounds().width, fields[i].getBounds().height)
      start.y += fields[i].getBounds().height
      fieldheight += fields[i].getBounds().height
    }
    this.bounds.height = top.height + fieldheight
  }

  /**
   * Shows the dialog box for the node properties
   */
  popup () {
    document.getElementById('objname').value = this.objname
    let dialog = document.getElementById('namedialog')
    dialog.style.display = 'table'
  }

/**
   * Adds the edge at this node
   * @param {object} e the given edge to add
   * @param {object} p1 the first connection point 
   * @param {object} p2 the second connection point
   * @return {boolean} true if the edge is added 
   */
  addEdge (edge, p1, p2) {
    if (edge instanceof ClassRelationshipEdge && edge.end !== undefined) {
      return true
    }
  }

 /**
   * Gets the best connection point to connect to another node
   * @param {object} d the direction of the other node
   * @return {object} the best connection point of the node
   */
  getConnectionPoint (d) {
    if (d.x > 0) { return { x: this.getBounds().x + this.getBounds().width, y: this.getBounds().y + this.bounds.height / 2 } } else { return { x: this.getBounds().x, y: this.getBounds().y + this.bounds.height / 2 } }
  }

  /**
   * Clones an object node
   * @return the object node
   */
  clone () {
    let cloned = new ObjectNode()
    return cloned
  }

  /**
   * Adds a node as a child node to this node
   * @param {object} n the children node to add
   * @param {object} p the point loctation the node is added
   * @return {boolean} true if the node is added
   */
  addNode (n, p) {
    const fields = this.children
    if (n instanceof PointNode) return true
    if ((n instanceof FieldNode) !== true) return false
    if (fields.includes(n)) return true
    let i = 0
    while (i < fields.length && fields[i].getBounds().y < p.y) i++
    this.addChild(i, n)
    return true
  }
}
