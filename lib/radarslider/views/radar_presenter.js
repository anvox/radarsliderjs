/*
 * RadarSlider.RadarPresenter
 * This class calculates points to draw
 */
var RadarSlider = RadarSlider || {};
RadarSlider.RadarPresenter = function(controller){
  this.initialize = function(controller){
    this._controller = controller;

    model = this._controller._model;
    options = this._controller._options;

    this._center_point = {
      x: options._canvas.width/2,
      y: options._canvas.height/2
    };

    root_radius = 20;
    padding = 10;
    space = (options._canvas.width/2 - root_radius - padding)/(Math.round((model.max-model.min)/model.step)+1);

    this.init_scale();
    this.init_root_radius();
    this.init_criteria();
    this.init_values();
  };
  this.build_default_current_points = function(){
    points = [];
    for (var i = 0; i < model.criteria.length; i++) {
      points.push([0,0]);
    };
    return points;
  };
  this.build_default_shift_points = function(){
    points = [];
    for (var i = 0; i < model.criteria.length; i++) {
      points.push([0,0]);
    };
    return points;
  };
  this.init_scale = function(){
    this._scale = [];
    for (var i = model.min; i <= model.max; i+=model.step) {
      this._scale.push(i);
    };
  };
  this.init_root_radius = function() {
    for (var i = 0; i < this._scale.length; i++) {
      this._scale[i] = root_radius + space*i;
    };
  };
  this.init_criteria = function(){
    this._criteria = [];
    angle_space = 360/(model.criteria.length);
    for (var i = 0; i < (model.criteria.length); i++) {
      angle = i * angle_space;
      point_map = [];
      for (var j = 0; j < this._scale.length; j++) {
        radius = root_radius + space*j;
        x = this._center_point.x + math.eval(radius + ' * cos(' + angle + ' deg)');
        y = this._center_point.y - math.eval(radius + ' * sin(' + angle + ' deg)');

        point_map.push([x,y]);
      };

      this._criteria[i] = point_map;
    };
  };
  this.init_values = function(){
    this._values = [];
    for (var i = 0; i < model.values.length; i++) {
      r = root_radius + model.values[i]*space;
      angle = i * angle_space;
      x = this._center_point.x + math.eval(r + ' * cos(' + angle + ' deg)')
      y = this._center_point.y - math.eval(r + ' * sin(' + angle + ' deg)')

      this._values[i] = [x,y];
    };
  };

  this.initialize(controller);

}