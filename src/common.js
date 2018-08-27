var JSON={}; // {'fish1':oImg,'fish2':oImg,....}
function loadImage(arr,success,progress){
  	var count=0;
  	for(var i=0;i<arr.length;i++){
	    var oImg=new Image();
	    (function(index){
	      	oImg.onload=function(){
		        JSON[arr[index]]=this;//保存已加载资源
		        count++;
		        progress && progress(count,arr.length);
		        if(count==arr.length){
		          	success && success();
		        }
	      	};
	    })(i);
		oImg.src='img/'+arr[i]+'.png';
  	}
}

function rnd(n,m){
  	return parseInt(Math.random()*(m-n))+n;
}

function d2a(n){
  	return n*Math.PI/180;
}
function a2d(n){
  	return n*180/Math.PI;
}

function getEventPosition(ev){
  var x, y;
  if (ev.layerX || ev.layerX == 0) {
    x = ev.layerX;
    y = ev.layerY;
  } else if (ev.offsetX || ev.offsetX == 0) { // Opera
    x = ev.offsetX;
    y = ev.offsetY;
  }
  return {x: x, y: y};
}