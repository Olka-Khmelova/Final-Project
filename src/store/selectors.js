export const usersStateSelector = state => state.user;

export const getCurrentUserStateSelector = state => usersStateSelector(state).currentUser;

export const getAuthStatusSelector = state => getCurrentUserStateSelector(state).auth;

export const getUserDataSelector = state => usersStateSelector(state).userData;

export const isRegisteredUserSelector = state => usersStateSelector(state).currentId;

export const getSelectedPostSelector = state => usersStateSelector(state).selectedPost;

export const getSelectedUser  = state => usersStateSelector(state).selectedUser;

export const getFoundUsers = state => usersStateSelector(state).usersList; 
// export const getFollowers = state => usersStateSelector(state).followers; 
// export const getFollowings = state => usersStateSelector(state).following; 

export const getFeedsSelector = state => usersStateSelector(state).feeds; 

export const getFeedSelector = state => getFeedsSelector(state).feed; 

export const getLikes = state => getSelectedPostSelector(state).likes; 
