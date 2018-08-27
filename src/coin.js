function Coin(type){
  this.type=type;
  this.x=0;
  this.y=0;
  this.cur=0;
  this.scale=1;
  this.timer=null;
  this.move();
}
Coin.prototype.draw=function(gd){
  gd.save();
  gd.translate(this.x,this.y);
  gd.scale(this.scale,this.scale);
  switch (this.type){
    case 1:
    case 2:
      gd.drawImage(JSON['coinAni1'],
        0,this.cur*60,60,60,
        -30,-30,60,60
      );
      break;
    case 3:
    case 4:
    case 5:
      gd.drawImage(JSON['coinAni2'],
        0,this.cur*60,60,60,
        -30,-30,60,60
      );
      break;
  }
  gd.restore();
};
Coin.prototype.move=function(){
  var _this=this;

  //转
  this.timer=setInterval(function(){
    _this.cur++;
    if(_this.cur==10){
      _this.cur=0;
    }
  },30);

  //收钱
  var movetimer=setInterval(function(){
    _this.x+=(0-_this.x)/10;
    _this.y+=(600-_this.y)/10;
    _this.scale-=0.05;
    if(_this.scale<0){
      clearInterval(movetimer);
      clearInterval(this.timer);
    }
  },80);
};
Coin.prototype.playSong=function(){
  var oA=new Audio();
  oA.src='snd/coin.wav';
  oA.play();
};