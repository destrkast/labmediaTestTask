const UserTable = (props) => {
  const { deleteUser, users } = props;

  return (
    <div className="user-table">
      <table className="user-table__content">
        <thead>
          <tr>
            <th className="user-table__cell user-table__cell_header">Имя пользователя</th>
            <th className="user-table__cell user-table__cell_header">E-mail</th>
            <th className="user-table__cell user-table__cell_header">Дата регистрации</th>
            <th className="user-table__cell user-table__cell_header">Рейтинг</th>
            <th className="user-table__cell user-table__cell_header"/>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="user-table__cell user-table__cell_username">
                {user.username}
              </td>
              <td className="user-table__cell">{user.email}</td>
              <td className="user-table__cell">
                {user.registration_date.toLocaleDateString()}
              </td>
              <td className="user-table__cell">{user.rating}</td>
              <td className="user-table__cell user-table__cell_action">
                <button
                  className="user-table__delete-button"
                  type="button"
                  onClick={() => deleteUser(user.id)}
                ></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
