var WEB_SIZE=[
    null,
    {x: 334, y: 374, w: 86, h: 86},
    {x: 16, y: 412, w: 108, h: 108},
    {x: 176, y: 372, w: 130, h: 124},
    {x: 258, y: 198, w: 146, h: 146},
    {x: 0, y: 246, w: 164, h: 152},
    {x: 242, y: 0, w: 180, h: 180},
    {x: 22, y: 22, w: 200, h: 200}
];
function Web(type){
  this.type=type;
  this.x=0;
  this.y=0;
  this.scale=1;
  this.timer=null;
  this.move();
}
Web.prototype.draw=function(gd){
  var x=WEB_SIZE[this.type].x;
  var y=WEB_SIZE[this.type].y;
  var w=WEB_SIZE[this.type].w;
  var h=WEB_SIZE[this.type].h;
  gd.save();
  gd.translate(this.x,this.y);
  gd.scale(this.scale,this.scale);
  gd.drawImage(JSON['web'],
    x,y,w,h,
    -w/2,-h/2,w,h
  );
  gd.restore();
};
Web.prototype.move=function(){
  var _this=this;
  this.timer=setInterval(function(){
    _this.scale+=0.01;
  },30);
};
Web.prototype.clear=function(){
  clearInterval(this.timer)
};