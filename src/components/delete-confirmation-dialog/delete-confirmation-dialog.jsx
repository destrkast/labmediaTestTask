import FocusTrap from "focus-trap-react";


const DeleteConfirmationDialog = (props) => {
  const { hideDialog, deleteUser } = props;
  return (
    <FocusTrap>
      <div>
        <h2>Вы уверены, что хотите удалить пользователя?</h2>
        <button onClick={hideDialog}>Нет</button>
        <button onClick={deleteUser}>Да</button>
      </div>
    </FocusTrap>
  );
};

export default DeleteConfirmationDialog;
