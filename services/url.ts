import axios from 'axios';

export default axios.create({
  baseURL: process.env.SCAN_TRACK_BASE_URL
});
