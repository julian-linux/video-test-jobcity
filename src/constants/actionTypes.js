import keyMirrorNested from 'keymirror-nested';

const actionTypes = keyMirrorNested({
    APP: {
        INIT: null,
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
