import { nanoid } from 'nanoid'

let listArray = []; // дефолтное значение списка занятий

export default function arrCombiner(dateValue, distanceValue) { // функция-сборщик целевого массива (для передачи в компонент <List>)

    const date = dateValue;
    const distance = parseFloat(distanceValue);

    console.log('props: ', date, distance);
    console.log('-------------------------------------');

    const updatedItemArray = {id: nanoid(), date: date, distance: distance }; // формируем из входящего параметра новый/обновлённый элемент списка

    console.log('updated Element is:')
    console.dir(updatedItemArray);  // КОНТРОЛЬНАЯ ТОЧКА
    console.log('=====================================');

    if (listArray.length !== 0) {
        
        let hasReplaced = false;    // маркер замены

       for (let i = 0; i < listArray.length; i++) {

            if (listArray[i].date === date) {
                const previouslyCompletedDistance = listArray[i].distance;
                updatedItemArray.distance = distance + previouslyCompletedDistance; // прибавляем ранее пройденную дистанцию к новому значению
                listArray.splice(i, 1, updatedItemArray); // заменяем текущий элемент на обновлённый
                hasReplaced = true;
            };
        
            if (hasReplaced === false) listArray.push(updatedItemArray);    // если замены элемента не было, то добавляем новый элемент в конец списка
        };
    
    } else listArray.push(updatedItemArray);    // добавляем новый элемент в конец списка
    console.log('updated Array is :', listArray);   // КОНТРОЛЬНАЯ ТОЧКА

    return listArray;
}