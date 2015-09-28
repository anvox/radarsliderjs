var RadarSlider = RadarSlider || {};
RadarSlider.RadarPresenter = function(controller){
  this._controller = controller;

  model = this._controller._model;
  options = this._controller._options;

  this._scale = [];
  for (var i = model.min; i <= model.max; i+=model.step) {
    this._scale.push(i);
  };

  root_radius = 20;
  space = 40;
  for (var i = 0; i < this._scale.length; i++) {
    this._scale[i] = root_radius + space*i;
  };

  this._criteria = [];
  angle_space = 360/(model.criteria.length);
  for (var i = 0; i < (model.criteria.length); i++) {
    angle = i * angle_space;
    point_map = [];
    for (var j = 0; j < this._scale.length; j++) {
      radius = root_radius + space*j;
      x = options.center_point.x + math.eval(radius + ' * cos(' + angle + ' deg)');
      y = options.center_point.y - math.eval(radius + ' * sin(' + angle + ' deg)');

      point_map.push([x,y]);
    };

    this._criteria[i] = point_map;
  };

  this._values = [];
  for (var i = 0; i < model.values.length; i++) {
    r = root_radius + model.values[i]*space;
    angle = i * angle_space;
    x = options.center_point.x + math.eval(r + ' * cos(' + angle + ' deg)')
    y = options.center_point.y - math.eval(r + ' * sin(' + angle + ' deg)')

    this._values[i] = [x,y];
  };

}