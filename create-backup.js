import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

// Files to include in the backup
const filesToBackup = [
  // Homepage related files
  'src/pages/HomePage.tsx',
  'src/components/StickyMobileCTA.tsx',
  'src/components/Layout.tsx',
  'src/components/FormLayout.tsx',
  'src/context/SignupContext.tsx',
  'src/index.css',
  'src/main.tsx',
  'src/App.tsx',
  'index.html',
  
  // Legal pages
  'src/pages/PrivacyPolicy.tsx',
  'src/pages/TermsOfService.tsx',
  'src/pages/Disclaimer.tsx',
  'src/pages/DoNotCallPolicy.tsx',
  
  // Signup flow pages
  'src/pages/signup/AddressForm.tsx',
  'src/pages/signup/NameForm.tsx',
  'src/pages/signup/EmailForm.tsx',
  'src/pages/signup/PhoneForm.tsx',
  'src/pages/signup/Confirmation.tsx',
  
  // Other important pages
  'src/pages/ContactConsentPage.tsx',
  'src/pages/AvailabilityChecker.tsx',
  'src/pages/ContactPage.tsx',
  'src/pages/AboutUsPage.tsx',
  'src/pages/ServicesPage.tsx',
  'src/pages/ProductsPage.tsx',
  'src/pages/BecomeADealerPage.tsx',
  'src/pages/IntakePage.tsx',
  
  // Configuration files
  'package.json',
  'vite.config.ts',
  'tailwind.config.js',
  'tsconfig.json',
  'tsconfig.app.json',
  'postcss.config.js',
  'netlify.toml',
  
  // Google Apps Script
  'Code.gs'
];

const createBackup = () => {
  const output = fs.createWriteStream('homepage-backup.zip');
  const archive = archiver('zip', {
    zlib: { level: 9 }
  });

  output.on('close', () => {
    console.log('✅ Backup created successfully!');
    console.log(`📦 Archive size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
    console.log('📁 File: homepage-backup.zip');
    console.log('\n📋 Backup includes:');
    console.log('   • Homepage and all components');
    console.log('   • Legal pages (Privacy, Terms, Disclaimer, Do Not Call)');
    console.log('   • Signup flow pages');
    console.log('   • Contact and other important pages');
    console.log('   • Configuration files');
    console.log('   • Google Apps Script');
  });

  archive.on('error', (err) => {
    console.error('❌ Error creating backup:', err);
    throw err;
  });

  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
      console.warn(`⚠️  File not found: ${err.path}`);
    } else {
      throw err;
    }
  });

  archive.pipe(output);

  // Add files to archive
  let filesAdded = 0;
  filesToBackup.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      archive.file(filePath, { name: filePath });
      filesAdded++;
    } else {
      console.warn(`⚠️  File not found: ${filePath}`);
    }
  });

  console.log(`📦 Adding ${filesAdded} files to backup...`);
  
  // Finalize the archive
  archive.finalize();
};

// Run the backup
createBackup();