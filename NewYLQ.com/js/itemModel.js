function IndexPageModel(Obj){
	//此处还待完善 
	var stage = document.createElement('div'),
		linkPage = document.createElement('a'),
		model = `<div class="content-main-item-head">
								<img src=${Obj.img} />
							</div>
							<div class="content-main-item-info">
								<p>简介:</p>
								<span>${Obj.brief}</span>
							</div>
							<div class="content-main-item-personInfo">
								<span>姓名:</span>
								<p>${Obj.name}</p>
								<span>简介:</span>
								<p>${Obj.personbrief}</p>
							</div>
						</div>`;
	
	linkPage.href = 	Obj.urlPath;
	stage.appendChild(linkPage);
   	stage.className= 'content-main-item';
   	stage.M_addEvent('click',function(){
   		linkPage.click();
   	});
   	stage.innerHTML = model;
	return stage;
}
function OrderPageModel(Obj,formObj){//每调用一次返回一个模版对象，在调用处进行写入html文档防止页面回流过多次数
	var orderFragment = document.createDocumentFragment(),
		orderItem = document.createElement('div'),
		orderName = document.createElement('p'),
		orderAddress = document.createElement('p'),
		orderAddressDetail = document.createElement('p'),
		orderFloor = document.createElement('p'),
		orderTel = document.createElement('p'),
		orderBtndiv = document.createElement('div');
		orderSendBtn = document.createElement('button');
		orderDeleteBtn = document.createElement('button'),
		childrenObj = [];
	
	
	//模版json数据统一小写
	orderName.innerHTML = Obj.username;
	childrenObj.push(orderName);
	orderAddress.innerHTML = Obj.address;
	childrenObj.push(orderAddress);
	orderAddressDetail.innerHTML = Obj.addressdetail;
	childrenObj.push(orderAddressDetail);
	orderFloor.innerHTML = Obj.floor;
	childrenObj.push(orderFloor);
	orderTel.innerHTML = Obj.tel;
	childrenObj.push(orderTel);
	childrenObj.push(orderBtndiv);
	//封装数据
	
	orderItem.className = 'content-main-order-item';
	orderSendBtn.innerHTML = "配送到此地址";
	orderSendBtn.className = "btn content-main-order-send";
	orderSendBtn.M_addEvent('click',function(){
		//执行相关信息提交操作
		var itemInfo = document.createElement('input');
		itemInfo.name = "addressID";
		itemInfo.value = Obj.id;
		formObj.appendChild(itemInfo);
		formObj.submit();
	});
	orderDeleteBtn.innerHTML = "删除";
	orderDeleteBtn.className = "btn content-main-order-delete";
	orderDeleteBtn.M_addEvent('click',function(){
		//执行删除操作，向后台发送ajax
		ajax({
			url:'',
			method:'get',
			success:function(data){
				orderFragment.parentElement.removeChild(orderFragment);	
			},
			error:function(data){
				console.error("orderDeleteBtn error "+data);
			}
		});
	});
	
	orderBtndiv.appendChild(orderSendBtn);
	orderBtndiv.appendChild(orderDeleteBtn);
	
	for(var i=0,len=childrenObj.length;i<len;i++){
		orderItem.appendChild(childrenObj[i]);
	}
	orderFragment.appendChild(orderItem);
	
	return orderFragment;//返回最终封装的对象
}

//itemListMore页面的模版文件
function itemPageModel(Obj){
	var modelFragment = document.createDocumentFragment(),
		modelBodyItem = document.createElement('div'),
		modelImgItem = document.createElement('div'),
		modelImg = document.createElement('img'),
		modelAddressItem = document.createElement('p'),
		modelAddress = document.createElement('span'),
		modelPersonItem = document.createElement('p'),
		modelPersonImg = document.createElement('img'),
		modelName = document.createElement('span'),
		modelItemBtn = document.createElement('a');

	//为各个元素封装数据和样式
	modelBodyItem.className = 'content-body-item';
	modelImgItem.className = 'content-body-item-img';
	modelImg.src = Obj.image;
	modelAddress.innerHTML = Obj.address;
	modelPersonImg.className = 'icon-person';
	modelPersonImg.src = 'img/icon/addressbook.png';
	modelName.innerHTML = Obj.name;
	modelItemBtn.innerHTML = '接单';
	modelItemBtn.href = 'itemInfo.html#'+Obj.id;
	modelItemBtn.target = '_blank';
	modelItemBtn.className = 'btn content-body-item-btn btn-red';
	
	
	//将各个数据封装到documentFragment中
	modelImgItem.appendChild(modelImg);
	modelAddressItem.appendChild(modelAddress);
	modelPersonItem.appendChild(modelPersonImg);
	modelPersonItem.appendChild(modelName);
	modelPersonItem.appendChild(modelItemBtn);
	modelBodyItem.appendChild(modelImgItem);
	modelBodyItem.appendChild(modelAddressItem);
	modelBodyItem.appendChild(modelPersonItem);
	//将数据封装到modelFragment中用于返回
	modelFragment.appendChild(modelBodyItem);
	
	
	return modelFragment;
}

