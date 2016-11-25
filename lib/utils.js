/*
 * TODO: USE MATH LIB FOR THIS !!!
 * http://mathjs.org/docs/reference/functions/distance.html
 */
RadarSliderUtils = {
  distance: function(p1,p2){
    return Math.sqrt((p1[0] - p2[0])*(p1[0] - p2[0]) + (p1[1] - p2[1])*(p1[1] - p2[1]));
  },
  get_nearest_point: function(pool, point){
    var m = RadarSlider.Utils.distance(pool[0],point);
    var i_min = 0;
    for (var k = 1; k < pool.length; k++) {
      var d = RadarSlider.Utils.distance(pool[k],point);
      if(d < m){
        m = d;
        i_min = k;
      }
    };
    return pool[i_min];
  }
};

module.exports = RadarSliderUtils
