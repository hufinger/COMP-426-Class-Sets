$(document).ready(render());
export function render(){
    let root = $('#root');
    root.empty();
    root.append(page());

    getTweets();

    root.on('click', '#newTweet', handlenewTweet);
    root.on('click', '#refresh', refresh);
    root.on('click', '#submitnew', handleSubmit);
    root.on('click', '#Like', like);
    root.on('click', '#unLike', unlike);
    root.on('click', '#delete', destroy);
    root.on('click', '#reply', reply);
    root.on('click', '#retweet', retweet);
    root.on('click', '#edit', edit);
    root.on('click', '#submitretweet', nonNormSubmit);
    root.on('click', '#submitedit', editSumbit);
    root.on('click', '#submitreply', replySumbit);
}

export async function retweet(event){
    event.preventDefault();
    let id = event.target.getAttribute('class');
    let id1 = $('#'+id);
    id1.empty();
    let retweeting = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/'+id,
        withCredentials: true,
    });
    id1.append(`<div>Retweet</div>
    <div id = "retweetform"> <textarea id = "retweetcontent" rows = "3" cols = "77">Hunter retweeted: ${editing.data.body} from ${editing.data.author}</textarea></div>
    <button id = "submitretweet" type = "submit" class = "${id}">Submit Tweet</button>
    `);
}

export async function nonNormSubmit(event){
    event.preventDefault();
    let id = event.target.getAttribute('class');
    let content = $('#retweetcontent').val();
    let posted = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data:{
            type: "retweet",
            parent: id,
            body: content,
        }
    });
    refresh();
}

export async function edit(event){
    event.preventDefault();
    let id = event.target.getAttribute('class');
    let id1 = $('#'+id);
    id1.empty();
    let editing = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/'+id,
        withCredentials: true,
    });
    id1.append(`<div>Edit</div>
    <div id = "retweetform"> <textarea id = "editcontent" rows = "3" cols = "77">${editing.data.body}</textarea></div>
    <button id = "submitedit" type = "submit" class = "${id}">Submit Tweet</button>
    `);
}

export async function editSumbit(event){
    event.preventDefault();
    let id = event.target.getAttribute('class');
    let content = $('#editcontent').val();
    let posted = await axios({
        method: 'put',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/'+id,
        withCredentials: true,
        data:{
            body: content,
        }
    });
    refresh();
}

export async function reply(event){
    event.preventDefault();
    let id = event.target.getAttribute('class');
    let id1 = $('#'+id);
    id1.empty();
    id1.append(`<div>Reply</div>
    <div id = "retweetform"> <textarea id = "replycontent" rows = "3" cols = "77" placeholder = "Craft your reply"></textarea></div>
    <button id = "submitreply" type = "submit" class = "${id}">Submit Tweet</button>
    `);
}

export async function replySumbit(event){
    event.preventDefault();
    let id = event.target.getAttribute('class');
    let content = $('#replycontent').val();
    let posted = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data:{
            type: "reply",
            parent: id,
            body: content,
        }
    });
    refresh();
}


export async function destroy(event){
    event.preventDefault();
    let id = event.target.getAttribute('class');
    let put = await axios({
        method: 'delete',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/'+id,
        withCredentials: true,
    });
    refresh();
}

export async function like(event){
    event.preventDefault();
    let id = event.target.getAttribute('class');
    let put = await axios({
        method: 'put',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/'+id+'/like',
        withCredentials: true,
    });
    refresh();
}

export async function unlike(event){
    event.preventDefault();
    let id = event.target.getAttribute('class');
    let put = await axios({
        method: 'put',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/'+id+'/unlike',
        withCredentials: true,
    });
    refresh();
}

export function handlenewTweet(event){
    event.preventDefault();
    let feed = $('#newsfeed');
    feed.empty();
    feed.append(`<div>New Tweet</div>
    <div id = "newtweet"> <textarea id = "tweetcontent" rows = "3" cols = "77" placeholder = "Create Tweet"></textarea></div>
    <button id = "submitnew" type = "submit">Submit Tweet</button>
    `);
}
export async function handleSubmit(event){
    event.preventDefault();
    let content = $('#tweetcontent').val();
    let posted = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data:{
            body: content,
        }
    });
    refresh();
}
export function refresh(){
    let feed = $('#newsfeed');
    feed.empty();
    getTweets();
}

function page(){
    return $(`
        <section id = "Buttons">
            <h1> COMP 426 Twitter Feed </h1>
            <div>
                <button id = "newTweet"> Create New Tweet </button>
                <button id = "refresh"> Refresh Feed </button>
            </div>
        </section>
        <section id = "feed">
            <div id = "newsfeed">
            </div>
        </section>
    `);
    
}

async function getTweets(){
    let top50 = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
    });

    for(let i = 0; i < 50; i++){
        let tweets = top50.data[i];
        $('#newsfeed').append(displayTweet(tweets));
    }
}

export function displayTweet(tweet){
    let displayTweet = `<div class = "display" id = "${tweet.id}"></div>`;
    displayTweet += `<div class = "single" id = "${tweet.id}">
                        <div>Tweeter: ${tweet.author}</div>
                        <div id = "tweetbody">${tweet.body}</div>
                    </div>`;
    if(tweet.isLiked){
        displayTweet += `<button id = "unLike" type = "submit" class = "${tweet.id}">Unlike this Tweet</button>
        <p> ${tweet.likeCount} Likes </p>`
    }else{
        displayTweet += `<button id = "Like" type = "submit" class = "${tweet.id}">Like this Tweet</button>
        <p> ${tweet.likeCount} Likes </p>`
    }
    displayTweet += `<button id = "retweet" type = "submit" class = "${tweet.id}" >Retweet this Tweet</button>
        <p> ${tweet.retweetCount} Retweets </p>`

    displayTweet += `<button id = "reply" type = "submit" class = "${tweet.id}" >Reply to this Tweet</button>
        <p> ${tweet.replyCount} Replies </p>`

    if(tweet.isMine){
        displayTweet += `<button id = "edit" type = "submit" class = "${tweet.id}">Edit Tweet</button>
        <button id = "delete" type = "submit">Delete Tweet</button>`
    }
    return(displayTweet);
}