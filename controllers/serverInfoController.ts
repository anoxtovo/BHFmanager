import { Request, Response } from 'express';
import mongoose from 'mongoose';
import os from 'os'; // Import the 'os' module

export const getServerStatus = (req: Request, res: Response) => {
  // Get system info using 'os' module
  const systemInfo = {
    platform: os.platform(),               // e.g., 'linux', 'darwin', 'win32'
    arch: os.arch(),                       // e.g., 'x64'
    cpuModel: os.cpus()[0].model,          // Processor type
    cpuCores: os.cpus().length,            // Number of CPU cores
    totalRAM: (os.totalmem() / (1024 ** 3)).toFixed(2) + ' GB',  // Total RAM in GB
    freeRAM: (os.freemem() / (1024 ** 3)).toFixed(2) + ' GB',    // Free RAM in GB
    ramUsage: (((os.totalmem() - os.freemem()) / os.totalmem()) * 100).toFixed(2) + '%', // RAM usage percentage
    uptime: (os.uptime() / 60).toFixed(2) + ' minutes',          // System uptime in minutes
    hostname: os.hostname(),               // System hostname
    webServerType: req.headers['user-agent'] || 'Unknown',       // Web server info (if available)
  };

  // Existing server info
  const serverInfo = {
    url: req.protocol + '://' + req.get('host'),  // Dynamically generate URL
    port: process.env.PORT || 5000,
    databaseName: mongoose.connection.name || 'Not connected',
    databaseStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Not Connected'
  };

  // Combine both server and system info
  const completeInfo = {
    serverInfo,
    systemInfo,
  };

  res.json(completeInfo);
};
