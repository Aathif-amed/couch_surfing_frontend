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
  rooms: [],
  priceFilter: 500,
  addressFilter: null,
  filteredRooms: [],
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

  return (
    <Context.Provider value={{ state, dispatch, mapRef, containerRef }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
