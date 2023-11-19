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
  //JSON.stringify  возвращает JavaScript-значение, преобразованное в JSON-строку
  //JSON.parse преобразует строку JSON в JavaScript объект
  // console.log('1 ', JSON.stringify(o));
  // console.log('2', JSON.parse(JSON.stringify(o)));
  return JSON.parse(JSON.stringify(o));
}

const useState = React.useState;

function Excel ({headers, initialData}) {
  const [data, setData] = useState(
    clone(initialData).map((row, idx) => row.concat(idx)),
  );
  const [sorting, setSorting] = useState({
    column: null,
    descending: false
  });
 
  const [edit, setEdit] = useState(null);
  const [search, setSearch] = useState(false);
  const [preSearchData, setPreSearchData] = useState(null);

  function sort(e){
    const column = e.target.cellIndex;
    const dataCopy = clone(data);
    const descending = sorting.column === column && !sorting.descending;
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

    });
    console.log('dataCopy, {column, descending}', dataCopy, {column, descending});
    // обновить две части состояния с помощью новых значений:
    setData(dataCopy);
    setSorting({column, descending});
  }
  // 
  function showEditor(e){
    // console.log('e.target.cellIndex ', e.target.cellIndex);
    // console.log('e.target.parentNode.dataset.row ',e.target.parentNode.dataset.row);
    setEdit({
      row: parseInt(e.target.parentNode.dataset.row, 10),
      column: e.target.cellIndex,    
    });
  }
// 
  function save(e){
    e.preventDefault();
    const input = e.target.firstChild;     
    console.log('input ', input);
    const dataCopy = clone(data).map((row) => {
      if(row[row.length -1] === edit.row){
        row[edit.column] = input.value;
      }
      return row;
    });
    setEdit(null);  
    setData(dataCopy);

    // if(preSearchData == null){
    //   preSearchData = dataCopy;
    //   console.log("preSearchData :::", preSearchData)
    // }
    
    const preSearch = clone(preSearchData);
    console.log('preSearch 1', preSearch);
    //   console.log('preSearch ', preSearch);
    //   console.log('dataCopy ', dataCopy);
    //   console.log('data ', data);
    if(preSearch == null){
      console.log('preSearch = null')
      dataCopy[edit.row][edit.column] = input.value;
      setPreSearchData(dataCopy);

    }else{
      console.log('preSearch != null')
      preSearch[edit.row][edit.column] = input.value;
      setPreSearchData(preSearch);
    }
    // preSearch[edit.row][edit.column] = input.value;
    // setPreSearchData(preSearch);

  }


  // function save(e){
  //   e.preventDefault(); //сброс поведения по умолчанию
  //   const input = e.target.firstChild;
  //   console.log('input ', input);
  //   const dataCopy = clone(data);
  //   dataCopy[edit.row][edit.column] = input.value;

  //   console.log('input.value; ', input.value)
  //   setEdit(null);  
  //   setData(dataCopy);           // установка нового значения
  //   //
    
  // }




  // 
  function toggleSearch(){
    if(search){
      setData(preSearchData);
      setSearch(false);
      setPreSearchData(null);
    } else{
      setPreSearchData(data);
      setSearch(true);
    }
  }

  function filter(e){
    const needle = e.target.value.toLowerCase();
    if(!needle){
      setData(preSearchData);
      return;
    }
    const idx = e.target.dataset.idx;
    const searchdata = preSearchData.filter((row) => {
      return row[idx].toString().toLowerCase().indexOf(needle) > -1;
    });
    setData(searchdata);
  }

  const searchRow = !search ? null : (
    <tr onChange={filter}>
      {headers.map((_, idx) => (
        <td key ={idx}>
          <input type='text' data-idx = {idx} />
        </td>
      ))}
    </tr>
  );

  return (
    <div className="App">
      <div className='toolbar'>
        <button onClick ={toggleSearch}>
          {search ? 'Hide search' : 'Show search'}
        </button>
      </div>
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
          {searchRow}
          {data.map((row) => {
            // console.log('row, idx ', row, idx);
            // row - ряд, idx - индекс ряда
            const recordId = row[row.length -1];
            // console.log('recordId ', recordId);
            return(
              <tr key={recordId} data-row={recordId}>
                {row.map((cell, columnidx) => {
                  if(columnidx === headers.length){
                    return;
                  }
                  if (           
                    edit &&
                    edit.row === recordId &&
                    edit.column === columnidx
                  ) {
                    cell = (
                      <form onSubmit = {save}>
                          <input type = 'text' defaultValue={cell} />
                          {/* {console.log('cell ', cell)}; */}
                      </form>
                    );
                  }
                // console.log('cell olumnidx ', cell, columnidx);
                return <td key={columnidx}>{cell}</td>

                })}
              </tr>
            );
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