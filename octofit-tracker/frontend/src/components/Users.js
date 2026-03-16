import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        setLoading(false);
        console.log('Fetched users:', results);
        console.log('Endpoint used:', endpoint);
      })
      .catch(err => {
        setLoading(false);
        console.error('Error fetching users:', err);
      });
  }, [endpoint]);

  if (loading) return <div className="alert alert-info">Loading users...</div>;
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Users</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user.id || i}>
                  <td>{i + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.team}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Users;
