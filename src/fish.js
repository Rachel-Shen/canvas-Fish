var FISH_SIZE=[
  	null,
  	{w: 55, h: 37, collR: 17},
  	{w: 78, h: 64, collR: 24},
  	{w: 72, h: 56, collR: 20},
  	{w: 77, h: 59, collR: 22},
  	{w: 107, h: 122, collR: 29}
];
function Fish(type){
  	this.type=type||1;
  	this.x=0;
  	this.y=0;
  	this.cur=0;
  	this.rotate=0;
  	this.iSpeed=1;
  	this.collR=FISH_SIZE[this.type].collR;
    this.time1=null;
    this.time2=null;

  	this.move();
}
Fish.prototype.draw=function(gd){
  	var w=FISH_SIZE[this.type].w;
  	var h=FISH_SIZE[this.type].h;
  	gd.save();
  	gd.translate(this.x,this.y);
  	gd.rotate(d2a(this.rotate));
  	if(this.rotate>90 && this.rotate<270){//保证投影靠下
    	gd.scale(1,-1);
  	}
  	gd.drawImage(JSON['fish'+this.type],
   		0,this.cur*h,w,h,
    	-w/2,-h/2,w,h
  	);
  	gd.restore();
};
Fish.prototype.move=function(){
  	//向前走
  	var _this=this;
  	this.time1=setInterval(function(){
    	_this.x+=Math.cos(d2a(_this.rotate))*_this.iSpeed;
    	_this.y+=Math.sin(d2a(_this.rotate))*_this.iSpeed;
  	},30);

  	//尾巴摆动
  	this.time2=setInterval(function(){
    	this.cur++;
    	if(this.cur==4){
      		this.cur=0;
    	}
  	}.bind(this),250);
};
Fish.prototype.isIn=function(x,y){
  	var a=this.x-x;
  	var b=this.y-y;
  	var c=Math.sqrt(a*a+b*b);
  	if(c<this.collR){
    	return true;
  	}else{
    	return false;
  	}
}
Fish.prototype.clear=function(){
    clearInterval(this.timer1);
    clearInterval(this.timer2);
}