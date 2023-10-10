const bwipjs = require('bwip-js');

// Barcode text or data
const barcodeData = '12343';

const barcodeOptions = {
  bcid: 'code128', 
  text: barcodeData, // Barcode data
  scale: 3, // Scaling factor
  height: 10, // Height of the barcode
  includetext: true, // Include human-readable text
  textxalign: 'center', // Text alignment
};

// Generate the barcode
bwipjs.toBuffer(barcodeOptions, (err, pngBuffer) => {
  if (err) {
    console.error('Error generating barcode:', err);
    return;
  }

  const fs = require('fs');
  fs.writeFileSync('./uploads/barcode.png', pngBuffer);
  console.log('Barcode saved as barcode.png');
});
