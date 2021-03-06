import { store } from './store';
import * as utils from './utils';
import * as types from './types';
import * as api from './api';
import { isEmpty } from './utils';

/**
 * ==== Root actions ====
 */

/**
 * ==== Alert message ====
 */
export const setAlertMessage = (alertType, message) => ({
    type: types.SET_ALERT_MESSAGE,
    alertView: { alertType, message },
});
export const deleteAlertMessage = () => ({ type: types.SET_ALERT_MESSAGE, alertView: null });
export const clearState = () => ({ type: types.CLEAR_STATE });
export const loading = () => ({ type: types.LOADING });
export const loaded = () => ({ type: types.LOADED });

/**
 * ==== Top page (time line) ====
 */
export const setBokFlow = bokFlow => ({ type: types.SET_BOK_FLOW, bokFlow });
export const fetchBokFlow = () => async dispatch => {
    const json = await api.fetchBokFlow();

    if (utils.isEmpty(json)) {
        dispatch(setBokFlow('最近のBokがありません'));
    } else {
        dispatch(setBokFlow(json));
    }
};

/**
 * ==== Auth actions ====
 */

// Get authentication token
export const setAuthToken = token => ({ type: types.SET_AUTH_TOKEN, token });
export const requestLogin = (loginUser, history) => {
    return api.requestLogin(loginUser).then(json => {
        if (isEmpty(json)) {
            throw new Error();
        }
        store.dispatch(setAuthToken(json.token));
        store.dispatch(getLoggedinUser());

        // HACK: 本棚に遷移するためのユーザーIDを取得する方法がこれしかなかった
        const unsubscribe = store.subscribe(() => {
            if (!store.getState().loggedinUser) return;
            history.push(`/users/${utils.getAuthUser().id}/user_books`); // ログイン後のデフォルト遷移先
            unsubscribe();
        });

        if (loginUser.remember && utils.storageAvailable('localStorage')) {
            localStorage.setItem('token', json.token);
        }
    });
};

export const preparedLogin = () => ({ type: types.SET_PREPARED_FLAG });
export const setLoggedinUser = loggedinUser => ({ type: types.SET_LOGGEDIN_USER, loggedinUser });
export const getLoggedinUser = () => dispatch => {
    api.fetchCurrentUser()
        .then(json => {
            dispatch(setLoggedinUser(json));
            dispatch(preparedLogin());
        })
        .catch(() => {
            // 失敗として事前処理を終了する
            dispatch(preparedLogin());
        });
};

export const requestUpdateUser = user => {
    return api.putUpdateUser(user);
};

export const removeLoggedinInfo = () => ({ type: types.REMOVE_LOGGEDIN_INFO });
export const requestLogout = history => dispatch => {
    api.requestLogout().then(() => {
        dispatch(removeLoggedinInfo());

        if (utils.storageAvailable('localStorage') && localStorage.getItem('token')) {
            localStorage.removeItem('token');
        }
        history.push('/');
    });
};

export const directUserRegister = userInfo => {
    return api.postUser(userInfo);
};

export const verifyEmail = url => {
    return api.requestVerifyEmail(url);
};

export const resendVerifyMail = email => {
    return api.reRequestVerifyEmail(email);
};

/**
 * ==== Genre resource ====
 */

export const setGenres = genres => ({ type: types.SET_GENRES, genres });
export const fetchGenres = () => dispatch => {
    api.fetchGenres().then(json => {
        dispatch(setGenres(json));
    });
};

/**
 * ==== Book resource ====
 */

export const setBookDetail = bookDetail => ({ type: types.SET_BOOK_DETAIL, bookDetail });
export const fetchBookDetail = id => dispatch => {
    api.fetchBook(id).then(json => {
        dispatch(setBookDetail(json));
    });
};

export const setBookList = books => ({ type: types.SET_BOOKLIST, books });
// TODO: Rename to fetchBooksWithQuery
export const fetchBookList = (query = {}) => {
    return api.fetchBooks(query).then(json => {
        store.dispatch(setBookList(json));
        return json;
    });
};
// HACK: fetchBooksとfetchMoreBooksはBooksPaginator的なページやqueryを管理してくれるクラスがあると良い
export const addBooks = books => ({ type: types.ADD_BOOKS, books });
export const fetchMoreBooks = (query = {}) => {
    return api.fetchBooks(query).then(json => {
        store.dispatch(addBooks(json));
        return json;
    });
};

