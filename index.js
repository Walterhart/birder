import { tweetsData } from "./data/db.js";
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
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet); // Calling handleRetweetClick function if the clicked element has a 'data-retweet' attribute
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply); // Calling handleReplyClick function if the clicked element has a 'data-reply' attribute
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

// Function to handle the retweet click
function handleRetweetClick(tweetId){
    // Finding the target tweet object based on the tweet ID
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId;
    })[0];
    
    // Updating the retweet count and isRetweeted property of the target tweet
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--;
    }
    else{
        targetTweetObj.retweets++;
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
    render(); // Rendering the updated tweet feed
}

// Function to handle the reply click
function handleReplyClick(replyId){
    // Toggling the visibility of the replies section based on the reply ID
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden');
}

// Function to generate HTML for the tweet feed
function getFeedHtml(){
    let feedHtml = ``;
    
    // Iterating over tweetsData array and constructing HTML markup for each tweet
    tweetsData.forEach(function(tweet){
        
        let likeIconClass = '';
        
        // Checking if the tweet is liked and setting the corresponding class
        if (tweet.isLiked){
            likeIconClass = 'liked';
        }
        
        let retweetIconClass = '';
        
        // Checking if the tweet is retweeted and setting the corresponding class
        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted';
        }
        
        let repliesHtml = '';
        
        // Checking if the tweet has replies and generating HTML for each reply
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml+=`
<div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
            </div>
        </div>
</div>
`;
            });
        }
        
        // Generating HTML for the tweet and its details
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
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${tweet.uuid}">
        ${repliesHtml}
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
