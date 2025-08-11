#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Script to sync the Obsidian vault submodule
 * This should be run before build to ensure we have the latest content
 */

console.log('🧠 Syncing Obsidian vault...');

try {
  // Change to the project root
  const projectRoot = path.resolve(__dirname, '..');
  process.chdir(projectRoot);

  // Initialize and update submodules
  console.log('📥 Updating submodules...');
  execSync('git submodule update --init --recursive', { stdio: 'inherit' });

  // Navigate to submodule and pull latest changes
  console.log('🔄 Pulling latest changes from brain-base...');
  process.chdir(path.join(projectRoot, 'content/obsidian-vault'));
  execSync('git pull origin main', { stdio: 'inherit' });

  console.log('✅ Obsidian vault synced successfully!');
} catch (error) {
  console.error('❌ Failed to sync Obsidian vault:', error.message);
  process.exit(1);
}
