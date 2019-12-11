/**
 * Adds an event listener when the DOM content is loaded
 * Draws the graph and toolbar when the content is loaded
 * @param {string} DOMContentLoaded 
 * @param {function} function
 */
document.addEventListener('DOMContentLoaded', function () {
  const graph = new Graph()
  const toolbar = new Toolbar(graph)
  toolbar.layout()
  const canvas = document.getElementById('editor')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  toolbar.draw()
  graph.draw()

  const panel = document.getElementById('editor')
  let selected
  let toolpressed
  let dragStartPoint
  let dragStartBounds
  let rubberBandStart
  let lastMousePoint
  let index = 0

  /**
   * Repaints the graph and toolbar
   */
  function repaint () {
    const canvas = document.getElementById('editor')
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    graph.draw()
    toolbar.draw()

    if (selected instanceof RectangularNode) {
      const bounds = selected.getBounds()
      drawGrabber(bounds.x, bounds.y)
      drawGrabber(bounds.x + bounds.width, bounds.y)
      drawGrabber(bounds.x, bounds.y + bounds.height)
      drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
    }
    if (selected instanceof ShapeEdge) {
      const line = selected.getConnectionPoints()
      drawGrabber(line.start.x, line.start.y)
      drawGrabber(line.end.x, line.end.y)
    }
    if (rubberBandStart !== undefined) {
      ctx.beginPath()
      ctx.moveTo(rubberBandStart.x, rubberBandStart.y)
      ctx.lineTo(lastMousePoint.x, lastMousePoint.y)
      ctx.fillStyle = 'purple'
      ctx.stroke()
    }
  }

  /**
   * Gets the mouse location
   * @param {object} event
   * @return {object} the mouse location
   */
  function mouseLocation (event) {
    var rect = panel.getBoundingClientRect()

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }

  /**
   * Adds an event listener
   * The callback function is called when the mouse is pressed
   * @param {string} mousedown type of event
   * @param {object} event 
   */
  panel.addEventListener('mousedown', event => {
    let mousePoint = mouseLocation(event)
    let n = graph.findNode(mousePoint)
    let e = graph.findEdge(mousePoint)
    let selectedtool = toolbar.getSelectedTool(mousePoint)
    if (selectedtool !== undefined) toolpressed = selectedtool // click on toolbar buttons
    else { // click on canvas
      if (toolpressed !== undefined) toolbar.pressedbutton.ischosen = true
      if (toolpressed === undefined || toolpressed === 'grab') {
        if (e !== undefined) selected = e // choose exist edge
        else if (n !== undefined) { // choose exist node
          selected = n
          dragStartPoint = mousePoint
          dragStartBounds = n.getBounds()
        } else selected = undefined // choose nothing
      }
      if (toolpressed instanceof RectangularNode) {
        let prototype = toolpressed
        let newNode = prototype.clone()
        let add = graph.add(newNode, mousePoint)
        if (add) {
          selected = newNode
          dragStartPoint = mousePoint
          dragStartBounds = newNode.getBounds()
        } else if (n !== undefined) {
          selected = n
          dragStartPoint = mousePoint
          dragStartBounds = n.getBounds()
        }
      } else if (toolpressed instanceof ShapeEdge) {
        if (n !== undefined) rubberBandStart = mousePoint
      }
      lastMousePoint = mousePoint
      repaint()
    }
  })

  /**
   * Adds an event listener
   * The callback function is called when the mouse is double clicked
   * @param {string} dblclick type of event
   * @param {object} event 
   */
  panel.addEventListener('dblclick', event => {
    let mousePoint = mouseLocation(event)
    selected = graph.findNode(mousePoint)
    if (selected !== undefined) {
      if (selected instanceof ObjectNode) {
        selected.popup()
        let ok = document.getElementById('ok')
        ok.addEventListener('click', event => {
          selected.objname = document.getElementById('objname').value
          document.getElementById('namedialog').style.display = 'none'
          repaint()
        })
        let cancel = document.getElementById('cancel')
        cancel.addEventListener('click', event => {
          document.getElementById('namedialog').style.display = 'none'
          repaint()
        })
      } else if (selected instanceof NoteNode) {
        selected.popup()
        let ok = document.getElementById('ok2')
        ok.addEventListener('click', event => {
          selected.objname = document.getElementById('notename').value
          selected.color = document.getElementById('color').value
          document.getElementById('notedialog').style.display = 'none'
          repaint()
        })
        let cancel = document.getElementById('cancel2')
        cancel.addEventListener('click', event => {
          document.getElementById('notedialog').style.display = 'none'
          repaint()
        })
      } else if (selected instanceof FieldNode) {
          selected.popup()
          let ok = document.getElementById('ok3')
          ok.addEventListener('click', event => {
          selected.name = document.getElementById('fieldname').value
          selected.value = document.getElementById('fieldvalue').value
          document.getElementById('fielddialog').style.display = 'none'
          repaint()
          })
          let cancel = document.getElementById('cancel3')
          cancel.addEventListener('click', event => {
          document.getElementById('fielddialog').style.display = 'none'
          repaint()
          })
        } 
      }  else {
        selected = graph.findEdge(mousePoint)
        if (selected !== undefined) {
          selected.popup()
          let ok = document.getElementById('submit')
          ok.addEventListener('click', event => {
            selected.bentStyle.style = document.getElementById('benStyle').value
            selected.setStartArrowHead(document.getElementById('startArrowHead').value)
            selected.setEndArrowHead(document.getElementById('endArrowHead').value)
            selected.setStartLabel(document.getElementById('startLabel').value)
            selected.setMiddleLabel(document.getElementById('middleLabel').value)
            selected.setEndLabel(document.getElementById('endLabel').value)
            selected.setLineStyle(document.getElementById('linestyle').value)
            document.getElementById('edgedialog').style.display = 'none'
            repaint()
          })
          let cancel = document.getElementById('cancel1')
          cancel.addEventListener('click', event => {
            document.getElementById('edgedialog').style.display = 'none'
            repaint()
          })
        }   
      } 
    })


  function reportWindowSize () {

  }

  function reportWindowSize () {
    const canvas = document.getElementById('editor')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    graph.draw()
    toolbar.draw()
  }
  window.onresize = reportWindowSize

  /**
   * Adds an event listener
   * The callback function is called when the mouse is moved
   * @param {string} mousemove type of event
   * @param {object} event 
   */
  panel.addEventListener('mousemove', event => {
    let mousePoint = mouseLocation(event)
    if (dragStartBounds !== undefined) {
      if (selected instanceof RectangularNode) {
        let n = selected
        let bounds = n.getBounds()
        n.translate(dragStartBounds.x - bounds.x +
                        mousePoint.x - dragStartPoint.x,
        dragStartBounds.y - bounds.y +
                        mousePoint.y - dragStartPoint.y)
      }
    }
    lastMousePoint = mousePoint
    repaint()
  })

  /**
   * Adds an event listener
   * The callback function is called when the mouse is released
   * @param {string} mouseup type of event
   * @param {object} event 
   */
  panel.addEventListener('mouseup', event => {
    if (rubberBandStart !== undefined) {
      let mousePoint = mouseLocation(event)
      let prototype = toolpressed
      let newEdge = prototype.clone()
      if (graph.connect(newEdge, rubberBandStart, mousePoint)) selected = newEdge
    }
    rubberBandStart = undefined
    repaint()
    lastMousePoint = undefined
    dragStartBounds = undefined
  })

  /**
   * Adds an event listener
   * The callback function is called when a key is pressed
   * @param {string} keydown type of event
   * @param {object} event 
   */
  panel.addEventListener('keydown', (event) => {
    const keyname = event.key
    if (keyname === 'Delete' || keyname === 'Backspace') {
      if (selected instanceof RectangularNode) {
        graph.removeNode(selected)
      } else if (selected instanceof ShapeEdge) {
        graph.removeEdge(selected)
      }
      selected = undefined
    }
  
    if (keyname === 'e'){
      if (graph.edges[index] ===undefined) index =0 
      selected =graph.edges[index]
      index++
      repaint()
    }
    if(keyname ==='Enter'){
      if (selected !== undefined||selected instanceof ShapeEdge) {
        selected.popup()
        let ok = document.getElementById('submit')
        ok.addEventListener('click', event => {
          selected.bentStyle.style = document.getElementById('benStyle').value
          selected.setStartArrowHead(document.getElementById('startArrowHead').value)
          selected.setEndArrowHead(document.getElementById('endArrowHead').value)
          selected.setStartLabel(document.getElementById('startLabel').value)
          selected.setMiddleLabel(document.getElementById('middleLabel').value)
          selected.setEndLabel(document.getElementById('endLabel').value)
          selected.setLineStyle(document.getElementById('linestyle').value)
          document.getElementById('edgedialog').style.display = 'none'
          repaint()
        })
        let cancel = document.getElementById('cancel1')
        cancel.addEventListener('click', event => {
          document.getElementById('edgedialog').style.display = 'none'
          repaint()
        })
      }
    }
    repaint()
  }, false)
})
