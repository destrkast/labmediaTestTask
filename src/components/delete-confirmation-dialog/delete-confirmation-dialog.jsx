import FocusTrap from "focus-trap-react";


const DeleteConfirmationDialog = (props) => {
  const { hideDialog, deleteUser } = props;
  return (
    <FocusTrap>
      <div className="delete-confirmation-dialog">
        <div className="delete-confirmation-dialog__window">
        <h2 className="delete-confirmation-dialog__title">Вы уверены, что хотите удалить пользователя?</h2>
        <button className="delete-confirmation-dialog__button" onClick={hideDialog}>Нет</button>
        <button className="delete-confirmation-dialog__button" onClick={deleteUser}>Да</button>
        </div>
      </div>
    </FocusTrap>
  );
};

export default DeleteConfirmationDialog;
