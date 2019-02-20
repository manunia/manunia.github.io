/**
 * Created by Admin on 19.02.2019.
 */

//после загрузки DOM-дерева страницы
document.addEventListener("DOMContentLoaded",function() {

    //Подготовка данных для отправки на сервер
    //т.е. кодирование с помощью json
    var json = JSON.stringify({
        data: ''
    }),
        images = document.getElementsByClassName('image'),
        title = document.getElementsByClassName('sci-title'),
        grade = document.getElementsByClassName('sci-grade'),
        genre = document.getElementsByClassName('sci-genre'),
        price = document.getElementsByClassName('price'),
        showBonus = document.getElementById('showBonus'),

        oldText = [],
        newText = [];

    // 2. Создание переменной request
    var request = new XMLHttpRequest();
    // 3. Настройка запроса
    request.open('POST','http://krapipl.imumk.ru:8082/api/mobilev1/update',true);
    // 4. Подписка на событие onreadystatechange и обработка его с помощью анонимной функции
    request.addEventListener('readystatechange', function() {

        //если запрос пришёл и статус запроса 200 (OK)
        if ((request.readyState==4) && (request.status==200)) {

            var str = request.responseText;
            //console.log(request.responseText);
            //console.log(str);
            var data = JSON.parse(str);
            //console.log(data);

            for (var i=0; i<images.length; i++) {
                //console.log("Элемент [ "+ i +" ] = " + data.items[i].priceBonus + ' баллов, ' + data.items[i].price + ' рублей');
                images[i].src = 'https://www.imumk.ru/svc/coursecover/' + data.items[i].courseId;
                //title
                var titleStr = data.items[i].title,
                    titleArr = titleStr.split(/\.|,|:/);
                //console.log(titleArr + '->' + titleArr[1]);
                title[i].innerHTML = titleArr[1];
                //классы
                var classStr = data.items[i].grade,
                    classArr = classStr.split(';');
                if (classArr.length > 1) {
                    grade[i].innerHTML = classArr[0] + '-' + classArr[classArr.length - 1] + 'классы';
                } else {
                    grade[i].innerHTML = classArr[0] + ' класс';
                }

                genre[i].innerHTML = data.items[i].genre;

                price[i].innerText = data.items[i].price + ' рублей';

                oldText[i] = price[i].textContent;

                newText[i] = data.items[i].priceBonus + ' баллов';
            }

        }
    });

    // Устанавливаем заголовок Content-Type
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    // 5. Отправка запроса на сервер
    request.send(json);

    //перестановка баллов и цены
    showBonus.addEventListener('click', function () {
        for (var i= 0; i < price.length; i ++) {
            price[i].innerHTML = price[i].innerHTML.replace(oldText[i], newText[i]);
        }
        //console.log(oldText + " - " + newText);
        var temp = oldText;
        oldText = newText;
        newText = temp;
        //console.log(oldText + " - " + newText);
    });
});

var info = document.getElementById('InfoH1');

//поиск по названию
function searchFunc() {
    var input = document.getElementById('search'),
        filter = input.value.toUpperCase(),
        ul = document.getElementById('courseslist'),
        li = ul.getElementsByTagName('li');

    info.style.display = 'block';
    info.innerText = 'Результаты поиска:';

    for (var i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName('sci-title')[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}
//фильтр по предмету
function subjFilter() {
    var select = document.getElementById('subj'),
        ul = document.getElementById('courseslist'),
        li = ul.getElementsByTagName('li'),
        filter = select.value;

    info.style.display = 'block';
    info.innerText = 'Результаты поиска:';

    for (var i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName('sci-title')[0].innerHTML;
        if (a.indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}

//фильтр по жанру
function genreFilter() {
    var select = document.getElementById('genre'),
        ul = document.getElementById('courseslist'),
        li = ul.getElementsByTagName('li'),
        filter = select.value;
    for (var i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName('sci-genre')[0].innerHTML;
        if (a.indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}

//фильтр по классам
function gradeFilter() {
    var select = document.getElementById('grade'),
        ul = document.getElementById('courseslist'),
        li = ul.getElementsByTagName('li'),
        filter = select.value;
    for (var i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName('sci-grade')[0].innerHTML;
        if (a.indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}