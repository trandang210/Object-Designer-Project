/**
 * A class creates a node that has rectangular shape
 * @class
 * @abstract
 */
class RectangularNode {
  /**
   * Constructs a rectangular shape node
   * @constructs
   * @property {object} children the list of children node
   * @property {object} parent the parent of this node
   * @property {object} bounds the rectangular bound outside the node
   * @property {boolean} needremove defines if the node need to be removed
   */
  constructor () {
    this.children = []
    this.parent = undefined
    this.bounds = undefined
    this.needremove = false
  }

  /**
   * Translate the node with its children by given distance
   * @param {number} dx the amount of horizontal distance
   * @param {number} dy the amound of vertical distance
   */
  translate (dx, dy) { 
    this.bounds.x += dx
    this.bounds.y += dy

    for (let i = 0; i < this.children.length; i++) {
      let n = this.children[i]
      n.translate(dx, dy)
    }
  }

  /**
   * Tests whether the node contains a point
   * @param {object} aPoint the point to test
   * @return {boolean} true if the test point inside the node
   */
  contains (aPoint) {
    if (aPoint.x > this.bounds.x && aPoint.x < this.bounds.x + this.bounds.width &&
          aPoint.y > this.bounds.y && aPoint.y < this.bounds.y + this.bounds.height) return true
  }

  /**
   * Gets the best connection point to connect to another node
   * @param {object} d the direction of the other node
   * @return {object} the best connection point of the node
   */
  getConnectionPoint (d) { 
    const slope = this.bounds.height / this.bounds.width
    const ex = d.x // d is the direction
    const ey = d.y
    let x = this.bounds.width / 2 + this.bounds.x
    let y = this.bounds.height / 2 + this.bounds.y
    if (ex !== 0 && -slope <= ey / ex && ey / ex <= slope) {
      // intersects at left or right boundary
      if (ex > 0) {
        x = this.bounds.x + this.bounds.width
        y += (this.bounds.width / 2) * ey / ex
      } else {
        x = this.bounds.x
        y -= (this.bounds.width / 2) * ey / ex
      }
    } else if (ey !== 0) {
      // intersects at top or bottom
      if (ey > 0) {
        x += (this.bounds.height / 2) * ex / ey
        y = this.bounds.y + this.bounds.height
      } else {
        x -= (this.bounds.height / 2) * ex / ey
        y = this.bounds.y
      }
    }
    return { x: x, y: y }
  }

  /**
   * Gets the bounding rectangle (its clone in this case)
   * @return {object} the cloned version of the bounding rectangle
   */
  getBounds () { 
    let cloned = Object.assign({}, this.bounds)
    return cloned
  }

  /**
   * Adds the edge at this node
   * @param {object} e the given edge to add
   * @param {object} p1 the first connection point 
   * @param {object} p2 the second connection point
   * @return {boolean} true if the edge is added 
   */
  addEdge (e, p1, p2) {  
    if (e.end !== undefined) return true
  }

  /**
   * Adds a node as a child node to this node
   * @param {object} n the children node to add
   * @param {object} p 
   * @return {boolean} false
   */
  addNode (n, p) { 
    return false
  }

  /**
   * Notifies this node that an edge is being removed
   * @param {object} g the graph that the node is drawn on 
   * @param {object} e the edge to be removed 
   */
  removeEdge (g, e) { e.needremove = true } 

  /**
   * Notifies this node that a node is being removed
   * @param {object} g the graph that the node is drawn on 
   * @param {object} n the node to be removed 
   */
  removeNode (g, n) { 
    if (n === this.parent) {
      this.parent = undefined
      this.needremove = true
    }
    if (n.parent === this) {
      for (let i = 0; i < this.children.length; i++) {
        if (this.children[i] === n) this.children.splice(i, 1)
      }
    }
  }

  /**
   * Add a children node to this node
   * @param {number} index the index number to add
   * @param {object} node the given node to add 
   */
  addChild (index, node) {
    let oldParent = this.parent
    if (oldParent !== undefined) { oldParent.removeChild(node) }
    this.children.push(node)
    node.parent = this
  }

  /**
   * Remove the child node of this node
   * @param {object} node the child node to be removed 
   */
  removeChild (node) {
    if (node.parent !== this) return undefined
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i] === node) this.children.splice(i, 1)
    }
    node.parent = undefined /////////////////////////break encapsulation
  }

  /**
   * Clone the current node
   * @return {object} the cloned version
   */
  clone () {
    let cloned = Object.assign({}, this)
    cloned.children = [this.children.length]
    for (let i = 0; i < this.children.length; i++) {
      let n = n.children[i]
      cloned.children[i] = n.clone()
      n.parent = cloned
    }
    cloned.bounds = this.getBounds()
    return cloned
  }
}
