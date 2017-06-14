function pageInit(){
	var dateNumber = document.getElementById('date-number'),
		dateWeek = document.getElementById('date-week');
	
	//页面初始化等信息
	
	
	//初始化个人信息
	function initPersonInfo(){
		var personImg = document.getElementById('personImg'),
		    personName = document.getElementById('personName'),
		    personId = getUserId();
		
		ajax({
			url:'',//后台获取个人信息,
			method:'get',
			success:function(data){//此处可能需要修改，可能在cookie内部存储图片信息和个人相关信息，减少一次http请求
				var data = JSON.parse(data);
				personImg.setAttribute('src',data.image);
				personName.innerHTML = data.name;
			},
			error:function(data){
				console.error('initPersonInfo message error:' +data);
			},
			data:{id:personId}
		});
	}
	
	
	//初始化地理位置和天气等信息
	function initGeographyAndDate(){
		var date = getDate();
		showDate(date);

		//此处还要添加地理定位和天气信息获取等代码
		getGeographyPlace();
		
	}
	
	//初始化item等信息
	function initGoodsAndOrders(){
		//此处id是用户的id 用于后台数据查询，在初始化个人信息时获取id信息
		getMyGoodsFunc(id);
		getMyOrdersFunc(id);
	}
	
	//获取当天日期信息
	function getDate(){
		var date = new Date();
		return {
			month:date.getMonth()+1,
			day:date.getDate(),
			week:date.getDay()
		}
	}
	
	function showDate(date){
		var weekArray = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
		dateNumber.innerHTML = date.month+'-'+date.day;
		dateWeek.innerHTML = weekArray[date.week];
	}
	
	function getGeographyPlace(){
		navigator.geolocation.getCurrentPosition(geographySuccess,geographyError);
	}
	
	function geographySuccess(position){
		var latitude = position.coords.latitude,
            longitude = position.coords.longitude;
            
        ajax({//后台获取地理位置和天气信息
        		url:'',
        		method:'get',
        		success:function(data){//成功之后更新相关数据信息
        			var data = JSON.parse(data),
        				dataTemperature = document.getElementById('date-temperature'),
        				dataDetail = document.getElementById('date-detail');
        			dataTemperature.innerHTML = data.temperature;
        			dataDetail.innerHTML = data.detail;
        		},
        		error:function(data){
        			console.error('geographySuccess ajax message error: '+data);
        		},
        		data:{latitude:latitude,longitude:longitude}
        });
	}
	function geographyError(err){
		console.error("getGeographyPlace message error:"+err);
	}
	
	//为两个项目段绑定删除事件
	function deleteItemEvent(){
		var MyGoodsStage = document.getElementById('my-goods-stage'),
			MyOrdersStage = document.getElementById('my-orders-stage'),
			MyGoodsStage = document.getElementById('my-goods-stage'),
			MyOrdersStage = document.getElementById('my-orders-stage');
		MyGoodsStage.M_addEvent('click',function(e){
			deleteFunc(e,MyGoodsStage);
		});
		MyOrdersStage.M_addEvent('click',function(e){
			deleteFunc(e,MyOrdersStage);
		});
	}
	
	function deleteFunc(e,stage){
		var event = e || window.event,
			target = event.target || event.srcElement,
			userid = getUserId(),
			itemid = target.getAttribute('name');

		if(target.getAttribute('data-flag') === 'delete'){
			if(confirm('确认放弃该订单？'))
				ajax({
					url:'',//删除个人与项目关联的url
					method:'get',
					success:function(data){
						stage.removeChild(target.parentElement.parentElement);
					},
					error:function(data){
						console.error("deleteFunc message error: " + data);
					},
					data:{id:userid,itemid:itemid}
				});
		}
	}
	
	function initMyGoodsAndOrdersEvent(){//为各个按钮绑定监听事件
		var MyGoodsFinishedBtn = document.getElementById('my-goods-finished'),
			MyGoodsUnFinishedBtn = document.getElementById('my-goods-unfinished'),
			MyOrdersFinishedBtn = document.getElementById('my-orders-finished'),
			MyOrdersUnFinishedBtn = document.getElementById('my-orders-unfinished'),
			MyGoodsMoreBtn = document.getElementById('my-goods-more'),
			MyOrdersMoreBtn = document.getElementById('my-orders-more'),
			MyGoodsStage = document.getElementById('my-goods-stage'),
			MyOrdersStage = document.getElementById('my-orders-stage');
			
		MyGoodsFinishedBtn.M_addEvent('click',function(){
			getMyGoodsFinished(MyGoodsStage);
		});
		MyGoodsUnFinishedBtn.M_addEvent('click',function(){
			getMyGoodsUnFinished(MyGoodsStage);
		});
		MyOrdersFinishedBtn.M_addEvent('click',function(){
			getMyGoodsFinished(MyOrdersStage);
		});
		MyOrdersUnFinishedBtn.M_addEvent('click',function(){
			getMyOrdersUnFinished(MyOrdersStage);
		});
		MyGoodsMoreBtn.M_addEvent('click',function(){
			getMyGoodsMore(MyGoodsStage);
		});
		MyOrdersMoreBtn.M_addEvent('click',function(){
			getMyOrdersMore(MyOrdersStage);
		});
	}
	deleteItemEvent();
	initPersonInfo();
	initMyGoodsAndOrdersEvent();
	initGeographyAndDate();
}

