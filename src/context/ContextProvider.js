import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import reducer from "./reducer";

const initialState = {
  currentUser: null,
  openLogin: false,
  loading: false,
  alert: {
    open: false,
    severity: "info",
    message: "",
  },
  profile: {
    open: false,
    file: null,
    photoURL: "",
  },
  images: [],
  details: {
    title: "",
    description: "",
    price: 0,
  },
  location: {
    longitude: 0,
    latitude: 0,
  },
  updatedRoom: null,
  addedImages: [],
  deletedImages: [],
  rooms: [],
  users: [],
  priceFilter: 500,
  addressFilter: null,
  filteredRooms: [],
  room: null,
  section: 0,
};

const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mapRef = useRef();
  const containerRef = useRef();
  useEffect(() => {
    const userDetails = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_USER_DETAILS)
    );
    if (userDetails) {
      dispatch({ type: "UPDATE_USER", payload: userDetails });
    }
  }, []);
  useEffect(() => {
    if (state.currentUser) {
      console.log(state.currentUser);
      const room = JSON.parse(localStorage.getItem(state.currentUser.id));
      if (room) {
        dispatch({ type: "UPDATE_LOCATION", payload: room.location });
        dispatch({ type: "UPDATE_DETAILS", payload: room.details });
        dispatch({ type: "UPDATE_IMAGES", payload: room.images });
        dispatch({ type: "UPDATE_UPDATED_ROOM", payload: room.updatedRoom });
        dispatch({
          type: "UPDATE_DELETED_IMAGES",
          payload: room.deletedImages,
        });
        dispatch({ type: "UPDATE_ADDED_IMAGES", payload: room.addedImages });
      }
    }
  }, [state.currentUser]);

  return (
    <Context.Provider value={{ state, dispatch, mapRef, containerRef }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
