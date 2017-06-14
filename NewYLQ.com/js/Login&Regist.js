//登录注册的函数块
function loginAndRegiste(obj,body,loginBtnLi,registeBtnLi,bodyClass){
	//查找的注册登录按钮在不同界面要更换
//	var obj = document.querySelectorAll('.content-main-nav-btn span');
//	var body = document.getElementsByClassName('content-main-blur')[0];
	//loginBtnLi和registeBtnLi在不同界面要更换
//	var loginBtnLi = obj[0],registeBtnLi = obj[2]; 
	var pageShow=false,personInfoShowBoolean=false;
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
		//此处className 的名字在各个页面中不一致
		body.className=bodyClass;
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
	checkPaginSign(closeLoginAndRegistePage);
	personCenterBtn();
}
//登录注册判断逻辑函数块
function checkPaginSign(loginPageCloseFunc){
	var usrName = document.getElementById("username"),
		pwd = document.getElementById("password"),
		stage = document.getElementById("errorStage"),
		loginBtn = document.getElementById("login_btn");
		registUserName = document.getElementById("regist_username"),
		registPwd = document.getElementById("regist_password"),
		registCheckPwd = document.getElementById("regist_checkpassword"),
		registTel = document.getElementById("regist_phonenumber"),
		registEmail = document.getElementById("regist_email"),
		registVerificationCode = document.getElementById("regist_verificationcode"),
		registStage = document.getElementById("regist_errorStage"),
		registCodeBtn = document.getElementById("regist_verificationcode_btn"),
		registSendBtn = document.getElementById("regist_btn"),
		exitBtn = document.getElementById('content-exit'),
		registCode = null,
		registUserName_bool = false, registPwd_bool = false, registCheckPwd_bool = false, registTel_bool = false,
		registEmail_bool = false;


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
	
	loginBtn.M_addEvent('click',function(){
		ajax({
			url:'',
			method:"post",
			data:{username:usrName.value,password:pwd.value},
			success:function(data){
				var data = JSON.parse(data);
				loginSuccess(data);
			},
			error:function(data){
				console.error("loginBtn click error "+data);
			}
		})
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
							registUserName_bool = true;
						},
						error:function(data){
							outputError(registStage,data);
							registUserName_bool = false;
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
						registPwd_bool = true;
					},
					err:function(data){
						outputError(registStage,data);
						registPwd_bool = false;
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
						registCheckPwd_bool = true;
					},
					err:function(data){
						outputError(registStage,data);
						registCheckPwd_bool = false;
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
						registTel_bool = true;
					},
					err:function(data){
						outputError(registStage,data);
						registTel_bool = false;
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
						registEmail_bool = true;
					},
					err:function(data){
						outputError(registStage,data);
						registCodeBtn.disabled=true;
						registEmail_bool = false;
					}
				}
			]);
		}
	});
	
	registCodeBtn.M_addEvent('click',function(){
		ajax({
			url:'',
			method:'post',
			success:function(data){
				registCode = JSON.parse(data).code;
			},
			error:function(data){
				console.error("registCodeBtn function error "+data);
			},
			data:registEmail.value
		});
	});//为发送验证码按钮注册事件
	
	exitBtn.M_addEvent("click",function(){
		//从登录状态转换到退出状态	
		loginAndRegistStatusChange().exit();
	});
	
	registSendBtn.M_addEvent('click',function(e){//点击发送按钮之后执行代码
		if(!registUserName_bool){
			outputError(registStage,"用户名已被占用");
			preventDefault(e);
			return;
		}
		if(!registPwd_bool){
			outputError(registStage,"密码格式错误");
			preventDefault(e)
			return;
		}
		if(!registCheckPwd_bool){
			outputError(registStage,"密码与密码验证不一致");
			preventDefault(e);
			return;
		}
		if(!registTel_bool){
			outputError(registStage,"手机号码格式不正确");
			preventDefault(e);
			return;
		}
		if(!registEmail_bool){
			outputError(registStage,"邮箱格式不正确");
			preventDefault(e);
			return;
		}
		if(!(registVerificationCode===registCode)){
			outputError(registStage,"验证码不正确");
			preventDefault(e);
			return;
		}
		loginPageCloseFunc();
	});
}

function personCenterBtn(){
	var personCenter = document.getElementById('personCenter');
	personCenter.M_addEvent('click',function(){
		if(!getUserId()){
			alert('请先登录，然后在访问个人中心');
		}
		else{
			window.navigate("personPage.html");
		}
	});
}


function outputError(obj,data){
	obj.className = 'warning';
	obj.innerHTML = data;
}
function outputCorrect(obj,data){
	obj.className = '';
	obj.innerHTML = data;
}

//登录成功之后执行的函数,Message是个数据对象，包含了用户的所有信息
function loginSuccess(Message){
	loginAndRegistStatusChange(Message).login();
}

function loginAndRegistStatusChange(Message){
	var leftPersonImage = document.getElementById("leftPersonImage"),
		leftPersonName = document.getElementById("leftPersonName"),
		login_registBtn = document.getElementById("content-login&regist");
		status = {
			login:function(){
				//此处为登录成功之后执行的代码
				leftPersonImage.src = Message.img;
				leftPersonName = Message.name;
				login_registBtn.style.display = "none";
				exitBtn.style.display = "inline";
				//后续相关登录成功代码添加处（可能的操作有cookie设置，localstorage设置）
			},
			exit:function(){
				//此处为退出登录后执行的代码
				leftPersonImage.src = "img/logo.png";
				leftPersonName = "未登录，请先登录";
				login_registBtn.style.display = "inline";
				exitBtn.style.display = "none";
				//后续相关退出代码添加处（可能有清除cookie，限制访问等措施）
			}
		};
	return status;
}
