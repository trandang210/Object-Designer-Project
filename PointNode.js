/**
 * A node which is a point
 * @class
 */
class PointNode {
  /**
   * Construct a point
   * @constructs
   * @property {number} x the x-location of the node
   * @property {number} y the y-location of the node
   * @property {boolean} needremove defines if the node need to be removed
   */
  constructor () {
    this.x = 0
    this.y = 0
    this.needremove = false
  }

  /**
   * Draws the point node
   */
  draw () {}

  /**
   * Translate the node by a given distance
   * @param {number} dx the x distance need to translate
   * @param {number} dy the y distance need to translate
   */
  translate (dx, dy) {
    this.x += dx
    this.y += dy
  }

  /**
   * Tests whether a point is near the point node
   * @param {object} p the given point
   * @return {boolean} true if the given point is inside
   */
  contains (p) {
    const THRESHOLD = 5
    if (Math.abs(this.x - p.x) < THRESHOLD && Math.abs(this.y - p.y)) return true
  }

  /**
   * Gets the bound of the node
   * @return {object} a point with same location with the node
   */
  getBounds () { 
    return { x: this.x, y: this.y, width: 0, height: 0 }
  }

  /**
   * Gets the connection point of the node
   * @param {object} d 
   * @return the node itself
   */
  getConnectionPoint (d) { return this }
}
