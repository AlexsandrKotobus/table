import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import './App.css';
import './table.css';
import PropTypes from 'prop-types';

const Excel = function (props) {
  console.log(props);
  //const headers =[];
  // for (const title of  props.headers){
  //   headers.push(<th>{title}</th>)
  // }
  return (
    <div className="App">
      <table>
        <thead>
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
}



Excel.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string),
  initialData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

const headers = [100, 'Author', 'Language', 'Published',  'Sales'];
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

