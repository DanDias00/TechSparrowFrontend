<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Voting</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .container {
            width: 80%;
            margin: auto;
        }
        .cat-image {
            max-width: 100%;
            height: auto;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 5px;
            background: #f8f8f8;
        }
        .vote-buttons {
            margin-top: 10px;
        }
        .vote-button {
            border: none;
            cursor: pointer;
            padding: 10px;
            margin-right: 5px;
        }
        .vote-button.upvote {
            color: #4CAF50;
        }
        .vote-button.downvote {
            color: #F44336;
        }
        .liked-cats {
            margin-top: 20px;
        }
        .liked-cats img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin-right: 10px;
        }
        .liked-cats-title {
            margin-top: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Here is a nice cat!</h1>
        <div>
            <!-- This is where the current cat to vote on is displayed -->
            <img src="images\cat4.jpg" alt="Current Cat" class="cat-image">
            <div class="vote-buttons">
                <!-- Replace form action with your site's URL for voting -->
                <form action="path_to_your_vote_handling" method="post">
                    <input type="hidden" name="cat_id" value="current_cat_id">
                    <button type="submit" name="vote" value="up" class="vote-button upvote">👍</button>
                    <button type="submit" name="vote" value="down" class="vote-button downvote">👎</button>
                </form>
            </div>
        </div>

        <div class="liked-cats">
            <h2 class="liked-cats-title">Last 3 cats liked</h2>
            <div>
                <!-- This is where the last three liked cats are displayed -->
                <img src="images/cat1.jpg" alt="Liked Cat 1">
                <img src="images\cat2.jpg" alt="Liked Cat 2">
                <img src="images\cat3.jpg" alt="Liked Cat 3">
            </div>
        </div>
    </div>
</body>
</html>