function getMyGoodsMore(myGoodsStage){//获取更多订单信息
	var id = getUserId(),
		url = ''; //更多订单信息的后台获取地址
	getMyGoodsFunc(id,url,myGoodsStage);
}

function getMyOrdersMore(myGoodsStage){//获取更多任务信息
	var id = getUserId(),
		url = '';
	getMyOrdersFunc(id,url,myGoodsStage);
}

function getMyGoodsUnFinished(myGoodsStage){//获取未完成订单信息
	var id = getUserId(),
		url = '';
	myGoodsStage.innerHTML = '';
	getMyGoodsFunc(id,url,myGoodsStage);
}

function getMyGoodsFinished(myGoodsStage){//获取已完成订单信息
	var id = getUserId(),
		url = '';
	myGoodsStage.innerHTML = '';
	getMyGoodsFunc(id,url,myGoodsStage);
}

function getMyOrdersFinished(myGoodsStage){//获取已完成任务信息
	var id = getUserId(),
		url = '';
	myGoodsStage.innerHTML = '';
	getMyOrdersFinished(id,url,myGoodsStage);
}

function getMyOrdersUnFinished(myGoodsStage){//获取未完成任务信息
	var id = getUserId(),
		url = '';
	myGoodsStage.innerHTML = '';
	getMyOrdersFinished(id,url,myGoodsStage);
}


function getMyGoodsFunc(id,url,myGoodsStage){//此处传入用户的id,获取用户发布的货物信息
	ajax({
		url:url,//后台获取用户项目信息url
		method:'get',
		success:function(data){
			//用传入数据封装模版
			var data = JSON.parse(data),
				itemStorage = null;
			for(var i = 0, len = data.length; i<len; i++){
				item += personPageMyGoodsModel(data[i]);
			}
			myGoodsStage.innerHTML+=item;
			
		},
		error:function(data){
			console.error("getMyGoodsFunc message error: "+ data);
		},
		data:{userId:id}
	});
}
function getMyOrdersFunc(id,url,myGoodsStage){//此处传入用户的id，获取用户订阅的货物信息
	ajax({
		url:url,
		method:'get',
		success:function(data){
			var data = JSON.parse(data),
				itemStorage = null;
			for(var i = 0, len = data.length; i<len; i++){
				item += personPageMyOrdersModel(data[i]);
			}
			myGoodsStage.innerHTML+=item;
		},
		error:function(data){
			console.error("getMyOrdersFunc message error: "+ data);
		},
		data:{userId:id}
	});
}

addWindowLoad(pageInit);