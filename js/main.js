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

  updateList();
})
//Добавление пункта по нажатию Enter

$("#inputText").keydown(function(event){
    if(event.which == 13){
      event.preventDefault();
      if (!$("#inputText").val()) return false;

      arrDo.push({id:arrDo.length+1,text:$("#inputText").val()});
      $("#inputText").val("");

      updateList();

      return false;
    }
});

//Удаление пунтка
function deleteDo(event) {
  let li = event.path[3];
  let n = Number(li.id.slice(2));
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
    +"<li id='pn" +(i+1) + "'> <div class='container'> <div class='visuDisplay point'>"
    + item.text + "</div> <div class='noneDisplay divinput'> <label title='Введите текст. Нажмите Enter |&crarr;|'>  <input id='in" + (i+1)+ "' type='text' size='30'> </label> </div> <div class='buttons'> <button  onclick='deleteDo(event)'>Удалить</button> <button onclick='buttEdit(event)'>Изменить</button> </div> </div> </li>");
  });
}


//Сохранение в Local Storage
$("#seveLS").on("click",()=>{
  const parsed = JSON.stringify(arrDo);
  localStorage.setItem('arrDoTo', parsed);
})

//Изменить пункт
function buttEdit(event) {
  let buf = event.path[3];
  let id = "#" + buf.id;
  let n = Number(buf.id.slice(2));
  console.log(id);
  $(id).find(".container").find(".point").attr("class","noneDisplay point");
  $(id).find(".container").find(".divinput").attr("class","visuDisplay divinput");
  $(id).find(".container").find("input").val(arrDo[n-1].text);
}

//Применить изменения
$(".list").delegate("input","keydown",function (event) {
  if(event.key ==="Enter") {
      let n = Number($(this).attr("id").slice(2));
      let id = "#pn" + n;
      arrDo[n-1].text = $(this).val();
      $(id).find(".container").find(".point").attr("class","visuDisplay point");
      $(id).find(".container").find(".divinput").attr("class","noneDisplay divinput");
      updateList();
  }
});
