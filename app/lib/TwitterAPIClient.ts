import axios from 'axios';

interface TrendingTopic {
    name: string;
    tweetCount: number;
}

interface Location {
    country: string;
    woeid: number;
}

class TwitterAPIClient {
    private readonly apiKey: string;
    private readonly apiSecretKey: string;

    constructor(apiKey: string, apiSecretKey: string) {
        this.apiKey = apiKey;
        this.apiSecretKey = apiSecretKey;
    }

    async fetchTrendingTopics(topic: string): Promise<{ [country: string]: TrendingTopic[] }> {
        const bearerToken: string = await this.getBearerToken();
        if (!bearerToken) {
            throw new Error('Failed to obtain bearer token');
        }

        const locationsResponse: Location[] = await this.fetchAvailableLocations(bearerToken);
        const trendingTopicsByCountry: { [country: string]: TrendingTopic[] } = {};

        for (const location of locationsResponse) {
            const trendsResponse = await this.fetchTrendsForLocation(location.woeid, bearerToken);
            if (trendsResponse && trendsResponse[0] && trendsResponse[0].trends) {
                const trends = trendsResponse[0].trends;
                for (const trend of trends) {
                    const tweetCount = trend.tweet_volume || 0;
                    if (trend.name.toLowerCase().includes(topic.toLowerCase())) {
                        if (location.country in trendingTopicsByCountry) {
                            trendingTopicsByCountry[location.country].push({ name: trend.name, tweetCount });
                        } else {
                            trendingTopicsByCountry[location.country] = [{ name: trend.name, tweetCount }];
                        }
                    }
                }
            }
        }

        return trendingTopicsByCountry;
    }

    async getBearerToken(): Promise<string> {
        const response = await axios.post('https://api.twitter.com/oauth2/token', 'grant_type=client_credentials', {
            auth: {
                username: this.apiKey,
                password: this.apiSecretKey,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        });

        console.log(response.data);
        return response.data.access_token;
    }

    async fetchAvailableLocations(bearerToken: string): Promise<Location[]> {
        const response = await axios.get('https://api.twitter.com/1.1/trends/place.json?id=${woeid}', {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            },
        });
        console.log(response.data)
        return response.data;
    }

    async fetchTrendsForLocation(woeid: number, bearerToken: string): Promise<any> {
        const response = await axios.get(`https://api.twitter.com/1.1/trends/place.json?id=${woeid}`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            },
        });
        console.log(response.data);
        return response.data;
    }
}

export default TwitterAPIClient;
