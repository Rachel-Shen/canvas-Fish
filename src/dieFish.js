var DIE_FISH_SIZE=[
  null,
  {w: 55, h: 37},
  {w: 78, h: 64},
  {w: 72, h: 56},
  {w: 77, h: 59},
  {w: 107, h: 122}
];
function DieFish(type){
  this.type=type||1;
  this.x=0;
  this.y=0;
  this.cur=0;
  this.rotate=0;
  this.move();
  this.clear=false;//是否被清除从数组里面
}
DieFish.prototype.draw=function(gd){
  var w=DIE_FISH_SIZE[this.type].w;
  var h=DIE_FISH_SIZE[this.type].h;
  gd.save();
  //...
  gd.translate(this.x,this.y);
  gd.rotate(d2a(this.rotate));
  if(this.rotate>90 && this.rotate<270){//保证投影靠下
    gd.scale(1,-1);
  }
  gd.drawImage(JSON['fish'+this.type],
    0,4*h+this.cur*h,w,h,
    -w/2,-h/2,w,h
  );
  gd.restore();
};
DieFish.prototype.move=function(){
  var timer=setInterval(function(){
    this.cur++;
    if(this.cur==4){
      this.cur=0;
    }
    if(this.clear){
      clearInterval(timer);
    }
  }.bind(this),250);
};