var resource=[
    'fish1','fish2','fish3','fish4','fish5',
    'bottom','bullet','cannon1','cannon2','cannon3',
    'cannon4','cannon5','cannon6','cannon7','coinAni1',
    'coinAni2','coinText','number_black','shark1','shark2',
    'web'
    ];
window.onload = function () {
    var oC=document.querySelector('canvas');
    var gd=oC.getContext('2d');

    loadImage(resource,init);
    function init(){
      var width=0;
      var c=new Cannon();
    	var arrFish=[];
      var arrBullet=[];
      var arrWeb=[];
      var arrDieFish=[];
      var arrCoin=[];
    	var rule=0.02;
    	setInterval(function(){
        	gd.clearRect(0,0,oC.width,oC.height);
        	//出鱼规则
        	if(Math.random()<rule){
            if(Math.random()<0.5){
              	var f1=new Fish(rnd(1,6));
              	f1.x=-50;
              	f1.y=rnd(100,oC.height-100);
              	f1.rotate=rnd(-45,45);
              	arrFish.push(f1);
            }else{
              	var f1=new Fish(rnd(1,6));
              	f1.x=oC.width+50;
              	f1.y=rnd(100,oC.height-100);
              	f1.rotate=rnd(135,225);
              	arrFish.push(f1);
            }
        	}

          //炮台
          gd.drawImage(JSON['bottom'],
            0,0,765,72,
            0,oC.height-70,765,72
          );

          //绘制分数条
          gd.drawImage(JSON['bottom'],
            0,104,width,18,
            543,oC.height-25,width,18
          );

          //绘制按钮（-）
          gd.drawImage(JSON['bottom'],
            90,76,40,28,
            340,oC.height-30,40,28
          );

          //绘制按钮（+）
          gd.drawImage(JSON['bottom'],
            0,76,40,28,
            480,oC.height-30,40,28
          );

          //绘制炮筒
          c.draw(gd);

        	//绘制鱼
        	for(var i=0;i<arrFish.length;i++){
          	arrFish[i].draw(gd);
        	}

          //绘制炮弹
          for(var i=0;i<arrBullet.length;i++){
            arrBullet[i].draw(gd);
          }

          //绘制网
          for(var i=0;i<arrWeb.length;i++){
            arrWeb[i].draw(gd);
          }

          //绘制挣扎鱼
          for(var i=0;i<arrDieFish.length;i++){
            arrDieFish[i].draw(gd);
          }

          //绘金币
          for(var i=0;i<arrCoin.length;i++){
            arrCoin[i].draw(gd);
          }

          //拿掉画布外的角色
          for(var i=0;i<arrBullet.length;i++){
            if(arrBullet[i].x<-50||arrBullet[i].x>oC.width+50||arrBullet[i].y<-50||arrBullet[i].y>oC.height+50){
              arrBullet[i].clear();
              arrBullet.splice(i--,1);
            }
          }
          for(var i=0;i<arrFish.length;i++){
            if(arrFish[i].x<-50||arrFish[i].x>oC.width+50||arrFish[i].y<-50||arrFish[i].y>oC.height+50){
              arrFish[i].clear();
              arrFish.splice(i--,1);
            }
          }

          //检测碰撞
          for(var i=0;i<arrFish.length;i++){
            for(var j=0;j<arrBullet.length;j++){
              if(arrFish[i].isIn(arrBullet[j].x,arrBullet[j].y)){
                var type=arrFish[i].type;
                var x=arrFish[i].x;
                var y=arrFish[i].y;
                var rotate=arrFish[i].rotate;

                // //鱼要死
                arrFish[i].clear()
                arrFish.splice(i,1);
                i--;

                // //炮弹要死
                arrBullet[j].clear()
                arrBullet.splice(j,1);
                j--;

                //生成网
                var web=new Web(c.type);
                web.x=x;
                web.y=y;
                arrWeb.push(web);

                //出金币
                var coin = new Coin(type);
                coin.x=x;
                coin.y=y;
                coin.playSong();
                arrCoin.push(coin);

                //生成挣扎鱼
                var diefish=new DieFish(type);
                diefish.x=x;
                diefish.y=y;
                diefish.rotate=rotate;
                arrDieFish.push(diefish);

                //加分
                width++
                gd.drawImage(JSON['bottom'],
                  0,104,width,18,
                  543,oC.height-25,width,18
                );

                setTimeout(function(){
                  arrDieFish[0].clear=true; //修改clear，为了清除定时器
                  arrDieFish.shift();
                  arrWeb[0].clear();
                  arrWeb.shift();

                  if (width==214) {
                    if (confirm("闯关成功！是否进入下一关？")) {
                      location.reload();
                    }
                  }
                },500);

              }
            }
          }
      },16);

      oC.addEventListener('click', function(e){
          p = getEventPosition(e);
          if(p.x >= 340 && p.x <= 380 && p.y >= 570 && p.y <= 598){
            if (c.type>1) {
              c.type--
            }
            c.draw(gd);
          }else if(p.x >= 480 && p.x <= 520 && p.y >= 570 && p.y <= 598){
            if (c.type<7) {
              c.type++
            }
            c.draw(gd);
          }else {
              var x=e.clientX-oC.offsetLeft- c.x;
              var y=c.y-(e.clientY-oC.offsetTop) ;
              var d= 90-a2d(Math.atan2(y,x));
              c.rotate=d;
              c.emit();

              var bullet=new Bullet(c.type);
              bullet.x= c.x;
              bullet.y= c.y;
              bullet.rotate= c.rotate;
              arrBullet.push(bullet);//收集炮弹            
          }
      },false)
    }
}