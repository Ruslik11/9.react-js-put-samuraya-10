import profileReducer, {addPostAC, deletePost} from "./profile-reducer";

let state = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 0},
        {id: 2, message: "It's my first post", likesCount: 23}
    ]
};

it('length of posts should be incremented', function () {
    let action = addPostAC("it-kamasutra.com");

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3);
});

it('message of new post should be correct', function () {
    let action = addPostAC("it-kamasutra.com");

    let newState = profileReducer(state, action);

    expect(newState.posts[2].message).toBe("it-kamasutra.com");
});

it('after deleting length of messages should be decrement', function () {
    let action = deletePost(1);

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(2);
});

it(`after deleting length shouldn't be decrement if id is incorect`, function () {
    let action = deletePost(1000);

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(2);
});
