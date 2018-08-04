import actionTypes from '../constants/actionTypes';
import Lockr from 'lockr';

const initialState = {
    isEditing: false,
    selectedClip: {},
    selectedClipIdx: null,
    playClip: false,
    playClipIdx: null,
    clips: [],
};


const app = (state = initialState, action) => {
    let actualClip;
    let playClipIdx;
    let clips;

    switch (action.type) {
        case actionTypes.APP.INIT:
            clips = Lockr.get('clips') || [];

            return {
                ...state,
                clips
            }

        case actionTypes.APP.CLIP.NEXT:

            let playClip = false;
            let selectedClip = {};
            state.clips.forEach((clip, idx) => {
                if (clip.name === state.selectedClip.name) {
                    actualClip = idx;
                }
            });

            if (actualClip !== undefined && state.clips[actualClip + 1]) {
                playClip = true;
                playClipIdx = actualClip + 1;
                selectedClip = state.clips[playClipIdx];
            }

            return {
                ...state,
                selectedClip,
                playClip,
                playClipIdx,
            }

        case actionTypes.APP.CLIP.SELECT:
            state.clips.forEach((clip, idx) => {
                if (clip.name === action.clip.name) {
                    playClipIdx = idx;
                }
            });

            return {
                ...state,
                selectedClip: action.clip || {},
                playClip: true,
                playClipIdx
            }

        case actionTypes.APP.CLIP.DELETE:
            clips = state.clips.filter((clip, idx) => idx !== action.idx);
            Lockr.set('clips', clips);
            return {
                ...state,
                clips
            }

        case actionTypes.APP.CLIP.EDIT:
            return {
                ...state,
                selectedClipIdx: action.idx,
                selectedClip: state.clips.filter((clip, idx) => idx === action.idx)[0]
            }

        case actionTypes.APP.CLIP.ADD:

            let { selectedClipIdx } = state;
            clips = state.clips;

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
            Lockr.set('clips', clips);
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
