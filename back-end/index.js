import server from './src/utils/server-jumpstart';

const PORT = 1337;

// Start listening on PORT 3000
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));