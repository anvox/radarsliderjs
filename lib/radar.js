var Rapahel = require('raphael');
var utils = require('./utils');
var Model = require('./model');
var Presenter = require('./presenter');
var default_options = require('./models');
var default_theme = require('./models');

RadarDefaultRenderer = {
  initialize: function(data, theme = {}, options = {}){
    /*
     * Initialize variables
     */
    this._options = default_options.extend(options);
    this._theme = default_theme.extend(theme);

    this._model = Model.initialize(data);
    this._presenter = Presenter.initialize(model, this._options);
    /*
     * Initialize function
     */
    draw_board = function(){
      center_point = this._presenter._center_point;

      for (var i = 0; i < this._presenter._scale.length; i++) {
        cir = this._paper.circle(center_point.x, center_point.y, this._presenter._scale[i])
          .attr("stroke", this._theme.board.stroke.color);

        if(this._theme.board.glow != undefined){
          cir.glow({color: this._theme.board.glow.color, width: this._theme.board.glow.size});
        }
      };

      for (var i = 0; i < this._presenter._criteria.length; i++) {
        line = this._paper.path("M" + this._presenter._criteria[i][0][0] + " " + this._presenter._criteria[i][0][1] + 
          "L" +  this._presenter._criteria[i][this._presenter._criteria[i].length -1 ][0] + " " + this._presenter._criteria[i][this._presenter._criteria[i].length -1 ][1]);

        if(this._theme.board.glow != undefined){
          line.glow({color: this._theme.board.glow.color, width: this._theme.board.glow.size});
        }
      };

      for (var i = 0; i < this._presenter._criteria.length; i++) {
        for (var j = 0; j < this._presenter._criteria[i].length; j++) {
          cir = this._paper.circle(this._presenter._criteria[i][j][0], this._presenter._criteria[i][j][1], this._theme.board.point_size)
            .attr("stroke", this._theme.board.stroke.color)
            .attr("fill", this._theme.board.stroke.color);
          if(this._theme.board.glow != undefined){
            cir.glow({color: this._theme.board.glow.color, width: this._theme.board.glow.size});
          }
        };
      };
    };

    draw_radar = function(){
      if(this._radar_path != null) { this._radar_path.remove(); };
      p = "";
      for (var i = 0; i < this._presenter._values.length; i++) {
        p = p + "L" + this._presenter._values[i][0] + " " + this._presenter._values[i][1];
      };
      this._radar_path = this._paper.path("M" + this._presenter._values[this._presenter._values.length - 1][0] + " " + this._presenter._values[this._presenter._values.length - 1][1] + p)
        .attr("stroke", this._theme.radar.area.stroke)
        .attr("fill", this._theme.radar.area.color)
        .attr({'fill-opacity': this._theme.radar.area.opacity});
      for (var i = 0; i < this._slide_pointers.length; i++) {
        this._slide_pointers[i].toFront();
      }
    };

    draw_radar_points = function(){
      for (var i = 0; i < this._presenter._values.length; i++) {
        circle = this._paper.circle(this._presenter._values[i][0], this._presenter._values[i][1], 6)
          .attr("stroke", this._theme.radar.point.stroke)
          .attr("fill", this._theme.color_set[i]);
        circle._radar_index = i;
        circle._controller = this._controller;
        circle.toFront();
        this._slide_pointers[i] = circle;

        // circle.drag(RadarSlider.RadarDefaultRenderer.DragDrop_handlers.onMove, RadarSlider.RadarDefaultRenderer.DragDrop_handlers.onStart, RadarSlider.RadarDefaultRenderer.DragDrop_handlers.onEnd);
        // circle.mouseover(RadarSlider.RadarDefaultRenderer.Hover_handlers.onMouseover);
        // circle.mouseout(RadarSlider.RadarDefaultRenderer.Hover_handlers.onMouseout);
        // circle.mouseup(RadarSlider.RadarDefaultRenderer.Hover_handlers.onMouseup);
        // circle.mousedown(RadarSlider.RadarDefaultRenderer.Hover_handlers.onMousedown);
      };
    };

    draw_legend = function(){
      content = '';
      for (var i = 0; i < this._presenter._labels.length; i++) {
        item = '<div style="display:inline-block;float:left;"><span style="border:solid 1px '+'#444'+'; background-color:'+this._theme.color_set[i]+';">&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;'+this._presenter._labels[i]+' &nbsp;&nbsp;</div>'
        content = content + item;
      }
      document.getElementById(this._options._legend_element_id).innerHTML = content;
    };

     /*
      * Trigger function
      */
    this._paper = Raphael(this._options.placeholder_element_id,
                          this._options.canvas.width,
                          this._options.canvas.height);
    this._tooltip = this._paper.text(10,10,"lipsum")
      .attr({
        'text-anchor': 'start',
        'font-size': 12,
        'fill': '#ffffff'
      }).hide();
    this._tooltip_box = this._paper.rect(0,0,10,10).attr({
      'stroke': '#000',
      'fill': '#555'
    }).hide();

    draw_board();

    this._slide_pointers = [];
    draw_radar_points();

    this._radar_path = null;
    draw_radar();

    if(this._options._is_draw_legend){
      draw_legend();
    };
  }
};

