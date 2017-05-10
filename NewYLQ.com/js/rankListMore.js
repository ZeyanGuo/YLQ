//登录注册的函数块
			function loginAndRegiste(){
				//查找的注册登录按钮在不同界面要更换
				var obj = document.querySelectorAll('.content-main-nav-btn span');
				var body = document.getElementsByClassName('content-main-blur')[0];
				//loginBtnLi和registeBtnLi在不同界面要更换
				var loginBtnLi = obj[0],registeBtnLi = obj[2],pageShow=false,personInfoShowBoolean=false;
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
					body.className='content-main-blur';
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
			window.onload = function() {
				loginAndRegiste();
			}