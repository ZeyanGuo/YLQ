//用户登录注册验证策略
var strategy = {//value为字符串 err为回调函数 obj为对象,isCheckFromBack的处理放在最后调用,不然可能引起BUG
	isWithInScope:function(value,success,err){
		var reg = /\S{6,16}/i;
		if(!reg.test(value)){
			err("长度必须在6-16个字符之间");
			return false;
		}
		success("Welcome to Funtake ^_^");
		return true;
	},
	isMobile:function(value,success,err){
		if(!/(^1[3|5|8][0-9]{9}$)/.test(value)){
			err("手机号码不正确");
			return false;
		}
		success("Welcome to Funtake ^_^");
		return true;
	},
	isEmail:function(value,success,err){
		var reg = /\w+@\w+.\w+/;
		if(!reg.test(value)){
			err("邮箱地址不正确");
			return false;
		}
		success("Welcome to Funtake ^_^");
		return true;
	},
	isNotEmpty:function(value,success,err){
		if(value===''){
			err("该信息不能为空");
			return false;
		}
		success('信息正确');
		return true;
	},
	isOnlyNumber:function(value,success,err){
		reg = /^\d*\.?\d*$/;
		if(!reg.test(value)){
			err("只能添入数字，支持小数点");
			return false;
		}
		success('只存在数字，数据正确');
		return true;
	},
	isCourierNumber:function(value,success,err){
		var reg = /^\w*$/;
		if(!reg.test(value)){
			err('快递编号格式不正确');
			return false;
		}
		success('快递编号正确');
		return true;
	},
	isSameWithOther:function(value,text,output,success,err){
		if(!(value===text)){
			err(output);
			return false;
		}
		success("Welcome to Funtake ^_^");
		return true;
	},
	isCheckFromBack:function(obj){
		ajax(obj);
	}
}

//检测input框数据是否正确
HTMLElement.prototype.checkInput = function(value,checkArray){//checkArray 内部以method描述检测的策略,以err描述失败之后的执行函数
	for(var i = 0,len = checkArray.length;i<len;i++){
		var temp = checkArray[i];
		if(temp.method === "isCheckFromBack"){//在传入参数需要进行后台认证时执行的函数
			strategy[temp.method](temp.ajax);
			continue;
		}
		if(temp.method === 'isSameWithOther'){//在传入比较两个对象值时调用的函数
			if(!strategy[temp.method](value,temp.text,temp.output,temp.success,temp.err));
			break;
		}
		if(!strategy[temp.method](value,temp.success,temp.err))
			break;
	}
}

//后台Ajax请求
function ajax({url,method,success,error,data}){
	var urlReg = /^(.*?):(\d*?)\/(.*)/;
	var methodReg = /^(get|put|post|head|delete|option)$/i;
	var method = method || "GET";
	if(!urlReg.test(url))
		return error("url不正确，请核对");
	if(!method.test(methodReg))
		return error("method方法不支持先支持get,put,post,head,delete,option");
	methodReg = methodReg.toUpperCase();
	var xmlRequest = newXmlRequest();
	xmlRequest.onreadystatechange=stateCheck(xmlRequest,success,error);
	if(method==="GET"){
		if(data){
		url += '?'
		for(var i in data)
			if(data.hasOwnProperty(i))
				url += i+'='+data[i]+"&";
		}
	}
	xmlRequest.open(method,url,true);
	if(method==="POST")
		xmlRequest.send(data);
	else
		xmlRequest.send();
}

function stateCheck(xml,success,error){
	var statusReg = /^2\d{2}$/; 
	if(xml.readyState===3){
		//在大量数据时可以在此处理，减少等待时间
	}
	if(xml.readyState===4&&statusReg.test(xml.status)){
		//以2开头的状态码，表示请求成功
		success(xml.responseText);
	}
	else{
		error(xml.status);//返回错误状态码
	}
}

//创建新xml对象兼容IE
function newXmlRequest(){
	var flag = true; //用于检测浏览器是否支持ajax
	var httpXmlRequest = null;
	try{
		httpXmlRequest = new XMLHttpRequest();
	}
	catch(e){
		try{
			 httpXmlRequest = ActiveXobject("Msxml12.XMLHTTP");  
		}
		catch(e1){
			try{
			 	httpXmlRequest = ActiveXobject("Microsoft.XMLHTTP");  
			}
			catch(e2){
				flag = false;
			}
		}
	}
	if(flag===false)
		return "该浏览器不支持ajax";
	else
		return httpXmlRequest;
}

