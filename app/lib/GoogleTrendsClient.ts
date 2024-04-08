import {getJson} from "serpapi";

class GoogleTrendsClient {
    private readonly apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async fetchTrendingCountries(topic: string): Promise<any[]> {
        const json = await getJson({
            engine: "google_trends",
            q: topic,
            data_type: "GEO_MAP_0",
            api_key: this.apiKey,
        });

        return json["interest_by_region"];
    }
}

export default GoogleTrendsClient;