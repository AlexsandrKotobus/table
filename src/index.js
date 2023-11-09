import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import './App.css';
import './table.css';
import PropTypes from 'prop-types';
// import BootstrapTable from 'react-bootstrap-table-next';



// функция clone() способ глубокого копирования на скорую руку с помощью кодирования/декодирования JSON:
function clone(o){
  return JSON.parse(JSON.stringify(o));
}

// function sort(e){
//   const column = e.target.cellidxex;
//   const data = clone(this.state.data);
//   data.sort((a, b) => {
//     if (a[column] === b[column]) {
//       return 0;
//     }
//     return a[column] > b[column] ? 1 : -1;
//     });
//     this.setState({
//       data,
//     });
   
// }


function Excel ({headers, initialData}) {
  const [data, setData] = React.useState(initialData);
  const [sorting, setSorting] = React.useState({
    column: null,
    descending: false
  });

  function sort(e){
    const column = e.target.cellIndex;
    const descending = sorting.column === column && !sorting.descending;
    const dataCopy = clone(data);
    dataCopy.sort((a,b) =>{
      if (a[column] === b[column]){
        return 0;
      }
      return descending
      ? a[column] < b[column]
        ? 1
        : -1
      : a[column] > b[column]
        ? 1
        : -1;

    })
    console.log('!!!!!!!!!!!!');
    setData(dataCopy);
    setSorting({column, descending});
  }
  return (
    <div className="App">
      <table>
        <thead onClick ={sort}>
          <tr>
            {headers.map((title, idx) => {
            // console.log('title, idx ', title, idx);
            if (sorting.column === idx){
              title += sorting.descending ? '\u2191' : '\u2193';
            }
           return <th key={idx}>{title}</th>
          })}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => {
            console.log('row, idx ', row, idx);
            // row - ряд, idx - индекс ряда
            return <tr key={idx}>
                {row.map((cell, idx) => (
              // cell - конкретная ячейка ряда, idx - в ряду
               <td key={idx}>{cell}</td>
            ))}
          </tr>
          })}
        </tbody>
      </table>
    </div>
  );
}


//проверка типов
Excel.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string),
  
  initialData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};



const headers = ['Book', 'Author', 'Language', 'Published',  'Sales'];
const data = [
  [     'A Tale of Two Cities',     'Charles Dickens',     'English',     '1859',     '200 million',   ],
  [     'Le Petit Prince (The Little Prince)',     'Antoine de Saint-Exupéry',     'French',     '1943',     '150 million',   ],
  [     "Harry Potter and the Philosopher's Stone",     'J. K. Rowling',     'English',     '1997',      '120 million',   ],
  [     'And Then There Were None',     'Agatha Christie',     'English',     '1939',     '100 million',   ],
  [     'Dream of the Red Chamber',     'Cao Xueqin',     'Chinese',     '1791',     '100 million',   ],
  [     'The Hobbit', 'J. R. R. Tolkien', 'English', '1937', '100 million'],
];




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Excel headers={headers} initialData={data}/>
);