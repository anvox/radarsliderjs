var RadarSlider = RadarSlider || {};
RadarSlider.RadarController = function(model, theme){
  this._model = model;
  this._theme = theme;
  this._options = new RadarSlider.RadarDefaultOption(this._model);
  this._renderer = new RadarSlider.RadarDefaultRenderer(this._options, this._theme);
};