	
function changeSubPage(){
	var personPageLeft = document.querySelector('.content-main-change-left-personinfo'),
		moreInfoLeft = document.querySelector('.content-main-change-left-moreinfo'),
		securityLeft = document.querySelector('.content-main-change-left-security'),
		identityLeft = document.querySelector('.content-main-change-left-identity'),
		personPage = document.querySelector('.personinfo'),
		moreInfo = document.querySelector('.moreinfo'),
		security = document.querySelector('.security'),
		identity = document.querySelector('.identity'),
		pageRight = document.querySelector('.content-main-change-left-side'),
		leftButtonArray=[],rightPageArray=[],objLeft,objRight;
	//存入对对映界面信息到数组,方便后续操作
	leftButtonArray._push(personPageLeft)._push(moreInfoLeft)._push(securityLeft)._push(identityLeft);
	rightPageArray._push(personPage)._push(moreInfo)._push(security)._push(identity);

	
	//注册右半界面事件委托
	pageRight.addEventListener('click',dealChangePage);
	
	//界面按钮点击处理函数
	function dealChangePage(e){
		e = e || window.event;
		target = e.target || e.srcElement;
		for(var len = leftButtonArray.length;len;len--){
			objLeft = leftButtonArray[len-1];
			objRight = rightPageArray[len-1];						
			if(target===objLeft||target.parentElement===objLeft||target.parentElement.parentElement===objLeft){
				objLeft.style.background='#f8f8f8';
				objLeft.parentElement.querySelector('.content-main-change-left-mark').style.background='dodgerblue';
				objRight.className = objRight.className.replace(/hidden/,'show');
			}
			else{
				objLeft.style.background='rgb(212, 229, 255)';	
				objLeft.parentElement.querySelector('.content-main-change-left-mark').style.background='';
				objRight.className = objRight.className.replace(/show/,'hidden');
			}
		}
	}
	
}
//更改头像代码
function changeImageStageInit(){
	
	var imageRecored = {//图片导入后的相关信息
		url:null,
		width:300,
		height:300,
		showLeft:null,
		showTop:null,
		imageWidth:null,
		imageHeight:null
	}
	
	
	
	//修改头像按钮点击特效
	function initShowAndHiddenBtn(){
		var changeImageBtn = document.getElementById('changeImageBtn'),
			changeImageStage = document.getElementById('changeImageStage'),
			bodyStage = document.getElementById('body');
			
		changeImageBtn.M_addEvent('click',function(){
			changeImageStage.style = 'animation: page-scale-in .5s ease-in-out forwards;';
			bodyStage.className = 'blur';
			changeImageBtn.disabled = true;
			setTimeout(function(){
				bodyStage.M_addEvent('click',stageHiddenFunc);
			},300);
		});
		
		function stageHiddenFunc(){
			changeImageStage.style = 'animation: page-move-out .5s ease-in-out forwards;';
			bodyStage.className = '';
			changeImageBtn.disabled = false;
			bodyStage.M_removeEvent('click',stageHiddenFunc);
			//在500ms之后将更改头像框架的位置设置为-400，以免z-index的干扰
			setTimeout(function(){
				changeImageStage.style.left = '-800px';
			},500);
		}
	}
	
	//页面显示后，初始化图片按钮
	function initAddImageBtn(){
		var selectImage = document.getElementById('selectImage'),
			imgInput = document.getElementById('imgInput'),
			showImageStage = document.getElementById('imageShowStage'),
			imageShowStageFixed = document.getElementById('imageShowStageFixed');
		selectImage.M_addEvent('click',function(){
			imgInput.click();
		});
		imgInput.M_addEvent('change',function(){
			var imgFile = imgInput.files[0],
				url = URL.createObjectURL(imgFile);
			if(imgFile.size>2097152){
				alert('图片大小过大,不能超过2M');
				imgInput.value=null;
				return false;
			}
			showImageStage.src = url;
			imageRecored.url = url;
			changeImagePosition(url);
		});
		
		//为新导入的图片初始化位置信息
		function changeImagePosition(url){
			var image = new Image();
			image.src = url;
			image.M_addEvent('load',function(){
				imageRecored.imageWidth = image.width;
				imageRecored.imageHeight = image.height;
				var width = image.width*(370/image.height);
				showImageStage.style.width = width+'px';
				showImageStage.style.marginLeft = '-'+width/4+'px';
				imageShowStageFixed.style.backgroundImage = 'url('+url+')';
				imageShowStageFixed.style.backgroundSize = width+'px 370px';
				imageShowStageFixed.style.backgroundPosition = (document.documentElement.clientWidth/2-300-width/4+'px ')+(document.documentElement.clientHeight/2-162+'px');
				console.log(imageShowStageFixed.style.backgroundPosition);
				imageRecored.showLeft = '35px';
				imageRecored.showTop = '35px';
				imageRecored.width = 300;
				imageRecored.height = 300;
				showImageChange();
				initSelectArea();
			});
		}
	
	}
	
	function imageDraggable(){
		 	//获取相关的八个可拖动点信息
		var	lineY = document.getElementById('lines-y'),
			lineX = document.getElementById('lines-x'),
			leftXPoint = document.getElementById('left-x'),
			rightXPoint = document.getElementById('right-x'),
			topYPoint = document.getElementById('top-y'),
			bottomYPoint = document.getElementById('bottom-y'),
			leftTopPoint = document.getElementById('left-top'),
			leftBottomPoint = document.getElementById('left-bottom'),
			rightBottomPoint = document.getElementById('right-bottom'),
			rightTopPoint = document.getElementById('right-top');
			
		//初始化拖动标签按钮
		leftXPoint.M_addEvent('mousedown',function(e){
			var event = e || window.event
			e.stopPropagation();
			dragPoint(leftXPoint,'left',imageShowStageFixed,event,imageRecored,showImageChange);
		});
		leftTopPoint.M_addEvent('mousedown',function(e){
			var event = e || window.event
			e.stopPropagation();
			dragPoint(leftXPoint,'leftTop',imageShowStageFixed,event,imageRecored,showImageChange);
		});
		rightXPoint.M_addEvent('mousedown',function(e){
			var event = e || window.event
			e.stopPropagation();
			dragPoint(leftXPoint,'right',imageShowStageFixed,event,imageRecored,showImageChange);
		});
		rightBottomPoint.M_addEvent('mousedown',function(e){
			var event = e || window.event
			e.stopPropagation();
			dragPoint(leftXPoint,'rightBottom',imageShowStageFixed,event,imageRecored,showImageChange);
		});
		topYPoint.M_addEvent('mousedown',function(e){
			var event = e || window.event
			e.stopPropagation();
			dragPoint(leftXPoint,'top',imageShowStageFixed,event,imageRecored,showImageChange);
		});
		rightTopPoint.M_addEvent('mousedown',function(e){
			var event = e || window.event
			e.stopPropagation();
			dragPoint(leftXPoint,'rightTop',imageShowStageFixed,event,imageRecored,showImageChange);
		});
		bottomYPoint.M_addEvent('mousedown',function(e){
			var event = e || window.event
			e.stopPropagation();
			dragPoint(leftXPoint,'bottom',imageShowStageFixed,event,imageRecored,showImageChange);
		});
		leftBottomPoint.M_addEvent('mousedown',function(e){
			var event = e || window.event
			e.stopPropagation();
			dragPoint(leftXPoint,'leftBottom',imageShowStageFixed,event,imageRecored,showImageChange);
		});
		
		//初始化整个区域拖动
		imageShowStageFixed.M_addEvent('mousedown',function(e){
			var range = {
				xRange:(370 - imageShowStageFixed.offsetWidth),
				yRange:(370 - imageShowStageFixed.offsetWidth)
			}
			drag(imageShowStageFixed,e,range,imageRecored,showImageChange);
		});
		
	}
	
	function showImageChange(){
		var bigImage = document.getElementById('bigImage'),
			middelImage = document.getElementById('middelImage'),
			smallImage = document.getElementById('smallImage');
		showImage(imageRecored,bigImage,150);
		showImage(imageRecored,middelImage,100);
		showImage(imageRecored,smallImage,50);
	}
	
	function initSelectArea(){
		imageShowStageFixed.style.width = '300px';
		imageShowStageFixed.style.height = '300px';
		imageShowStageFixed.style.left = '35px';
		imageShowStageFixed.style.top = '35px';
	}
	
	
	imageDraggable();
	initAddImageBtn();
	initShowAndHiddenBtn();
}


addWindowLoad(changeSubPage);
addWindowLoad(changeImageStageInit);