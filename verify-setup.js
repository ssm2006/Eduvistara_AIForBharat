// Simple setup verification script
const fs = require('fs');
const path = require('path');

console.log('🔍 EduVistara Setup Verification\n');

// Check Node version
const nodeVersion = process.version;
console.log(`✓ Node.js version: ${nodeVersion}`);

if (parseInt(nodeVersion.slice(1)) < 18) {
  console.log('⚠️  Warning: Node.js 18+ is recommended');
}

// Check if .env exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log('✓ .env file found');
  
  // Read and check env variables
  const envContent = fs.readFileSync(envPath, 'utf8');
  const requiredVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ];
  
  let allVarsPresent = true;
  requiredVars.forEach(varName => {
    if (envContent.includes(varName) && !envContent.includes(`${varName}=your_`)) {
      console.log(`  ✓ ${varName} configured`);
    } else {
      console.log(`  ✗ ${varName} missing or not configured`);
      allVarsPresent = false;
    }
  });
  
  if (!allVarsPresent) {
    console.log('\n⚠️  Some Firebase credentials are missing!');
    console.log('   Please update your .env file with actual values.');
  }
} else {
  console.log('✗ .env file NOT found');
  console.log('  Please create .env file from .env.example');
  console.log('  Run: copy .env.example .env');
}

// Check if node_modules exists
if (fs.existsSync(path.join(__dirname, 'node_modules'))) {
  console.log('✓ node_modules found');
} else {
  console.log('✗ node_modules NOT found');
  console.log('  Run: npm install');
}

// Check critical files
const criticalFiles = [
  'package.json',
  'vite.config.ts',
  'tsconfig.json',
  'index.html',
  'src/main.tsx',
  'src/App.tsx'
];

console.log('\n📁 Checking critical files:');
criticalFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`  ✓ ${file}`);
  } else {
    console.log(`  ✗ ${file} missing`);
  }
});

// Check public directory
if (fs.existsSync(path.join(__dirname, 'public', 'locales'))) {
  console.log('  ✓ Translation files');
} else {
  console.log('  ✗ Translation files missing');
}

console.log('\n📊 Summary:');
if (fs.existsSync(envPath) && fs.existsSync(path.join(__dirname, 'node_modules'))) {
  console.log('✅ Setup looks good! You can run: npm run dev');
} else {
  console.log('⚠️  Setup incomplete. Please follow the steps above.');
}

console.log('\n💡 Quick Start:');
console.log('   1. Ensure .env file has your Firebase credentials');
console.log('   2. Run: npm run dev');
console.log('   3. Open: http://localhost:3000');
console.log('\n📖 For detailed help, see QUICKSTART.md\n');
