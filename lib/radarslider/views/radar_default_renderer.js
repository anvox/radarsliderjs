var RadarSlider = RadarSlider || {};
RadarSlider.RadarDefaultRenderer = function(options, theme){
  this._paper = Raphael(options.element_id,options.canvas.width,options.canvas.height);
  this.draw_board = function(){
    center_point = options.center_point;

    for (var i = 0; i < options.scale.length; i++) {
      cir = this._paper.circle(center_point.x, center_point.y, options.scale[i])
        .attr("stroke", theme.board.stroke.color);

      if(theme.board.glow != undefined){
        cir.glow({color: theme.board.glow.color, width: theme.board.glow.size});
      }
    };

    for (var i = 0; i < options.criteria.length; i++) {
      line = this._paper.path("M" + options.criteria[i][0][0] + " " + options.criteria[i][0][1] + "L" +  options.criteria[i][4][0] + " " + options.criteria[i][4][1]);

      if(theme.board.glow != undefined){
        line.glow({color: theme.board.glow.color, width: theme.board.glow.size});
      }
    };

    for (var i = 0; i < options.criteria.length; i++) {
      for (var j = 0; j < options.criteria[i].length; j++) {
        options.criteria[i][j]
        this._paper.circle(options.criteria[i][j][0], options.criteria[i][j][1], radar_theme.board.point_size).attr("stroke", "#000").attr("fill", "#000");
      };
    };
  };
  this.draw_board();
}