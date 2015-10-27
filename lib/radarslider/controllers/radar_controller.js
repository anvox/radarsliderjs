var RadarSlider = RadarSlider || {};
RadarSlider.RadarController = function(model, theme){
  this._model = model;
  if(theme == null || theme == undefined){
    theme = RadarSlider.RadarDefaultTheme;
  }
  this._theme = theme;
  this._options = new RadarSlider.RadarDefaultOption();
  this._presenter = new RadarSlider.RadarPresenter(this);
  this._renderer = new RadarSlider.RadarDefaultRenderer(this);
};