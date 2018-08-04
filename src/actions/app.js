import actionTypes from '../constants/actionTypes';

const appInit = () => ({
    type: actionTypes.APP.INIT,
});

const appAddClip = clip => ({
    type: actionTypes.APP.CLIP.ADD,
    clip
});

const appEditClip = idx => ({
    type: actionTypes.APP.CLIP.EDIT,
    idx,
});

const appDeleteClip = idx => ({
    type: actionTypes.APP.CLIP.DELETE,
    idx,
});

const appSelectClip = clip => ({
    type: actionTypes.APP.CLIP.SELECT,
    clip,
});

const appSelectNextClip = () => ({
    type: actionTypes.APP.CLIP.NEXT
});

const appSearchByTags = tags => ({
    type: actionTypes.APP.SEARCH,
    tags
});

export const init = () => dispatch => dispatch(appInit());

export const addClip = clip => dispatch => dispatch(appAddClip(clip));

export const editClip = idx => dispatch => dispatch(appEditClip(idx));

export const deleteClip = idx => dispatch => dispatch(appDeleteClip(idx));

export const selectClip = clip => dispatch => dispatch(appSelectClip(clip));

export const selectNextClip = clip => dispatch => dispatch(appSelectNextClip());

export const searchByTags = tags => dispatch => dispatch(appSearchByTags(tags));
