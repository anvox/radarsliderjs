var RadarSlider = RadarSlider || {};
RadarSlider.RadarDefaultRenderer = function(options, theme){
  this._options = options;
  this._theme = theme;
  this._paper = Raphael(options.element_id,options.canvas.width,options.canvas.height);
  this.draw_board = function(){
    center_point = options.center_point;

    for (var i = 0; i < options.scale.length; i++) {
      cir = this._paper.circle(center_point.x, center_point.y, options.scale[i])
        .attr("stroke", this._theme.board.stroke.color);

      if(this._theme.board.glow != undefined){
        cir.glow({color: this._theme.board.glow.color, width: this._theme.board.glow.size});
      }
    };

    for (var i = 0; i < options.criteria.length; i++) {
      line = this._paper.path("M" + options.criteria[i][0][0] + " " + options.criteria[i][0][1] + 
        "L" +  options.criteria[i][options.criteria[i].length -1 ][0] + " " + options.criteria[i][options.criteria[i].length -1 ][1]);

      if(this._theme.board.glow != undefined){
        line.glow({color: this._theme.board.glow.color, width: this._theme.board.glow.size});
      }
    };

    for (var i = 0; i < options.criteria.length; i++) {
      for (var j = 0; j < options.criteria[i].length; j++) {
        cir = this._paper.circle(options.criteria[i][j][0], options.criteria[i][j][1], this._theme.board.point_size)
          .attr("stroke", this._theme.board.stroke.color)
          .attr("fill", this._theme.board.stroke.color);
        if(this._theme.board.glow != undefined){
          cir.glow({color: this._theme.board.glow.color, width: this._theme.board.glow.size});
        }
      };
    };
  };
  this.draw_board();

  this._radar_path = null;
  this.draw_radar = function(){
    p = "";
    for (var i = 0; i < options.values.length; i++) {
      p = p + "L" + options.values[i][0] + " " + options.values[i][1];
    };
    this._radar_path = this._paper.path("M" + options.values[options.values.length - 1][0] + " " + options.values[options.values.length - 1][1] + p)
      .attr("stroke", this._theme.radar.area.stroke)
      .attr("fill", this._theme.radar.area.stroke)
      .attr({'fill-opacity': this._theme.radar.area.opacity});
  };
  this.draw_radar();

  this._slide_pointers = [];
  this.draw_radar_points = function(){
    for (var i = 0; i < options.values.length; i++) {
      circle = this._paper.circle(options.values[i][0], options.values[i][1], 6)
        .attr("stroke", this._theme.radar.point.stroke)
        .attr("fill", this._theme.radar.point.color);
      circle._radar_index = i;
      circle.toFront();
      this._slide_pointers[i] = circle;

      var onMove = function(dx,dy, mx, my) {
      };

      circle.drag(RadarSlider.RadarDefaultRenderer.DragDrop_handlers.onMove, RadarSlider.RadarDefaultRenderer.DragDrop_handlers.onStart, RadarSlider.RadarDefaultRenderer.DragDrop_handlers.onEnd);
    };
  };
  this.draw_radar_points();
}

RadarSlider.RadarDefaultRenderer.DragDrop_handlers = {
  onStart: function(){
    i = this._radar_index;
    // this._controller;

    // this.attr("cx", this._controller._options.values[i][0]);
    // this.attr("cy", this._controller._options.values[i][1]);
  },
  onMove: function(){
    i = this._radar_index;
    // this._controller;

    // n_x = current_points[i][0] + dx;
    // n_y = current_points[i][1] + dy;

    // // Find nearest value

    // next = RadarSlider.Utils.get_nearest_point(radar_option.criteria[i], [mx, my]);
    // n_x = next[0];
    // n_y = next[1];

    // this.attr("cx", n_x);
    // this.attr("cy", n_y);

    // shift_points[i] = [dx,dy];

    // p = ""
    // for (var j = 0; j < current_points.length; j++) {
    //   if(i == j){
    //     p = p + "L" + (n_x) + " " + (n_y)
    //   }else{
    //     p = p + "L" + (current_points[j][0] + shift_points[j][0]) + " " + (current_points[j][1] + shift_points[j][1])
    //   }
    // };
    // path.remove();
    // if(i == 4){
    //   path = paper.path("M" + (n_x) + " " + (n_y) + p).attr("stroke", "#88f").attr("fill","#88f").attr({'fill-opacity':0.4});
    // }else{
    //   path = paper.path("M" + current_points[4][0] + " " + current_points[4][1] + p)
    //     .attr("stroke", "#88f")
    //     .attr("fill","#88f")
    //     .attr({'fill-opacity':0.3});
    // }
  },
  onEnd: function(){
    i = this._radar_index;

    // this._controller._options.values[i][0] = this.attr("cx");
    // this._controller._options.values[i][1] = this.attr("cy");
    // shift_points[i] = [0,0];

    // for (var l = 0; l < slide_pointers.length; l++) {
    //   slide_pointers[l].toFront();
    // };
  }
};
