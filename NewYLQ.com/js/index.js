function imageGalleryAnimation() {
	var num = 1,
		intervalID, setTimeoutID; //inervalID 与 setTimeoutID 用以记录inteval和timeout循环的ID，用以在必要时候取消自动轮播和自动导航
	var numDrc = new Array('', 'front', 'right', 'back', 'left', 'front', 'top', 'bottom');
	var gallery = document.querySelectorAll(".content-image-cube");
	//鼠标点击小图标操作旋转
	function imageGalleryIntreaction() {
		//创建事件委托
		var gallerySmall = document.querySelectorAll(".content-image-describe");
		if(document.addEventListener) {
			gallerySmall[0].addEventListener('click', rotateAnimation);
		} else {
			gallerySmall[0].attachEvent('click', rotateAnimation);
		}
		//旋转方向判断
		function rotateAnimation(e) {

			if(e.target.className.indexOf('front-small') > -1) {
				rotateTargetDiraction('front');
			} else if(e.target.className.indexOf('back-small') > -1) {
				rotateTargetDiraction('back');
			} else if(e.target.className.indexOf('left-small') > -1) {
				rotateTargetDiraction('left');
			} else if(e.target.className.indexOf('right-small') > -1) {
				rotateTargetDiraction('right');
			} else if(e.target.className.indexOf('top-small') > -1) {
				rotateTargetDiraction('top');
			} else if(e.target.className.indexOf('bottom-small') > -1) {
				rotateTargetDiraction('bottom');
			}
		}
		//动画执行完毕再进行旋转
		function rotateTargetDiraction(direction) {
			if(direction !== numDrc[num]) {
				if(gallery[0].getAttribute('flag') === 'stop') {
					rotateAnimationPlay(direction);
				} else {
					clearInterval(intervalID);
					intervalID = setInterval(function() {
						if(gallery[0].getAttribute('flag') == 'stop') {
							rotateAnimationPlay(direction);
						}
					}, 200)
				}
			}
		}
		//手动控制-旋转代码
		function rotateAnimationPlay(direction) {
			clearInterval(intervalID);
			clearTimeout(setTimeoutID);
			gallery[0].setAttribute('flag', 'play');
			if(direction === 'front') {
				//增加下标退出效果
				if(num === 5) {
					gallery[0].childNodes[1].childNodes[3].setAttribute('style', "animation:figure-caption-out 2.5s ease-in-out forwards ;");
				} else if(num === 6) {
					gallery[0].childNodes[9].childNodes[3].setAttribute('style', "animation:figure-caption-out 2.5s ease-in-out forwards ;");
				} else if(num === 7) {
					gallery[0].childNodes[11].childNodes[3].setAttribute('style', "animation:figure-caption-out 2.5s ease-in-out forwards ;");
				} else {
					gallery[0].childNodes[num * 2 - 1].childNodes[3].setAttribute('style', "animation:figure-caption-out 2.5s ease-in-out forwards ;");
				}
				//旋转效果
				gallery[0].setAttribute('style', "animation:return-front-from-" + numDrc[num] + " 3s ease-in-out forwards");
				setTimeout(function() {
					gallery[0].setAttribute('flag', 'stop');
				}, 3000);
				//增加下标进入效果
				setTimeout(function() {
					gallery[0].childNodes[1].childNodes[3].setAttribute('style', "animation:figure-caption-in 2s ease-in-out forwards ;");
				}, 1000);
				num = 1;
				//重新开始自动播放
				setTimeoutID = setTimeout(function() {
					imageGalleryAutoPlay();
				}, 5000);
			} else {
				if(num === 1 || num === 5) {
					//增加下标退出效果
					gallery[0].childNodes[1].childNodes[3].setAttribute('style', "animation:figure-caption-out 2.5s ease-in-out forwards ;");
					//旋转效果
					gallery[0].setAttribute('style', "animation:front-to-" + direction + " 3s ease-out forwards");
					setTimeout(function() {
						gallery[0].setAttribute('flag', 'stop');
					}, 3000);
					num = numDrc.indexOf(direction);
					//增加下标进入效果
					if(num == 6) {
						setTimeout(function() {
							gallery[0].childNodes[9].childNodes[3].setAttribute('style', "animation:figure-caption-in 2s ease-in-out forwards ;");
						}, 1000);
					} else if(num == 7) {
						setTimeout(function() {
							gallery[0].childNodes[11].childNodes[3].setAttribute('style', "animation:figure-caption-in 2s ease-in-out forwards ;");
						}, 1000);
					} else {
						setTimeout(function() {
							gallery[0].childNodes[num * 2 - 1].childNodes[3].setAttribute('style', "animation:figure-caption-in 2s ease-in-out forwards ;");
						}, 1000);
					}
					//重新开始自动播放
					setTimeoutID = setTimeout(function() {
						imageGalleryAutoPlay();
					}, 5000);
				} else {
					//增加下标退出效果
					if(num === 6) {
						gallery[0].childNodes[9].childNodes[3].setAttribute('style', "animation:figure-caption-out 2.5s ease-in-out forwards ;");
					} else if(num === 7) {
						gallery[0].childNodes[11].childNodes[3].setAttribute('style', "animation:figure-caption-out 2.5s ease-in-out forwards ;");
					} else {
						gallery[0].childNodes[num * 2 - 1].childNodes[3].setAttribute('style', "animation:figure-caption-out 2.5s ease-in-out forwards ;");
					}
					//旋转效果
					gallery[0].setAttribute('style', "animation:return-front-from-" + numDrc[num] + " 1.5s ease-in forwards");
					setTimeout(function() {
						gallery[0].setAttribute('style', "animation:front-to-" + direction + " 1.5s ease-out forwards");
					}, 1500);
					setTimeout(function() {
						gallery[0].setAttribute('flag', 'stop');
					}, 3000);
					num = numDrc.indexOf(direction);
					//增加下标进入效果
					if(num == 6) {
						setTimeout(function() {
							gallery[0].childNodes[9].childNodes[3].setAttribute('style', "animation:figure-caption-in 2s ease-in-out forwards ;");
						}, 1000);
					} else if(num == 7) {
						setTimeout(function() {
							gallery[0].childNodes[11].childNodes[3].setAttribute('style', "animation:figure-caption-in 2s ease-in-out forwards ;");
						}, 1000);
					} else {
						setTimeout(function() {
							gallery[0].childNodes[num * 2 - 1].childNodes[3].setAttribute('style', "animation:figure-caption-in 2s ease-in-out forwards ;");
						}, 1000);
					}
					//重新开始自动播放
					setTimeoutID = setTimeout(function() {
						imageGalleryAutoPlay();
					}, 5000);
				}
			}
		}
	}
	//图片自动播放
	function imageGalleryAutoPlay() {
		intervalID = setInterval(function() {
			switch(num) {
				case 1:
					{
						gallery[0].setAttribute('style', "animation:scroll-right-1 3s ease-in-out forwards");
						gallery[0].setAttribute('flag', 'play');
						gallery[0].childNodes[num * 2 - 1].childNodes[3].setAttribute('style', "animation:figure-caption-out 2.5s ease-in-out forwards ;");
						num++;
						setTimeout(function() {
							gallery[0].setAttribute('flag', 'stop');
						}, 3000);
						setTimeout(function() {
							gallery[0].childNodes[num * 2 - 1].childNodes[3].setAttribute('style', "animation:figure-caption-in 2s ease-in-out forwards ;");
						}, 1000);
					}
					break;
				case 2:
					{
						gallery[0].setAttribute('style', "animation:scroll-right-2 3s ease-in-out forwards");
						gallery[0].childNodes[num * 2 - 1].childNodes[3].setAttribute('style', "animation:figure-caption-out 2.5s ease-in-out forwards ;");
						num++;
						gallery[0].setAttribute('flag', 'play');
						setTimeout(function() {
							gallery[0].setAttribute('flag', 'stop');
						}, 3000);
						setTimeout(function() {
							gallery[0].childNodes[num * 2 - 1].childNodes[3].setAttribute('style', "animation:figure-caption-in 2s ease-in-out forwards ;");
						}, 1000);
					}
					break;
				case 3:
					{
						gallery[0].setAttribute('style', "animation:scroll-right-3 3s ease-in-out forwards");
						gallery[0].childNodes[num * 2 - 1].childNodes[3].setAttribute('style', "animation:figure-caption-out 2.5s ease-in-out forwards ;");
						num++;
						gallery[0].setAttribute('flag', 'play');
						setTimeout(function() {
							gallery[0].setAttribute('flag', 'stop');
						}, 3000);
						setTimeout(function() {
							gallery[0].childNodes[num * 2 - 1].childNodes[3].setAttribute('style', "animation:figure-caption-in 2s ease-in-out forwards ;");
						}, 1000);
					}
					break;
				case 4:
					{
						gallery[0].setAttribute('style', "animation:scroll-right-4 3s ease-in-out forwards");
						gallery[0].childNodes[num * 2 - 1].childNodes[3].setAttribute('style', "animation:figure-caption-out 2.5s ease-in-out forwards ;");
						num++;
						gallery[0].setAttribute('flag', 'play');
						setTimeout(function() {
							gallery[0].setAttribute('flag', 'stop');
						}, 3000);
						setTimeout(function() {
							gallery[0].childNodes[1].childNodes[3].setAttribute('style', "animation:figure-caption-in 2s ease-in-out forwards ;");
						}, 1000);
					}
					break;
				case 5:
					{
						gallery[0].setAttribute('style', "animation:scroll-bottom-1 3s ease-in-out forwards");
						gallery[0].childNodes[1].childNodes[3].setAttribute('style', "animation:figure-caption-out 2.5s ease-in-out forwards ;");
						num++;
						gallery[0].setAttribute('flag', 'play');
						setTimeout(function() {
							gallery[0].setAttribute('flag', 'stop');
						}, 3000);
						setTimeout(function() {
							gallery[0].childNodes[9].childNodes[3].setAttribute('style', "animation:figure-caption-in 2s ease-in-out forwards ;");
						}, 1000);
					}
					break;
				case 6:
					{
						gallery[0].setAttribute('style', "animation:scroll-bottom-2 3s ease-in-out forwards");
						gallery[0].childNodes[9].childNodes[3].setAttribute('style', "animation:figure-caption-out 2.5s ease-in-out forwards ;");
						num++;
						gallery[0].setAttribute('flag', 'play');
						setTimeout(function() {
							gallery[0].setAttribute('flag', 'stop');
						}, 3000);
						setTimeout(function() {
							gallery[0].childNodes[11].childNodes[3].setAttribute('style', "animation:figure-caption-in 2s ease-in-out forwards ;");
						}, 1000);
					}
					break;
				case 7:
					{
						gallery[0].setAttribute('style', "animation:scroll-bottom-3 3s ease-in-out forwards");
						gallery[0].childNodes[11].childNodes[3].setAttribute('style', "animation:figure-caption-out 2.5s ease-in-out forwards ;");
						num = 1;
						gallery[0].setAttribute('flag', 'play');
						setTimeout(function() {
							gallery[0].setAttribute('flag', 'stop');
						}, 3000);
						setTimeout(function() {
							gallery[0].childNodes[1].childNodes[3].setAttribute('style', "animation:figure-caption-in 2s ease-in-out forwards ;");
						}, 1000);
					}
					break;
				default:
					break;
			}
		}, 5000);
	}
	imageGalleryAutoPlay();
	imageGalleryIntreaction();
}
//鼠标滚动动画事件
function itemScrollAnimation(){
	var rankListTitle = document.querySelectorAll('.content-main-rankList>p');
	var rankListItem = document.querySelectorAll('.content-main-rankList .content-main-item');
	var rankListBtn = document.querySelectorAll('.content-main-rankList .content-main-btn');
	var selectListTitle = document.querySelectorAll('.content-main-selectList>p');
	var selectListItem = document.querySelectorAll('.content-main-selectList .content-main-item');
	var selectListBtn = document.querySelectorAll('.content-main-selectList .content-main-btn');
	var rankListPlayed = false,selectListPlayed = false,index=0;
	document.addEventListener('scroll',scrollAnimation);
	function scrollAnimation(e){
		if(!rankListPlayed && window.scrollY>900){
			//排行榜图标显示
			rankListPlayed=true;
			rankListTitle[0].setAttribute('style','animation:title-scroll-in 1.5s ease-in-out forwards;')
			for(index=0;index<rankListItem.length;index++){
				rankListItem[index].setAttribute('style','animation: item-scroll-in 1.5s ease-in-out '+0.5*(index+1)+'s forwards');
			}
			rankListBtn[0].setAttribute('style','animation: btn-scroll-in 1.5s ease-in-out '+0.5*(index+1)+'s forwards');
		}
		if(!selectListPlayed && window.scrollY>1450){
			//选择列表图标显示
			selectListPlayed=true;
			selectListTitle[0].setAttribute('style','animation:title-scroll-in 1.5s ease-in-out forwards;')
			for(index=0;index<selectListItem.length;index++){
				selectListItem[index].setAttribute('style','animation: item-scroll-in 1.5s ease-in-out '+0.5*(index+1)+'s forwards');
			}
			selectListBtn[0].setAttribute('style','animation: btn-scroll-in 1.5s ease-in-out '+0.5*(index+1)+'s forwards');
			document.removeEventListener('scroll',scrollAnimation);
		}
	}
}
//登录注册的函数块
function loginAndRegiste(){
	var obj = document.querySelectorAll('.content-nav a');
	var body = document.getElementsByClassName('body')[0];
	var loginBtnLi = obj[0],registeBtnLi = obj[1],pageShow=false,personInfoShowBoolean=false;
	var LoginAndRegistePage = document.getElementsByClassName('content-login-registe')[0];
	var loginForm=LoginAndRegistePage.getElementsByClassName('content-login-formset')[0];
	var registeForm = LoginAndRegistePage.getElementsByClassName('content-registe-fromset')[0];
	var loginBtn =LoginAndRegistePage.getElementsByClassName('content-login-btn')[0];
	var registeBtn =LoginAndRegistePage.getElementsByClassName('content-registe-btn')[0];
	var closeBtn = LoginAndRegistePage.getElementsByClassName('content-login-close')[0].childNodes[0];
	var personInfo = document.getElementsByClassName('content-person-info')[0];
	var personInfoArrow = personInfo.getElementsByClassName('content-person-show-btn')[0];
	loginBtnLi.addEventListener('click',function(){
		showLoginAndRegistePage('login');
	});
	registeBtnLi.addEventListener('click',function(){
		showLoginAndRegistePage('registe');
	});
	personInfoArrow.addEventListener('click',function(){
		personInfoShowBoolean?showOrHidePersonInfo('out'):showOrHidePersonInfo('in');
	});
	
	//显示登录界面的方法
	function showLoginAndRegistePage(str){	
		str=str||'';
		if(pageShow===false&&str){
			pageShow=true;
			body.className+=' blur';
			LoginAndRegistePage.setAttribute('style','animation:page-scale-in .5s ease-in-out forwards;');
			closeBtn.addEventListener('click',closeLoginAndRegistePage);
			loginBtn.addEventListener('click',function(){changeLoginAndRegiste('loginBtn')});
			registeBtn.addEventListener('click',function(){changeLoginAndRegiste('registeBtn')});
			setTimeout(function(){
				body.addEventListener('click',closeLoginAndRegistePage);
			},300);
			if(str==='login'){
				loginInfo();
			}else if(str==='registe'){
				registeInfo();
			}
		}
	}
	//关闭登录界面
	function closeLoginAndRegistePage(){
		pageShow=false;
		LoginAndRegistePage.setAttribute('style','animation: page-move-out .5s ease-in-out ;');	
		body.className='body';
		body.removeEventListener('click',closeLoginAndRegistePage);
		closeBtn.removeEventListener('click',closeLoginAndRegistePage);
	}
	//登录界面内部改变注册或登录
	function changeLoginAndRegiste(str){
		str=str||'';
		if(str&&str==='loginBtn'){
			loginInfo();
		}else if(str&&str==='registeBtn'){
			registeInfo();
		}
	}
	function registeInfo(){
		registeForm.setAttribute('style','display: block;');
		loginForm.setAttribute('style','display: none;');
		loginBtn.setAttribute('style','border: none; background:transparent;');
		loginBtn.childNodes[0].setAttribute('style','color: black;');
		registeBtn.removeAttribute('style');
		registeBtn.childNodes[0].removeAttribute('style');
	}
	function loginInfo(){
		loginForm.setAttribute('style','display: block;');
		registeForm.setAttribute('style','display: none;');
		registeBtn.setAttribute('style','border: none; background:transparent;');
		registeBtn.childNodes[0].setAttribute('style','color: black;');
		loginBtn.removeAttribute('style');
		loginBtn.childNodes[0].removeAttribute('style');
	}
	//展示或者隐藏个人信息栏
	function showOrHidePersonInfo(str){
		str=str||'';
		if(str&&str==='in'){
			personInfoShow();
		}
		else if(str&&str=='out'){
			personInfoHide();
		}
	}
	function personInfoShow(){
		personInfoShowBoolean=true;
		personInfo.setAttribute('style','animation: person-info-in .7s ease-in-out forwards;')
		personInfoArrow.setAttribute('style','animation: person-arrow-left .7s ease-in-out forwards;')
	}
	function personInfoHide(){
		personInfoShowBoolean=false;
		personInfo.setAttribute('style','animation: person-info-out .7s ease-in-out forwards;')
		personInfoArrow.setAttribute('style','animation: person-arrow-right .7s ease-in-out forwards;')
	}
	function submitLoginMessage(){
		
	}
	function submitRegisteMessage(){
		
	}
}


