import server from './src/utils/server-jumpstart';
import { updateLocationsNoiseLevels, updateLocationsTrafficLevel } from './src/models/locationsModel';

updateLocationsNoiseLevels()
    .then(() => {
        console.log('locations noise levels updated');
    }).catch((err) => { console.log(err) });

updateLocationsTrafficLevel()
    .then(() => {
        console.log('locations traffic levels updated');
    }).catch((err) => { console.log(err) });

const PORT = 1337;

// Start listening on PORT 3000
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));