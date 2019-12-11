/**
 * Defines a graph
 * @class
 */
class Graph {
  /**
   * Constructs a graph with nodes and edges
   * @constructs
   * @property {object} nodes the collection of nodes in the graph
   * @property {object} edges the collection of edges in the graph
   */
  constructor () {
    this.nodes = []
    this.edges = []
  }

  /**
   * Connects an edge with 2 nodes 
   * @param {object} e the given edge
   * @param {object} p1 the point of node 1
   * @param {object} p2 the point of node 2
   * @return {boolean} true if an edge is added
   */
  connect (e, p1, p2) {
    let n1 = this.findNode(p1)
    let n2 = this.findNode(p2)

    if (n1 !== undefined) {
      e.connect(n1, n2)
      if (n1.addEdge(e, p1, p2) && e.end !== undefined) {
        this.edges.push(e)
        if (this.nodes.includes(e.end) === false) this.nodes.push(e.end)
        return true
      }
    }
    return false
  }

  /**
   * Adds a node to the graph
   * @param {object} n the given node to add
   * @param {object} p the given point location to add node
   * @return {boolean} true if the node is added 
   */
  add (n, p) { 
    let bounds = n.getBounds()
    n.translate(p.x - bounds.x,
      p.y - bounds.y)

    let accepted = false
    let insideANode = false
    for (let i = this.nodes.length - 1; i >= 0 && accepted === false; i--) {
      let parent = this.nodes[i]
      if (parent.contains(p)) {
        insideANode = true
        if (parent.addNode(n, p)) accepted = true
      }
    }
    if (insideANode && accepted === false) return false
    this.nodes.push(n)
    return true
  }

  /**
   * Finds the node that contains the given point
   * @param {object} p the given point
   * @return {object} the node if found
   */
  findNode (p) {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      let n = this.nodes[i]
      if (n.contains(p)) return n
    }
    return undefined
  }

  /**
   * Finds the edge that contains the given point
   * @param {object} p the given point
   * @return {object} the edge if found
   */
  findEdge (p) {
    for (let i = this.edges.length - 1; i >= 0; i--) {
      let e = this.edges[i]
      if (e.contains(p)) return e
    }
    return undefined
  }

  /**
   * Draws all the nodes and edges of the graph
   */
  draw () { 
    for (const n of this.nodes) {
      n.draw()
    }
    for (const e of this.edges) {
      e.draw()
    }
  }

  /**
   * Remove a node in the graph
   * @param {object} n the node to be removed
   * 
   */
  removeNode (n) {
    n.needremove = true
    for (let i = 0; i < this.nodes.length; i++) {
      const n2 = this.nodes[i]
      if (n2 instanceof PointNode !== true) {
        n2.removeNode(this, n)
      }
    }
    for (let i = 0; i < this.edges.length; i++) {
      const e = this.edges[i]
      if (e.start === n || e.end === n) this.removeEdge(e) //////////////////////remove node with edge
      for (let j =0;j<n.children.length;j++){
        const n2 = n.children[j]
        if (e.start === n2 || e.end === n2) this.removeEdge(e)//remove edges of its children with 
      }
    }
    let i = 0
    while (i < this.nodes.length) {
      if (this.nodes[i].needremove === true) {
        this.nodes.splice(i, 1)
      } else i++
    }
    i = 0
    while (i < this.edges.length) {
      if (this.edges[i].needremove === true) {
        this.edges.splice(i, 1)
      } else i++
    }
  }

  /**
   * Removes an edge in the graph
   * @param {object} e the given edge
   */
  removeEdge (e) {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      const n = this.nodes[i]
      if (n instanceof NoteNode) n.removeEdge(this, e)
    }
    e.needremove = true
    //need to add one more loop in here to splice all edges with needremove tag
  }

  /**
   * Gets the node protoypes for the graph
   * @return the collection of node prototypes
   */
  getNodePrototypes () {
    const nodeTypes = []
    const object = new ObjectNode()
    const field = new FieldNode()
    const note = new NoteNode()
    nodeTypes.push(object)
    nodeTypes.push(field)
    nodeTypes.push(note)
    return nodeTypes
  }

  /**
   * Gets the edge prototypes for the graph
   * @return the collection of edge prototypes
   */
  getEdgePrototypes () {
    const edgeTypes = []
    const refedge = new ObjectReferenceEdge()
    const classedge = new ClassRelationshipEdge()
    const noteedge = new NoteEdge()
    edgeTypes.push(refedge)
    edgeTypes.push(classedge)
    edgeTypes.push(noteedge)
    return edgeTypes
  }
}

/**
 * Draws the grabber 
 * @param {number} x the x cordinate
 * @param {number} y the y cordinate
 */
function drawGrabber (x, y) {
  const size = 5
  const canvas = document.getElementById('editor')
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'purple'
  ctx.fillRect(x - size / 2, y - size / 2, size, size)
}
