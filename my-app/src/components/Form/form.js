import React from "react";
import { useState } from "react";
import "./form.css";
import List from "./List";
import arrCombiner from "./arr_combiner";
// import PropTypes from "prop-types";
// import UserModel from "../models/UserModel";

let dateValue = '';            // начальное значение даты
let distanceValue = '';        // начальное значение дистанции

export default function Form() {  // КОМПОНЕНТ Формы
  
  const [form, setForm] = useState({ // перечисляем все изменяемые параметры внутри формы
    date_input: '',
    distance_input: '',
  });

  const [itemsObj, setItemsObj] = useState([]); // массив объектов, передаваемыех в компонент <List />

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('input').focus();
  });
      
  const handleDateChange = evt => { // функция обработки набора символов внутри input-а "ДАТА"
    
    setForm(prevForm => ({...prevForm, date_input: evt.target.value}));
    
    if ((!(/[0-9.]/gm.test(evt.target.value))) || // проверка выражения по условию "что-то кроме цифр и точки"
        (evt.target.value.length > 8)) // или длина вставленной в поле строки более 8 символов
       { 
        setForm(prevForm => ({...prevForm, date_input: ''})) // очищаем поле
      };
    
    if ((/(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.]\d\d/gmi.test(evt.target.value)) && evt.target.value.length === 8) { // если в поле "input" набрана корректная дата
      
      setForm(prevForm => ({...prevForm, date_input: evt.target.value}));
      dateValue = evt.target.value;
    }
    console.log('current Date = ', evt.target.value); //КОНТРОЛЬНАЯ ТОЧКА
  }

  const handleDistanceChange = evt => { // функция обработки набора символов внутри input-а "Пройдено км"

    setForm(prevForm => ({...prevForm, distance_input: evt.target.value}));

    if (/-?\d+(\.\d{0,})?/gmi.test(evt.target.value)) { // если в поле "distance" набрано корректное число
      
      setForm(prevForm => ({...prevForm, distance_input: evt.target.value}));
      distanceValue = evt.target.value;
      
      console.log('current Distance = ', evt.target.value); //КОНТРОЛЬНАЯ ТОЧКА
    } else {
      setForm(prevForm => ({...prevForm, distance_input: ''})) // очищаем поле
    }
  }
  
  const handleSubmit = evt => { // обработка нажатия "Enter"
    evt.preventDefault();
    if ((dateValue !== '') && (distanceValue !== '')) { // если все поля "input" корректно заполнены
      
      setItemsObj(prevItemsObj => arrCombiner(dateValue, distanceValue));
            
      console.log('correct enter dateItem = ', dateValue);            //КОНТРОЛЬНАЯ ТОЧКА
      console.log('correct enter distanceItem = ', distanceValue);    //КОНТРОЛЬНАЯ ТОЧКА
      console.log('date of itemsObj = ', arrCombiner(dateValue, distanceValue).date);         //КОНТРОЛЬНАЯ ТОЧКА
      console.log('distance of itemsObj = ', arrCombiner(dateValue, distanceValue).distance); //КОНТРОЛЬНАЯ ТОЧКА
      
      dateValue = '';
      distanceValue = '';
      setForm(prevForm => ({...prevForm, distance_input: '', date_input: ''}));
      document.querySelector('input').focus();
    };
  }

  const handleClick = evt => { // ОБРАБОТКА НАЖАТИЯ КНОПКИ

    if ((dateValue !== '') && (distanceValue !== '')) { // если все поля "input" корректно заполнены
      
      setItemsObj(prevItemObj => arrCombiner(dateValue, distanceValue));
            
      console.log('correct enter dateItem = ', dateValue);            //КОНТРОЛЬНАЯ ТОЧКА
      console.log('correct enter distanceItem = ', distanceValue);    //КОНТРОЛЬНАЯ ТОЧКА
      console.log('date of itemObj = ', arrCombiner(dateValue, distanceValue).date);        //КОНТРОЛЬНАЯ ТОЧКА
      console.log('distance of itemObj = ', arrCombiner(dateValue, distanceValue).distance); //КОНТРОЛЬНАЯ ТОЧКА
      
      dateValue = '';
      distanceValue = '';
      setForm(prevForm => ({...prevForm, distance_input: '', date_input: ''}));
      document.querySelector('input').focus();
    };
  };

  return (
    <main className="content">
        <div className="card">
          <div className="tasks" id="tasks">
            <form className="tasks__control" onSubmit={handleSubmit} id="tasks__form">
              <label htmlFor="date_input">Дата (ДД.ММ.ГГ)
                <input 
                  type="text" 
                  className="tasks__input" 
                  name="date_input" 
                  id="date__input" 
                  placeholder="Введите датау ДД.ММ.ГГ"
                  value={form.date_input}
                  onChange={handleDateChange} />
              </label>
              <label htmlFor="distance_input">Пройдено км
                <input type="text" 
                  className="tasks__input" 
                  name="distance_input" 
                  id="distance__input" 
                  placeholder="Введите кол-во КМ"
                  value={form.distance_input}
                  onChange={handleDistanceChange} />
              </label>
              <button className="tasks__add" onClick={handleClick} id="tasks__add">Добавить</button>
            </form>
            <List itemsObj={itemsObj} />
          </div>
        </div>
    </main>
  );
};

List.defaultProps = {
  dataArr: []
  };

/*
ShopItemFunc.propTypes = {
  itemArray: PropTypes.arrayOf(UserModel).isRequired
}
*/