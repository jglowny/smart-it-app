import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setUsers, setFilters } from './UserListSlice';
import { RootState } from '../../store';
import { fetchUsers } from '../../services/usersService';

const UsersList = () => {
  const dispatch = useAppDispatch();
  const { filteredUsers, filters } = useAppSelector((state: RootState) => state.users);

  useEffect(() => {
    const getUsers = async () => {
      const users = await fetchUsers();
      dispatch(setUsers(users));
    };
    getUsers();
  }, [dispatch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ [event.target.name]: event.target.value }));
  };

  return (
    <>
      <div>
        <div className="filter">
          <input type="text" name="name" placeholder="Search by name" value={filters.name} onChange={handleChange} />
          <input
            type="text"
            name="username"
            placeholder="Search by username"
            value={filters.username}
            onChange={handleChange}
          />
          <input type="text" name="email" placeholder="Search by email" value={filters.email} onChange={handleChange} />
          <input type="text" name="phone" placeholder="Search by phone" value={filters.phone} onChange={handleChange} />
        </div>
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">email</th>
              <th scope="col">phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => {
              return (
                <tr key={user.name}>
                  <td data-label="Name">{user.name}</td>
                  <td data-label="Username">{user.username}</td>
                  <td data-label="email">{user.email}</td>
                  <td data-label="phone">{user.phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersList;
