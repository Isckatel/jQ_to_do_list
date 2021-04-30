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
  updateList();
});

//Добавление пункта
$(".buttAdd").on("click", ()=>{
  if (!$("#inputText").val()) return;

  arrDo.push({id:arrDo.length+1,text:$("#inputText").val()});
  $("#inputText").val("");

  $(".list").html($(".list").html()
  +"<li id='pn" +(arrDo.length) + "'> <div class='container'> <div class='visuDisplay' name='point'>"
  + arrDo[arrDo.length-1].text + "</div> <div class='noneDisplay'> <label title='Введите текст. Нажмите Enter |&crarr;|'>  <input type='text' size='30'> </label> </div> <div class='buttons'> <button  onclick='deleteDo(event)'>Удалить</button> <button onclick='buttEdit(event)'>Изменить</button> </div> </div> </li>");
})

//Удаление пунтка
function deleteDo(event) {
  let li = event.path[3];
  n = Number(li.id.slice(2));
  let newArr =[];
  let i = 1;
  arrDo.forEach( item => {
    if (item.id != n) {
      newArr.push({id: i, text: item.text});
      i++;
    }
  });
  arrDo = newArr;
  updateList();
}

function updateList(){
  $('ol').empty();
  arrDo.forEach((item, i) => {
    $(".list").html($(".list").html()
    +"<li id='pn" +(i+1) + "'> <div class='container'> <div class='visuDisplay' name='point'>"
    + item.text + "</div> <div class='noneDisplay'> <label title='Введите текст. Нажмите Enter |&crarr;|'>  <input type='text' size='30'> </label> </div> <div class='buttons'> <button  onclick='deleteDo(event)'>Удалить</button> <button onclick='buttEdit(event)'>Изменить</button> </div> </div> </li>");
  });
}


//Сохранение в Local Storage
$("#seveLS").on("click",()=>{
  const parsed = JSON.stringify(arrDo);
  localStorage.setItem('arrDoTo', parsed);
})

//Изменить пункт
function buttEdit(event) {
  let buf = event.path[2];
  let el = buf.getElementsByName("point")[0];
  console.log(buf);
  console.log(el);
}
