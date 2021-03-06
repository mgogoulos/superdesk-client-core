import ng from 'core/services/ng';

/**
 * @ngdoc method
 * @name applyComment
 * @param {SelectionState} s Selection that the comment applies to.
 * @param {string} msg Comment body.
 * @return {String} action
 * @description Triggers the action to add a comment to the given selection.
 */
export const applyComment = (s, data) => {
    data.replies = [];
    data.resolved = false;

    return applyHighlight('COMMENT', s, data);
};

/**
 * @ngdoc method
 * @name applyAnnotation
 * @param {SelectionState} sel Selection that the annotation applies to.
 * @param {string} msg Annotation body.
 * @return {String} action
 * @description Triggers the action to add a comment to the given selection.
 */
export const applyAnnotation = (s, data) => applyHighlight('ANNOTATION', s, data);

/**
 * @ngdoc method
 * @name deleteHighlight
 * @param {Highlight} h
 * @return {String} action
 * @description Deletes the given highlight from the content.
 */
export const deleteHighlight = (h) => ({type: 'HIGHLIGHT_DELETE', payload: h});

/**
 * @ngdoc method
 * @name updateHighlight
 * @param {Highlight} h
 * @return {String} action
 * @description Updates the highlight on the selection found in h with fresh data.
 */
export const updateHighlight = (h) => ({type: 'HIGHLIGHT_UPDATE', payload: h});

/**
 * @ngdoc method
 * @name replyComment
 * @param {SelectionState} selection The selection where the comment that is being
 * replied to is located.
 * @return {Comment} data The actual reply.
 * @description Adds a reply to the comment at selection, using the given data.
 */
export const replyComment = (selection, data) => {
    const date = new Date();
    const {display_name: author, email, picture_url: avatar} = ng.get('session').identity;

    data.author = author;
    data.email = email;
    data.date = date;
    data.avatar = avatar;

    return {
        type: 'HIGHLIGHT_COMMENT_REPLY',
        payload: {selection, data},
    };
};

/**
 * @ngdoc method
 * @name removeReply
 * @param {SelectionState} selection
 * @param {Number} index
 * @description Remove comment reply.
 */
export function removeReply(selection, index) {
    return {
        type: 'HIGHLIGHT_COMMENT_REPLY_REMOVE',
        payload: {selection, index},
    };
}

/**
 * @ngdoc method
 * @name updateReply
 * @param {SelectionState} selection
 * @param {Number} index
 * @param {String} reply
 * @description Update comment reply text.
 */
export function updateReply(selection, index, reply) {
    return {
        type: 'HIGHLIGHT_COMMENT_REPLY_UPDATE',
        payload: {selection, index, reply},
    };
}

/**
 * @ngdoc method
 * @name resolveComment
 * @param {SelectionState} selection Location of comment to resolve.
 * @return {String} action
 * @description Resolves the comment at selection.
 */
export const resolveComment = ({selection}) => ({
    type: 'HIGHLIGHT_COMMENT_RESOLVE',
    payload: {selection}
});

// applyHighlights creates an action that applies the highlight of the given type to
// selection and contains the given meta data.
function applyHighlight(type, selection, data) {
    const date = new Date();
    const {display_name: author, email, picture_url: avatar} = ng.get('session').identity;

    data.author = author;
    data.email = email;
    data.date = date;
    data.avatar = avatar;
    data.type = type;

    return {
        type: 'TOOLBAR_ADD_HIGHLIGHT',
        payload: {data, selection}
    };
}
