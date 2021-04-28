console.log("Скрипты подключены");
let arrDo = [
      {id:1, text:"Потренироваться на mastery.games"},
      {id:2, text:"Решить 2 задачи на JavaScript"}
    ];
let newDo = "";
let arrEditDo = ["",""];
let arrVisuInput = ["noneDisplay","noneDisplay"];
let arrVisuText = ["visuDisplay","visuDisplay"];

//Дожидаемся загрузки страницы и подгружаем данные из Local Storage
$(document).ready(()=>{
  if (localStorage.getItem('arrDoTo')) {
    try {
      arrDo = JSON.parse(localStorage.getItem('arrDoTo'));
      let k = arrDo.length;
      let n = arrVisuInput.length;
      for (let i = n;i<k;i++ ) {
      arrVisuInput.push("noneDisplay");
      }
      let l = arrVisuText.length;
      for (let i = l;i<k;i++ ) {
      arrVisuText.push("visuDisplay");
      }
    } catch(e) {
      localStorage.removeItem('arrDoTo');
    }
  }
  arrDo.forEach((item, i) => {
    $(".list").html($(".list").html()
    +"<li> <div class='container'> <div class='visuDisplay'>"
    + item.text + "</div> <div class='noneDisplay'> <label title='Введите текст. Нажмите Enter |&crarr;|'>  <input type='text' size='30'> </label> </div> <div class='buttons'> <button  onclick='deleteDo()'>Удалить</button> <button onclick='buttEdit()'>Изменить</button> </div> </div> </li>");
  });
});

$(".buttAdd").on("click", ()=>{
  if (!$("#inputText").val()) return;

  arrDo.push({id:arrDo.length+1,text:$("#inputText").val()});
  $("#inputText").val("");

  $(".list").html($(".list").html()
  +"<li> <div class='container'> <div class='visuDisplay'>"
  + arrDo[arrDo.length-1].text + "</div> <div class='noneDisplay'> <label title='Введите текст. Нажмите Enter |&crarr;|'>  <input type='text' size='30'> </label> </div> <div class='buttons'> <button  onclick='deleteDo()'>Удалить</button> <button onclick='buttEdit()'>Изменить</button> </div> </div> </li>");
})
