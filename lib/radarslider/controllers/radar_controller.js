var RadarSlider = RadarSlider || {};
RadarSlider.RadarController = function(model, theme, options){
  this._model = model;

  if(theme == null || theme == undefined){
    theme = RadarSlider.RadarDefaultTheme;
  }
  this._theme = theme;

  if(options == null || options == undefined){
    options = RadarSlider.RadarDefaultOption;
  }
  this._options = options;

  this._presenter = new RadarSlider.RadarPresenter(this);
  this._renderer = new RadarSlider.RadarDefaultRenderer(this);
};