//rankListMore页面的模版文件
function rankPageModel(Obj){
	var modelFragment = document.createDocumentFragment(),
		modelBodyItem = document.createElement('div'),
		modelImgItem = document.createElement('div'),
		modelImg = document.createElement('img'),
		modelInfoItem = document.createElement('p'),
		modelInfo = document.createElement('span'),
		modelPersonItem = document.createElement('p'),
		modelPersonImg = document.createElement('img'),
		modelName = document.createElement('span'),
		modelLikeItem = document.createElement('span'),
		modelLikeImg = document.createElement('img'),
		modelCountItem = document.createElement('span');
		modelCount = document.createElement('span');
		
	//为各个元素封装数据和样式
	modelBodyItem.className = 'content-body-item';
	modelImgItem.className = 'content-body-item-img';
	modelImg.src = Obj.image;
	modelInfo.innerHTML = Obj.info;
	modelPersonImg.className = 'icon-person';
	modelPersonImg.src = 'img/icon/addressbook.png';
	modelName.innerHTML = Obj.name;
	modelLikeItem.name = "btn-like";
	modelLikeItem.className = 'content-body-item-like';
	modelLikeImg.src = 'img/icon/like.png';
	modelCount.name = 'count';
	modelCount.innerHTML = Obj.count;
	
	
	//将各个数据封装到documentFragment中
	modelImgItem.appendChild(modelImg);
	modelInfoItem.appendChild( modelInfo);
	modelLikeItem.appendChild(modelLikeImg);
	modelCountItem.appendChild(modelCount);
	modelLikeItem.appendChild(modelCountItem);
	modelPersonItem.appendChild(modelPersonImg);
	modelPersonItem.appendChild(modelName);
	modelPersonItem.appendChild(modelLikeItem);
	modelBodyItem.appendChild(modelImgItem);
	modelBodyItem.appendChild(modelInfoItem);
	modelBodyItem.appendChild(modelPersonItem);
	//将数据封装到modelFragment中用于返回
	modelFragment.appendChild(modelBodyItem);

	
	return modelFragment;
}

function personPageMyGoodsModel(Obj){//mygoods 模块的模版函数
	var model = `<div class="content-body-item">
		<div class="content-body-item-img">
			<img src=${Obj.image} />
		</div>
		<p><a href=${Obj.itemhref}${Obj.id}>${Obj.info}</a></p>
		<p><img class="icon-person" src="img/icon/addressbook.png" /><span>${Obj.name}</span><button name=${Obj.id} data-flag = 'delete' class="btn content-body-item-btn btn-red">删除</button></p>
	</div>`
	
	return model;
}
function personPageMyOrdersModel(Obj){//myorders 模块的模版函数
	var model =	`<div class="content-body-item">
			<div class="content-body-item-img">
				<img src=${Obj.image} />
			</div>
			<p><a href=${Obj.itemhref}${Obj.id}>${Obj.info}</a></p>
			<p><img class="icon-person" src="img/icon/addressbook.png" /><span>${Obj.name}</span><button name=${Obj.id} data-flag = 'delete' class="btn content-body-item-btn btn-red">删除</button></p>
		</div>`
	return model;
}
function itemInfoModel(Obj){
	var model = 	`<div class="content-item-info">
					<div class="item">
						<p class="title-p">${Obj.item.name}的订单</p>
						<hr />
						<img class="item-img" src="${Obj.item.image}" />
						<p class="title-p">详细信息</p>
						<hr />
						<div class="info-title">
							<p>姓名：</p>
							<p>联系电话：</p>
							<p>送货地址：</p>
							<p>预付金额：</p>
							<p>其他联系方式：</p>
							<img src="img/personInfoChange/QQ black.png" /><br />
							<img src="img/personInfoChange/wechat black.png" />
						</div>
						<div class="info-main">
							<p>${Obj.item.name}</p>
							<p>${Obj.item.tel}</p>
							<p>${Obj.item.address}</p>
							<p>¥${Obj.item.money}</p>
							<br />
							<p>${Obj.item.qq}</p>
							<p>${Obj.item.wechat}</p>
						</div>
						<hr />
						<div class="info-btn-div">
							<button id="acceptBtn" class="btn accept">我要接单</button>
						</div>
					</div>
				</div>
				<div class="content-person-info-sub">
					<div class="content-publisher-info">
					<div class="type">发单人</div>
					<div class="head">
						<div class="head-img">
						<img src="${Obj.publisher.image}"/>
						</div>
						<div class="head-text">${Obj.publisher.name}</div>
					</div>
					<div class="info">
						<div class="chat-btn">
							<img class="chat-icon" src="img/icon/chat.png" />
						</div>
						<div class="person-info-title">
							<p>联系电话</p>
							<img src="img/personInfoChange/QQ black.png" />
							<br />
							<img src="img/personInfoChange/wechat black.png" />
						</div>
						<div class="person-info-main">
							<p>${Obj.publisher.tel}</p>
							<p>${Obj.publisher.qq}</p>
							<p>${Obj.publisher.wechat}</p>
						</div>
					</div>
				</div>
					<div class="content-receiver-info">
						<div class="content-publisher-info">
						<div class="type">接单人</div>
						<div class="head">
							<div class="head-img">
							<img src="${Obj.publisher.image}"/>
							</div>
							<div class="head-text">${Obj.receiver.name}</div>
						</div>
						<div class="info">
							<div class="chat-btn">
								<img class="chat-icon" src="img/icon/chat.png" />
							</div>
							<div class="person-info-title">
								<p>联系电话</p>
								<img src="img/personInfoChange/QQ black.png" />
								<br />
								<img src="img/personInfoChange/wechat black.png" />
							</div>
							<div class="person-info-main">
								<p>${Obj.receiver.tel}</p>
								<p>${Obj.receiver.qq}</p>
								<p>${Obj.receiver.wechat}</p>
							</div>
						</div>
					</div>
					</div>
				</div>`
	return model;
	
}

