import { IonIcon, IonContent, IonHeader, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import { listOutline, videocamOutline } from "ionicons/icons";
import { Route, Redirect } from "react-router";
import React from 'react';
import './Home.css';
import ListPage from './List';
import ListsPage from "./Lists";
import BrowsePage from "./Browse";
import useLists from "../hooks/useLists";

const Test = () => (<p>Test</p>);

const Home = () => {
  const [lists, dispatchListAction] = useLists();

  const pageProps = { lists, dispatchListAction }
 
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/" to="/lists" />
        <Route 
          path="/:tab(lists)" 
          render={() => <ListsPage {...pageProps} />} 
          exact 
        />
        <Route 
          path="/:tab(lists)/:id" 
          render={() => <ListPage {...pageProps} />} 
        />
        <Route 
          path="/:tab(browse)" 
          render={() => <BrowsePage {...pageProps} />} 
        />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="lists" href="/lists">
          <IonIcon icon={listOutline} />
          <IonLabel>Lists</IonLabel>
        </IonTabButton>
        <IonTabButton tab="browse" href="/browse">
          <IonIcon icon={videocamOutline} />
          <IonLabel>Browse</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Home;
