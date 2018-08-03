import actionTypes from '../constants/actionTypes';
// import Lockr from 'lockr';

const initialState = {
    isEditing: false,
    selectedClip: {},
    selectedClipIdx: null,
    clips: [],
};


const app = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APP.CLIP.DELETE:
        return {
            ...state,
            // selectedClipIdx: null,
            // selectedClip: {},
            clips: state.clips.filter((clip, idx) => idx !== action.idx)
        }

        case actionTypes.APP.CLIP.EDIT:
        return {
            ...state,
            selectedClipIdx: action.idx,
            selectedClip: state.clips.filter((clip, idx) => idx === action.idx)[0]
        }

        case actionTypes.APP.CLIP.ADD:

            let { clips, selectedClipIdx } = state;

            if (selectedClipIdx !== null) {
                clips = clips.map((clipFromList, idxList) => {
                    if (idxList === selectedClipIdx) {
                        return action.clip;
                    }
                    return clipFromList;
                });
            } else {
                clips.push(action.clip);
            }

            return {
                ...state,
                clips,
                selectedClipIdx: null,
                selectedClip: {}
            }
        default:
            return { ...initialState };
    }
};

export default app;
