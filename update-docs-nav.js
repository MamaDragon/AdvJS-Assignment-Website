const fs = require('fs');
const path = require('path');

// Function to add custom navigation to HTML files
function addCustomNavigation(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if already modified
        if (content.includes('custom-nav.css')) {
            return;
        }
        
        // Add CSS link before closing head tag
        const cssLink = '    <link type="text/css" rel="stylesheet" href="styles/custom-nav.css">\n</head>';
        content = content.replace('</head>', cssLink);
        
        // Add JavaScript before closing body tag
        const jsScript = '    <script src="scripts/custom-nav.js"></script>\n</body>';
        content = content.replace('</body>', jsScript);
        
        fs.writeFileSync(filePath, content);
        console.log(`✅ Updated: ${path.basename(filePath)}`);
    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
    }
}

// Function to process all HTML files in docs directory
function processDocumentation() {
    const docsDir = path.join(__dirname, 'docs');
    
    try {
        const files = fs.readdirSync(docsDir);
        
        files.forEach(file => {
            if (file.endsWith('.html')) {
                const filePath = path.join(docsDir, file);
                addCustomNavigation(filePath);
            }
        });
        
        console.log('\n🎉 Documentation navigation updated successfully!');
        console.log('📚 All documentation pages now have a "Back to Main Page" button');
    } catch (error) {
        console.error('❌ Error processing documentation:', error.message);
    }
}

// Run the script
processDocumentation();
