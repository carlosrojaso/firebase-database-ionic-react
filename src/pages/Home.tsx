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
  IonItemOption,
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/react';
import { add } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import './Home.css';
import SimpleModal from '../components/SimpleModal';
import { db } from '../firebase';

const Home: React.FC = () => {
  const [itemsArray, setItemsArray] : any = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({});
  
  useEffect(() => {
    const itemsRef = db.ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let tmpList = [];
      for (let item in items) {
        tmpList.push({
          id: item,
          text: items[item].text
        });
      }
      setItemsArray(tmpList);
    });
  }, []);

  const addToList = (item: any) => {

    const tmpList = [...itemsArray];

    const itemRef = db.ref(`items`);
    const newId = itemRef.push(item).key;
    item.id = newId;

    tmpList.push(item);
    setItemsArray(tmpList);
  };

  const editFromList = (item: any) => {
    
    const tmpList = [...itemsArray];

    const itemIndex = itemsArray.findIndex((elem: any) => (elem.id === item.id));

    const itemRef = db.ref(`/items/${item.id}`);
    itemRef.update(item);
    tmpList[itemIndex] = {...item};

    setItemsArray(tmpList);
    setItemToEdit({});
    setIsEditing(false);

    handleClose();
  };

  const getItemToEdit = (id: any) => {
    
    const itemIndex = itemsArray.findIndex((elem: any) => (elem.id === id));
    const tmpItem = {...itemsArray[itemIndex]};

    setItemToEdit(tmpItem);
    setIsEditing(true);

    handleOpen();
  };

  const removeFromList = (key: any) => {
 
    const tmpList = [...itemsArray];

    const itemIndex = itemsArray.findIndex((item: any) => (item.id === key));

    const itemRef = db.ref(`/items/${key}`);
    itemRef.remove().then(
      () => {
        tmpList.splice(itemIndex,1);
        setItemsArray(tmpList);
      }
    );
  };

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ionic-react db firebase</IonTitle>
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
              </IonLabel>
            </IonItem>
            <IonItemOptions side="end">
            <IonItemOption onClick={() => {getItemToEdit(item.id)}}>Edit</IonItemOption>
            <IonItemOption onClick={() => {removeFromList(item.id)}} color="secondary">Delete</IonItemOption>     
            </IonItemOptions>
          </IonItemSliding>
          ); 
        })}
        </IonList>
        <SimpleModal 
        addToList={addToList}
        editFromList={editFromList}
        toggleModal={setOpenModal}
        isOpen={openModal}
        handleClose={handleClose}
        isEditing={isEditing}
        itemToEdit={itemToEdit}
        />
        <IonFab onClick={() => handleOpen()} vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={add}/>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
