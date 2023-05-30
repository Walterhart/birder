import { tweetsData } from './data/db.js';

// Selecting tweet input and tweet button elements
const tweetInput = document.getElementById('tweet-input');
const tweetBtn = document.getElementById('tweet-btn');

// Event listener for the tweet button click
tweetBtn.addEventListener('click', function(){
    console.log(tweetInput.value); // Logging the value of the tweet input
});

// Event listener for click events on the document
document.addEventListener('click', function(e){
    if(e.target.dataset.like){
       handleLikeClick(e.target.dataset.like); // Calling handleLikeClick function if the clicked element has a 'data-like' attribute
    }
});

// Function to handle the like click
function handleLikeClick(tweetId){ 
    // Finding the target tweet object based on the tweet ID
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId;
    })[0];
    
    // Updating the like count and isLiked property of the target tweet
    if (targetTweetObj.isLiked){
        targetTweetObj.likes--;
    }
    else{
        targetTweetObj.likes++;
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked;
    render(); // Rendering the updated tweet feed
}

// Function to generate HTML for the tweet feed
function getFeedHtml(){
    let feedHtml = ``;
    
    // Iterating over tweetsData array and constructing HTML markup for each tweet
    tweetsData.forEach(function(tweet){
        feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
</div>
`;
   });
   return feedHtml;
}

// Function to render the tweet feed
function render(){
    document.getElementById('feed').innerHTML = getFeedHtml();
}

render(); // Initial rendering of the tweet feed
