const UserTable = (props) => {
  const { deleteUser, users } = props;

  return (
    <div className="user-table">
      <table className="user-table__content">
        <thead>
          <tr>
            <th className="user-table__header-cell">Имя пользователя</th>
            <th className="user-table__header-cell">E-mail</th>
            <th className="user-table__header-cell user-table__header-cell_date">Дата регистрации</th>
            <th className="user-table__header-cell">Рейтинг</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="user-table__cell user-table__cell_username">
                {user.username}
              </td>
              <td className="user-table__cell user-table__cell_email">{user.email}</td>
              <td className="user-table__cell user-table__cell_date">
                {user.registration_date.toLocaleDateString()}
              </td>
              <td className="user-table__cell user-table__cell_rating">{user.rating}</td>
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
