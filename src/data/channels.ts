import { Channel } from '../types';

export const channels: Channel[] = [
  {
    id: 'dw-news',
    name: 'DW News Global',
    category: 'News',
    country: 'Global',
    url: 'https://dwamdstream102.akamaized.net/hls/live/2015525/eaw/index.m3u8',
    programInfo: 'Germany\'s international broadcaster delivering global news and independent journalism.',
  },
  {
    id: 'al-jazeera',
    name: 'Al Jazeera English',
    category: 'News',
    country: 'Global',
    url: 'https://live-hls-web-aje.getaj.net/AJE/index.m3u8',
    programInfo: 'Award-winning international news and documentaries offering diverse perspectives.',
  },
  {
    id: 'fr24',
    name: 'France 24',
    category: 'News',
    country: 'Global',
    url: 'https://static.france24.com/live/F24_EN_HI_HLS/live_web.m3u8',
    programInfo: 'International news and current affairs television network based in Paris.',
  },
  {
    id: 'red-bull',
    name: 'Red Bull TV',
    category: 'Entertainment',
    country: 'Global',
    url: 'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8',
    programInfo: 'Live sports, music, and entertainment showcasing extraordinary events and athletes.',
  },
  {
    id: 'sky-news-uk',
    name: 'Sky News UK',
    category: 'News',
    country: 'UK',
    url: 'https://skynews-live.akamaized.net/hls/live/2043685/skynews/master.m3u8',
    programInfo: 'Breaking news, analysis, and exclusive interviews from the UK and around the world.',
  }
];

export const groupChannelsByCountry = () => {
  return channels.reduce((acc, channel) => {
    if (!acc[channel.country]) {
      acc[channel.country] = [];
    }
    acc[channel.country].push(channel);
    return acc;
  }, {} as Record<string, typeof channels>);
};
