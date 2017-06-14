<<<<<<< HEAD
function initAddressInfo(){//初始化页面信息函数
	var stage = document.getElementById('sendAddressStage'),
		formObj = document.getElementById('orderForm');
	ajax({//向后台发送请求，获取配送地址相关信息
		url:'',
		method:'get',
		success:function(data){//成功之后显示相关配送地址信息
			var data = JSON.parse(data),
				objFragment = document.createDocumentFragment();
			for(var i = data.length;i--;){
				objFragment.appendChild(OrderPageModel(data[i],formObj));
			}
			stage.appendChild(objFragment);
		},
		error:function(data){
// 测试代码 可删除
//			data=[{
//				id:'1',
//				username:'我爱吃烤鸡翅',
//				address:'测试地址',
//				addressdetail:'测试详细地址',
//				floor:'测试楼层',
//				tel:'测试电话'
//			}]
//
//				objFragment = document.createDocumentFragment();
//			for(var i = data.length;i--;){
//				objFragment.appendChild(OrderPageModel(data[i],formObj));
//			}
//			stage.appendChild(objFragment);
			console.error("InitPage error "+data);
		}
	});
}

function initAddNewAddress(){//初始化第二页面表单
	//获取表单相关信息
	var addNewAddressBtn = document.getElementById('addNewAddress'),
		username = document.getElementById('username_add'),
		address = document.getElementById('address_add'),
		floor = document.getElementById('floor_add'),
		tel = document.getElementById('tel_add'),
		username_span = document.getElementById('username_add_span'),
		address_span = document.getElementById('address_add_span'),
		floor_span = document.getElementById('floor_add_span'),
		tel_span = document.getElementById('tel_add_span'),
		stage = document.getElementById('sendAddressStage'),
		formObj = document.getElementById('orderForm'),
		username_bool = false, address_bool = false, floor_bool = false, tel_bool = false;
	
	username.M_addEvent('blur',function(){
		username.checkInput(username.value,[{
			method:'isNotEmpty',
			success:function(data){
				username_span.innerHTML = '';
				username_bool = true;
			},
			err:function(data){
				username_span.innerHTML = data;
				username_bool = false;
			}
		}]);
	});
	
	address.M_addEvent('blur',function(){
		address.checkInput(address.value,[{
			method:'isNotEmpty',
			success:function(data){
				address_span.innerHTML = '';
				address_bool = true;
			},
			err:function(data){
				address_span.innerHTML = data;
				address_bool = false;
			}
		}]);
	});
	
	floor.M_addEvent('blur',function(){
		floor.checkInput(floor.value,[{
			method:'isNotEmpty',
			success:function(data){
				floor_span.innerHTML = '';
				floor_bool = true;
			},
			err:function(data){
				floor_span.innerHTML = data;
				floor_bool = false;
			}
		}]);
	});
	
	tel.M_addEvent('blur',function(){
		tel.checkInput(tel.value,[{
			method:'isMobile',
			success:function(data){
				tel_span.innerHTML = '';
				tel_bool = true;
			},
			err:function(data){
				tel_span.innerHTML = data;
				tel_bool = false;
			}
		}]);
	});
	
	addNewAddressBtn.M_addEvent('click',function(e){
		if(tel_bool&&address_bool&&floor_bool&&username_bool){//当所有信息都正确之后执行代码段
			ajax({
				url:'',
				method:'post',
				success:function(data){
					var data = JSON.parse(data);
					stage.appendChild(OrderPageModel(data,formObj));
				},
				error:function(data){
					console.error("addNewAddressBtn error: "+ data);
				},
				data:{username:username.value,address:address.value,addressDetail:floor.value,tel:tel.value}
			});
		}else{
			alert("信息有误，请核对");
		}
		preventDefault(e);
	});
	
}
function InitPerson(){//初始化导航栏个人信息
	var userInfo = getUserInfo(),
		navUserName = document.getElementById('navUserName'),
		navExit = document.getElementById('navExit');
	navUserName.innerHTML = "您好，" + userInfo.username;
	navExit.M_addEvent('click',function(){
		exitWeb();
	});
}

