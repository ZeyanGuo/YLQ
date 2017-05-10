
 window.$ = (function(){
 	var Object={};
 	Object.get=$get;
 	Object.trim=$trim;
 	Object.on=$on;
 	Object.off=$off;
 	Object.ajax=$ajax;
	//获取查询元素
	/* ---------------------------------2017/4/27 重写jquery查询器 ---------------------------------------------- */
	function $get(){
		var substr,elements=document,index,record=0,hasID=false,tempStr;
		if(arguments.length===0){
			this.elements=document.getElementsByTagName('body');
		}
		else if(arguments.length===1){
			//获取输入字符串的所有查询列表
			substr = arguments[0].match(/\s*(.)(\S*)/g);
			//将查询列表中所有元素空格去除
			substr = substr.map(function(str){ return $trim(str) });
			//进行查询操作
			for(index = 0;index<substr.length;index++){
				if(substr[index].charAt(0)==='#'){
					record=index;
					hasID=true;
				}
			}
			if(hasID)elements = elements.getElementById(substr[record++].slice(1));
			tempStr = substr.slice(record).join(" ");
			if(elements){
				//此处是否通过css选择器查询？如果有更好的方法请更新
				elements=elements.querySelectorAll(tempStr);
				this.elements=elements;
			}
			else{
				this.elements=elements;
			}
		}
		else{
			//在两个参数以及以上的可扩展位置
		}
		return this;
	}
	
 	//绑定元素方法
 	/* ---------------------------------2017/4/27 重写jquery方法注册器 ---------------------------------------------- */
 	function $on(str,callback){
 		var index;
 		if( str && typeof callback === 'function'){
 			if(document.addEventListener){
 				//如果没有获取到元素则返回错误信息
 				if(!this.elements||this.elements.length===0)return new Error('on: Can\'t add event to null');
 				//对所有选取到的元素绑定事件
 				for(index=0;index<this.elements.length;index++){
 					this.elements[index].addEventListener(str,callback);
 				}
 			}
 			//针对IE浏览器的绑定事件方法
 			else if(document.attachEvent){
 				if(!this.elements||this.elements.length===0)return new Error('on: Can\'t add event to null');
 				for(index=0;index<this.elements.length;index++){
 					this.elements[index].attachEvent("on"+str,callback);
 				}
 			}
 			else{
 				//预留位置未其他绑定事件方法保留
 			}
 			return this;
 		}
 		else{
 			return this;
 		}
 	}
 	//解除元素绑定
 	/* ---------------------------------2017/4/27 重写jquery方法解除器 ---------------------------------------------- */
 	function $off(str,callback){
 		if( str && typeof callback === 'function'){
 			if(document.removeEventListener){
 				//如果没有获取到元素则返回错误信息
 				if(!this.elements||this.elements.length===0)return new Error('on: Can\'t add event to null');
 				//对所有选取到的元素取消绑定事件
 				for(index=0;index<this.elements.length;index++){
 					this.elements[index].removeEventListener(str,callback);
 				}
 			}
 			//针对IE浏览器的取消绑定事件方法
 			else if(document.detachEvent){
 				if(!this.elements||this.elements.length===0)return new Error('on: Can\'t add event to null');
 				for(index=0;index<this.elements.length;index++){
 					this.elements[index].detachEvent("on"+str,callback);
 				}
 			}
 			else{
 				//预留位置未其他解除绑定事件方法保留
 			}
 			return this;
 		}
 		else{
 			return this;
 		}
 	}
 	//异步数据传输
 	function $ajax(obj){}
	//字符串去除空格方法
	function $trim(str){
		if(str){
			return str.replace(/\s*/,'');
		}
		else{
			throw new Error('trim: Can\'t trim undefined');
		}
	}
	
	
	//返回封装的模块对象
	return Object;
 })();


