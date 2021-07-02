const UserTable = (props) => {
  const { deleteUser, users } = props;

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th className="user-table__header-cell">Имя пользователя</th>
          <th className="user-table__header-cell">E-mail</th>
          <th className="user-table__header-cell">Дата регистрации</th>
          <th className="user-table__header-cell">Рейтинг</th>

        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="user-table__cell user-table__cell_username">{user.username}</td>
            <td className="user-table__cell">{user.email}</td>
            <td className="user-table__cell">{user.registration_date.toLocaleDateString()}</td>
            <td className="user-table__cell">{user.rating}</td>
            <td className="user-table__cell">
              <button type="button" onClick={() => deleteUser(user.id)}>
                Удалить
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
