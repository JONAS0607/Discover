import React, { useEffect, useState } from "react";
import { api } from "./services/api";
import { User } from "./components/User";

interface UserProps {
  name: string;
  email?: string;
}

function App() {
  const [users, setUsers] = useState<UserProps[]>([]);
  useEffect(() => {
    api.get<UserProps[]>("/users").then((response) => {
      console.log(response.data[0].name);
      setUsers(response.data);
    });
  }, []);

  return (
    <>
      {users.map((user) => (
        <User key={user.email} user={user} />
      ))}
    </>
  );
}

export default App;
