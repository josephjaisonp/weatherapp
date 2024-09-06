import ReactDOM from 'react-dom/client';
import App from './App';
 import './index.css';
 import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import { store,persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

 ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <Auth0Provider domain="dev-xvabw6x4gwjo0fum.us.auth0.com"
  clientId="imE4k7S8douGsd46S2KBBis0Xf7oFdGh"
  authorizationParams={{
    redirect_uri: window.location.origin
   }}
 >
    <Provider store={store}>
    <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
     <App />
     </PersistGate>
    </Provider>
   </Auth0Provider>
  ,
 );

