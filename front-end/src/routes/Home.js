import React, { useContext } from 'react';
import { DataContext } from '../state/context';


// Note will need to implement Unit 4 in order to adjust to changes in DB

// class Home extends Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//             <h1>Home page</h1>
//         )
//     }
// };

function Home() {
    const data = useContext(DataContext);
    console.log(data);
    return (
        <h1>Home page</h1>
    );
}

export default Home;