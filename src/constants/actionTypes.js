import keyMirrorNested from 'keymirror-nested';

const actionTypes = keyMirrorNested({
    APP: {
        CLIP: {
            ADD: null,
            EDIT: null,
        }
    },
}, '_');

export default actionTypes;
