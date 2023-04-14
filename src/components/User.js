import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/users/usersSlice";
import { useEffect } from "react";

const User = () => {
    const { users, isLoading, error } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return ( 
        <>
            <h1>WELCOME</h1>
            {isLoading && <h1>Loading...</h1>}
            {error && <h1>Unable to fetch data</h1>}
            <ul>
            {users && users.map((user) => <li key={user.email}>{user.name.first} {user.name.last}</li>)}
            </ul>
        </>
     );
}
 
export default User;
