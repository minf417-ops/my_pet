import { tunnel, bin } from 'cloudflared';
import { existsSync } from 'fs';

console.log('============================================');
console.log('  Pet App - Cloudflare Tunnel');
console.log('============================================\n');

// Install cloudflared binary if not present
if (!existsSync(bin)) {
    console.log('Downloading cloudflared binary...');
    const { install } = await import('cloudflared');
    await install(bin);
    console.log('cloudflared installed.\n');
}

console.log('Starting tunnel to http://localhost:8080 ...\n');

const { url, connections, child, stop } = tunnel({ '--url': 'localhost:8080' });

url.then((u) => {
    console.log('============================================');
    console.log(`  PUBLIC URL: ${u}`);
    console.log('============================================');
    console.log('\nShare this URL on your mobile phone.');
    console.log('Press Ctrl+C to stop.\n');
});

connections.on('connected', (connection) => {
    console.log(`[Connected] ${connection.location} (id=${connection.id})`);
});

connections.on('disconnected', (connection) => {
    console.log(`[Disconnected] ${connection.id}`);
});

process.on('SIGINT', () => {
    console.log('\nStopping tunnel...');
    stop();
    process.exit(0);
});
