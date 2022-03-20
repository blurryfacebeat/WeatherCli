import { getKeyValue } from './storage.service.js';
import { TOKEN_DICTIONARY } from '../constants/index.js';
import axios from 'axios';

const getWeather = async (city) => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token);

  if (!token) {
    throw new Error(
      'Не задан API ключ. Задайте его через команду -t [API KEY]'
    );
  }

  const { data } = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params: {
        q: city,
        appid: token,
        lang: 'ru',
        units: 'metrics',
      },
    }
  );

  return data;
};

export { getWeather };
