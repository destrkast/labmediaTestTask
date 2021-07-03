import { useState, useEffect } from 'react';
import PageTitle from './components/page-title';
import UserTable from './components/user-table';
import SearchField from './components/search-field';
import Pagination from './components/pagination';
import DeleteConfirmationDialog from './components/delete-confirmation-dialog';

import './app.css';

const ASCENDING_ORDER = 'ASCENDING_ORDER';
const DESCENDING_ORDER = 'DESCENDING_ORDER';

const RATING_SORT = 'RATING_SORT';
const REGISTRATION_DATE_SORT = 'REGISTRATION_DATE_SORT';

const USERS_ON_PAGE = 5;

const App = () => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [ratingOrder, setRatingOrder] = useState(DESCENDING_ORDER);
  const [dateOrder, setDateOrder] = useState(DESCENDING_ORDER);
  const [sortType, setSortType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogShown, setIsDialogShown] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState(null);

  useEffect(() => {
    fetch('https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users')
      .then((response) => response.json())
      .then((users) => {
        setUsers(
          users.map((user) => ({
            ...user,
            registration_date: new Date(user.registration_date),
          }))
        );
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchValue('');
    setSortType(null);
    setSortedUsers([]);
    setRatingOrder(DESCENDING_ORDER);
    setDateOrder(DESCENDING_ORDER);
    setCurrentPage(1);
  };

  const sortByRating = () => {
    setSortType(RATING_SORT);
    setDateOrder(DESCENDING_ORDER);
    if (ratingOrder === DESCENDING_ORDER) setRatingOrder(ASCENDING_ORDER);
    if (ratingOrder === ASCENDING_ORDER) setRatingOrder(DESCENDING_ORDER);
    setSortedUsers(
      [...users].sort((firstUser, secondUser) => {
        if (ratingOrder === DESCENDING_ORDER) {
          return secondUser.rating - firstUser.rating;
        }
        if (ratingOrder === ASCENDING_ORDER) {
          return firstUser.rating - secondUser.rating;
        }
        return 0;
      })
    );
    setCurrentPage(1);
  };

  const sortByDate = () => {
    setSortType(REGISTRATION_DATE_SORT);
    setRatingOrder(DESCENDING_ORDER);
    if (dateOrder === DESCENDING_ORDER) setDateOrder(ASCENDING_ORDER);
    if (dateOrder === ASCENDING_ORDER) setDateOrder(DESCENDING_ORDER);
    setSortedUsers(
      [...users].sort((firstUser, secondUser) => {
        if (dateOrder === DESCENDING_ORDER) {
          return (
            secondUser.registration_date.getTime() -
            firstUser.registration_date.getTime()
          );
        }
        if (dateOrder === ASCENDING_ORDER) {
          return (
            firstUser.registration_date.getTime() -
            secondUser.registration_date.getTime()
          );
        }
        return 0;
      })
    );
    setCurrentPage(1);
  };

  const showDialog = (id) => {
    setIsDialogShown(true);
    setDeletingUserId(id);
  };
  const hideDialog = () => {
    setIsDialogShown(false);
    setDeletingUserId(null);
  };

  const deleteUser = () => {
    setUsers(
      users.filter((user) => {
        if (user.id === deletingUserId) {
          return false;
        }
        return true;
      })
    );
    setSortedUsers(
      sortedUsers.filter((user) => {
        if (user.id === deletingUserId) {
          return false;
        }
        return true;
      })
    );
    hideDialog();
  };

  const filteredUsers = (sortedUsers.length > 0 ? sortedUsers : users).filter(
    (user) => {
      if (!searchValue) return true;

      const username = user.username.toLowerCase();
      const email = user.email.toLowerCase();

      if (
        username.indexOf(searchValue.toLowerCase()) > -1 ||
        email.indexOf(searchValue.toLowerCase()) > -1
      ) {
        return true;
      }

      return false;
    }
  );

  const amountOfPages = Math.ceil(filteredUsers.length / USERS_ON_PAGE);

  if (amountOfPages !== 0 && amountOfPages < currentPage) {
    setCurrentPage(amountOfPages);
  }

  return (
    <div className="app">
      <PageTitle>Список пользователей</PageTitle>

      <div className="app__search">
        <SearchField
          placeholder="Поиск по имени или e-mail"
          value={searchValue}
          onChange={handleSearchInputChange}
        />
        {(!!searchValue || !!sortType) && (
          <button
            className="app__clear-filters-button"
            type="button"
            onClick={clearFilters}
          >
            Очистить фильтр
          </button>
        )}
      </div>
      <p className="app__sorting">
        Сортировка:{' '}
        <button className={`app_sorting-button ${sortType === REGISTRATION_DATE_SORT ? 'app_sorting-button_active' : ''}`} type="button" onClick={sortByDate}>
          Дата регистрации
        </button>{' '}
        <button className={`app_sorting-button ${sortType === RATING_SORT ? 'app_sorting-button_active' : ''}`} type="button" onClick={sortByRating}>
          Рейтинг
        </button>
      </p>
      <UserTable
        users={filteredUsers.slice(
          (currentPage - 1) * USERS_ON_PAGE,
          currentPage * USERS_ON_PAGE
        )}
        deleteUser={showDialog}
      />
      {amountOfPages > 1 && (
        <Pagination
          amountOfPages={amountOfPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

      {isDialogShown && (
        <DeleteConfirmationDialog
          hideDialog={hideDialog}
          deleteUser={deleteUser}
        />
      )}
    </div>
  );
};

export default App;
