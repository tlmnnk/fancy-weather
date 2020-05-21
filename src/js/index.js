import app from './controller/app';
import geoposition from './models/geoposition';

document.addEventListener('DOMContentLoaded', () => {
  geoposition.fetchCoordinates();
});

async function geo() {
  return await geoposition.getPosition();
}