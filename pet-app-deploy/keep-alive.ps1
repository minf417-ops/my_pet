# Pet App Keep-Alive Script
# This script keeps both the local server and SSH tunnel running
# Press Ctrl+C to stop

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Pet App Keep-Alive Service" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start eleventy server in background
Write-Host "[1/2] Starting local server..." -ForegroundColor Yellow
$serverJob = Start-Job -ScriptBlock {
    Set-Location "d:\My_Project\My_pet\pet-app-deploy"
    npx @11ty/eleventy --serve --port 8080 2>&1
}
Start-Sleep -Seconds 3
Write-Host "[OK] Local server running on port 8080" -ForegroundColor Green

# Loop to keep SSH tunnel alive with auto-reconnect
Write-Host "[2/2] Starting SSH tunnel with auto-reconnect..." -ForegroundColor Yellow
Write-Host ""

while ($true) {
    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Connecting tunnel..." -ForegroundColor Cyan
    
    ssh -o StrictHostKeyChecking=no `
        -o UserKnownHostsFile=NUL `
        -o ServerAliveInterval=30 `
        -o ServerAliveCountMax=3 `
        -o ExitOnForwardFailure=yes `
        -o ConnectTimeout=10 `
        -R 80:localhost:8080 nokey@localhost.run 2>&1
    
    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Tunnel disconnected. Reconnecting in 5 seconds..." -ForegroundColor Red
    Start-Sleep -Seconds 5
}
