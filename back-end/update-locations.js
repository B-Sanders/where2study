import { updateLocationsNoiseLevels, updateLocationsTrafficLevel } from './src/models/locationsModel';

updateLocationsNoiseLevels()
    .then(() => {
        console.log('locations noise levels updated');
    }).catch((err) => { console.log(err) });

updateLocationsTrafficLevel()
    .then(() => {
        console.log('locations traffic levels updated');
    }).catch((err) => { console.log(err) });