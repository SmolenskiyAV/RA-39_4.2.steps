/* eslint-disable jsx-a11y/anchor-is-valid */

// ### 

export default function List(props) {  // функция отрисовки всего списка

   const { itemsObj } = props;

    function ListItem(itemOfList) { // функция отрисовки элемента

        const { id } = itemOfList;
        const { date_str } = itemOfList;
        const { distance } = itemOfList;
        /*
        console.log('date: ', date);
        console.log('distance: ', distance);
        */
        return (
            <div key={id} className="task" id={id}>
                <div className="task__title">{date_str}</div>
                <div className="task__title">{distance}</div>
                <a href="#" className="task__remove">&times;</a>
            </div>
        )
    }   /*
        console.log('********************************')
        console.log('target ARRAY is: ', itemsObj);
        console.log('********************************')*/
    return (
        <div className="tasks__list" id="tasks__list">
            {itemsObj.map((itemOfList) => ListItem(itemOfList))}
        </div>
    );
}