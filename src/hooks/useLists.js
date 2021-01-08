import { list } from "ionicons/icons";
import { useReducer } from "react";

const initialState = [
    // {
    //     id: "1",
    //     name: "Want to Watch",
    //     movies: ["1", "2"],
    // }, 
    // {
    //     id: "2",
    //     name: "Watched - Loved",
    //     movies: ["3"],
    // }, 
    // {
    //     id: "3",
    //     name: "Watched - Hated",
    //     movies: ["5"],
    // },
    // {
    //     id: "4",
    //     name: "Watched - Meh",
    //     movies: ["2", "4"],
    // },
];

function reducer(state, action) {
    let exists = false;
    // {type: "addList", name: "List name"}
    switch (action.type) {
        case "addList":
            const lastList = state[state.length - 1];
            let newId;
            if(lastList) {
                newId = Number(lastList.id) + 1;
            } else {
                newId = 1;
            }

            return [
                ...state, 
                {
                    id: String(newId),
                    name: action.name,
                    movies: [],
                }
            ];
        case "addMovieToList":
            state.map((stateList) => {
                if(stateList.id === String(action.listId)) {
                    stateList.movies.map((movie) => {
                        if(movie === String(action.movieId)) {
                            exists = true;
                        }
                    })
                    if(!exists) {
                        stateList.movies.push(String(action.movieId))
                    }
                } else {
                    return;
                }
            })
            return [
                ...state
            ];
        case "deleteList":
            const filter = state.filter(list => list.id === action.id);

            filter.map((list) => {
                // console.log(list);
                state.find((stateList) => {
                    if(list === stateList) {
                        let index = state.indexOf(list);
                        // console.log(index);
                        state.splice(index, 1);
                    }
                })
            })
            
            return [
                ...state
            ];
        default:
            throw new Error("Unknown action type dispatched")
    }
}

export default function useLists() {
    return useReducer(reducer, initialState);
}