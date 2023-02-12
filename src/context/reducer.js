const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_LOGIN":
      return { ...state, openLogin: true };
    case "CLOSE_LOGIN":
      return { ...state, openLogin: false };
    case "START_LOADING":
      return { ...state, loading: true };
    case "END_LOADING":
      return { ...state, loading: false };
    case "UPDATE_ALERT":
      return { ...state, alert: action.payload };
    case "UPDATE_PROFILE":
      return { ...state, profile: action.payload };
    case "UPDATE_USER":
      localStorage.setItem(
        process.env.REACT_APP_USER_DETAILS,
        JSON.stringify(action.payload)
      );
      return { ...state, currentUser: action.payload };
    case "UPDATE_IMAGES":
      return { ...state, images: [...state.images, ...action.payload] };
    case "DELETE_IMAGE":
      return {
        ...state,
        images: state.images.filter((image) => image !== action.payload),
      };
    case "UPDATE_DETAILS":
      return { ...state, details: { ...state.details, ...action.payload } };
    case "UPDATE_LOCATION":
      return { ...state, location: action.payload };
    case "UPDATE_UPDATED_ROOM":
      return { ...state, updatedRoom: action.payload };
    case "RESET_ROOM_DETAILS":
      return {
        ...state,
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
      };
    case "UPDATE_ROOMS":
      return {
        ...state,
        rooms: action.payload,
        addressFilter: null,
        priceFilter: 500,
        filteredRooms: action.payload,
      };
    case "PRICE_FILTER":
      return {
        ...state,
        priceFilter: action.payload,
        filteredRooms: applyFilter(
          state.rooms,
          state.addressFilter,
          action.payload
        ),
      };
    case "ADDRESS_FILTER":
      return {
        ...state,
        addressFilter: action.payload,
        filteredRooms: applyFilter(
          state.rooms,
          action.payload,
          state.priceFilter
        ),
      };
    case "CLEAR_ADDRESS_FILTER":
      return {
        ...state,
        addressFilter: null,
        priceFilter: 500,
        filteredRooms: state.rooms,
      };
    case "UPDATE_ROOM":
      return {
        ...state,
        room: action.payload,
      };
    case "UPDATE_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    case "DELETE_ROOM":
      return {
        ...state,
        rooms: state.rooms.filter((room) => room._id !== action.payload),
      };
    case "UPDATE_SECTION":
      return {
        ...state,
        section: action.payload,
      };
    default:
      throw new Error("No matched Action");
  }
};

export default reducer;

const applyFilter = (rooms, address, price) => {
  let filteredRooms = rooms;
  if (address) {
    console.log(address);
    const { longitude, latitude } = address;
    filteredRooms = filteredRooms.filter((room) => {
      const longitudeDiff =
        longitude > room.longitude
          ? longitude - room.longitude
          : longitude + room.longitude;
      const latitudeDiff =
        latitude > room.latitude
          ? latitude - room.latitude
          : latitude + room.latitude;
      return longitudeDiff <= 1 && latitudeDiff <= 1;
    });
  }
  if (price < 500) {
    filteredRooms = filteredRooms.filter((room) => room.price <= price);
  }
  return filteredRooms;
  //from the return value of this function  the rooms will be filtered and will set in the global context variable named filterRooms this will control the clusters in the clusterMap component
};
