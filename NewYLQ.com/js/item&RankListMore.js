

//页面初始化代码
function pageInit(){
	var	pageFlag = document.getElementById('flag').value,
		itemStage = document.getElementById('itemStage');
		
		
	
	//页面初始化时加载30条相关信息，
	function initItem(pageFlag,itemStage){
		var pageFlag = judgePageFlag(pageFlag),
			//根据信息写入urlAddress请求地址
			urlAddress = pageFlag? '' : '';
		ajax({
			url:urlAddress,
			method:'get',
			success:function(data){
				successAjaxFunc(data,pageFlag);
			},
			error:function(data){
				console.error('initItem message error: '+data);
			}
		})
	}
	
	//加载更多方法模块
	function addMoreFunc(pageFlag,itemStage){
		var addMoreBtn = document.getElementById('addMoreBtn'),
			pageFlag = judgePageFlag(pageFlag),
			//如果是true写入itemList后台获取更多数据的url，如果为false，写入rankList后台获取更多数据的url
			urlAddress = pageFlag?'':'';
			
		addMoreBtn.M_addEvent('click',function(){
			ajax({
				url:urlAddress,
				method:'get',
				success:function(data){
					successAjaxFunc(data,pageFlag);
				},
				error:function(data){
					console.error('addMoreBtn message error: '+data);
					//以下为测试代码
					
					/*data = [{
						name:'我不知道',
						image:'img/backgroundImg.jpg',
						info:'乱七八糟宿舍楼',
						count:1
					},{
						name:'我不知道2',
						image:'img/backgroundImg.jpg',
						info:'乱七八糟宿舍楼2'	,
						count:'222+'
					}];
					successAjaxFunc(data,pageFlag);*/
				}
			});
		});
	}
	
	//注册登录模块调用代码
	function loginAndRegisteApply(){
		var obj = document.querySelectorAll('.content-main-nav-btn span'),
			body = document.getElementsByClassName('content-main-blur')[0],
			loginBtnLi = obj[0],registeBtnLi = obj[2]; 
		loginAndRegiste(obj,body,loginBtnLi,registeBtnLi,'content-main-blur');
	}
	
	//单个项目搜索搜索模块
	function searchFunc(pageFlag,itemStage){
		var searchBtn = document.getElementById('searchBtn'),
			searchInput = document.getElementById('searchInput'),
			pageFlag = judgePageFlag(pageFlag),
			//...此处如何pageFlag为true写入itemList请求Url，如果为false写入rankList请求Url
			urlAddress = pageFlag?'':'';
		//点击后向后台发送请求
		searchBtn.M_addEvent('click',function(){
			ajax({
				url:urlAddress,
				method:'get',
				success:function(data){	
					itemStage.innerHTML = '';//清除原始信息
					successAjaxFunc(data,pageFlag);
				},
				error:function(data){
					console.error("searchBtn message error: "+data);
				}
			});
		});
	}
	
	function judgePageFlag(pageFlag){
		if(pageFlag === 'item'){
			return true;
		}
		else if(pageFlag === 'rank'){
			return false;
		}
	}
	
	function successAjaxFunc(data,pageFlag){
		var data = JSON.parse(data),
			itemFragment = document.createDocumentFragment(),
			//判断页面类别，封装对应方法
			funcMethod = pageFlag?itemPageModel:rankPageModel;
		//调用模块函数，封装数据
		for(var i = 0, len=data.length; i<len; i++){
			itemFragment.appendChild(funcMethod(data[i]));
		}
		//数据放入对应HTML位置
		itemStage.appendChild(itemFragment);
	}
	
	function thumbsUpFunc(itemStage){//点赞函数只在rankList页面进行封装
		itemStage.M_addEvent('click',function(e){//冒泡父对象
			var event = e || window.event,
				target = event.target || event.srcElement, //对event事件进行兼容
				clickElement = target.parentElement,
				name = clickElement.getAttribute('name');
			if(name === 'btn-like'){//如果点击的是点赞按钮执行事件
				ajax({
					url:'',//点赞之后后台url
					method:'get',
					success:function(data){//此处可以后台给我点赞数据也可自行计算点赞数
						var count = JSON.parse(data);
						clickElement.querySelector('span[name="count"]').innerHTML = count;
					},
					error:function(data){
						console.log('thumbsUpFunc message error:' + data);
					}
				});
			}
		});
	}
	
	
	//调用页面初始化模块方法
	initItem(pageFlag,itemStage);
	loginAndRegisteApply();
	searchFunc(pageFlag,itemStage);
	addMoreFunc(pageFlag,itemStage);
	if(!judgePageFlag(pageFlag)){//只有在rankListPage中执行的代码
		thumbsUpFunc(itemStage);
	}
}



addWindowLoad(pageInit);