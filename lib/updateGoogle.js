import axios from 'axios';
import { google } from 'googleapis';

export default async (serviceUser, urls) => {
  const client = new google.auth.JWT(serviceUser.client_email, null, serviceUser.private_key, ['https://www.googleapis.com/auth/indexing'], null);
  const tokens = await client.authorize();
  const promises = urls.map((url) => axios({
    method: 'POST',
    url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokens.access_token}`,
    },
    data: {
      url,
      type: 'URL_UPDATED',
    },
  }).catch(console.log));
  return promises;
};
