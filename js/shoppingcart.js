const Container = document.querySelector('#cartDetailContainer');
const imgsrc = ['beer3', 'beer22', 'snack1', 'snack3'];
const names = ['아사히', '기네스', '오다리', '꾸잉칩'];
const counts = [1, 1, 1, 1];
const prices = ['4,500', '4,500', '1,000', '1,700'];
let itemN = 1;
let time = 0;

for(let i = 0; i < names.length; i++) {
    addItem(imgsrc[i], names[i], counts[i], prices[i]);
}

function addItem(imgsrc, name, count, price) {
    const item = document.createElement('div');
    item.classList.add('row', 'text-center', 'align-items-center', 'item');
    item.innerHTML = `
        <div class="col-sm-1 rightborder">
            <div class="form-check checkboxstyle">
                <input class="form-check-input checkbox_in_item" type="checkbox" value="" id="itemCheck${itemN++}">
            </div>
        </div>
        <div class="col-sm-7">
            <div class="row">
                <div class="col-sm-3">
                    <img src="../img/${imgsrc}.png">
                </div>
                <div class="item-info col-sm-9">
                    <div class="row">
                        <p>${name}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-2 leftborder">
            <p class="horizontalCenter el_price">${price}</p>
        </div>
        <div class="col-sm-2 leftborder">
                <div class="input-group-sm">
                    <input type="number" class="form-control inputNumbox" style="width:100px">
                </div>
        </div>
    `;
    Container.appendChild(item);
}

const itemAllCheck = document.querySelector('#itemAllCheck');
const items = document.querySelectorAll('.checkbox_in_item');
const countbox = document.querySelectorAll('.inputNumbox');
const el_prices = document.querySelectorAll('.el_price');
const el_totalprice = document.querySelector('#totalprice');
let itemprice, totalprice = 0;

for(let i = 0; i < items.length; i++) {
    countbox[i].value = 1;
    itemprice = parseInt(prices[i].replace(',', ''));
    totalprice += itemprice;
}

for(let i = 0; i < items.length; i++) {
    countbox[i].addEventListener('input', () => {
        if(countbox[i].value < 1) {
            countbox[i].value = 1;
        }
        itemprice = parseInt(prices[i].replace(',', ''));
        console.log(itemprice);
        newprice = itemprice * countbox[i].value;
        newtotalprice = totalprice + newprice - itemprice;
        el_prices[i].innerHTML = newprice.toLocaleString('ko-KR');
        el_totalprice.innerHTML = newtotalprice.toLocaleString('ko-KR');
    });
}

itemAllCheck.addEventListener('click', () => {
    if(itemAllCheck.checked) {
        items.forEach(item => {
            item.checked = true;
        });        
        console.log('checked');
    } else {
        items.forEach(item => {
            item.checked = false;
        });        
        console.log('unchecked');
    }
});
itemAllCheck.click();