import { IonPage, IonCard, IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonSkeletonText, IonCardContent, IonItemSliding, IonItemOptions, IonItemOption, IonModal, IonButton, IonInput, IonToast } from "@ionic/react"
import React, { useState } from "react";
import { add } from "ionicons/icons";

export default function Lists(props) {
    const { dispatchListAction, lists } = props;

    const [showModal, setShowModal] = useState(false);
    const [newListName, setNewListName] = useState();
    const [isEmpty, setIsEmpty] = useState(true);
    const [showToast1, setShowToast1] = useState(false);
    const [showToast2, setShowToast2] = useState(false);

    function handleIsEmpty() {
        if(lists.length < 1) {
            setIsEmpty(true);
        } 
        console.log(lists.length);
    }

    function handleFabClick() {
        setShowModal(true);
    }

    function handleNewList() {
        if(typeof newListName !== "string" || newListName.length === 0) {
            setShowToast1(true);
            return;
        }


        dispatchListAction({type: "addList", name: newListName});

        setIsEmpty(false);
        setNewListName("");
        setShowModal(false);
        setShowToast2(true);
    }

    function handleDelete(listId) {
        dispatchListAction({type: "deleteList", id: listId});
    }

    function handleDeleteAction(listId) {
        handleDelete(listId);
        handleIsEmpty();
    }

    const isLoading = false;
    // const isEmpty = false;
    let pageContent;

    if(isLoading) {
        pageContent = (
            <IonList>
                <IonItem>
                    <IonLabel>
                        <IonSkeletonText animated style={{ width: "80%" }} />
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>
                        <IonSkeletonText animated style={{ width: "80%" }} />
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>
                        <IonSkeletonText animated style={{ width: "80%" }} />
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>
                        <IonSkeletonText animated style={{ width: "80%" }} />
                    </IonLabel>
                </IonItem>
            </IonList>
        );
    } else if (isEmpty) {
        pageContent = (
            <IonCard>
                <IonCardContent>
                    You haven't created a list yet. Click + to add one.
                </IonCardContent>
            </IonCard>
        );
    } else {
        pageContent = (
            <IonList>
                {lists.map((list) => {
                    return (
                        <IonItemSliding key={list.id}>
                            <IonItem detail routerLink={`/lists/${list.id}`}>
                                <IonLabel>{list.name}</IonLabel>
                            </IonItem>
                            <IonItemOptions side="end">
                                <IonItemOption color="danger" expandable onClick={() => handleDeleteAction(list.id)}>Delete</IonItemOption>
                            </IonItemOptions>
                        </IonItemSliding>
                    );
                })}
            </IonList>
        );
    
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Lists</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                {pageContent}
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={handleFabClick}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
            <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
                <div>
                    <IonItem>
                        <IonLabel position="stacked">Name your list:</IonLabel>
                        <IonInput placeholder="Example: Best Movies" value={newListName} onIonChange={(event) => setNewListName(event.detail.value)} />
                    </IonItem>
                </div>
                <div>
                    <IonButton color="primary" expand="block" onClick={handleNewList}>
                        Save
                    </IonButton>
                    <IonButton color="danger" expand="block" onClick={() => setShowModal(false)}>
                        Cancel
                    </IonButton>
                </div>
            </IonModal>

            <IonToast
                isOpen={showToast1}
                onDidDismiss={() => setShowToast1(false)}
                message="Enter a list name"
                duration={2000}
                position="top"
                color="warning"
                animated="true"
                />

            <IonToast
                isOpen={showToast2}
                onDidDismiss={() => setShowToast2(false)}
                message="Created list"
                duration={2000}
                position="top"
                color="success"
                animated="true"
                />
        </IonPage>
    )
}