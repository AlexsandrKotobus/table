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

const useState = React.useState;
function Excel ({headers, initialData}) {
  const [data, setData] = useState(initialData);
  const [sorting, setSorting] = useState({
    column: null,
    descending: false
  });
  const [edit, setEdit] = useState(null);

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
    console.log(dataCopy, {column, descending});
    // обновить две части состояния с помощью новых значений:
    setData(dataCopy);
    setSorting({column, descending});
  }
  function showEditor(e){
    setEdit({
      row: parseInt(e.target.parentNode.dataset.row, 10),
      column: e.target.cellIndex,
    });
  }

  function save(e){
    e.preventDefault();
    const input = e.target.firstChild;
    const dataCopy = clone(data);
    dataCopy[edit.row][edit.column] = input.value;
    setEdit(null);
    setData(dataCopy);

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
        <tbody onDoubleClick={showEditor}>
          {data.map((row, rowidx) => (
            // console.log('row, idx ', row, idx);
            // row - ряд, idx - индекс ряда
            <tr key={rowidx} data-row={rowidx}>
                {row.map((cell, columnidx) => {
                  if (
                    edit &&
                    edit.row === rowidx &&
                    edit.column === columnidx
                  ) {
                    cell = (
                      <form onSubmit = {save}>
                          <input type = 'text' defaultValue={cell} />
                      </form>
                    );
                  }
                return <td key={columnidx}>{cell}</td>
                })}
          </tr>
          ))}
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