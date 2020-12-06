import { updateLocationsNoiseLevels, updateLocationsTrafficLevel } from './src/models/locationsModel';

// updateLocationsNoiseLevels()
//     .then(() => {
//         console.log('done');
//     }).catch((err) => { console.log(err) });

updateLocationsTrafficLevel()
    .then(() => {
        console.log('done');
    }).catch((err) => { console.log(err) });