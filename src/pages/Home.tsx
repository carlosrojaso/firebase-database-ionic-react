import { 
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonText,
  IonItemOptions,
  IonItemOption
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './Home.css';
import { db } from '../firebase';

const Home: React.FC = () => {
  const [itemsArray, setItemsArray] : any = useState([]);
  const itemsRef = db.ref('items');
  useEffect(() => {
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          text: items[item].text
        });
      }
      setItemsArray(newState);
    });
  }, [itemsRef]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ionic-react database firebase</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">ionic-react database firebase</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
        {itemsArray.map( (item: any) => { 
          return ( 
          <IonItemSliding key={item.id}>
            <IonItem>
              <IonLabel>
              <IonText color="primary">
                <h3>{item.text}</h3>
              </IonText>
              <p>{item.description}</p>
              </IonLabel>
            </IonItem>
            <IonItemOptions side="end">
            <IonItemOption onClick={() => {}}>Edit</IonItemOption>
            <IonItemOption onClick={() => {}} color="secondary">Delete</IonItemOption>     
            </IonItemOptions>
          </IonItemSliding>
          ); 
        })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
