import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import './App.css';
import './table.css';
import PropTypes from 'prop-types';
// import BootstrapTable from 'react-bootstrap-table-next';




// function clone(o){
//   return JSON.parse(JSON.stringify(o));
// }
// function sort(e){
//   const column = e.target.cellIndex;
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

const Excel = function (props) {

 function sort(e){
    console.log('sort')
  }

  return (
    <div className="App">
      <table>
        <thead onClick={()=> say(props)}>
          <tr>{props.headers.map((title, ind) =>{
           // console.log(title, ind);
            return <th key={ind}>{title}</th>;
          })}
          </tr>
         
        </thead>
        <tbody>
          {props.initialData.map((row, ind) => (
            <tr key={ind}>
            {row.map((cell, ind) => (
              <td key={ind}>{cell}</td>
            ))}
          </tr>
          ))}
        </tbody>
        
      </table>
          
    </div>
  );
  function say(){
    console.log(props);
  }
}



Excel.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.number),
  
  initialData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};



const headers = ['Book', 'Author', 'Language', 'Published',  'Sales'];
const data = [
  [
    'A Tale of Two Cities',
    'Charles Dickens',
    'English',
    '1859',
    '200 million',
  ],
  [
    'Le Petit Prince (The Little Prince)',
    'Antoine de Saint-Exupéry',
    'French',
    '1943',
    '150 million',
  ],
  [
    "Harry Potter and the Philosopher's Stone",
    'J. K. Rowling',
    'English',
    '1997',
    '120 million',
  ],
  [
    'And Then There Were None',
    'Agatha Christie',
    'English',
    '1939',
    '100 million',
  ],
  [
    'Dream of the Red Chamber',
    'Cao Xueqin',
    'Chinese',
    '1791',
    '100 million',
  ],
  ['The Hobbit', 'J. R. R. Tolkien', 'English', '1937', '100 million'],
];


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Excel headers = {headers} initialData = {data} />
);

