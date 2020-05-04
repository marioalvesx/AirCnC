import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login/Login';
import List from './pages/Lists/List';
import Book from './pages/Books/Book';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login, 
        List, 
        Book
    })
)

export default Routes;