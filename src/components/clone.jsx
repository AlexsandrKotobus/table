
// функция clone() способ глубокого копирования на скорую руку с помощью кодирования/декодирования JSON:
function clone(o){
    //JSON.stringify  возвращает JavaScript-значение, преобразованное в JSON-строку
    //JSON.parse преобразует строку JSON в JavaScript объект
    // console.log('1 ', JSON.stringify(o));
    // console.log('2', JSON.parse(JSON.stringify(o)));
    return JSON.parse(JSON.stringify(o));
  }

export default clone;