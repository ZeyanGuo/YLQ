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
			strategy[temp.method](obj);
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
HTMLElement.prototype.M_addEvent = function(method,func){
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
function fire(obj,event){
	if(Element.dispatchEvent){
		obj.dispatchEvent(event);	
	}
	else if(Element.fireEvent){
		obj.fireEvent(event);
	}
}
