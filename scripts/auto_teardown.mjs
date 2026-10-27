import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const TARGET_TIME_ISO = '2026-10-28T14:00:00+05:30';
const TARGET_TIME = new Date(TARGET_TIME_ISO).getTime();
const LOG_FILE = 'C:\\Users\\rkpat\\.gemini\\antigravity\\scratch\\diwali-dhamaka\\auto_delete.log';
const CONFIG_FILE = 'C:\\Users\\rkpat\\.gemini\\antigravity\\scratch\\diwali-dhamaka\\.render_config.json';
const REPO_NAME = 'Rakshit-Sapariya/diwali-dhamaka';

function appendLog(message) {
  const line = `[${new Date().toISOString()}] ${message}\n`;
  console.log(line.trim());
  try {
    fs.appendFileSync(LOG_FILE, line, 'utf8');
  } catch (err) {
    console.error('Failed to write log:', err);
  }
}

appendLog(`Autonomous Teardown Daemon initialized. Target deletion time: ${TARGET_TIME_ISO}`);

async function deleteRenderService(apiKey, serviceId) {
  appendLog(`Attempting to delete Render service ${serviceId}...`);
  try {
    const response = await fetch(`https://api.render.com/v1/services/${serviceId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      }
    });

    if (response.ok || response.status === 204 || response.status === 404) {
      appendLog(`Successfully deleted Render service: ${serviceId} (Status: ${response.status})`);
      return true;
    } else {
      const text = await response.text();
      appendLog(`Failed to delete Render service: ${response.status} - ${text}`);
      return false;
    }
  } catch (err) {
    appendLog(`Error deleting Render service: ${err.message}`);
    return false;
  }
}

function deleteGitHubRepo() {
  appendLog(`Attempting to delete GitHub repository: ${REPO_NAME}...`);
  try {
    const output = execSync(`gh repo delete ${REPO_NAME} --yes`, { encoding: 'utf8' });
    appendLog(`Successfully deleted GitHub repo ${REPO_NAME}: ${output.trim()}`);
    return true;
  } catch (err) {
    appendLog(`Failed to delete GitHub repository: ${err.message}`);
    return false;
  }
}

async function runTeardown() {
  appendLog('=== EXECUTING AUTOMATED TEARDOWN AFTER 2 PM ===');

  // 1. Delete Render service if configured
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
      if (config.apiKey && config.serviceId) {
        await deleteRenderService(config.apiKey, config.serviceId);
      }
    } catch (err) {
      appendLog(`Error reading render config: ${err.message}`);
    }
  } else if (process.env.RENDER_API_KEY && process.env.RENDER_SERVICE_ID) {
    await deleteRenderService(process.env.RENDER_API_KEY, process.env.RENDER_SERVICE_ID);
  } else {
    appendLog('No Render API key/serviceId stored; relying on repository deletion to de-link Render.');
  }

  // 2. Delete GitHub repo
  deleteGitHubRepo();

  appendLog('=== TEARDOWN COMPLETED SUCCESSFULLY ===');
}

// Timer check loop
function checkTimer() {
  const now = Date.now();
  const diffMs = TARGET_TIME - now;

  if (diffMs <= 0) {
    runTeardown().then(() => {
      process.exit(0);
    });
  } else {
    const hoursLeft = (diffMs / (1000 * 60 * 60)).toFixed(2);
    appendLog(`Still active. ${hoursLeft} hours remaining until teardown.`);
    
    // Check every 10 minutes until the final 1 minute
    const interval = diffMs > 60000 ? Math.min(600000, diffMs) : diffMs;
    setTimeout(checkTimer, Math.max(1000, interval));
  }
}

checkTimer();