//登录注册判断逻辑
function checkPaginSign(){
	var usrName = document.getElementById("username"),
		pwd = document.getElementById("password"),
		stage = document.getElementById("errorStage"),
		registUserName = document.getElementById("regist_username"),
		registPwd = document.getElementById("regist_password"),
		registCheckPwd = document.getElementById("regist_checkpassword"),
		registTel = document.getElementById("regist_phonenumber"),
		registEmail = document.getElementById("regist_email"),
		registVerificationCode = document.getElementById("regist_verificationcode"),
		registStage = document.getElementById("regist_errorStage"),
		registCodeBtn = document.getElementById("regist_verificationcode_btn"),
		registSendBtn = document.getElementById("regist_btn");

	usrName.M_addEvent('keyup',function(){

		if(usrName.value.length>=6)
			usrName.checkInput(usrName.value,[
				{
					method:'isWithInScope',
					success:function(data){
						outputCorrect(stage,data);
					},
					err:function(data){
						outputError(stage,data);
					}
				}
			]);
	});
	
	pwd.M_addEvent('keyup',function(){
		if(pwd.value.length>=6){
			pwd.checkInput(pwd.value,[{
				method:'isWithInScope',
				success:function(data){
						outputCorrect(stage,data);
				},
				err:function(data){
					outputError(stage,data);
				}
			}
			]);
		}
	});
	
	registUserName.M_addEvent('keyup',function(){
		if(registUserName.value.length>=6){
			registUserName.checkInput(registUserName.value,[{
					method:'isWithInScope',
					success:function(data){
						outputCorrect(registStage,data);
					},
					err:function(data){
						outputError(registStage,data);
					}
				}
			]);
		}
	});
	registUserName.M_addEvent('blur',function(){
		if(registUserName.value.length>=6){
			registUserName.checkInput(registUserName.value,[
				{
					method:'isCheckFromBack',
					ajax:{
						url:'',
						method:'',
						success:function(){
							outputCorrect(registStage,"Welcome to Funtake ^_^");
							console.log('success');
						},
						error:function(data){
							outputError(registStage,data);
						},
						data:{username:registUserName.value}
					}
				}
			]);
		}
	});
	
	registPwd.M_addEvent('keyup',function(){
		if(registPwd.value.length>=6){
			registPwd.checkInput(registPwd.value,[{
					method:'isWithInScope',
					success:function(data){
						outputCorrect(registStage,data);
					},
					err:function(data){
						outputError(registStage,data);
					}
				}
			]);
		}
	});
	
	registCheckPwd.M_addEvent('keyup',function(){
		if(registCheckPwd.value.length>=6){
			registCheckPwd.checkInput(registCheckPwd.value,[{
					method:"isSameWithOther",
					text:registPwd.value,
					output:"密码与密码验证不一致",
					success:function(data){
						outputCorrect(registStage,data);
					},
					err:function(data){
						outputError(registStage,data);
					}
				},
				{
					method:'isWithInScope',
					success:function(data){
						outputCorrect(registStage,data);
					},
					err:function(data){
						outputError(registStage,data);
					}
				}
			]);
		}
	});
	
	registTel.M_addEvent('blur',function(){
		if(registTel.value.length>=1){
			registTel.checkInput(registTel.value,[{
					method:'isMobile',
					success:function(data){
						outputCorrect(registStage,data);
					},
					err:function(data){
						outputError(registStage,data);
					}
				}
			]);
		}
	});
	
	registEmail.M_addEvent('blur',function(){
		if(registEmail.value.length>0){
			registEmail.checkInput(registEmail.value,[{
					method:'isEmail',
					success:function(data){
						outputCorrect(registStage,data);
						registCodeBtn.disabled=false;
					},
					err:function(data){
						outputError(registStage,data);
						registCodeBtn.disabled=true;
					}
				}
			]);
		}
	});
	
	registSendBtn.M_addEvent('click',function(e){
		if(registPwd.value===registCheckPwd.value){//如果所有验证信息都正确则提交
			
		}
		else{
			outputError(registStage,"密码与密码验证不一致");
			e.preventDefault();
			e.returnValue=false;
		}

	})
}

function outputError(obj,data){
	obj.className = 'warning';
	obj.innerHTML = data;
}
function outputCorrect(obj,data){
	obj.className = '';
	obj.innerHTML = data;
}

window.onload = function() {
	imageGalleryAnimation();
	itemScrollAnimation();
	loginAndRegiste();
	checkPaginSign();
}