// RadarSlider.RadarDefaultRenderer.DragDrop_handlers = {
//   onStart: function(){
//     i = this._radar_index;

//     this.attr("cx", this._controller._presenter._values[i][0]);
//     this.attr("cy", this._controller._presenter._values[i][1]);

//     tooltip = this._controller._renderer._tooltip;
//     tooltip._dragging = true;
//   },
//   onMove: function(dx, dy, mx, my){
//     i = this._radar_index;

//     // Find nearest value
//     next = utils.get_nearest_point(this._controller._presenter._criteria[i], [mx, my]);
//     n_x = next[0];
//     n_y = next[1];

//     this.attr("cx", n_x);
//     this.attr("cy", n_y);

//     this._controller._presenter._values[i][0] = n_x;
//     this._controller._presenter._values[i][1] = n_y;

//     this._controller._renderer.draw_radar();

//     i = this._radar_index;
//     tooltip = this._controller._renderer._tooltip;
//     tooltip_box = this._controller._renderer._tooltip_box;
//     tooltip.attr("text",this._controller._presenter._labels[i]);
//     tooltip.attr("x",mx + 4);
//     tooltip.attr("y",my + 18);

//     bbox = tooltip.getBBox();
//     tooltip_box.attr("x",bbox.x - 1);
//     tooltip_box.attr("y",bbox.y - 1);
//     tooltip_box.attr("width",bbox.width + 2);
//     tooltip_box.attr("height",bbox.height + 2);

//     if(mx + 4 + bbox.width + 2 > 500){
//       tooltip.attr("x", 500 - bbox.width - 2);
//       tooltip_box.attr("x", 500 - bbox.width - 2);
//     }

//     tooltip_box.toFront().show();
//     tooltip.toFront().show();
//   },
//   onEnd: function(){
//     i = this._radar_index;

//     for (var l = 0; l < this._controller._renderer._slide_pointers.length; l++) {
//       this._controller._renderer._slide_pointers[l].toFront();
//     };

//     tooltip = this._controller._renderer._tooltip;
//     tooltip_box = this._controller._renderer._tooltip_box;
//     tooltip._dragging = false;
//     tooltip.hide();
//     tooltip_box.hide();
//   }
// };
// RadarSlider.RadarDefaultRenderer.Hover_handlers = {
//   onMouseover: function(e){
//     i = this._radar_index;
//     tooltip = this._controller._renderer._tooltip;
//     tooltip_box = this._controller._renderer._tooltip_box;
//     tooltip.attr("text",this._controller._presenter._labels[i]);
//     tooltip.attr("x",e.clientX + 4);
//     tooltip.attr("y",e.clientY + 18);

//     bbox = tooltip.getBBox();
//     tooltip_box.attr("x",bbox.x - 1);
//     tooltip_box.attr("y",bbox.y - 1);
//     tooltip_box.attr("width",bbox.width + 2);
//     tooltip_box.attr("height",bbox.height + 2);

//     if(e.clientX + 4 + bbox.width + 2 > 500){
//       tooltip.attr("x", 500 - bbox.width - 2);
//       tooltip_box.attr("x", 500 - bbox.width - 2);
//     }

//     tooltip_box.toFront().show();
//     tooltip.toFront().show();
//   },
//   onMouseout: function(){
//     tooltip = this._controller._renderer._tooltip;
//     tooltip_box = this._controller._renderer._tooltip_box;
//     if(tooltip._dragging == false || tooltip._dragging == undefined){
//       tooltip.hide();
//       tooltip_box.hide();
//     }
//   }
// };

module.exports = RadarDefaultRenderer
