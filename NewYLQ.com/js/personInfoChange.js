	Array.prototype._push=function(obj){
				Array.prototype.push.call(this,obj);
				return this;
			}
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
			window.onload=function(){
				changeSubPage();
			}