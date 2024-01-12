import React, { useState, useEffect, useLayoutEffect }  from "react";

function Example({layout}){
    if(layout===null){
        return null;
    }
    if(layout){
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useLayoutEffect(()=> {
            const table = document.getElemetnByTagName('table')[0];
            console.log(table.offsetWidth);
            table.width = '250px';
        }, []);
    } else {
        useEffect(() => {
            const table = document.getElementsByTagName('table')[0];
            console.log(table.offsetWidth);
            table.width = '250px';
          }, []);
        
    }
    return (
        <table>
            <thead>
                <th>Random</th>
            </thead>
            <tbody>
                {Array.from(Array(10000)).map((_, ind) => (
                    <tr key={ind}>
                        <td width={Math.random() * 800}> {Math.random()} </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function ExampleParent(){
    const [layout, setLayout] = useState(null);
    return (
        <div>
            <button onClick={() => setLayout(false)}>useEffect</button>{' '}
            <button onClick={() => setLayout(true)}>useLayoutEffect</button>{' '}
            <button onClick={() => setLayout(null)}>clear</button>
            <Example layout={layout} />
        </div>
    )


}

export default ExampleParent;