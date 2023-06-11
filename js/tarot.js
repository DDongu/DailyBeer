/* 변수들 */
var cardNum = cardRandom(); // 카드 랜덤 선택
var chosenCard = []; // 뒤집힌 카드
console.log(cardNum);


/* 카드 2장 랜덤으로 뽑기 */
function cardRandom () {
  var arr = []
  for (i=0; i<2; i++) {
    num = Math.floor(Math.random()*9)+1;
    if (arr.indexOf(num) === -1) {
      arr.push(num);
    } else { i--; }
  }
  arr.sort();
  return arr;
};


function seeResult() {

  const randomNum = String(cardNum[0])+String(cardNum[1]);
  console.log(randomNum);
  // 결과 보내기
  localStorage.setItem("cardNum", randomNum);
  // 창 이동하기
  document.location.href='../src/tarot2.html';
};

$(document).ready(function(){

  /* 카드 2개만 선택하기 */
  $(".card").click(function() {
    var tagId = $(this).attr('id'); // 뒤집을 카드의 id값 가져오기
    if (chosenCard.includes(tagId)) {
      //alert("이미 뒤집힌 카드입니다.");
      $(this).toggleClass('flipped'); // 카드 뒤집기
    } else {
      chosenCard.push(tagId);
      var cardLength = chosenCard.length;
      if (cardLength<=2) {
        /* 카드 뒷면 사진 추가*/
        var content = $('#'+tagId+" .front .image-custom");
        console.log(content);
        if (cardLength==1) {
          var cardSrc = '../img/tarot/card'+cardNum[0]+'.jpg'
        }
        else if (cardLength==2) {
          var cardSrc = '../img/tarot/card'+cardNum[1]+'.jpg'
        }
        content.attr("src", cardSrc); // 사진 경로 변경
        $(this).toggleClass('flipped'); // 카드 뒤집기

      } 
      else {
        chosenCard.pop();
        alert("카드는 2개만 고를 수 있습니다.");
      }
    }
    console.log(chosenCard);
  })


  /* 팝업 알람 부분 */
  $(".popup, .overlay").click(function(){
    $(".overlay, .popup").fadeOut();
  });
  $(".overlay, .popup").fadeToggle();

});