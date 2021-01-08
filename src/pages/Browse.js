import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader, IonButton, IonModal, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonToast } from "@ionic/react"
import React, { useState } from "react";
import data from "./data";

export default function Browse(props) {
    const { dispatchListAction, lists } = props;

    const [showModal, setShowModal] = useState(false);
    const [newAddMovie, setNewAddMovie] = useState();
    const [newSelectList, setNewSelectList] = useState();
    const [showToast1, setShowToast1] = useState(false);
    const [showToast2, setShowToast2] = useState(false);

    function handleModalClick() {
        setShowModal(true);
    }

    function handleNewAddMovie() {
        if(typeof newSelectList !== "string" || newSelectList.length === 0) {
            setShowToast1(true);
            return;
        }

        dispatchListAction({type: "addMovieToList", listId: newSelectList, movieId: newAddMovie});

        setNewAddMovie("");
        setNewSelectList("");
        setShowModal(false);
        setShowToast2(true);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Browse</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                {data.movies.map((movie) => {
                    return (
                        <IonCard key={movie.id}>
                            <IonCardHeader>
                                <IonCardTitle>{movie.title}</IonCardTitle>
                                <IonCardSubtitle>{movie.rating} | {movie.runTime}</IonCardSubtitle>
                                <IonButton color="primary" expand="block" value={movie.id} onClick={() => {setNewAddMovie(movie.id); handleModalClick();}}>
                                    Add to List
                                </IonButton>
                            </IonCardHeader>
                        </IonCard>
                    );
                })}
            </IonContent>

            <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
                <div>
                    <IonItem>
                        <IonLabel position="stacked">Add to which list?</IonLabel> 
                        <IonSelect placeholder="Select One" onIonChange={(event) => setNewSelectList(event.detail.value)} >
                            {lists.map((list) => {
                                return (
                                <IonSelectOption key={list.id} value={list.id}>{list.name}</IonSelectOption> 
                                );
                            })}
                        </IonSelect>
                    </IonItem>
                </div>
                <div>
                    <IonButton color="primary" expand="block" onClick={handleNewAddMovie}>
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
                message="Choose a list"
                duration={2000}
                position="top"
                color="warning"
                animated="true"
                />

            <IonToast
                isOpen={showToast2}
                onDidDismiss={() => setShowToast2(false)}
                message="Added to list"
                duration={2000}
                position="top"
                color="success"
                animated="true"
                />
        </IonPage>
    )
}