/**
 * ==== User resource ====
 */

export const setUsers = users => ({ type: types.SET_USERS, users });
export const fetchUsers = () => dispatch => {
    api.fetchUsers().then(json => {
        dispatch(setUsers(json));
    });
};

export const setUser = user => ({ type: types.SET_USER, user });
export const fetchUser = userId => {
    return api.fetchUser(userId).then(json => {
        store.dispatch(setUser(json));
    });
};

/**
 * ==== UserBook resource ====
 */

export const setUserBookshelf = userBookshelf => ({
    type: types.SET_USER_BOOKSHELF,
    userBookshelf,
});
export const fetchUserBookshelf = userId => {
    return api.fetchUserBooks(userId).then(json => {
        store.dispatch(setUserBookshelf(json));
    });
};

export const setUserBookDetail = userBookDetail => ({
    type: types.SET_USER_BOOK_DETAIL,
    userBookDetail,
});
export const fetchUserBookDetail = (userId, userBookId) => {
    return api.fetchUserBook(userId, userBookId).then(json => {
        store.dispatch(setUserBookDetail(json));
    });
};

export const storeISBNToUserBookDirect = (userId, isbn) => {
    return api.postUserBookFrom(userId, isbn);
};

export const storeIsbnBulkRegisterDirect = (userId, isbnList) => {
    return api.postUserBooksFrom(userId, isbnList);
};

/** ネタバレflgや読書状況を更新する */
export const requestUpdateUserBookStatus = (userId, userBookId, body) => {
    return api.putUpdatedUserBookStat(userId, userBookId, body).then(json => {
        store.dispatch(setUserBookDetail(json));
    });
};

/**
 * ==== Bok resource ====
 */

export const setBokToUserBook = bok => ({ type: types.SET_BOK_TO_USER_BOOK, bok });
export const registerBok = (userBookId, bok) => {
    return api.postBok(userBookId, bok);
};

export const setBoksToUserBook = boks => ({ type: types.SET_BOKS_TO_USER_BOOK, boks });
export const deleteBok = (bokId, boks, currentBok) => {
    return api.deleteBok(bokId).then(() => {
        const filterdBoks = boks.filter(bok => {
            return bok !== currentBok;
        });
        store.dispatch(setBoksToUserBook(filterdBoks));
    });
};

/**
 * ==== Review resource ====
 */

export const setReview = review => ({ type: types.SET_REVIEW, review });
export const reviewRegister = (userBookId, review) => {
    return api.postReview(userBookId, review);
};

/**
 * ==== Follower resource ====
 */

export const setFollowers = followers => ({ type: types.SET_FOLLOWERS, followers });
export const fetchFollowers = userId => {
    return api.fetchFollowers(userId).then(res => {
        store.dispatch(setFollowers(res));
    });
};

export const setFollowings = followings => ({ type: types.SET_FOLLOWINGS, followings });
export const fetchFollowings = userId => {
    return api.fetchFollowings(userId).then(res => {
        store.dispatch(setFollowings(res));
    });
};

export const requestFollow = (userId, targetId) => {
    return api.requestFollowTo(userId, targetId);
};

export const requestUnFollow = (userId, targetId) => {
    return api.requestUnFollow(userId, targetId);
};

/**
 * ==== Reaction resource ====
 */

export const setLikeBoks = likeBoks => ({ type: types.SET_LIKEBOKLIST, likeBoks });
export const fetchLikeBoks = userId => {
    return api.fetchLikeBoks(userId).then(json => {
        store.dispatch(setLikeBoks(json));
    });
};

export const requestLike = bokId => {
    return api.requestLike(bokId);
};

export const requestUnLike = bokId => {
    return api.requestUnLike(bokId);
};

export const setLoveBoks = loveBoks => ({ type: types.SET_LOVEBOKLIST, loveBoks });
export const fetchLoveBoks = userId => {
    return api.fetchLoveBoks(userId).then(json => {
        store.dispatch(setLoveBoks(json));
    });
};

export const requestLove = bokId => {
    return api.requestLove(bokId);
};

export const requestUnLove = bokId => {
    return api.requestUnLove(bokId);
};
