import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonBackButton, IonCardContent } from "@ionic/react"
import { list } from "ionicons/icons";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import data from "./data";

export default function List(props) {
    const { lists } = props;
    const { id } = useParams();
    const [isEmpty, setIsEmpty] = useState(true);
        
    const list = lists.find((list) => 
        list.id === id); 

    let movies = [];
    let pageContent;

    for(let i = 0; i < list.movies.length; i++) {
        data.movies.find((dataMovie) => {
            if(list.movies[i] === dataMovie.id) {
                movies.push(
                    {
                        id: dataMovie.id,
                        title: dataMovie.title,
                        rating: dataMovie.rating,
                        runTime: dataMovie.runTime,
                    
                    },
                );
            }
        })
    }

    if(list.movies.length < 1) {
        pageContent = (
            <IonCard>
                <IonCardContent>
                    Browse movies and add them to this list to see them here
                </IonCardContent>
            </IonCard>
        );
    } else {
        pageContent = (
            movies.map((movie) => {
                return (
                    <IonCard key={movie.id}>
                        <IonCardHeader>
                            <IonCardTitle>{movie.title}</IonCardTitle>
                            <IonCardSubtitle>{movie.rating} | {movie.runTime}</IonCardSubtitle>
                        </IonCardHeader>
                    </IonCard>
                );
            })
        );
    }

    if(list === "") {
        return null;
    } else {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButton slot="start">
                            <IonBackButton defaultHref="/lists" />
                        </IonButton>
                        <IonTitle>{list.name}</IonTitle>
                    </IonToolbar>
                </IonHeader>
    
                <IonContent>
                    {pageContent}
                </IonContent>
            </IonPage>
        )
    }
}