import {
IonButton,
IonModal,
IonLabel,
IonItem,
IonInput
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './SimpleModal.css';

interface SimpleModalProps {
    toggleModal: any;
    isOpen: boolean;
    addToList: any;
    handleClose: any;
    editFromList: any;
    isEditing: any;
    itemToEdit: any;
}
    
const SimpleModal: React.FC<SimpleModalProps> = (props: any) => {
    const [text, setText] = useState('');
    const [errors, setErrors]: any = useState({});

    useEffect(() => {
        if(props.isEditing) {
            setText(props.itemToEdit.text);
        } else {
            setText('');
        }
        }, [props.isEditing, props.itemToEdit]);

    const save = () => {

        if (text.length < 4) {
            setErrors({message: 'Name must be at least 4 characters.'});
            } else {
    
            const newItem: any = {
                text
            };
    
            if(!props.isEditing) {
                props.addToList(newItem);
            } else {
                newItem.id = props.itemToEdit.id;
                props.editFromList(newItem);
            }
    
            setText('');
            props.handleClose();
            setErrors({});
            }
    };

    return (
        <IonModal isOpen={props.isOpen}>
        <form>
            <div className="alert-message">{errors && errors.message}</div>
            <IonItem>
            <IonLabel position="floating">Text</IonLabel>
            <IonInput
                id="name"
                name="name"
                value={text}
                onIonChange={(e: any) => setText(e.target.value)}
            />
            </IonItem>
            <IonItem>
                <IonButton onClick={() => save()} color="primary">Save</IonButton>
                <IonButton onClick={() => props.toggleModal(false)}>Cancel</IonButton>
            </IonItem>
        </form>
        </IonModal>
    );
};

export default SimpleModal;