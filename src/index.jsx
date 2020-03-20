import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import ButtonAppBar from './Containers/Header';
import SimpleFooter from './Containers/Footer';
import store from './Store/store';
import Home from './Containers/Home';
import theme from './Theme/muiTheme';
import People from './Containers/People';
import Planets from './Containers/Planets';

const App = ({ store }) => (

  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div style={{ display: 'flex', minHeight: '98vh', flexDirection: 'column' }}>
          <ButtonAppBar />
          <div style={{ flex: '1', backgroundColor: '#fffcde' }}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/people" component={People} />
              <Route path="/planets" component={Planets} />
            </Switch>
          </div>
          <SimpleFooter />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>

);

ReactDOM.render(<App store={store} />, document.getElementById('root'));
