const os = require('os');
const checkDiskSpace = require('check-disk-space').default

const getDashboard = async(request, response)=> {
  try {
    const networkInterfaces = os.networkInterfaces();

    const ipAddresses = Object.values(networkInterfaces)
    .flat()
    .filter(({ family }) => family === 'IPv4')
    .map(({ address }) => address);

    const freeMemRAMInBytes = os.freemem();
    const freeMemRAMInGB = freeMemRAMInBytes/1024/1024/1024;

    const totalMemRAMInBytes = os.totalmem();
    const totalMemRAMInGB = totalMemRAMInBytes/ 1024/1024/1024;
    
    const diskSpace = await checkDiskSpace('C:/');
    const freeMemDiskGB = diskSpace.free/1024/1024/1024 ;
    const totalCapacityDiskGB = diskSpace.size/1024/1024/1024;

    const dataDashboard = {
        processor : os.cpus()[0].model,
        ramMemory:{
          freeMemory:freeMemRAMInGB,
          totalMemory:totalMemRAMInGB
        },
        diskMemory: {
            freeMemory:freeMemDiskGB,
            totalMemory: totalCapacityDiskGB
        },
        ipNetworkInterfaces :ipAddresses
    }

    response.status(200).send(dataDashboard)
  } 
  catch (error) {
    response.status(500).send(error.message)
  }
}

module.exports = getDashboard;