//在HTMLElement对象下封装addEvent方法
HTMLElement.prototype.M_addEvent = function(method,func){//可以进行优化，因为已经确认浏览器可以支持的方法，但是每次调用依旧进行了一次浏览器功能判断
	if(document.addEventListener){
		this.addEventListener(method,func);
	}
	else if(document.attachEvent){
		this.attachEvent('on'+method,func);
	}
	else{
		//其他的处理方案
	}
}
HTMLElement.prototype.M_removeEvent = function(method,func){
	if(document.removeEventListener){
		HTMLElement.prototype.M_removeEvent = function(method,func){
			this.removeEventListener(method,func);
		}
		this.M_removeEvent(method,func);
	}
	else if(document.detachEvent){
		HTMLElement.prototype.M_removeEvent = function(method,func){
			this.detachEvent("on"+method,func);
		}
		this.M_removeEvent(method,func);
	}
	else{
		//其他处理方案
	}
}
function fire(obj,event){
	if(Element.dispatchEvent){
		obj.dispatchEvent(event);	
	}
	else if(Element.fireEvent){
		obj.fireEvent(event);
	}
}

function preventDefault(event){//阻止默认事件
	var event = event||window.event;
	event.preventDefault();
	event.returnValue=false;
}

function changeStyle(obj,style,value){//更改相应对象style属性的函数
	var obj=obj||null,style=style||null,value=value||null;
	if(obj&&style&&value){
		obj.style[style]=value;
		return true;
	}
	else{
		return false;
	}
}

function addImgEventToObj(ImgAddObj){//自定义添加图片的方法,此方法帮助注册自定义添加图片一系列事件,注意该事件只支持2M的上传
	var cancelFragment = document.createDocumentFragment(),
		stageSpan = document.createElement('span'),
		closeSpan = document.createElement('span'),
		iconSpan = document.createElement('span'),
		inputObj = ImgAddObj.getElementsByTagName('input')[0],
		markSpan = ImgAddObj.getElementsByClassName('mark')[0];
	
	//	设置取消按钮相关属性
	stageSpan.className = 'img-up';
	stageSpan.style.display = 'none';
	closeSpan.className = 'form-file-close';
	iconSpan.className = 'form-file-close-icon';
	
	closeSpan.appendChild(iconSpan);
	stageSpan.appendChild(closeSpan);
	cancelFragment.appendChild(stageSpan);
	

	markSpan.M_addEvent('click',function(){
		inputObj.click();
	});
	inputObj.M_addEvent('change',function(){
		var imgFile = inputObj.files[0],
			url = URL.createObjectURL(imgFile);
		if(imgFile.size>2097152){
			alert('图片大小过大,不能超过2M');
			inputObj.value=null;
			return false;
		}
		stageSpan.style.display = 'block';
		stageSpan.style.backgroundImage = 'url('+ url +')';
		//将对象添加到图片添加对象中去
		ImgAddObj.appendChild(cancelFragment);
		markSpan.style.display = 'none'
		//设置对象的boolean值为true, 其用于判断图片是否添加
		ImgAddObj.bool = true;
	});
	iconSpan.M_addEvent('click',function(){
		stageSpan.style.display = 'none';
		inputObj.value = null;
		markSpan.style.display = 'block'
		//设置为false,表示未添加图片
		ImgAddObj.bool = false;
	});
}

function addWindowLoad(func){
	var funcs = [],
		args = [],
		arg = Array.prototype.slice.call(arguments);
	arg.shift();
	funcs.push(func);
	args.push(arg);
	if(!(typeof window.onload === "function")){
		window.onload = function(){
			for(var i = funcs.length;i--;){
				funcs[i].apply(null,args[i]);
			}
		}
	}
	addWindowLoad = function(func){
		var temp = Array.prototype.slice.call(arguments);
		temp.shift();
		funcs.push(func);
		args.push(temp);
	}
}

//通过cookie获取userId
function getUserId(){
	
}

function getItemId(){
	var id = window.location.hash.replace('^#','');
	return id;
}

