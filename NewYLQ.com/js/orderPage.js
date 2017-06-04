function addEvent(){//事件注册函数
				if(document.addEventListener){
				   addEvent=function(event,obj,func){
				   		obj.addEventListener(event,func);
				   }
				}
				else if(document.attachEvent){
					addEvent=function(event,obj,func){
						obj.attachEvent("on"+event,func);
					}
				}
				addEvent.apply(null,arguments);
			}
			function changeStyle(obj,style,value){
				var obj=obj||null,style=style||null,value=value||null;
				if(obj&&style&&value){
					obj.style[style]=value;
					return true;
				}
				else{
					return false;
				}
			}
			function main(){
				var firstPage = document.getElementById('first'),
					secondPage = document.getElementById('second'),
					nextBtn = document.getElementById('nextStep'),
					previousBtn = document.getElementById('previousStep');
				addEvent('click',nextBtn,function(){
					changeStyle(firstPage,'display','none');
					changeStyle(secondPage,'visibility','visible');
				});
				addEvent('click',previousBtn,function(){
					changeStyle(secondPage,'visibility','hidden');
					changeStyle(firstPage,'display','block');
				});
			}
			window.onload=function(){
				main();
			}