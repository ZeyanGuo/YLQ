function initPage(){
	
	function loginAndRegisteApply(){
		var obj = document.querySelectorAll('.content-main-nav-btn span'),
			body = document.getElementsByClassName('content-main-blur')[0],
			loginBtnLi = obj[0],registeBtnLi = obj[2]; 
		loginAndRegiste(obj,body,loginBtnLi,registeBtnLi,'content-main-blur');
	}
	
	function acceptBtnFunc(){
		var acceptBtn = document.getElementById('acceptBtn'),
			itemId = getItemId(),
			userId = getUserId();
		
		acceptBtn.M_addEvent('click',function(){
			if(!userId){
				alert('在接单之前请先登录');
			}
			else{
				ajax({
					url:'',
					method:'get',
					success:function(data){
						//接单成功之后执行的代码
						alert('接单成功');
					},
					error:function(data){
						console.error('acceptBtnFunc message error: '+data);
					},
					data:{
						itemId:itemId,
						userId:userId
					}
				});
			}
		
		});
	}
	acceptBtnFunc();
	loginAndRegisteApply();

}


function initItemAndPerson(){
	var id = getItemId();
	ajax({
		url:'',
		method:'get',
		success:function(data){//获取初始化信息成功之后
			var data = JSON.parse(data),
				itemStage = document.getElementById('mainItemStage');
				model = null;
			//封装模块函数
			model = itemInfoModel(data);
			itemStage.innerHTML = model;
		},
		error:function(data){
			console.error('initItemAndPerson message error: '+data);
			
//以下注释内容是测试类容 测试itemInfo模块是否正确
//			var data = {
//				item:{
//					image:'img/timg (10).jpg',
//					name:'我的小丹丹',
//					tel:'15002398951',
//					address:'橘园一舍702',
//					money:'10',
//					qq:'403476891',
//					wechat:'wechatNumber'
//				},
//				publisher:{
//					image:'img/logo.png',
//					name:'我爱吃烤鸡翅',
//					tel:'15002398951',
//					qq:'qq',
//					wechat:'wechat'
//				},
//				receiver:{
//					image:'img/logo.png',
//					name:'我不爱吃烤鸡翅',
//					tel:'15002323231',
//					qq:'qqqq',
//					wechat:'wechatchat'
//				}
//			}
//			var itemStage = document.getElementById('mainItemStage');
//				model = null;
//			//封装模块函数
//			model = itemInfoModel(data);
//			itemStage.innerHTML = model;
		},
		data:{itemId:id}
	});
}
addWindowLoad(initPage);

