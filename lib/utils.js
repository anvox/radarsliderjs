var math = require('mathjs');
RadarSliderUtils = {
  get_nearest_point: function(pool, point){
    var m = math.distance(pool[0],point);
    var i_min = 0;
    for (var k = 1; k < pool.length; k++) {
      var d = math.distance(pool[k],point);
      if(d < m){
        m = d;
        i_min = k;
      }
    };
    return pool[i_min];
  }
};

module.exports = RadarSliderUtils
