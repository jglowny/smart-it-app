import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

// Define a type for the slice state
type UsersState = {
  users: User[];
  filteredUsers: User[];
  filters: {
    name: string;
    username: string;
    email: string;
    phone: string;
  };
};

// Define the initial state using that type
const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  filters: {
    name: '',
    username: '',
    email: '',
    phone: '',
  },
};

const usersSlice = createSlice({
  name: 'users',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
      state.filteredUsers = action.payload;
    },
    setFilters(state, action: PayloadAction<Partial<UsersState['filters']>>) {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredUsers = state.users.filter((user) =>
        Object.entries(state.filters).every(([key, value]) =>
          user[key as keyof User].toString().toLowerCase().includes(value.toLowerCase()),
        ),
      );
    },
  },
});

export const { setUsers, setFilters } = usersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.users.users.length;

export default usersSlice.reducer;
