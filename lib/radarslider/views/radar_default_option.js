var RadarSlider = RadarSlider || {};
RadarSlider.RadarDefaultOption = function(model){
  this.element_id = "canvas";
  this.num_criteria = model.criteria.length;
  this.canvas = {
    width: 400,
    height: 400
  };
  this.center_point = {
    x: 200,
    y: 200
  };

  this.build_default_current_points = function(){
    points = [];
    for (var i = 0; i < this.num_criteria; i++) {
      points.push([0,0]);
    };
    return points;
  };
  this.build_default_shift_points = function(){
    points = [];
    for (var i = 0; i < this.num_criteria; i++) {
      points.push([0,0]);
    };
    return points;
  };

  this.scale = [];
  for (var i = model.min; i <= model.max; i+=model.step) {
    this.scale.push(i);
  };
  root_radius = 20;
  space = 40;
  for (var i = 0; i < this.scale.length; i++) {
    this.scale[i] = root_radius + space*i;
  };

  this.criteria = [];
  angle_space = 360/this.num_criteria;
  for (var i = 0; i < this.num_criteria; i++) {
    angle = i * angle_space;
    point_map = [];
    for (var j = 0; j < this.scale.length; j++) {
      radius = root_radius + space*j;
      x = this.center_point.x + math.eval(radius + ' * cos(' + angle + ' deg)');
      y = this.center_point.y - math.eval(radius + ' * sin(' + angle + ' deg)');

      point_map.push([x,y]);
    };

    this.criteria[i] = point_map;
  };
}
