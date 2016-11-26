SliderModel = function(){
  this.initialize = function(min_value, max_value, step, criteria, init_values){
    this.criteria = criteria;
    this.min = min_value;
    this.max = max_value;
    this.step = step;
    this.values = [];

    for (var i = 0; i < criteria.length; i++) {
      this.values.push(this.min);
    };

    if(init_values != null & init_values != undefined){
      for (var i = 0; i < init_values.length; i++) {
        this.values[i] = init_values[i];
      };
    };

    return this;
  };

  return this;
}
module.exports = SliderModel
