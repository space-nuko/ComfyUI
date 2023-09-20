var L = /* @__PURE__ */ ((t) => (t[t.UP = 1] = "UP", t[t.DOWN = 2] = "DOWN", t[t.LEFT = 3] = "LEFT", t[t.RIGHT = 4] = "RIGHT", t[t.CENTER = 5] = "CENTER", t))(L || {}), Z = /* @__PURE__ */ ((t) => (t[t.ALWAYS = 0] = "ALWAYS", t[t.ON_EVENT = 1] = "ON_EVENT", t[t.NEVER = 2] = "NEVER", t[t.ON_TRIGGER = 3] = "ON_TRIGGER", t[t.ON_REQUEST = 4] = "ON_REQUEST", t))(Z || {});
const oe = ["Always", "On Event", "Never", "On Trigger"], Ke = ["#666", "#422", "#333", "#224", "#626"];
var A = /* @__PURE__ */ ((t) => (t[t.DEFAULT = 0] = "DEFAULT", t[t.BOX_SHAPE = 1] = "BOX_SHAPE", t[t.ROUND_SHAPE = 2] = "ROUND_SHAPE", t[t.CIRCLE_SHAPE = 3] = "CIRCLE_SHAPE", t[t.CARD_SHAPE = 4] = "CARD_SHAPE", t[t.ARROW_SHAPE = 5] = "ARROW_SHAPE", t[t.GRID_SHAPE = 6] = "GRID_SHAPE", t))(A || {});
const Je = ["default", "box", "round", "circle", "card", "arrow", "square"];
var z = /* @__PURE__ */ ((t) => (t[t.INPUT = 0] = "INPUT", t[t.OUTPUT = 1] = "OUTPUT", t))(z || {}), de = /* @__PURE__ */ ((t) => (t[t.STRAIGHT_LINK = 0] = "STRAIGHT_LINK", t[t.LINEAR_LINK = 1] = "LINEAR_LINK", t[t.SPLINE_LINK = 2] = "SPLINE_LINK", t))(de || {});
const Kt = ["Straight", "Linear", "Spline"];
var se = /* @__PURE__ */ ((t) => (t[t.NORMAL_TITLE = 0] = "NORMAL_TITLE", t[t.NO_TITLE = 1] = "NO_TITLE", t[t.TRANSPARENT_TITLE = 2] = "TRANSPARENT_TITLE", t[t.AUTOHIDE_TITLE = 3] = "AUTOHIDE_TITLE", t))(se || {}), O = /* @__PURE__ */ ((t) => (t[t.EVENT = -2] = "EVENT", t[t.ACTION = -1] = "ACTION", t[t.DEFAULT = 0] = "DEFAULT", t))(O || {});
const Qe = ["*", "array", "object", "number", "string", "enum", "boolean", "table"];
var ue = /* @__PURE__ */ ((t) => (t.VERTICAL_LAYOUT = "vertical", t.HORIZONTAL_LAYOUT = "horizontal", t))(ue || {});
function fe(t, e, s) {
  return e > t ? e : s < t ? s : t;
}
function ye(t, e) {
  return t.reduce((s, i) => {
    const n = e(i);
    return s[n] = i, s;
  }, {});
}
function Ze(t, e) {
  return e in t ? t[e] : null;
}
function Re(t, e) {
  return e in t.constructor ? t.constructor[e] : null;
}
function xt(t, e) {
  if (t.target !== e)
    return;
  let s = t.clientX - parseInt(window.getComputedStyle(e).left), i = t.clientY - parseInt(window.getComputedStyle(e).top);
  const n = (o) => {
    if (o.buttons === 0) {
      r();
      return;
    }
    e.style.top = o.clientY - i + "px", e.style.left = o.clientX - s + "px";
  }, r = () => {
    window.removeEventListener("mousemove", n), window.removeEventListener("mouseup", r);
  };
  window.addEventListener("mousemove", n), window.addEventListener("mouseup", r);
}
function Fe(t) {
  return t.addEventListener("mousedown", (e) => xt(e, t)), t.classList.add("draggable"), t;
}
function $(t) {
  return t === O.EVENT ? "Event" : t === O.ACTION ? "Action" : t === O.DEFAULT ? "Default" : t;
}
function et(t) {
  return t === O.EVENT || t === O.ACTION || t === O.DEFAULT || typeof t == "string";
}
const w = class {
  /** Register a node class so it can be listed when the user wants to create a new one */
  static registerNodeType(t) {
    w.debug && console.log("Node registered: " + t.type);
    const e = t.name, s = t.type;
    if (!s)
      throw console.error(t), new Error("Config has no type: " + t);
    if (w.debug && console.debug(e, s), t.category == null || t.category === "") {
      const n = s.lastIndexOf("/");
      t.category = s.substring(0, n);
    }
    t.title || (t.title = e);
    const i = w.registered_node_types[s];
    if (i && console.warn("replacing node type: " + s), t.supported_extensions)
      for (let n in t.supported_extensions) {
        const r = t.supported_extensions[n];
        r && r.constructor === String && (w.node_types_by_file_extension[r.toLowerCase()] = t);
      }
    t.class.__LITEGRAPH_TYPE__ = s, w.registered_node_types[s] = t, t.class.name && (w.Nodes[e] = t), w.onNodeTypeRegistered && w.onNodeTypeRegistered(s, t), i && w.onNodeTypeReplaced && w.onNodeTypeReplaced(s, t, i);
  }
  /** removes a node type from the system */
  static unregisterNodeType(t) {
    let e;
    if (typeof t == "string" ? e = w.registered_node_types[t] : e = t, !e)
      throw "node type not found: " + t;
    delete w.registered_node_types[e.type], e.constructor.name && delete w.Nodes[e.constructor.name];
  }
  /**
   * Save a slot type and his node
   * @method registerSlotType
   * @param {String|Object} type name of the node or the node constructor itself
   * @param {String} slot_type name of the slot type (variable type), eg. string, number, array, boolean, ..
   */
  static registerNodeAndSlotType(t, e, s = !1) {
    let i;
    if (typeof t == "string" ? i = w.registered_node_types[t] : "type" in t ? i = w.registered_node_types[t.type] : i = t, !i)
      throw new Error("Node not registered!" + t);
    var n = i.class.__litegraph_type__;
    if (typeof e == "string")
      var r = e.split(",");
    else if (e == O.EVENT || e == O.ACTION)
      var r = ["_event_"];
    else
      var r = ["*"];
    for (var o = 0; o < r.length; ++o) {
      var a = r[o];
      a === "" && (a = "*");
      var l = s ? "registered_slot_out_types" : "registered_slot_in_types";
      typeof this[l][a] > "u" && (this[l][a] = { nodes: [] }), this[l][a].nodes.push(n), a !== "_event_" && a !== "*" && (s ? w.slot_types_out.includes(a.toLowerCase()) || (w.slot_types_out.push(a.toLowerCase()), w.slot_types_out.sort()) : w.slot_types_in.includes(a.toLowerCase()) || (w.slot_types_in.push(a.toLowerCase()), w.slot_types_in.sort()));
    }
  }
  /** Removes all previously registered node's types. */
  static clearRegisteredTypes() {
    w.registered_node_types = {}, w.node_types_by_file_extension = {}, w.Nodes = {}, w.searchbox_extras = {};
  }
  /**
   * Create a new node type by passing a function, it wraps it with a proper class and generates inputs according to the parameters of the function.
   * Useful to wrap simple methods that do not require properties, and that only process some input to generate an output.
   * @param name node name with namespace (p.e.: 'math/sum')
   * @param func
   * @param param_types an array containing the type of every parameter, otherwise parameters will accept any type
   * @param return_type string with the return type, otherwise it will be generic
   * @param properties properties to be configurable
   */
  // static wrapFunctionAsNode(
  //     name: string,
  //     func: (...args: any[]) => any,
  //     param_types?: string[],
  //     return_type?: string,
  //     properties?: object
  // ): void {
  //     var params = Array(func.length);
  //     var code = "";
  //     var names = LiteGraph.getParameterNames(func);
  //     for (var i = 0; i < names.length; ++i) {
  //         code +=
  //         "this.addInput('" +
  //             names[i] +
  //             "'," +
  //             (param_types && param_types[i]
  //                 ? "'" + param_types[i] + "'"
  //                 : "0") +
  //             ");\n";
  //     }
  //     code +=
  //     "this.addOutput('out'," +
  //         (return_type ? "'" + return_type + "'" : 0) +
  //         ");\n";
  //     if (properties) {
  //         code +=
  //         "this.properties = " + JSON.stringify(properties) + ";\n";
  //     }
  //     var classobj = Function(code) as any;
  //     classobj.title = name.split("/").pop();
  //     classobj.desc = "Generated from " + func.name;
  //     classobj.prototype.onExecute = function onExecute() {
  //         for (var i = 0; i < params.length; ++i) {
  //             params[i] = this.getInputData(i);
  //         }
  //         var r = func.apply(this, params);
  //         this.setOutputData(0, r);
  //     };
  //     LiteGraph.registerNodeType(name, classobj);
  // }
  /**
   * Adds this method to all node types, existing and to be created
   * (You can add it to LGraphNode.prototype but then existing node types wont have it)
   */
  // static addNodeMethod(name: string, func: (...args: any[]) => any): void {
  //     LGraphNode.prototype[name] = func;
  //     for (var i in LiteGraph.registered_node_types) {
  //         var type = LiteGraph.registered_node_types[i];
  //         if (type.prototype[name]) {
  //             type.prototype["_" + name] = type.prototype[name];
  //         } //keep old in case of replacing
  //         type.prototype[name] = func;
  //     }
  // }
  /**
   * Create a node of a given type with a name. The node is not attached to any graph yet.
   * @param type full name of the node class. p.e. "math/sin"
   * @param name a name to distinguish from other nodes
   * @param options to set options
   */
  static createNode(t, e, s = {}) {
    let i = null, n;
    if (typeof t == "string")
      n = t;
    else if (n = t.__LITEGRAPH_TYPE__, !n)
      throw console.error(t), "Node was not registered yet!";
    if (i = w.registered_node_types[n], !i)
      return console.warn(
        'GraphNode type "' + t + '" not registered.'
      ), null;
    e = e || i.title || n;
    var r = null;
    const o = s.constructorArgs || [];
    if (w.catch_exceptions)
      try {
        r = new i.class(e, ...o);
      } catch (p) {
        return console.error("Error creating node!", p), null;
      }
    else
      r = new i.class(e, ...o);
    if (r.class = i.class, r.type = n, !r.title && e && (r.title = e), r.properties || (r.properties = {}), r.properties_info || (r.properties_info = []), r.flags || (r.flags = {}), r.size || (r.size = r.computeSize()), r.pos || (r.pos = [w.DEFAULT_POSITION[0], w.DEFAULT_POSITION[1]]), r.mode || (r.mode = Z.ALWAYS), s.instanceProps)
      for (var a in s.instanceProps)
        r[a] = s.instanceProps[a];
    const l = Ze(i.class, "propertyLayout");
    if (l) {
      w.debug && console.debug("Found property layout!", l);
      for (const p of l) {
        const { name: f, defaultValue: c, type: v, options: g } = p;
        r.addProperty(f, c, v, g);
      }
    }
    const h = Ze(i.class, "slotLayout");
    if (h) {
      if (w.debug && console.debug("Found slot layout!", h), h.inputs)
        for (const p of h.inputs) {
          const { name: f, type: c, options: v } = p;
          r.addInput(f, c, v);
        }
      if (h.outputs)
        for (const p of h.outputs) {
          const { name: f, type: c, options: v } = p;
          r.addOutput(f, c, v);
        }
    }
    return r.onNodeCreated && r.onNodeCreated(), r;
  }
  /**
   * Returns a registered node type with a given name
   * @param type full name of the node class. p.e. "math/sin"
   */
  static getNodeType(t) {
    return w.registered_node_types[t];
  }
  /**
   * Returns a list of node types matching one category
   * @method getNodeTypesInCategory
   * @param {String} category category name
   * @param {String} filter only nodes with ctor.filter equal can be shown
   * @return {Array} array with all the node classes
   */
  static getNodeTypesInCategory(t, e) {
    var s = [];
    for (var i in w.registered_node_types) {
      var n = w.registered_node_types[i];
      n.filter == e && (t == "" ? n.category == null && s.push(n) : n.category == t && s.push(n));
    }
    return w.auto_sort_node_types && s.sort(function(r, o) {
      return r.title.localeCompare(o.title);
    }), s;
  }
  /**
   * Returns a list with all the node type categories
   * @method getNodeTypesCategories
   * @param {String} filter only nodes with ctor.filter equal can be shown
   * @return {Array} array with all the names of the categories
   */
  static getNodeTypesCategories(t) {
    var e = { "": 1 };
    for (var s in w.registered_node_types) {
      var i = w.registered_node_types[s];
      if (i.category && !i.hide_in_node_lists) {
        if (i.filter != t)
          continue;
        e[i.category] = 1;
      }
    }
    var n = [];
    for (var s in e)
      n.push(s);
    return w.auto_sort_node_types ? n.sort() : n;
  }
  /** debug purposes: reloads all the js scripts that matches a wildcard */
  static reloadNodes(t) {
    for (var e = document.getElementsByTagName("script"), s = [], i = 0; i < e.length; i++)
      s.push(e[i]);
    var n = document.getElementsByTagName("head")[0];
    t = document.location.href + t;
    for (var i = 0; i < s.length; i++) {
      var r = s[i].src;
      if (!(!r || r.substr(0, t.length) != t))
        try {
          w.debug && console.log("Reloading: " + r);
          var o = document.createElement("script");
          o.type = "text/javascript", o.src = r, n.appendChild(o), n.removeChild(s[i]);
        } catch (l) {
          if (w.throw_errors)
            throw l;
          w.debug && console.log("Error while reloading " + r);
        }
    }
    w.debug && console.log("Nodes reloaded");
  }
  // TODO move
  //separated just to improve if it doesn't work
  static cloneObject(t, e) {
    if (t == null)
      return null;
    var s = JSON.parse(JSON.stringify(t));
    if (!e)
      return s;
    for (var i in s)
      e[i] = s[i];
    return e;
  }
  /**
   * Returns if the types of two slots are compatible (taking into account wildcards, etc)
   * @method isValidConnection
   * @param {String} type_a
   * @param {String} type_b
   * @return {Boolean} true if they can be connected
   */
  static isValidConnection(t, e) {
    if ((t == "" || t === "*") && (t = O.DEFAULT), (e == "" || e === "*") && (e = O.DEFAULT), !t || !e || t == e || t == O.EVENT && e == O.ACTION || t == O.ACTION && e == O.EVENT)
      return !0;
    if (t = String(t), e = String(e), t = t.toLowerCase(), e = e.toLowerCase(), t.indexOf(",") == -1 && e.indexOf(",") == -1)
      return t == e;
    for (var s = t.split(","), i = e.split(","), n = 0; n < s.length; ++n)
      for (var r = 0; r < i.length; ++r)
        if (this.isValidConnection(s[n], i[r]))
          return !0;
    return !1;
  }
  static getTime() {
    return Date.now();
  }
  // static LLink: typeof LLink;
  // static LGraph: typeof LGraph;
  // static DragAndScale: typeof DragAndScale;
  static compareObjects(t, e) {
    for (var s in t)
      if (t[s] != e[s])
        return !1;
    return !0;
  }
  static distance(t, e) {
    return Math.sqrt(
      (e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1])
    );
  }
  static colorToString(t) {
    return "rgba(" + Math.round(t[0] * 255).toFixed() + "," + Math.round(t[1] * 255).toFixed() + "," + Math.round(t[2] * 255).toFixed() + "," + (t.length == 4 ? t[3].toFixed(2) : "1.0") + ")";
  }
  static isInsideRectangle(t, e, s, i, n, r) {
    return s < t && s + n > t && i < e && i + r > e;
  }
  // [minx,miny,maxx,maxy]
  static growBounding(t, e, s) {
    return e < t[0] ? t[0] = e : e > t[2] && (t[2] = e), s < t[1] ? t[1] = s : s > t[3] && (t[3] = s), t;
  }
  static isInsideBounding(t, e) {
    return !(t[0] < e[0][0] || t[1] < e[0][1] || t[0] > e[1][0] || t[1] > e[1][1]);
  }
  // bounding overlap, format: [ startx, starty, width, height ]
  static overlapBounding(t, e) {
    var s = t[0] + t[2], i = t[1] + t[3], n = e[0] + e[2], r = e[1] + e[3];
    return !(t[0] > n || t[1] > r || s < e[0] || i < e[1]);
  }
  // Convert a hex value to its decimal value - the inputted hex must be in the
  // format of a hex triplet - the kind we use for HTML colours. The function
  // will return an array with three values.
  static hex2num(t) {
    t.charAt(0) == "#" && (t = t.slice(1)), t = t.toUpperCase();
    var e = "0123456789ABCDEF";
    let s;
    for (var i = 0, n, r, o = 0; o < 6; o += 2)
      n = e.indexOf(t.charAt(o)), r = e.indexOf(t.charAt(o + 1)), s[i] = n * 16 + r, i++;
    return s;
  }
  //Give a array with three values as the argument and the function will return
  //	the corresponding hex triplet.
  static num2hex(t) {
    for (var e = "0123456789ABCDEF", s = "#", i, n, r = 0; r < 3; r++)
      i = t[r] / 16, n = t[r] % 16, s += e.charAt(i) + e.charAt(n);
    return s;
  }
  // ContextMenu: typeof ContextMenu;
  // static extendClass<A, B>(target: A, origin: B): A & B;
  // static getParameterNames(func: string | Function): string[];
  /* helper for interaction: pointer, touch, mouse Listeners
     used by LGraphCanvas DragAndScale ContextMenu*/
  static pointerListenerAdd(t, e, s, i = !1) {
    if (!(!t || !t.addEventListener || !e || typeof s != "function")) {
      var n = w.pointerevents_method, r = e;
      if (n == "pointer" && !window.PointerEvent)
        switch (console.warn("sMethod=='pointer' && !window.PointerEvent"), console.log("Converting pointer[" + r + "] : down move up cancel enter TO touchstart touchmove touchend, etc .."), r) {
          case "down": {
            n = "touch", r = "start";
            break;
          }
          case "move": {
            n = "touch";
            break;
          }
          case "up": {
            n = "touch", r = "end";
            break;
          }
          case "cancel": {
            n = "touch";
            break;
          }
          case "enter": {
            console.log("debug: Should I send a move event?");
            break;
          }
          default:
            console.warn("PointerEvent not available in this browser ? The event " + r + " would not be called");
        }
      switch (r) {
        case "down":
        case "up":
        case "move":
        case "over":
        case "out":
        case "enter":
          t.addEventListener(n + r, s, i);
        case "leave":
        case "cancel":
        case "gotpointercapture":
        case "lostpointercapture":
          if (n != "mouse")
            return t.addEventListener(n + r, s, i);
        default:
          return t.addEventListener(r, s, i);
      }
    }
  }
  static pointerListenerRemove(t, e, s, i = !1) {
    if (!(!t || !t.removeEventListener || !e || typeof s != "function"))
      switch (e) {
        case "down":
        case "up":
        case "move":
        case "over":
        case "out":
        case "enter":
          (w.pointerevents_method == "pointer" || w.pointerevents_method == "mouse") && t.removeEventListener(w.pointerevents_method + e, s, i);
        case "leave":
        case "cancel":
        case "gotpointercapture":
        case "lostpointercapture":
          if (w.pointerevents_method == "pointer")
            return t.removeEventListener(w.pointerevents_method + e, s, i);
        default:
          return t.removeEventListener(e, s, i);
      }
  }
};
let u = w;
u.VERSION = 10;
u.CANVAS_GRID_SIZE = 10;
u.NODE_TITLE_HEIGHT = 20;
u.NODE_TITLE_TEXT_Y = 15;
u.NODE_SLOT_HEIGHT = 20;
u.NODE_WIDGET_HEIGHT = 20;
u.NODE_WIDTH = 140;
u.NODE_MIN_WIDTH = 50;
u.NODE_COLLAPSED_RADIUS = 10;
u.NODE_COLLAPSED_WIDTH = 80;
u.NODE_TITLE_COLOR = "#999";
u.NODE_SELECTED_TITLE_COLOR = "#FFF";
u.NODE_TEXT_SIZE = 14;
u.NODE_TEXT_COLOR = "#AAA";
u.NODE_SUBTEXT_SIZE = 12;
u.NODE_DEFAULT_COLOR = "#333";
u.NODE_DEFAULT_BGCOLOR = "#353535";
u.NODE_DEFAULT_BOXCOLOR = "#666";
u.NODE_DEFAULT_SHAPE = "box";
u.NODE_BOX_OUTLINE_COLOR = "#FFF";
u.DEFAULT_SHADOW_COLOR = "rgba(0,0,0,0.5)";
u.DEFAULT_GROUP_FONT_SIZE = 24;
u.WIDGET_BGCOLOR = "#222";
u.WIDGET_OUTLINE_COLOR = "#666";
u.WIDGET_TEXT_COLOR = "#DDD";
u.WIDGET_SECONDARY_TEXT_COLOR = "#999";
u.LINK_COLOR = "#9A9";
u.EVENT_LINK_COLOR = "#A86";
u.ACTION_LINK_COLOR = "#86A";
u.CONNECTING_LINK_COLOR = "#AFA";
u.MAX_NUMBER_OF_NODES = 1e3;
u.DEFAULT_POSITION = [100, 100];
u.proxy = null;
u.node_images_path = "";
u.debug = !1;
u.catch_exceptions = !0;
u.throw_errors = !0;
u.allow_scripts = !1;
u.registered_node_types = {};
u.node_types_by_file_extension = {};
u.Nodes = {};
u.Globals = {};
u.searchbox_extras = {};
u.auto_sort_node_types = !1;
u.node_box_coloured_when_on = !1;
u.node_box_coloured_by_mode = !1;
u.dialog_close_on_mouse_leave = !0;
u.dialog_close_on_mouse_leave_delay = 500;
u.shift_click_do_break_link_from = !1;
u.click_do_break_link_to = !1;
u.search_hide_on_mouse_leave = !0;
u.search_filter_enabled = !1;
u.search_show_all_on_open = !0;
u.auto_load_slot_types = !1;
u.registered_slot_in_types = {};
u.registered_slot_out_types = {};
u.slot_types_in = [];
u.slot_types_out = [];
u.slot_types_default_in = {};
u.slot_types_default_out = {};
u.alt_drag_do_clone_nodes = !1;
u.do_add_triggers_slots = !1;
u.allow_multi_output_for_events = !0;
u.middle_click_slot_add_default_node = !1;
u.release_link_on_empty_shows_menu = !1;
u.ignore_all_widget_events = !1;
u.pointerevents_method = "mouse";
u.use_uuids = !1;
u.search_box_refresh_interval_ms = 250;
u.graph_inputs_outputs_use_combo_widget = !1;
u.serialize_slot_data = !1;
class Ht {
  constructor(e, s = !1) {
    this.offset = [0, 0], this.scale = 1, this.max_scale = 10, this.min_scale = 0.1, this.onredraw = null, this.enabled = !0, this.last_mouse = [0, 0], this.element = null, this.visible_area = new Float32Array([0, 0, 0, 0]), this.viewport = null, this.dragging = !1, this._binded_mouse_callback = null, e && (this.element = e, s || this.bindEvents(e));
  }
  bindEvents(e) {
    this.last_mouse = [0, 0], this._binded_mouse_callback = this.onMouse.bind(this), u.pointerListenerAdd(e, "down", this._binded_mouse_callback), u.pointerListenerAdd(e, "move", this._binded_mouse_callback), u.pointerListenerAdd(e, "up", this._binded_mouse_callback), e.addEventListener(
      "mousewheel",
      this._binded_mouse_callback,
      !1
    ), e.addEventListener("wheel", this._binded_mouse_callback, !1);
  }
  computeVisibleArea(e) {
    if (!this.element) {
      this.visible_area[0] = this.visible_area[1] = this.visible_area[2] = this.visible_area[3] = 0;
      return;
    }
    var s = this.element.width, i = this.element.height, n = -this.offset[0], r = -this.offset[1];
    e && (n += e[0] / this.scale, r += e[1] / this.scale, s = e[2], i = e[3]);
    var o = n + s / this.scale, a = r + i / this.scale;
    this.visible_area[0] = n, this.visible_area[1] = r, this.visible_area[2] = o - n, this.visible_area[3] = a - r;
  }
  onMouse(e) {
    if (!this.enabled)
      return;
    var s = this.element, i = s.getBoundingClientRect();
    let n = e;
    var r = n.clientX - i.left, o = n.clientY - i.top;
    n.canvasX = r, n.canvasX = o, n.dragging = this.dragging;
    var a = !this.viewport || this.viewport && r >= this.viewport[0] && r < this.viewport[0] + this.viewport[2] && o >= this.viewport[1] && o < this.viewport[1] + this.viewport[3];
    if (n.type == u.pointerevents_method + "down" && a)
      this.dragging = !0, u.pointerListenerRemove(s, "move", this._binded_mouse_callback), u.pointerListenerAdd(document, "move", this._binded_mouse_callback), u.pointerListenerAdd(document, "up", this._binded_mouse_callback);
    else if (n.type == u.pointerevents_method + "move") {
      var l = r - this.last_mouse[0], h = o - this.last_mouse[1];
      this.dragging && this.mouseDrag(l, h);
    } else
      n.type == u.pointerevents_method + "up" ? (this.dragging = !1, u.pointerListenerRemove(document, "move", this._binded_mouse_callback), u.pointerListenerRemove(document, "up", this._binded_mouse_callback), u.pointerListenerAdd(s, "move", this._binded_mouse_callback)) : a && (n.type == "mousewheel" || n.type == "wheel" || n.type == "DOMMouseScroll") && (n.eventType = "mousewheel", n.type == "wheel" ? n.wheel = -n.deltaY : n.wheel = n.wheelDeltaY != null ? n.wheelDeltaY : n.detail * -60, n.delta = n.wheelDelta ? n.wheelDelta / 40 : n.deltaY ? -n.deltaY / 3 : 0, this.changeDeltaScale(1 + n.delta * 0.05, [n.clientX, n.clientY]));
    if (this.last_mouse[0] = r, this.last_mouse[1] = o, a)
      return n.preventDefault(), n.stopPropagation(), !1;
  }
  toCanvasContext(e) {
    e.scale(this.scale, this.scale), e.translate(this.offset[0], this.offset[1]);
  }
  convertOffsetToCanvas(e) {
    return [
      (e[0] + this.offset[0]) * this.scale,
      (e[1] + this.offset[1]) * this.scale
    ];
  }
  convertCanvasToOffset(e, s = [0, 0]) {
    return s[0] = e[0] / this.scale - this.offset[0], s[1] = e[1] / this.scale - this.offset[1], s;
  }
  mouseDrag(e, s) {
    this.offset[0] += e / this.scale, this.offset[1] += s / this.scale, this.onredraw && this.onredraw(this);
  }
  changeScale(e, s) {
    if (e < this.min_scale ? e = this.min_scale : e > this.max_scale && (e = this.max_scale), e != this.scale && this.element) {
      var i = this.element.getBoundingClientRect();
      if (i) {
        s = s || [
          i.width * 0.5,
          i.height * 0.5
        ], s[0] -= i.left, s[1] -= i.top;
        var n = this.convertCanvasToOffset(s);
        this.scale = e, Math.abs(this.scale - 1) < 0.01 && (this.scale = 1);
        var r = this.convertCanvasToOffset(s), o = [
          r[0] - n[0],
          r[1] - n[1]
        ];
        this.offset[0] += o[0], this.offset[1] += o[1], this.onredraw && this.onredraw(this);
      }
    }
  }
  changeDeltaScale(e, s) {
    this.changeScale(this.scale * e, s);
  }
  reset() {
    this.scale = 1, this.offset[0] = 0, this.offset[1] = 0;
  }
}
class _e {
  processMouseDown(e) {
    if (this.set_canvas_dirty_on_mouse_event && (this.dirty_canvas = !0), !this.graph)
      return;
    let s = e;
    this.adjustMouseEvent(s);
    var i = this.getCanvasWindow();
    i.document, N.active_canvas = this;
    var n = s.clientX, r = s.clientY;
    this.ds.viewport = this.viewport;
    var o = !this.viewport || this.viewport && n >= this.viewport[0] && n < this.viewport[0] + this.viewport[2] && r >= this.viewport[1] && r < this.viewport[1] + this.viewport[3];
    if (this.skip_events || (u.pointerListenerRemove(this.canvas, "move", this._mousemove_callback), u.pointerListenerAdd(i.document, "move", this._mousemove_callback, !0), u.pointerListenerAdd(i.document, "up", this._mouseup_callback, !0)), !!o) {
      var a = this.graph.getNodeOnPos(s.canvasX, s.canvasY, this.visible_nodes, 5), l = !1, h = u.getTime(), p = !(s instanceof PointerEvent) || !s.isPrimary, f = h - this.last_mouseclick < 300 && p;
      if (this.mouse[0] = s.clientX, this.mouse[1] = s.clientY, this.offset_mouse[0] = s.offsetX, this.offset_mouse[1] = s.offsetY, this.graph_mouse[0] = s.canvasX, this.graph_mouse[1] = s.canvasY, this.last_click_position = [this.mouse[0], this.mouse[1]], this.last_click_position_offset = [this.offset_mouse[0], this.offset_mouse[1]], this.pointer_is_down && p ? this.pointer_is_double = !0 : this.pointer_is_double = !1, this.pointer_is_down = !0, this.canvas.focus(), j.closeAllContextMenus(i), this.search_box && this.search_box.close(), !(this.onMouse && this.onMouse(s) === !0)) {
        if (s.which == 1 && !this.pointer_is_double) {
          if (s.ctrlKey && this.allow_interaction && !this.read_only && (this.dragging_rectangle = new Float32Array(4), this.dragging_rectangle[0] = s.canvasX, this.dragging_rectangle[1] = s.canvasY, this.dragging_rectangle[2] = 1, this.dragging_rectangle[3] = 1, l = !0), u.alt_drag_do_clone_nodes && s.altKey && a && this.allow_interaction && !l && !this.read_only) {
            let P = a.clone();
            P && (P.pos[0] += 5, P.pos[1] += 5, this.graph.add(P, { doCalcSize: !1 }), a = P, l = !0, y || (this.allow_dragnodes && (this.graph.beforeChange(), this.node_dragged = a), this.selected_nodes[a.id] || this.processNodeSelected(a, s)));
          }
          var c = !1;
          if (a && this.allow_interaction && !l && !this.read_only) {
            if (!this.live_mode && !a.flags.pinned && this.bringToFront(a), !this.connecting_node && !a.flags.collapsed && !this.live_mode)
              if (!l && a.resizable !== !1 && u.isInsideRectangle(
                s.canvasX,
                s.canvasY,
                a.pos[0] + a.size[0] - 5,
                a.pos[1] + a.size[1] - 5,
                10,
                10
              ))
                this.graph.beforeChange(), this.resizing_node = a, this.canvas.style.cursor = "se-resize", l = !0;
              else {
                if (a.outputs)
                  for (var v = 0, g = a.outputs.length; v < g; ++v) {
                    var d = a.outputs[v], _ = a.getConnectionPos(!1, v);
                    if (u.isInsideRectangle(
                      s.canvasX,
                      s.canvasY,
                      _[0] - 15,
                      _[1] - 10,
                      30,
                      20
                    )) {
                      this.connecting_node = a, this.connecting_output = d, this.connecting_output.slot_index = v, this.connecting_pos = a.getConnectionPos(!1, v), this.connecting_slot = v, u.shift_click_do_break_link_from && s.shiftKey && a.disconnectOutput(v), f ? a.onOutputDblClick && a.onOutputDblClick(v, s) : a.onOutputClick && a.onOutputClick(v, s), l = !0;
                      break;
                    }
                  }
                if (a.inputs)
                  for (var v = 0, g = a.inputs.length; v < g; ++v) {
                    var b = a.inputs[v], _ = a.getConnectionPos(!0, v);
                    if (u.isInsideRectangle(
                      s.canvasX,
                      s.canvasY,
                      _[0] - 15,
                      _[1] - 10,
                      30,
                      20
                    )) {
                      if (f ? a.onInputDblClick && a.onInputDblClick(v, s) : a.onInputClick && a.onInputClick(v, s), b.link !== null) {
                        var m = this.graph.links[b.link];
                        u.click_do_break_link_to && (a.disconnectInput(v), this.dirty_bgcanvas = !0, l = !0), (this.allow_reconnect_links || //this.move_destination_link_without_shift ||
                        s.shiftKey) && (u.click_do_break_link_to || a.disconnectInput(v), this.connecting_node = this.graph._nodes_by_id[m.origin_id], this.connecting_slot = m.origin_slot, this.connecting_output = this.connecting_node.outputs[this.connecting_slot], this.connecting_pos = this.connecting_node.getConnectionPos(!1, this.connecting_slot), this.dirty_bgcanvas = !0, l = !0);
                      }
                      l || (this.connecting_node = a, this.connecting_input = b, this.connecting_input.slot_index = v, this.connecting_pos = a.getConnectionPos(!0, v), this.connecting_slot = v, this.dirty_bgcanvas = !0, l = !0);
                    }
                  }
              }
            if (!l) {
              var y = !1, E = [s.canvasX - a.pos[0], s.canvasY - a.pos[1]], T = this.processNodeWidgets(a, this.graph_mouse, s);
              if (T && (y = !0, this.node_widget = [a, T]), f && this.selected_nodes[a.id]) {
                let P = !0;
                a.onDblClick && a.onDblClick(s, E, this) && (P = !1), P && this.processNodeDblClicked(a), y = !0;
              }
              a.onMouseDown && a.onMouseDown(s, E, this) ? y = !0 : (a.subgraph && !a.skip_subgraph_button && !a.flags.collapsed && E[0] > a.size[0] - u.NODE_TITLE_HEIGHT && E[1] < 0 && setTimeout(() => {
                this.openSubgraph(a.subgraph);
              }, 10), this.live_mode && (c = !0, y = !0)), y || (this.allow_dragnodes && (this.graph.beforeChange(), this.node_dragged = a), this.selected_nodes[a.id] || this.processNodeSelected(a, s)), this.dirty_canvas = !0;
            }
          } else if (!l) {
            let P = !1;
            if (a && a.subgraph && !a.skip_subgraph_button) {
              var E = [s.canvasX - a.pos[0], s.canvasY - a.pos[1]];
              !a.flags.collapsed && E[0] > a.size[0] - u.NODE_TITLE_HEIGHT && E[1] < 0 && (P = !0, setTimeout(() => {
                this.openSubgraph(a.subgraph);
              }, 10));
            }
            if (!P) {
              if (this.allow_interaction && !this.read_only) {
                const H = this.findLinkCenterAtPos(s.canvasX, s.canvasY);
                H != null && (this.showLinkMenu(H, s), this.over_link_center = null);
              }
              if (this.selected_group = this.graph.getGroupOnPos(s.canvasX, s.canvasY), this.selected_group_resizing = !1, this.selected_group && !this.read_only && this.allow_interaction) {
                s.ctrlKey && (this.dragging_rectangle = null);
                var I = u.distance([s.canvasX, s.canvasY], [this.selected_group.pos[0] + this.selected_group.size[0], this.selected_group.pos[1] + this.selected_group.size[1]]);
                I * this.ds.scale < 10 ? this.selected_group_resizing = !0 : this.selected_group.recomputeInsideNodes();
              }
              f && !this.read_only && this.allow_searchbox && this.allow_interaction && (this.showSearchBox(s), s.preventDefault(), s.stopPropagation()), c = !0;
            }
          }
          !l && c && this.allow_dragcanvas && (this.dragging_canvas = !0);
        } else if (s.which == 2) {
          if (u.middle_click_slot_add_default_node && a && this.allow_interaction && !l && !this.read_only && !this.connecting_node && !a.flags.collapsed && !this.live_mode) {
            var S = null, F = null, D = null;
            if (a.outputs)
              for (var v = 0, g = a.outputs.length; v < g; ++v) {
                var d = a.outputs[v], _ = a.getConnectionPos(!1, v);
                if (u.isInsideRectangle(s.canvasX, s.canvasY, _[0] - 15, _[1] - 10, 30, 20)) {
                  S = d, F = v, D = !0;
                  break;
                }
              }
            if (a.inputs)
              for (var v = 0, g = a.inputs.length; v < g; ++v) {
                var b = a.inputs[v], _ = a.getConnectionPos(!0, v);
                if (u.isInsideRectangle(s.canvasX, s.canvasY, _[0] - 15, _[1] - 10, 30, 20)) {
                  S = b, F = v, D = !1;
                  break;
                }
              }
            if (S && F !== !1) {
              var G = 0.5 - (F + 1) / (D ? a.outputs.length : a.inputs.length), B = a.getBounding(), W = [
                D ? B[0] + B[2] : B[0],
                s.canvasY - 80
                // + node_bounding[0]/this.canvas.width*66 // vertical "derive"
              ];
              this.createDefaultNodeForSlot("AUTO", {
                nodeFrom: D ? a : null,
                slotFrom: D ? F : null,
                nodeTo: D ? null : a,
                slotTo: D ? null : F,
                position: W,
                posAdd: [D ? 30 : -30, -G * 130],
                posSizeFix: [D ? 0 : -1, 0]
                //-alphaPosY*2*/
              });
            }
          }
        } else if ((s.which == 3 || this.pointer_is_double) && this.allow_interaction && !l && !this.read_only) {
          let P = null;
          if (a)
            P = { type: "node", item: a }, Object.keys(this.selected_nodes).length && (this.selected_nodes[a.id] || s.shiftKey || s.ctrlKey || s.metaKey) ? this.selected_nodes[a.id] || this.selectNodes([a], !0) : this.selectNodes([a]);
          else {
            const H = this.findLinkCenterAtPos(s.canvasX, s.canvasY);
            H != null && (this.over_link_center = null, this.dirty_canvas = !0, P = { type: "link", item: H });
          }
          this.processContextMenu(P, s);
        }
        if (this.selected_group_moving = !1, this.selected_group && !this.selected_group_resizing) {
          var pe = this.selected_group.fontSize || u.DEFAULT_GROUP_FONT_SIZE, R = pe * 1.4;
          u.isInsideRectangle(s.canvasX, s.canvasY, this.selected_group.pos[0], this.selected_group.pos[1], this.selected_group.size[0], R) && (this.selected_group_moving = !0);
        }
        return this.last_mouse[0] = s.clientX, this.last_mouse[1] = s.clientY, this.last_mouseclick = u.getTime(), this.last_mouse_dragging = !0, this.graph.change(), (!i.document.activeElement || i.document.activeElement.nodeName.toLowerCase() != "input" && i.document.activeElement.nodeName.toLowerCase() != "textarea") && s.preventDefault(), s.stopPropagation(), this.onMouseDown && this.onMouseDown(s), !1;
      }
    }
  }
  processMouseMove(e) {
    let s = e;
    if (this.autoresize && this.resize(), this.set_canvas_dirty_on_mouse_event && (this.dirty_canvas = !0), !this.graph)
      return;
    N.active_canvas = this, this.adjustMouseEvent(s);
    let i = [s.clientX, s.clientY];
    this.mouse[0] = i[0], this.mouse[1] = i[1];
    let n = [
      i[0] - this.last_mouse[0],
      i[1] - this.last_mouse[1]
    ];
    if (this.last_mouse = i, this.offset_mouse[0] = s.offsetX, this.offset_mouse[1] = s.offsetY, this.graph_mouse[0] = s.canvasX, this.graph_mouse[1] = s.canvasY, this.block_click)
      return s.preventDefault(), !1;
    s.dragging = this.last_mouse_dragging, this.node_widget && (this.processNodeWidgets(
      this.node_widget[0],
      this.graph_mouse,
      s,
      this.node_widget[1]
    ), this.dirty_canvas = !0);
    const r = this.selected_group;
    if (this.selected_group && !this.selected_group_resizing && !this.selected_group_moving && (this.selected_group = null), this.dragging_rectangle)
      this.dragging_rectangle[2] = s.canvasX - this.dragging_rectangle[0], this.dragging_rectangle[3] = s.canvasY - this.dragging_rectangle[1], this.dirty_canvas = !0;
    else if (this.selected_group && !this.read_only && this.allow_interaction) {
      if (this.selected_group_resizing)
        this.selected_group.size = [
          s.canvasX - this.selected_group.pos[0],
          s.canvasY - this.selected_group.pos[1]
        ];
      else {
        var o = n[0] / this.ds.scale, a = n[1] / this.ds.scale;
        this.selected_group.move(o, a, s.ctrlKey), this.selected_group._nodes.length && (this.dirty_canvas = !0);
      }
      this.dirty_bgcanvas = !0;
    } else if (this.dragging_canvas)
      this.ds.offset[0] += n[0] / this.ds.scale, this.ds.offset[1] += n[1] / this.ds.scale, this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
    else {
      const m = this.allow_interaction && !this.read_only;
      this.connecting_node && (this.dirty_canvas = !0);
      var l = this.graph.getNodeOnPos(s.canvasX, s.canvasY, this.visible_nodes);
      if (m)
        for (var h = 0, p = this.graph._nodes.length; h < p; ++h) {
          let y = this.graph._nodes[h];
          if (y.mouseOver && l != y) {
            y.mouseOver = !1, this.node_over && this.node_over.onMouseLeave && this.node_over.onMouseLeave(s, [s.canvasX - this.node_over.pos[0], s.canvasY - this.node_over.pos[1]], this);
            const E = this.node_over;
            this.node_over = null, this.dirty_canvas = !0, this.onHoverChange && E != this.node_over && this.onHoverChange(this.node_over, E);
          }
        }
      if (l) {
        if (l.redraw_on_mouse && (this.dirty_canvas = !0), m) {
          if (!l.mouseOver) {
            l.mouseOver = !0;
            const y = this.node_over;
            this.node_over = l, this.dirty_canvas = !0, this.onHoverChange && y != this.node_over && this.onHoverChange(this.node_over, y), l.onMouseEnter && l.onMouseEnter(s, [s.canvasX - l.pos[0], s.canvasY - l.pos[1]], this);
          }
          if (l.onMouseMove && l.onMouseMove(s, [s.canvasX - l.pos[0], s.canvasY - l.pos[1]], this), this.connecting_node) {
            if (this.connecting_output) {
              var f = this._highlight_input || [0, 0];
              if (!this.isOverNodeBox(l, s.canvasX, s.canvasY)) {
                var c = this.isOverNodeInput(l, s.canvasX, s.canvasY, f);
                if (c != -1 && l.inputs[c]) {
                  var v = l.inputs[c].type;
                  u.isValidConnection(this.connecting_output.type, v) && (this._highlight_input = f, this._highlight_input_slot = l.inputs[c]);
                } else
                  this._highlight_input = null, this._highlight_input_slot = null;
              }
            } else if (this.connecting_input) {
              var f = this._highlight_output || [0, 0];
              if (!this.isOverNodeBox(l, s.canvasX, s.canvasY)) {
                var c = this.isOverNodeOutput(l, s.canvasX, s.canvasY, f);
                if (c != -1 && l.outputs[c]) {
                  var v = l.outputs[c].type;
                  u.isValidConnection(this.connecting_input.type, v) && (this._highlight_output = f);
                } else
                  this._highlight_output = null;
              }
            }
          }
          this.canvas && (u.isInsideRectangle(
            s.canvasX,
            s.canvasY,
            l.pos[0] + l.size[0] - 5,
            l.pos[1] + l.size[1] - 5,
            5,
            5
          ) ? this.canvas.style.cursor = "se-resize" : this.canvas.style.cursor = "crosshair");
        }
      } else {
        var g = this.findLinkCenterAtPos(s.canvasX, s.canvasY);
        g != this.over_link_center && (this.over_link_center = g, this.dirty_canvas = !0), this.canvas && (this.canvas.style.cursor = "");
      }
      if (m) {
        if (this.node_capturing_input && this.node_capturing_input != l && this.node_capturing_input.onMouseMove && this.node_capturing_input.onMouseMove(s, [s.canvasX - this.node_capturing_input.pos[0], s.canvasY - this.node_capturing_input.pos[1]], this), this.node_dragged && !this.live_mode) {
          for (const y in this.selected_nodes) {
            var d = this.selected_nodes[y];
            d.pos[0] += n[0] / this.ds.scale, d.pos[1] += n[1] / this.ds.scale;
          }
          this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
        }
        if (this.resizing_node && !this.live_mode) {
          var _ = [s.canvasX - this.resizing_node.pos[0], s.canvasY - this.resizing_node.pos[1]], b = this.resizing_node.computeSize();
          _[0] = Math.max(b[0], _[0]), _[1] = Math.max(b[1], _[1]), this.resizing_node.setSize(_), this.canvas.style.cursor = "se-resize", this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
        }
      }
    }
    return r && !this.selected_group_resizing && !this.selected_group_moving && (this.selected_group = r), s.preventDefault(), !1;
  }
  processMouseUp(e) {
    let s = e;
    var i = !(s instanceof PointerEvent) || !s.isPrimary;
    if (!i)
      return !1;
    if (this.set_canvas_dirty_on_mouse_event && (this.dirty_canvas = !0), !!this.graph) {
      var n = this.getCanvasWindow(), r = n.document;
      N.active_canvas = this, this.skip_events || (u.pointerListenerRemove(r, "move", this._mousemove_callback, !0), u.pointerListenerAdd(this.canvas, "move", this._mousemove_callback, !0), u.pointerListenerRemove(r, "up", this._mouseup_callback, !0)), this.adjustMouseEvent(s);
      var o = u.getTime();
      if (s.click_time = o - this.last_mouseclick, this.last_mouse_dragging = !1, this.last_click_position = null, this.block_click && (this.block_click = !1), s.which == 1) {
        if (this.node_widget && this.processNodeWidgets(this.node_widget[0], this.graph_mouse, s), this.node_widget = null, this.selected_group) {
          var a = this.selected_group.pos[0] - Math.round(this.selected_group.pos[0]), l = this.selected_group.pos[1] - Math.round(this.selected_group.pos[1]);
          this.selected_group.move(a, l, s.ctrlKey), this.selected_group.pos[0] = Math.round(
            this.selected_group.pos[0]
          ), this.selected_group.pos[1] = Math.round(
            this.selected_group.pos[1]
          ), this.selected_group._nodes.length && (this.dirty_canvas = !0), this.selected_group = null;
        }
        this.selected_group_resizing = !1;
        var h = this.graph.getNodeOnPos(
          s.canvasX,
          s.canvasY,
          this.visible_nodes
        );
        if (this.dragging_rectangle) {
          if (this.graph) {
            var p = this.graph._nodes, f = new Float32Array(4), c = Math.abs(this.dragging_rectangle[2]), v = Math.abs(this.dragging_rectangle[3]), g = this.dragging_rectangle[2] < 0 ? this.dragging_rectangle[0] - c : this.dragging_rectangle[0], d = this.dragging_rectangle[3] < 0 ? this.dragging_rectangle[1] - v : this.dragging_rectangle[1];
            if (this.dragging_rectangle[0] = g, this.dragging_rectangle[1] = d, this.dragging_rectangle[2] = c, this.dragging_rectangle[3] = v, !h || c > 10 && v > 10) {
              for (var _ = [], b = 0; b < p.length; ++b) {
                var m = p[b];
                m.getBounding(f), u.overlapBounding(
                  this.dragging_rectangle,
                  f
                ) && _.push(m);
              }
              _.length && this.selectNodes(_, s.shiftKey);
            } else
              this.selectNodes([h], s.shiftKey || s.ctrlKey);
          }
          this.dragging_rectangle = null;
        } else if (this.connecting_node) {
          this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
          var y = this.connecting_output || this.connecting_input, E = y.type;
          if (h) {
            if (this.connecting_output) {
              var T = this.isOverNodeInput(
                h,
                s.canvasX,
                s.canvasY
              );
              T != -1 ? this.connecting_node.connect(this.connecting_slot, h, T) : this.connecting_node.connectByTypeInput(this.connecting_slot, h, E);
            } else if (this.connecting_input) {
              var T = this.isOverNodeOutput(
                h,
                s.canvasX,
                s.canvasY
              );
              T != -1 ? h.connect(T, this.connecting_node, this.connecting_slot) : this.connecting_node.connectByTypeOutput(this.connecting_slot, h, E);
            }
          } else
            u.release_link_on_empty_shows_menu && (s.shiftKey && this.allow_searchbox ? this.connecting_output ? this.showSearchBox(s, { node_from: this.connecting_node, slotFrom: this.connecting_output, type_filter_in: this.connecting_output.type }) : this.connecting_input && this.showSearchBox(s, { node_to: this.connecting_node, slotFrom: this.connecting_input, type_filter_out: this.connecting_input.type }) : this.connecting_output ? this.showConnectionMenu({ nodeFrom: this.connecting_node, slotFrom: this.connecting_output, e: s }) : this.connecting_input && this.showConnectionMenu({ nodeTo: this.connecting_node, slotTo: this.connecting_input, e: s }));
          this.connecting_output = null, this.connecting_input = null, this.connecting_pos = null, this.connecting_node = null, this.connecting_slot = -1;
        } else if (this.resizing_node)
          this.dirty_canvas = !0, this.dirty_bgcanvas = !0, this.graph.afterChange(this.resizing_node), this.resizing_node = null;
        else if (this.node_dragged) {
          var h = this.node_dragged;
          h && s.click_time < 300 && h.isShowingTitle(!0) && u.isInsideRectangle(
            s.canvasX,
            s.canvasY,
            h.pos[0],
            h.pos[1] - u.NODE_TITLE_HEIGHT,
            u.NODE_TITLE_HEIGHT,
            u.NODE_TITLE_HEIGHT
          ) && h.collapse(), this.dirty_canvas = !0, this.dirty_bgcanvas = !0, this.node_dragged.pos[0] = Math.round(this.node_dragged.pos[0]), this.node_dragged.pos[1] = Math.round(this.node_dragged.pos[1]), (this.graph.config.align_to_grid || this.align_to_grid) && this.node_dragged.alignToGrid(), this.onNodeMoved && this.onNodeMoved(this.node_dragged), this.graph.afterChange(this.node_dragged), this.node_dragged = null;
        } else {
          var h = this.graph.getNodeOnPos(
            s.canvasX,
            s.canvasY,
            this.visible_nodes
          );
          !h && s.click_time < 300 && this.deselectAllNodes(), this.dirty_canvas = !0, this.dragging_canvas = !1, this.node_over && this.node_over.onMouseUp && this.node_over.onMouseUp(s, [s.canvasX - this.node_over.pos[0], s.canvasY - this.node_over.pos[1]], this), this.node_capturing_input && this.node_capturing_input.onMouseUp && this.node_capturing_input.onMouseUp(s, [
            s.canvasX - this.node_capturing_input.pos[0],
            s.canvasY - this.node_capturing_input.pos[1]
          ], this);
        }
      } else
        s.which == 2 ? (this.dirty_canvas = !0, this.dragging_canvas = !1) : s.which == 3 && (this.dirty_canvas = !0, this.dragging_canvas = !1);
      return i && (this.pointer_is_down = !1, this.pointer_is_double = !1), this.graph.change(), s.stopPropagation(), s.preventDefault(), !1;
    }
  }
  processMouseWheel(e) {
    let s = e;
    if (!(!this.graph || !this.allow_dragcanvas)) {
      var i = s.wheelDeltaY != null ? s.wheelDeltaY : s.detail * -60;
      this.adjustMouseEvent(s);
      var n = s.clientX, r = s.clientY, o = !this.viewport || this.viewport && n >= this.viewport[0] && n < this.viewport[0] + this.viewport[2] && r >= this.viewport[1] && r < this.viewport[1] + this.viewport[3];
      if (o) {
        var a = this.ds.scale;
        return i > 0 ? a *= 1.1 : i < 0 && (a *= 1 / 1.1), this.ds.changeScale(a, [s.clientX, s.clientY]), this.graph.change(), s.preventDefault(), !1;
      }
    }
  }
}
const ne = class {
  /** changes the zoom level of the graph (default is 1), you can pass also a place used to pivot the zoom */
  setZoom(t, e) {
    this.ds.changeScale(t, e), this.maxZoom && this.ds.scale > this.maxZoom ? this.scale = this.maxZoom : this.minZoom && this.ds.scale < this.minZoom && (this.scale = this.minZoom);
  }
  /** brings a node to front (above all other nodes) */
  bringToFront(t) {
    var e = this.graph._nodes.indexOf(t);
    e != -1 && (this.graph._nodes.splice(e, 1), this.graph._nodes.push(t));
  }
  /** sends a node to the back (below all other nodes) */
  sendToBack(t) {
    var e = this.graph._nodes.indexOf(t);
    e != -1 && (this.graph._nodes.splice(e, 1), this.graph._nodes.unshift(t));
  }
  /** checks which nodes are visible (inside the camera area) */
  computeVisibleNodes(t, e = []) {
    var s = e;
    s.length = 0, t = t || this.graph._nodes;
    for (var i = 0, n = t.length; i < n; ++i) {
      var r = t[i];
      this.live_mode && !r.onDrawBackground && !r.onDrawForeground || u.overlapBounding(this.visible_area, r.getBounding(ne.temp)) && s.push(r);
    }
    return s;
  }
  /** renders the whole canvas content, by rendering in two separated canvas, one containing the background grid and the connections, and one containing the nodes) */
  draw(t = !1, e = !1) {
    if (!(!this.canvas || this.canvas.width == 0 || this.canvas.height == 0)) {
      var s = u.getTime();
      this.render_time = (s - this.last_draw_time) * 1e-3, this.last_draw_time = s, this.graph && this.ds.computeVisibleArea(this.viewport), (this.dirty_bgcanvas || e || this.always_render_background || this.graph && this.graph._last_trigger_time && s - this.graph._last_trigger_time < 1e3) && this.drawBackCanvas(), (this.dirty_canvas || t) && this.drawFrontCanvas(), this.fps = this.render_time ? 1 / this.render_time : 0, this.frame += 1;
    }
  }
  /** draws the front canvas (the one containing all the nodes) */
  drawFrontCanvas() {
    this.dirty_canvas = !1, this.ctx || (this.ctx = this.canvas.getContext("2d"));
    var t = this.ctx;
    if (t) {
      var e = this.canvas, s = this.viewport || this.dirty_area;
      if (s && (t.save(), t.beginPath(), t.rect(s[0], s[1], s[2], s[3]), t.clip()), this.clear_background && (s ? t.clearRect(s[0], s[1], s[2], s[3]) : t.clearRect(0, 0, e.width, e.height)), this.bgcanvas == this.canvas ? this.drawBackCanvas() : t.drawImage(this.bgcanvas, 0, 0), this.onRender && this.onRender(e, t), this.show_info && this.renderInfo(t, s ? s[0] : 0, s ? s[1] : 0), this.graph) {
        t.save(), this.ds.toCanvasContext(t);
        for (var i = this.computeVisibleNodes(
          null,
          this.visible_nodes
        ), n = 0; n < i.length; ++n) {
          var r = i[n];
          t.save(), t.translate(r.pos[0], r.pos[1]), this.drawNode(r, t), t.restore();
        }
        if (this.render_execution_order && this.drawExecutionOrder(t), this.graph.config.links_ontop && (this.live_mode || this.drawConnections(t)), this.connecting_pos != null) {
          t.lineWidth = this.connections_width;
          var o = null, a = this.connecting_output || this.connecting_input, l = a.type, h = a.dir;
          h == null && (this.connecting_output ? h = this.connecting_node.horizontal ? L.DOWN : L.RIGHT : h = this.connecting_node.horizontal ? L.UP : L.LEFT);
          var p = a.shape;
          switch (l) {
            case O.EVENT:
              o = u.EVENT_LINK_COLOR;
              break;
            default:
              o = u.CONNECTING_LINK_COLOR;
          }
          if (this.renderLink(
            t,
            this.connecting_pos,
            [this.graph_mouse[0], this.graph_mouse[1]],
            null,
            !1,
            null,
            o,
            h,
            L.CENTER
          ), t.beginPath(), p === A.BOX_SHAPE ? (t.rect(
            this.connecting_pos[0] - 6 + 0.5,
            this.connecting_pos[1] - 5 + 0.5,
            14,
            10
          ), t.fill(), t.beginPath(), t.rect(
            this.graph_mouse[0] - 6 + 0.5,
            this.graph_mouse[1] - 5 + 0.5,
            14,
            10
          )) : p === A.ARROW_SHAPE ? (t.moveTo(this.connecting_pos[0] + 8, this.connecting_pos[1] + 0.5), t.lineTo(this.connecting_pos[0] - 4, this.connecting_pos[1] + 6 + 0.5), t.lineTo(this.connecting_pos[0] - 4, this.connecting_pos[1] - 6 + 0.5), t.closePath()) : (t.arc(
            this.connecting_pos[0],
            this.connecting_pos[1],
            4,
            0,
            Math.PI * 2
          ), t.fill(), t.beginPath(), t.arc(
            this.graph_mouse[0],
            this.graph_mouse[1],
            4,
            0,
            Math.PI * 2
          )), t.fill(), t.fillStyle = "#ffcc00", this._highlight_input) {
            t.beginPath();
            var f = this._highlight_input_slot.shape;
            f === A.ARROW_SHAPE ? (t.moveTo(this._highlight_input[0] + 8, this._highlight_input[1] + 0.5), t.lineTo(this._highlight_input[0] - 4, this._highlight_input[1] + 6 + 0.5), t.lineTo(this._highlight_input[0] - 4, this._highlight_input[1] - 6 + 0.5), t.closePath()) : t.arc(
              this._highlight_input[0],
              this._highlight_input[1],
              6,
              0,
              Math.PI * 2
            ), t.fill();
          }
          this._highlight_output && (t.beginPath(), f === A.ARROW_SHAPE ? (t.moveTo(this._highlight_output[0] + 8, this._highlight_output[1] + 0.5), t.lineTo(this._highlight_output[0] - 4, this._highlight_output[1] + 6 + 0.5), t.lineTo(this._highlight_output[0] - 4, this._highlight_output[1] - 6 + 0.5), t.closePath()) : t.arc(
            this._highlight_output[0],
            this._highlight_output[1],
            6,
            0,
            Math.PI * 2
          ), t.fill());
        }
        this.dragging_rectangle && (t.strokeStyle = "#FFF", t.strokeRect(
          this.dragging_rectangle[0],
          this.dragging_rectangle[1],
          this.dragging_rectangle[2],
          this.dragging_rectangle[3]
        )), this.over_link_center && this.render_link_tooltip ? this.drawLinkTooltip(t, this.over_link_center) : this.onDrawLinkTooltip && this.onDrawLinkTooltip(t, null, this), this.onDrawForeground && this.onDrawForeground(t, this.visible_area), t.restore();
      }
      this._graph_stack && this._graph_stack.length && this.render_subgraph_panels && this.drawSubgraphPanel(t), this.onDrawOverlay && this.onDrawOverlay(t), s && t.restore();
    }
  }
  /**
   * draws the panel in the corner that shows subgraph properties
   * @method drawSubgraphPanel
   **/
  drawSubgraphPanel(t) {
    var e = this.graph, s = e._subgraph_node;
    if (!s) {
      console.warn("subgraph without subnode");
      return;
    }
    this.drawSubgraphPanelLeft(e, s, t), this.drawSubgraphPanelRight(e, s, t);
  }
  drawSubgraphPanelLeft(t, e, s) {
    var i = e.inputs ? e.inputs.length : 0, n = 200, r = Math.floor(u.NODE_SLOT_HEIGHT * 1.6);
    if (s.fillStyle = "#111", s.globalAlpha = 0.8, s.beginPath(), s.roundRect(10, 10, n, (i + 1) * r + 50, [8]), s.fill(), s.globalAlpha = 1, s.fillStyle = "#888", s.font = "14px Arial", s.textAlign = "left", s.fillText("Graph Inputs", 20, 34), this.drawButton(n - 20, 20, 20, 20, "X", "#151515", void 0, void 0, !0)) {
      this.closeSubgraph();
      return;
    }
    var o = 50;
    if (s.font = "14px Arial", e.inputs)
      for (var a = 0; a < e.inputs.length; ++a) {
        var l = e.inputs[a];
        l.not_subgraph_input || (s.fillStyle = "#9C9", s.beginPath(), s.arc(n - 16, o, 5, 0, 2 * Math.PI), s.fill(), s.fillStyle = "#AAA", s.fillText(l.name, 30, o + r * 0.75), s.fillStyle = "#777", s.fillText($(l.type), 130, o + r * 0.75), o += r);
      }
    this.drawButton(20, o + 2, n - 20, r - 2, "+", "#151515", "#222") && this.showSubgraphPropertiesDialog(e);
  }
  drawSubgraphPanelRight(t, e, s) {
    var i = e.outputs ? e.outputs.length : 0, n = this.bgcanvas.width, r = 200, o = Math.floor(u.NODE_SLOT_HEIGHT * 1.6);
    s.fillStyle = "#111", s.globalAlpha = 0.8, s.beginPath(), s.roundRect(n - r - 10, 10, r, (i + 1) * o + 50, [8]), s.fill(), s.globalAlpha = 1, s.fillStyle = "#888", s.font = "14px Arial", s.textAlign = "left";
    var a = "Graph Outputs", l = s.measureText(a).width;
    if (s.fillText(a, n - l - 20, 34), this.drawButton(n - r, 20, 20, 20, "X", "#151515", void 0, void 0, !0)) {
      this.closeSubgraph();
      return;
    }
    var h = 50;
    if (s.font = "14px Arial", e.outputs)
      for (var p = 0; p < e.outputs.length; ++p) {
        var f = e.outputs[p];
        f.not_subgraph_output || (s.fillStyle = "#9C9", s.beginPath(), s.arc(n - r + 16, h, 5, 0, 2 * Math.PI), s.fill(), s.fillStyle = "#AAA", s.fillText(f.name, n - r + 30, h + o * 0.75), s.fillStyle = "#777", s.fillText($(f.type), n - r + 130, h + o * 0.75), h += o);
      }
    this.drawButton(n - r, h + 2, r - 20, o - 2, "+", "#151515", "#222") && this.showSubgraphPropertiesDialogRight(e);
  }
  //Draws a button into the canvas overlay and computes if it was clicked using the immediate gui paradigm
  drawButton(t, e, s, i, n, r = u.NODE_DEFAULT_COLOR, o = "#555", a = u.NODE_TEXT_COLOR, l = !1) {
    const h = !this.block_click && (l || this.allow_interaction && !this.read_only);
    var p = this.ctx, f = this.offset_mouse, c = h && u.isInsideRectangle(f[0], f[1], t, e, s, i);
    f = this.last_click_position_offset;
    var v = h && f && this.pointer_is_down && u.isInsideRectangle(f[0], f[1], t, e, s, i);
    p.fillStyle = c ? o : r, v && (p.fillStyle = "#AAA"), p.beginPath(), p.roundRect(t, e, s, i, [4]), p.fill(), n != null && n.constructor == String && (p.fillStyle = a, p.textAlign = "center", p.font = (i * 0.65 | 0) + "px Arial", p.fillText(n, t + s * 0.5, e + i * 0.75), p.textAlign = "left");
    var g = v && h;
    return v && this.blockClick(), g;
  }
  /** draws every group area in the background */
  drawGroups(t, e) {
    if (this.graph) {
      var s = this.graph._groups;
      e.save(), e.globalAlpha = 0.5 * this.editor_alpha;
      for (var i = 0; i < s.length; ++i) {
        var n = s[i];
        if (u.overlapBounding(this.visible_area, n._bounding)) {
          e.fillStyle = n.color || "#335", e.strokeStyle = n.color || "#335";
          var r = n._pos, o = n._size;
          e.globalAlpha = 0.25 * this.editor_alpha, e.beginPath(), e.rect(r[0] + 0.5, r[1] + 0.5, o[0], o[1]), e.fill(), e.globalAlpha = this.editor_alpha, e.stroke(), e.beginPath(), e.moveTo(r[0] + o[0], r[1] + o[1]), e.lineTo(r[0] + o[0] - 10, r[1] + o[1]), e.lineTo(r[0] + o[0], r[1] + o[1] - 10), e.fill();
          var a = n.font_size || u.DEFAULT_GROUP_FONT_SIZE;
          e.font = a + "px Arial", e.textAlign = "left", e.fillText(n.title, r[0] + 4, r[1] + a);
        }
      }
      e.restore();
    }
  }
  /** draws some useful stats in the corner of the canvas */
  renderInfo(t, e = 10, s) {
    s = s || this.canvas.height - 80, t.save(), t.translate(e, s), t.font = "10px Arial", t.fillStyle = "#888", t.textAlign = "left", this.graph ? (t.fillText("T: " + this.graph.globaltime.toFixed(2) + "s", 5, 13 * 1), t.fillText("I: " + this.graph.iteration, 5, 13 * 2), t.fillText("N: " + this.graph._nodes.length + " [" + this.visible_nodes.length + "]", 5, 13 * 3), t.fillText("V: " + this.graph._version, 5, 13 * 4), t.fillText("FPS:" + this.fps.toFixed(2), 5, 13 * 5)) : t.fillText("No graph selected", 5, 13 * 1), t.restore();
  }
  /** draws the back canvas (the one containing the background and the connections) */
  drawBackCanvas() {
    var t = this.bgcanvas;
    (t.width != this.canvas.width || t.height != this.canvas.height) && (t.width = this.canvas.width, t.height = this.canvas.height), this.bgctx || (this.bgctx = this.bgcanvas.getContext("2d"));
    var e = this.bgctx;
    let s = this.viewport || [0, 0, e.canvas.width, e.canvas.height];
    if (this.clear_background && e.clearRect(s[0], s[1], s[2], s[3]), this._graph_stack && this._graph_stack.length && this.render_subgraph_stack_header) {
      e.save();
      const o = this._graph_stack[this._graph_stack.length - 1].graph, a = this.graph._subgraph_node;
      e.strokeStyle = a.bgcolor, e.lineWidth = 10, e.strokeRect(1, 1, t.width - 2, t.height - 2), e.lineWidth = 1, e.font = "40px Arial", e.textAlign = "center", e.fillStyle = a.bgcolor || "#AAA";
      let l = "";
      for (let h = 1; h < this._graph_stack.length; ++h)
        l += o._subgraph_node.getTitle() + " >> ";
      e.fillText(
        l + a.getTitle(),
        t.width * 0.5,
        40
      ), e.restore();
    }
    let i = !1;
    if (this.onRenderBackground && this.onRenderBackground(t, e) && (i = !0), this.viewport || (e.restore(), e.setTransform(1, 0, 0, 1, 0, 0)), this.visible_links.length = 0, this.graph) {
      if (e.save(), this.ds.toCanvasContext(e), this.ds.scale < 1.5 && !i && this.clear_background_color && (e.fillStyle = this.clear_background_color, e.fillRect(
        this.visible_area[0],
        this.visible_area[1],
        this.visible_area[2],
        this.visible_area[3]
      )), this.background_image && this.ds.scale > 0.5 && !i) {
        this.zoom_modify_alpha ? e.globalAlpha = (1 - 0.5 / this.ds.scale) * this.editor_alpha : e.globalAlpha = this.editor_alpha, e.imageSmoothingEnabled = e.imageSmoothingEnabled = !1, (!this._bg_img || this._bg_img.name != this.background_image) && (this._bg_img = new Image(), this._bg_img.name = this.background_image, this._bg_img.src = this.background_image, this._bg_img.onload = () => {
          this.draw(!0, !0);
        });
        var n = null;
        this._pattern == null && this._bg_img.width > 0 ? (n = e.createPattern(this._bg_img, "repeat"), this._pattern_img = this._bg_img, this._pattern = n) : n = this._pattern, n && (e.fillStyle = n, e.fillRect(
          this.visible_area[0],
          this.visible_area[1],
          this.visible_area[2],
          this.visible_area[3]
        ), e.fillStyle = "transparent"), e.globalAlpha = 1, e.imageSmoothingEnabled = e.imageSmoothingEnabled = !0;
      }
      this.graph._groups.length && !this.live_mode && this.drawGroups(t, e), this.onDrawBackground && this.onDrawBackground(e, this.visible_area), u.debug && (e.fillStyle = "red", e.fillRect(this.visible_area[0] + 10, this.visible_area[1] + 10, this.visible_area[2] - 20, this.visible_area[3] - 20)), this.render_canvas_border && (e.strokeStyle = "#235", e.strokeRect(0, 0, t.width, t.height)), this.render_connections_shadows ? (e.shadowColor = "#000", e.shadowOffsetX = 0, e.shadowOffsetY = 0, e.shadowBlur = 6) : e.shadowColor = "rgba(0,0,0,0)", !this.live_mode && this.render_connections && this.drawConnections(e), e.shadowColor = "rgba(0,0,0,0)", e.restore();
    }
    this.dirty_bgcanvas = !1, this.dirty_canvas = !0;
  }
  /** draws the given node inside the canvas */
  drawNode(t, e) {
    this.current_node = t;
    var s = t.color || t.constructor.color || u.NODE_DEFAULT_COLOR, i = t.bgcolor || t.constructor.bgcolor || u.NODE_DEFAULT_BGCOLOR;
    t.mouseOver;
    var n = this.ds.scale < 0.6;
    if (this.live_mode) {
      t.flags.collapsed || (e.shadowColor = "transparent", t.onDrawForeground && t.onDrawForeground(e, this, this.canvas));
      return;
    }
    var r = this.editor_alpha;
    if (e.globalAlpha = r, this.render_shadows && !n ? (e.shadowColor = u.DEFAULT_SHADOW_COLOR, e.shadowOffsetX = 2 * this.ds.scale, e.shadowOffsetY = 2 * this.ds.scale, e.shadowBlur = 3 * this.ds.scale) : e.shadowColor = "transparent", !(t.flags.collapsed && t.onDrawCollapsed && t.onDrawCollapsed(e, this) == !0)) {
      var o = t.shape || A.BOX_SHAPE, a = ne.temp_vec2;
      ne.temp_vec2.set(t.size);
      var l = t.horizontal;
      if (t.flags.collapsed) {
        e.font = this.inner_text_font;
        var h = t.getTitle ? t.getTitle() : t.title;
        h != null && (t._collapsed_width = Math.min(
          t.size[0],
          e.measureText(h).width + u.NODE_TITLE_HEIGHT * 2
        ), a[0] = t._collapsed_width, a[1] = 0);
      }
      t.clip_area && (e.save(), e.beginPath(), o == A.BOX_SHAPE ? e.rect(0, 0, a[0], a[1]) : o == A.ROUND_SHAPE ? e.roundRect(0, 0, a[0], a[1], [10]) : o == A.CIRCLE_SHAPE && e.arc(
        a[0] * 0.5,
        a[1] * 0.5,
        a[0] * 0.5,
        0,
        Math.PI * 2
      ), e.clip()), t.has_errors && (i = "red"), this.drawNodeShape(
        t,
        e,
        [a[0], a[1]],
        s,
        i,
        t.is_selected,
        t.mouseOver
      ), e.shadowColor = "transparent", t.onDrawForeground && t.onDrawForeground(e, this, this.canvas), e.textAlign = l ? "center" : "left", e.font = this.inner_text_font;
      var p = !n, f = this.connecting_output, c = this.connecting_input;
      e.lineWidth = 1;
      var v = 0, g = [0, 0];
      if (t.flags.collapsed) {
        if (this.render_collapsed_slots) {
          var S = null, F = null;
          if (t.inputs)
            for (let B = 0; B < t.inputs.length; B++) {
              let W = t.inputs[B];
              if (W.link != null) {
                S = W;
                break;
              }
            }
          if (t.outputs)
            for (let B = 0; B < t.outputs.length; B++) {
              let W = t.outputs[B];
              !W.links || !W.links.length || (F = W);
            }
          if (S) {
            var D = 0, G = u.NODE_TITLE_HEIGHT * -0.5;
            l && (D = t._collapsed_width * 0.5, G = -u.NODE_TITLE_HEIGHT), e.fillStyle = "#686", e.beginPath(), S.shape === A.BOX_SHAPE ? e.rect(D - 7 + 0.5, G - 4, 14, 8) : S.shape === A.ARROW_SHAPE ? (e.moveTo(D + 8, G), e.lineTo(D + -4, G - 4), e.lineTo(D + -4, G + 4), e.closePath()) : e.arc(D, G, 4, 0, Math.PI * 2), e.fill();
          }
          if (F) {
            var D = t._collapsed_width, G = u.NODE_TITLE_HEIGHT * -0.5;
            l && (D = t._collapsed_width * 0.5, G = 0), e.fillStyle = "#686", e.strokeStyle = "black", e.beginPath(), F.shape === A.BOX_SHAPE ? e.rect(D - 7 + 0.5, G - 4, 14, 8) : F.shape === A.ARROW_SHAPE ? (e.moveTo(D + 6, G), e.lineTo(D - 6, G - 4), e.lineTo(D - 6, G + 4), e.closePath()) : e.arc(D, G, 4, 0, Math.PI * 2), e.fill();
          }
        }
      } else {
        if (t.inputs)
          for (var d = 0; d < t.inputs.length; d++) {
            var _ = t.inputs[d], b = _.type, m = _.shape;
            e.globalAlpha = r, this.connecting_output && !u.isValidConnection(_.type, f.type) ? e.globalAlpha = 0.4 * r : e.globalAlpha = r, e.fillStyle = _.link != null ? _.color_on || N.DEFAULT_CONNECTION_COLORS_BY_TYPE[b] || N.DEFAULT_CONNECTION_COLORS.input_on : _.color_off || N.DEFAULT_CONNECTION_COLORS_BY_TYPE_OFF[b] || N.DEFAULT_CONNECTION_COLORS_BY_TYPE[b] || N.DEFAULT_CONNECTION_COLORS.input_off;
            var y = t.getConnectionPos(!0, d, [g[0], g[1]]);
            y[0] -= t.pos[0], y[1] -= t.pos[1], v < y[1] + u.NODE_SLOT_HEIGHT * 0.5 && (v = y[1] + u.NODE_SLOT_HEIGHT * 0.5), e.beginPath();
            var E = !0;
            if (_.shape === A.BOX_SHAPE ? l ? e.rect(
              y[0] - 5 + 0.5,
              y[1] - 8 + 0.5,
              10,
              14
            ) : e.rect(
              y[0] - 6 + 0.5,
              y[1] - 5 + 0.5,
              14,
              10
            ) : m === A.ARROW_SHAPE ? (e.moveTo(y[0] + 8, y[1] + 0.5), e.lineTo(y[0] - 4, y[1] + 6 + 0.5), e.lineTo(y[0] - 4, y[1] - 6 + 0.5), e.closePath()) : m === A.GRID_SHAPE ? (e.rect(y[0] - 4, y[1] - 4, 2, 2), e.rect(y[0] - 1, y[1] - 4, 2, 2), e.rect(y[0] + 2, y[1] - 4, 2, 2), e.rect(y[0] - 4, y[1] - 1, 2, 2), e.rect(y[0] - 1, y[1] - 1, 2, 2), e.rect(y[0] + 2, y[1] - 1, 2, 2), e.rect(y[0] - 4, y[1] + 2, 2, 2), e.rect(y[0] - 1, y[1] + 2, 2, 2), e.rect(y[0] + 2, y[1] + 2, 2, 2), E = !1) : n ? e.rect(y[0] - 4, y[1] - 4, 8, 8) : e.arc(y[0], y[1], 4, 0, Math.PI * 2), e.fill(), p) {
              var T = _.label != null ? _.label : _.name;
              T && (e.fillStyle = u.NODE_TEXT_COLOR, l || _.dir == L.UP ? e.fillText(T, y[0], y[1] - 10) : e.fillText(T, y[0] + 10, y[1] + 5));
            }
          }
        if (e.textAlign = l ? "center" : "right", e.strokeStyle = "black", t.outputs)
          for (let B = 0; B < t.outputs.length; B++) {
            let W = t.outputs[B];
            var b = W.type, m = W.shape;
            this.connecting_input && !u.isValidConnection(c.type, b) ? e.globalAlpha = 0.4 * r : e.globalAlpha = r;
            var y = t.getConnectionPos(!1, B, g);
            y[0] -= t.pos[0], y[1] -= t.pos[1], v < y[1] + u.NODE_SLOT_HEIGHT * 0.5 && (v = y[1] + u.NODE_SLOT_HEIGHT * 0.5), e.fillStyle = W.links && W.links.length ? W.color_on || N.DEFAULT_CONNECTION_COLORS_BY_TYPE[b] || N.DEFAULT_CONNECTION_COLORS.output_on : W.color_off || N.DEFAULT_CONNECTION_COLORS_BY_TYPE_OFF[b] || N.DEFAULT_CONNECTION_COLORS_BY_TYPE[b] || N.DEFAULT_CONNECTION_COLORS.output_off, e.beginPath();
            var E = !0;
            if (m === A.BOX_SHAPE ? l ? e.rect(
              y[0] - 5 + 0.5,
              y[1] - 8 + 0.5,
              10,
              14
            ) : e.rect(
              y[0] - 6 + 0.5,
              y[1] - 5 + 0.5,
              14,
              10
            ) : m === A.ARROW_SHAPE ? (e.moveTo(y[0] + 8, y[1] + 0.5), e.lineTo(y[0] - 4, y[1] + 6 + 0.5), e.lineTo(y[0] - 4, y[1] - 6 + 0.5), e.closePath()) : m === A.GRID_SHAPE ? (e.rect(y[0] - 4, y[1] - 4, 2, 2), e.rect(y[0] - 1, y[1] - 4, 2, 2), e.rect(y[0] + 2, y[1] - 4, 2, 2), e.rect(y[0] - 4, y[1] - 1, 2, 2), e.rect(y[0] - 1, y[1] - 1, 2, 2), e.rect(y[0] + 2, y[1] - 1, 2, 2), e.rect(y[0] - 4, y[1] + 2, 2, 2), e.rect(y[0] - 1, y[1] + 2, 2, 2), e.rect(y[0] + 2, y[1] + 2, 2, 2), E = !1) : n ? e.rect(y[0] - 4, y[1] - 4, 8, 8) : e.arc(y[0], y[1], 4, 0, Math.PI * 2), e.fill(), !n && E && e.stroke(), p) {
              var T = W.label != null ? W.label : W.name;
              T && (e.fillStyle = u.NODE_TEXT_COLOR, l || W.dir == L.DOWN ? e.fillText(T, y[0], y[1] - 8) : e.fillText(T, y[0] - 10, y[1] + 5));
            }
          }
        if (e.textAlign = "left", e.globalAlpha = 1, t.widgets) {
          var I = v;
          (l || t.widgets_up) && (I = 2), t.widgets_start_y != null && (I = t.widgets_start_y), this.drawNodeWidgets(
            t,
            I,
            e,
            this.node_widget && this.node_widget[0] == t ? this.node_widget[1] : null
          );
        }
      }
      t.clip_area && e.restore(), e.globalAlpha = 1;
    }
  }
  /** used by this.over_link_center */
  drawLinkTooltip(t, e) {
    var s = e._pos;
    if (this.allow_interaction && !this.read_only && (t.fillStyle = "black", t.beginPath(), t.arc(s[0], s[1], 3, 0, Math.PI * 2), t.fill()), e.data != null && !(this.onDrawLinkTooltip && this.onDrawLinkTooltip(t, e, this) == !0)) {
      var i = e.data, n = null;
      if (i.constructor === Number ? n = i.toFixed(2) : i.constructor === String ? n = '"' + i + '"' : i.constructor === Boolean ? n = String(i) : i.toToolTip ? n = i.toToolTip() : n = "[" + i.constructor.name + "]", n != null) {
        n = n.substr(0, 30), t.font = "14px Courier New";
        var r = t.measureText(n), o = r.width + 20, a = 24;
        t.shadowColor = "black", t.shadowOffsetX = 2, t.shadowOffsetY = 2, t.shadowBlur = 3, t.fillStyle = "#454", t.beginPath(), t.roundRect(s[0] - o * 0.5, s[1] - 15 - a, o, a, [3]), t.moveTo(s[0] - 10, s[1] - 15), t.lineTo(s[0] + 10, s[1] - 15), t.lineTo(s[0], s[1] - 5), t.fill(), t.shadowColor = "transparent", t.textAlign = "center", t.fillStyle = "#CEC", t.fillText(n, s[0], s[1] - 15 - a * 0.3);
      }
    }
  }
  /** draws the shape of the given node in the canvas */
  drawNodeShape(t, e, s, i, n, r, o) {
    e.strokeStyle = i, e.fillStyle = n;
    var a = u.NODE_TITLE_HEIGHT, l = this.ds.scale < 0.5, h = t.shape || t.constructor.shape || A.ROUND_SHAPE, p = t.titleMode, f = t.isShowingTitle(o), c = ne.tmp_area;
    c[0] = 0, c[1] = f ? -a : 0, c[2] = s[0] + 1, c[3] = f ? s[1] + a : s[1];
    var v = e.globalAlpha;
    if (e.beginPath(), h == A.BOX_SHAPE || l ? e.fillRect(c[0], c[1], c[2], c[3]) : h == A.ROUND_SHAPE || h == A.CARD_SHAPE ? e.roundRect(
      c[0],
      c[1],
      c[2],
      c[3],
      h == A.CARD_SHAPE ? [this.round_radius, this.round_radius, 0, 0] : [this.round_radius]
    ) : h == A.CIRCLE_SHAPE && e.arc(
      s[0] * 0.5,
      s[1] * 0.5,
      s[0] * 0.5,
      0,
      Math.PI * 2
    ), e.fill(), !t.flags.collapsed && f && (e.shadowColor = "transparent", e.fillStyle = "rgba(0,0,0,0.2)", e.fillRect(0, -1, c[2], 2)), e.shadowColor = "transparent", t.onDrawBackground && t.onDrawBackground(e, this, this.canvas, this.graph_mouse), f || p == se.TRANSPARENT_TITLE) {
      if (t.onDrawTitleBar)
        t.onDrawTitleBar(e, this, a, s, this.ds.scale, i);
      else if (p != se.TRANSPARENT_TITLE && (t.constructor.title_color || this.render_title_colored)) {
        var g = t.constructor.title_color || i;
        if (t.flags.collapsed && (e.shadowColor = u.DEFAULT_SHADOW_COLOR), this.use_gradients) {
          var d = N.gradients[g];
          d || (d = N.gradients[g] = e.createLinearGradient(0, 0, 400, 0), d.addColorStop(0, g), d.addColorStop(1, "#000")), e.fillStyle = d;
        } else
          e.fillStyle = g;
        e.beginPath(), h == A.BOX_SHAPE || l ? e.rect(0, -a, s[0] + 1, a) : (h == A.ROUND_SHAPE || h == A.CARD_SHAPE) && e.roundRect(
          0,
          -a,
          s[0] + 1,
          a,
          t.flags.collapsed ? [this.round_radius] : [this.round_radius, this.round_radius, 0, 0]
        ), e.fill(), e.shadowColor = "transparent";
      }
      var _ = null;
      u.node_box_coloured_by_mode && Ke[t.mode] && (_ = Ke[t.mode]), u.node_box_coloured_when_on && (_ = t.action_triggered ? "#FFF" : t.execute_triggered ? "#AAA" : _);
      var b = 10;
      if (t.onDrawTitleBox ? t.onDrawTitleBox(e, this, a, s, this.ds.scale) : h == A.ROUND_SHAPE || h == A.CIRCLE_SHAPE || h == A.CARD_SHAPE ? (l && (e.fillStyle = "black", e.beginPath(), e.arc(
        a * 0.5,
        a * -0.5,
        b * 0.5 + 1,
        0,
        Math.PI * 2
      ), e.fill()), e.fillStyle = t.boxcolor || _ || u.NODE_DEFAULT_BOXCOLOR, l ? e.fillRect(a * 0.5 - b * 0.5, a * -0.5 - b * 0.5, b, b) : (e.beginPath(), e.arc(
        a * 0.5,
        a * -0.5,
        b * 0.5,
        0,
        Math.PI * 2
      ), e.fill())) : (l && (e.fillStyle = "black", e.fillRect(
        (a - b) * 0.5 - 1,
        (a + b) * -0.5 - 1,
        b + 2,
        b + 2
      )), e.fillStyle = t.boxcolor || _ || u.NODE_DEFAULT_BOXCOLOR, e.fillRect(
        (a - b) * 0.5,
        (a + b) * -0.5,
        b,
        b
      )), e.globalAlpha = v, t.onDrawTitleText && t.onDrawTitleText(
        e,
        this,
        a,
        s,
        this.ds.scale,
        this.title_text_font,
        r
      ), !l) {
        e.font = this.title_text_font;
        var m = String(t.getTitle());
        m && (r ? e.fillStyle = u.NODE_SELECTED_TITLE_COLOR : e.fillStyle = t.constructor.title_text_color || this.node_title_color, t.flags.collapsed ? (e.textAlign = "left", e.fillText(
          m.substr(0, 20),
          //avoid urls too long
          a,
          // + measure.width * 0.5,
          u.NODE_TITLE_TEXT_Y - a
        ), e.textAlign = "left") : (e.textAlign = "left", e.fillText(
          m,
          a,
          u.NODE_TITLE_TEXT_Y - a
        )));
      }
      if (!t.flags.collapsed && t.subgraph && !t.skip_subgraph_button) {
        var y = u.NODE_TITLE_HEIGHT, E = t.size[0] - y, T = u.isInsideRectangle(this.graph_mouse[0] - t.pos[0], this.graph_mouse[1] - t.pos[1], E + 2, -y + 2, y - 4, y - 4);
        e.fillStyle = T ? "#888" : "#555", h == A.BOX_SHAPE || l ? e.fillRect(E + 2, -y + 2, y - 4, y - 4) : (e.beginPath(), e.roundRect(E + 2, -y + 2, y - 4, y - 4, [4]), e.fill()), e.fillStyle = "#333", e.beginPath(), e.moveTo(E + y * 0.2, -y * 0.6), e.lineTo(E + y * 0.8, -y * 0.6), e.lineTo(E + y * 0.5, -y * 0.3), e.fill();
      }
      t.onDrawTitle && t.onDrawTitle(e, this);
    }
    r && (t.onBounding && t.onBounding(c), p == se.TRANSPARENT_TITLE && (c[1] -= a, c[3] += a), e.lineWidth = 1, e.globalAlpha = 0.8, e.beginPath(), h == A.BOX_SHAPE ? e.rect(
      -6 + c[0],
      -6 + c[1],
      12 + c[2],
      12 + c[3]
    ) : h == A.ROUND_SHAPE || h == A.CARD_SHAPE && t.flags.collapsed ? e.roundRect(
      -6 + c[0],
      -6 + c[1],
      12 + c[2],
      12 + c[3],
      [this.round_radius * 2]
    ) : h == A.CARD_SHAPE ? e.roundRect(
      -6 + c[0],
      -6 + c[1],
      12 + c[2],
      12 + c[3],
      [this.round_radius * 2, 2, this.round_radius * 2, 2]
    ) : h == A.CIRCLE_SHAPE && e.arc(
      s[0] * 0.5,
      s[1] * 0.5,
      s[0] * 0.5 + 6,
      0,
      Math.PI * 2
    ), e.strokeStyle = u.NODE_BOX_OUTLINE_COLOR, e.stroke(), e.strokeStyle = i, e.globalAlpha = 1), t.execute_triggered > 0 && t.execute_triggered--, t.action_triggered > 0 && t.action_triggered--;
  }
  /** draws every connection visible in the canvas */
  drawConnections(t) {
    var e = u.getTime(), s = this.visible_area;
    let i = ne.margin_area;
    i[0] = s[0] - 20, i[1] = s[1] - 20, i[2] = s[2] + 40, i[3] = s[3] + 40, t.lineWidth = this.connections_width, t.fillStyle = "#AAA", t.strokeStyle = "#AAA", t.globalAlpha = this.editor_alpha;
    for (var n = this.graph._nodes, r = 0, o = n.length; r < o; ++r) {
      var a = n[r];
      if (!(!a.inputs || !a.inputs.length))
        for (var l = 0; l < a.inputs.length; ++l) {
          var h = a.inputs[l];
          if (!h || h.link == null)
            continue;
          var p = h.link, f = this.graph.links[p];
          if (!f)
            continue;
          var c = this.graph.getNodeById(f.origin_id);
          if (c == null)
            continue;
          var v = f.origin_slot, g = null;
          v == -1 ? g = [
            c.pos[0] + 10,
            c.pos[1] + 10
          ] : g = c.getConnectionPos(
            !1,
            v,
            ne.tempA
          );
          var d = a.getConnectionPos(!0, l, ne.tempB);
          let I = ne.link_bounding;
          if (I[0] = g[0], I[1] = g[1], I[2] = d[0] - g[0], I[3] = d[1] - g[1], I[2] < 0 && (I[0] += I[2], I[2] = Math.abs(I[2])), I[3] < 0 && (I[1] += I[3], I[3] = Math.abs(I[3])), !!u.overlapBounding(I, i)) {
            var _ = c.outputs[v], b = a.inputs[l];
            if (!(!_ || !b)) {
              var m = _.dir || (c.horizontal ? L.DOWN : L.RIGHT), y = b.dir || (a.horizontal ? L.UP : L.LEFT);
              if (this.renderLink(
                t,
                g,
                d,
                f,
                !1,
                !1,
                null,
                m,
                y
              ), f && f._last_time && e - f._last_time < 1e3) {
                var E = 2 - (e - f._last_time) * 2e-3, T = t.globalAlpha;
                t.globalAlpha = T * E, this.renderLink(
                  t,
                  g,
                  d,
                  f,
                  !0,
                  !0,
                  "white",
                  m,
                  y
                ), t.globalAlpha = T;
              }
            }
          }
        }
    }
    t.globalAlpha = 1;
  }
  /**
   * draws a link between two points
   * @param a start pos
   * @param b end pos
   * @param link the link object with all the link info
   * @param skipBorder ignore the shadow of the link
   * @param flow show flow animation (for events)
   * @param color the color for the link
   * @param startDir the direction enum
   * @param endDir the direction enum
   * @param numSublines number of sublines (useful to represent vec3 or rgb)
   **/
  renderLink(t, e, s, i, n, r, o, a, l, h) {
    i && this.visible_links.push(i), !o && i && (o = i.color || this.link_type_colors[i.type]), o || (o = this.default_link_color), i != null && this.highlighted_links[i.id] && (o = "#FFF"), a = a || L.RIGHT, l = l || L.LEFT;
    var p = u.distance(e, s);
    this.render_connections_border && this.ds.scale > 0.6 && (t.lineWidth = this.connections_width + 4), t.lineJoin = "round", h = h || 1, h > 1 && (t.lineWidth = 0.5), t.beginPath();
    for (var f = 0; f < h; f += 1) {
      var c = (f - (h - 1) * 0.5) * 5;
      if (this.links_render_mode == de.SPLINE_LINK) {
        t.moveTo(e[0], e[1] + c);
        var v = 0, g = 0, d = 0, _ = 0;
        switch (a) {
          case L.LEFT:
            v = p * -0.25;
            break;
          case L.RIGHT:
            v = p * 0.25;
            break;
          case L.UP:
            g = p * -0.25;
            break;
          case L.DOWN:
            g = p * 0.25;
            break;
        }
        switch (l) {
          case L.LEFT:
            d = p * -0.25;
            break;
          case L.RIGHT:
            d = p * 0.25;
            break;
          case L.UP:
            _ = p * -0.25;
            break;
          case L.DOWN:
            _ = p * 0.25;
            break;
        }
        t.bezierCurveTo(
          e[0] + v,
          e[1] + g + c,
          s[0] + d,
          s[1] + _ + c,
          s[0],
          s[1] + c
        );
      } else if (this.links_render_mode == de.LINEAR_LINK) {
        t.moveTo(e[0], e[1] + c);
        var v = 0, g = 0, d = 0, _ = 0;
        switch (a) {
          case L.LEFT:
            v = -1;
            break;
          case L.RIGHT:
            v = 1;
            break;
          case L.UP:
            g = -1;
            break;
          case L.DOWN:
            g = 1;
            break;
        }
        switch (l) {
          case L.LEFT:
            d = -1;
            break;
          case L.RIGHT:
            d = 1;
            break;
          case L.UP:
            _ = -1;
            break;
          case L.DOWN:
            _ = 1;
            break;
        }
        var b = 15;
        t.lineTo(
          e[0] + v * b,
          e[1] + g * b + c
        ), t.lineTo(
          s[0] + d * b,
          s[1] + _ * b + c
        ), t.lineTo(s[0], s[1] + c);
      } else if (this.links_render_mode == de.STRAIGHT_LINK) {
        t.moveTo(e[0], e[1]);
        var m = e[0], y = e[1], E = s[0], T = s[1];
        a == L.RIGHT ? m += 10 : y += 10, l == L.LEFT ? E -= 10 : T -= 10, t.lineTo(m, y), t.lineTo((m + E) * 0.5, y), t.lineTo((m + E) * 0.5, T), t.lineTo(E, T), t.lineTo(s[0], s[1]);
      } else
        return;
    }
    this.render_connections_border && this.ds.scale > 0.6 && !n && (t.strokeStyle = "rgba(0,0,0,0.5)", t.stroke()), t.lineWidth = this.connections_width, t.fillStyle = t.strokeStyle = o, t.stroke();
    var I = this.computeConnectionPoint(e, s, 0.5, a, l);
    if (i && i._pos && (i._pos[0] = I[0], i._pos[1] = I[1]), this.ds.scale >= 0.6 && this.highquality_render && l != L.CENTER) {
      if (this.render_connection_arrows) {
        var S = this.computeConnectionPoint(
          e,
          s,
          0.25,
          a,
          l
        ), F = this.computeConnectionPoint(
          e,
          s,
          0.26,
          a,
          l
        ), D = this.computeConnectionPoint(
          e,
          s,
          0.75,
          a,
          l
        ), G = this.computeConnectionPoint(
          e,
          s,
          0.76,
          a,
          l
        ), B = 0, W = 0;
        this.render_curved_connections ? (B = -Math.atan2(F[0] - S[0], F[1] - S[1]), W = -Math.atan2(G[0] - D[0], G[1] - D[1])) : W = B = s[1] > e[1] ? 0 : Math.PI, t.save(), t.translate(S[0], S[1]), t.rotate(B), t.beginPath(), t.moveTo(-5, -3), t.lineTo(0, 7), t.lineTo(5, -3), t.fill(), t.restore(), t.save(), t.translate(D[0], D[1]), t.rotate(W), t.beginPath(), t.moveTo(-5, -3), t.lineTo(0, 7), t.lineTo(5, -3), t.fill(), t.restore();
      }
      t.beginPath(), t.arc(I[0], I[1], 5, 0, Math.PI * 2), t.fill();
    }
    if (r) {
      t.fillStyle = o;
      for (var f = 0; f < 5; ++f) {
        var pe = (u.getTime() * 1e-3 + f * 0.2) % 1, I = this.computeConnectionPoint(
          e,
          s,
          pe,
          a,
          l
        );
        t.beginPath(), t.arc(I[0], I[1], 5, 0, 2 * Math.PI), t.fill();
      }
    }
  }
  computeConnectionPoint(t, e, s, i = L.RIGHT, n = L.LEFT) {
    var r = u.distance(t, e), o = t, a = [t[0], t[1]], l = [e[0], e[1]], h = e;
    switch (i) {
      case L.LEFT:
        a[0] += r * -0.25;
        break;
      case L.RIGHT:
        a[0] += r * 0.25;
        break;
      case L.UP:
        a[1] += r * -0.25;
        break;
      case L.DOWN:
        a[1] += r * 0.25;
        break;
    }
    switch (n) {
      case L.LEFT:
        l[0] += r * -0.25;
        break;
      case L.RIGHT:
        l[0] += r * 0.25;
        break;
      case L.UP:
        l[1] += r * -0.25;
        break;
      case L.DOWN:
        l[1] += r * 0.25;
        break;
    }
    var p = (1 - s) * (1 - s) * (1 - s), f = 3 * ((1 - s) * (1 - s)) * s, c = 3 * (1 - s) * (s * s), v = s * s * s, g = p * o[0] + f * a[0] + c * l[0] + v * h[0], d = p * o[1] + f * a[1] + c * l[1] + v * h[1];
    return [g, d];
  }
  drawExecutionOrder(t) {
    t.shadowColor = "transparent", t.globalAlpha = 0.25, t.textAlign = "center", t.strokeStyle = "white", t.globalAlpha = 0.75;
    for (var e = this.visible_nodes, s = 0; s < e.length; ++s) {
      var i = e[s];
      t.fillStyle = "black", t.fillRect(
        i.pos[0] - u.NODE_TITLE_HEIGHT,
        i.pos[1] - u.NODE_TITLE_HEIGHT,
        u.NODE_TITLE_HEIGHT,
        u.NODE_TITLE_HEIGHT
      ), i.order == 0 && t.strokeRect(
        i.pos[0] - u.NODE_TITLE_HEIGHT + 0.5,
        i.pos[1] - u.NODE_TITLE_HEIGHT + 0.5,
        u.NODE_TITLE_HEIGHT,
        u.NODE_TITLE_HEIGHT
      ), t.fillStyle = "#FFF", t.fillText(
        "" + i.order,
        i.pos[0] + u.NODE_TITLE_HEIGHT * -0.5,
        i.pos[1] - 6
      );
    }
    t.globalAlpha = 1;
  }
  /** draws the widgets stored inside a node */
  drawNodeWidgets(t, e, s, i) {
    if (!(!t.widgets || !t.widgets.length)) {
      var n = t.size[0], r = t.widgets;
      e += 2;
      var o = u.NODE_WIDGET_HEIGHT, a = this.ds.scale > 0.5;
      s.save(), s.globalAlpha = this.editor_alpha;
      for (var l = u.WIDGET_OUTLINE_COLOR, h = u.WIDGET_BGCOLOR, p = u.WIDGET_TEXT_COLOR, f = u.WIDGET_SECONDARY_TEXT_COLOR, c = 15, v = 0; v < r.length; ++v) {
        var g = r[v];
        if (!g.hidden) {
          var d = e;
          g.y && (d = g.y), g.last_y = d, s.strokeStyle = l, s.fillStyle = "#222", s.textAlign = "left", g.disabled && (s.globalAlpha *= 0.5);
          var _ = g.width || n;
          switch (g.type) {
            case "button":
              g.clicked && (s.fillStyle = "#AAA", g.clicked = !1, this.dirty_canvas = !0), s.fillRect(c, d, _ - c * 2, o), a && !g.disabled && !u.ignore_all_widget_events && s.strokeRect(c, d, _ - c * 2, o), a && (s.textAlign = "center", s.fillStyle = p, s.fillText(g.name, _ * 0.5, d + o * 0.7));
              break;
            case "toggle":
              s.textAlign = "left", s.strokeStyle = l, s.fillStyle = h, s.beginPath(), a ? s.roundRect(c, d, _ - c * 2, o, [o * 0.5]) : s.rect(c, d, _ - c * 2, o), s.fill(), a && !g.disabled && !u.ignore_all_widget_events && s.stroke(), s.fillStyle = g.value ? "#89A" : "#333", s.beginPath(), s.arc(_ - c * 2, d + o * 0.5, o * 0.36, 0, Math.PI * 2), s.fill(), a && (s.fillStyle = f, g.name != null && s.fillText(g.name, c * 2, d + o * 0.7), s.fillStyle = g.value ? p : f, s.textAlign = "right", s.fillText(
                g.value ? g.options.on || "true" : g.options.off || "false",
                _ - 40,
                d + o * 0.7
              ));
              break;
            case "slider":
              s.fillStyle = h, s.fillRect(c, d, _ - c * 2, o);
              var b = g.options.max - g.options.min, m = (g.value - g.options.min) / b;
              if (s.fillStyle = i == g ? "#89A" : "#678", s.fillRect(c, d, m * (_ - c * 2), o), a && !g.disabled && s.strokeRect(c, d, _ - c * 2, o), g.marker) {
                var y = (+g.marker - g.options.min) / b;
                s.fillStyle = "#AA9", s.fillRect(c + y * (_ - c * 2), d, 2, o);
              }
              a && (s.textAlign = "center", s.fillStyle = p, s.fillText(
                g.name + "  " + Number(g.value).toFixed(3),
                _ * 0.5,
                d + o * 0.7
              ));
              break;
            case "number":
            case "combo":
              if (s.textAlign = "left", s.strokeStyle = l, s.fillStyle = h, s.beginPath(), a ? s.roundRect(c, d, _ - c * 2, o, [o * 0.5]) : s.rect(c, d, _ - c * 2, o), s.fill(), a)
                if (!g.disabled && !u.ignore_all_widget_events && s.stroke(), s.fillStyle = p, !g.disabled && !u.ignore_all_widget_events && (s.beginPath(), s.moveTo(c + 16, d + 5), s.lineTo(c + 6, d + o * 0.5), s.lineTo(c + 16, d + o - 5), s.fill(), s.beginPath(), s.moveTo(_ - c - 16, d + 5), s.lineTo(_ - c - 6, d + o * 0.5), s.lineTo(_ - c - 16, d + o - 5), s.fill()), s.fillStyle = f, s.fillText(g.name, c * 2 + 5, d + o * 0.7), s.fillStyle = p, s.textAlign = "right", g.type == "number")
                  s.fillText(
                    Number(g.value).toFixed(
                      g.options.precision !== void 0 ? g.options.precision : 3
                    ),
                    _ - c * 2 - 20,
                    d + o * 0.7
                  );
                else {
                  var E = g.value;
                  if (g.options.values) {
                    var T = g.options.values;
                    T.constructor === Function && (T = T()), T && T.constructor !== Array && (E = T[g.value]);
                  }
                  s.fillText(
                    E,
                    _ - c * 2 - 20,
                    d + o * 0.7
                  );
                }
              break;
            case "string":
            case "text":
              s.textAlign = "left", s.strokeStyle = l, s.fillStyle = h, s.beginPath(), a ? s.roundRect(c, d, _ - c * 2, o, [o * 0.5]) : s.rect(c, d, _ - c * 2, o), s.fill(), a && (g.disabled || s.stroke(), s.save(), s.beginPath(), s.rect(c, d, _ - c * 2, o), s.clip(), s.fillStyle = f, g.name != null && s.fillText(g.name, c * 2, d + o * 0.7), s.fillStyle = p, s.textAlign = "right", s.fillText(String(g.value).substr(0, g.options.max_length || 30), _ - c * 2, d + o * 0.7), s.restore());
              break;
            default:
              g.draw && g.draw(s, t, _, d, o);
              break;
          }
          e += (g.computeSize ? g.computeSize(_)[1] : o) + 4, s.globalAlpha = this.editor_alpha;
        }
      }
      s.restore(), s.textAlign = "left";
    }
  }
};
let U = ne;
U.temp = new Float32Array(4);
U.temp_vec2 = new Float32Array(2);
U.tmp_area = new Float32Array(4);
U.margin_area = new Float32Array(4);
U.link_bounding = new Float32Array(4);
U.tempA = [0, 0];
U.tempB = [0, 0];
class me {
  constructor(e = "Group") {
    this.fontSize = u.DEFAULT_GROUP_FONT_SIZE, this._nodes = [], this.graph = null, this._bounding = new Float32Array([10, 10, 140, 80]), this.title = e, this.color = N.node_colors.pale_blue ? N.node_colors.pale_blue.groupcolor : "#AAA", this._pos = this._bounding.subarray(0, 2), this._size = this._bounding.subarray(2, 4);
  }
  get bounding() {
    return this._bounding;
  }
  get pos() {
    return [this._pos[0], this._pos[1]];
  }
  set pos(e) {
    !e || e.length < 2 || (this._pos[0] = e[0], this._pos[1] = e[1]);
  }
  get size() {
    return [this._size[0], this._size[1]];
  }
  set size(e) {
    !e || e.length < 2 || (this._size[0] = Math.max(140, e[0]), this._size[1] = Math.max(80, e[1]));
  }
  configure(e) {
    e.bounding, this.title = e.title, this._bounding.set(e.bounding), this.color = e.color, this.font = e.font;
  }
  serialize() {
    const e = this._bounding;
    return {
      title: this.title,
      bounding: [
        Math.round(e[0]),
        Math.round(e[1]),
        Math.round(e[2]),
        Math.round(e[3])
      ],
      color: this.color,
      font: this.font
    };
  }
  move(e, s, i) {
    if (this._pos[0] += e, this._pos[1] += s, !i)
      for (var n = 0; n < this._nodes.length; ++n) {
        var r = this._nodes[n];
        r.pos[0] += e, r.pos[1] += s;
      }
  }
  recomputeInsideNodes() {
    this._nodes.length = 0;
    for (var e = this.graph._nodes, s = new Float32Array(4), i = 0; i < e.length; ++i) {
      var n = e[i];
      n.getBounding(s), u.overlapBounding(this._bounding, s) && this._nodes.push(n);
    }
  }
  /** checks if a point is inside the shape of a node */
  isPointInside(e, s, i = 0, n = !1) {
    var r = this.graph && this.graph.isLive() ? 0 : u.NODE_TITLE_HEIGHT;
    return n && (r = 0), this.pos[0] - 4 - i < e && this.pos[0] + this.size[0] + 4 + i > e && this.pos[1] - r - i < s && this.pos[1] + this.size[1] + i > s;
  }
  /** Forces to redraw or the main canvas (LGraphNode) or the bg canvas (links) */
  setDirtyCanvas(e, s = !1) {
    this.graph && this.graph.sendActionToCanvas("setDirty", [e, s]);
  }
}
class he {
  constructor(e, s, i, n, r, o) {
    this.data = null, this._pos = [0, 0], this._last_time = 0, this.id = e, this.type = s, this.origin_id = i, this.origin_slot = n, this.target_id = r, this.target_slot = o;
  }
  static configure(e) {
    return e instanceof Array ? new he(e[0], e[5], e[1], e[2], e[3], e[4]) : new he(e.id, e.type, e.origin_id, e.origin_slot, e.target_id, e.target_slot);
  }
  serialize() {
    return [
      this.id,
      this.origin_id,
      this.origin_slot,
      this.target_id,
      this.target_slot,
      this.type
    ];
  }
}
let ve;
const zt = new Uint8Array(16);
function Ut() {
  if (!ve && (ve = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !ve))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return ve(zt);
}
const q = [];
for (let t = 0; t < 256; ++t)
  q.push((t + 256).toString(16).slice(1));
function Wt(t, e = 0) {
  return (q[t[e + 0]] + q[t[e + 1]] + q[t[e + 2]] + q[t[e + 3]] + "-" + q[t[e + 4]] + q[t[e + 5]] + "-" + q[t[e + 6]] + q[t[e + 7]] + "-" + q[t[e + 8]] + q[t[e + 9]] + "-" + q[t[e + 10]] + q[t[e + 11]] + q[t[e + 12]] + q[t[e + 13]] + q[t[e + 14]] + q[t[e + 15]]).toLowerCase();
}
const Vt = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), $e = {
  randomUUID: Vt
};
function ae(t, e, s) {
  if ($e.randomUUID && !e && !t)
    return $e.randomUUID();
  t = t || {};
  const i = t.random || (t.rng || Ut)();
  if (i[6] = i[6] & 15 | 64, i[8] = i[8] & 63 | 128, e) {
    s = s || 0;
    for (let n = 0; n < 16; ++n)
      e[s + n] = i[n];
    return e;
  }
  return Wt(i);
}
const Be = class {
  constructor(t) {
    this.desc = "", this.pos = [0, 0], this.subgraph = null, this.skip_subgraph_button = !1, this.priority = 0, this.removable = !0, this.clonable = !0, this.collapsable = !0, this.titleMode = se.NORMAL_TITLE, this.serialize_widgets = !1, this.hide_in_node_lists = !1, this.block_delete = !1, this.ignore_remove = !1, this.last_serialization = null, this._relative_id = null, this.exec_version = 0, this.action_call = null, this.execute_triggered = 0, this.action_triggered = 0, this.no_panel_on_double_click = !1, this.console = [], this.title = t || "Unnamed", this.size = [u.NODE_WIDTH, 60], this.graph = null, this.pos = [10, 10], u.use_uuids ? this.id = ae() : this.id = -1, this.type = null, this.inputs = [], this.outputs = [], this.connections = [], this.properties = {}, this.properties_info = [], this.flags = {};
  }
  get slotLayout() {
    return "slotLayout" in this.constructor ? this.constructor.slotLayout : null;
  }
  /** configure a node from an object containing the serialized info */
  configure(t) {
    this.graph && this.graph._version++;
    for (var e in t) {
      if (e == "properties") {
        for (var s in t.properties)
          this.properties[s] = t.properties[s], this.onPropertyChanged && this.onPropertyChanged(s, t.properties[s]);
        continue;
      }
      t[e] != null && (typeof t[e] == "object" ? this[e] && this[e].configure ? this[e].configure(t[e]) : this[e] = u.cloneObject(t[e], this[e]) : this[e] = t[e]);
    }
    t.title || (this.title = Re(this, "title") || this.title);
    const i = t.bgColor;
    if (i != null && (this.bgcolor || (this.bgcolor = i)), this.inputs)
      for (let o = 0; o < this.inputs.length; ++o) {
        let a = this.inputs[o], l = this.graph ? this.graph.links[a.link] : null;
        a.properties || (a.properties = {}), this.onConnectionsChange && this.onConnectionsChange(z.INPUT, o, !0, l, a), this.onInputAdded && this.onInputAdded(a);
      }
    if (this.outputs)
      for (var n = 0; n < this.outputs.length; ++n) {
        let o = this.outputs[n];
        if (o.properties || (o.properties = {}), !!o.links) {
          for (let a = 0; a < o.links.length; ++a) {
            let l = this.graph ? this.graph.links[o.links[a]] : null;
            this.onConnectionsChange && this.onConnectionsChange(z.OUTPUT, n, !0, l, o);
          }
          this.onOutputAdded && this.onOutputAdded(o);
        }
      }
    if (this.widgets) {
      for (var n = 0; n < this.widgets.length; ++n) {
        var r = this.widgets[n];
        r && r.options && r.options.property && this.properties[r.options.property] && (r.value = JSON.parse(JSON.stringify(this.properties[r.options.property])));
      }
      if (t.widgets_values)
        for (var n = 0; n < t.widgets_values.length; ++n)
          this.widgets[n] && (this.widgets[n].value = t.widgets_values[n]);
    }
    this.onConfigure && this.onConfigure(t);
  }
  /** serialize the content */
  serialize() {
    let t = {
      id: this.id,
      type: this.type,
      pos: this.pos,
      size: this.size,
      flags: u.cloneObject(this.flags),
      order: this.order,
      mode: this.mode
    };
    if (this.constructor === Be && this.last_serialization)
      return this.last_serialization;
    if (this.inputs && (t.inputs = this.inputs), this.outputs) {
      for (var e = 0; e < this.outputs.length; e++)
        delete this.outputs[e]._data;
      t.outputs = this.outputs;
    }
    if (this.title && this.title != this.constructor.title && (t.title = this.title), this.properties && (t.properties = u.cloneObject(this.properties)), this.widgets && this.serialize_widgets) {
      t.widgets_values = [];
      for (var e = 0; e < this.widgets.length; ++e)
        this.widgets[e] ? t.widgets_values[e] = this.widgets[e].value : t.widgets_values[e] = null;
    }
    return t.type || (t.type = this.constructor.type), this.color && (t.color = this.color), this.bgcolor && (t.bgcolor = this.bgcolor), this.boxcolor && (t.boxcolor = this.boxcolor), this.shape && (t.shape = this.shape), this.onSerialize && this.onSerialize(t), t;
  }
  /** Creates a clone of this node  */
  clone(t = { forNode: {} }) {
    var e = u.createNode(this.type);
    if (!e)
      return null;
    var s = u.cloneObject(this.serialize());
    if (s.inputs)
      for (var i = 0; i < s.inputs.length; ++i)
        s.inputs[i].link = null;
    if (s.outputs)
      for (var i = 0; i < s.outputs.length; ++i)
        s.outputs[i].links && (s.outputs[i].links.length = 0);
    return delete s.id, u.use_uuids && (s.id = ae()), e.configure(s), e;
  }
  /** serialize and stringify */
  toString() {
    return JSON.stringify(this.serialize());
  }
  /** get the title string */
  getTitle() {
    return this.title || this.constructor.title;
  }
  getRootGraph() {
    var e;
    let t = this.graph;
    for (; t && t._is_subgraph; )
      t = (e = t._subgraph_node) == null ? void 0 : e.graph;
    return t == null || t._is_subgraph ? null : t;
  }
  *iterateParentSubgraphNodes() {
    var e;
    let t = this.graph._subgraph_node;
    for (; t; )
      yield t, t = (e = t.graph) == null ? void 0 : e._subgraph_node;
  }
  /** sets the value of a property */
  setProperty(t, e) {
    var r;
    if (this.properties || (this.properties = {}), e !== this.properties[t]) {
      var s = this.properties[t];
      if (this.properties[t] = e, this.graph && this.graph._version++, this.onPropertyChanged && this.onPropertyChanged(t, e, s) === !1 && (this.properties[t] = s), this.widgets)
        for (var i = 0; i < this.widgets.length; ++i) {
          var n = this.widgets[i];
          if (n && ((r = n.options) == null ? void 0 : r.property) == t) {
            n.value = e;
            break;
          }
        }
    }
  }
  getInputSlotProperty(t, e) {
    if (!(!this.inputs || !this.graph) && !(t == -1 || t >= this.inputs.length)) {
      var s = this.inputs[t];
      if (s)
        return s.properties || (s.properties = {}), s.properties[e];
    }
  }
  getOutputSlotProperty(t, e) {
    if (!(!this.outputs || !this.graph) && !(t == -1 || t >= this.outputs.length)) {
      var s = this.outputs[t];
      if (s)
        return s.properties || (s.properties = {}), s.properties[e];
    }
  }
  setInputSlotProperty(t, e, s) {
    if (!(!this.inputs || !this.graph) && !(t == -1 || t >= this.inputs.length)) {
      var i = this.inputs[t];
      if (i && (i.properties || (i.properties = {}), s !== i.properties[e])) {
        var n = i.properties[e];
        i.properties[e] = s, this.graph && this.graph._version++, this.onSlotPropertyChanged && this.onSlotPropertyChanged(z.INPUT, t, i, e, s, n) === !1 && (i.properties[e] = n);
      }
    }
  }
  setOutputSlotProperty(t, e, s) {
    if (!(!this.outputs || !this.graph) && !(t == -1 || t >= this.outputs.length)) {
      var i = this.outputs[t];
      if (i && (i.properties || (i.properties = {}), s !== i.properties[e])) {
        var n = i.properties[e];
        i.properties[e] = s, this.graph && this.graph._version++, this.onSlotPropertyChanged && this.onSlotPropertyChanged(z.OUTPUT, t, i, e, s, n) === !1 && (i.properties[e] = n);
      }
    }
  }
  /** sets the output data */
  setOutputData(t, e) {
    if (!(!this.outputs || !this.graph) && !(t == -1 || t >= this.outputs.length)) {
      var s = this.outputs[t];
      if (s && (u.serialize_slot_data ? s._data = e : s._data = void 0, this.outputs[t].links))
        for (var i = 0; i < this.outputs[t].links.length; i++) {
          var n = this.outputs[t].links[i], r = this.graph.links[n];
          r && (r.data = e);
        }
    }
  }
  /** sets the output data */
  setOutputDataType(t, e) {
    if (this.outputs && !(t == -1 || t >= this.outputs.length)) {
      var s = this.outputs[t];
      if (s && (s.type = e, this.outputs[t].links))
        for (let i = this.outputs[t].links.length - 1; i >= 0; i--) {
          const n = this.outputs[t].links[i], r = this.graph.links[n];
          if (r) {
            r.type = e;
            const o = this.graph.getNodeById(r.target_id);
            if (o) {
              const a = o.getInputInfo(r.target_slot);
              a && !u.isValidConnection(e, a.type) && o.disconnectInput(r.target_slot);
            }
          }
        }
    }
  }
  *iterateInputInfo() {
    for (let t = 0; t < this.inputs.length; t++)
      yield this.inputs[t];
  }
  /**
   * Retrieves the input data (data traveling through the connection) from one slot
   * @param slot
   * @param force_update if set to true it will force the connected node of this slot to output data into this link
   * @return data or if it is not connected returns undefined
   */
  getInputData(t, e) {
    if (!(!this.inputs || !this.graph) && !(t >= this.inputs.length || this.inputs[t].link == null)) {
      var s = this.inputs[t].link, i = this.graph.links[s];
      if (!i)
        return u.debug && console.error(`Link not found in slot ${t}!`, this, this.inputs[t], s), null;
      if (!e)
        return i.data;
      var n = this.graph.getNodeById(i.origin_id);
      return n && (n.updateOutputData ? n.updateOutputData(i.origin_slot) : n.onExecute && n.onExecute(null, {})), i.data;
    }
  }
  /**
   * Retrieves the input data type (in case this supports multiple input types)
   * @param slot
   * @return datatype in string format
   */
  getInputDataType(t) {
    if (!this.inputs || t >= this.inputs.length || this.inputs[t].link == null)
      return null;
    var e = this.inputs[t].link, s = this.graph.links[e];
    if (!s)
      return u.debug && console.error(`Link not found in slot ${t}!`, this, this.inputs[t], e), null;
    var i = this.graph.getNodeById(s.origin_id);
    if (!i)
      return s.type;
    var n = i.outputs[s.origin_slot];
    return n && n.type != -1 ? n.type : null;
  }
  /**
   * Retrieves the input data from one slot using its name instead of slot number
   * @param slot_name
   * @param force_update if set to true it will force the connected node of this slot to output data into this link
   * @return data or if it is not connected returns null
   */
  getInputDataByName(t, e) {
    var s = this.findInputSlotIndexByName(t);
    return s == -1 ? null : this.getInputData(s, e);
  }
  /** tells you if there is a connection in one input slot */
  isInputConnected(t) {
    return this.inputs ? t < this.inputs.length && this.inputs[t].link != null : !1;
  }
  /** tells you info about an input connection (which node, type, etc) */
  getInputInfo(t) {
    return this.inputs && t < this.inputs.length ? this.inputs[t] : null;
  }
  /**
   * Returns the link info in the connection of an input slot
   * @param {number} slot
   * @return {LLink} object or null
   */
  getInputLink(t) {
    if (!this.inputs || !this.graph)
      return null;
    if (t < this.inputs.length) {
      var e = this.inputs[t];
      return this.graph.links[e.link];
    }
    return null;
  }
  /** returns the node connected in the input slot */
  getInputNode(t) {
    if (!this.inputs || !this.graph)
      return null;
    if (t < this.inputs.length) {
      const s = this.inputs[t].link, i = this.graph.links[s];
      if (!i)
        return u.debug && console.error(`Link not found in slot ${t}!`, this, this.inputs[t], s), null;
      var e = this.graph.getNodeById(i.origin_id);
      if (e)
        return e;
    }
    return null;
  }
  /** returns the value of an input with this name, otherwise checks if there is a property with that name */
  getInputOrProperty(t) {
    if (!this.inputs || !this.inputs.length || !this.graph)
      return this.properties ? this.properties[t] : null;
    for (var e = 0, s = this.inputs.length; e < s; ++e) {
      var i = this.inputs[e];
      if (t == i.name && i.link != null) {
        var n = this.graph.links[i.link];
        if (n)
          return n.data;
      }
    }
    return this.properties[t];
  }
  /** sets the input data type */
  setInputDataType(t, e) {
    if (!(!this.inputs || !this.graph) && !(t == -1 || t >= this.inputs.length)) {
      var s = this.inputs[t];
      if (s && (s.type = e, s.link)) {
        const i = s.link, n = this.graph.links[i];
        n.type = e;
        const r = this.graph.getNodeById(n.origin_id);
        if (r) {
          const o = r.getOutputInfo(n.origin_slot);
          o && !u.isValidConnection(o.type, e) && r.disconnectOutput(n.origin_slot);
        }
      }
    }
  }
  /**
   * Returns the output slot in another node that an input in this node is connected to.
   * @param {number} slot
   * @return {LLink} object or null
   */
  getOutputSlotConnectedTo(t) {
    if (!this.outputs || !this.graph)
      return null;
    if (t >= 0 && t < this.outputs.length) {
      var e = this.inputs[t];
      if (e.link) {
        const s = this.graph.links[e.link];
        return this.graph.getNodeById(s.origin_id).outputs[s.origin_slot];
      }
    }
    return null;
  }
  *iterateOutputInfo() {
    for (let t = 0; t < this.outputs.length; t++)
      yield this.outputs[t];
  }
  /** tells you the last output data that went in that slot */
  getOutputData(t) {
    if (!this.outputs || !this.graph || t >= this.outputs.length)
      return null;
    var e = this.outputs[t];
    return e._data;
  }
  /**
   * Returns the link info in the connection of an output slot
   * @param {number} slot
   * @return {LLink} object or null
   */
  getOutputLinks(t) {
    if (!this.outputs || !this.graph)
      return [];
    if (t >= 0 && t < this.outputs.length) {
      var e = this.outputs[t];
      if (e.links) {
        var s = [];
        for (const i of e.links)
          s.push(this.graph.links[i]);
        return s;
      }
    }
    return [];
  }
  /**
   * Returns the input slots in other nodes that an output in this node is connected to.
   * @param {number} slot
   * @return {LLink} object or null
   */
  getInputSlotsConnectedTo(t) {
    if (!this.outputs || !this.graph)
      return [];
    if (t >= 0 && t < this.outputs.length) {
      var e = this.outputs[t];
      if (e.links) {
        var s = [];
        for (const i of e.links) {
          const n = this.graph.links[i], r = this.graph.getNodeById(n.target_id);
          s.push(r.inputs[n.target_slot]);
        }
        return s;
      }
    }
    return [];
  }
  /** tells you info about an output connection (which node, type, etc) */
  getOutputInfo(t) {
    return this.outputs && t < this.outputs.length ? this.outputs[t] : null;
  }
  /** tells you if there is a connection in one output slot */
  isOutputConnected(t) {
    return !this.outputs || !this.graph ? !1 : t < this.outputs.length && this.outputs[t].links && this.outputs[t].links.length > 0;
  }
  /** tells you if there is any connection in the output slots */
  isAnyOutputConnected() {
    if (!this.outputs || !this.graph)
      return !1;
    for (var t = 0; t < this.outputs.length; ++t)
      if (this.outputs[t].links && this.outputs[t].links.length)
        return !0;
    return !1;
  }
  /** retrieves all the nodes connected to this output slot */
  getOutputNodes(t) {
    if (!this.outputs || this.outputs.length == 0 || !this.graph || t >= this.outputs.length)
      return null;
    var e = this.outputs[t];
    if (!e.links || e.links.length == 0)
      return null;
    for (var s = [], i = 0; i < e.links.length; i++) {
      var n = e.links[i], r = this.graph.links[n];
      if (r) {
        var o = this.graph.getNodeById(r.target_id);
        o && s.push(o);
      }
    }
    return s;
  }
  *iterateAllLinks() {
    if (this.graph) {
      for (const t of this.iterateInputInfo())
        if (t.link) {
          const e = this.graph.links[t.link];
          e && (yield e);
        }
      for (const t of this.iterateOutputInfo())
        if (t.links != null)
          for (const e of t.links) {
            const s = this.graph.links[e];
            s && (yield s);
          }
    }
  }
  addOnTriggerInput() {
    var t = this.findInputSlotIndexByName("onTrigger");
    if (t == -1) {
      //!trigS ||
      return this.addInput("onTrigger", O.EVENT, { optional: !0, nameLocked: !0 }), this.findInputSlotIndexByName("onTrigger");
    }
    return t;
  }
  addOnExecutedOutput() {
    var t = this.findOutputSlotIndexByName("onExecuted");
    if (t == -1) {
      //!trigS ||
      return this.addOutput("onExecuted", O.ACTION, { optional: !0, nameLocked: !0 }), this.findOutputSlotIndexByName("onExecuted");
    }
    return t;
  }
  onAfterExecuteNode(t, e) {
    var s = this.findOutputSlotIndexByName("onExecuted");
    s != -1 && this.triggerSlot(s, t, null, e);
  }
  changeMode(t) {
    switch (t) {
      case Z.ON_EVENT:
        break;
      case Z.ON_TRIGGER:
        this.addOnTriggerInput(), this.addOnExecutedOutput();
        break;
      case Z.NEVER:
        break;
      case Z.ALWAYS:
        break;
      case Z.ON_REQUEST:
        break;
      default:
        return !1;
    }
    return this.mode = t, !0;
  }
  doExecute(t, e = {}) {
    this.onExecute && (e.action_call || (e.action_call = this.id + "_exec_" + Math.floor(Math.random() * 9999)), this.graph.nodes_executing[this.id] = !0, this.onExecute(t, e), this.graph.nodes_executing[this.id] = !1, this.exec_version = this.graph.iteration, e && e.action_call && (this.action_call = e.action_call, this.graph.nodes_executedAction[this.id] = e.action_call)), this.execute_triggered = 2, this.onAfterExecuteNode && this.onAfterExecuteNode(t, e);
  }
  /**
   * Triggers an action, wrapped by logics to control execution flow
   * @method actionDo
   * @param {String} action name
   * @param {*} param
   */
  actionDo(t, e, s = {}) {
    this.onAction && (s.action_call || (s.action_call = this.id + "_" + (t || "action") + "_" + Math.floor(Math.random() * 9999)), this.graph.nodes_actioning[this.id] = t || "actioning", this.onAction(t, e, s), this.graph.nodes_actioning[this.id] = !1, s && s.action_call && (this.action_call = s.action_call, this.graph.nodes_executedAction[this.id] = s.action_call)), this.action_triggered = 2, this.onAfterExecuteNode && this.onAfterExecuteNode(e, s);
  }
  /**  Triggers an event in this node, this will trigger any output with the same name */
  trigger(t, e, s) {
    if (!(!this.outputs || !this.outputs.length)) {
      this.graph && (this.graph._last_trigger_time = u.getTime());
      for (var i = 0; i < this.outputs.length; ++i) {
        var n = this.outputs[i];
        !n || n.type !== O.EVENT || t && n.name != t || this.triggerSlot(i, e, null, s);
      }
    }
  }
  /**
   * Triggers an slot event in this node
   * @param slot the index of the output slot
   * @param param
   * @param link_id in case you want to trigger and specific output link in a slot
   */
  triggerSlot(t, e, s, i = {}) {
    if (this.outputs) {
      if (t == null) {
        console.error("slot must be a number");
        return;
      }
      typeof t != "number" && console.warn("slot must be a number, use node.trigger('name') if you want to use a string");
      var n = this.outputs[t];
      if (n) {
        var r = n.links;
        if (!(!r || !r.length)) {
          this.graph && (this.graph._last_trigger_time = u.getTime());
          for (var o = 0; o < r.length; ++o) {
            var a = r[o];
            if (!(s != null && s != a)) {
              var l = this.graph.links[r[o]];
              if (l) {
                l._last_time = u.getTime();
                var h = this.graph.getNodeById(l.target_id);
                if (h) {
                  if (h.inputs[l.target_slot], i.link = l, i.originNode = this, h.mode === Z.ON_TRIGGER)
                    i.action_call || (i.action_call = this.id + "_trigg_" + Math.floor(Math.random() * 9999)), h.onExecute && h.doExecute(e, i);
                  else if (h.onAction) {
                    i.action_call || (i.action_call = this.id + "_act_" + Math.floor(Math.random() * 9999));
                    const p = h.inputs[l.target_slot];
                    h.actionDo(p.name, e, i);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  /**
   * clears the trigger slot animation
   * @param slot the index of the output slot
   * @param link_id in case you want to trigger and specific output link in a slot
   */
  clearTriggeredSlot(t, e) {
    if (this.outputs) {
      var s = this.outputs[t];
      if (s) {
        var i = s.links;
        if (!(!i || !i.length))
          for (var n = 0; n < i.length; ++n) {
            var r = i[n];
            if (!(e != null && e != r)) {
              var o = this.graph.links[i[n]];
              o && (o._last_time = 0);
            }
          }
      }
    }
  }
  /**
   * changes node size and triggers callback
   * @method setSize
   * @param {vec2} size
   */
  setSize(t) {
    this.size = t, this.onResize && this.onResize(this.size);
  }
  /**
   * add a new property to this node
   * @param name
   * @param default_value
   * @param type string defining the output type ("vec3","number",...)
   * @param extra_info this can be used to have special properties of the property (like values, etc)
   */
  addProperty(t, e, s, i) {
    var n = { name: t, type: s, default_value: e };
    if (i)
      for (var r in i)
        n[r] = i[r];
    return this.properties_info || (this.properties_info = []), this.properties_info.push(n), this.properties || (this.properties = {}), this.properties[t] = e, n;
  }
  hasProperty(t) {
    return this.properties != null && t in this.properties;
  }
  /**
   * add a new output slot to use in this node
   * @param name
   * @param type string defining the output type ("vec3","number",...)
   * @param extra_info this can be used to have special properties of an output (label, special color, position, etc)
   */
  addOutput(t, e = O.DEFAULT, s) {
    var i = { name: t, type: e, links: [], properties: {} };
    if (s)
      for (var n in s)
        i[n] = s[n];
    return (i.shape == null || i.shape == A.DEFAULT) && (e == "array" ? i.shape = A.GRID_SHAPE : (e === O.EVENT || e === O.ACTION) && (i.shape = A.BOX_SHAPE)), (e === O.EVENT || e === O.ACTION) && (i.shape = A.BOX_SHAPE), this.outputs || (this.outputs = []), this.outputs.push(i), this.onOutputAdded && this.onOutputAdded(i), u.auto_load_slot_types && u.registerNodeAndSlotType(this, e, !0), this.setSize(this.computeSize()), this.setDirtyCanvas(!0, !0), i;
  }
  /** remove an existing output slot */
  removeOutput(t) {
    const e = this.outputs[t];
    this.disconnectOutput(t), this.outputs.splice(t, 1);
    for (var s = t; s < this.outputs.length; ++s)
      if (!(!this.outputs[s] || !this.outputs[s].links))
        for (var i = this.outputs[s].links, n = 0; n < i.length; ++n) {
          var r = this.graph.links[i[n]];
          r && (r.origin_slot -= 1);
        }
    this.setSize(this.computeSize()), this.onOutputRemoved && this.onOutputRemoved(t, e), this.setDirtyCanvas(!0, !0);
  }
  moveOutput(t, e) {
    const s = this.outputs[t];
    if (s == null || e < 0 || e > this.outputs.length - 1)
      return;
    const i = this.outputs[e];
    if (s.links)
      for (const n of s.links) {
        const r = this.graph.links[n];
        r.origin_slot = e;
      }
    if (i.links)
      for (const n of i.links) {
        const r = this.graph.links[n];
        r.origin_slot = t;
      }
    this.outputs[e] = s, this.outputs[t] = i;
  }
  /**
   * add a new input slot to use in this node
   * @param name
   * @param type string defining the input type ("vec3","number",...), it its a generic one use 0
   * @param extra_info this can be used to have special properties of an input (label, color, position, etc)
   */
  addInput(t, e = O.DEFAULT, s) {
    var i = { name: t, type: e, link: null, properties: {} };
    if (s)
      for (var n in s)
        i[n] = s[n];
    return (i.shape == null || i.shape == A.DEFAULT) && (e == "array" ? i.shape = A.GRID_SHAPE : (e === O.EVENT || e === O.ACTION) && (i.shape = A.BOX_SHAPE)), this.inputs || (this.inputs = []), this.inputs.push(i), this.setSize(this.computeSize()), this.onInputAdded && this.onInputAdded(i), u.registerNodeAndSlotType(this, e), this.setDirtyCanvas(!0, !0), i;
  }
  /** remove an existing input slot */
  removeInput(t) {
    this.disconnectInput(t);
    for (var e = this.inputs.splice(t, 1), s = t; s < this.inputs.length; ++s)
      if (this.inputs[s]) {
        var i = this.graph.links[this.inputs[s].link];
        i && (i.target_slot -= 1);
      }
    this.setSize(this.computeSize()), this.onInputRemoved && this.onInputRemoved(t, e[0]), this.setDirtyCanvas(!0, !0);
  }
  moveInput(t, e) {
    const s = this.inputs[t];
    if (s == null || e < 0 || e > this.inputs.length - 1)
      return;
    const i = this.inputs[e];
    if (s.link != null) {
      const n = this.graph.links[s.link];
      n.target_slot = e;
    }
    if (i.link != null) {
      const n = this.graph.links[i.link];
      n.target_slot = t;
    }
    this.inputs[e] = s, this.inputs[t] = i;
  }
  /**
   * add an special connection to this node (used for special kinds of graphs)
   * @param name
   * @param type string defining the input type ("vec3","number",...)
   * @param pos position of the connection inside the node
   * @param direction if is input or output
   */
  addConnection(t, e, s, i) {
    let n = {
      name: t,
      type: e,
      pos: s,
      direction: i,
      links: null
    };
    return this.connections.push(n), n;
  }
  /** computes the size of a node according to its inputs and output slots */
  computeSize(t = [0, 0]) {
    const e = Re(this, "overrideSize");
    if (e)
      return e.concat();
    var s = Math.max(
      this.inputs ? this.inputs.length : 1,
      this.outputs ? this.outputs.length : 1
    ), i = t;
    s = Math.max(s, 1);
    var n = u.NODE_TEXT_SIZE, r = d(this.title), o = 0, a = 0;
    if (this.inputs)
      for (var l = 0, h = this.inputs.length; l < h; ++l) {
        var p = this.inputs[l], f = p.label || p.name || "", c = d(f);
        o < c && (o = c);
      }
    if (this.outputs)
      for (var l = 0, h = this.outputs.length; l < h; ++l) {
        var v = this.outputs[l], f = v.label || v.name || "", c = d(f);
        a < c && (a = c);
      }
    if (i[0] = Math.max(o + a + 10, r), i[0] = Math.max(i[0], u.NODE_WIDTH), this.widgets && this.widgets.length)
      for (const _ of this.widgets)
        i[0] = Math.max(i[0], _.width || u.NODE_WIDTH * 1.5);
    i[1] = (this.constructor.slot_start_y || 0) + s * u.NODE_SLOT_HEIGHT;
    var g = 0;
    if (this.widgets && this.widgets.length) {
      for (var l = 0, h = this.widgets.length; l < h; ++l) {
        const m = this.widgets[l];
        m.hidden || (m.computeSize ? g += m.computeSize(i[0])[1] + 4 : g += u.NODE_WIDGET_HEIGHT + 4);
      }
      g += 8;
    }
    this.widgets_up ? i[1] = Math.max(i[1], g) : this.widgets_start_y != null ? i[1] = Math.max(i[1], g + this.widgets_start_y) : i[1] += g;
    function d(_) {
      return _ ? n * _.length * 0.6 : 0;
    }
    return this.constructor.min_height && i[1] < this.constructor.min_height && (i[1] = this.constructor.min_height), i[1] += 6, i;
  }
  /**
   * returns all the info available about a property of this node.
   *
   * @method getPropertyInfo
   * @param {String} property name of the property
   * @return {Object} the object with all the available info
  */
  getPropertyInfo(t) {
    var e = null;
    if (this.properties_info) {
      for (var s = 0; s < this.properties_info.length; ++s)
        if (this.properties_info[s].name == t) {
          e = this.properties_info[s];
          break;
        }
    }
    return this.constructor["@" + t] && (e = this.constructor["@" + t]), this.constructor.widgets_info && this.constructor.widgets_info[t] && (e = this.constructor.widgets_info[t]), !e && this.onGetPropertyInfo && (e = this.onGetPropertyInfo(t)), e || (e = {}), e.type || (e.type = typeof this.properties[t]), e.widget == "combo" && (e.type = "enum"), e;
  }
  /**
   * https://github.com/jagenjo/litegraph.js/blob/master/guides/README.md#node-widgets
   * @return created widget
   */
  addWidget(t, e, s, i, n) {
    this.widgets || (this.widgets = []), !n && i && i.constructor === Object && (n = i, i = null), n && n.constructor === String && (n = { property: n }), i && i.constructor === String && (n || (n = {}), n.property = i, i = null), i && i.constructor !== Function && (console.warn("addWidget: callback must be a function"), i = null);
    var r = {
      type: t.toLowerCase(),
      name: e,
      value: s,
      callback: i,
      options: n || {}
    };
    if (r.options.y !== void 0 && (r.y = r.options.y), !i && !r.options.callback && !r.options.property && console.warn("LiteGraph addWidget(...) without a callback or property assigned"), t == "combo" && !r.options.values)
      throw "LiteGraph addWidget('combo',...) requires to pass values in options: { values:['red','blue'] }";
    return this.widgets.push(r), this.setSize(this.computeSize()), r;
  }
  addCustomWidget(t) {
    return this.widgets || (this.widgets = []), this.widgets.push(t), this.setSize(this.computeSize()), t;
  }
  setWidgetHidden(t, e) {
    t.hidden = e, this.setSize(this.computeSize());
  }
  /**
   * returns the bounding of the object, used for rendering purposes
   * @return [x, y, width, height]
   */
  getBounding(t) {
    return t = t || new Float32Array(4), t[0] = this.pos[0] - 4, t[1] = this.pos[1] - u.NODE_TITLE_HEIGHT, t[2] = this.size[0] + 4, t[3] = this.flags.collapsed ? u.NODE_TITLE_HEIGHT : this.size[1] + u.NODE_TITLE_HEIGHT, this.onBounding && this.onBounding(t), t;
  }
  /** checks if a point is inside the shape of a node */
  isPointInside(t, e, s = 0, i = !1) {
    var n = this.graph && this.graph.isLive() ? 0 : u.NODE_TITLE_HEIGHT;
    if (i && (n = 0), this.flags && this.flags.collapsed) {
      if (u.isInsideRectangle(
        t,
        e,
        this.pos[0] - s,
        this.pos[1] - u.NODE_TITLE_HEIGHT - s,
        (this._collapsed_width || u.NODE_COLLAPSED_WIDTH) + 2 * s,
        u.NODE_TITLE_HEIGHT + 2 * s
      ))
        return !0;
    } else if (this.pos[0] - 4 - s < t && this.pos[0] + this.size[0] + 4 + s > t && this.pos[1] - n - s < e && this.pos[1] + this.size[1] + s > e)
      return !0;
    return !1;
  }
  /** checks if a point is inside a node slot, and returns info about which slot */
  getSlotInPosition(t, e) {
    var s = [0, 0];
    if (this.inputs)
      for (var i = 0, n = this.inputs.length; i < n; ++i) {
        var r = this.inputs[i];
        if (this.getConnectionPos(!0, i, s), u.isInsideRectangle(
          t,
          e,
          s[0] - 10,
          s[1] - 5,
          20,
          10
        ))
          return { input: r, slot: i, link_pos: s };
      }
    if (this.outputs)
      for (var i = 0, n = this.outputs.length; i < n; ++i) {
        var o = this.outputs[i];
        if (this.getConnectionPos(!1, i, s), u.isInsideRectangle(
          t,
          e,
          s[0] - 10,
          s[1] - 5,
          20,
          10
        ))
          return { output: o, slot: i, link_pos: s };
      }
    return null;
  }
  is(t) {
    const e = t.__LITEGRAPH_TYPE__;
    return e != null && this.type === e;
  }
  /**
   * returns the input slot with a given name (used for dynamic slots), -1 if not found
   * for compatibility purposes only, please prefer `findInputSlotIndexByName`
   * @param name the name of the slot
   * @return the slot (-1 if not found)
   */
  findInputSlot(t) {
    return this.findInputSlotIndexByName(t);
  }
  /**
   * returns the output slot with a given name (used for dynamic slots), -1 if not found
   * for compatibility purposes only, please prefer `findOutputSlotIndexByName`
   * @param name the name of the slot
   * @return  the slot (-1 if not found)
   */
  findOutputSlot(t) {
    return this.findOutputSlotIndexByName(t);
  }
  /**
   * returns the input slot with a given name (used for dynamic slots), -1 if not found
   * @param name the name of the slot
   * @return the slot (-1 if not found)
   */
  findInputSlotIndexByName(t, e = !1, s) {
    if (!this.inputs)
      return -1;
    for (var i = 0, n = this.inputs.length; i < n; ++i)
      if (!(e && this.inputs[i].link && this.inputs[i].link != null) && !(s && s.includes(this.inputs[i].type)) && (!t || t == this.inputs[i].name))
        return i;
    return -1;
  }
  findInputSlotByName(t, e = !1, s) {
    if (!this.inputs)
      return null;
    for (var i = 0, n = this.inputs.length; i < n; ++i)
      if (!(e && this.inputs[i].link && this.inputs[i].link != null) && !(s && s.includes(this.inputs[i].type)) && (!t || t == this.inputs[i].name))
        return this.inputs[i];
    return null;
  }
  /**
   * returns the output slot with a given name (used for dynamic slots), -1 if not found
   * @param name the name of the slot
   * @return  the slot (-1 if not found)
   */
  findOutputSlotIndexByName(t, e = !1, s) {
    if (!this.outputs)
      return -1;
    for (var i = 0, n = this.outputs.length; i < n; ++i)
      if (!(e && this.outputs[i].links && this.outputs[i].links != null) && !(s && s.includes(this.outputs[i].type)) && (!t || t == this.outputs[i].name))
        return i;
    return -1;
  }
  findOutputSlotByName(t, e = !1, s) {
    if (!this.outputs)
      return null;
    for (var i = 0, n = this.outputs.length; i < n; ++i)
      if (!(e && this.outputs[i].links && this.outputs[i].links != null) && !(s && s.includes(this.outputs[i].type)) && (!t || t == this.outputs[i].name))
        return this.outputs[i];
    return null;
  }
  /**
   * findSlotByType for INPUTS
   */
  findInputSlotIndexByType(t, e = !1, s = !1) {
    return this.findSlotByType(!0, t, !1, e, s);
  }
  /**
   * findSlotByType for OUTPUTS
   */
  findOutputSlotIndexByType(t, e = !1, s = !1) {
    return this.findSlotByType(!1, t, !1, e, s);
  }
  /**
   * findSlotByType for INPUTS
   */
  findInputSlotByType(t, e = !1, s = !1) {
    return this.findSlotByType(!0, t, !1, e, s);
  }
  /**
   * findSlotByType for OUTPUTS
   */
  findOutputSlotByType(t, e = !1, s = !1) {
    return this.findSlotByType(!1, t, !1, e, s);
  }
  /**
   * returns the output (or input) slot with a given type, -1 if not found
   * @method findSlotByType
   * @param {boolean} input uise inputs instead of outputs
   * @param {string} type the type of the slot
   * @param {boolean} preferFreeSlot if we want a free slot (if not found, will return the first of the type anyway)
   * @return {number_or_object} the slot (-1 if not found)
   */
  findSlotByType(t, e, s, i = !1, n = !1) {
    i = i || !1, n = n || !1;
    var r = t ? this.inputs : this.outputs;
    if (!r)
      return s ? null : -1;
    (e == "" || e == "*") && (e = 0);
    for (var o = 0, a = r.length; o < a; ++o) {
      var l = (e + "").toLowerCase().split(","), h = r[o].type == "0" || r[o].type == "*" ? "0" : r[o].type;
      let p = (h + "").toLowerCase().split(",");
      for (let f = 0; f < l.length; f++)
        for (let c = 0; c < p.length; c++)
          if (l[f] == "_event_" && (l[f] = O.EVENT), p[f] == "_event_" && (p[f] = O.EVENT), l[f] == "*" && (l[f] = O.DEFAULT), p[f] == "*" && (p[f] = O.DEFAULT), l[f] == p[c]) {
            let v = r[o];
            if (i && v.links && v.links !== null || v.link && v.link !== null)
              continue;
            return s ? v : o;
          }
    }
    if (i && !n)
      for (var o = 0, a = r.length; o < a; ++o) {
        var l = (e + "").toLowerCase().split(","), h = r[o].type == "0" || r[o].type == "*" ? "0" : r[o].type;
        let g = (h + "").toLowerCase().split(",");
        for (let d = 0; d < l.length; d++)
          for (let _ = 0; _ < g.length; _++)
            if (l[d] == "*" && (l[d] = O.DEFAULT), g[d] == "*" && (g[d] = O.DEFAULT), l[d] == g[_])
              return s ? r[o] : o;
      }
    return s ? null : -1;
  }
  /**
   * connect this node output to the input of another node BY TYPE
   * @method connectByType
   * @param {number_or_string} slot (could be the number of the slot or the string with the name of the slot)
   * @param {LGraphNode} node the target node
   * @param {string} target_type the input slot type of the target node
   * @return {Object} the link_info is created, otherwise null
   */
  connectByTypeInput(t, e, s, i = {}) {
    var n = {
      createEventInCase: !0,
      firstFreeIfOutputGeneralInCase: !0,
      generalTypeInCase: !0
    }, r = Object.assign(n, i);
    e && e.constructor === Number && (e = this.graph.getNodeById(e));
    let o = s;
    s === O.EVENT ? o = O.ACTION : s === O.ACTION && (o = O.EVENT);
    let a = e.findInputSlotIndexByType(o, !0);
    if (a >= 0 && a !== null)
      return u.debug && console.debug("CONNbyTYPE type " + s + " for " + a), this.connect(t, e, a);
    if (u.debug && console.log("type " + s + " not found or not free?"), r.createEventInCase && s == O.EVENT)
      return u.debug && console.debug("connect WILL CREATE THE onTrigger " + s + " to " + e), this.connect(t, e, -1);
    if (r.generalTypeInCase) {
      let l = e.findInputSlotIndexByType(O.DEFAULT, !0, !0);
      if (u.debug && console.debug("connect TO a general type (*, 0), if not found the specific type ", s, " to ", e, "RES_SLOT:", l), l >= 0)
        return this.connect(t, e, l);
    }
    if (r.firstFreeIfOutputGeneralInCase && (s == 0 || s == "*" || s == "")) {
      let l = e.findInputSlotIndexByName(null, !0, [O.EVENT]);
      if (u.debug && console.debug("connect TO TheFirstFREE ", s, " to ", e, "RES_SLOT:", l), l >= 0)
        return this.connect(t, e, l);
    }
    return u.debug && console.error("no way to connect type: ", s, " to targetNODE ", e), null;
  }
  /**
   * connect this node input to the output of another node BY TYPE
   * @method connectByType
   * @param {number_or_string} slot (could be the number of the slot or the string with the name of the slot)
   * @param {LGraphNode} node the target node
   * @param {string} target_type the output slot type of the target node
   * @return {Object} the link_info is created, otherwise null
   */
  connectByTypeOutput(t, e, s, i = {}) {
    var n = {
      createEventInCase: !0,
      firstFreeIfInputGeneralInCase: !0,
      generalTypeInCase: !0
    }, r = Object.assign(n, i);
    e && e.constructor === Number && (e = this.graph.getNodeById(e));
    let o = s;
    if (s === O.EVENT ? o = O.ACTION : s === O.ACTION && (o = O.EVENT), a = e.findOutputSlotIndexByType(o, !0), a >= 0 && a !== null)
      return console.debug("CONNbyTYPE OUT! type " + s + " for " + a + " to " + o), e.connect(a, this, t);
    if (r.generalTypeInCase) {
      var a = e.findOutputSlotIndexByType(0, !0, !0);
      if (a >= 0)
        return e.connect(a, this, t);
    }
    if ((r.createEventInCase && s == O.EVENT || s == O.ACTION) && u.do_add_triggers_slots) {
      var a = e.addOnExecutedOutput();
      return e.connect(a, this, t);
    }
    if (r.firstFreeIfInputGeneralInCase && (s == 0 || s == "*" || s == "")) {
      let l = e.findOutputSlotIndexByName(null, !0, [O.EVENT, O.ACTION]);
      if (l >= 0)
        return e.connect(l, this, t);
    }
    return console.error("no way to connect byOUT type: ", s, " to sourceNODE ", e), console.error("type OUT! " + s + " not found or not free?"), null;
  }
  /**
   * connect this node output to the input of another node
   * @param slot (could be the number of the slot or the string with the name of the slot)
   * @param  targetNode the target node
   * @param  targetSlot the input slot of the target node (could be the number of the slot or the string with the name of the slot, or -1 to connect a trigger)
   * @return {Object} the linkInfo is created, otherwise null
   */
  connect(t, e, s) {
    if (s = s || 0, !this.graph)
      throw new Error("Connect: Error, node doesn't belong to any graph. Nodes must be added first to a graph before connecting them.");
    if (typeof t == "string") {
      if (t = this.findOutputSlotIndexByName(t), t == -1)
        return u.debug && console.error("Connect: Error, no slot of name " + t), null;
    } else if (!this.outputs || t >= this.outputs.length)
      return u.debug && console.error("Connect: Error, slot number not found"), null;
    if (e && e.constructor === Number && (e = this.graph.getNodeById(e)), !e)
      throw "target node is null";
    if (e == this)
      return u.debug && console.error("Connect: Error, can't connect node to itself!"), null;
    if (!e.graph)
      throw new Error("Connect: Error, target node doesn't belong to any graph. Nodes must be added first to a graph before connecting them.");
    if (typeof s == "string") {
      if (s = e.findInputSlotIndexByName(s), s == -1)
        return u.debug && console.error(
          "Connect: Error, no slot of name " + s
        ), null;
    } else if (s === O.EVENT)
      if (u.do_add_triggers_slots)
        e.changeMode(Z.ON_TRIGGER), s = e.findInputSlotIndexByName("onTrigger");
      else
        return u.debug && console.error("Connect: Error, can't connect event target slot"), null;
    else if (!e.inputs || s >= e.inputs.length)
      return u.debug && console.error("Connect: Error, slot number not found"), null;
    var i = !1, n = e.inputs[s], r = null, o = this.outputs[t];
    if (!this.outputs[t])
      return u.debug && (console.warn("Connect: Invalid slot passed: " + t), console.warn(this.outputs)), null;
    if (e.onBeforeConnectInput && (s = e.onBeforeConnectInput(s)), s === -1 || s === null || !u.isValidConnection(o.type, n.type))
      return this.setDirtyCanvas(!1, !0), i && this.graph.connectionChange(this, r), console.warn("Connect: Invalid connection: ", s, o.type, n.type), null;
    if (u.debug && console.debug("valid connection", o.type, n.type), e.onConnectInput && e.onConnectInput(s, o.type, o, this, t) === !1)
      return u.debug && console.debug("onConnectInput blocked", o.type, n.type), null;
    if (this.onConnectOutput && this.onConnectOutput(t, n.type, n, e, s) === !1)
      return u.debug && console.debug("onConnectOutput blocked", o.type, n.type), null;
    if (e.inputs[s] && e.inputs[s].link != null && (this.graph.beforeChange(), e.disconnectInput(s, { doProcessChange: !1 }), i = !0), o.links !== null && o.links.length)
      switch (o.type) {
        case O.EVENT:
          u.allow_multi_output_for_events || (this.graph.beforeChange(), this.disconnectOutput(t, null, { doProcessChange: !1 }), i = !0);
          break;
      }
    let a;
    return u.use_uuids ? a = ae() : a = ++this.graph.last_link_id, r = new he(
      a,
      n.type || o.type,
      this.id,
      t,
      e.id,
      s
    ), this.graph.links[r.id] && console.error("Link already exists in graph!", r.id, r, this.graph.links[r.id]), this.graph.links[r.id] = r, o.links == null && (o.links = []), o.links.push(r.id), e.inputs[s].link = r.id, this.graph && this.graph._version++, this.onConnectionsChange && this.onConnectionsChange(
      z.OUTPUT,
      t,
      !0,
      r,
      o
    ), e.onConnectionsChange && e.onConnectionsChange(
      z.INPUT,
      s,
      !0,
      r,
      n
    ), this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(
      z.INPUT,
      e,
      s,
      this,
      t
    ), this.graph.onNodeConnectionChange(
      z.OUTPUT,
      this,
      t,
      e,
      s
    )), this.setDirtyCanvas(!1, !0), this.graph.afterChange(), this.graph.connectionChange(this, r), r;
  }
  /**
   * disconnect one output to an specific node
   * @param slot (could be the number of the slot or the string with the name of the slot)
   * @param targetNode the target node to which this slot is connected [Optional, if not targetNode is specified all nodes will be disconnected]
   * @return if it was disconnected successfully
   */
  disconnectOutput(t, e, s) {
    if (typeof t == "string") {
      if (t = this.findOutputSlotIndexByName(t), t == -1)
        return u.debug && console.error("Connect: Error, no slot of name " + t), !1;
    } else if (!this.outputs || t >= this.outputs.length)
      return u.debug && console.error("Connect: Error, slot number not found"), !1;
    var i = this.outputs[t];
    if (!i || !i.links || i.links.length == 0)
      return !1;
    if (e) {
      if (e.constructor === Number && (e = this.graph.getNodeById(e)), !e)
        throw "Target Node not found";
      for (var n = 0, r = i.links.length; n < r; n++) {
        var o = i.links[n], a = this.graph.links[o];
        if (a.target_id == e.id) {
          i.links.splice(n, 1);
          var l = e.inputs[a.target_slot];
          l.link = null, delete this.graph.links[o], this.graph && this.graph._version++, e.onConnectionsChange && e.onConnectionsChange(
            z.INPUT,
            a.target_slot,
            !1,
            a,
            l
          ), this.onConnectionsChange && this.onConnectionsChange(
            z.OUTPUT,
            t,
            !1,
            a,
            i
          ), this.graph && this.graph.onNodeConnectionChange && this.graph.onNodeConnectionChange(
            z.OUTPUT,
            this,
            t
          ), this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(
            z.OUTPUT,
            this,
            t
          ), this.graph.onNodeConnectionChange(
            z.INPUT,
            e,
            a.target_slot
          ));
          break;
        }
      }
    } else {
      for (var n = 0, r = i.links.length; n < r; n++) {
        var o = i.links[n], a = this.graph.links[o];
        if (a) {
          var e = this.graph.getNodeById(a.target_id), l = null;
          this.graph && this.graph._version++, e && (l = e.inputs[a.target_slot], l.link = null, e.onConnectionsChange && e.onConnectionsChange(
            z.INPUT,
            a.target_slot,
            !1,
            a,
            l
          ), this.graph && this.graph.onNodeConnectionChange && this.graph.onNodeConnectionChange(
            z.INPUT,
            e,
            a.target_slot
          )), delete this.graph.links[o], this.onConnectionsChange && this.onConnectionsChange(
            z.OUTPUT,
            t,
            !1,
            a,
            i
          ), this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(
            z.OUTPUT,
            this,
            t
          ), this.graph.onNodeConnectionChange(
            z.INPUT,
            e,
            a.target_slot
          ));
        }
      }
      i.links = null;
    }
    return this.setDirtyCanvas(!1, !0), this.graph.connectionChange(this), !0;
  }
  /**
   * disconnect one input
   * @param slot (could be the number of the slot or the string with the name of the slot)
   * @return if it was disconnected successfully
   */
  disconnectInput(t, e = {}) {
    if (typeof t == "string") {
      if (t = this.findInputSlotIndexByName(t), t == -1)
        return u.debug && console.error("Connect: Error, no slot of name " + t), !1;
    } else if (!this.inputs || t >= this.inputs.length)
      return u.debug && console.error("Connect: Error, slot number not found"), !1;
    var s = this.inputs[t];
    if (!s)
      return !1;
    var i = this.inputs[t].link;
    if (i != null) {
      this.inputs[t].link = null;
      var n = this.graph.links[i];
      if (n) {
        var r = this.graph.getNodeById(n.origin_id);
        if (!r)
          return !1;
        var o = r.outputs[n.origin_slot];
        if (!o || !o.links || o.links.length == 0)
          return !1;
        for (var a = 0, l = o.links.length; a < l; a++)
          if (o.links[a] == i) {
            o.links.splice(a, 1);
            break;
          }
        delete this.graph.links[i], this.graph && this.graph._version++, this.onConnectionsChange && this.onConnectionsChange(
          z.INPUT,
          t,
          !1,
          n,
          s
        ), r.onConnectionsChange && r.onConnectionsChange(
          z.OUTPUT,
          a,
          !1,
          n,
          o
        ), this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(
          z.OUTPUT,
          r,
          a
        ), this.graph.onNodeConnectionChange(z.INPUT, this, t));
      }
    }
    return this.setDirtyCanvas(!1, !0), this.graph && this.graph.connectionChange(this), !0;
  }
  /**
   * returns the center of a connection point in canvas coords
   * @param is_input true if if a input slot, false if it is an output
   * @param slot (could be the number of the slot or the string with the name of the slot)
   * @param out a place to store the output, to free garbage
   * @return the position
   **/
  getConnectionPos(t, e, s = [0, 0], i = !1) {
    var n = 0;
    t && this.inputs && (n = this.inputs.length), !t && this.outputs && (n = this.outputs.length);
    var r = u.NODE_SLOT_HEIGHT * 0.5;
    if (this.flags.collapsed && !i) {
      var o = this._collapsed_width || u.NODE_COLLAPSED_WIDTH;
      return this.horizontal ? (s[0] = this.pos[0] + o * 0.5, t ? s[1] = this.pos[1] - u.NODE_TITLE_HEIGHT : s[1] = this.pos[1]) : (t ? s[0] = this.pos[0] : s[0] = this.pos[0] + o, s[1] = this.pos[1] - u.NODE_TITLE_HEIGHT * 0.5), s;
    }
    return t && e == -1 ? (s[0] = this.pos[0] + u.NODE_TITLE_HEIGHT * 0.5, s[1] = this.pos[1] + u.NODE_TITLE_HEIGHT * 0.5, s) : t && n > e && this.inputs[e].pos ? (s[0] = this.pos[0] + this.inputs[e].pos[0], s[1] = this.pos[1] + this.inputs[e].pos[1], s) : !t && n > e && this.outputs[e].pos ? (s[0] = this.pos[0] + this.outputs[e].pos[0], s[1] = this.pos[1] + this.outputs[e].pos[1], s) : this.horizontal ? (s[0] = this.pos[0] + (e + 0.5) * (this.size[0] / n), t ? s[1] = this.pos[1] - u.NODE_TITLE_HEIGHT : s[1] = this.pos[1] + this.size[1], s) : (t ? s[0] = this.pos[0] + r : s[0] = this.pos[0] + this.size[0] + 1 - r, s[1] = this.pos[1] + (e + 0.7) * u.NODE_SLOT_HEIGHT + (this.constructor.slot_start_y || 0), s);
  }
  /** Force align to grid */
  alignToGrid() {
    this.pos[0] = u.CANVAS_GRID_SIZE * Math.round(this.pos[0] / u.CANVAS_GRID_SIZE), this.pos[1] = u.CANVAS_GRID_SIZE * Math.round(this.pos[1] / u.CANVAS_GRID_SIZE);
  }
  /** Console output */
  trace(t) {
    this.console || (this.console = []), this.console.push(t), this.console.length > Be.MAX_CONSOLE && this.console.shift(), this.graph.onNodeTrace && this.graph.onNodeTrace(this, t);
  }
  /** Forces to redraw or the main canvas (LGraphNode) or the bg canvas (links) */
  setDirtyCanvas(t, e = !1) {
    this.graph && this.graph.sendActionToCanvas("setDirty", [t, e]);
  }
  loadImage(t) {
    var e = new Image();
    e.src = u.node_images_path + t;
    var s = this;
    return e.onload = function() {
      s.setDirtyCanvas(!0);
    }, e;
  }
  /** Allows to get onMouseMove and onMouseUp events even if the mouse is out of focus */
  captureInput(t) {
    if (!(!this.graph || !this.graph.list_of_graphcanvas))
      for (var e = this.graph.list_of_graphcanvas, s = 0; s < e.length; ++s) {
        var i = e[s];
        !t && i.node_capturing_input != this || (i.node_capturing_input = t ? this : null);
      }
  }
  isShowingTitle(t) {
    return this.titleMode == se.TRANSPARENT_TITLE || this.titleMode == se.NO_TITLE ? !1 : (this.titleMode == se.AUTOHIDE_TITLE && t, !0);
  }
  /** Collapse the node to make it smaller on the canvas */
  collapse(t = !1) {
    this.graph._version++, !(this.collapsable === !1 && !t) && (this.flags.collapsed ? this.flags.collapsed = !1 : this.flags.collapsed = !0, this.setDirtyCanvas(!0, !0));
  }
  /** Forces the node to do not move or realign on Z */
  pin(t) {
    this.graph._version++, t === void 0 ? this.flags.pinned = !this.flags.pinned : this.flags.pinned = t;
  }
  localToScreen(t, e, s) {
    return [
      (t + this.pos[0]) * s.ds.scale + s.ds.offset[0],
      (e + this.pos[1]) * s.ds.scale + s.ds.offset[1]
    ];
  }
  getOptionalSlots() {
    return Re(this, "optionalSlots");
  }
};
let C = Be;
C.MAX_CONSOLE = 100;
function tt() {
  let t = [];
  return t = t.concat(Qe), t = t.concat([O.ACTION]), t = t.concat(u.slot_types_in.map((e) => e.toUpperCase())), t;
}
function Yt() {
  return tt().map($);
}
class Q extends C {
  constructor(e) {
    super(e), this.properties = {
      name: "",
      type: "number",
      value: 0,
      subgraphID: null
    }, this.nameInGraph = "", this.clonable = !1, this.size = [180, 90];
    let s = this;
    this.nameWidget = this.addWidget(
      "text",
      "Name",
      this.properties.name,
      this.setName.bind(this)
    ), u.graph_inputs_outputs_use_combo_widget ? this.typeWidget = this.addWidget(
      "combo",
      "Type",
      $(this.properties.type),
      this.setType.bind(this),
      { values: Yt }
    ) : this.typeWidget = this.addWidget(
      "text",
      "Type",
      $(this.properties.type),
      this.setType.bind(this)
    ), this.valueWidget = this.addWidget(
      "number",
      "Value",
      this.properties.value,
      function(i) {
        s.setProperty("value", i);
      }
    ), this.widgets_up = !0;
  }
  setName(e) {
    if (e == null || e === this.properties.name)
      return;
    const s = this.getParentSubgraph();
    s && (e = s.getValidGraphInputName(e), this.setProperty("name", e));
  }
  setType(e) {
    e || (e = "*");
    let s = e;
    e === "-1" || e === "Action" ? s = O.ACTION : e === "-2" || e === "Event" ? s = O.EVENT : e === "0" && (s = "*"), this.setProperty("type", s);
  }
  onConfigure() {
    this.updateType();
  }
  getParentSubgraph() {
    var e, s;
    return (s = (e = this.graph._subgraph_node) == null ? void 0 : e.graph) == null ? void 0 : s.getNodeById(this.properties.subgraphID);
  }
  /** ensures the type in the node output and the type in the associated graph input are the same */
  updateType() {
    var e = this.properties.type;
    this.typeWidget.value = $(e);
    const s = this.outputs[0];
    s.type != e && (u.isValidConnection(s.type, e) || this.disconnectOutput(0), s.type = e), e == "array" ? s.shape = A.GRID_SHAPE : e === O.EVENT || e === O.ACTION ? s.shape = A.BOX_SHAPE : s.shape = A.DEFAULT, e == "number" ? (this.valueWidget.type = "number", this.valueWidget.value = 0) : e == "boolean" ? (this.valueWidget.type = "toggle", this.valueWidget.value = !0) : e == "string" ? (this.valueWidget.type = "text", this.valueWidget.value = "") : (this.valueWidget.type = null, this.valueWidget.value = null), this.properties.value = this.valueWidget.value, this.graph && this.nameInGraph && et(e) ? (this.graph.changeInputType(this.nameInGraph, e), s.type !== e && this.setOutputDataType(0, e)) : console.error("[GraphInput] Can't change output to type", e, this.graph, this.nameInGraph);
  }
  /** this is executed AFTER the property has changed */
  onPropertyChanged(e, s) {
    if (e == "name") {
      if (s == "" || s == this.nameInGraph || s == "enabled")
        return !1;
      this.graph && (this.nameInGraph ? this.graph.renameInput(this.nameInGraph, s) : this.graph.addInput(s, "" + this.properties.type, null)), this.nameWidget.value = s, this.nameInGraph = s;
    } else
      e == "type" && this.updateType();
  }
  getTitle() {
    return this.flags.collapsed ? this.properties.name : this.title;
  }
  onAction(e, s) {
    this.properties.type == O.EVENT && this.triggerSlot(0, s);
  }
  onExecute() {
    var e = this.properties.name, s = this.graph.inputs[e];
    if (!s) {
      this.setOutputData(0, this.properties.value);
      return;
    }
    this.setOutputData(0, s.value !== void 0 ? s.value : this.properties.value);
  }
  onRemoved() {
    this.nameInGraph && this.graph.removeInput(this.nameInGraph);
  }
}
Q.slotLayout = {
  inputs: [],
  outputs: [
    { name: "", type: "number" }
  ]
};
u.registerNodeType({
  class: Q,
  title: "Input",
  desc: "Input of the graph",
  type: "graph/input",
  hide_in_node_lists: !0
});
function st() {
  let t = [];
  return t = t.concat(Qe), t = t.concat([O.EVENT]), t = t.concat(u.slot_types_out), t;
}
function Xt() {
  return st().map($);
}
class ee extends C {
  constructor(e) {
    super(e), this.properties = {
      name: "",
      type: "number",
      subgraphID: null
    }, this.nameInGraph = "", this.clonable = !1, this.size = [180, 60], this.nameWidget = this.addWidget(
      "text",
      "Name",
      this.properties.name,
      this.setName.bind(this)
    ), u.graph_inputs_outputs_use_combo_widget ? this.typeWidget = this.addWidget(
      "combo",
      "Type",
      $(this.properties.type),
      this.setType.bind(this),
      { values: Xt }
    ) : this.typeWidget = this.addWidget(
      "text",
      "Type",
      $(this.properties.type),
      this.setType.bind(this)
    ), this.widgets_up = !0;
  }
  setName(e) {
    if (e == null || e === this.properties.name)
      return;
    const s = this.getParentSubgraph();
    s && (e = s.getValidGraphOutputName(e), this.setProperty("name", e));
  }
  setType(e) {
    e || (e = "*");
    let s = e;
    e === "-1" || e === "Action" ? s = O.ACTION : e === "-2" || e === "Event" ? s = O.EVENT : e === "0" && (s = "*"), this.setProperty("type", s);
  }
  onConfigure() {
    this.updateType();
  }
  getParentSubgraph() {
    var e, s;
    return (s = (e = this.graph._subgraph_node) == null ? void 0 : e.graph) == null ? void 0 : s.getNodeById(this.properties.subgraphID);
  }
  updateType() {
    var e = this.properties.type;
    const s = this.inputs[0];
    this.typeWidget && (this.typeWidget.value = $(e)), e == "array" ? s.shape = A.GRID_SHAPE : e === O.EVENT || e === O.ACTION ? s.shape = A.BOX_SHAPE : s.shape = A.DEFAULT, s.type != e && ((e == "action" || e == "event") && (e = O.EVENT), u.isValidConnection(s.type, e) || this.disconnectInput(0), s.type = e), this.graph && this.nameInGraph && et(e) ? (this.graph.changeOutputType(this.nameInGraph, e), s.type !== e && this.setInputDataType(0, e)) : console.error("Can't change GraphOutput to type", e, this.graph, this.nameInGraph);
  }
  /** this is executed AFTER the property has changed */
  onPropertyChanged(e, s) {
    if (e == "name") {
      if (s == "" || s == this.nameInGraph || s == "enabled")
        return !1;
      this.graph ? this.nameInGraph ? this.graph.renameOutput(this.nameInGraph, s) : this.graph.addOutput(s, "" + this.properties.type, null) : console.error("[GraphOutput] missing graph!", e, s), this.nameWidget.value = s, this.nameInGraph = s;
    } else
      e == "type" && this.updateType();
  }
  getTitle() {
    return this.flags.collapsed ? this.properties.name : this.title;
  }
  onAction(e, s, i) {
    const n = this.getParentSubgraph();
    if (!n)
      return;
    const r = n.findOutputSlotIndexByName(this.properties.name);
    r == null || n.outputs[r] == null || n.triggerSlot(r, s);
  }
  onExecute() {
    const e = this.getInputData(0);
    this.graph.setOutputData(this.properties.name, e);
  }
  onRemoved() {
    this.nameInGraph && this.graph.removeOutput(this.nameInGraph);
  }
}
ee.slotLayout = {
  inputs: [
    { name: "", type: "" }
  ],
  outputs: []
};
u.registerNodeType({
  class: ee,
  title: "Output",
  desc: "Output of the graph",
  type: "graph/output",
  hide_in_node_lists: !0
});
var jt = /* @__PURE__ */ ((t) => (t[t.STATUS_STOPPED = 1] = "STATUS_STOPPED", t[t.STATUS_RUNNING = 2] = "STATUS_RUNNING", t))(jt || {});
const it = class {
  constructor(t) {
    this.supported_types = null, this.vars = {}, this.extra = {}, this.inputs = {}, this.outputs = {}, this.links = {}, this.list_of_graphcanvas = [], this._nodes = [], this._groups = [], this._nodes_by_id = {}, this._nodes_executable = null, this._nodes_in_order = [], this._version = -1, this._last_trigger_time = 0, this._is_subgraph = !1, this._subgraph_node = null, this.nodes_executing = [], this.nodes_actioning = [], this.nodes_executedAction = [], this.execution_timer_id = -1, this.execution_time = 0, this.errors_in_execution = !1, u.debug && console.log("Graph created"), this.list_of_graphcanvas = null, this.clear(), t && this.configure(t);
  }
  getSupportedTypes() {
    return this.supported_types || it.DEFAULT_SUPPORTED_TYPES;
  }
  /*
   * Gets the root graph above any subgraphs.
   */
  getRootGraph() {
    const t = Array.from(this.iterateParentGraphs()), e = t[t.length - 1];
    return e._is_subgraph ? null : e;
  }
  *iterateParentGraphs() {
    var e;
    let t = this;
    for (; t; )
      yield t, t = (e = t._subgraph_node) == null ? void 0 : e.graph;
  }
  /** Removes all nodes from this graph */
  clear() {
    if (this.stop(), this.status = 1, this.last_node_id = 0, this.last_link_id = 0, this._version = -1, this._nodes)
      for (var t = 0; t < this._nodes.length; ++t) {
        var e = this._nodes[t];
        e.onRemoved && e.onRemoved();
      }
    this._nodes = [], this._nodes_by_id = {}, this._nodes_in_order = [], this._nodes_executable = null, this._groups = [], this.links = {}, this.iteration = 0, this.config = {}, this.vars = {}, this.extra = {}, this.globaltime = 0, this.runningtime = 0, this.fixedtime = 0, this.fixedtime_lapse = 0.01, this.elapsed_time = 0.01, this.last_update_time = 0, this.starttime = 0, this.catch_errors = !0, this.nodes_executing = [], this.nodes_actioning = [], this.nodes_executedAction = [], this.inputs = {}, this.outputs = {}, this.change(), this.sendActionToCanvas("clear");
  }
  /** Attach Canvas to this graph */
  attachCanvas(t) {
    if (!(t instanceof N))
      throw "attachCanvas expects a LGraphCanvas instance";
    t.graph && t.graph != this && t.graph.detachCanvas(t), t.graph = this, this.list_of_graphcanvas || (this.list_of_graphcanvas = []), this.list_of_graphcanvas.push(t);
  }
  /** Detach Canvas to this graph */
  detachCanvas(t) {
    if (this.list_of_graphcanvas) {
      var e = this.list_of_graphcanvas.indexOf(t);
      e != -1 && (t.graph = null, this.list_of_graphcanvas.splice(e, 1));
    }
  }
  /**
   * Starts running this graph every interval milliseconds.
   * @param interval amount of milliseconds between executions, if 0 then it renders to the monitor refresh rate
   */
  start(t) {
    if (this.status != 2) {
      this.status = 2, this.onPlayEvent && this.onPlayEvent(), this.sendEventToAllNodes("onStart"), this.starttime = u.getTime(), this.last_update_time = this.starttime, t = t || 0;
      var e = this;
      if (t == 0 && typeof window < "u" && window.requestAnimationFrame) {
        let s = function() {
          e.execution_timer_id == -1 && (window.requestAnimationFrame(s), e.onBeforeStep && e.onBeforeStep(), e.runStep(1, !e.catch_errors), e.onAfterStep && e.onAfterStep());
        };
        this.execution_timer_id = -1, s();
      } else
        this.execution_timer_id = setInterval(function() {
          e.onBeforeStep && e.onBeforeStep(), e.runStep(1, !e.catch_errors), e.onAfterStep && e.onAfterStep();
        }, t);
    }
  }
  /** Stops the execution loop of the graph */
  stop() {
    this.status != 1 && (this.status = 1, this.onStopEvent && this.onStopEvent(), this.execution_timer_id != null && (this.execution_timer_id != -1 && clearInterval(this.execution_timer_id), this.execution_timer_id = null), this.sendEventToAllNodes("onStop"));
  }
  /**
   * Run N steps (cycles) of the graph
   * @param num number of steps to run, default is 1
   * @param do_not_catch_errors if you want to try/catch errors
   */
  runStep(t = 1, e = !1, s) {
    var i = u.getTime();
    this.globaltime = 1e-3 * (i - this.starttime);
    let n = this._nodes_executable ? this._nodes_executable : this._nodes;
    if (n) {
      if (s = s || n.length, e) {
        for (var r = 0; r < t; r++) {
          for (var o = 0; o < s; ++o) {
            var a = n[o];
            a.mode == Z.ALWAYS && a.onExecute && a.doExecute();
          }
          this.fixedtime += this.fixedtime_lapse, this.onExecuteStep && this.onExecuteStep();
        }
        this.onAfterExecute && this.onAfterExecute();
      } else
        try {
          for (var r = 0; r < t; r++) {
            for (var o = 0; o < s; ++o) {
              var a = n[o];
              a.mode == Z.ALWAYS && a.onExecute && a.onExecute(null, {});
            }
            this.fixedtime += this.fixedtime_lapse, this.onExecuteStep && this.onExecuteStep();
          }
          this.onAfterExecute && this.onAfterExecute(), this.errors_in_execution = !1;
        } catch (p) {
          if (this.errors_in_execution = !0, u.throw_errors)
            throw p;
          u.debug && console.log("Error during execution: " + p), this.stop();
        }
      var l = u.getTime(), h = l - i;
      h == 0 && (h = 1), this.execution_time = 1e-3 * h, this.globaltime += 1e-3 * h, this.iteration += 1, this.elapsed_time = (l - this.last_update_time) * 1e-3, this.last_update_time = l, this.nodes_executing = [], this.nodes_actioning = [], this.nodes_executedAction = [];
    }
  }
  /**
   * Updates the graph execution order according to relevance of the nodes (nodes with only outputs have more relevance than
   * nodes with only inputs.
   */
  updateExecutionOrder() {
    this._nodes_in_order = this.computeExecutionOrder(!1), this._nodes_executable = [];
    for (var t = 0; t < this._nodes_in_order.length; ++t)
      if (this._nodes_in_order[t].onExecute) {
        let e = this._nodes_in_order[t];
        this._nodes_executable.push(e);
      }
  }
  *computeExecutionOrderRecursive(t = !1, e) {
    for (const s of this.computeExecutionOrder(t, e))
      if (yield s, s.is(re))
        for (const i of s.subgraph.computeExecutionOrderRecursive(t, e))
          yield i;
  }
  /** This is more internal, it computes the executable nodes in order and returns it */
  computeExecutionOrder(t = !1, e) {
    for (var s = [], i = [], n = {}, r = {}, o = {}, a = 0, _ = this._nodes.length; a < _; ++a) {
      var l = this._nodes[a];
      if (!(t && !l.onExecute)) {
        n[l.id] = l;
        var h = 0;
        if (l.inputs)
          for (var p = 0, f = l.inputs.length; p < f; p++)
            l.inputs[p] && l.inputs[p].link != null && (h += 1);
        h == 0 ? (i.push(l), e && (l._level = 1)) : (e && (l._level = 0), o[l.id] = h);
      }
    }
    for (; i.length != 0; ) {
      let b = i.shift();
      if (s.push(b), delete n[b.id], !!b.outputs)
        for (var a = 0; a < b.outputs.length; a++) {
          var c = b.outputs[a];
          if (!(c == null || c.links == null || c.links.length == 0))
            for (var p = 0; p < c.links.length; p++) {
              var v = c.links[p], g = this.links[v];
              if (g && !r[g.id]) {
                var d = this.getNodeById(g.target_id);
                if (d == null) {
                  r[g.id] = !0;
                  continue;
                }
                e && (!d._level || d._level <= b._level) && (d._level = b._level + 1), r[g.id] = !0, o[d.id] -= 1, o[d.id] == 0 && i.push(d);
              }
            }
        }
    }
    for (let b of Object.keys(n).sort())
      s.push(n[b]);
    s.length != this._nodes.length && u.debug && console.warn("something went wrong, nodes missing");
    for (var _ = s.length, a = 0; a < _; ++a)
      s[a].order = a;
    s = s.sort(function(b, m) {
      var y = b.constructor.priority || b.priority || 0, E = m.constructor.priority || m.priority || 0;
      return y == E ? b.order - m.order : y - E;
    });
    for (var a = 0; a < _; ++a)
      s[a].order = a;
    return s;
  }
  /**
   * Returns all the nodes that could affect this one (ancestors) by crawling all the inputs recursively.
   * It doesn't include the node itself
   * @return an array with all the LGraphNodes that affect this node, in order of execution
   */
  getAncestors(t) {
    for (var e = [], s = [t], i = {}; s.length; ) {
      var n = s.shift();
      if (n.inputs) {
        !i[n.id] && n != t && (i[n.id] = !0, e.push(n));
        for (var r = 0; r < n.inputs.length; ++r) {
          var o = n.getInputNode(r);
          o && e.indexOf(o) == -1 && s.push(o);
        }
      }
    }
    return e.sort(function(a, l) {
      return a.order - l.order;
    }), e;
  }
  /**
   * Positions every node in a more readable manner
   */
  arrange(t = 100, e = ue.HORIZONTAL_LAYOUT) {
    const s = this.computeExecutionOrder(!1, !0), i = [];
    for (let r = 0; r < s.length; ++r) {
      const o = s[r], a = o._level || 1;
      i[a] || (i[a] = []), i[a].push(o);
    }
    let n = t;
    for (let r = 0; r < i.length; ++r) {
      const o = i[r];
      if (!o)
        continue;
      let a = 100, l = t + u.NODE_TITLE_HEIGHT;
      for (let h = 0; h < o.length; ++h) {
        const p = o[h];
        p.pos[0] = e == ue.VERTICAL_LAYOUT ? l : n, p.pos[1] = e == ue.VERTICAL_LAYOUT ? n : l;
        const f = e == ue.VERTICAL_LAYOUT ? 1 : 0;
        p.size[f] > a && (a = p.size[f]);
        const c = e == ue.VERTICAL_LAYOUT ? 0 : 1;
        l += p.size[c] + t + u.NODE_TITLE_HEIGHT;
      }
      n += a + t;
    }
    this.setDirtyCanvas(!0, !0);
  }
  /**
   * Returns the amount of time the graph has been running in milliseconds
   * @return number of milliseconds the graph has been running
   */
  getTime() {
    return this.globaltime;
  }
  /**
   * Returns the amount of time accumulated using the fixedtime_lapse var. This is used in context where the time increments should be constant
   * @return number of milliseconds the graph has been running
   */
  getFixedTime() {
    return this.fixedtime;
  }
  /**
   * Returns the amount of time it took to compute the latest iteration. Take into account that this number could be not correct
   * if the nodes are using graphical actions
   * @return number of milliseconds it took the last cycle
   */
  getElapsedTime() {
    return this.elapsed_time;
  }
  /**
   * Iterates all nodes in this graph *excluding* subgraphs.
   */
  *iterateNodesInOrder() {
    const t = this._nodes_in_order ? this._nodes_in_order : this._nodes || [];
    for (const e of t)
      yield e;
  }
  /**
   * Iterates all nodes in this graph and subgraphs.
   */
  *iterateNodesInOrderRecursive() {
    const t = this._nodes_in_order ? this._nodes_in_order : this._nodes || [];
    for (const e of t)
      if (yield e, e.subgraph != null)
        for (const s of e.subgraph.iterateNodesInOrderRecursive())
          yield s;
  }
  /**
   * Iterates all nodes in this graph *excluding* subgraphs.
   */
  *iterateNodesOfClass(t) {
    const e = t.__LITEGRAPH_TYPE__;
    if (e != null)
      for (const s of this.iterateNodesInOrder())
        s.type === e && (yield s);
  }
  /**
   * Iterates all nodes in this graph *excluding* subgraphs.
   */
  *iterateNodesOfClassRecursive(t) {
    const e = t.__LITEGRAPH_TYPE__;
    if (e != null)
      for (const s of this.iterateNodesInOrderRecursive())
        s.type === e && (yield s);
  }
  /**
   * Iterates all nodes in this graph *excluding* subgraphs.
   */
  *iterateNodesOfTypeRecursive(t) {
    for (const e of this.iterateNodesInOrderRecursive())
      e.type === t && (yield e);
  }
  /**
   * Sends an event to all the nodes, useful to trigger stuff
   * @param eventName the name of the event (function to be called)
   * @param params parameters in array format
   */
  sendEventToAllNodes(t, e = [], s = Z.ALWAYS) {
    var i = this._nodes_in_order ? this._nodes_in_order : this._nodes;
    if (i)
      for (const n of this.iterateNodesInOrder()) {
        if (n.type === "basic/subgraph" && t != "onExecute") {
          n.mode == s && n.sendEventToAllNodes(t, e, s);
          continue;
        }
        !n[t] || n.mode != s || (e === void 0 ? n[t]() : e && e.constructor === Array ? n[t].apply(n, e) : n[t](e));
      }
  }
  sendActionToCanvas(t, e = []) {
    if (this.list_of_graphcanvas)
      for (var s = 0; s < this.list_of_graphcanvas.length; ++s) {
        var i = this.list_of_graphcanvas[s];
        i[t] && i[t].apply(i, e);
      }
  }
  addGroup(t) {
    return this._groups.push(t), this.setDirtyCanvas(!0), this.change(), t.graph = this, this._version++, t;
  }
  /**
   * Adds a new node instance to this graph
   * @param node the instance of the node
   */
  add(t, e = {}) {
    if (t.id != -1 && this._nodes_by_id[t.id] != null && (console.warn(
      "LiteGraph: there is already a node with this ID, changing it",
      t.id
    ), u.use_uuids ? t.id = ae() : t.id = ++this.last_node_id), e.pos && (isNaN(e.pos[0]) || isNaN(e.pos[1])))
      throw "LiteGraph: Node position contained NaN(s)!";
    if (this._nodes.length >= u.MAX_NUMBER_OF_NODES)
      throw "LiteGraph: max number of nodes in a graph reached";
    return u.use_uuids ? t.id || (t.id = ae()) : t.id == null || t.id == -1 ? t.id = ++this.last_node_id : this.last_node_id < t.id && (this.last_node_id = t.id), t.graph = this, this._version++, this._nodes.push(t), this._nodes_by_id[t.id] = t, e.pos && (t.pos = e.pos), t.onAdded && t.onAdded(this), this.config.align_to_grid && t.alignToGrid(), e.skipComputeOrder || this.updateExecutionOrder(), this.onNodeAdded && this.onNodeAdded(t, e), this.setDirtyCanvas(!0), this.change(), t;
  }
  /** Removes a node from the graph */
  remove(t, e = {}) {
    if (t instanceof me) {
      var s = this._groups.indexOf(t);
      s != -1 && this._groups.splice(s, 1), t.graph = null, this._version++, this.setDirtyCanvas(!0, !0), this.change();
      return;
    }
    if (this._nodes_by_id[t.id] != null && !t.ignore_remove) {
      if (this.beforeChange(), t.inputs)
        for (var i = 0; i < t.inputs.length; i++) {
          var n = t.inputs[i];
          n.link != null && t.disconnectInput(i);
        }
      if (t.outputs)
        for (var i = 0; i < t.outputs.length; i++) {
          let l = t.outputs[i];
          l.links != null && l.links.length && t.disconnectOutput(i);
        }
      if (t.onRemoved && t.onRemoved(e), t.graph = null, this._version++, this.list_of_graphcanvas)
        for (var i = 0; i < this.list_of_graphcanvas.length; ++i) {
          var r = this.list_of_graphcanvas[i];
          r.selected_nodes[t.id] && delete r.selected_nodes[t.id], r.node_dragged == t && (r.node_dragged = null);
        }
      var o = this._nodes.indexOf(t);
      o != -1 && this._nodes.splice(o, 1), delete this._nodes_by_id[t.id], this.onNodeRemoved && this.onNodeRemoved(t, e), this.sendActionToCanvas("checkPanels"), this.setDirtyCanvas(!0, !0), this.afterChange(), this.change(), this.updateExecutionOrder();
    }
  }
  /** Returns a node by its id. */
  getNodeById(t) {
    return t == null ? null : this._nodes_by_id[t];
  }
  /** Returns a node by its id. */
  getNodeByIdRecursive(t) {
    const e = this.getNodeById(t);
    if (e != null)
      return e;
    for (const s of this.iterateNodesOfClass(re)) {
      const i = s.subgraph.getNodeByIdRecursive(t);
      if (i)
        return i;
    }
    return null;
  }
  /**
   * Returns a list of nodes that matches a class
   * @param classObject the class itself (not an string)
   * @return a list with all the nodes of this type
   */
  findNodesByClass(t, e = []) {
    e.length = 0;
    for (const s of this.iterateNodesOfClass(t))
      e.push(s);
    return e;
  }
  /**
   * Returns a list of nodes that matches a type
   * @param type the name of the node type
   * @return a list with all the nodes of this type
   */
  findNodesByType(s, e = []) {
    var s = s.toLowerCase();
    e.length = 0;
    for (var i = 0, n = this._nodes.length; i < n; ++i)
      this._nodes[i].type.toLowerCase() == s && e.push(this._nodes[i]);
    return e;
  }
  /**
   * Returns a list of nodes that matches a class
   * @param classObject the class itself (not an string)
   * @return a list with all the nodes of this type
   */
  findNodesByClassRecursive(t, e = []) {
    e.length = 0;
    for (const s of this.iterateNodesOfClassRecursive(t))
      e.push(s);
    return e;
  }
  /**
   * Returns a list of nodes that matches a type
   * @param type the name of the node type
   * @return a list with all the nodes of this type
   */
  findNodesByTypeRecursive(s, e = []) {
    var s = s.toLowerCase();
    e.length = 0;
    for (const i of this.iterateNodesOfTypeRecursive(s))
      e.push(i);
    return e;
  }
  /**
   * Returns the first node that matches a name in its title
   * @param title the name of the node to search
   * @return the node or null
   */
  findNodeByTitle(t) {
    for (var e = 0, s = this._nodes.length; e < s; ++e)
      if (this._nodes[e].title == t)
        return this._nodes[e];
    return null;
  }
  /**
   * Returns a list of nodes that matches a name
   * @param title the name of the node to search
   * @return a list with all the nodes with this name
   */
  findNodesByTitle(t) {
    for (var e = [], s = 0, i = this._nodes.length; s < i; ++s)
      this._nodes[s].title == t && e.push(this._nodes[s]);
    return e;
  }
  /**
   * Returns the top-most node in this position of the canvas
   * @param x the x coordinate in canvas space
   * @param y the y coordinate in canvas space
   * @param nodesList a list with all the nodes to search from, by default is all the nodes in the graph
   * @return the node at this position or null
   */
  getNodeOnPos(t, e, s, i) {
    s = s || this._nodes;
    for (var n = null, r = s.length - 1; r >= 0; r--) {
      var o = s[r], a = o.titleMode == se.NO_TITLE;
      if (o.isPointInside(t, e, i, a))
        return o;
    }
    return n;
  }
  /**
   * Returns the top-most group in that position
   * @param x the x coordinate in canvas space
   * @param y the y coordinate in canvas space
   * @return the group or null
   */
  getGroupOnPos(t, e) {
    for (var s = this._groups.length - 1; s >= 0; s--) {
      var i = this._groups[s];
      if (i.isPointInside(t, e, 2, !0))
        return i;
    }
    return null;
  }
  /**
   * Checks that the node type matches the node type registered, used when replacing a nodetype by a newer version during execution
   * this replaces the ones using the old version with the new version
   * @method checkNodeTypes
   */
  checkNodeTypes() {
    for (var t = !1, e = 0; e < this._nodes.length; e++) {
      var s = this._nodes[e], i = u.registered_node_types[s.type];
      if (s.constructor != i.class) {
        console.log("node being replaced by newer version: " + s.type);
        var n = u.createNode(s.type);
        t = !0, this._nodes[e] = n, n.configure(s.serialize()), n.graph = this, this._nodes_by_id[n.id] = n, s.inputs && (n.inputs = s.inputs.concat()), s.outputs && (n.outputs = s.outputs.concat());
      }
    }
    return this.updateExecutionOrder(), t;
  }
  // ********** GLOBALS *****************
  onAction(t, e, s = {}) {
    for (const i of this.iterateNodesOfClass(Q))
      if (i.properties.name == t) {
        i.actionDo(t, e, s);
        break;
      }
  }
  trigger(t, e) {
    this.onTrigger && this.onTrigger(t, e);
  }
  triggerSlot(t, e) {
    this.onTrigger && this.onTrigger(t, e);
  }
  /** Tell this graph it has a global graph input of this type */
  addInput(t, e, s) {
    var i = this.inputs[t];
    i || (this.beforeChange(), this.inputs[t] = { name: t, type: e, value: s }, this._version++, this.afterChange(), this.onInputAdded && this.onInputAdded(t, e, s), this.onInputsOutputsChange && this.onInputsOutputsChange());
  }
  /** Assign a data to the global graph input */
  setInputData(t, e) {
    var s = this.inputs[t];
    s && (s.value = e);
  }
  /** Returns the current value of a global graph input */
  getInputData(t) {
    var e = this.inputs[t];
    return e ? e.value : null;
  }
  /** Changes the name of a global graph input */
  renameInput(t, e) {
    if (e != t)
      return this.inputs[t] ? this.inputs[e] ? (console.error("there is already one input with that name"), !1) : (this.inputs[e] = this.inputs[t], delete this.inputs[t], this._version++, this.onInputRenamed && this.onInputRenamed(t, e), this.onInputsOutputsChange && this.onInputsOutputsChange(), !0) : !1;
  }
  /** Changes the type of a global graph input */
  changeInputType(t, e) {
    if (!this.inputs[t])
      return !1;
    if (this.inputs[t].type && String(this.inputs[t].type).toLowerCase() == String(e).toLowerCase())
      return;
    const s = this.inputs[t].type;
    return this.inputs[t].type = e, this._version++, this.onInputTypeChanged && this.onInputTypeChanged(t, s, e), !0;
  }
  /** Removes a global graph input */
  removeInput(t) {
    return this.inputs[t] ? (delete this.inputs[t], this._version++, this.onInputRemoved && this.onInputRemoved(t), this.onInputsOutputsChange && this.onInputsOutputsChange(), !0) : !1;
  }
  /** Creates a global graph output */
  addOutput(t, e, s) {
    this.outputs[t] = { name: t, type: e, value: s }, this._version++, this.onOutputAdded && this.onOutputAdded(t, e, s), this.onInputsOutputsChange && this.onInputsOutputsChange();
  }
  /** Assign a data to the global output */
  setOutputData(t, e) {
    var s = this.outputs[t];
    s && (s.value = e);
  }
  /** Returns the current value of a global graph output */
  getOutputData(t) {
    var e = this.outputs[t];
    return e ? e.value : null;
  }
  /** Renames a global graph output */
  renameOutput(t, e) {
    return this.outputs[t] ? this.outputs[e] ? (console.error("there is already one output with that name"), !1) : (this.outputs[e] = this.outputs[t], delete this.outputs[t], this._version++, this.onOutputRenamed && this.onOutputRenamed(t, e), this.onInputsOutputsChange && this.onInputsOutputsChange(), !0) : !1;
  }
  /** Changes the type of a global graph output */
  changeOutputType(t, e) {
    if (!this.outputs[t])
      return !1;
    if (this.outputs[t].type && String(this.outputs[t].type).toLowerCase() == String(e).toLowerCase())
      return;
    const s = this.outputs[t].type;
    return this.outputs[t].type = e, this._version++, this.onOutputTypeChanged && this.onOutputTypeChanged(t, s, e), !0;
  }
  /** Removes a global graph output */
  removeOutput(t) {
    return this.outputs[t] ? (delete this.outputs[t], this._version++, this.onOutputRemoved && this.onOutputRemoved(t), this.onInputsOutputsChange && this.onInputsOutputsChange(), !0) : !1;
  }
  /* TODO implement
      triggerInput(name: string, value: any): void {
          var nodes = this.findNodesByTitle(name);
          for (var i = 0; i < nodes.length; ++i) {
              nodes[i].onTrigger(value);
          }
      }
  
      setCallback(name: string, func: (...args: any[]) => any): void {
          var nodes = this.findNodesByTitle(name);
          for (var i = 0; i < nodes.length; ++i) {
              nodes[i].setTrigger(func);
          }
      }
      */
  /** used for undo, called before any change is made to the graph */
  beforeChange(t) {
    this.onBeforeChange && this.onBeforeChange(this, t), this.sendActionToCanvas("onBeforeChange", [this]);
  }
  /** used to resend actions, called after any change is made to the graph */
  afterChange(t) {
    this.onAfterChange && this.onAfterChange(this, t), this.sendActionToCanvas("onAfterChange", [this]);
  }
  connectionChange(t, e) {
    this.updateExecutionOrder(), this.onConnectionChange && this.onConnectionChange(t), this._version++, this.sendActionToCanvas("onConnectionChange");
  }
  /** returns if the graph is in live mode */
  isLive() {
    if (!this.list_of_graphcanvas)
      return !1;
    for (var t = 0; t < this.list_of_graphcanvas.length; ++t) {
      var e = this.list_of_graphcanvas[t];
      if (e.live_mode)
        return !0;
    }
    return !1;
  }
  /** clears the triggered slot animation in all links (stop visual animation) */
  clearTriggeredSlots() {
    for (var t in this.links) {
      var e = this.links[t];
      e && e._last_time && (e._last_time = 0);
    }
  }
  /* Called when something visually changed (not the graph!) */
  change() {
    u.debug && console.log("Graph changed"), this.sendActionToCanvas("setDirty", [!0, !0]), this.onChange && this.onChange(this);
  }
  setDirtyCanvas(t = !1, e = !1) {
    this.sendActionToCanvas("setDirty", [t, e]);
  }
  /** Destroys a link */
  removeLink(t) {
    var e = this.links[t];
    if (e) {
      var s = this.getNodeById(e.target_id);
      s && s.disconnectInput(e.target_slot);
    }
  }
  /** Creates a Object containing all the info about this graph, it can be serialized */
  serialize() {
    for (var t = [], e = 0, s = this._nodes.length; e < s; ++e)
      t.push(this._nodes[e].serialize());
    var i = [];
    for (const h in this.links) {
      var n = this.links[h];
      if (!n.serialize) {
        console.error(
          "weird LLink bug, link info is not a LLink but a regular object",
          n
        );
        var r = he.configure(n);
        for (var o in n)
          r[o] = n[o];
        this.links[h] = r, n = r;
      }
      i.push(n.serialize());
    }
    for (var a = [], e = 0; e < this._groups.length; ++e)
      a.push(this._groups[e].serialize());
    var l = {
      last_node_id: this.last_node_id,
      last_link_id: this.last_link_id,
      nodes: t,
      links: i,
      groups: a,
      config: this.config,
      extra: this.extra,
      version: u.VERSION
    };
    return this.onSerialize && this.onSerialize(l), l;
  }
  /**
   * Configure a graph from a JSON string
   * @param data configure a graph from a JSON string
   * @returns if there was any error parsing
   */
  configure(t, e) {
    if (t) {
      e || this.clear();
      var s = t.nodes;
      if (t.links && t.links.constructor === Array) {
        for (var i = [], n = 0; n < t.links.length; ++n) {
          var r = t.links[n];
          if (!r) {
            console.warn("serialized graph link data contains errors, skipping.");
            continue;
          }
          var o = he.configure(r);
          i[o.id] = o;
        }
        t.links = i;
      }
      for (const c in t)
        c == "nodes" || c == "groups" || (this[c] = t[c]);
      var a = !1;
      if (this._nodes = [], s) {
        for (var n = 0, l = s.length; n < l; ++n) {
          var h = s[n], p = u.createNode(h.type, h.title);
          p || (console.error(
            "Node not found or has errors: " + h.type
          ), p = new C(), p.last_serialization = h, p.has_errors = !0, a = !0), p.id = h.id, this.add(p, { addedBy: "configure", skipComputeOrder: !0 });
        }
        for (var n = 0, l = s.length; n < l; ++n) {
          var h = s[n], p = this.getNodeById(h.id);
          p && p.configure(h);
        }
      }
      if (this._groups.length = 0, t.groups)
        for (var n = 0; n < t.groups.length; ++n) {
          var f = new me();
          f.configure(t.groups[n]), this.addGroup(f);
        }
      return this.updateExecutionOrder(), this.extra = t.extra || {}, this.onConfigure && this.onConfigure(t), this._version++, this.setDirtyCanvas(!0, !0), a;
    }
  }
  load(t, e) {
    var s = this;
    if (t.constructor === File || t.constructor === Blob) {
      var i = new FileReader();
      i.addEventListener("load", function(r) {
        var o = JSON.parse(i.result);
        s.configure(o), e && e(o);
      }), i.readAsText(t);
      return;
    }
    var n = new XMLHttpRequest();
    n.open("GET", t, !0), n.send(null), n.onload = function(r) {
      if (n.status !== 200) {
        console.error("Error loading graph:", n.status, n.response);
        return;
      }
      var o = JSON.parse(n.response);
      s.configure(o), e && e(o);
    }, n.onerror = function(r) {
      console.error("Error loading graph:", r);
    };
  }
};
let nt = it;
nt.DEFAULT_SUPPORTED_TYPES = ["number", "string", "boolean"];
function rt(t) {
  const e = { nodeIDs: {}, linkIDs: {} };
  for (const s of t.nodes) {
    const i = s.id, n = ae();
    if (s.id = n, e.nodeIDs[i] || e.nodeIDs[n])
      throw new Error(
        `New/old node UUID wasn't unique in changed map! ${i} ${n}`
      );
    e.nodeIDs[i] = n, e.nodeIDs[n] = i;
  }
  for (const s of t.links) {
    const i = s[0], n = ae();
    if (s[0] = n, e.linkIDs[i] || e.linkIDs[n])
      throw new Error(
        `New/old link UUID wasn't unique in changed map! ${i} ${n}`
      );
    e.linkIDs[i] = n, e.linkIDs[n] = i;
    const r = s[1], o = s[3];
    if (!e.nodeIDs[r])
      throw new Error(`Old node UUID not found in mapping! ${r}`);
    if (s[1] = e.nodeIDs[r], !e.nodeIDs[o])
      throw new Error(`Old node UUID not found in mapping! ${o}`);
    s[3] = e.nodeIDs[o];
  }
  for (const s of t.nodes) {
    for (const i of s.inputs)
      i.link && (i.link = e.linkIDs[i.link]);
    for (const i of s.outputs)
      i.links && (i.links = i.links.map((n) => e.linkIDs[n]));
  }
  for (const s of t.nodes)
    if (s.type === "graph/subgraph") {
      const i = rt(
        s.subgraph
      );
      e.nodeIDs = { ...e.nodeIDs, ...i.nodeIDs }, e.linkIDs = { ...e.linkIDs, ...i.linkIDs };
    }
  return e;
}
function qt(t, e) {
  for (const s of t.iterateNodesInOrderRecursive())
    s.onReassignID && s.onReassignID(e);
}
const ot = class extends C {
  constructor(t, e) {
    super(t), this.properties = {
      enabled: !0
    }, this.size = [140, 80], this.enabled = !0, this.subgraph = (e || ot.default_lgraph_factory)(), this.subgraph._subgraph_node = this, this.subgraph._is_subgraph = !0;
    const s = (i, n) => {
      const r = n.bind(this);
      return function(...o) {
        i == null || i.apply(this, o), r(...o);
      };
    };
    this.subgraph.onTrigger = s(
      this.subgraph.onTrigger,
      this.onSubgraphTrigger
    ), this.subgraph.onNodeAdded = s(
      this.subgraph.onNodeAdded,
      this.onSubgraphNodeAdded
    ), this.subgraph.onNodeRemoved = s(
      this.subgraph.onNodeRemoved,
      this.onSubgraphNodeRemoved
    ), this.subgraph.onInputAdded = s(
      this.subgraph.onInputAdded,
      this.onSubgraphNewInput
    ), this.subgraph.onInputRenamed = s(
      this.subgraph.onInputRenamed,
      this.onSubgraphRenamedInput
    ), this.subgraph.onInputTypeChanged = s(
      this.subgraph.onInputTypeChanged,
      this.onSubgraphTypeChangeInput
    ), this.subgraph.onInputRemoved = s(
      this.subgraph.onInputRemoved,
      this.onSubgraphRemovedInput
    ), this.subgraph.onOutputAdded = s(
      this.subgraph.onOutputAdded,
      this.onSubgraphNewOutput
    ), this.subgraph.onOutputRenamed = s(
      this.subgraph.onOutputRenamed,
      this.onSubgraphRenamedOutput
    ), this.subgraph.onOutputTypeChanged = s(
      this.subgraph.onOutputTypeChanged,
      this.onSubgraphTypeChangeOutput
    ), this.subgraph.onOutputRemoved = s(
      this.subgraph.onOutputRemoved,
      this.onSubgraphRemovedOutput
    );
  }
  // getRootGraph(): LGraph | null {
  //     const graphs = Array.from(this.iterateParentGraphs());
  //     const graph = graphs[graphs.length - 1]
  //     // console.warn(graph._is_subgraph)
  //     if (graph._is_subgraph)
  //         return null;
  //     return graph;
  // }
  *iterateParentGraphs() {
    var e;
    let t = this.graph;
    for (; t; )
      yield t, t = (e = t._subgraph_node) == null ? void 0 : e.graph;
  }
  onDblClick(t, e, s) {
    var i = this;
    return setTimeout(function() {
      s.openSubgraph(i.subgraph);
    }, 10), !0;
  }
  onAction(t, e, s) {
    const { originNode: i, link: n } = s;
    if (!i || !n)
      return;
    const r = n.target_slot;
    this.getInnerGraphInputByIndex(r).triggerSlot(0, e);
  }
  onExecute() {
    if (this.enabled = this.getInputOrProperty("enabled"), !!this.enabled) {
      if (this.inputs)
        for (var t = 0; t < this.inputs.length; t++) {
          var e = this.inputs[t], s = this.getInputData(t);
          this.subgraph.setInputData(e.name, s);
        }
      if (this.subgraph.runStep(), this.outputs)
        for (var t = 0; t < this.outputs.length; t++) {
          var i = this.outputs[t], s = this.subgraph.getOutputData(i.name);
          this.setOutputData(t, s);
        }
    }
  }
  sendEventToAllNodes(t, e, s) {
    this.enabled && this.subgraph.sendEventToAllNodes(t, e, s);
  }
  onDrawBackground(t, e, s, i) {
  }
  // override onMouseDown(e, localpos, graphcanvas)
  // {
  // 	var y = this.size[1] - LiteGraph.NODE_TITLE_HEIGHT + 0.5;
  // 	if(localpos[1] > y)
  // 	{
  // 		graphcanvas.showSubgraphPropertiesDialog(this);
  // 	}
  // }
  // override onMouseDown(e: MouseEventExt, localpos: Vector2, graphcanvas: LGraphCanvas): boolean | undefined {
  //     var y = this.size[1] - LiteGraph.NODE_TITLE_HEIGHT + 0.5;
  //     console.log(0)
  //     if (localpos[1] > y) {
  //         if (localpos[0] < this.size[0] / 2) {
  //             console.log(1)
  //             graphcanvas.showSubgraphPropertiesDialog(this);
  //         } else {
  //             console.log(2)
  //             graphcanvas.showSubgraphPropertiesDialogRight(this);
  //         }
  //     }
  //     return false;
  // }
  computeSize() {
    var t = this.inputs ? this.inputs.length : 0, e = this.outputs ? this.outputs.length : 0;
    return [
      200,
      Math.max(t, e) * u.NODE_SLOT_HEIGHT + u.NODE_SLOT_HEIGHT * 0.5
    ];
  }
  //**** INPUTS ***********************************
  onSubgraphTrigger(t, e) {
  }
  onSubgraphNodeAdded(t, e) {
    var s, i;
    (s = this.graph) != null && s.onNodeAdded && (e.subgraphs || (e.subgraphs = []), e.subgraphs.push(this), (i = this.graph) == null || i.onNodeAdded(t, e));
  }
  onSubgraphNodeRemoved(t, e) {
    var s, i;
    (s = this.graph) != null && s.onNodeRemoved && (e.subgraphs || (e.subgraphs = []), e.subgraphs.push(this), (i = this.graph) == null || i.onNodeRemoved(t, e));
  }
  onSubgraphNewInput(t, e) {
    var s = this.findInputSlotIndexByName(t);
    s == -1 && this.addInput(t, e);
  }
  onSubgraphRenamedInput(t, e) {
    var s = this.findInputSlotIndexByName(t);
    if (s != -1) {
      var i = this.getInputInfo(s);
      i.name = e;
    }
  }
  onSubgraphTypeChangeInput(t, e, s) {
    var i = this.findInputSlotIndexByName(t);
    if (i != -1) {
      var n = this.getInputInfo(i);
      n.type = s;
    }
  }
  onSubgraphRemovedInput(t) {
    var e = this.findInputSlotIndexByName(t);
    e != -1 && this.removeInput(e);
  }
  //**** OUTPUTS ***********************************
  onSubgraphNewOutput(t, e) {
    var s = this.findOutputSlotIndexByName(t);
    s == -1 && this.addOutput(t, e);
  }
  onSubgraphRenamedOutput(t, e) {
    var s = this.findOutputSlotIndexByName(t);
    if (s != -1) {
      var i = this.getOutputInfo(s);
      i.name = e;
    }
  }
  onSubgraphTypeChangeOutput(t, e, s) {
    var i = this.findOutputSlotIndexByName(t);
    if (i != -1) {
      var n = this.getOutputInfo(i);
      n.type = s;
    }
  }
  onSubgraphRemovedOutput(t) {
    var e = this.findOutputSlotIndexByName(t);
    e != -1 && this.removeOutput(e);
  }
  // *****************************************************
  getExtraMenuOptions(t, e) {
    var s = this;
    return [
      {
        content: "Open",
        callback: function() {
          t.openSubgraph(s.subgraph);
        }
      }
    ];
  }
  onResize(t) {
    console.error("TEST subgraph resize");
  }
  serialize() {
    var t = C.prototype.serialize.call(this);
    return t.subgraph = this.subgraph.serialize(), t;
  }
  //no need to define node.configure, the default method detects node.subgraph and passes the object to node.subgraph.configure()
  onConfigure(t) {
    super.onConfigure && super.onConfigure(t), this.subgraph._is_subgraph = !0, this.subgraph._subgraph_node = this;
    for (const e of this.subgraph.iterateNodesInOrder())
      (e.is(Q) || e.is(ee)) && (e.properties.subgraphID = this.id);
  }
  onReassignID() {
    for (const t of this.subgraph.iterateNodesInOrder())
      (t.is(Q) || t.is(ee)) && (t.properties.subgraphID = this.id);
  }
  clone(t = { forNode: {} }) {
    var n, r, o, a;
    var e = u.createNode(this.type), s = this.serialize();
    let i = null;
    if (u.use_uuids) {
      const l = u.cloneObject(s.subgraph);
      i = rt(l), s.subgraph = l;
    }
    return delete s.id, delete s.inputs, delete s.outputs, e.configure(s), u.use_uuids && qt(e.subgraph, i), (n = t.forNode)[r = this.id] || (n[r] = {}), t.forNode[this.id].subgraphNewIDMapping = i, (o = t.forNode)[a = e.id] || (o[a] = {}), t.forNode[e.id].subgraphNewIDMapping = i, e;
  }
  buildFromNodes(t) {
    var _, b;
    if (t = t.filter((m) => !m.is(Q) && !m.is(ee)), t.length === 0)
      return;
    const e = {}, s = {}, i = {}, n = t.reduce((m, y) => (m[y.id] = y, m), {});
    let r = Number.MAX_SAFE_INTEGER, o = 0, a = Number.MAX_SAFE_INTEGER, l = 0;
    for (const m of Object.values(t))
      r = Math.min(m.pos[0], r), o = Math.max(m.pos[0] + m.size[0], o), a = Math.min(m.pos[1], a), l = Math.max(m.pos[1] + m.size[1], l);
    const h = {};
    for (const m of t) {
      h[m.id] = m;
      for (let y = 0; y < m.inputs.length; y++) {
        const E = m.getInputLink(y);
        if (E) {
          const T = m.getConnectionPos(!0, y), I = m.getInputInfo(y), S = m.getInputNode(y);
          S && (h[S.id] = S), n[E.origin_id] != null ? i[E.id] = [E, T] : e[E.id] = [E, T, I.name];
        }
      }
      for (let y = 0; y < m.outputs.length; y++) {
        const E = m.getOutputLinks(y);
        for (const T of E) {
          const I = m.getConnectionPos(!1, y), S = m.getOutputInfo(y), F = m.graph.getNodeById(T.target_id);
          F && (h[F.id] = F), n[T.target_id] != null ? i[T.id] = [T, I] : s[T.id] = [T, I, S.name];
        }
      }
    }
    const p = Object.values(e), f = Object.values(s);
    p.sort((m, y) => m[1][1] - y[1][1]), f.sort((m, y) => m[1][1] - y[1][1]), u.debug && (console.debug("NODES", Object.keys(t)), console.debug("IN", Object.keys(e)), console.debug("OUT", Object.keys(s)), console.debug("INNER", Object.keys(i)));
    const c = {}, v = {};
    for (const m of t) {
      const y = [m.pos[0] - r, m.pos[1] - a], E = m.id;
      m.graph.remove(m, { removedBy: "moveIntoSubgraph" }), this.subgraph.add(m, {
        addedBy: "moveIntoSubgraph",
        prevNodeID: E
      }), m.pos = y, h[E] = m, h[m.id] = m;
    }
    let g = 0, d = 0;
    for (const [m, y, E] of p) {
      let T = null;
      if (c[m.origin_id] && (T = c[m.origin_id][m.origin_slot]), !T && (T = this.addGraphInput(E, m.type, [
        -200,
        g
      ]), g += T.innerNode.size[1] + u.NODE_SLOT_HEIGHT, !T)) {
        console.error(
          "Failed creating subgraph output pair!",
          m
        );
        continue;
      }
      const I = h[m.origin_id], S = h[m.target_id];
      I.connect(m.origin_slot, this, T.outerInputIndex), T.innerNode.connect(0, S, m.target_slot), c[_ = m.origin_id] || (c[_] = {}), c[m.origin_id][m.origin_slot] = T;
    }
    for (const [m, y, E] of f) {
      let T = null;
      if (v[m.target_id] && (T = v[m.target_id][m.target_slot]), !T && (T = this.addGraphOutput(E, m.type, [
        o - r + 200,
        d
      ]), d += T.innerNode.size[1] + u.NODE_SLOT_HEIGHT, !T)) {
        console.error(
          "Failed creating subgraph output pair!",
          m
        );
        continue;
      }
      const I = h[m.origin_id], S = h[m.target_id];
      I.connect(m.origin_slot, T.innerNode, 0), this.connect(T.outerOutputIndex, S, m.target_slot), v[b = m.target_id] || (v[b] = {}), v[m.target_id][m.origin_slot] = T;
    }
    for (const [m, y] of Object.values(i)) {
      const E = h[m.origin_id], T = h[m.target_id];
      E.connect(
        m.origin_slot,
        T,
        m.target_slot
      );
    }
  }
  addGraphInput(t, e, s) {
    t = this.getValidGraphInputName(t);
    const i = u.createNode(Q);
    if (i == null)
      return null;
    let n = e;
    e === O.EVENT ? n = O.ACTION : e === O.ACTION && (e = O.EVENT), console.warn("[Subgraph] addGraphInput", t, e, n, s), i.setProperty("name", t), i.setProperty("type", e), i.properties.subgraphID = this.id, this.subgraph.add(i);
    const r = i.computeSize();
    s && (i.pos = [
      s[0] - r[0] * 0.5,
      s[1] - r[1] * 0.5
    ]), this.subgraph.addInput(t, n, null);
    const o = this.inputs.length - 1, a = this.inputs[o];
    return { innerNode: i, outerInput: a, outerInputIndex: o };
  }
  addGraphOutput(t, e, s) {
    t = this.getValidGraphOutputName(t);
    const i = u.createNode(ee);
    if (i == null)
      return null;
    let n = e;
    e === O.EVENT ? e = O.ACTION : e === O.ACTION && (n = O.EVENT), console.warn("[Subgraph] addGraphOutput", t, e, n, s), i.setProperty("name", t), i.setProperty("type", e), i.properties.subgraphID = this.id, this.subgraph.add(i);
    const r = i.computeSize();
    s && (i.pos = [s[0], s[1] - r[1] * 0.5]), this.subgraph.addOutput(t, n, null);
    const o = this.outputs.length - 1, a = this.outputs[o];
    return { innerNode: i, outerOutput: a, outerOutputIndex: o };
  }
  removeGraphInput(t) {
    if (this.findInputSlotIndexByName(t) == null) {
      console.error("[Subgraph] No input in slot!", t);
      return;
    }
    const s = this.subgraph.findNodesByClass(Q).filter((i) => i.properties.name === t);
    if (s.length > 0)
      for (const i of s)
        this.subgraph.remove(i);
    else {
      console.warn(
        "[Subgraph] No GraphInputs found on input removal",
        t
      );
      const i = this.findInputSlotIndexByName(t);
      i !== -1 && this.removeInput(i);
    }
  }
  removeGraphOutput(t) {
    if (this.findOutputSlotIndexByName(t) == null) {
      console.error("[Subgraph] No output in slot!", t);
      return;
    }
    const s = this.subgraph.findNodesByClass(ee).filter((i) => i.properties.name === t);
    if (s.length > 0)
      for (const i of s)
        this.subgraph.remove(i);
    else {
      console.warn(
        "[Subgraph] No GraphOutputs found on output removal",
        t
      );
      const i = this.findOutputSlotIndexByName(t);
      i !== -1 && this.removeOutput(i);
    }
  }
  getValidGraphInputName(t) {
    t || (t = "newInput");
    let e = t, s = this.getInnerGraphInput(e), i = 1;
    for (; s != null; )
      e = `${t}_${i++}`, s = this.getInnerGraphInput(e);
    return e;
  }
  getValidGraphOutputName(t) {
    t || (t = "newOutput");
    let e = t, s = this.getInnerGraphOutput(e), i = 1;
    for (; s != null; )
      e = `${t}_${i++}`, s = this.getInnerGraphOutput(e);
    return e;
  }
  getInnerGraphOutput(t) {
    return this.subgraph._nodes.find((s) => s.is(ee) && s.properties.name === t) || null;
  }
  getInnerGraphInput(t) {
    return this.subgraph._nodes.find((s) => s.is(Q) && s.properties.name === t) || null;
  }
  getInnerGraphOutputByIndex(t) {
    const e = this.getOutputInfo(t);
    return e ? this.getInnerGraphOutput(e.name) : null;
  }
  getInnerGraphInputByIndex(t) {
    const e = this.getInputInfo(t);
    return e ? this.getInnerGraphInput(e.name) : null;
  }
  moveNodesToParentGraph(t) {
    if (t = t.filter((g) => !g.is(Q) && !g.is(ee)), t.length === 0)
      return;
    const e = this, s = e.graph;
    let i = Number.MAX_SAFE_INTEGER, n = 0, r = Number.MAX_SAFE_INTEGER, o = 0;
    for (const g of Object.values(t))
      i = Math.min(g.pos[0], i), n = Math.max(g.pos[0] + g.size[0], n), r = Math.min(g.pos[1], r), o = Math.max(g.pos[1] + g.size[1], o);
    const a = n - i, l = o - r, h = e.pos[0] + e.size[0] / 2 - a / 2, p = e.pos[1] + e.size[1] / 2 - l / 2, f = {}, c = {};
    for (const [g, d] of t.entries())
      c[d.id] = d;
    for (const g of t)
      for (const d of g.iterateAllLinks()) {
        const _ = d.target_id === g.id, b = g.getConnectionPos(
          _,
          _ ? d.target_slot : d.origin_slot
        );
        c[d.origin_id] != null && c[d.target_id] != null && (f[d.id] = [d, b]);
      }
    const v = {};
    for (const [g, d] of t.entries()) {
      const _ = [
        d.pos[0] - i + h,
        d.pos[1] - r + p
      ], b = d.id;
      d.graph.remove(d, { removedBy: "moveOutOfSubgraph" }), s.add(d, { addedBy: "moveOutOfSubgraph", prevNodeID: b }), d.pos = _, v[b] = d;
    }
    for (const [g, d] of Object.values(f)) {
      const _ = c[g.origin_id], b = c[g.target_id];
      _.connect(g.origin_slot, b, g.target_slot);
    }
    return v;
  }
  convertNodesToSubgraphInputs(t) {
    var a;
    if (t = t.filter((l) => !l.is(Q) && !l.is(ee)), t.length === 0)
      return;
    const e = ye(t, (l) => l.id), s = [], i = {}, n = this.subgraph;
    for (const l of t)
      for (const h of l.iterateAllLinks()) {
        if (e[h.origin_id] == null)
          throw new Error(
            "Can't convert to input with an origin link outward"
          );
        if (e[h.target_id] == null) {
          s.push(h);
          const p = [0, 0];
          l.getConnectionPos(!1, h.target_slot, p), i[l.id] = [
            [l.pos[0], l.pos[1]],
            p
          ];
        }
      }
    const r = this.moveNodesToParentGraph(t), o = {};
    for (const l of s) {
      const h = n.getNodeById(l.target_id), p = h.getInputInfo(l.target_slot);
      o[a = l.origin_id] || (o[a] = {});
      let f = o[l.origin_id][l.origin_slot];
      if (f == null) {
        const v = this.getValidGraphInputName(p.name);
        f = this.addGraphInput(v, p.type), o[l.origin_id][l.origin_slot] = f;
        const [g, d] = i[l.origin_id], _ = f.innerNode.pos, b = f.innerNode.computeSize(), m = f.innerNode.getConnectionPos(!0, 0), y = [
          f.innerNode.pos[0] - m[0],
          f.innerNode.pos[1] - m[1]
        ], E = [
          d[0] + y[0] - b[0],
          d[1] + y[1]
        ];
        console.warn(
          "newPos",
          _,
          "size",
          f.innerNode.size,
          "connPos",
          d,
          "newConPos",
          m,
          "offset",
          y
        ), f.innerNode.pos = E;
      }
      r[l.origin_id].connect(l.origin_slot, this, f.outerInputIndex), f.innerNode.connect(0, h, l.target_slot);
    }
  }
  convertNodesToSubgraphOutputs(t) {
    var a;
    if (t = t.filter((l) => !l.is(Q) && !l.is(ee)), t.length === 0)
      return;
    const e = ye(t, (l) => l.id), s = [], i = {}, n = this.subgraph;
    for (const l of t)
      for (const h of l.iterateAllLinks())
        if (e[h.origin_id] == null) {
          s.push(h);
          const p = [0, 0];
          l.getConnectionPos(!0, h.origin_slot, p), i[l.id] = [
            [l.pos[0], l.pos[1]],
            p
          ];
        } else if (e[h.target_id] == null)
          throw new Error(
            "Can't convert to input with an origin link outward"
          );
    const r = this.moveNodesToParentGraph(t), o = {};
    for (const l of s) {
      const h = n.getNodeById(l.origin_id), p = h.getOutputInfo(l.origin_slot);
      o[a = l.target_id] || (o[a] = {});
      let f = o[l.target_id][l.target_slot];
      if (f == null) {
        const v = this.getValidGraphOutputName(p.name);
        f = this.addGraphOutput(v, p.type), o[l.target_id][l.target_slot] = f;
        const [g, d] = i[l.target_id], _ = f.innerNode.getConnectionPos(!0, 0), b = [
          f.innerNode.pos[0] - _[0],
          f.innerNode.pos[1] - _[1]
        ], m = [
          d[0] + b[0],
          d[1] + b[1]
        ];
        f.innerNode.pos = m;
      }
      const c = r[l.target_id];
      h.connect(l.origin_slot, f.innerNode, 0), this.connect(f.outerOutputIndex, c, l.target_slot);
    }
  }
};
let re = ot;
re.default_lgraph_factory = () => new nt();
re.slotLayout = {
  inputs: [],
  outputs: []
};
re.propertyLayout = [
  { name: "enabled", defaultValue: !0 }
];
re.optionalSlots = {
  outputs: [{ name: "enabled", type: "boolean" }]
};
u.registerNodeType({
  class: re,
  title: "Subgraph",
  desc: "Graph inside a node",
  title_color: "#334",
  type: "graph/subgraph"
});
class k {
  static onMenuCollapseAll() {
  }
  static onMenuNodeEdit() {
  }
  // refactor: there are different dialogs, some uses createDialog some dont
  prompt(e = "", s, i, n, r = !1, o = null) {
    var a = this, l = document.createElement("div");
    if (l.is_modified = !1, l.className = "graphdialog rounded", r) {
      let T = 5;
      typeof s != "string" && (s = JSON.stringify(s, null, 2));
      const I = (s.match(/\n/g) || "").length + 1;
      T = fe(I, 5, 10), l.innerHTML = `
<span class='name'></span>
<textarea autofocus rows='${T}' cols='30' class='value'></textarea>
<button class='rounded'>OK</button>
`;
    } else
      l.innerHTML = `
<span class='name'></span>
<input autofocus type='text' class='value'/>
<button class='rounded'>OK</button>`;
    l.close = function() {
      a.prompt_box = null, l.parentNode && l.parentNode.removeChild(l);
    };
    var h = N.active_canvas, p = h.canvas;
    p.parentNode.appendChild(l), this.ds.scale > 1 && (l.style.transform = "scale(" + this.ds.scale + ")");
    var f = null, c = 0;
    u.pointerListenerAdd(l, "leave", function(T) {
      c || u.dialog_close_on_mouse_leave && !l.is_modified && u.dialog_close_on_mouse_leave && T.buttons === 0 && (f = setTimeout(l.close, u.dialog_close_on_mouse_leave_delay));
    }), u.pointerListenerAdd(l, "enter", function(T) {
      u.dialog_close_on_mouse_leave && f && clearTimeout(f);
    });
    var v = l.querySelectorAll("select");
    v && v.forEach(function(T) {
      T.addEventListener("click", function(I) {
        c++;
      }), T.addEventListener("blur", function(I) {
        c = 0;
      }), T.addEventListener("change", function(I) {
        c = -1;
      });
    }), a.prompt_box && a.prompt_box.close(), a.prompt_box = l;
    var g = l.querySelector(".name");
    g.innerText = e;
    let d = l.querySelector(".value");
    d.value = s;
    var _ = d;
    if (_.addEventListener("keydown", function(T) {
      if (l.is_modified = !0, T.keyCode == 27)
        l.close();
      else if (T.keyCode == 13 && T.target instanceof Element && T.target.localName != "textarea")
        i && i(this.value), l.close();
      else
        return;
      T.preventDefault(), T.stopPropagation();
    }), o)
      for (const [T, I] of Object.entries(o))
        _.style[T] = I;
    var b = l.querySelector("button");
    b.addEventListener("click", function(T) {
      i && i(_.value), a.setDirty(!0), l.close();
    });
    var m = p.getBoundingClientRect(), y = -20, E = -20;
    return m && (y -= m.left, E -= m.top), n ? (l.style.left = n.clientX + "px", l.style.top = n.clientY + "px") : (l.style.left = p.width * 0.5 + y + "px", l.style.top = p.height * 0.5 + E + "px"), console.warn(l.style.left, l.style.top), console.warn(n), setTimeout(function() {
      _.focus();
    }, 10), Fe(l), l;
  }
  showSearchBox(e, s = {}) {
    var i = {
      slotFrom: null,
      node_from: null,
      node_to: null,
      do_type_filter: u.search_filter_enabled,
      type_filter_in: null,
      type_filter_out: null,
      show_general_if_none_on_typefilter: !0,
      show_general_after_typefiltered: !0,
      hide_on_mouse_leave: u.search_hide_on_mouse_leave,
      show_all_if_empty: !0,
      show_all_on_open: u.search_show_all_on_open
    };
    s = Object.assign(i, s);
    var n = this, r = N.active_canvas, o = r.canvas, a = o.ownerDocument || document;
    let l = e;
    var h = document.createElement("div");
    h.className = "litegraph litesearchbox graphdialog rounded", h.innerHTML = "<span class='name'>Search</span> <input autofocus type='text' class='value rounded'/>", s.do_type_filter && (h.innerHTML += "<select class='slot_in_type_filter'><option value=''></option></select>", h.innerHTML += "<select class='slot_out_type_filter'><option value=''></option></select>"), h.innerHTML += "<div class='helper'></div>", a.fullscreenElement ? a.fullscreenElement.appendChild(h) : (a.body.appendChild(h), a.body.style.overflow = "hidden");
    let p = null, f = null;
    if (s.do_type_filter && (p = h.querySelector(".slot_in_type_filter"), f = h.querySelector(".slot_out_type_filter")), h.close = function() {
      n.search_box = null, this.blur(), o.focus(), a.body.style.overflow = "", setTimeout(function() {
        n.canvas.focus();
      }, 20), h.parentNode && h.parentNode.removeChild(h);
    }, this.ds.scale > 1 && (h.style.transform = "scale(" + this.ds.scale + ")"), s.hide_on_mouse_leave) {
      var c = 0, v = null;
      u.pointerListenerAdd(h, "enter", function(R) {
        v && (clearTimeout(v), v = null);
      }), u.pointerListenerAdd(h, "leave", function(R) {
        c || (v = setTimeout(function() {
          h.close();
        }, 500));
      }), s.do_type_filter && (p.addEventListener("click", function(R) {
        c++;
      }), p.addEventListener("blur", function(R) {
        c = 0;
      }), p.addEventListener("change", function(R) {
        c = -1;
      }), f.addEventListener("click", function(R) {
        c++;
      }), f.addEventListener("blur", function(R) {
        c = 0;
      }), f.addEventListener("change", function(R) {
        c = -1;
      }));
    }
    n.search_box && n.search_box.close(), n.search_box = h;
    var g = h.querySelector(".helper"), d = null, _ = null, b = null;
    const m = (R) => {
      if (R)
        if (n.onSearchBoxSelection)
          n.onSearchBoxSelection(R, l, r);
        else {
          var P = u.searchbox_extras[R.toLowerCase()];
          P && (R = P.type), r.graph.beforeChange();
          var H = u.createNode(R);
          if (H && (H.pos = r.convertEventToCanvasOffset(
            l
          ), r.graph.add(H)), P && P.data) {
            if (P.data.properties)
              for (var X in P.data.properties)
                H.addProperty("" + X, P.data.properties[X]);
            if (P.data.inputs) {
              H.inputs = [];
              for (var X in P.data.inputs)
                H.addInput(
                  P.data.inputs[X][0],
                  P.data.inputs[X][1]
                );
            }
            if (P.data.outputs) {
              H.outputs = [];
              for (var X in P.data.outputs)
                H.addOutput(
                  P.data.outputs[X][0],
                  P.data.outputs[X][1]
                );
            }
            P.data.title && (H.title = P.data.title), P.data.json && H.configure(P.data.json);
          }
          if (s.node_from) {
            var M = null;
            switch (typeof s.slotFrom) {
              case "string":
                M = s.node_from.findOutputSlotIndexByName(s.slotFrom);
                break;
              case "object":
                s.slotFrom.name ? M = s.node_from.findOutputSlotIndexByName(s.slotFrom.name) : M = -1, M == -1 && typeof s.slotFrom.slot_index < "u" && (M = s.slotFrom.slot_index);
                break;
              case "number":
                M = s.slotFrom;
                break;
              default:
                M = 0;
            }
            M = M, typeof s.node_from.outputs[M] !== void 0 && M !== null && M > -1 && s.node_from.connectByTypeInput(M, H, s.node_from.outputs[M].type);
          }
          if (s.node_to) {
            var M = null;
            switch (typeof s.slotFrom) {
              case "string":
                M = s.node_to.findInputSlotIndexByName(s.slotFrom);
                break;
              case "number":
                M = s.slotFrom;
                break;
              default:
                M = 0;
            }
            typeof s.node_to.inputs[M] !== void 0 && M !== null && M > -1 && s.node_to.connectByTypeOutput(M, H, s.node_to.inputs[M].type);
          }
          r.graph.afterChange();
        }
      h.close();
    }, y = (R) => {
      var P = b;
      b && b.classList.remove("selected"), b ? (b = R ? b.nextSibling : b.previousSibling, b || (b = P)) : b = R ? g.childNodes[0] : g.childNodes[g.childNodes.length], b && (b.classList.add("selected"), b.scrollIntoView({ block: "end", behavior: "smooth" }));
    }, E = (R, P, H, X, M, le = {}) => {
      const te = Object.assign({
        skipFilter: !1,
        inTypeOverride: null,
        outTypeOverride: null
      }, le), ge = u.registered_node_types[R];
      if (ge.hide_in_node_lists || P && ge.filter != P || (!s.show_all_if_empty || H) && R.toLowerCase().indexOf(H) === -1)
        return !1;
      if (s.do_type_filter && !te.skipFilter) {
        const V = R;
        let x = X == null ? void 0 : X.value;
        if (te.inTypeOverride != null && (x = te.inTypeOverride), X && x && u.registered_slot_in_types[x] && u.registered_slot_in_types[x].nodes) {
          var ie = u.registered_slot_in_types[x].nodes.includes(V);
          if (ie === !1)
            return !1;
        }
        if (x = M == null ? void 0 : M.value, te.outTypeOverride != null && (x = te.outTypeOverride), M && x && u.registered_slot_out_types[x] && u.registered_slot_out_types[x].nodes) {
          var ie = u.registered_slot_out_types[x].nodes.includes(V);
          if (ie === !1)
            return !1;
        }
      }
      return !0;
    }, T = () => {
      _ = null;
      var R = I.value;
      if (d = null, g.innerHTML = "", !R && !s.show_all_if_empty)
        return;
      if (n.onSearchBox) {
        var P = n.onSearchBox(g, R, r);
        if (P)
          for (var H = 0; H < P.length; ++H)
            ie(P[H]);
      } else {
        var X = 0;
        R = R.toLowerCase();
        var M = r.filter || r.graph.filter;
        let V, x;
        s.do_type_filter && n.search_box ? (V = n.search_box.querySelector(".slot_in_type_filter"), x = n.search_box.querySelector(".slot_out_type_filter")) : (V = null, x = null);
        for (const Y in u.searchbox_extras) {
          var le = u.searchbox_extras[Y];
          if (!((!s.show_all_if_empty || R) && le.desc.toLowerCase().indexOf(R) === -1)) {
            var Pe = u.registered_node_types[le.type];
            if (!(Pe && Pe.filter != M) && E(le.type, M, R, V, x) && (ie(le.desc, "searchbox_extra"), N.search_limit !== -1 && X++ > N.search_limit))
              break;
          }
        }
        var te = null;
        if (Array.prototype.filter)
          var ge = Object.keys(u.registered_node_types), te = ge.filter((K) => E(K, M, R, V, x));
        else {
          te = [];
          for (const Y in u.registered_node_types)
            E(Y, M, R, V, x) && te.push(Y);
        }
        for (var H = 0; H < te.length && (ie(te[H]), !(N.search_limit !== -1 && X++ > N.search_limit)); H++)
          ;
        if (s.show_general_after_typefiltered && (V != null && V.value || x != null && x.value)) {
          let Y = [];
          for (const K in u.registered_node_types)
            E(K, M, R, V, x, { inTypeOverride: V && V.value ? "*" : null, outTypeOverride: x && x.value ? "*" : null }) && Y.push(K);
          for (let K = 0; K < Y.length && (ie(Y[K], "generic_type"), !(N.search_limit !== -1 && X++ > N.search_limit)); K++)
            ;
        }
        if ((V != null && V.value || x != null && x.value) && (g == null ? void 0 : g.childNodes.length) == 0 && s.show_general_if_none_on_typefilter) {
          let Y = [];
          for (const K in u.registered_node_types)
            E(K, M, R, V, x, { skipFilter: !0 }) && Y.push(K);
          for (let K = 0; K < Y.length && (ie(Y[K], "not_in_filter"), !(N.search_limit !== -1 && X++ > N.search_limit)); K++)
            ;
        }
      }
      function ie(V, x) {
        var Y = document.createElement("div");
        d || (d = V), Y.innerText = V, Y.dataset.type = escape(V), Y.className = "litegraph lite-search-item", x && (Y.className += " " + x), Y.addEventListener("click", function(K) {
          m(unescape(this.dataset.type));
        }), g.appendChild(Y);
      }
    };
    var I = h.querySelector("input");
    if (I && (I.addEventListener("blur", function(R) {
      this.focus();
    }), I.addEventListener("keydown", function(R) {
      if (R.keyCode == 38)
        y(!1);
      else if (R.keyCode == 40)
        y(!0);
      else if (R.keyCode == 27)
        h.close();
      else if (R.keyCode == 13)
        b ? m(b.innerHTML) : d ? m(d) : h.close();
      else {
        _ && clearInterval(_), _ = setTimeout(T, u.search_box_refresh_interval_ms);
        return;
      }
      return R.preventDefault(), R.stopPropagation(), R.stopImmediatePropagation(), !0;
    })), s.do_type_filter) {
      if (p) {
        var S = u.slot_types_in, F = S.length;
        (s.type_filter_in == O.EVENT || s.type_filter_in == O.ACTION) && (s.type_filter_in = "_event_");
        for (var D = 0; D < F; D++) {
          var G = document.createElement("option");
          G.value = S[D], G.innerHTML = S[D], p.appendChild(G), s.type_filter_in !== null && (s.type_filter_in + "").toLowerCase() == (S[D] + "").toLowerCase() && (G.selected = !0);
        }
        p.addEventListener("change", T);
      }
      if (f) {
        var S = u.slot_types_out, F = S.length;
        (s.type_filter_out == O.EVENT || s.type_filter_out == O.ACTION) && (s.type_filter_out = "_event_");
        for (var D = 0; D < F; D++) {
          var G = document.createElement("option");
          G.value = S[D], G.innerHTML = S[D], f.appendChild(G), s.type_filter_out !== null && (s.type_filter_out + "").toLowerCase() == (S[D] + "").toLowerCase() && (G.selected = !0);
        }
        f.addEventListener("change", T);
      }
    }
    var B = o.getBoundingClientRect(), W = (l ? l.clientX : B.left + B.width * 0.5) - 80, pe = (l ? l.clientY : B.top + B.height * 0.5) - 20;
    return h.style.left = W + "px", h.style.top = pe + "px", l.layerY > B.height - 200 && (g.style.maxHeight = B.height - l.layerY - 20 + "px"), I.focus(), s.show_all_on_open && T(), h;
  }
  showShowNodePanel(e) {
    this.closePanels();
    var s = this.getCanvasWindow(), i = this, n = this.createPanel(e.title || "", {
      closable: !0,
      window: s,
      onOpen: function() {
      },
      onClose: function() {
        i.node_panel = null;
      }
    });
    i.node_panel = n, n.id = "node-panel", n.node = e, n.classList.add("settings");
    function r() {
      n.content.innerHTML = "", n.addHTML("<span class='node_type'>" + e.type + "</span><span class='node_desc'>" + (e.constructor.desc || "") + "</span><span class='separator'></span>"), n.addHTML("<h3>Properties</h3>");
      var o = function(f, c) {
        switch (i.graph.beforeChange(e), f) {
          case "Title":
            e.title = c;
            break;
          case "Mode":
            var v = Object.values(oe).indexOf(c);
            v >= Z.ALWAYS && oe[v] ? e.changeMode(v) : console.warn("unexpected mode: " + c);
            break;
          case "Color":
            N.node_colors[c] ? (e.color = N.node_colors[c].color, e.bgcolor = N.node_colors[c].bgcolor) : console.warn("unexpected color: " + c);
            break;
          default:
            e.setProperty(f, c);
            break;
        }
        i.graph.afterChange(), i.dirty_canvas = !0;
      };
      n.addWidget("string", "Title", e.title, {}, o), n.addWidget("combo", "Mode", oe[e.mode], { values: oe }, o);
      var a = "";
      e.color !== void 0 && (a = Object.keys(N.node_colors).filter(function(f) {
        return N.node_colors[f].color == e.color;
      })[0]), n.addWidget("combo", "Color", a, { values: Object.keys(N.node_colors) }, o);
      for (var l in e.properties) {
        var h = e.properties[l], p = e.getPropertyInfo(l);
        p.type, !(e.onAddPropertyToPanel && e.onAddPropertyToPanel(l, n)) && n.addWidget(p.widget || p.type, l, h, p, o);
      }
      n.addSeparator(), e.onShowCustomPanelInfo && e.onShowCustomPanelInfo(n), n.footer.innerHTML = "", n.addButton("Delete", function() {
        e.block_delete || (e.graph.remove(e), n.close());
      }).classList.add("delete");
    }
    n.inner_showCodePad = function(o) {
      n.classList.remove("settings"), n.classList.add("centered"), n.alt_content.innerHTML = "<textarea class='code'></textarea>";
      var a = n.alt_content.querySelector("textarea"), l = function() {
        n.toggleAltContent(!1), n.toggleFooterVisibility(!0), a.parentNode.removeChild(a), n.classList.add("settings"), n.classList.remove("centered"), r();
      };
      a.value = e.properties[o], a.addEventListener("keydown", function(f) {
        f.code == "Enter" && f.ctrlKey && (e.setProperty(o, a.value), l());
      }), n.toggleAltContent(!0), n.toggleFooterVisibility(!1), a.style.height = "calc(100% - 40px)";
      var h = n.addButton("Assign", function() {
        e.setProperty(o, a.value), l();
      });
      n.alt_content.appendChild(h);
      var p = n.addButton("Close", l);
      p.style.float = "right", n.alt_content.appendChild(p);
    }, r(), this.canvas.parentNode.appendChild(n);
  }
  showSubgraphPropertiesDialog(e) {
    console.log("showing subgraph properties dialog");
    var s = this.canvas.parentNode.querySelector(".subgraph_dialog");
    s && s.close();
    var i = this.createPanel("Subgraph Inputs", { closable: !0, width: 500 });
    i.node = e, i.classList.add("subgraph_dialog");
    const n = e;
    var r = n.subgraph;
    if (!r) {
      console.warn("subnode without subgraph!");
      return;
    }
    function o() {
      if (i.clear(), e.inputs)
        for (var d = 0; d < e.inputs.length; ++d) {
          var _ = e.inputs[d];
          if (_.not_subgraph_input)
            continue;
          var b = `
<button class="delete">&#10005;</button>
<button class="move_up">↑</button>
<button class="move_down">↓</button>
<span class='bullet_icon'></span>
<span class='name'></span>
<span class='type'></span>`, m = i.addHTML(b, "subgraph_property");
          m.dataset.name = _.name, m.dataset.slot = "" + d, m.querySelector(".name").innerText = _.name, m.querySelector(".type").innerText = $(_.type), m.querySelector(".delete").addEventListener("click", function(T) {
            const I = this.parentNode.dataset.name;
            n.removeGraphInput(I), o();
          });
          const y = m.querySelector(".move_up");
          y.disabled = d <= 0, y.addEventListener("click", function(T) {
            const I = +this.parentNode.dataset.slot;
            I < 0 || (n.moveInput(I, I - 1), o());
          });
          const E = m.querySelector(".move_down");
          E.disabled = d >= e.inputs.length - 1, E.addEventListener("click", function(T) {
            const I = +this.parentNode.dataset.slot;
            I > e.inputs.length - 1 || (n.moveInput(I, I + 1), o());
          });
        }
    }
    var a = `
+
<span class='label'>Name</span>
<input class='name'/>
<span class='label'>Type</span>
<select class='type'></select>
<button>+</button>`, l = i.addHTML(a, "subgraph_property extra", !0);
    const h = l.querySelector(".name"), p = l.querySelector(".type"), f = l.querySelector("button");
    for (const d of tt()) {
      var c = document.createElement("option");
      c.value = d, c.innerHTML = $(d), p.appendChild(c), d === "*" && (c.selected = !0);
    }
    const v = () => {
      const d = h.value;
      let _ = p.value;
      _ === "-1" ? _ = O.ACTION : _ === "-2" && (_ = O.EVENT), !(!d || e.findInputSlotIndexByName(d) != -1) && (this.addGraphInputNode(e, d, _), h.value = "", p.value = "", o(), h.focus());
    }, g = (d) => {
      d.keyCode == 13 ? (v(), d.preventDefault()) : d.keyCode == 27 && (i.close(), d.preventDefault());
    };
    return f.addEventListener("click", v), h.addEventListener("keydown", g), p.addEventListener("keydown", g), o(), this.canvas.parentNode.appendChild(i), h.focus(), i;
  }
  showSubgraphPropertiesDialogRight(e) {
    var s = this.canvas.parentNode.querySelector(".subgraph_dialog");
    s && s.close();
    var i = this.createPanel("Subgraph Outputs", { closable: !0, width: 500 });
    i.node = e, i.classList.add("subgraph_dialog");
    const n = e;
    if (!n.subgraph) {
      console.warn("subnode without subgraph!");
      return;
    }
    function o() {
      if (i.clear(), e.outputs)
        for (var d = 0; d < e.outputs.length; ++d) {
          var _ = e.outputs[d];
          if (_.not_subgraph_output)
            continue;
          var b = `
<button>&#10005;</button>
<button class="move_up">↑</button>
<button class="move_down">↓</button>
<span class='bullet_icon'></span>
<span class='name'></span>
<span class='type'></span>`, m = i.addHTML(b, "subgraph_property");
          m.dataset.name = _.name, m.dataset.slot = "" + d, m.querySelector(".name").innerText = _.name, m.querySelector(".type").innerText = $(_.type), m.querySelector("button").addEventListener("click", function(T) {
            const I = this.parentNode.dataset.name;
            n.removeGraphOutput(I), o();
          });
          const y = m.querySelector(".move_up");
          y.disabled = d <= 0, y.addEventListener("click", function(T) {
            const I = +this.parentNode.dataset.slot;
            I < 0 || (n.moveOutput(I, I - 1), o());
          });
          const E = m.querySelector(".move_down");
          E.disabled = d >= e.outputs.length - 1, E.addEventListener("click", function(T) {
            const I = +this.parentNode.dataset.slot;
            I > e.outputs.length - 1 || (n.moveOutput(I, I + 1), o());
          });
        }
    }
    var a = `
+
<span class='label'>Name</span>
<input class='name'/>
<span class='label'>Type</span>
<select class='type'></select>
<button>+</button>`, l = i.addHTML(a, "subgraph_property extra", !0);
    const h = l.querySelector(".name"), p = l.querySelector(".type"), f = l.querySelector("button");
    for (const d of st()) {
      var c = document.createElement("option");
      c.value = d, c.innerHTML = $(d), p.appendChild(c), d === "*" && (c.selected = !0);
    }
    const v = () => {
      const d = h.value;
      let _ = p.value;
      _ === "-1" ? _ = O.ACTION : _ === "-2" && (_ = O.EVENT), !(!d || e.findOutputSlotIndexByName(d) != -1) && (this.addGraphOutputNode(e, d, _), h.value = "", p.value = "", o(), h.focus());
    }, g = (d) => {
      d.keyCode == 13 ? (v(), d.preventDefault()) : d.keyCode == 27 && (i.close(), d.preventDefault());
    };
    return f.addEventListener("click", v), h.addEventListener("keydown", g), p.addEventListener("keydown", g), o(), this.canvas.parentNode.appendChild(i), h.focus(), i;
  }
  showConnectionMenu(e = {}) {
    var s = e.nodeFrom && e.slotFrom, i = !s && e.nodeTo && e.slotTo;
    if (!s && !i)
      return console.warn("No data passed to showConnectionMenu"), !1;
    var n = s ? e.nodeFrom : e.nodeTo;
    const r = s ? e.slotFrom : e.slotTo;
    let o;
    var a = null;
    switch (typeof r) {
      case "string":
        a = s ? n.findOutputSlotIndexByName(r) : n.findInputSlotIndexByName(r), o = s ? n.outputs[r] : n.inputs[r];
        break;
      case "object":
        o = r, a = s ? n.findOutputSlotIndexByName(o.name) : n.findInputSlotIndexByName(o.name);
        break;
      case "number":
        a = r, o = s ? n.outputs[a] : n.inputs[a];
        break;
      default:
        return console.error("Can't get slot information", r), !1;
    }
    var l = [{ content: "Add Node" }, J.SEPARATOR];
    n.graph._is_subgraph && (s ? l.push({ content: "Add Subgraph Output" }) : l.push({ content: "Add Subgraph Input" }), l.push(J.SEPARATOR)), this.allow_searchbox && (l.push({ content: "Search" }), l.push(J.SEPARATOR));
    var h = o.type == O.EVENT ? "_event_" : o.type, p = s ? u.slot_types_default_out : u.slot_types_default_in;
    const f = p[h];
    if (console.warn("FROMSL", p, f), p && p[h])
      if (Array.isArray(f))
        for (var c of f) {
          const m = typeof c == "string" ? c : (c == null ? void 0 : c.title) || (c == null ? void 0 : c.node);
          l.push({ content: m, value: c });
        }
      else
        throw new Error(`Invalid default slot specifier, must be an array: ${f}`);
    const v = (m) => {
      const y = n.graph._subgraph_node, E = [m.canvasX, m.canvasY];
      y.addGraphInput(o.name, o.type, E).innerNode.connect(0, n, a);
    }, g = (m) => {
      const y = n.graph._subgraph_node, E = [m.canvasX, m.canvasY], T = y.addGraphOutput(o.name, o.type, E);
      n.connect(a, T.innerNode, 0);
    }, d = (m) => {
      const y = Object.assign(e, {
        position: [e.e.canvasX, e.e.canvasY]
      });
      var E = this.createDefaultNodeForSlot(m, y);
      E ? console.log("node created", m) : console.error("node not in defaults", m);
    }, _ = (m, y, E) => {
      switch (m.content) {
        case "Add Node":
          N.onMenuAdd(m, y, E, b, function(T) {
            s ? e.nodeFrom.connectByTypeInput(a, T, h) : e.nodeTo.connectByTypeOutput(a, T, h);
          });
          break;
        case "Add Subgraph Input":
          v(this.adjustMouseEvent(E));
          break;
        case "Add Subgraph Output":
          g(this.adjustMouseEvent(E));
          break;
        case "Search":
          s ? this.showSearchBox(E, { node_from: e.nodeFrom, slotFrom: o, type_filter_in: h }) : this.showSearchBox(E, { node_to: e.nodeTo, slotFrom: o, type_filter_out: h });
          break;
        default:
          d(m.value);
          break;
      }
    };
    var b = new j(l, {
      event: e.e,
      title: (o && o.name != "" ? o.name + (h ? " | " : "") : "") + (o && h ? h : ""),
      callback: _
    });
    return !1;
  }
  getLinkMenuOptions(e) {
    const s = this.graph.getNodeById(e.origin_id), i = this.graph.getNodeById(e.target_id);
    let n = null;
    s && s.outputs && s.outputs[e.origin_slot] && (n = s.outputs[e.origin_slot].type);
    let r = null;
    i && i.outputs && i.outputs[e.target_slot] && (r = i.inputs[e.target_slot].type);
    const o = (p) => {
      console.debug("node autoconnect"), !(!p.inputs || !p.inputs.length || !p.outputs || !p.outputs.length) && s.connectByTypeInput(e.origin_slot, p, n) && (p.connectByTypeInput(e.target_slot, i, r), p.pos[0] -= p.size[0] * 0.5);
    }, a = (p, f, c, v, g) => {
      N.onMenuAdd(p, f, c, v, o);
    }, l = () => {
      this.graph.removeLink(e.id);
    };
    let h = [
      {
        content: "Add Node",
        has_submenu: !0,
        callback: a
      },
      J.SEPARATOR,
      {
        content: "Delete",
        has_submenu: !0,
        callback: l
      },
      J.SEPARATOR
    ];
    return this.graph.onGetLinkMenuOptions && (h = this.graph.onGetLinkMenuOptions(h, e)), s.getExtraLinkOptions && (h = s.getExtraLinkOptions(this, e, z.OUTPUT, h)), i.getExtraLinkOptions && (h = i.getExtraLinkOptions(this, e, z.INPUT, h)), h;
  }
  showLinkMenu(e, s) {
    const i = this.getLinkMenuOptions(e);
    return new j(i, {
      event: s,
      title: e.data != null ? e.data.constructor.name : null,
      extra: e
    }), !1;
  }
  /*
   * Shows a popup for editing one of the LGraphNode.properties.
   */
  showEditPropertyValue(e, s, i = {}) {
    if (!e || e.properties[s] === void 0 || u.ignore_all_widget_events)
      return;
    var n = e.getPropertyInfo(s), r = n.type, o = "";
    if (r == "string" || r == "number" || r == "array" || r == "object")
      if (n.multiline) {
        let d = e.properties[s], _ = 5;
        if (r !== "string") {
          d = JSON.stringify(d, null, 2);
          const b = (d.match(/\n/g) || "").length + 1;
          _ = fe(b, 5, 10);
        }
        o = "<textarea autofocus type='text' rows='" + _ + "' cols='30' class='value'>" + (d || "") + "</textarea>";
      } else
        o = "<input autofocus type='text' class='value'/>";
    else if ((r == "enum" || r == "combo") && n.values) {
      o = "<select autofocus type='text' class='value'>";
      for (var a in n.values) {
        var l = a;
        n.values instanceof Array && (l = n.values[a]), o += "<option value='" + l + "' " + (l == e.properties[s] ? "selected" : "") + ">" + n.values[a] + "</option>";
      }
      o += "</select>";
    } else if (r == "boolean" || r == "toggle")
      o = "<input autofocus type='checkbox' class='value' " + (e.properties[s] ? "checked" : "") + "/>";
    else {
      console.warn("unknown type: " + r);
      return;
    }
    var h = this.createDialog(
      "<span class='name'>" + (n.label ? n.label : s) + "</span>" + o + "<button>OK</button>",
      i
    ), p = null;
    if ((r == "enum" || r == "combo") && n.values)
      p = h.querySelector("select"), p.addEventListener("change", function(d) {
        h.modified(), v(d.target.value);
      });
    else if (r == "boolean" || r == "toggle")
      p = h.querySelector("input"), p && p.addEventListener("click", function(d) {
        h.modified(), v(!!p.checked);
      });
    else if (n.multiline ? p = h.querySelector("textarea") : p = h.querySelector("input"), p) {
      p.addEventListener("blur", function(_) {
        this.focus();
      });
      let d = e.properties[s] !== void 0 ? e.properties[s] : "";
      if (r !== "string") {
        let _ = null;
        n.multiline && (_ = 2), d = JSON.stringify(d, null, _);
      }
      if (p.value = d, p.addEventListener("keydown", function(_) {
        let b = !1;
        _.keyCode == 27 ? (h.close(), b = !0) : _.keyCode == 13 && !n.multiline ? (c(), b = !0) : _.keyCode != 13 && h.modified(), b && (_.preventDefault(), _.stopPropagation());
      }), n.inputStyle)
        for (const [_, b] of Object.entries(n.inputStyle))
          p.style[_] = b;
    }
    p && p.focus();
    const f = () => {
      i.onclose && i.onclose(), h.close(), e.setDirtyCanvas(!0, !0);
    }, c = () => {
      r != "boolean" && r != "toggle" ? v(p.value) : f();
    }, v = (d) => {
      n && n.values && n.values.constructor === Object && n.values[d] != null && (d = n.values[d]), typeof e.properties[s] == "number" && (d = Number(d)), (r == "array" || r == "object") && (d = JSON.parse(d)), e.setProperty(s, d), f();
    };
    var g = h.querySelector("button");
    return g.addEventListener("click", c), Fe(h), h;
  }
  // TODO refactor, theer are different dialog, some uses createDialog, some dont
  createDialog(e, s = { checkForInput: !1, closeOnLeave: !0, closeOnLeave_checkModified: !0 }) {
    var i = document.createElement("div");
    i.className = "graphdialog", i.innerHTML = e, i.is_modified = !1;
    var n = this.canvas.getBoundingClientRect(), r = -20, o = -20;
    if (n && (r -= n.left, o -= n.top), s.position ? (r = s.position[0], o = s.position[1]) : s.event ? (r = s.event.clientX, o = s.event.clientY) : (r += this.canvas.width * 0.5, o += this.canvas.height * 0.5), i.style.left = r + "px", i.style.top = o + "px", this.canvas.parentNode.appendChild(i), s.checkForInput) {
      var a = i.querySelectorAll("input"), l = !1;
      a && a.forEach(function(c) {
        c.addEventListener("keydown", function(v) {
          if (i.modified(), v.keyCode == 27)
            i.close();
          else if (v.keyCode != 13)
            return;
          v.preventDefault(), v.stopPropagation();
        }), l || c.focus();
      });
    }
    i.modified = function() {
      i.is_modified = !0;
    }, i.close = function() {
      i.parentNode && i.parentNode.removeChild(i);
    };
    var h = null, p = 0;
    i.addEventListener("mouseleave", function(c) {
      p || (s.closeOnLeave || u.dialog_close_on_mouse_leave) && !i.is_modified && u.dialog_close_on_mouse_leave && c.buttons === 0 && (h = setTimeout(i.close, u.dialog_close_on_mouse_leave_delay));
    }), i.addEventListener("mouseenter", function(c) {
      (s.closeOnLeave || u.dialog_close_on_mouse_leave) && h && clearTimeout(h);
    });
    var f = i.querySelectorAll("select");
    return f && f.forEach(function(c) {
      c.addEventListener("click", function(v) {
        p++;
      }), c.addEventListener("blur", function(v) {
        p = 0;
      }), c.addEventListener("change", function(v) {
        p = -1;
      });
    }), i;
  }
  getCanvasMenuOptions() {
    var e = null;
    if (this.getMenuOptions ? e = this.getMenuOptions(this) : (e = [
      {
        content: "Add Node",
        has_submenu: !0,
        callback: N.onMenuAdd
      },
      { content: "Add Group", callback: N.onGroupAdd }
      //{ content: "Arrange", callback: that.graph.arrange },
      //{content:"Collapse All", callback: LGraphCanvas.onMenuCollapseAll }
    ], this._graph_stack && this._graph_stack.length > 0 && e.push(J.SEPARATOR, {
      content: "Close subgraph",
      callback: this.closeSubgraph.bind(this)
    })), this.getExtraMenuOptions) {
      var s = this.getExtraMenuOptions(this, e);
      s && (e = e.concat(s));
    }
    return e;
  }
  getNodeMenuOptions(e) {
    let s = [];
    e.getMenuOptions ? s = e.getMenuOptions(this) : (s = [
      {
        content: "Inputs",
        has_submenu: !0,
        disabled: !0,
        callback: N.showMenuNodeOptionalInputs
      },
      {
        content: "Outputs",
        has_submenu: !0,
        disabled: !0,
        callback: N.showMenuNodeOptionalOutputs
      },
      J.SEPARATOR,
      {
        content: "Properties",
        has_submenu: !0,
        disabled: u.ignore_all_widget_events,
        callback: N.onShowMenuNodeProperties
      },
      J.SEPARATOR,
      {
        content: "Title",
        value: { name: "title", type: "string" },
        callback: N.onShowPropertyEditor
      },
      {
        content: "Mode",
        has_submenu: !0,
        callback: N.onMenuNodeMode
      }
    ], e.resizable !== !1 && s.push({
      content: "Resize",
      callback: N.onMenuResizeNode
    }), s.push(
      {
        content: "Collapse",
        callback: N.onMenuNodeCollapse
      },
      { content: "Pin", callback: N.onMenuNodePin },
      {
        content: "Colors",
        has_submenu: !0,
        callback: N.onMenuNodeColors
      },
      {
        content: "Shapes",
        has_submenu: !0,
        callback: N.onMenuNodeShapes
      },
      J.SEPARATOR
    ));
    const i = e.getOptionalSlots();
    if (i && (i.inputs && i.inputs.length > 0 && typeof s[0] == "object" && (s[0].disabled = !1), i.outputs && i.outputs.length && typeof s[1] == "object" && (s[1].disabled = !1)), e.getExtraMenuOptions) {
      var n = e.getExtraMenuOptions(this, s);
      n && (n.push(J.SEPARATOR), s = n.concat(s));
    }
    e.clonable !== !1 && s.push({
      content: "Clone",
      callback: N.onMenuNodeClone
    }), s.push({
      content: "To Subgraph",
      callback: N.onMenuNodeToSubgraph
    });
    let r = Object.values(this.selected_nodes || {});
    if (r.length || (r = [e]), r = r.filter((o) => !o.is(Q) && !o.is(ee)), s.push({
      content: "To Parent Graph",
      disabled: !e.graph._is_subgraph || r.length === 0,
      callback: N.onMenuNodeToParentGraph
    }), e.graph._is_subgraph) {
      const o = (p) => {
        let f = 0;
        const c = ye(p, (v) => v.id);
        for (const v of p)
          for (const g of v.iterateAllLinks()) {
            if (c[g.origin_id] == null)
              return 0;
            c[g.target_id] == null && (f += 1);
          }
        return f;
      }, a = (p) => {
        let f = 0;
        const c = ye(p, (v) => v.id);
        for (const v of p)
          for (const g of v.iterateAllLinks())
            if (c[g.origin_id] == null)
              f += 1;
            else if (c[g.target_id] == null)
              return 0;
        return f;
      }, l = o(r);
      s.push({
        content: "To Subgraph Input" + (l > 1 ? "s" : ""),
        disabled: l === 0,
        callback: N.onMenuNodeToSubgraphInputs
      });
      const h = a(r);
      s.push({
        content: "To Subgraph Output" + (h > 1 ? "s" : ""),
        disabled: h === 0,
        callback: N.onMenuNodeToSubgraphOutputs
      });
    }
    return s.push(J.SEPARATOR, {
      content: "Remove",
      disabled: !(e.removable !== !1 && !e.block_delete),
      callback: N.onMenuNodeRemove
    }), e.graph && e.graph.onGetNodeMenuOptions && (s = e.graph.onGetNodeMenuOptions(s, e)), s;
  }
  getGroupMenuOptions(e) {
    var s = [
      {
        content: "Title",
        value: { name: "title", type: "string" },
        callback: N.onShowPropertyEditor
      },
      {
        content: "Color",
        has_submenu: !0,
        callback: N.onMenuNodeColors
      },
      {
        content: "Font size",
        value: { name: "fontSize", type: "number" },
        callback: N.onShowPropertyEditor
      },
      J.SEPARATOR,
      { content: "Remove", callback: N.onMenuNodeRemove }
    ];
    return s;
  }
  /** Called when mouse right click */
  processContextMenu(e, s) {
    var i = N.active_canvas, n = i.getCanvasWindow();
    let r = s, o = null, a = null, l = null;
    e != null && (l = e.item, e.type === "node" && (o = e.item), e.type === "link" && (a = e.item));
    let h = null;
    var p = {
      event: r,
      extra: l
    };
    o != null && (p.title = o.type);
    let f = null;
    o != null && (f = o.getSlotInPosition(r.canvasX, r.canvasY), N.active_node = o);
    const c = (b) => {
      const m = b.slot;
      o.graph.beforeChange(), m.input ? o.removeInput(m.slot) : m.output && o.removeOutput(m.slot), o.graph.afterChange();
    }, v = (b) => {
      var m = b.slot;
      o.graph.beforeChange(), m.output ? o.disconnectOutput(m.slot) : m.input && o.disconnectInput(m.slot), o.graph.afterChange();
    }, g = (b) => {
      var m = b.slot, y = m.input ? o.getInputInfo(m.slot) : o.getOutputInfo(m.slot), E = this.createDialog(
        "<span class='name'>Name</span><input autofocus type='text'/><button>OK</button>",
        p
      ), T = E.querySelector("input");
      T && y && (T.value = y.label || "");
      var I = () => {
        o.graph.beforeChange(), T.value && (y && (y.label = T.value), this.setDirty(!0)), E.close(), o.graph.afterChange();
      };
      E.querySelector("button").addEventListener("click", I), T.addEventListener("keydown", function(S) {
        if (E.is_modified = !0, S.keyCode == 27)
          E.close();
        else if (S.keyCode == 13)
          I();
        else if (S.keyCode != 13 && S.target instanceof Element && S.target.localName != "textarea")
          return;
        S.preventDefault(), S.stopPropagation();
      }), T.focus();
    };
    if (f) {
      if (h = [], o.getSlotMenuOptions)
        h = o.getSlotMenuOptions(f);
      else {
        f && f.output && f.output.links && f.output.links.length && h.push({ content: "Disconnect Links", slot: f, callback: v });
        var d = f.input || f.output;
        d.removable && h.push(
          d.locked ? "Cannot remove" : { content: "Remove Slot", slot: f, callback: c }
        ), d.nameLocked || h.push({ content: "Rename Slot", slot: f, callback: g });
      }
      const b = (f.input ? f.input.type : f.output.type) || "*";
      p.title = $(b);
    } else if (o)
      h = this.getNodeMenuOptions(o);
    else if (a)
      h = this.getLinkMenuOptions(a);
    else {
      h = this.getCanvasMenuOptions();
      var _ = this.graph.getGroupOnPos(
        r.canvasX,
        r.canvasY
      );
      _ && h.push(J.SEPARATOR, {
        content: "Edit Group",
        has_submenu: !0,
        submenu: {
          title: "Group",
          extra: _,
          options: this.getGroupMenuOptions(_)
        }
      });
    }
    h && new j(h, p, n);
  }
  createPanel(e, s = {}) {
    var i = s.window || window, n = document.createElement("div");
    if (n.className = "litegraph dialog", n.innerHTML = `
<div class='dialog-header'><span class='dialog-title'></span></div>
<div class='dialog-content'></div>
<div style='display:none;' class='dialog-alt-content'></div>
<div class='dialog-footer'></div>`, n.header = n.querySelector(".dialog-header"), s.width && (n.style.width = s.width + (s.width.constructor === Number ? "px" : "")), s.height && (n.style.height = s.height + (s.height.constructor === Number ? "px" : "")), s.closable) {
      var r = document.createElement("span");
      r.innerHTML = "&#10005;", r.classList.add("close"), r.addEventListener("click", function() {
        n.close();
      }), n.header.appendChild(r);
    }
    return s.onOpen && (n.onOpen = s.onOpen), s.onClose && (n.onClose = s.onClose), n.title_element = n.querySelector(".dialog-title"), n.title_element.innerText = e, n.content = n.querySelector(".dialog-content"), n.alt_content = n.querySelector(".dialog-alt-content"), n.footer = n.querySelector(".dialog-footer"), n.close = function() {
      n.onClose && typeof n.onClose == "function" && n.onClose(), n.parentNode && n.parentNode.removeChild(n), this.parentNode && this.parentNode.removeChild(this);
    }, n.toggleAltContent = function(o = !1) {
      if (typeof o < "u")
        var a = o ? "block" : "none", l = o ? "none" : "block";
      else
        var a = n.alt_content.style.display != "block" ? "block" : "none", l = n.alt_content.style.display != "block" ? "none" : "block";
      n.alt_content.style.display = a, n.content.style.display = l;
    }, n.toggleFooterVisibility = function(o = !1) {
      if (typeof o < "u")
        var a = o ? "block" : "none";
      else
        var a = n.footer.style.display != "block" ? "block" : "none";
      n.footer.style.display = a;
    }, n.clear = function() {
      this.content.innerHTML = "";
    }, n.addHTML = function(o, a, l) {
      var h = document.createElement("div");
      return a && (h.className = a), h.innerHTML = o, l ? n.footer.appendChild(h) : n.content.appendChild(h), h;
    }, n.addButton = function(o, a, l) {
      var h = document.createElement("button");
      return h.innerText = o, h.options = l, h.classList.add("btn"), h.addEventListener("click", a), n.footer.appendChild(h), h;
    }, n.addSeparator = function() {
      var o = document.createElement("div");
      return o.className = "separator", n.content.appendChild(o), o;
    }, n.addWidget = function(o, a, l, h = {}, p) {
      var f = String(l);
      o = o.toLowerCase(), o == "number" && (f = l.toFixed(3));
      var c = document.createElement("div");
      c.className = "property", c.innerHTML = "<span class='property_name'></span><span class='property_value'></span>";
      let v = c.querySelector(".property_name");
      v.innerText = h.label || a;
      var g = c.querySelector(".property_value");
      if (g.innerText = f, c.dataset.property = a, c.dataset.type = h.type || o, c.options = h, c.value = l, o == "code")
        c.addEventListener("click", function(_) {
          n.inner_showCodePad(this.dataset.property);
        });
      else if (o == "boolean")
        c.classList.add("boolean"), l && c.classList.add("bool-on"), c.addEventListener("click", function() {
          var _ = this.dataset.property;
          this.value = !this.value, this.classList.toggle("bool-on");
          const b = this.querySelector(".property_value");
          b.innerText = this.value ? "true" : "false", d(_, this.value);
        });
      else if (o == "string" || o == "number")
        g.setAttribute("contenteditable", "true"), g.addEventListener("keydown", function(_) {
          _.code == "Enter" && (o != "string" || !_.shiftKey) && (_.preventDefault(), this.blur());
        }), g.addEventListener("blur", function() {
          let _ = this.innerText;
          const b = this.parentNode;
          var m = b.dataset.property, y = b.dataset.type;
          y == "number" && (_ = Number(_)), d(m, _);
        });
      else if ((o == "enum" || o == "combo") && "values" in h) {
        var f = N.getPropertyPrintableValue(l, h.values);
        g.innerText = f, g.addEventListener("click", function(b) {
          let m = h.values || [];
          typeof m == "function" && (console.error("Values by callback not supported in panel.addWidget!", m), m = []);
          var E = this.parentNode.dataset.property, T = this;
          let I = Array.from(m).map((F) => ({ content: F }));
          new j(I, {
            event: b,
            className: "dark",
            callback: S
          }, i);
          function S(F, D, G) {
            return T.innerText = F.content, d(E, F.content), !1;
          }
        });
      }
      n.content.appendChild(c);
      function d(_, b) {
        h.callback && h.callback(_, b, h), p && p(_, b, h);
      }
      return c;
    }, n.onOpen && typeof n.onOpen == "function" && n.onOpen(), n;
  }
  checkPanels() {
    if (this.canvas)
      for (var e = this.canvas.parentNode.querySelectorAll(".litegraph.dialog"), s = 0; s < e.length; ++s) {
        var i = e[s];
        if (i.node && (i.node.graph || i.close(), i.node.graph != this.graph)) {
          if (i.node.is(re) && this.graph._is_subgraph && this.graph === i.node.subgraph)
            continue;
          i.close();
        }
      }
  }
  closePanels() {
    var e = document.querySelector("#node-panel");
    e && e.close();
    var e = document.querySelector("#option-panel");
    e && e.close();
  }
}
k.onShowPropertyEditor = function(t, e, s, i, n) {
  var r = t.value, o = r.name, a = n[o], l = document.createElement("div");
  l.is_modified = !1, l.className = "graphdialog", l.innerHTML = "<span class='name'></span><input autofocus type='text' class='value'/><button>OK</button>", l.close = function() {
    l.parentNode && l.parentNode.removeChild(l);
  };
  var h = l.querySelector(".name");
  h.innerText = o;
  var p = l.querySelector(".value");
  if (p && (p.value = a, p.addEventListener("blur", function(E) {
    this.focus();
  }), p.addEventListener("keydown", function(E) {
    if (l.is_modified = !0, E.keyCode == 27)
      l.close();
    else if (E.keyCode == 13)
      _();
    else if (E.keyCode != 13 && E.target instanceof Element && E.target.localName != "textarea")
      return;
    E.preventDefault(), E.stopPropagation();
  }), r.inputStyle))
    for (const [E, T] of Object.entries(r.inputStyle))
      p.style[E] = T;
  var f = N.active_canvas, c = f.canvas, v = c.getBoundingClientRect(), g = -20, d = -20;
  v && (g -= v.left, d -= v.top), s ? (l.style.left = s.clientX + g + "px", l.style.top = s.clientY + d + "px") : (l.style.left = c.width * 0.5 + g + "px", l.style.top = c.height * 0.5 + d + "px");
  const _ = () => {
    p && b(p.value);
  }, b = (E) => {
    r.type == "number" ? E = Number(E) : r.type == "boolean" && (E = !!E);
    const T = n[o];
    n[o] = E, n.onJSPropertyChanged && n.onJSPropertyChanged(o, E, T) === !1 && (n[o] = T), l.parentNode && l.parentNode.removeChild(l), n.setDirtyCanvas(!0, !0);
  };
  var m = l.querySelector("button");
  m.addEventListener("click", _), c.parentNode.appendChild(l), p && p.focus();
  var y = null;
  l.addEventListener("mouseleave", function(E) {
    u.dialog_close_on_mouse_leave && !l.is_modified && u.dialog_close_on_mouse_leave && E.buttons === 0 && (y = setTimeout(l.close, u.dialog_close_on_mouse_leave_delay));
  }), l.addEventListener("mouseenter", function(E) {
    u.dialog_close_on_mouse_leave && y && clearTimeout(y);
  }), Fe(l);
};
k.onGroupAdd = function(t, e, s, i) {
  var n = N.active_canvas;
  n.getCanvasWindow();
  var r = new me();
  r.pos = n.convertEventToCanvasOffset(s), n.graph.addGroup(r);
};
k.onMenuAdd = function(t, e, s, i, n) {
  var r = N.active_canvas, o = r.getCanvasWindow(), a = r.graph;
  if (!a)
    return;
  function l(h, p) {
    var f = u.getNodeTypesCategories(r.filter || a.filter).filter(function(g) {
      return g.startsWith(h);
    }), c = [];
    f.map(function(g) {
      if (g) {
        var d = new RegExp("^(" + h + ")"), _ = g.replace(d, "").split("/")[0], b = h === "" ? _ + "/" : h + _ + "/", m = _;
        m.indexOf("::") != -1 && (m = m.split("::")[1]);
        var y = c.findIndex(function(E) {
          return E.value === b;
        });
        y === -1 && c.push(
          {
            value: b,
            content: m,
            has_submenu: !0,
            callback: function(E, T, I, S) {
              l(E.value, S);
            }
          }
        );
      }
    });
    var v = u.getNodeTypesInCategory(h.slice(0, -1), r.filter || a.filter);
    v.map(function(g) {
      if (!g.hide_in_node_lists) {
        var d = {
          value: g.class,
          content: g.title,
          has_submenu: !1,
          callback: function(_, b, m, y) {
            var E = y.getFirstEvent();
            r.graph.beforeChange();
            var T = u.createNode(_.value);
            T && (T.pos = r.convertEventToCanvasOffset(E), r.graph.add(T)), n && n(T), r.graph.afterChange();
          }
        };
        c.push(d);
      }
    }), new j(c, { event: s, parentMenu: p }, o);
  }
  return l("", i), !1;
};
k.showMenuNodeOptionalInputs = function(t, e, s, i, n) {
  if (!n)
    return;
  var r = this, o = N.active_canvas, a = o.getCanvasWindow();
  let l = n.getOptionalSlots().inputs, h = [];
  if (l)
    for (let v = 0; v < l.length; v++) {
      let g = l[v];
      if (!g) {
        h.push(J.SEPARATOR);
        continue;
      }
      let { name: d, type: _, options: b } = g;
      b || (b = {}), b.label && (d = b.label), b.removable = !0;
      var p = { content: d, value: g };
      _ == O.ACTION && (p.className = "event"), h.push(p);
    }
  if (n.onMenuNodeInputs) {
    var f = n.onMenuNodeInputs(h);
    f && (h = f);
  }
  if (!h.length) {
    console.log("no input entries");
    return;
  }
  new j(
    h,
    {
      event: s,
      callback: c,
      parentMenu: i,
      node: n
    },
    a
  );
  function c(v, g, d, _) {
    if (n && (v.callback && v.callback.call(r, n, v, d, _), v.value)) {
      let b = v.value;
      n.graph.beforeChange(), n.addInput(b.name, b.type, b.options), n.onNodeOptionalInputAdd && n.onNodeOptionalInputAdd(v.value), n.setDirtyCanvas(!0, !0), n.graph.afterChange();
    }
  }
  return !1;
};
k.showMenuNodeOptionalOutputs = function(t, e, s, i, n) {
  if (!n)
    return;
  var r = this, o = N.active_canvas, a = o.getCanvasWindow(), l = n.getOptionalSlots().outputs, h = [];
  if (l)
    for (var p = 0; p < l.length; p++) {
      var f = l[p];
      if (!f) {
        h.push(J.SEPARATOR);
        continue;
      }
      let { name: d, type: _, options: b } = f;
      if (!(n.flags && n.flags.skip_repeated_outputs && n.findOutputSlotIndexByName(f[0]) != -1)) {
        b || (b = {}), b.label && (d = b.label), b.removable = !0;
        var c = { content: d, value: [d, _, b] };
        _ == O.EVENT && (c.className = "event"), h.push(c);
      }
    }
  if (this.onMenuNodeOutputs && (h = this.onMenuNodeOutputs(h)), u.do_add_triggers_slots && n.findOutputSlotIndexByName("onExecuted") == -1 && h.push({ content: "On Executed", value: ["onExecuted", O.EVENT, { nameLocked: !0 }], className: "event" }), n.onMenuNodeOutputs) {
    var v = n.onMenuNodeOutputs(h);
    v && (h = v);
  }
  if (!h.length)
    return;
  let g = function(d, _, b, m) {
    if (n && (d.callback && d.callback.call(r, n, d, b, m), !!d.value)) {
      var y = d.value[1];
      if (y && (y.constructor === Object || y.constructor === Array)) {
        var E = [];
        for (var T in y)
          E.push({ content: T, value: y[T] });
        return new j(E, {
          event: b,
          callback: g,
          parentMenu: i,
          node: n
        }), !1;
      } else {
        const I = d.value;
        n.graph.beforeChange(), n.addOutput(I.name, I.type, I.options), n.onNodeOptionalOutputAdd && n.onNodeOptionalOutputAdd(d.value), n.setDirtyCanvas(!0, !0), n.graph.afterChange();
      }
    }
  };
  return new j(
    h,
    {
      event: s,
      callback: g,
      parentMenu: i,
      node: n
    },
    a
  ), !1;
};
k.onMenuResizeNode = function(t, e, s, i, n) {
  if (n) {
    var r = function(l) {
      l.size = l.computeSize(), l.onResize && l.onResize(l.size);
    }, o = N.active_canvas;
    if (!o.selected_nodes || Object.keys(o.selected_nodes).length <= 1)
      r(n);
    else
      for (var a in o.selected_nodes)
        r(o.selected_nodes[a]);
    n.setDirtyCanvas(!0, !0);
  }
};
k.onShowMenuNodeProperties = function(t, e, s, i, n) {
  if (!n || !n.properties)
    return;
  var r = N.active_canvas, o = r.getCanvasWindow(), a = [];
  for (var l in n.properties) {
    var h = n.properties[l] !== void 0 ? n.properties[l] : " ";
    typeof h == "object" && (h = JSON.stringify(h));
    var p = n.getPropertyInfo(l);
    (p.type == "enum" || p.type == "combo") && (h = N.getPropertyPrintableValue(h, p.values)), h = N.decodeHTML(h), a.push({
      content: "<span class='property_name'>" + (p.label ? p.label : l) + "</span><span class='property_value'>" + h + "</span>",
      value: l
    });
  }
  if (!a.length)
    return;
  new j(
    a,
    {
      event: s,
      callback: f,
      parentMenu: i,
      allow_html: !0,
      node: n
    },
    o
  );
  function f(c, v, g, d) {
    if (n) {
      var _ = this.getBoundingClientRect();
      r.showEditPropertyValue(n, c.value, {
        position: [_.left, _.top]
      });
    }
  }
  return !1;
};
k.onResizeNode = function(t, e, s, i, n) {
  n && (n.size = n.computeSize(), n.setDirtyCanvas(!0, !0));
};
k.onMenuNodeCollapse = function(t, e, s, i, n) {
  n.graph.beforeChange(
    /*?*/
  );
  var r = function(l) {
    l.collapse();
  }, o = N.active_canvas;
  if (!o.selected_nodes || Object.keys(o.selected_nodes).length <= 1)
    r(n);
  else
    for (var a in o.selected_nodes)
      r(o.selected_nodes[a]);
  n.graph.afterChange(
    /*?*/
  );
};
k.onMenuNodePin = function(t, e, s, i, n) {
  n.pin();
};
k.onMenuNodeMode = function(t, e, s, i, n) {
  let r = Array.from(oe).map((a) => ({ content: a }));
  new j(
    r,
    { event: s, callback: o, parentMenu: i, node: n }
  );
  function o(a) {
    if (n) {
      var l = Object.values(oe).indexOf(a.content), h = function(c) {
        l >= Z.ALWAYS && oe[l] ? c.changeMode(l) : (console.warn("unexpected mode: " + a), c.changeMode(Z.ALWAYS));
      }, p = N.active_canvas;
      if (!p.selected_nodes || Object.keys(p.selected_nodes).length <= 1)
        h(n);
      else
        for (var f in p.selected_nodes)
          h(p.selected_nodes[f]);
    }
  }
  return !1;
};
k.onMenuNodeColors = function(t, e, s, i, n) {
  if (!n)
    throw "no node for color";
  var r = [];
  r.push({
    value: null,
    content: "<span style='display: block; padding-left: 4px;'>No color</span>"
  });
  for (let l in N.node_colors) {
    var o = N.node_colors[l];
    let h = {
      value: l,
      content: "<span style='display: block; color: #999; padding-left: 4px; border-left: 8px solid " + o.color + "; background-color:" + o.bgcolor + "'>" + l + "</span>"
    };
    r.push(h);
  }
  new j(r, {
    event: s,
    callback: a,
    parentMenu: i,
    node: n,
    allow_html: !0
  });
  function a(l) {
    if (n) {
      var h = l.value ? N.node_colors[l.value] : null, p = function(v) {
        h ? v instanceof me ? v.color = h.groupcolor : (v.color = h.color, v.bgcolor = h.bgcolor) : (delete v.color, v instanceof C && delete v.bgcolor);
      }, f = N.active_canvas;
      if (!f.selected_nodes || Object.keys(f.selected_nodes).length <= 1)
        p(n);
      else
        for (var c in f.selected_nodes)
          p(f.selected_nodes[c]);
      n.setDirtyCanvas(!0, !0);
    }
  }
  return !1;
};
k.onMenuNodeShapes = function(t, e, s, i, n) {
  if (!n)
    throw "no node passed";
  const r = Array.from(Je).map((a) => ({ content: a }));
  new j(r, {
    event: s,
    callback: o,
    parentMenu: i,
    node: n
  });
  function o(a) {
    if (n) {
      n.graph.beforeChange(
        /*?*/
      );
      var l = function(f) {
        f.shape = Je.indexOf(a.content);
      }, h = N.active_canvas;
      if (!h.selected_nodes || Object.keys(h.selected_nodes).length <= 1)
        l(n);
      else
        for (var p in h.selected_nodes)
          l(h.selected_nodes[p]);
      n.graph.afterChange(
        /*?*/
      ), n.setDirtyCanvas(!0);
    }
  }
  return !1;
};
k.onMenuNodeRemove = function(t, e, s, i, n) {
  if (!n)
    throw "no node passed";
  var r = n.graph;
  r.beforeChange();
  var o = function(h) {
    h.removable !== !1 && r.remove(h);
  }, a = N.active_canvas;
  if (!a.selected_nodes || Object.keys(a.selected_nodes).length <= 1)
    o(n);
  else
    for (var l in a.selected_nodes)
      o(a.selected_nodes[l]);
  r.afterChange(), n.setDirtyCanvas(!0, !0);
};
k.onMenuNodeToSubgraph = function(t, e, s, i, n) {
  var r = n.graph, o = N.active_canvas;
  if (o) {
    var a = Object.values(o.selected_nodes || {});
    a.length || (a = [n]);
    var l = u.createNode("graph/subgraph", null, { constructorArgs: [null] });
    l.pos = n.pos.concat(), r.add(l), l.buildFromNodes(a), o.deselectAllNodes(), n.setDirtyCanvas(!0, !0);
  }
};
k.onMenuNodeToSubgraphInputs = function(t, e, s, i, n) {
  var r = N.active_canvas;
  if (!r)
    return;
  const o = n.graph._subgraph_node;
  if (!n.graph._is_subgraph || !o) {
    console.error("[To Subgraph Inputs] Current graph is not a subgraph!", n.graph);
    return;
  }
  let a = Object.values(r.selected_nodes || {});
  a.length || (a = [n]), o.convertNodesToSubgraphInputs(a), r.deselectAllNodes(), n.setDirtyCanvas(!0, !0);
};
k.onMenuNodeToSubgraphOutputs = function(t, e, s, i, n) {
  var r = N.active_canvas;
  if (!r)
    return;
  const o = n.graph._subgraph_node;
  if (!n.graph._is_subgraph || !o) {
    console.error("[To Subgraph Outputs] Current graph is not a subgraph!", n.graph);
    return;
  }
  let a = Object.values(r.selected_nodes || {});
  a.length || (a = [n]), o.convertNodesToSubgraphOutputs(a), r.deselectAllNodes(), n.setDirtyCanvas(!0, !0);
};
k.onMenuNodeToParentGraph = function(t, e, s, i, n) {
  var r = N.active_canvas;
  if (!r)
    return;
  const o = n.graph._subgraph_node;
  if (!n.graph._is_subgraph || !o) {
    console.error("[To Parent Graph] Current graph is not a subgraph!", n.graph);
    return;
  }
  let a = Object.values(r.selected_nodes || {});
  a.length || (a = [n]), o.moveNodesToParentGraph(a), r.deselectAllNodes(), n.setDirtyCanvas(!0, !0);
};
k.onMenuNodeClone = function(t, e, s, i, n) {
  var r = N.active_canvas;
  (!r.selected_nodes || Object.keys(r.selected_nodes).length <= 1) && r.selectNode(n), r.cloneSelection();
};
const ce = class {
  constructor(t, e, s = {}) {
    this.link_type_colors = {}, this.node_panel = null, this.options_panel = null, this.render_time = 0, this.allow_dragcanvas = !0, this.allow_dragnodes = !0, this.allow_interaction = !0, this.allow_reconnect_links = !0, this.allow_searchbox = !0, this.always_render_background = !1, this.background_image = ce.DEFAULT_BACKGROUND_IMAGE, this.block_click = !1, this.clear_background = !0, this.clear_background_color = "#222", this.connecting_pos = null, this.connecting_slot = null, this.connecting_input = null, this.connecting_output = null, this.connections_width = 3, this.current_node = null, this.drag_mode = !1, this.dragging_rectangle = null, this.ds = new Ht(), this.editor_alpha = 1, this.filter = null, this.highquality_render = !0, this.skip_events = !1, this.last_mouse_position = [0, 0], this.last_click_position = [0, 0], this.last_click_position_offset = [0, 0], this.last_mouse_dragging = !1, this.links_render_mode = de.SPLINE_LINK, this.live_mode = !1, this.mouse = [0, 0], this.offset_mouse = [0, 0], this.graph_mouse = [0, 0], this.node_widget = null, this.maxZoom = null, this.minZoom = null, this.multi_select = !1, this.over_link_center = null, this.pause_rendering = !1, this.read_only = !1, this.render_canvas_border = !0, this.render_collapsed_slots = !0, this.render_connection_arrows = !1, this.render_connections_border = !0, this.render_connections_shadows = !1, this.render_connections = !0, this.render_curved_connections = !1, this.render_execution_order = !1, this.render_link_tooltip = !0, this.render_only_selected = !0, this.render_shadows = !0, this.render_title_colored = !0, this.render_subgraph_panels = !0, this.render_subgraph_stack_header = !0, this.round_radius = 8, this.set_canvas_dirty_on_mouse_event = !0, this.show_info = !0, this.use_gradients = !1, this.visible_links = [], this.zoom_modify_alpha = !0, this.pointer_is_down = !1, this.pointer_is_double = !1, this._highlight_input = null, this._highlight_input_slot = null, this._highlight_output = null, this._graph_stack = [], this._bg_img = null, this._pattern = null, this._pattern_img = null, this.search_box = null, this.prompt_box = null, this._events_binded = !1, this.resizing_node = null, typeof t == "string" && (t = document.querySelector(t)), this.skip_events = s.skip_events || !1, this.title_text_font = "" + u.NODE_TEXT_SIZE + "px Arial", this.inner_text_font = "normal " + u.NODE_SUBTEXT_SIZE + "px Arial", this.node_title_color = u.NODE_TITLE_COLOR, this.default_link_color = u.LINK_COLOR, this.link_type_colors = u.cloneObject(ce.DEFAULT_LINK_TYPE_COLORS), this.canvas_mouse = this.graph_mouse, this.visible_area = this.ds.visible_area, this.viewport = s.viewport || null, e && e.attachCanvas(this), this.setCanvas(t, s.skip_events), this.clear(), s.skip_render || this.startRendering(), this.autoresize = s.autoresize;
  }
  static getFileExtension(t) {
    var e = t.indexOf("?");
    e != -1 && (t = t.substr(0, e));
    var s = t.lastIndexOf(".");
    return s == -1 ? "" : t.substr(s + 1).toLowerCase();
  }
  static decodeHTML(t) {
    var e = document.createElement("div");
    return e.innerText = t, e.innerHTML;
  }
  static getPropertyPrintableValue(t, e) {
    if (!e || e.constructor === Array)
      return String(t);
    if (e.constructor === Object) {
      var s = "";
      for (var i in e)
        if (e[i] == t) {
          s = i;
          break;
        }
      return String(t) + " (" + s + ")";
    }
  }
  get scale() {
    return this.ds.scale;
  }
  set scale(t) {
    this.ds.scale = t;
  }
  /** clears all the data inside */
  clear() {
    this.frame = 0, this.last_draw_time = 0, this.render_time = 0, this.fps = 0, this.dragging_rectangle = null, this.selected_nodes = {}, this.selected_group = null, this.visible_nodes = [], this.node_dragged = null, this.node_over = null, this.node_capturing_input = null, this.connecting_node = null, this.highlighted_links = {}, this.dragging_canvas = !1, this.dirty_canvas = !0, this.dirty_bgcanvas = !0, this.dirty_area = null, this.node_in_panel = null, this.node_widget = null, this.last_mouse = [0, 0], this.last_mouseclick = 0, this.pointer_is_down = !1, this.pointer_is_double = !1, this.onClear && this.onClear();
  }
  /** assigns a graph, you can reassign graphs to the same canvas */
  setGraph(t, e = !1) {
    if (this.graph != t) {
      if (e || this.clear(), !t && this.graph) {
        this.graph.detachCanvas(this);
        return;
      }
      t.attachCanvas(this), this._graph_stack && (this._graph_stack = null), this.setDirty(!0, !0);
    }
  }
  /** opens a graph contained inside a node in the current graph */
  openSubgraph(t) {
    if (!t)
      throw "graph cannot be null";
    if (this.graph == t)
      throw "graph cannot be the same";
    if (this.clear(), this.graph) {
      this._graph_stack || (this._graph_stack = []);
      const s = [this.ds.offset[0], this.ds.offset[1]];
      this._graph_stack.push({ graph: this.graph, offset: s, scale: this.ds.scale });
    }
    u.debug && (console.warn("SubGraph opened", t), console.warn("Graph inputs", t.inputs), console.warn("Graph outputs", t.outputs)), t.attachCanvas(this);
    const e = [0, 0];
    if (t._nodes.length > 0) {
      let s = Number.MAX_SAFE_INTEGER, i = 0, n = Number.MAX_SAFE_INTEGER, r = 0;
      for (const o of t.iterateNodesInOrder())
        s = Math.min(o.pos[0], s), i = Math.max(o.pos[0] + o.size[0], i), n = Math.min(o.pos[1], n), r = Math.max(o.pos[1] + o.size[1], r);
      e[0] = -(s + (i - s) / 2) + this.canvas.width / 2, e[1] = -(n + (r - n) / 2) + this.canvas.height / 2;
    }
    this.ds.offset = e, this.ds.scale = 1, this.checkPanels(), this.setDirty(!0, !0);
  }
  closeAllSubgraphs() {
    for (; this._graph_stack && this._graph_stack.length > 0; )
      this.closeSubgraph();
  }
  /** closes a subgraph contained inside a node */
  closeSubgraph() {
    if (!(!this._graph_stack || this._graph_stack.length == 0)) {
      var t = this.graph._subgraph_node, { graph: e, offset: s, scale: i } = this._graph_stack.pop();
      this.selected_nodes = {}, this.highlighted_links = {}, e.attachCanvas(this), this.setDirty(!0, !0), t && (this.centerOnNode(t), this.selectNodes([t])), this.ds.offset = s, this.ds.scale = i;
    }
  }
  /** assigns a canvas */
  setCanvas(t, e = !1) {
    if (t && typeof t == "string" && (t = document.getElementById(t), !t))
      throw "Error creating LiteGraph canvas: Canvas not found";
    if (t = t, t !== this.canvas && (!t && this.canvas && (e || this.unbindEvents()), this.canvas = t, this.ds.element = t, !!t)) {
      if (t.className += " lgraphcanvas", t.data = this, t.tabIndex = 1, this.bgcanvas = null, this.bgcanvas || (this.bgcanvas = document.createElement("canvas"), this.bgcanvas.width = this.canvas.width, this.bgcanvas.height = this.canvas.height), t.getContext == null)
        throw t.localName != "canvas" ? "Element supplied for LGraphCanvas must be a <canvas> element, you passed a " + t.localName : "This browser doesn't support Canvas";
      e || this.bindEvents(), this.adjustCanvasForHiDPI();
    }
  }
  //used in some events to capture them
  _doNothing(t) {
    return t.preventDefault(), !1;
  }
  _doReturnTrue(t) {
    return t.preventDefault(), !0;
  }
  /** binds mouse, keyboard, touch and drag events to the canvas */
  bindEvents() {
    if (this._events_binded) {
      console.warn("LGraphCanvas: events already binded");
      return;
    }
    var t = this.canvas, e = this.getCanvasWindow(), s = e.document;
    this._mousedown_callback = this.processMouseDown.bind(this), this._mousewheel_callback = this.processMouseWheel.bind(this), this._mousemove_callback = this.processMouseMove.bind(this), this._mouseup_callback = this.processMouseUp.bind(this), u.pointerListenerAdd(t, "down", this._mousedown_callback, !0), t.addEventListener("mousewheel", this._mousewheel_callback, !1), u.pointerListenerAdd(t, "up", this._mouseup_callback, !0), u.pointerListenerAdd(t, "move", this._mousemove_callback), t.addEventListener("contextmenu", this._doNothing), t.addEventListener(
      "DOMMouseScroll",
      this._mousewheel_callback,
      !1
    ), this._key_callback = this.processKey.bind(this), t.addEventListener("keydown", this._key_callback, !0), s.addEventListener("keyup", this._key_callback, !0), this._ondrop_callback = this.processDrop.bind(this), t.addEventListener("dragover", this._doNothing, !1), t.addEventListener("dragend", this._doNothing, !1), t.addEventListener("drop", this._ondrop_callback, !1), t.addEventListener("dragenter", this._doReturnTrue, !1), this._events_binded = !0;
  }
  /** unbinds mouse events from the canvas */
  unbindEvents() {
    if (!this._events_binded) {
      console.warn("LGraphCanvas: no events binded");
      return;
    }
    u.debug && console.log("pointerevents: unbindEvents");
    var t = this.getCanvasWindow(), e = t.document;
    u.pointerListenerRemove(this.canvas, "move", this._mousedown_callback), u.pointerListenerRemove(this.canvas, "up", this._mousedown_callback), u.pointerListenerRemove(this.canvas, "down", this._mousedown_callback), this.canvas.removeEventListener(
      "mousewheel",
      this._mousewheel_callback
    ), this.canvas.removeEventListener(
      "DOMMouseScroll",
      this._mousewheel_callback
    ), this.canvas.removeEventListener("keydown", this._key_callback), e.removeEventListener("keyup", this._key_callback), this.canvas.removeEventListener("contextmenu", this._doNothing), this.canvas.removeEventListener("drop", this._ondrop_callback), this.canvas.removeEventListener("dragenter", this._doReturnTrue), this._mousedown_callback = null, this._mousewheel_callback = null, this._key_callback = null, this._ondrop_callback = null, this._events_binded = !1;
  }
  /**
   * this function allows to render the canvas using WebGL instead of Canvas2D
   * this is useful if you plant to render 3D objects inside your nodes, it uses litegl.js for webgl and canvas2DtoWebGL to emulate the Canvas2D calls in webGL
   **/
  enableWebGL() {
  }
  /**
   * marks as dirty the canvas, this way it will be rendered again
   * @param fg if the foreground canvas is dirty (the one containing the nodes)
   * @param bg if the background canvas is dirty (the one containing the wires)
   */
  setDirty(t = !1, e = !1) {
    t && (this.dirty_canvas = !0), e && (this.dirty_bgcanvas = !0);
  }
  /**
   * Used to attach the canvas in a popup
   * @return the window where the canvas is attached (the DOM root node)
   */
  getCanvasWindow() {
    if (!this.canvas)
      return window;
    var t = this.canvas.ownerDocument;
    return t.defaultView;
  }
  adjustCanvasForHiDPI(t) {
    if (t || (t = window.devicePixelRatio), t == 1 || !this.canvas.parentNode)
      return;
    const e = this.canvas.parentNode.getBoundingClientRect(), { width: s, height: i } = e;
    this.canvas.width = s * t, this.canvas.height = i * t, this.canvas.style.width = s + "px", this.canvas.style.height = i + "px", this.canvas.getContext("2d").scale(t, t);
  }
  /** starts rendering the content of the canvas when needed */
  startRendering() {
    if (this.is_rendering)
      return;
    this.is_rendering = !0, t.call(this);
    function t() {
      this.pause_rendering || this.draw();
      var e = this.getCanvasWindow();
      this.is_rendering && e.requestAnimationFrame(t.bind(this));
    }
  }
  /** stops rendering the content of the canvas (to save resources) */
  stopRendering() {
    this.is_rendering = !1;
  }
  //used to block future mouse events (because of im gui)
  blockClick() {
    this.block_click = !0, this.last_mouseclick = 0;
  }
  createDefaultNodeForSlot(t, e = {}) {
    var s = this, i = e.nodeFrom && e.slotFrom !== null, n = !i && e.nodeTo && e.slotTo !== null;
    if (e = { ...{
      position: [0, 0],
      posAdd: [0, 0],
      posSizeFix: [0, 0]
    }, ...e }, !i && !n)
      return console.warn("No data passed to createDefaultNodeForSlot " + e.nodeFrom + " " + e.slotFrom + " " + e.nodeTo + " " + e.slotTo), !1;
    if (!t)
      return console.warn("No type to createDefaultNodeForSlot"), !1;
    var o = i ? e.nodeFrom : e.nodeTo, a = i ? e.slotFrom : e.slotTo, l = null;
    switch (typeof a) {
      case "string":
        l = i ? o.findOutputSlotIndexByName(a) : o.findInputSlotIndexByName(a), a = i ? o.outputs[a] : o.inputs[a];
        break;
      case "object":
        l = i ? o.findOutputSlotIndexByName(a.name) : o.findInputSlotIndexByName(a.name);
        break;
      case "number":
        l = a, a = i ? o.outputs[a] : o.inputs[a];
        break;
      case "undefined":
      default:
        return console.warn("Cant get slot information " + a), !1;
    }
    a = a, (!a || !l) && console.warn("createDefaultNodeForSlot bad slotX " + a + " " + l);
    var h = a.type == O.EVENT ? "_event_" : a.type, p = i ? u.slot_types_default_out : u.slot_types_default_in;
    const f = p[h];
    if (p && f) {
      a.link !== null || a.links && a.links.length > 0;
      let _ = null;
      if (Array.isArray(f)) {
        for (var c in f)
          if (t == p[h][c] || t == "AUTO") {
            _ = p[h][c], u.debug && console.log("opts.nodeType == slotTypesDefault[fromSlotType][typeX] :: " + t);
            break;
          }
      } else
        throw new Error(`Invalid default slot specifier, must be an array: ${f}`);
      if (_) {
        var v = null;
        typeof _ == "object" && _.node && (v = _, _ = _.node);
        var g = u.createNode(_);
        if (g) {
          if (v) {
            if (v.properties)
              for (var d in v.properties)
                g.addProperty(d, v.properties[d]);
            if (v.inputs) {
              g.inputs = [];
              for (var d in v.inputs)
                g.addOutput(
                  v.inputs[d][0],
                  v.inputs[d][1]
                );
            }
            if (v.outputs) {
              g.outputs = [];
              for (var d in v.outputs)
                g.addOutput(
                  v.outputs[d][0],
                  v.outputs[d][1]
                );
            }
            v.title && (g.title = v.title), v.json && g.configure(v.json);
          }
          console.warn("PLACING", g.type, e);
          const b = e.position[0] + e.posAdd[0] + (e.posSizeFix[0] ? e.posSizeFix[0] * g.size[0] : 0), m = e.position[1] + e.posAdd[1] + (e.posSizeFix[1] ? e.posSizeFix[1] * g.size[1] : 0), y = [b, m];
          return s.graph.add(g, { pos: y }), i ? e.nodeFrom.connectByTypeInput(l, g, h) : e.nodeTo.connectByTypeOutput(l, g, h), i && n && console.debug("connecting in between"), !0;
        } else
          console.log("failed creating " + _);
      }
    }
    return !1;
  }
  /** returns true if a position (in graph space) is on top of a node little corner box */
  isOverNodeBox(t, e, s) {
    var i = u.NODE_TITLE_HEIGHT;
    return !!u.isInsideRectangle(
      e,
      s,
      t.pos[0] + 2,
      t.pos[1] + 2 - i,
      i - 4,
      i - 4
    );
  }
  /** returns slot index if a position (in graph space) is on top of a node input slot */
  isOverNodeInput(t, e, s, i) {
    if (t.inputs)
      for (var n = 0, r = t.inputs.length; n < r; ++n) {
        var o = t.getConnectionPos(!0, n), a = !1;
        if (t.horizontal ? a = u.isInsideRectangle(
          e,
          s,
          o[0] - 5,
          o[1] - 10,
          10,
          20
        ) : a = u.isInsideRectangle(
          e,
          s,
          o[0] - 10,
          o[1] - 5,
          40,
          10
        ), a)
          return i && (i[0] = o[0], i[1] = o[1]), n;
      }
    return -1;
  }
  /**
   * returns the INDEX if a position (in graph space) is on top of a node output slot
   * @method isOverNodeOuput
   **/
  isOverNodeOutput(t, e, s, i) {
    if (t.outputs)
      for (var n = 0, r = t.outputs.length; n < r; ++n) {
        t.outputs[n];
        var o = t.getConnectionPos(!1, n), a = !1;
        if (t.horizontal ? a = u.isInsideRectangle(
          e,
          s,
          o[0] - 5,
          o[1] - 10,
          10,
          20
        ) : a = u.isInsideRectangle(
          e,
          s,
          o[0] - 10,
          o[1] - 5,
          40,
          10
        ), a)
          return i && (i[0] = o[0], i[1] = o[1]), n;
      }
    return -1;
  }
  findLinkCenterAtPos(t, e) {
    for (let s = 0; s < this.visible_links.length; ++s) {
      const i = this.visible_links[s];
      if (this.graph && this.graph.links[i.id] == null)
        continue;
      const n = i._pos;
      if (!(!n || t < n[0] - 4 || t > n[0] + 4 || e < n[1] - 4 || e > n[1] + 4))
        return i;
    }
    return null;
  }
  /** process a key event */
  processKey(t) {
    if (!this.graph)
      return;
    var e = !1;
    if (u.debug && console.log("processKey", t), t.target instanceof Element && t.target.localName == "input")
      return;
    const s = this.allow_interaction && !this.read_only;
    if (t.type == "keydown") {
      if (t.keyCode == 32 && !(t.metaKey || t.ctrlKey || t.shiftKey) && (this.dragging_canvas = !0, e = !0), t.keyCode == 27 && !(t.metaKey || t.ctrlKey || t.shiftKey) && (this.node_panel && this.node_panel.close(), this.options_panel && this.options_panel.close(), e = !0), s && (t.keyCode == 65 && t.ctrlKey && (this.selectNodes(), e = !0), t.code == "KeyX" && (t.metaKey || t.ctrlKey) && !t.shiftKey && this.selected_nodes && (this.cutToClipboard(), e = !0), t.code == "KeyC" && (t.metaKey || t.ctrlKey) && !t.shiftKey && this.selected_nodes && (this.copyToClipboard(), e = !0), t.code == "KeyV" && (t.metaKey || t.ctrlKey) && !t.shiftKey && this.pasteFromClipboard(), t.code == "KeyD" && (t.metaKey || t.ctrlKey) && !t.shiftKey && (this.cloneSelection(), e = !0), (t.keyCode == 46 || t.keyCode == 8) && t.target instanceof Element && t.target.localName != "input" && t.target.localName != "textarea" && (this.deleteSelectedNodes(), e = !0), this.selected_nodes))
        for (var i in this.selected_nodes)
          this.selected_nodes[i].onKeyDown && this.selected_nodes[i].onKeyDown(t);
    } else if (t.type == "keyup" && (t.keyCode == 32 && (this.dragging_canvas = !1), s && this.selected_nodes))
      for (var i in this.selected_nodes)
        this.selected_nodes[i].onKeyUp && this.selected_nodes[i].onKeyUp(t);
    if (this.graph.change(), e)
      return t.preventDefault(), t.stopImmediatePropagation(), !1;
  }
  cutToClipboard() {
    this.copyToClipboard(), this.deleteSelectedNodes();
  }
  copyToClipboard() {
    var t = {
      nodes: [],
      nodeCloneData: {},
      links: []
    }, e = 0, s = [];
    for (var i in this.selected_nodes) {
      var n = this.selected_nodes[i];
      n._relative_id = e, s.push(n), e += 1;
    }
    for (let h = 0; h < s.length; ++h) {
      let p = s[h];
      if (!p.clonable)
        continue;
      const f = { forNode: {} };
      let c = p.clone(f);
      if (!c) {
        console.warn("node type not found: " + p.type);
        continue;
      }
      if (t.nodes.push(c.serialize()), t.nodeCloneData[c.id] = {
        prevNodeID: p.id,
        cloneData: f
      }, p.inputs && p.inputs.length)
        for (var r = 0; r < p.inputs.length; ++r) {
          var o = p.inputs[r];
          if (!(!o || o.link == null)) {
            var a = this.graph.links[o.link];
            if (a) {
              var l = this.graph.getNodeById(
                a.origin_id
              );
              !l || !this.selected_nodes[l.id] || !this.selected_nodes[l.id].clonable || t.links.push([
                l._relative_id,
                a.origin_slot,
                //j,
                p._relative_id,
                a.target_slot
              ]);
            }
          }
        }
    }
    localStorage.setItem(
      "litegrapheditor_clipboard",
      JSON.stringify(t)
    );
  }
  pasteFromClipboard() {
    var t = localStorage.getItem("litegrapheditor_clipboard");
    if (t) {
      this.graph.beforeChange();
      for (var e = JSON.parse(t), s = null, i = null, n = 0; n < e.nodes.length; ++n)
        s ? (s[0] > e.nodes[n].pos[0] && (s[0] = e.nodes[n].pos[0], i[0] = n), s[1] > e.nodes[n].pos[1] && (s[1] = e.nodes[n].pos[1], i[1] = n)) : (s = [e.nodes[n].pos[0], e.nodes[n].pos[1]], i = [n, n]);
      for (var r = [], n = 0; n < e.nodes.length; ++n) {
        var o = e.nodes[n], a = u.createNode(o.type);
        if (a) {
          a.configure(o), a.pos[0] += this.graph_mouse[0] - s[0], a.pos[1] += this.graph_mouse[1] - s[1];
          const { cloneData: c, prevNodeID: v } = e.nodeCloneData[a.id];
          this.graph.add(a, { doProcessChange: !1, addedBy: "paste", prevNodeID: v, cloneData: c }), r.push(a);
        }
      }
      for (var n = 0; n < e.links.length; ++n) {
        var l = e.links[n], h = r[l[0]], p = r[l[2]];
        h && p ? h.connect(l[1], p, l[3]) : console.warn("Warning, nodes missing on pasting");
      }
      this.selectNodes(r), this.graph.afterChange();
    }
  }
  cloneSelection() {
    if (!this.selected_nodes || Object.keys(this.selected_nodes).length === 0)
      return;
    this.graph.beforeChange();
    const t = {}, e = [], s = {};
    for (const r of Object.values(this.selected_nodes))
      for (const o of r.iterateAllLinks())
        this.selected_nodes[o.origin_id] && this.selected_nodes[o.target_id] && e.push(o);
    const i = function(r) {
      if (r.clonable == !1)
        return;
      const o = r.id, a = { forNode: {} }, l = r.clone(a);
      l && (s[o] = l, l.pos = [r.pos[0] + 5, r.pos[1] + 5], r.graph.add(l, { addedBy: "cloneSelection", prevNodeID: o, prevNode: r, cloneData: a }), t[l.id] = l);
    };
    for (var n in this.selected_nodes)
      i(this.selected_nodes[n]);
    for (const r of e) {
      const o = s[r.origin_id], a = s[r.target_id];
      o && a && o.connect(r.origin_slot, a, r.target_slot);
    }
    Object.keys(t).length && this.selectNodes(Object.values(t)), this.graph.afterChange(), this.setDirty(!0, !0);
  }
  processDrop(t) {
    let e = t;
    e.preventDefault(), this.adjustMouseEvent(e);
    var s = e.clientX, i = e.clientY, n = !this.viewport || this.viewport && s >= this.viewport[0] && s < this.viewport[0] + this.viewport[2] && i >= this.viewport[1] && i < this.viewport[1] + this.viewport[3];
    if (n) {
      var r = [e.canvasX, e.canvasY], o = this.graph ? this.graph.getNodeOnPos(r[0], r[1]) : null;
      if (!o) {
        var a = null;
        this.onDropItem && (a = this.onDropItem(e)), a || this.checkDropItem(e);
        return;
      }
      if (o.onDropFile || o.onDropData) {
        var l = e.dataTransfer.files;
        if (l && l.length)
          for (var h = 0; h < l.length; h++) {
            var p = e.dataTransfer.files[0], f = p.name;
            if (ce.getFileExtension(f), o.onDropFile && o.onDropFile(p), o.onDropData) {
              var c = new FileReader();
              c.onload = function(g) {
                var d = g.target.result;
                o.onDropData(d, f, p);
              };
              var v = p.type.split("/")[0];
              v == "text" || v == "" ? c.readAsText(p) : v == "image" ? c.readAsDataURL(p) : c.readAsArrayBuffer(p);
            }
          }
      }
      return !!(o.onDropItem && o.onDropItem(e) || this.onDropItem && this.onDropItem(e));
    }
  }
  checkDropItem(t) {
    let e = t;
    if (e.dataTransfer.files.length) {
      var s = e.dataTransfer.files[0], i = ce.getFileExtension(s.name).toLowerCase(), n = u.node_types_by_file_extension[i];
      if (n) {
        this.graph.beforeChange();
        var r = u.createNode(n.type);
        r.pos = [e.canvasX, e.canvasY], this.graph.add(r), r.onDropFile && r.onDropFile(s), this.graph.afterChange();
      }
    }
  }
  processNodeDblClicked(t) {
    t.no_panel_on_double_click || (this.onShowNodePanel ? this.onShowNodePanel(t) : this.showShowNodePanel(t)), this.onNodeDblClicked && this.onNodeDblClicked(t), this.setDirty(!0);
  }
  processNodeSelected(t, e) {
    this.selectNode(t, e && (e.shiftKey || e.ctrlKey || this.multi_select)), this.onNodeSelected && this.onNodeSelected(t);
  }
  /** selects a given node (or adds it to the current selection) */
  selectNode(t, e = !1) {
    t == null ? this.deselectAllNodes() : this.selectNodes([t], e);
  }
  /** selects several nodes (or adds them to the current selection) */
  selectNodes(t, e = !1) {
    e || this.deselectAllNodes(), t = t || this.graph._nodes, typeof t == "string" && (t = [t]);
    for (var s in t) {
      var i = t[s];
      if (i.is_selected) {
        this.deselectNode(i);
        continue;
      }
      if (!i.is_selected && i.onSelected && i.onSelected(), i.is_selected = !0, this.selected_nodes[i.id] = i, i.inputs)
        for (var n = 0; n < i.inputs.length; ++n)
          this.highlighted_links[i.inputs[n].link] = !0;
      if (i.outputs)
        for (var n = 0; n < i.outputs.length; ++n) {
          var r = i.outputs[n];
          if (r.links)
            for (var o = 0; o < r.links.length; ++o)
              this.highlighted_links[r.links[o]] = !0;
        }
    }
    this.onSelectionChange && this.onSelectionChange(this.selected_nodes), this.setDirty(!0);
  }
  /** removes a node from the current selection */
  deselectNode(t) {
    if (t.is_selected) {
      if (t.onDeselected && t.onDeselected(), t.is_selected = !1, this.onNodeDeselected && this.onNodeDeselected(t), t.inputs)
        for (var e = 0; e < t.inputs.length; ++e)
          delete this.highlighted_links[t.inputs[e].link];
      if (t.outputs)
        for (var e = 0; e < t.outputs.length; ++e) {
          var s = t.outputs[e];
          if (s.links)
            for (var i = 0; i < s.links.length; ++i)
              delete this.highlighted_links[s.links[i]];
        }
    }
  }
  /** removes all nodes from the current selection */
  deselectAllNodes() {
    if (this.graph) {
      for (var t = this.graph._nodes, e = 0, s = t.length; e < s; ++e) {
        var i = t[e];
        i.is_selected && (i.onDeselected && i.onDeselected(), i.is_selected = !1, this.onNodeDeselected && this.onNodeDeselected(i));
      }
      this.selected_nodes = {}, this.current_node = null, this.highlighted_links = {}, this.onSelectionChange && this.onSelectionChange(this.selected_nodes), this.setDirty(!0);
    }
  }
  /** deletes all nodes in the current selection from the graph */
  deleteSelectedNodes() {
    this.graph.beforeChange();
    for (var t in this.selected_nodes) {
      var e = this.selected_nodes[t];
      if (!e.block_delete) {
        if (e.inputs && e.inputs.length && e.outputs && e.outputs.length && u.isValidConnection(e.inputs[0].type, e.outputs[0].type) && e.inputs[0].link && e.outputs[0].links && e.outputs[0].links.length) {
          var s = e.graph.links[e.inputs[0].link], i = e.graph.links[e.outputs[0].links[0]], n = e.getInputNode(0), r = e.getOutputNodes(0)[0];
          n && r && n.connect(s.origin_slot, r, i.target_slot);
        }
        this.graph.remove(e), this.onNodeDeselected && this.onNodeDeselected(e);
      }
    }
    this.selected_nodes = {}, this.current_node = null, this.highlighted_links = {}, this.setDirty(!0), this.graph.afterChange();
  }
  /** centers the camera on a given node */
  centerOnNode(t) {
    this.ds.offset[0] = -t.pos[0] - t.size[0] * 0.5 + this.canvas.width * 0.5 / this.ds.scale, this.ds.offset[1] = -t.pos[1] - t.size[1] * 0.5 + this.canvas.height * 0.5 / this.ds.scale, this.setDirty(!0, !0);
  }
  /**
   * adds some useful properties to a mouse event, like the position in graph coordinates
   * @method adjustMouseEvent
   **/
  adjustMouseEvent(t) {
    let e = t;
    var s = 0, i = 0;
    if (this.canvas) {
      var n = this.canvas.getBoundingClientRect();
      s = e.clientX - n.left, i = e.clientY - n.top;
    } else
      s = e.clientX, i = e.clientY;
    return this.last_mouse_position[0] = s, this.last_mouse_position[1] = i, e.canvasX = s / this.ds.scale - this.ds.offset[0], e.canvasY = i / this.ds.scale - this.ds.offset[1], e;
  }
  /** process an event on widgets */
  processNodeWidgets(t, e, s, i) {
    if (!t.widgets || !t.widgets.length || u.ignore_all_widget_events)
      return null;
    for (var n = e[0] - t.pos[0], r = e[1] - t.pos[1], o = t.size[0], a = this, l = this.getCanvasWindow(), h = 0; h < t.widgets.length; ++h) {
      var p = t.widgets[h];
      if (!(!p || p.disabled)) {
        var f = p.computeSize ? p.computeSize(o)[1] : u.NODE_WIDGET_HEIGHT, c = p.width || o;
        if (!(p != i && (n < 6 || n > c - 12 || r < p.last_y || r > p.last_y + f || p.last_y === void 0))) {
          var v = p.value;
          switch (p.type) {
            case "button":
              s.type === u.pointerevents_method + "down" && (p.callback && setTimeout(function() {
                p.callback(p, a, t, e, s);
              }, 20), p.clicked = !0, this.dirty_canvas = !0);
              break;
            case "slider":
              p.options.max - p.options.min;
              var g = fe((n - 15) / (c - 30), 0, 1);
              p.value = p.options.min + (p.options.max - p.options.min) * g, p.callback && setTimeout(function() {
                E(p, p.value);
              }, 20), this.dirty_canvas = !0;
              break;
            case "number":
            case "combo":
              var v = p.value;
              if (s.type == u.pointerevents_method + "move" && p.type == "number")
                s.deltaX && (p.value += s.deltaX * (p.options.step || 0.1)), p.options.min != null && p.value < p.options.min && (p.value = p.options.min), p.options.max != null && p.value > p.options.max && (p.value = p.options.max);
              else if (s.type == u.pointerevents_method + "down") {
                var d = p.options.values;
                if (d && typeof d == "function") {
                  let I = p.options.values;
                  d = I(p, t);
                }
                var _ = null;
                p.type != "number" && (_ = Array.isArray(d) ? d : Object.keys(d));
                var b = n < 40 ? -1 : n > c - 40 ? 1 : 0;
                if (p.type == "number")
                  p.value += b * (p.options.step || 0.1), p.options.min != null && p.value < p.options.min && (p.value = p.options.min), p.options.max != null && p.value > p.options.max && (p.value = p.options.max);
                else if (b) {
                  var m = -1;
                  this.last_mouseclick = 0, d.constructor === Object ? m = _.indexOf(String(p.value)) + b : m = _.indexOf(p.value) + b, m >= _.length && (m = _.length - 1), m < 0 && (m = 0), Array.isArray(d) ? p.value = d[m] : p.value = m;
                } else {
                  let I = function(F, D, G) {
                    let B = F.content;
                    return d != _ && (B = y.indexOf(B)), this.value = B, E(this, B), a.dirty_canvas = !0, !1;
                  };
                  var y = d != _ ? Object.values(d) : d;
                  let S = Array.from(y).map((F) => ({ content: F }));
                  new j(
                    S,
                    {
                      scale: Math.max(1, this.ds.scale),
                      event: s,
                      className: "dark",
                      callback: I.bind(p)
                    },
                    l
                  );
                }
              } else if (s.type == u.pointerevents_method + "up" && p.type == "number") {
                var b = n < 40 ? -1 : n > c - 40 ? 1 : 0;
                s.click_time < 200 && b == 0 && this.prompt(
                  "Value",
                  p.value,
                  function(S) {
                    this.value = Number(S), E(this, this.value);
                  }.bind(p),
                  s
                );
              }
              v != p.value && setTimeout(
                function() {
                  E(this, this.value);
                }.bind(p),
                20
              ), this.dirty_canvas = !0;
              break;
            case "toggle":
              s.type == u.pointerevents_method + "down" && (p.value = !p.value, setTimeout(function() {
                E(p, p.value);
              }, 20));
              break;
            case "string":
            case "text":
              s.type == u.pointerevents_method + "down" && this.prompt(
                "Value",
                p.value,
                function(I) {
                  this.value = I, E(this, I);
                }.bind(p),
                s,
                p.options ? p.options.multiline : !1,
                p.options.inputStyle
              );
              break;
            default:
              p.mouse && (this.dirty_canvas = p.mouse(s, [n, r], t));
              break;
          }
          return v != p.value && (t.onWidgetChanged && t.onWidgetChanged(p, v), t.graph._version++), p;
        }
      }
    }
    function E(T, I) {
      T.value = I, T.options && T.options.property && t.properties[T.options.property] !== void 0 && t.setProperty(T.options.property, I), T.callback && T.callback(T.value, a, t, e, s);
    }
    return null;
  }
  adjustNodesSize() {
    for (var t = this.graph._nodes, e = 0; e < t.length; ++e)
      t[e].size = t[e].computeSize();
    this.setDirty(!0, !0);
  }
  /** resizes the canvas to a given size, if no size is passed, then it tries to fill the parentNode */
  resize(t, e) {
    if (!t && !e) {
      var s = this.canvas.parentNode;
      t = s.offsetWidth, e = s.offsetHeight;
    }
    this.canvas.width == t && this.canvas.height == e || (this.canvas.width = t, this.canvas.height = e, this.bgcanvas.width = this.canvas.width, this.bgcanvas.height = this.canvas.height, this.adjustCanvasForHiDPI(), this.setDirty(!0, !0));
  }
  isAreaClicked(t, e, s, i, n) {
    var r = this.offset_mouse;
    u.isInsideRectangle(r[0], r[1], t, e, s, i), r = this.last_click_position;
    var o = r && u.isInsideRectangle(r[0], r[1], t, e, s, i), a = o && !this.block_click;
    return o && n && this.blockClick(), a;
  }
  /**
   * switches to live mode (node shapes are not rendered, only the content)
   * this feature was designed when graphs where meant to create user interfaces
   **/
  switchLiveMode(t) {
    if (!t) {
      this.live_mode = !this.live_mode, this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
      return;
    }
    var e = this, s = this.live_mode ? 1.1 : 0.9;
    this.live_mode && (this.live_mode = !1, this.editor_alpha = 0.1);
    var i = setInterval(function() {
      e.editor_alpha *= s, e.dirty_canvas = !0, e.dirty_bgcanvas = !0, s < 1 && e.editor_alpha < 0.01 && (clearInterval(i), s < 1 && (e.live_mode = !0)), s > 1 && e.editor_alpha > 0.99 && (clearInterval(i), e.editor_alpha = 1);
    }, 1);
  }
  onNodeSelectionChange() {
  }
  touchHandler(t) {
  }
  convertOffsetToCanvas(t) {
    return this.ds.convertOffsetToCanvas(t);
  }
  convertCanvasToOffset(t, e = [0, 0]) {
    return this.ds.convertCanvasToOffset(t, e);
  }
  /** converts event coordinates from canvas2D to graph coordinates */
  convertEventToCanvasOffset(t) {
    var e = this.canvas.getBoundingClientRect();
    return this.convertCanvasToOffset([
      t.clientX - e.left,
      t.clientY - e.top
    ]);
  }
  addGraphInputNode(t, e, s) {
    const i = this.graph.findNodesByClass(Q).find((o) => o.properties.name === e);
    if (i) {
      this.selectNodes([i]);
      return;
    }
    (!s || s === "") && (s = "*");
    const n = [
      this.canvas.width * 0.25 / this.ds.scale - this.ds.offset[0],
      this.canvas.height * 0.5 / this.ds.scale - this.ds.offset[1]
    ];
    this.graph.beforeChange();
    const r = t.addGraphInput(e, s, n);
    if (r) {
      const o = r.innerNode;
      this.selectNodes([o]), this.graph.afterChange();
    } else
      console.error("graph input node not found:", s);
  }
  addGraphOutputNode(t, e, s) {
    const i = this.graph.findNodesByClass(ee).find((o) => o.properties.name === e);
    if (i) {
      this.selectNodes([i]);
      return;
    }
    (!s || s === "") && (s = "*");
    const n = [
      this.canvas.width * 0.75 / this.ds.scale - this.ds.offset[0],
      this.canvas.height * 0.5 / this.ds.scale - this.ds.offset[1]
    ];
    this.graph.beforeChange();
    const r = t.addGraphOutput(e, s, n);
    if (r) {
      const o = r.innerNode;
      this.selectNodes([o]), this.graph.afterChange();
    } else
      console.error("graph output node not found:", s);
  }
  getCanvasMenuOptions() {
    return k.prototype.getCanvasMenuOptions.apply(this, arguments);
  }
  getNodeMenuOptions(t) {
    return k.prototype.getNodeMenuOptions.apply(this, arguments);
  }
  getLinkMenuOptions(t) {
    return k.prototype.getLinkMenuOptions.apply(this, arguments);
  }
  getGroupMenuOptions(t) {
    return k.prototype.getGroupMenuOptions.apply(this, arguments);
  }
  checkPanels() {
    k.prototype.checkPanels.apply(this, arguments);
  }
  closePanels() {
    k.prototype.closePanels.apply(this, arguments);
  }
  createDialog(t, e) {
    return k.prototype.createDialog.apply(this, arguments);
  }
  createPanel(t, e = {}) {
    return k.prototype.createPanel.apply(this, arguments);
  }
  showSearchBox(t, e = {}) {
    return k.prototype.showSearchBox.apply(this, arguments);
  }
  prompt(t = "", e, s, i, n = !1, r = null) {
    return k.prototype.prompt.apply(this, arguments);
  }
  showConnectionMenu(t = {}) {
    return k.prototype.showConnectionMenu.apply(this, arguments);
  }
  showLinkMenu(t, e) {
    return k.prototype.showLinkMenu.apply(this, arguments);
  }
  showEditPropertyValue(t, e, s) {
    return k.prototype.showEditPropertyValue.apply(this, arguments);
  }
  showShowNodePanel(t) {
    k.prototype.showShowNodePanel.apply(this, arguments);
  }
  showSubgraphPropertiesDialog(t) {
    return k.prototype.showSubgraphPropertiesDialog.apply(this, arguments);
  }
  showSubgraphPropertiesDialogRight(t) {
    return k.prototype.showSubgraphPropertiesDialogRight.apply(this, arguments);
  }
  processContextMenu(t, e) {
    k.prototype.processContextMenu.apply(this, arguments);
  }
  /*
   * Events
   */
  processMouseMove(t) {
    return _e.prototype.processMouseMove.apply(this, arguments);
  }
  processMouseDown(t) {
    return _e.prototype.processMouseDown.apply(this, arguments);
  }
  processMouseUp(t) {
    return _e.prototype.processMouseUp.apply(this, arguments);
  }
  processMouseWheel(t) {
    return _e.prototype.processMouseWheel.apply(this, arguments);
  }
  /*
   * Rendering
   */
  setZoom(t, e) {
    U.prototype.setZoom.apply(this, arguments);
  }
  bringToFront(t) {
    U.prototype.bringToFront.apply(this, arguments);
  }
  sendToBack(t) {
    U.prototype.sendToBack.apply(this, arguments);
  }
  computeVisibleNodes(t, e = []) {
    return U.prototype.computeVisibleNodes.apply(this, arguments);
  }
  draw(t = !1, e = !1) {
    U.prototype.draw.apply(this, arguments);
  }
  drawFrontCanvas() {
    U.prototype.drawFrontCanvas.apply(this, arguments);
  }
  drawSubgraphPanel(t) {
    U.prototype.drawSubgraphPanel.apply(this, arguments);
  }
  drawSubgraphPanelLeft(t, e, s) {
    U.prototype.drawSubgraphPanelLeft.apply(this, arguments);
  }
  drawSubgraphPanelRight(t, e, s) {
    U.prototype.drawSubgraphPanelRight.apply(this, arguments);
  }
  drawButton(t, e, s, i, n, r = u.NODE_DEFAULT_COLOR, o = "#555", a = u.NODE_TEXT_COLOR, l = !0) {
    return U.prototype.drawButton.apply(this, arguments);
  }
  drawBackCanvas() {
    U.prototype.drawBackCanvas.apply(this, arguments);
  }
  renderInfo(t, e = 10, s) {
    U.prototype.renderInfo.apply(this, arguments);
  }
  drawNode(t, e) {
    U.prototype.drawNode.apply(this, arguments);
  }
  drawLinkTooltip(t, e) {
    U.prototype.drawLinkTooltip.apply(this, arguments);
  }
  drawNodeShape(t, e, s, i, n, r, o) {
    U.prototype.drawNodeShape.apply(this, arguments);
  }
  drawConnections(t) {
    U.prototype.drawConnections.apply(this, arguments);
  }
  renderLink(t, e, s, i, n, r, o, a, l, h) {
    U.prototype.renderLink.apply(this, arguments);
  }
  computeConnectionPoint(t, e, s, i = L.RIGHT, n = L.LEFT) {
    return U.prototype.computeConnectionPoint.apply(this, arguments);
  }
  drawExecutionOrder(t) {
    U.prototype.drawExecutionOrder.apply(this, arguments);
  }
  drawNodeWidgets(t, e, s, i) {
    U.prototype.drawNodeWidgets.apply(this, arguments);
  }
  drawGroups(t, e) {
    U.prototype.drawGroups.apply(this, arguments);
  }
  /*
   * ComfyUI Extension
   */
  updateBackground(t, e) {
    this._bg_img = new Image(), this._bg_img.name = t, this._bg_img.src = t, this._bg_img.onload = () => {
      this.draw(!0, !0);
    }, this.background_image = t, this.clear_background = !0, this.clear_background_color = e, this._pattern = null;
  }
};
let N = ce;
N.DEFAULT_BACKGROUND_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQBJREFUeNrs1rEKwjAUhlETUkj3vP9rdmr1Ysammk2w5wdxuLgcMHyptfawuZX4pJSWZTnfnu/lnIe/jNNxHHGNn//HNbbv+4dr6V+11uF527arU7+u63qfa/bnmh8sWLBgwYJlqRf8MEptXPBXJXa37BSl3ixYsGDBMliwFLyCV/DeLIMFCxYsWLBMwSt4Be/NggXLYMGCBUvBK3iNruC9WbBgwYJlsGApeAWv4L1ZBgsWLFiwYJmCV/AK3psFC5bBggULloJX8BpdwXuzYMGCBctgwVLwCl7Be7MMFixYsGDBsu8FH1FaSmExVfAxBa/gvVmwYMGCZbBg/W4vAQYA5tRF9QYlv/QAAAAASUVORK5CYII=";
N.node_colors = {
  red: { color: "#322", bgcolor: "#533", groupcolor: "#A88" },
  brown: { color: "#332922", bgcolor: "#593930", groupcolor: "#b06634" },
  green: { color: "#232", bgcolor: "#353", groupcolor: "#8A8" },
  blue: { color: "#223", bgcolor: "#335", groupcolor: "#88A" },
  pale_blue: { color: "#2a363b", bgcolor: "#3f5159", groupcolor: "#3f789e" },
  cyan: { color: "#233", bgcolor: "#355", groupcolor: "#8AA" },
  purple: { color: "#323", bgcolor: "#535", groupcolor: "#a1309b" },
  yellow: { color: "#432", bgcolor: "#653", groupcolor: "#b58b2a" },
  black: { color: "#222", bgcolor: "#000", groupcolor: "#444" }
};
N.DEFAULT_LINK_TYPE_COLORS = {
  [O.ACTION]: u.ACTION_LINK_COLOR,
  [O.EVENT]: u.EVENT_LINK_COLOR,
  number: "#AAA",
  node: "#DCA"
};
N.DEFAULT_CONNECTION_COLORS = {
  input_off: "#778",
  input_on: "#7F7",
  //"#BBD"
  output_off: "#778",
  output_on: "#7F7"
  //"#BBD"
};
N.DEFAULT_CONNECTION_COLORS_BY_TYPE = {
  number: "#7F7",
  string: "#77F",
  boolean: "#F77"
};
N.DEFAULT_CONNECTION_COLORS_BY_TYPE_OFF = {
  number: "#474",
  string: "#447",
  boolean: "#744"
};
N.active_canvas = null;
N.active_node = null;
N.onMenuCollapseAll = k.onMenuCollapseAll;
N.onMenuNodeEdit = k.onMenuNodeEdit;
N.onShowPropertyEditor = k.onShowPropertyEditor;
N.onGroupAdd = k.onGroupAdd;
N.onMenuAdd = k.onMenuAdd;
N.showMenuNodeOptionalInputs = k.showMenuNodeOptionalInputs;
N.showMenuNodeOptionalOutputs = k.showMenuNodeOptionalOutputs;
N.onShowMenuNodeProperties = k.onShowMenuNodeProperties;
N.onResizeNode = k.onResizeNode;
N.onMenuResizeNode = k.onMenuResizeNode;
N.onMenuNodeCollapse = k.onMenuNodeCollapse;
N.onMenuNodePin = k.onMenuNodePin;
N.onMenuNodeMode = k.onMenuNodeMode;
N.onMenuNodeColors = k.onMenuNodeColors;
N.onMenuNodeShapes = k.onMenuNodeShapes;
N.onMenuNodeRemove = k.onMenuNodeRemove;
N.onMenuNodeClone = k.onMenuNodeClone;
N.onMenuNodeToSubgraph = k.onMenuNodeToSubgraph;
N.onMenuNodeToSubgraphInputs = k.onMenuNodeToSubgraphInputs;
N.onMenuNodeToSubgraphOutputs = k.onMenuNodeToSubgraphOutputs;
N.onMenuNodeToParentGraph = k.onMenuNodeToParentGraph;
var J = /* @__PURE__ */ ((t) => (t[t.SEPARATOR = 0] = "SEPARATOR", t))(J || {});
class j {
  static trigger(e, s, i, n) {
    var r = document.createEvent("CustomEvent");
    return r.initCustomEvent(s, !0, !0, i), r.target = n, e.dispatchEvent && e.dispatchEvent(r), r;
  }
  static isCursorOverElement(e, s) {
    var i = e.clientX, n = e.clientY, r = s.getBoundingClientRect();
    return r ? n > r.top && n < r.top + r.height && i > r.left && i < r.left + r.width : !1;
  }
  static closeAllContextMenus(e) {
    e = e || window;
    var s = e.document.querySelectorAll(".litecontextmenu");
    if (s.length) {
      var i = Array.from(s);
      for (const n of i)
        n.close();
    }
  }
  constructor(e, s = {}, i) {
    var g;
    this.options = s;
    var n = this;
    s.parentMenu && (s.parentMenu.constructor !== this.constructor ? (console.error(
      "parentMenu must be of class ContextMenu, ignoring it"
    ), s.parentMenu = null) : (this.parentMenu = s.parentMenu, this.parentMenu.lock = !0, this.parentMenu.current_submenu = this));
    var r = null;
    s.event && (r = s.event.constructor.name), r !== "MouseEvent" && r !== "CustomEvent" && r !== "PointerEvent" && (console.error(
      "Event passed to ContextMenu is not of type MouseEvent or CustomEvent. Ignoring it. (" + r + ")"
    ), s.event = null);
    var o = document.createElement("div");
    if (o.className = "litegraph litecontextmenu litemenubar-panel", s.className && (o.className += " " + s.className), o.style.pointerEvents = "none", setTimeout(function() {
      o.style.pointerEvents = "auto";
    }, 100), u.pointerListenerAdd(
      o,
      "up",
      function(d) {
        return d.preventDefault(), !0;
      },
      !0
    ), o.addEventListener(
      "contextmenu",
      function(d) {
        return d.button != 2 || d.preventDefault(), !1;
      },
      !0
    ), o.close = () => {
      o.parentNode.removeChild(o);
    }, u.pointerListenerAdd(
      o,
      "down",
      function(d) {
        if (d.button == 2)
          return n.close(), d.preventDefault(), !0;
      },
      !0
    ), s.scroll_speed || (s.scroll_speed = 0.1), o.addEventListener("wheel", this.onMouseWheel.bind(this), !0), o.addEventListener("mousewheel", this.onMouseWheel.bind(this), !0), this.root = o, s.title) {
      var a = document.createElement("div");
      a.className = "litemenu-title", a.innerHTML = s.title, o.appendChild(a);
    }
    this.values = [];
    for (let d = 0; d < e.length; d++) {
      let _ = e[d], b = "";
      _ === 0 || _ == null ? b = "" : typeof _ == "string" ? b = _ : b = _.content, this.addItem(b, _, s);
    }
    u.pointerListenerAdd(o, "enter", function(d) {
      o.closing_timer && clearTimeout(o.closing_timer);
    });
    var l = document;
    s.event && s.event.target instanceof Node && (l = s.event.target.ownerDocument), l || (l = document), l.fullscreenElement ? l.fullscreenElement.appendChild(o) : l.body.appendChild(o);
    var h = s.left || 0, p = s.top || 0;
    if (s.event) {
      if (h = s.event.clientX - 10, p = s.event.clientY - 10, s.title && (p -= 20), s.parentMenu) {
        var f = s.parentMenu.root.getBoundingClientRect();
        h = f.left + f.width;
      }
      var c = document.body.getBoundingClientRect(), v = o.getBoundingClientRect();
      c.height == 0 && console.error("document.body height is 0. That is dangerous, set html,body { height: 100%; }"), c.width && h > c.width - v.width - 10 && (h = c.width - v.width - 10), c.height && p > c.height - v.height - 10 && (p = c.height - v.height - 10);
    }
    o.style.left = h + "px", o.style.top = p + "px", s.scale && (o.style.transform = "scale(" + s.scale + ")"), (g = u.onContextMenuCreated) == null || g.call(u, this);
  }
  addItem(e, s, i = {}) {
    var n = this, r = document.createElement("div");
    r.className = "litemenu-entry submenu";
    var o = !1;
    typeof s == "string" && (s = { content: s }), s === 0 || s == null ? r.classList.add("separator") : (r.innerHTML = s.title ? s.title : e, s.disabled && (o = !0, r.classList.add("disabled")), (s.submenu || s.has_submenu) && r.classList.add("has_submenu"), typeof s == "function" ? r.dataset.value = e : r.dataset.value = "" + this.values.length, s.className && (r.className += " " + s.className)), this.values.push(s), this.root.appendChild(r), o || r.addEventListener("click", h), i.autoopen && u.pointerListenerAdd(r, "enter", l);
    let a = this;
    function l(p) {
      var f = this.value;
      !f || !f.has_submenu || h.call(this, p);
    }
    function h(p) {
      let f = parseInt(this.dataset.value);
      var c = a.values[f];
      u.debug && console.debug("ContextMenu inner_onclick", f, c);
      const v = N.active_canvas;
      if (!v)
        return;
      const g = v.adjustMouseEvent(p);
      var d = !0;
      if (n.current_submenu && n.current_submenu.close(g), i.callback) {
        var _ = i.callback.call(
          this,
          c,
          i,
          g,
          n,
          i.node
        );
        _ === !0 && (d = !1);
      }
      if (c && typeof c == "object") {
        if (c.callback && !i.ignore_item_callbacks && c.disabled !== !0) {
          var _ = c.callback.call(
            this,
            c,
            i,
            g,
            n,
            i.extra
          );
          _ === !0 && (d = !1);
        }
        if (c.submenu) {
          if (!c.submenu.options)
            throw "ContextMenu submenu needs options";
          new j(c.submenu.options, {
            callback: c.submenu.callback,
            event: g,
            parentMenu: n,
            ignore_item_callbacks: c.submenu.ignore_item_callbacks,
            title: c.submenu.title,
            extra: c.submenu.extra,
            autoopen: i.autoopen
          }), d = !1;
        }
      }
      d && !n.lock && n.close();
    }
    return r;
  }
  close(e, s) {
    this.root.parentNode && this.root.parentNode.removeChild(this.root), this.parentMenu && !s && (this.parentMenu.lock = !1, this.parentMenu.current_submenu = null, e === void 0 ? this.parentMenu.close() : e && !j.isCursorOverElement(e, this.parentMenu.root) && j.trigger(this.parentMenu.root, u.pointerevents_method + "leave", e)), this.current_submenu && this.current_submenu.close(e, !0), this.root.closing_timer && clearTimeout(this.root.closing_timer);
  }
  getTopMenu() {
    return this.options.parentMenu ? this.options.parentMenu.getTopMenu() : this;
  }
  getFirstEvent() {
    return this.options.parentMenu ? this.options.parentMenu.getFirstEvent() : this.options.event;
  }
  onMouseWheel(e) {
    var s = parseInt(this.root.style.top);
    return this.root.style.top = (s + e.deltaY * this.options.scroll_speed * (this.options.invert_scrolling ? -1 : 1)).toFixed() + "px", e.preventDefault(), !0;
  }
}
class xe extends C {
  constructor(e) {
    super(e), this.properties = {
      value: 1
    }, this.nameInGraph = "", this.size = [180, 30], this.widget = this.addWidget("number", "value", 1, "value"), this.widgets_up = !0;
  }
  onExecute() {
    this.setOutputData(0, this.properties.value);
  }
  getTitle() {
    return this.flags.collapsed ? "" + this.properties.value : this.title;
  }
  setValue(e) {
    typeof e != "number" && (e = parseFloat(e)), this.setProperty("value", e);
  }
  onDrawBackground(e) {
    this.outputs[0].label = this.properties.value.toFixed(3);
  }
}
xe.slotLayout = {
  inputs: [],
  outputs: [
    { name: "value", type: "number" }
  ]
};
xe.propertyLayout = [
  { name: "value", defaultValue: 1 }
];
u.registerNodeType({
  class: xe,
  title: "Const Number",
  desc: "Constant number",
  type: "basic/number"
});
class He extends C {
  constructor(e) {
    super(e), this.properties = {
      value: 1
    }, this.nameInGraph = "", this.size = [180, 30], this.widget = this.addWidget("number", "value", 1, "value", { step: 1, precision: 0 }), this.widgets_up = !0;
  }
  onExecute() {
    this.setOutputData(0, this.properties.value);
  }
  getTitle() {
    return this.flags.collapsed ? "" + this.properties.value : this.title;
  }
  setValue(e) {
    typeof e != "number" && (e = parseFloat(e)), this.setProperty("value", Math.floor(e));
  }
  onDrawBackground(e) {
    this.outputs[0].label = this.properties.value.toFixed(0);
  }
}
He.slotLayout = {
  inputs: [],
  outputs: [
    { name: "value", type: "number" }
  ]
};
He.propertyLayout = [
  { name: "value", defaultValue: 1 }
];
u.registerNodeType({
  class: He,
  title: "Const Integer",
  desc: "Constant integer",
  type: "basic/integer"
});
class be extends C {
  constructor(e) {
    super(e), this.properties = {
      value: !0
    }, this.size = [140, 30], this.widget = this.addWidget("toggle", "value", !0, "value"), this.widgets_up = !0;
  }
  onExecute() {
    this.setOutputData(0, this.properties.value);
  }
  onAction() {
    this.setValue(!this.properties.value);
  }
  getTitle() {
    return this.flags.collapsed ? "" + this.properties.value : this.title;
  }
  setValue(e) {
    this.setProperty("value", !!e);
  }
}
be.slotLayout = {
  inputs: [],
  outputs: [
    { name: "bool", type: "boolean" }
  ]
};
be.propertyLayout = [
  { name: "value", defaultValue: !0 }
];
be.optionalSlots = {
  inputs: [
    { name: "toggle", type: O.ACTION }
  ]
};
u.registerNodeType({
  class: be,
  title: "Const Boolean",
  desc: "Constant boolean",
  type: "basic/boolean"
});
class Te extends C {
  constructor(e) {
    super(e), this.properties = {
      value: ""
    }, this.size = [180, 30], this.widget = this.addWidget("text", "value", "", "value"), this.widgets_up = !0;
  }
  onExecute() {
    this.setOutputData(0, this.properties.value);
  }
  getTitle() {
    return this.flags.collapsed ? "" + this.properties.value : this.title;
  }
  setValue(e) {
    this.setProperty("value", String(e));
  }
  onDropFile(e) {
    var s = this, i = new FileReader();
    i.onload = function(n) {
      s.setProperty("value", i.result);
    }, i.readAsText(e);
  }
}
Te.slotLayout = {
  inputs: [],
  outputs: [
    { name: "string", type: "string" }
  ]
};
Te.propertyLayout = [
  { name: "value", defaultValue: "" }
];
Te.optionalSlots = {};
u.registerNodeType({
  class: Te,
  title: "Const String",
  desc: "Constant string",
  type: "basic/string"
});
class Ee extends C {
  constructor(e) {
    super(e), this.properties = {
      value: ""
    }, this.size = [120, 30], this._object = {};
  }
  onExecute() {
    this.setOutputData(0, this._object);
  }
}
Ee.slotLayout = {
  inputs: [],
  outputs: [
    { name: "obj", type: "object" }
  ]
};
Ee.propertyLayout = [];
Ee.optionalSlots = {};
u.registerNodeType({
  class: Ee,
  title: "Const Object",
  desc: "Constant object",
  type: "basic/object"
});
class Oe extends C {
  constructor(e) {
    super(e), this.properties = {
      url: "",
      type: "text"
    }, this._data = null, this._url = null, this._type = null, this.widget = this.addWidget("text", "url", "", "url"), this._data = null, this.widgets_up = !0;
  }
  onPropertyChanged(e, s) {
    e == "url" && (s == null || s == "" ? this._data = null : this.fetchFile(s));
  }
  onExecute() {
    var e = this.getInputData(0) || this.properties.url;
    e && (e != this._url || this._type != this.properties.type) && this.fetchFile(e), this.setOutputData(0, this._data);
  }
  setValue(e) {
    this.setProperty("value", e);
  }
  async fetchFile(e) {
    var s = this;
    if (!e || e.constructor !== String) {
      s._data = null, s.boxcolor = null;
      return;
    }
    this._url = e, this._type = this.properties.type, e.substr(0, 4) == "http" && u.proxy && (e = u.proxy + e.substr(e.indexOf(":") + 3)), await fetch(e).then(function(i) {
      if (!i.ok)
        throw new Error("File not found");
      if (s.properties.type == "arraybuffer")
        return i.arrayBuffer();
      if (s.properties.type == "text")
        return i.text();
      if (s.properties.type == "json")
        return i.json();
      if (s.properties.type == "blob")
        return i.blob();
    }).then(function(i) {
      s._data = i, s.boxcolor = "#AEA";
    }).catch(function(i) {
      s._data = null, s.boxcolor = "red", console.error("error fetching file:", i, e);
    });
  }
  onDropFile(e) {
    this._url = e.name, this._type = this.properties.type, this.properties.url = e.name;
    var s = new FileReader();
    if (s.onload = (i) => {
      this.boxcolor = "#AEA";
      var n = s.result;
      this.properties.type == "json" && (n = JSON.parse(n)), this._data = n;
    }, this.properties.type == "arraybuffer")
      s.readAsArrayBuffer(e);
    else if (this.properties.type == "text" || this.properties.type == "json")
      s.readAsText(e);
    else if (this.properties.type == "blob")
      return s.readAsBinaryString(e);
  }
}
Oe.slotLayout = {
  inputs: [
    { name: "url", type: "string" }
  ],
  outputs: [
    { name: "file", type: "string" }
  ]
};
Oe.propertyLayout = [
  { name: "url", defaultValue: "" },
  { name: "type", defaultValue: "text" }
];
Oe.optionalSlots = {};
u.registerNodeType({
  class: Oe,
  title: "Const File",
  desc: "Fetches a file from an url",
  type: "basic/file"
});
const Ge = class extends C {
  constructor(t) {
    super(t), this.properties = {
      value: 0
    }, this.nameInGraph = "", this.size = [60, 30], this.value = 0;
  }
  onExecute() {
    this.inputs[0] && (this.value = this.getInputData(0));
  }
  getTitle() {
    return this.flags.collapsed ? this.inputs[0].label || "" : this.title;
  }
  static toString(t) {
    if (t == null)
      return "null";
    if (t.constructor === Number)
      return t.toFixed(3);
    if (t.constructor === Array) {
      for (var e = "[", s = 0; s < t.length; ++s)
        e += Ge.toString(t[s]) + (s + 1 != t.length ? "," : "");
      return e += "]", e;
    } else
      return String(t);
  }
  onDrawBackground(t) {
    this.inputs[0].label = Ge.toString(this.value);
  }
};
let Ne = Ge;
Ne.slotLayout = {
  inputs: [
    { name: "value", type: O.DEFAULT, options: { label: "" } }
  ],
  outputs: []
};
Ne.propertyLayout = [
  { name: "value", defaultValue: 1 }
];
u.registerNodeType({
  class: Ne,
  title: "Watch",
  desc: "Show value of input",
  type: "basic/watch"
});
class Ie extends C {
  constructor(e) {
    super(e), this.properties = {
      json: "",
      value: "",
      type: "object"
    }, this.size = [140, 30], this.jsonWidget = this.addWidget("text", "json", "", "json", { multiline: !0, inputStyle: { fontFamily: "monospace" } }), this.valueWidget = this.addWidget("text", "value", "", "value"), this.valueWidget.disabled = !0, this.typeWidget = this.addWidget("text", "type", this.properties.type, "type"), this.typeWidget.disabled = !0, this.widgets_up = !0, this._value = null;
  }
  getType() {
    return Array.isArray(this._value) ? "array" : typeof this._value;
  }
  updateType() {
    var e = this.getType();
    this.typeWidget.value = "" + e, this.outputs[0].type != e && (u.isValidConnection(this.outputs[0].type, e) || this.disconnectOutput(0), this.outputs[0].type = e), this.valueWidget.value = this._value, this.outputs[0].shape = A.DEFAULT, e == "number" ? this.valueWidget.type = "number" : e == "boolean" ? this.valueWidget.type = "toggle" : e == "string" ? this.valueWidget.type = "text" : e == "object" || e == "array" ? (this.valueWidget.type = "text", this.valueWidget.value = Ne.toString(this._value), e == "array" && (this.outputs[0].shape = A.GRID_SHAPE)) : this.valueWidget.type = null, this.properties.value = this.valueWidget.value;
  }
  onPropertyChanged(e, s) {
    if (e == "json") {
      if (this.jsonWidget.value = s, s == null || s == "")
        return;
      try {
        this._value = JSON.parse(s), this.boxcolor = "#AEA", this.updateType();
      } catch {
        this.boxcolor = "red";
      }
    } else
      e == "type" && this.updateType();
  }
  onExecute() {
    this.setOutputData(0, this._value);
  }
  setValue(e) {
    this.setProperty("value", e);
  }
  onDropFile(e) {
    var s = this, i = new FileReader();
    i.onload = function(n) {
      s.setProperty("value", i.result);
    }, i.readAsText(e);
  }
}
Ie.slotLayout = {
  inputs: [],
  outputs: [
    { name: "data", type: "object" }
  ]
};
Ie.propertyLayout = [
  { name: "json", defaultValue: "", options: { multiline: !0 } },
  { name: "value", defaultValue: "" },
  { name: "type", defaultValue: "object" }
];
Ie.optionalSlots = {};
u.registerNodeType({
  class: Ie,
  title: "Const JSON",
  desc: "Parses a string to JSON object",
  type: "basic/json"
});
class Ce extends C {
  constructor(e) {
    super(e), this.properties = {
      value: null
    }, this.size = [140, 30], this.widget = this.addWidget("toggle", "value", this.properties.value, "value"), this.widgets_up = !0;
  }
  onExecute() {
    this.setOutputData(0, this.properties.value);
  }
  onAction() {
    this.properties.value === null ? this.setValue(void 0) : this.setValue(null);
  }
  getTitle() {
    return this.flags.collapsed ? "" + String(this.properties.value) : this.title;
  }
  setValue(e) {
    this.setProperty("value", e === void 0 ? void 0 : null);
  }
}
Ce.slotLayout = {
  inputs: [],
  outputs: [
    { name: "null", type: "*" }
  ]
};
Ce.propertyLayout = [
  { name: "value", defaultValue: null }
];
Ce.optionalSlots = {
  inputs: [
    { name: "toggle", type: O.ACTION }
  ]
};
u.registerNodeType({
  class: Ce,
  title: "Const Null",
  desc: "Constant null or undefined",
  type: "basic/null"
});
class ke extends C {
  constructor() {
    super(...arguments), this.properties = {
      index: 0
    };
  }
  onExecute() {
    const e = this.getInputData(0);
    let s = this.getInputData(1);
    s == null && (s = this.properties.index), !(e == null || s == null) && (s = Math.floor(Number(s)), s >= 0 && s < e.length ? (this.boxcolor = "#AEA", this.setOutputData(0, e[s])) : this.boxcolor = "red");
  }
}
ke.slotLayout = {
  inputs: [
    { name: "array", type: "array,table,string", options: { shape: A.GRID_SHAPE } },
    { name: "index", type: "number" }
  ],
  outputs: [
    { name: "value", type: "" }
  ]
};
ke.propertyLayout = [
  { name: "index", defaultValue: 0 }
];
ke.optionalSlots = {};
u.registerNodeType({
  class: ke,
  title: "Array[i]",
  desc: "Returns an element from an array",
  type: "basic/array[]"
});
class Ae extends C {
  constructor(e) {
    super(e), this.properties = {
      index: 0
    }, this.widget = this.addWidget("number", "i", this.properties.index, "index", { precision: 0, step: 10, min: 0 }), this.widgets_up = !0;
  }
  onExecute() {
    var e = this.getInputData(0);
    if (!e)
      return;
    var s = this.getInputData(1);
    if (s === void 0)
      return;
    const i = Math.floor(this.properties.index);
    i >= 0 && i < e.length ? (this.boxcolor = "#AEA", e[i] = s) : this.boxcolor = "red", this.setOutputData(0, e);
  }
}
Ae.slotLayout = {
  inputs: [
    { name: "arr", type: "array" },
    { name: "value", type: "" }
  ],
  outputs: [
    { name: "arr", type: "array" }
  ]
};
Ae.propertyLayout = [
  { name: "index", defaultValue: 0 }
];
Ae.optionalSlots = {};
u.registerNodeType({
  class: Ae,
  title: "Set Array",
  desc: "Sets index of array",
  type: "basic/set_array"
});
class ze extends C {
  constructor() {
    super(...arguments), this.resizable = !1, this.titleMode = se.NO_TITLE;
  }
  onExecute() {
    this.setOutputData(0, this.getInputData(0));
  }
  getExtraMenuOptions(e, s) {
    const i = this.getInputLink(0) != null && this.getOutputLinks(0).length > 0;
    return s.push({
      content: "Splice & Remove",
      disabled: !i,
      callback: () => {
        const n = this.getInputLink(0), r = this.getOutputLinks(0);
        if (!n || !r)
          return;
        const o = this.graph.getNodeById(n.origin_id);
        this.graph.removeLink(n.id);
        for (const a of r) {
          const l = this.graph.getNodeById(a.target_id);
          this.graph.removeLink(a.id), o.connect(n.origin_slot, l, a.target_slot);
        }
        this.graph.remove(this);
      }
    }), null;
  }
}
ze.slotLayout = {
  inputs: [
    { name: "", type: "*" }
  ],
  outputs: [
    { name: "", type: "*" }
  ]
};
ze.overrideSize = [60, 30];
u.registerNodeType({
  class: ze,
  title: "Reroute",
  desc: "Simple pass-through for organization",
  type: "basic/reroute"
});
class Ue extends C {
  constructor() {
    super(...arguments), this.properties = {
      enabled: !0
    };
  }
  onExecute() {
    this.setOutputData(0, this.graph.globaltime * 1e3), this.setOutputData(1, this.graph.globaltime);
  }
}
Ue.slotLayout = {
  inputs: [],
  outputs: [
    { name: "in ms", type: "number" },
    { name: "in sec", type: "number" }
  ]
};
Ue.propertyLayout = [
  { name: "enabled", defaultValue: !0 }
];
u.registerNodeType({
  class: Ue,
  title: "Time",
  desc: "Current time",
  type: "basic/time"
});
const at = class extends C {
  constructor(t) {
    super(t), this.properties = {
      A: 1,
      B: 1,
      OP: "=="
    }, this.opWidget = this.addWidget("combo", "Op.", this.properties.OP, null, { property: "OP", values: at.values });
  }
  getTitle() {
    return "*A " + this.properties.OP + " *B";
  }
  onExecute() {
    var t = this.getInputData(0);
    t === void 0 ? t = this.properties.A : this.properties.A = t;
    var e = this.getInputData(1);
    e === void 0 ? e = this.properties.B : this.properties.B = e;
    var s = !1;
    if (typeof t == typeof e)
      switch (this.properties.OP) {
        case "==":
        case "!=":
          switch (s = !0, typeof t) {
            case "object":
              var i = Object.getOwnPropertyNames(t), n = Object.getOwnPropertyNames(e);
              if (i.length != n.length) {
                s = !1;
                break;
              }
              for (var r = 0; r < i.length; r++) {
                var o = i[r];
                if (t[o] !== e[o]) {
                  s = !1;
                  break;
                }
              }
              break;
            default:
              s = t == e;
          }
          this.properties.OP == "!=" && (s = !s);
          break;
        case ">":
          s = t > e;
          break;
        case "<":
          s = t < e;
          break;
        case "<=":
          s = t <= e;
          break;
        case ">=":
          s = t >= e;
          break;
        case "||":
          s = t || e;
          break;
        case "&&":
          s = t && e;
          break;
      }
    this.setOutputData(0, s), this.setOutputData(1, !s);
  }
};
let Se = at;
Se.slotLayout = {
  inputs: [
    { name: "A", type: O.DEFAULT },
    { name: "B", type: O.DEFAULT }
  ],
  outputs: [
    { name: "true", type: "boolean" },
    { name: "false", type: "boolean" }
  ]
};
Se.propertyLayout = [
  { name: "enabled", defaultValue: !0 }
];
Se.values = ["==", "!=", ">", "<", ">=", "<=", "||", "&&"];
u.registerNodeType({
  class: Se,
  title: "GenericCompare",
  desc: "Compare *",
  type: "basic/CompareValues"
});
class We extends C {
  constructor() {
    super(...arguments), this.properties = {
      strictEquality: !0
    };
  }
  onExecute() {
    const e = this.getInputData(0), s = this.properties.strictEquality ? e === null : e == null;
    this.setOutputData(0, s);
  }
}
We.slotLayout = {
  inputs: [
    { name: "in", type: "*" }
  ],
  outputs: [
    { name: "is_null", type: "boolean" }
  ]
};
We.propertyLayout = [];
u.registerNodeType({
  class: We,
  title: "== Null",
  desc: "Returns true if input is null",
  type: "basic/is_null"
});
function Me(t) {
  try {
    return JSON.stringify(t);
  } catch (e) {
    return e.toString();
  }
}
class we extends C {
  constructor(e) {
    super(e), this.properties = {}, this.size = [60, 30], this.actionWidget = this.addWidget("text", "Action", "", null, { multiline: !0, max_length: 100 }), this.paramWidget = this.addWidget("text", "Param", "", null, { multiline: !0, max_length: 100 }), this.optionsWidget = this.addWidget("text", "Opts", "", null, { multiline: !0, max_length: 100 });
  }
  onAction(e, s, i) {
    console.log("[LogEvent] Event received:", e, s, i), this.actionWidget.value = Me(e), this.paramWidget.value = Me(s), this.optionsWidget.value = Me({ action_call: i.action_call, link: i.link });
  }
}
we.slotLayout = {
  inputs: [
    { name: "event", type: O.ACTION }
  ]
};
we.propertyLayout = [];
we.optionalSlots = {};
u.registerNodeType({
  class: we,
  title: "Log Event",
  desc: "Log event in console",
  type: "events/log"
});
class lt extends C {
  constructor() {
    super(...arguments), this.properties = {
      onlyOnChange: !0
    }, this.prev = 0, this.size = [60, 30];
  }
  onExecute(e, s) {
    var i = this.getInputData(0), n = i != this.prev;
    this.prev === 0 && (n = !1);
    var r = n && this.properties.onlyOnChange || !n && !this.properties.onlyOnChange;
    i && r && this.triggerSlot(0, i, null, s), !i && r && this.triggerSlot(2, i, null, s), n && this.triggerSlot(1, i, null, s), this.prev = i;
  }
}
lt.slotLayout = {
  inputs: [
    { name: "if", type: "" }
  ],
  outputs: [
    { name: "true", type: O.EVENT },
    { name: "change", type: O.EVENT },
    { name: "false", type: O.EVENT }
  ]
};
u.registerNodeType({
  class: lt,
  title: "Trigger Event",
  desc: "Triggers event if input evaluates to true",
  type: "events/trigger"
});
const ut = class extends C {
  constructor(t) {
    super(t), this.properties = {
      compareValue: null,
      propertyName: "",
      mode: "param",
      operation: "=="
    }, this.size = [60, 30], this.modeWidget = this.addWidget("combo", "Mode", this.properties.mode, null, { property: "mode", values: ["param", "property"] }), this.propertyNameWidget = this.addWidget("text", "Prop.", this.properties.propertyName, "propertyName"), this.propertyNameWidget.disabled = !0, this.opWidget = this.addWidget("combo", "Op.", this.properties.operation, null, { property: "operation", values: ut.values }), this.compareValueWidget = this.addWidget("text", "Value", this.properties.compareValue, "compareValue");
  }
  onPropertyChanged(t, e) {
    t === "mode" && (this.propertyNameWidget.disabled = e === "param");
  }
  compare(t, e) {
    if (typeof t != typeof e)
      return !1;
    let s = !1;
    switch (this.properties.operation) {
      case "==":
      case "!=":
        switch (s = !0, typeof t) {
          case "object":
            var i = Object.getOwnPropertyNames(t), n = Object.getOwnPropertyNames(e);
            if (i.length != n.length) {
              s = !1;
              break;
            }
            for (var r = 0; r < i.length; r++) {
              var o = i[r];
              if (t[o] !== e[o]) {
                s = !1;
                break;
              }
            }
            break;
          default:
            s = t == e;
        }
        this.properties.operation == "!=" && (s = !s);
        break;
      case ">":
        s = t > e;
        break;
      case "<":
        s = t < e;
        break;
      case "<=":
        s = t <= e;
        break;
      case ">=":
        s = t >= e;
        break;
      case "||":
        s = t || e;
        break;
      case "&&":
        s = t && e;
        break;
    }
    return s;
  }
  evaluate(t) {
    if (this.properties.mode === "property") {
      if (!this.properties.propertyName)
        return console.warn("[FilterEvent] No property name supplied!", t), !1;
      var e = t[this.properties.propertyName];
      return e == null ? !1 : this.compare(this.properties.compareValue, e);
    } else
      return this.compare(this.properties.compareValue, t);
  }
  onExecute() {
    const t = this.getInputData(1);
    t != null && this.setProperty("compareValue", t), this.compareValueWidget.value = String(this.properties.compareValue);
  }
  onAction(t, e, s) {
    this.evaluate(e) ? this.triggerSlot(0, e, null, s) : this.triggerSlot(1, e, null, s);
  }
};
let Ve = ut;
Ve.slotLayout = {
  inputs: [
    { name: "event", type: O.ACTION },
    { name: "compare_value", type: "*" }
  ],
  outputs: [
    { name: "accept", type: O.EVENT },
    { name: "reject", type: O.EVENT }
  ]
};
Ve.values = ["==", "!=", ">", "<", ">=", "<=", "||", "&&"];
u.registerNodeType({
  class: Ve,
  title: "Filter Event",
  desc: "Blocks events that do not match the filter",
  type: "events/filter"
});
class ht extends C {
  constructor() {
    super(...arguments), this._value = !1, this.size = [120, 60];
  }
  onExecute(e, s) {
    this._value = this.getInputData(1);
  }
  onAction(e, s, i) {
    this._value = this.getInputData(1), this.triggerSlot(this._value ? 0 : 1, s, null, i);
  }
}
ht.slotLayout = {
  inputs: [
    { name: "in", type: O.ACTION },
    { name: "cond", type: "boolean" }
  ],
  outputs: [
    { name: "true", type: O.EVENT },
    { name: "false", type: O.EVENT }
  ]
};
u.registerNodeType({
  class: ht,
  title: "Branch",
  desc: "If condition is true, outputs triggers true, otherwise false",
  type: "events/branch"
});
class Le extends C {
  constructor() {
    super(...arguments), this.properties = {
      timeInMs: 1e3
    }, this._pending = [], this.size = [60, 30];
  }
  onAction(e, s, i) {
    var n = this.properties.timeInMs;
    n <= 0 ? this.trigger(null, s, i) : this._pending.push([n, s]);
  }
  onExecute(e, s) {
    var i = this.graph.elapsed_time * 1e3;
    this.isInputConnected(1) && (this.properties.timeInMs = this.getInputData(1));
    for (var n = 0; n < this._pending.length; ++n) {
      var r = this._pending[n];
      r[0] -= i, !(r[0] > 0) && (this._pending.splice(n, 1), --n, this.trigger(null, r[1], s));
    }
  }
}
Le.slotLayout = {
  inputs: [
    { name: "event", type: O.ACTION }
  ],
  outputs: [
    { name: "on_time", type: O.EVENT }
  ]
};
Le.propertyLayout = [];
Le.optionalSlots = {};
u.registerNodeType({
  class: Le,
  title: "Delay",
  desc: "Delays one event",
  type: "events/delay"
});
class De extends C {
  constructor() {
    super(...arguments), this.properties = {
      timeInFrames: 30
    }, this._pending = [], this.size = [60, 30];
  }
  onAction(e, s, i) {
    var n = this.properties.timeInFrames;
    n <= 0 ? this.trigger(null, s, i) : this._pending.push([n, s]);
  }
  onExecute(e, s) {
    var i = 1;
    this.isInputConnected(1) && (this.properties.timeInFrames = this.getInputData(1));
    for (var n = 0; n < this._pending.length; ++n) {
      var r = this._pending[n];
      r[0] -= i, !(r[0] > 0) && (this._pending.splice(n, 1), --n, this.trigger(null, r[1], s));
    }
  }
}
De.slotLayout = {
  inputs: [
    { name: "event", type: O.ACTION }
  ],
  outputs: [
    { name: "on_time", type: O.EVENT }
  ]
};
De.propertyLayout = [];
De.optionalSlots = {};
u.registerNodeType({
  class: De,
  title: "Frame Delay",
  desc: "Delays one event by frame count",
  type: "events/frame_delay"
});
class pt extends C {
  // override render_box = false
  constructor(e) {
    super(e), this.size = [90, 70];
  }
  getTitle() {
    return this.horizontal ? "" : this.title;
  }
  onAction(e, s, i) {
    if (this.outputs) {
      i = i || {};
      for (var n = 0; n < this.outputs.length; ++n)
        i.action_call ? i.action_call = i.action_call + "_seq_" + n : i.action_call = this.id + "_" + (e || "action") + "_seq_" + n + "_" + Math.floor(Math.random() * 9999), this.triggerSlot(n, s, null, i);
    }
  }
  onConnectionsChange(e, s, i, n, r) {
    const o = e === z.INPUT, a = e === z.INPUT ? this.inputs : this.outputs, l = (p) => o ? this.getInputLink(a.length - 1) ? 1 : 0 : this.getOutputLinks(a.length - 1).length, h = () => {
      o ? this.addInput("", O.ACTION) : this.addOutput("", O.EVENT);
    };
    if (i)
      n != null && s === a.length - 1 && h();
    else {
      if (l(a.length - 1) > 0)
        return;
      for (let p = a.length - 1; p > 0 && !(p <= 0); p--)
        if (l() === 0)
          o ? this.removeInput(p) : this.removeOutput(p);
        else
          break;
      l(a.length - 1) > 0 && h();
    }
  }
}
pt.slotLayout = {
  inputs: [
    { name: "", type: O.ACTION }
  ],
  outputs: [
    { name: "", type: O.EVENT }
  ]
};
u.registerNodeType({
  class: pt,
  title: "Sequence",
  desc: "Triggers a sequence of events when an event arrives",
  type: "events/sequence"
});
class ct extends C {
  constructor() {
    super(...arguments), this.properties = {};
  }
  onAction(e, s, i) {
    var n = this.getInputData(1);
    this.triggerSlot(0, n, null, i);
  }
}
ct.slotLayout = {
  inputs: [
    { name: "trigger", type: O.ACTION },
    { name: "param", type: "" }
  ],
  outputs: [
    { name: "event", type: O.EVENT }
  ]
};
u.registerNodeType({
  class: ct,
  title: "Wrap As Event",
  desc: "Triggers an event setting its parameter to the input value",
  type: "events/wrap_as_event"
});
class dt extends C {
  constructor() {
    super(...arguments), this.size = [80, 30];
  }
  onExecute() {
    var e = this.getInputData(0);
    e != null && this.setOutputData(0, Math.floor(e));
  }
}
dt.slotLayout = {
  inputs: [
    { name: "in", type: "number" }
  ],
  outputs: [
    { name: "out", type: "number" }
  ]
};
u.registerNodeType({
  class: dt,
  title: "Floor",
  desc: "Floor number to remove fractional part",
  type: "math/floor"
});
class Ye extends C {
  constructor() {
    super(...arguments), this.properties = {
      A: 1,
      B: 1,
      OP: "+"
    }, this._func = (e, s) => e + s, this._result = [], this.size = [100, 60];
  }
  getTitle() {
    return this.properties.OP == "max" || this.properties.OP == "min" ? this.properties.OP + "(A,B)" : "A " + this.properties.OP + " B";
  }
  setValue(e) {
    typeof e == "string" && (e = parseFloat(e)), this.properties.value = e;
  }
  onPropertyChanged(e, s) {
    if (e == "OP")
      switch (this.properties.OP) {
        case "+":
          this._func = function(i, n) {
            return i + n;
          };
          break;
        case "-":
          this._func = function(i, n) {
            return i - n;
          };
          break;
        case "*":
          this._func = function(i, n) {
            return i * n;
          };
          break;
        case "/":
          this._func = function(i, n) {
            return i / n;
          };
          break;
        case "%":
          this._func = function(i, n) {
            return i % n;
          };
          break;
        case "^":
          this._func = function(i, n) {
            return Math.pow(i, n);
          };
          break;
        case "max":
          this._func = function(i, n) {
            return Math.max(i, n);
          };
          break;
        case "min":
          this._func = function(i, n) {
            return Math.min(i, n);
          };
          break;
        default:
          console.warn("Unknown operation: " + this.properties.OP), this._func = function(i) {
            return i;
          };
          break;
      }
  }
  onExecute() {
    var e = this.getInputData(0), s = this.getInputData(1);
    e != null ? e.constructor === Number && (this.properties.A = e) : e = this.properties.A, s != null ? this.properties.B = s : s = this.properties.B;
    var i;
    if (e.constructor === Number)
      i = 0, i = this._func(e, s);
    else if (e.constructor === Array) {
      i = this._result, i.length = e.length;
      for (var n = 0; n < e.length; ++n)
        i[n] = this._func(e[n], s);
    } else {
      i = {};
      for (var n in e)
        i[n] = this._func(e[n], s);
    }
    this.setOutputData(0, i);
  }
  onDrawBackground(e) {
    this.flags.collapsed || (e.font = "40px Arial", e.fillStyle = "#666", e.textAlign = "center", e.fillText(
      this.properties.OP,
      this.size[0] * 0.5,
      (this.size[1] + u.NODE_TITLE_HEIGHT) * 0.5
    ), e.textAlign = "left");
  }
}
Ye.values = ["+", "-", "*", "/", "%", "^", "max", "min"];
Ye.slotLayout = {
  inputs: [
    { name: "A", type: "number,array,object" },
    { name: "B", type: "number" }
  ],
  outputs: [
    { name: "=", type: "number" }
  ]
};
u.registerNodeType({
  class: Ye,
  title: "Operation",
  desc: "Easy math operators",
  type: "math/operation"
});
const ft = class extends C {
  constructor() {
    super(...arguments), this.size = [80, 30];
  }
  static approxEq(t, e, s) {
    return s == null && (s = 1e-3), Math.abs(t - e) < s;
  }
  onExecute() {
    const t = this.getInputData(0), e = this.getInputData(1);
    if (t == null || e == null)
      return;
    const s = this.getInputData(2) || this.properties.epsilon, i = ft.approxEq(t, e, s);
    this.setOutputData(0, i), this.setOutputData(1, !i);
  }
};
let gt = ft;
gt.slotLayout = {
  inputs: [
    { name: "A", type: "number" },
    { name: "B", type: "number" },
    { name: "epsilon", type: "number" }
  ],
  outputs: [
    { name: "true", type: "boolean" },
    { name: "false", type: "boolean" }
  ]
};
u.registerNodeType({
  class: gt,
  title: "Approx. Eq",
  desc: "Check if two floating-point numbers are approximately equal",
  type: "math/approx_eq"
});
class _t extends C {
  onExecute() {
    const e = this.getInputData(0);
    let s = "";
    if (e && e.constructor === Object)
      try {
        s = JSON.stringify(e);
      } catch {
        s = String(e);
      }
    else
      s = String(e);
    this.setOutputData(0, s);
  }
}
_t.slotLayout = {
  inputs: [
    { name: "in", type: "" }
  ],
  outputs: [
    { name: "out", type: "string" }
  ]
};
u.registerNodeType({
  class: _t,
  title: "ToString",
  desc: "Calls .toString()",
  type: "string/toString"
});
class vt extends C {
  onExecute() {
    const e = this.getInputData(0) == this.getInputData(1);
    this.setOutputData(0, e);
  }
}
vt.slotLayout = {
  inputs: [
    { name: "A", type: "string" },
    { name: "B", type: "string" }
  ],
  outputs: [
    { name: "==", type: "boolean" }
  ]
};
u.registerNodeType({
  class: vt,
  title: "Compare",
  desc: "Compares strings",
  type: "string/compare"
});
class yt extends C {
  onExecute() {
    const e = this.getInputData(0) + this.getInputData(1);
    this.setOutputData(0, e);
  }
}
yt.slotLayout = {
  inputs: [
    { name: "A", type: "string" },
    { name: "B", type: "string" }
  ],
  outputs: [
    { name: "out", type: "string" }
  ]
};
u.registerNodeType({
  class: yt,
  title: "Concatenate",
  desc: "Concatenates strings",
  type: "string/concatenate"
});
class mt extends C {
  onExecute() {
    const e = this.getInputData(0), s = this.getInputData(1);
    e == null || s == null ? this.setOutputData(0, !1) : (e.indexOf(s), this.setOutputData(0, s));
  }
}
mt.slotLayout = {
  inputs: [
    { name: "A", type: "string" },
    { name: "B", type: "string" }
  ],
  outputs: [
    { name: "contains", type: "string" }
  ]
};
u.registerNodeType({
  class: mt,
  title: "Contains",
  desc: "Calls a.indexOf(b)",
  type: "string/contains"
});
class bt extends C {
  onExecute() {
    const e = this.getInputData(0);
    let s = e;
    e != null && e.constructor === String && (s = e.toUpperCase()), this.setOutputData(0, s);
  }
}
bt.slotLayout = {
  inputs: [
    { name: "in", type: "string" }
  ],
  outputs: [
    { name: "out", type: "string" }
  ]
};
u.registerNodeType({
  class: bt,
  title: "ToUpperCase",
  desc: "Converts to upper case",
  type: "string/toUpperCase"
});
class Tt extends C {
  constructor() {
    super(...arguments), this.properties = {
      separator: ","
    };
  }
  onExecute() {
    const e = this.getInputData(0);
    let s = this.getInputData(1);
    s == null && (s = this.properties.separator);
    let i = [];
    if (e == null)
      i = [];
    else if (e.constructor === String)
      i = e.split(s || " ");
    else if (e.constructor === Array) {
      for (var n = [], r = 0; r < e.length; ++r)
        typeof e[r] == "string" && (n[r] = e[r].split(s || " "));
      i = n;
    } else
      i = null;
    this.setOutputData(0, i);
  }
}
Tt.slotLayout = {
  inputs: [
    { name: "in", type: "string,array" },
    { name: "sep", type: "string" }
  ],
  outputs: [
    { name: "out", type: "array" }
  ]
};
u.registerNodeType({
  class: Tt,
  title: "Split",
  desc: 'Calls str.split(sep || " ")',
  type: "string/split"
});
class Et extends C {
  constructor() {
    super(...arguments), this.properties = {
      precision: 0
    };
  }
  onExecute() {
    const e = this.getInputData(0);
    if (e != null && e.constructor === Number) {
      const s = e.toFixed(this.properties.precision);
      this.setOutputData(0, s);
    } else
      this.setOutputData(0, `"${e}"`);
  }
}
Et.slotLayout = {
  inputs: [
    { name: "in", type: "number" }
  ],
  outputs: [
    { name: "out", type: "string" }
  ]
};
u.registerNodeType({
  class: Et,
  title: "ToFixed",
  desc: "Calls in.toFixed()",
  type: "string/toFixed"
});
class Ot extends C {
  constructor() {
    super(...arguments), this.properties = {
      value: "",
      separator: ","
    }, this._table = null, this._str = null, this._last_separator = null;
  }
  onExecute() {
    var e = this.getInputData(0);
    if (e) {
      var s = this.properties.separator || ",";
      (e != this._str || s != this._last_separator) && (this._last_separator = s, this._str = e, this._table = e.split(`
`).map(function(i) {
        return i.trim().split(s);
      })), this.setOutputData(0, this._table), this.setOutputData(1, this._table ? this._table.length : 0);
    }
  }
}
Ot.slotLayout = {
  inputs: [
    { name: "in", type: "number" }
  ],
  outputs: [
    { name: "table", type: "table" },
    { name: "rows", type: "number" }
  ]
};
u.registerNodeType({
  class: Ot,
  title: "ToTable",
  desc: "Splits a string to table",
  type: "string/toTable"
});
class Xe extends C {
  constructor(e) {
    super(e), this.properties = {
      template: "$1, $2, $3",
      stringQuote: "",
      outputJSON: !1
    }, this._value = null, this._args = null, this.templateWidget = this.addWidget("text", "Template", this.properties.template, "template", { multiline: !0 });
  }
  formatTemplateValue(e) {
    if (typeof e == "string") {
      const s = this.properties.stringQuote;
      return `${s}${e}${s}`;
    }
    return JSON.stringify(e);
  }
  substituteTemplate(e, s) {
    let i = e.replace(/\$(\d+)/g, (n, r) => this.formatTemplateValue(s[r - 1]));
    return this.properties.outputJSON && (i = JSON.parse(i)), i;
  }
  onPropertyChanged(e, s) {
    if (e === "outputJSON") {
      const i = s == !0;
      this.outputs[0].type = i ? "*" : "string", this.boxcolor = u.NODE_DEFAULT_BOXCOLOR;
    }
    this._value = null;
  }
  onExecute() {
    if (this._value == null) {
      const e = this.properties.template || "";
      let s;
      if (this._args != null)
        s = this._args, this._args = null;
      else {
        const i = this.getInputData(0);
        if (Array.isArray(i))
          s = i;
        else {
          s = [];
          for (let n = 0; n < this.inputs.length; n++)
            if (this.inputs[n].type !== O.ACTION) {
              const r = this.getInputData(n);
              s.push(r);
            }
        }
      }
      try {
        this.boxcolor = this.properties.outputJSON ? "#AEA" : u.NODE_DEFAULT_BOXCOLOR, this._value = this.substituteTemplate(e, s);
      } catch (i) {
        this.boxcolor = "red", this._value = "", u.debug && console.error(i);
      }
      this.triggerSlot(1, this._value);
    }
    this.setOutputData(0, this._value);
  }
  onAction(e, s) {
    e === "update" && (s != null ? Array.isArray(s) ? this._args = s : this._args = [s] : this._args = null, this._value = null, this.onExecute());
  }
  onConnectionsChange(e, s, i, n, r) {
    if (this._value = null, e === z.INPUT)
      if (i)
        n != null && s === this.inputs.length - 2 && (this.removeInput(this.inputs.length - 1), this.addInput("", "*"), this.addInput("update", O.ACTION));
      else {
        if (this.getInputLink(this.inputs.length - 2) != null)
          return;
        this.removeInput(this.inputs.length - 1);
        for (let o = this.inputs.length - 1; o > 1 && this.getInputLink(o) == null; o--)
          this.removeInput(o);
        this.getInputLink(this.inputs.length - 1) != null && this.addInput("", "*"), this.addInput("update", O.ACTION);
      }
  }
}
Xe.slotLayout = {
  inputs: [
    { name: "", type: "string,array" },
    { name: "", type: "string" },
    { name: "update", type: O.ACTION }
  ],
  outputs: [
    { name: "out", type: "string" },
    { name: "changed", type: O.EVENT }
  ]
};
Xe.propertyLayout = [
  { name: "template", defaultValue: "$1, $2, $3", options: { multiline: !0 } },
  { name: "stringQuote", defaultValue: "" }
];
u.registerNodeType({
  class: Xe,
  title: "Template",
  desc: "Substitutes an array of strings in a template like '$1, $2, $3'",
  type: "string/template"
});
class Nt extends C {
  constructor() {
    super(...arguments), this.properties = {}, this._value = null, this._str = null, this._error = null;
  }
  onExecute() {
    const e = this.getInputData(0);
    if (e != this._str && typeof e == "string") {
      this._error = null, this._value = null, this._str = e;
      try {
        this._value = JSON.parse(this._str), this.boxcolor = "#AEA";
      } catch (s) {
        this._error = `${s}`, this.boxcolor = "red";
      }
    } else
      e == null && (this._str = null, this._value = null, this._error = null, this.boxcolor = u.NODE_DEFAULT_BOXCOLOR);
    this.setOutputData(0, this._value), this.setOutputData(1, this._error);
  }
  onConnectionsChange(e, s, i, n, r) {
    this._str = null;
  }
}
Nt.slotLayout = {
  inputs: [
    { name: "in", type: "string" }
  ],
  outputs: [
    { name: "out", type: "*" },
    { name: "error", type: "string" }
  ]
};
u.registerNodeType({
  class: Nt,
  title: "JSON Parse",
  desc: "Parses a string into a JavaScript object",
  type: "string/json_parse"
});
class It extends C {
  constructor() {
    super(...arguments), this.properties = {
      space: 0
    }, this._value = null, this._obj = null, this._error = null, this._changed = !1;
  }
  onExecute() {
    const e = this.getInputData(0);
    if (this._changed || this._obj !== e) {
      this._value = null, this._changed = null, this._obj = e, this._error = null;
      const s = this.properties.space;
      try {
        this._value = JSON.stringify(this._obj, null, s), this.boxcolor = "#AEA";
      } catch (i) {
        this._error = `${i}`, this.boxcolor = "red";
      }
    } else
      e == null && (this._obj = null, this._value = null, this._error = null, this.boxcolor = u.NODE_DEFAULT_BOXCOLOR);
    this.setOutputData(0, this._value), this.setOutputData(1, this._error);
  }
  onConnectionsChange(e, s, i, n, r) {
    this._obj = null, this._changed = !0;
  }
}
It.slotLayout = {
  inputs: [
    { name: "in", type: "*" }
  ],
  outputs: [
    { name: "out", type: "string" },
    { name: "error", type: "string" }
  ]
};
u.registerNodeType({
  class: It,
  title: "JSON Stringify",
  desc: "Calls JSON.stringify() on the input value",
  type: "string/json_stringify"
});
class je extends C {
  onExecute() {
    const e = this.getInputData(0);
    this.setOutputData(0, !!e);
  }
}
je.slotLayout = {
  inputs: [
    { name: "in", type: "*" }
  ],
  outputs: [
    { name: "truthy", type: "boolean" }
  ]
};
je.propertyLayout = [];
u.registerNodeType({
  class: je,
  title: "~= TRUE",
  desc: "Returns true if input is truthy",
  type: "logic/truthy"
});
class Ct extends C {
  onExecute() {
    let e = !0;
    for (let s = 0; s < this.inputs.length; s++)
      if (!this.getInputData(s)) {
        e = !1;
        break;
      }
    this.setOutputData(0, e);
  }
}
Ct.slotLayout = {
  inputs: [
    { name: "a", type: "boolean" },
    { name: "b", type: "boolean" }
  ],
  outputs: [
    { name: "out", type: "boolean" }
  ]
};
u.registerNodeType({
  class: Ct,
  title: "AND",
  desc: "Return true if all inputs are true",
  type: "logic/AND"
});
class kt extends C {
  onExecute() {
    let e = !1;
    for (let s = 0; s < this.inputs.length; s++)
      if (this.getInputData(s)) {
        e = !0;
        break;
      }
    this.setOutputData(0, e);
  }
}
kt.slotLayout = {
  inputs: [
    { name: "a", type: "boolean" },
    { name: "b", type: "boolean" }
  ],
  outputs: [
    { name: "out", type: "boolean" }
  ]
};
u.registerNodeType({
  class: kt,
  title: "OR",
  desc: "Return true if at least one input is true",
  type: "logic/OR"
});
class At extends C {
  onExecute() {
    var e = !this.getInputData(0);
    this.setOutputData(0, e);
  }
}
At.slotLayout = {
  inputs: [
    { name: "in", type: "boolean" }
  ],
  outputs: [
    { name: "out", type: "boolean" }
  ]
};
u.registerNodeType({
  class: At,
  title: "NOT",
  desc: "Return the logical negation",
  type: "logic/NOT"
});
class St extends C {
  constructor() {
    super(...arguments), this.properties = {
      text: "click me",
      font: "Arial",
      font_size: 20,
      message: ""
    }, this.size = [164, 84], this.no_panel_on_double_click = !0, this.clicked = !1;
  }
  onDrawForeground(e) {
    if (this.flags.collapsed)
      return;
    const s = 10;
    if (e.fillStyle = "black", e.fillRect(
      s + 1,
      s + 1,
      this.size[0] - s * 2,
      this.size[1] - s * 2
    ), e.fillStyle = "#AAF", e.fillRect(
      s - 1,
      s - 1,
      this.size[0] - s * 2,
      this.size[1] - s * 2
    ), e.fillStyle = this.clicked ? "white" : this.mouseOver ? "#668" : "#334", e.fillRect(
      s,
      s,
      this.size[0] - s * 2,
      this.size[1] - s * 2
    ), this.properties.text) {
      var i = this.properties.font_size || 30;
      e.textAlign = "center", e.fillStyle = this.clicked ? "black" : "white", e.font = i + "px " + this.properties.font, e.fillText(
        this.properties.text,
        this.size[0] * 0.5,
        this.size[1] * 0.5 + i * 0.3
      ), e.textAlign = "left";
    }
  }
  onMouseDown(e, s) {
    if (s[0] > 1 && s[1] > 1 && s[0] < this.size[0] - 2 && s[1] < this.size[1] - 2)
      return this.clicked = !0, this.setOutputData(1, this.clicked), this.triggerSlot(0, this.properties.message), !0;
  }
  onExecute() {
    this.setOutputData(1, this.clicked);
  }
  onMouseUp(e) {
    this.clicked = !1;
  }
}
St.slotLayout = {
  inputs: [],
  outputs: [
    { name: "e", type: O.EVENT },
    { name: "v", type: "boolean" }
  ]
};
u.registerNodeType({
  class: St,
  title: "Button",
  desc: "Triggers an event",
  type: "widget/button"
});
class wt extends C {
  constructor() {
    super(...arguments), this.properties = {
      font: "",
      value: !1
    }, this.size = [160, 44];
  }
  onDrawForeground(e) {
    if (!this.flags.collapsed) {
      var s = this.size[1] * 0.5, i = 0.25, n = this.size[1] * 0.8;
      e.font = this.properties.font || (s * 0.8).toFixed(0) + "px Arial";
      var r = e.measureText(this.title).width, o = (this.size[0] - (r + s)) * 0.5;
      e.fillStyle = "#AAA", e.fillRect(o, n - s, s, s), e.fillStyle = this.properties.value ? "#AEF" : "#000", e.fillRect(
        o + s * i,
        n - s + s * i,
        s * (1 - i * 2),
        s * (1 - i * 2)
      ), e.textAlign = "left", e.fillStyle = "#AAA", e.fillText(this.title, s * 1.2 + o, n * 0.85), e.textAlign = "left";
    }
  }
  onAction(e) {
    this.properties.value = !this.properties.value, this.setOutputData(0, this.properties.value), this.triggerSlot(1, this.properties.value);
  }
  onExecute() {
    var e = this.getInputData(0);
    e != null && (this.properties.value = e), this.setOutputData(0, this.properties.value);
  }
  onMouseDown(e, s) {
    if (s[0] > 1 && s[1] > 1 && s[0] < this.size[0] - 2 && s[1] < this.size[1] - 2)
      return this.properties.value = !this.properties.value, this.graph._version++, this.triggerSlot(1, this.properties.value), !0;
  }
}
wt.slotLayout = {
  inputs: [
    { name: "v", type: "boolean" },
    { name: "e", type: O.ACTION }
  ],
  outputs: [
    { name: "v", type: "boolean" },
    { name: "e", type: O.EVENT }
  ]
};
u.registerNodeType({
  class: wt,
  title: "Toggle",
  desc: "Toggles between true or false",
  type: "widget/toggle"
});
const Lt = class extends C {
  constructor() {
    super(...arguments), this.properties = {
      min: -1e3,
      max: 1e3,
      value: 1,
      step: 1,
      markers_color: "#666",
      font: "Arial"
    }, this.size = [80, 60], this.old_y = -1, this._remainder = 0, this._precision = 0, this.mouse_captured = !1;
  }
  onDrawForeground(t) {
    var e = this.size[0] * 0.5, s = this.size[1];
    s > 30 ? (t.fillStyle = this.properties.markers_color, t.beginPath(), t.moveTo(e, s * 0.1), t.lineTo(e + s * 0.1, s * 0.2), t.lineTo(e + s * -0.1, s * 0.2), t.fill(), t.beginPath(), t.moveTo(e, s * 0.9), t.lineTo(e + s * 0.1, s * 0.8), t.lineTo(e + s * -0.1, s * 0.8), t.fill(), t.font = (s * 0.7).toFixed(1) + "px " + this.properties.font) : t.font = (s * 0.8).toFixed(1) + "px " + this.properties.font, t.textAlign = "center", t.font = (s * 0.7).toFixed(1) + "px " + this.properties.font, t.fillStyle = "#EEE", t.fillText(
      this.properties.value.toFixed(this._precision),
      e,
      s * 0.75
    );
  }
  onExecute() {
    this.setOutputData(0, this.properties.value);
  }
  onPropertyChanged(t, e) {
    var s = (this.properties.step + "").split(".");
    this._precision = s.length > 1 ? s[1].length : 0;
  }
  onMouseDown(t, e) {
    if (!(e[1] < 0))
      return this.old_y = t.canvasY, this.captureInput(!0), this.mouse_captured = !0, !0;
  }
  onMouseMove(t) {
    if (this.mouse_captured) {
      var e = this.old_y - t.canvasY;
      t.shiftKey && (e *= 10), (t.metaKey || t.altKey) && (e *= 0.1), this.old_y = t.canvasY;
      var s = this._remainder + e / Lt.pixels_threshold;
      this._remainder = s % 1, s = s | 0;
      var i = fe(
        this.properties.value + s * this.properties.step,
        this.properties.min,
        this.properties.max
      );
      this.properties.value = i, this.graph._version++, this.setDirtyCanvas(!0);
    }
  }
  onMouseUp(t, e) {
    if (t.click_time < 200) {
      var s = e[1] > this.size[1] * 0.5 ? -1 : 1;
      this.properties.value = fe(
        this.properties.value + s * this.properties.step,
        this.properties.min,
        this.properties.max
      ), this.graph._version++, this.setDirtyCanvas(!0);
    }
    this.mouse_captured && (this.mouse_captured = !1, this.captureInput(!1));
  }
};
let qe = Lt;
qe.slotLayout = {
  inputs: [],
  outputs: [
    { name: "", type: "number" }
  ]
};
qe.pixels_threshold = 10;
u.registerNodeType({
  class: qe,
  title: "Number",
  desc: "Widget to select number value",
  type: "widget/number"
});
class Dt extends C {
  constructor(e) {
    super(e), this.properties = {
      value: "A",
      values: "A;B;C"
    }, this.size = [80, 60], this.old_y = -1, this.mouse_captured = !1, this._values = [], this._values = this.properties.values.split(";"), this.widget = this.addWidget("combo", "", this.properties.value, (s) => {
      this.properties.value = s, this.triggerSlot(1, s);
    }, { property: "value", values: this._values }), this.widgets_up = !0;
  }
  onExecute() {
    this.setOutputData(0, this.properties.value);
  }
  onPropertyChanged(e, s) {
    e == "values" ? (this._values = s.split(";"), this.widget.options.values = this._values) : e == "value" && (this.widget.value = s);
  }
}
Dt.slotLayout = {
  inputs: [],
  outputs: [
    { name: "", type: "string" },
    { name: "change", type: O.EVENT }
  ]
};
u.registerNodeType({
  class: Dt,
  title: "Combo",
  desc: "Widget to select from a list",
  type: "widget/combo"
});
class Pt extends C {
  constructor() {
    super(...arguments), this.properties = {
      min: 0,
      max: 1,
      value: 0.5,
      color: "#7AF",
      precision: 2
    }, this.size = [130, 100], this.no_panel_on_double_click = !0, this.value = -1, this.oldmouse = null, this.center = null, this.radius = null;
  }
  computeSize() {
    return [130, 100];
  }
  onDrawForeground(e) {
    if (!this.flags.collapsed) {
      this.value == -1 && (this.value = (this.properties.value - this.properties.min) / (this.properties.max - this.properties.min));
      var s = this.size[0] * 0.5, i = this.size[1] * 0.5, n = Math.min(this.size[0], this.size[1]) * 0.5 - 5;
      e.globalAlpha = 1, e.save(), e.translate(s, i), e.rotate(Math.PI * 0.75), e.fillStyle = "rgba(0,0,0,0.5)", e.beginPath(), e.moveTo(0, 0), e.arc(0, 0, n, 0, Math.PI * 1.5), e.fill(), e.strokeStyle = "black", e.fillStyle = this.properties.color, e.lineWidth = 2, e.beginPath(), e.moveTo(0, 0), e.arc(
        0,
        0,
        n - 4,
        0,
        Math.PI * 1.5 * Math.max(0.01, this.value)
      ), e.closePath(), e.fill(), e.lineWidth = 1, e.globalAlpha = 1, e.restore(), e.fillStyle = "black", e.beginPath(), e.arc(s, i, n * 0.75, 0, Math.PI * 2, !0), e.fill(), e.fillStyle = this.mouseOver ? "white" : this.properties.color, e.beginPath();
      var r = this.value * Math.PI * 1.5 + Math.PI * 0.75;
      e.arc(
        s + Math.cos(r) * n * 0.65,
        i + Math.sin(r) * n * 0.65,
        n * 0.05,
        0,
        Math.PI * 2,
        !0
      ), e.fill(), e.fillStyle = this.mouseOver ? "white" : "#AAA", e.font = Math.floor(n * 0.5) + "px Arial", e.textAlign = "center", e.fillText(
        this.properties.value.toFixed(this.properties.precision),
        s,
        i + n * 0.15
      );
    }
  }
  onExecute() {
    this.setOutputData(0, this.properties.value), this.boxcolor = u.colorToString([
      this.value,
      this.value,
      this.value
    ]);
  }
  onMouseDown(e) {
    return this.center = [this.size[0] * 0.5, this.size[1] * 0.5 + 20], this.radius = this.size[0] * 0.5, e.canvasY - this.pos[1] < 20 || u.distance(
      [e.canvasX, e.canvasY],
      [this.pos[0] + this.center[0], this.pos[1] + this.center[1]]
    ) > this.radius ? !1 : (this.oldmouse = [e.canvasX - this.pos[0], e.canvasY - this.pos[1]], this.captureInput(!0), !0);
  }
  onMouseMove(e) {
    if (this.oldmouse) {
      var s = [e.canvasX - this.pos[0], e.canvasY - this.pos[1]], i = this.value;
      i -= (s[1] - this.oldmouse[1]) * 0.01, i > 1 ? i = 1 : i < 0 && (i = 0), this.value = i, this.recalcValue(), this.oldmouse = s, this.setDirtyCanvas(!0);
    }
  }
  recalcValue() {
    const e = this.properties.min + (this.properties.max - this.properties.min) * this.value;
    this.setProperty("value", e);
  }
  onMouseUp(e) {
    this.oldmouse && (this.oldmouse = null, this.captureInput(!1));
  }
  onPropertyChanged(e, s) {
    if (e == "min" || e == "max")
      return this.properties[e] = parseFloat(s), this.recalcValue(), !0;
    if (e == "value")
      return this.properties[e] = parseFloat(s), this.triggerSlot(1, s), !0;
  }
}
Pt.slotLayout = {
  inputs: [],
  outputs: [
    { name: "", type: "number" },
    { name: "", type: O.EVENT }
  ]
};
u.registerNodeType({
  class: Pt,
  title: "Knob",
  desc: "Circular controller",
  type: "widget/knob"
});
class Rt extends C {
  constructor(e) {
    super(e), this.properties = {
      value: 0.5,
      min: 0,
      max: 1,
      text: "V"
    }, this.size = [140, 40], this.slider = this.addWidget("slider", "V", this.properties.value, "value");
  }
  onPropertyChanged(e, s) {
    e == "value" && (this.slider.value = s, this.triggerSlot(1, s));
  }
  onExecute() {
    this.setOutputData(0, this.properties.value);
  }
}
Rt.slotLayout = {
  inputs: [],
  outputs: [
    { name: "", type: "number" },
    { name: "change", type: O.EVENT }
  ]
};
u.registerNodeType({
  class: Rt,
  title: "Inner Slider",
  desc: "Slider widget that outputs a number",
  type: "widget/internal_slider"
});
class Mt extends C {
  constructor() {
    super(...arguments), this.properties = {
      color: "#7AF",
      min: 0,
      max: 1,
      value: 0.5
    }, this.size = [160, 26], this.value = -1, this.oldmouse = null;
  }
  onDrawForeground(e) {
    this.value == -1 && (this.value = (this.properties.value - this.properties.min) / (this.properties.max - this.properties.min)), e.globalAlpha = 1, e.lineWidth = 1, e.fillStyle = "#000", e.fillRect(2, 2, this.size[0] - 4, this.size[1] - 4), e.fillStyle = this.properties.color, e.beginPath(), e.rect(4, 4, (this.size[0] - 8) * this.value, this.size[1] - 8), e.fill();
  }
  onExecute() {
    const e = this.properties.min + (this.properties.max - this.properties.min) * this.value;
    this.setProperty("value", e), this.setOutputData(0, this.properties.value), this.triggerSlot(1, this.properties.value), this.boxcolor = u.colorToString([
      this.value,
      this.value,
      this.value
    ]);
  }
  onMouseDown(e) {
    return e.canvasY - this.pos[1] < 0 ? !1 : (this.oldmouse = [e.canvasX - this.pos[0], e.canvasY - this.pos[1]], this.captureInput(!0), !0);
  }
  onMouseMove(e) {
    if (!this.oldmouse)
      return;
    const s = [e.canvasX - this.pos[0], e.canvasY - this.pos[1]];
    let i = this.value;
    const n = s[0] - this.oldmouse[0];
    i += n / this.size[0], i > 1 ? i = 1 : i < 0 && (i = 0), this.value = i, this.oldmouse = s, this.setDirtyCanvas(!0);
  }
  onMouseUp(e) {
    this.oldmouse = null, this.captureInput(!1);
  }
  onMouseLeave(e) {
  }
}
Mt.slotLayout = {
  inputs: [],
  outputs: [
    { name: "", type: "number" },
    { name: "", type: O.EVENT }
  ]
};
u.registerNodeType({
  class: Mt,
  title: "H.Slider",
  desc: "Linear slider controller",
  type: "widget/hslider"
});
class Ft extends C {
  constructor() {
    super(...arguments), this.properties = {
      color: "#7AF",
      min: 0,
      max: 1,
      value: 0.5
    }, this.size = [160, 26];
  }
  onExecute() {
    var e = this.getInputData(0);
    e != null && this.setProperty("value", e);
  }
  onDrawForeground(e) {
    e.lineWidth = 1, e.fillStyle = this.properties.color;
    var s = (this.properties.value - this.properties.min) / (this.properties.max - this.properties.min);
    s = Math.min(1, s), s = Math.max(0, s), e.fillRect(2, 2, (this.size[0] - 4) * s, this.size[1] - 4);
  }
}
Ft.slotLayout = {
  inputs: [
    { name: "", type: "number" }
  ],
  outputs: []
};
u.registerNodeType({
  class: Ft,
  title: "Progress",
  desc: "Shows data in linear progress",
  type: "widget/progress"
});
class Bt extends C {
  constructor() {
    super(...arguments), this.properties = {
      value: "...",
      font: "Arial",
      fontsize: 18,
      color: "#AAA",
      align: "left",
      glowSize: 0,
      decimals: 1
    }, this.str = "", this.last_ctx = null;
  }
  onDrawForeground(e) {
    e.fillStyle = this.properties.color;
    const s = this.properties.value;
    this.properties.glowSize ? (e.shadowColor = this.properties.color, e.shadowOffsetX = 0, e.shadowOffsetY = 0, e.shadowBlur = this.properties.glowSize) : e.shadowColor = "transparent";
    var i = this.properties.fontsize;
    if (e.textAlign = this.properties.align, e.font = i.toString() + "px " + this.properties.font, this.str = typeof s == "number" ? s.toFixed(this.properties.decimals) : s, typeof this.str == "string")
      for (var n = this.str.replace(/[\r\n]/g, "\\n").split("\\n"), r = 0; r < n.length; r++)
        e.fillText(
          n[r],
          this.properties.align == "left" ? 15 : this.size[0] - 15,
          i * -0.15 + i * (r + 1)
        );
    e.shadowColor = "transparent", this.last_ctx = e, e.textAlign = "left";
  }
  onExecute() {
    var e = this.getInputData(0);
    e != null && (this.properties.value = e);
  }
  resize() {
    if (this.last_ctx) {
      var e = this.str.split("\\n");
      this.last_ctx.font = this.properties.fontsize + "px " + this.properties.font;
      for (var s = 0, i = 0; i < e.length; i++) {
        var n = this.last_ctx.measureText(e[i]).width;
        s < n && (s = n);
      }
      this.size[0] = s + 20, this.size[1] = 4 + e.length * this.properties.fontsize, this.setDirtyCanvas(!0);
    }
  }
  onPropertyChanged(e, s) {
    return this.properties[e] = s, this.str = typeof s == "number" ? s.toFixed(3) : s, !0;
  }
}
Bt.slotLayout = {
  inputs: [
    { name: "", type: "*" }
  ],
  outputs: []
};
u.registerNodeType({
  class: Bt,
  title: "Text",
  desc: "Shows the input value",
  type: "widget/text"
});
class Gt extends C {
  constructor() {
    super(...arguments), this.properties = {
      borderColor: "#ffffff",
      bgcolorTop: "#f0f0f0",
      bgcolorBottom: "#e0e0e0",
      shadowSize: 2,
      borderRadius: 3
    }, this.size = [200, 100], this.lineargradient = null;
  }
  createGradient(e) {
    if (this.properties.bgcolorTop == "" || this.properties.bgcolorBottom == "") {
      this.lineargradient = null;
      return;
    }
    this.lineargradient = e.createLinearGradient(0, 0, 0, this.size[1]), this.lineargradient.addColorStop(0, this.properties.bgcolorTop), this.lineargradient.addColorStop(1, this.properties.bgcolorBottom);
  }
  onDrawForeground(e) {
    this.flags.collapsed || (this.lineargradient == null && this.createGradient(e), this.lineargradient && (e.lineWidth = 1, e.strokeStyle = this.properties.borderColor, e.fillStyle = this.lineargradient, this.properties.shadowSize ? (e.shadowColor = "#000", e.shadowOffsetX = 0, e.shadowOffsetY = 0, e.shadowBlur = this.properties.shadowSize) : e.shadowColor = "transparent", e.roundRect(
      0,
      0,
      this.size[0] - 1,
      this.size[1] - 1,
      this.properties.shadowSize
    ), e.fill(), e.shadowColor = "transparent", e.stroke()));
  }
}
Gt.slotLayout = {
  inputs: [],
  outputs: []
};
u.registerNodeType({
  class: Gt,
  title: "Panel",
  desc: "Non interactive panel",
  type: "widget/panel"
});
export {
  ke as ArrayElement,
  Qe as BASE_SLOT_TYPES,
  A as BuiltInSlotShape,
  O as BuiltInSlotType,
  be as ConstantBoolean,
  Oe as ConstantFile,
  He as ConstantInteger,
  Ie as ConstantJSON,
  Ce as ConstantNull,
  xe as ConstantNumber,
  Ee as ConstantObject,
  Te as ConstantString,
  j as ContextMenu,
  J as ContextMenuSpecialItem,
  Le as DelayEvent,
  L as Dir,
  Ht as DragAndScale,
  ht as EventBranch,
  Ve as FilterEvent,
  De as FrameDelayEvent,
  Se as GenericCompare,
  Q as GraphInput,
  ee as GraphOutput,
  We as IsNull,
  Nt as JSONParse,
  It as JSONStringify,
  z as LConnectionKind,
  nt as LGraph,
  N as LGraphCanvas,
  _e as LGraphCanvas_Events,
  U as LGraphCanvas_Rendering,
  k as LGraphCanvas_UI,
  me as LGraphGroup,
  C as LGraphNode,
  jt as LGraphStatus,
  Kt as LINK_RENDER_MODE_NAMES,
  he as LLink,
  ue as LayoutDirection,
  de as LinkRenderMode,
  u as LiteGraph,
  we as LogEvent,
  Ct as LogicAnd,
  At as LogicNot,
  kt as LogicOr,
  je as LogicTruthy,
  gt as MathApproxEq,
  dt as MathFloor,
  Ye as MathOperation,
  Ke as NODE_MODE_COLORS,
  oe as NODE_MODE_NAMES,
  Z as NodeMode,
  ze as Reroute,
  Je as SLOT_SHAPE_NAMES,
  pt as Sequence,
  Ae as SetArray,
  vt as StringCompare,
  yt as StringConcatenate,
  mt as StringContains,
  Tt as StringSplit,
  Xe as StringTemplate,
  Et as StringToFixed,
  Ot as StringToTable,
  bt as StringToUpperCase,
  re as Subgraph,
  Ue as Time,
  se as TitleMode,
  _t as ToString,
  lt as TriggerEvent,
  Ne as Watch,
  St as WidgetButton,
  Dt as WidgetCombo,
  Mt as WidgetHSlider,
  Pt as WidgetKnob,
  qe as WidgetNumber,
  Gt as WidgetPanel,
  Ft as WidgetProgress,
  Rt as WidgetSliderGUI,
  Bt as WidgetText,
  wt as WidgetToggle,
  ct as WrapAsEvent,
  fe as clamp,
  $ as getLitegraphTypeName,
  tt as getSlotTypesIn,
  Yt as getSlotTypesInFormatted,
  st as getSlotTypesOut,
  Xt as getSlotTypesOutFormatted,
  Ze as getStaticProperty,
  Re as getStaticPropertyOnInstance,
  et as isValidLitegraphType,
  Fe as makeDraggable,
  rt as reassignGraphIDs,
  ye as toHashMap
};
