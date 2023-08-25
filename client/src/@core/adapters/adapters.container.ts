import { RegisterContainer } from "../containers/register";
import { Fetcher } from "./fetch";

const register = {
  fetcher: "http client"
};
const AdapterContainer = new RegisterContainer({
  [register.fetcher]: { 
    instance: Fetcher
  }
});

export const HttpClient = AdapterContainer.start(Fetcher, register.fetcher);

