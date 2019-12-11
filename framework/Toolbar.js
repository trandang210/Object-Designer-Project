/**
 * A toolbar with function buttons
 * @class
 */
class Toolbar {
  /**
   * Constructs the toolbar with default size
   * @constructs
   * @property {number} height the height of the toolbar
   * @property {width} width the width of the toolbar
   * @property {object} buttons a collection of buttons in the toolbar
   * @property {object} tools a collection of tools in the toolbar
   * @property {number} x the x coordinate
   * @property {number} y the y coordinate
   * @property {number} buttonsize the size for the buttons
   * @property {number} gap the gap between each button
   * @property {object} graph the graph of the toolbar
   * @property {object} pressedbutton the pressed button in the toolbar
   * @property {number} offset the offset for icon in the button
   * @param {object} g the given graph
   */
  constructor (g) {
    this.height = 60
    this.width = document.getElementById('editor').getAttribute('width')
    this.buttons = []
    this.tools = []
    this.x = 0
    this.y = 10
    this.buttonsize = 40
    this.gap = 10
    this.graph = g
    this.pressedbutton = undefined
    this.offset = 4
  }

  /**
   * Draws the toolbar with buttons
   */
  draw () {
    const canvas = document.getElementById('editor')
    const ctx = canvas.getContext('2d')
    const toolbar = ctx.createLinearGradient(0, 0, 0, this.height)
    toolbar.addColorStop(0, '#4f5f7d')
    toolbar.addColorStop(1, '#333d51')
    this.width = document.getElementById('editor').getAttribute('width')
    const num = this.buttons.length
    if (num % 2 === 1) { this.x = this.width / 2 - ((num - 1) / 2) * (this.buttonsize + this.gap) } else this.x = this.width / 2 - (num / 2) * (this.buttonsize + this.gap)
    let starter = this.x
    for (let i = 0; i < this.buttons.length; i++) { // re-set the buttons position
      this.buttons[i].x = starter
      this.buttons[i].y = this.y
      starter += this.buttonsize + this.gap
    }
    ctx.fillStyle = toolbar
    ctx.fillRect(0, 0, this.width, this.height)
    // this.layout()
    for (let i = 0; i < this.buttons.length; i++) { // draw everything
      this.buttons[i].draw()
    }
  }

  /**
   * Center allign the buttons group
   */
  layout () { 
    this.grabberbutton() // add grabber
    for (let i = 0; i < this.graph.getNodePrototypes().length; i++) { // add node prototypes
      this.nodebutton(this.graph.getNodePrototypes()[i])
    }
    for (let i = 0; i < this.graph.getEdgePrototypes().length; i++) { // add node prototypes
      this.edgebutton(this.graph.getEdgePrototypes()[i])
    }
    const num = this.buttons.length
    if (num % 2 === 1) { this.x = this.width / 2 - ((num - 1) / 2) * (this.buttonsize + this.gap) } else this.x = this.width / 2 - (num / 2) * (this.buttonsize + this.gap)
    let starter = this.x
    for (let i = 0; i < this.buttons.length; i++) { // re-set the buttons position
      this.buttons[i].x = starter
      this.buttons[i].y = this.y
      starter += this.buttonsize + this.gap
    }
  }

  /**
   * Constructs a grabber button
   */
  grabberbutton () { 
    const size = this.buttonsize
    const offset = 10
    let icon = new Icon()
    icon.draw = function () {
      drawGrabber(this.x + offset, this.y + offset)
      drawGrabber(this.x + offset, this.y + size - offset)
      drawGrabber(this.x + size - offset, this.y + offset)
      drawGrabber(this.x + size - offset, this.y + size - offset)
    }
    const grabber = new Button(0, 0, this.buttonsize, icon)
    this.buttons.push(grabber)
    this.tools.push('grab')
  }

  /**
   * Contructs a node button 
   * @param {object} n the given node to draw the icon on the button
   */
  nodebutton (n) {
    let icon = new Icon()
    const offset = this.offset
    const iconwidth = n.getBounds().width
    const iconheight = n.getBounds().height
    const scalex = (this.buttonsize - 4 * this.offset) / iconwidth
    const scaley = (this.buttonsize - 4 * this.offset) / iconheight
    icon.draw = function () {
      const canvas = document.getElementById('editor')
      const ctx = canvas.getContext('2d')
      ctx.save()
      ctx.translate(this.x + 2 * offset, this.y + 2 * offset)
      ctx.scale(scalex, scaley)
      n.draw()
      n.draw()
      // translate(Math.max((height - width) / 2, 0), Math.max((width - height) / 2, 0));
      ctx.restore()
    }
    const node = new Button(0, 0, this.buttonsize, icon)
    this.buttons.push(node)
    this.tools.push(n)
  }

  /**
   * Contructs a edge button 
   * @param {object} e the given edge to draw the icon on the button
   */
  edgebutton (e) {
    let icon = new Icon()
    let p = new PointNode()
    p.translate(this.offset, this.offset)
    let q = new PointNode()
    q.translate(this.buttonsize - this.offset, this.buttonsize - this.offset)
    e.connect(p, q)
    let line = new Path2D()
    line.moveTo(e.start.x, e.start.y)
    line.lineTo(e.end.x, e.end.y)
    const offset = this.offset
    const scalex = (this.buttonsize - this.offset) / this.buttonsize
    const scaley = (this.buttonsize - this.offset) / this.buttonsize
    icon.draw = function () {
      const canvas = document.getElementById('editor')
      const ctx = canvas.getContext('2d')
      ctx.save()
      ctx.translate(this.x + offset, this.y + offset)
      ctx.scale(scalex, scaley)
      ctx.lineWidth = 1.5
      e.draw()
      ctx.restore()
    }
    const edge = new Button(0, 0, this.buttonsize, icon)
    this.buttons.push(edge)
    this.tools.push(e)
  }

  /**
   * Check the given point is contained in any button
   * @param {object} p a given point 
   * @return {object} the tool of the button if the point is contained
   */
  getSelectedTool (p) {
    let tool
    for (let i = 0; i < this.buttons.length; i++) {
      if (this.buttons[i].isSelected(p)) {
        this.buttons[i].ischosen = true
        this.pressedbutton = this.buttons[i]
        tool = this.tools[i]
      } else this.buttons[i].ischosen = false
    }
    return tool
  }
}
