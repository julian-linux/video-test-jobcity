import actionTypes from '../constants/actionTypes';

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

export const addClip = clip => dispatch => dispatch(appAddClip(clip));

export const editClip = idx => dispatch => dispatch(appEditClip(idx));

export const deleteClip = idx => dispatch => dispatch(appDeleteClip(idx));

export const selectClip = clip => dispatch => dispatch(appSelectClip(clip));
