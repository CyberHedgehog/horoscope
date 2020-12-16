import axios from 'axios';
import { google } from 'googleapis';
import fetch from 'node-fetch';

const update = async (serviceUser, urlToIndex) => {
  const client = new google.auth.JWT(serviceUser.client_email, null, serviceUser.private_key, ['https://www.googleapis.com/auth/indexing'], null);
  const tokens = await client.authorize();
  return axios({
    method: 'POST',
    url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokens.access_token}`,
    },
    data: {
      url: urlToIndex,
      type: 'URL_UPDATED',
    },
  });
};


export default update;