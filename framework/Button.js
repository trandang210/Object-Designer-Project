/**
 * Defines a button with icon
 * @class
 */
class Button {
  /**
   * Construct a button with given size
   * @property {number} x the x coordinate of the button
   * @property {number} y the y coordinate of the button
   * @property {number} size the size of the button
   * @property {boolean} ischosen determines if the button is chosen
   * @property {object} icon the icon of the button
   * @param {number} x the given x location 
   * @param {number} y the given y location
   * @param {number} size the given size for the button
   * @param {object} icon the given icon 
   */
  constructor (x, y, size, icon) {
    this.x = x
    this.y = y
    this.size = size
    this.ischosen = false
    this.icon = icon
  }

  /**
   * Checks if the given point is inside the button
   * @param {object} p the given point
   * @return {boolean} true if the point is inside the button
   */
  isSelected (p) {
    if (p.x > this.x && p.x < this.x + this.size &&
       p.y > this.y && p.y < this.y + this.size) {
      this.ischosen = true
      return true
    }
  }

  /**
   * Changes the color if the button is chosen
   * @return {string} the color for the button
   */
  chosen () {
    if (this.ischosen === true) return '#d3ac2b'
    else return '#f2e6bf'
  }
  
  /**
   * Draws the button with the icon
   */
  draw () {
    this.icon.x = this.x
    this.icon.y = this.y
    const canvas = document.getElementById('editor')
    const ctx = canvas.getContext('2d')
    const button = new Path2D()
    // ctx.moveTo(this.x,this.y)
    button.moveTo(this.x, this.y + 10)
    button.lineTo(this.x, this.y + this.size - 10)
    button.quadraticCurveTo(this.x, this.y + this.size, this.x + 10, this.y + this.size)
    button.lineTo(this.x + this.size - 10, this.y + this.size)
    button.quadraticCurveTo(this.x + this.size, this.y + this.size, this.x + this.size, this.y + this.size - 10)
    button.lineTo(this.x + this.size, this.y + 10)
    button.quadraticCurveTo(this.x + this.size, this.y, this.x + this.size - 10, this.y)
    button.lineTo(this.x + 10, this.y)
    button.quadraticCurveTo(this.x, this.y, this.x, this.y + 10)
    if (this.ischosen !== true) {
      ctx.fillstyle = this.chosen()
      ctx.fill(button)
      ctx.save()
      ctx.translate(3, 3)
      const shadow = new Path2D(button)
      ctx.fillStyle = '#1d232f'
      ctx.fill(shadow)
      ctx.restore()
      ctx.fillStyle = this.chosen()
      ctx.fill(button)
      this.icon.draw()
    } else {
      ctx.save()
      ctx.translate(2, 2)
      ctx.fillStyle = this.chosen()
      ctx.fill(button)
      this.icon.draw()
      ctx.restore()
    }
  }
}
