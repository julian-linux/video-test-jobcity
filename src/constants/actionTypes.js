import keyMirrorNested from 'keymirror-nested';

const actionTypes = keyMirrorNested({
    APP: {
        CLIP: {
            ADD: null,
            EDIT: null,
            DELETE: null,
            NEXT: null,
            SELECT: null,
        }
    },
}, '_');

export default actionTypes;