function getUserInfo(){//从cookie中获取用户的相关信息，暂时未实现
	
}
function firstStepFrom(){//第一步表单验证函数
	var courierNumber = document.getElementById('courierNumber'),
		courierName = document.getElementById('courierName'),
		courierAddress = document.getElementById('courierAddress'),
		payMoney = document.getElementById('payMoney'),
		courierImg = document.getElementById('courierImg'),
		courierNumber_span=document.getElementById('courierNumber_span'),
		courierName_span = document.getElementById('courierName_span'),
		courierAddress_span = document.getElementById('courierAddress_span'),
		payMoney_span = document.getElementById('payMoney_span'),
		courierImg_span = document.getElementById('courierImg_span'),
		ImgStage = document.getElementById('ImgStage'),
		
		//获取页面跳转相关信息
		firstPage = document.getElementById('first'),
		secondPage = document.getElementById('second'),
		nextBtn = document.getElementById('nextStep'),
		previousBtn = document.getElementById('previousStep'),
		
		
		courierNumber_bool = false, courierName_bool = false, courierAddress_bool = false,
		payMoney_bool = false, courierImg_bool = false;
	
	//为各个表单注册监听函数
	courierNumber.M_addEvent('blur',function(){
		courierNumber.checkInput(courierNumber.value,[{
			method:'isNotEmpty',
			success:function(data){
				courierNumber_span.innerHTML = '';
				courierNumber_bool = true;
			},
			err:function(data){
				courierNumber_span.innerHTML = data;
				courierNumber_bool = false;
			}
		},{
			method:'isCourierNumber',
			success:function(data){
				courierNumber_span.innerHTML = '';
				courierNumber_bool = true;
			},
			err:function(data){
				courierNumber_span.innerHTML = data;
				courierNumber_bool =false;
			}
		}]);
	});
	
	courierName.M_addEvent('blur',function(){
		courierName.checkInput(courierName.value,[{
			method:'isNotEmpty',
			success:function(data){
				courierName_span.innerHTML = '';
				courierName_bool = true;
			},
			err:function(data){
				courierName_span.innerHTML = data;
				courierName_bool = false;
			}
		}]);
	});
	
	courierAddress.M_addEvent('blur',function(){
		courierAddress.checkInput(courierAddress.value,[{
			method:'isNotEmpty',
			success:function(data){
				courierAddress_span.innerHTML = '';
				courierAddress_bool = true;
			},
			err:function(data){
				courierAddress_span.innerHTML = data;
				courierAddress_bool = false;
			}
		}]);
	});
	
	payMoney.M_addEvent('blur',function(){
		payMoney.checkInput(payMoney.value,[{
			method:'isNotEmpty',
			success:function(data){
				payMoney_span.innerHTML = '';
				payMoney_bool = true;
			},
			err:function(data){
				payMoney_span.innerHTML = data;
				payMoney_bool = false; 
			}
		},{
			method:'isOnlyNumber',
			success:function(data){
				payMoney_span.innerHTML = '';
				payMoney_bool = true;
			},
			err:function(data){
				payMoney_span.innerHTML = data;
				payMoney_bool = false;
			}
		}]);
	});
	ImgStage.bool = false;
	addImgEventToObj(ImgStage);
	
	nextBtn.M_addEvent('click',function(){
		if(ImgStage.bool&&payMoney_bool&&courierAddress_bool&&courierName_bool&&courierNumber_bool){
			changeStyle(firstPage,'display','none');
			changeStyle(secondPage,'visibility','visible');
		}
		else{
			alert('请完善所有信息再进行下一步');
		}
	});
	
	previousBtn.M_addEvent('click',function(){
		changeStyle(secondPage,'visibility','hidden');
		changeStyle(firstPage,'display','block');
	});
}

			
window.onload=function(){
	firstStepFrom();
	initAddNewAddress();
}
=======
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
>>>>>>> ceb7fb2697dcd2f9b62a6913aeb9f39c47b8b6aa