function getScrollOffset(w){
	w=w||window;
	if(w.pageXOffset!=null)return {x:w.pageXOffset,y:w.pageYOffset};
	var d = w.document;
	if(document.compatMode=="CSS1Compat")return {x:d.documentElement.scrollLeft,y:d.documentElement.scrollTop};
	return {x:d.body.scrollLeft,y:d.body.scrollTop};
}
function drag(elementToDrag,event,range,imageRecord,callback){
	var scorll = getScrollOffset();
	var startX = event.clientX+scorll.x;
	var startY = event.clientY+scorll.y;
	var origX = elementToDrag.offsetLeft;
	var origY = elementToDrag.offsetTop;
	var deltaX = startX-origX;
	var deltaY = startY-origY;
	if(document.addEventListener){
		elementToDrag.addEventListener("mousemove",moveHandler,true);
		elementToDrag.addEventListener("mouseup",upHandler,true);
	}
	else if(document.attachEvent){
		elementToDrag.setCapture();
		elementToDrag.attachEvent("onmousemove",moveHandler);
		elementToDrag.attachEvent("onmouseup",upHandler);
		elementToDrag.attachEvent("onlosecapture",upHandler);
	}
	if(event.stopPropagation)event.stopPropagation();
	else event.cancelBubble=true;
	if(event.preventDefault)event.preventDefault();
	else event.returnValue=false;
	function moveHandler(e){
		if(!e) e = window.event;
		var scroll = getScrollOffset(),
			xPosition = e.clientX+scorll.x-deltaX,
			yPosition = e.clientY+scroll.y-deltaY
		if(xPosition < range.xRange && xPosition > 0)
			elementToDrag.style.left=xPosition+"px";
		if(yPosition < range.yRange && yPosition > 0)
			elementToDrag.style.top=yPosition+"px";
		if(e.stopPropagation)e.stopPropagation();
		else e.cancelBubble=true;
	}
	function upHandler(e){
		if(!e)e=window.event;
		if(document.removeEventListener){
			elementToDrag.removeEventListener("mouseup",upHandler,true);
			elementToDrag.removeEventListener("mousemove",moveHandler,true);
		}
		else if(document.detachEvent){
			elementToDrag.detachEvent("onlosecapture",upHandler);
			elementToDrag.detachEvent("onmouseup",upHandler);
			elementToDrag.detachEvent("onmousemove",moveHandler);
			elementToDrag.releaseCapture();
		}
		if(e.stopPropagation)e.stopPropagation();
		else e.cancelBubble=true;
		imageRecord.showLeft = elementToDrag.style.left;
		imageRecord.showTop = elementToDrag.style.top;
		callback();
	}
}

//点拖动代码
function dragPoint(dragElement,direction,target,event,imageRecord,callback){
	//获取初始位置信息
	var scroll = getScrollOffset(),
		origX = target.offsetLeft,
		origY = target.offsetTop,
		elemWidth = target.offsetWidth,
		elemHeight = target.offsetHeight,
		startX = event.clientX + scroll.x,
		startY = event.clientY + scroll.y,
		detailX = startX - origX,
		detailY = startY - origY,
		parentElement = dragElement.parentElement.parentElement;

	//为对象添加事件
	parentElement.M_addEvent('mousemove',downHandler);
	parentElement.M_addEvent('mouseup',upHandler);
	parentElement.M_addEvent('mouseleave',upHandler);

	//鼠标按下拖动使事件函数
	function downHandler(e){
		var event = e || window.event,
			scroll = getScrollOffset(),
			//获取鼠标移动偏移量
			offsetX = (event.clientX + scroll.x) - startX,
			offsetY = (event.clientY + scroll.y) - startY;
		
		//执行对应direction动画
		if(direction === 'left' || direction === 'leftTop'){
			target.style.width = (elemWidth - offsetX) + 'px';
			target.style.height = (elemHeight - offsetX) + 'px';
			target.style.left = (origX + offsetX) + 'px';
			target.style.top = (origY + offsetX) + 'px'
		}
		else if(direction === 'right' || direction === 'rightBottom'){
			target.style.width = (elemWidth + offsetX) + 'px';
			target.style.height = (elemHeight + offsetX) + 'px';
			target.style.left = origX + 'px';
		}
		else if(direction === 'top' || direction === 'rightTop'){
			target.style.width = (elemWidth - offsetY) + 'px';
			target.style.height = (elemHeight - offsetY) + 'px';
			target.style.top = (origY + offsetY) + 'px';
		}
		else if(direction === 'bottom' || direction ==='leftBottom'){
			target.style.width = (elemWidth + offsetY) + 'px';
			target.style.height = (elemHeight + offsetY) + 'px';
			target.style.top = origY;
			target.style.left = (origX - offsetY) + 'px';
		}
	}
	
	function upHandler(e){
		parentElement.M_removeEvent('mousemove',downHandler);
		parentElement.M_removeEvent('mouseup',upHandler);
		parentElement.M_removeEvent('mouseleave',upHandler);
		imageRecord.width =  parseInt(target.style.width.replace(/px/,''));
		imageRecord.height = parseInt(target.style.height.replace(/px/,''));
		imageRecord.showTop = target.style.top;
		imageRecord.showLeft = target.style.left;
		callback();
	}
	
}

function showImage(imageInfo,target,targetSize){
	
	var imageHeight = 370,
		imageWidth = imageInfo.imageWidth*(370/imageInfo.imageHeight),
		ratio = targetSize/imageInfo.height,
		showLeft = parseInt(imageInfo.showLeft.replace(/px/,'')),
		showTop = parseInt(imageInfo.showTop.replace(/px/,''));
	target.style.backgroundImage = 'url('+imageInfo.url+')';
	target.style.backgroundSize = ratio*imageWidth+'px '+ratio*imageHeight+'px';
	target.style.backgroundPosition = '-'+((imageWidth/4*ratio)+(showLeft*ratio))+'px -'+(showTop*ratio)+'px';
	
}


Array.prototype._push=function(obj){
	Array.prototype.push.call(this,obj);
	return this;
}

function exitWeb(){//清除cookie,重定向到主页
	
}
