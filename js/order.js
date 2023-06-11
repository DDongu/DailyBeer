// get orderContainer
const orderContainer = document.getElementById('orderContainer');

// initialize Menu Transform Button
const menu_btn_div = document.createElement("div");
const selected_beer = document.createElement("button");
const selected_snack = document.createElement("button");

orderContainer.prepend(menu_btn_div);
menu_btn_div.appendChild(selected_beer);
menu_btn_div.appendChild(selected_snack);

selected_beer.classList.add("selected_btn");
selected_beer.innerHTML = "맥주";
selected_snack.classList.add("selected_btn");
selected_snack.innerHTML = "안주";

// initialize Menutable
const table = document.querySelector('#orderTable');
let tr = [];
let tr_i = 0;
let cart_name = [];
let cart_price = [];
let cart_index = [];
let totalprice = 0;

// execute makeMenu
selected_beer.click();

// function
function makeMenu(N, itemInfo, filename) {
    for(let i = 0; i < N; i++) {
        if (i % 5 == 0) {
            tr.push(document.createElement('tr'));
            table.appendChild(tr[tr_i++]);
        }
        addItem(i, `../img/${filename}${i+1}.png`, itemInfo[i].name, "", itemInfo[i].price);
    }

}

function addItem(itemindex, png, name, desc, price) {
    const td = document.createElement('td');
    const item_div = document.createElement('div');
    const img_div = document.createElement('div');
    const info_div = document.createElement('div');
    const btn_div = document.createElement('div');
    const btn_heart = document.createElement('button');
    const btn_buy = document.createElement('button');
    const img = document.createElement('img');
        
    const itemPng = png;
    const itemName = name;
    const itemDesc = desc;
    const itemPrice = price.toLocaleString('ko-KR');

    tr[tr_i-1].appendChild(td);
    td.appendChild(item_div);

    item_div.appendChild(img_div);
    item_div.appendChild(info_div);

    img_div.appendChild(btn_div);
    img_div.appendChild(img);

    btn_div.appendChild(btn_heart);
    btn_div.appendChild(btn_buy);

    item_div.classList.add('item');
    item_div.classList.add('text-left');

    img_div.classList.add('img_div');
    img_div.classList.add('text-center');

    info_div.classList.add('info_container');

    btn_div.classList.add('btn_div');
    btn_heart.classList.add('item_btn');
    btn_buy.classList.add('item_btn');
    btn_heart.innerHTML = `<img class="like" src="../img/btn_heart.png" />`;
    btn_buy.innerHTML = '<img class="buy" src="../img/btn_buy.png" />';
    img.classList.add('item_img');
    img.src = `../img/${itemPng}`;

    info_div.innerHTML = `<p class="b_name">${itemName}</p><p class="b_desc">${itemDesc}</p><p class="b_price">${itemPrice}원</p>`;

    // add click event
    btn_buy.onclick = function() {
        if(!btn_buy.classList.contains('checked')) {
            btn_buy.classList.add('checked');
            btn_buy.innerHTML = '<img class="buy" src="../img/btn_buy_checked.png" />';
            cart_index.push(itemindex);
            cart_name.push(name);
            cart_price.push(price);
            totalprice += price;
        } else {
            btn_buy.classList.remove('checked');
            btn_buy.innerHTML = '<img class="buy" src="../img/btn_buy.png" />';
            cart_index.pop(itemindex);
            cart_name.pop(name);
            cart_price.pop(price);
            totalprice -= price;
        }
    }
    btn_heart.onclick = function() {
        if(!btn_heart.classList.contains('checked')) {
            btn_heart.classList.add('checked');
            btn_heart.innerHTML = '<img class="like" src="../img/btn_heart_checked.png" />';
            // cart_name.push(name);
            // cart_price += price;
        } else {
            btn_heart.classList.remove('checked');
            btn_heart.innerHTML = '<img class="like" src="../img/btn_heart.png" />';
        }
    }
}



// go to shopping page
const cartjsonURL = '../json/cart.json';
const go_shoppping_btn = document.createElement('button');
orderContainer.appendChild(go_shoppping_btn);
go_shoppping_btn.id ='go_shopping_btn';
go_shoppping_btn.innerHTML = '장바구니로 가기';
go_shoppping_btn.classList.add('btn', 'btn-dark', 'btn-lg');

go_shoppping_btn.addEventListener('click', e => {
    alert(`장바구니에 [${cart_name}]가 담겼습니다.\n합계: ${totalprice.toLocaleString('ko-KR')}원`);
    // add data to cart.json
    const jsonData = cart_index.map((item, i) => ({
        index: item,
        name: cart_name[i],
        price: cart_price[i]
    }));
    saveData(jsonData);
    location.href = 'shoppingcart.html';
});

// 데이터 저장
function saveData(data) {
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'cart.json';
    a.click();
    URL.revokeObjectURL(url);
}

// // 데이터 리스트 렌더링
// function renderDataList(data) {
//     const dataList = document.getElementById('dataList');
//     dataList.innerHTML = '';

//     data.forEach((item, index) => {
//         const li = document.createElement('li');
//         li.innerHTML = `
//         <span>${item.name} - ${item.age}세</span>
//         <button class="delete-btn" data-index="${index}">삭제</button>
//         `;
//         dataList.appendChild(li);
//     });
// }
