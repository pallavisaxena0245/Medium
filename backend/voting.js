const redisClient = require('./redis');

const castVote = async(storyID, choice) => {
    const key = `story:${storyID}:votes`
    await redisClient.hincr(key, choice ,1);
    console.log(`Vote added for ${choice}`);
};

const getVoteResults = async (storyID) => {
    const key = `story:${storyID}:votes`
    const results = await redisClient.hgetAll(key);
    console.log('Current Voting Results for ${storyId}:', results);
    return results;
}

// Example usage
(async () => {
    await castVote('1234', 'ChoiceA');
    await castVote('1234', 'ChoiceB');
    await getVoteResults('1234');
})();
