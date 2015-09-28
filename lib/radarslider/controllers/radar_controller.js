var RadarSlider = RadarSlider || {};
RadarSlider.RadarController = function(model, theme){
  this._model = model;
  if(theme == null || theme == undefined){
    theme = new RadarSlider.RadarDefaultTheme();
  }
  this._theme = theme;
  this._options = new RadarSlider.RadarDefaultOption(this._model);
  this._presenter = new RadarSlider.RadarPresenter(this);
  this._renderer = new RadarSlider.RadarDefaultRenderer(this._options, this._theme, this);
};