# FILE: build_windows.ps1
param(
    [Parameter(Mandatory=$true)]
    [string]$FlashAttnVersion,
    
    [Parameter(Mandatory=$true)]
    [string]$PythonVersion,
    
    [Parameter(Mandatory=$true)]
    [string]$TorchVersion,
    
    [Parameter(Mandatory=$true)]
    [string]$CudaVersion
)

# Error handling
$ErrorActionPreference = "Stop"

Write-Host "Building Flash Attention with parameters:"
Write-Host "  Flash-Attention: $FlashAttnVersion"
Write-Host "  Python: $PythonVersion"
Write-Host "  PyTorch: $TorchVersion"
Write-Host "  CUDA: $CudaVersion"

$MatrixCudaVersion = $CudaVersion -replace '\.', ''
$MatrixTorchVersion = $TorchVersion -replace '^(\d+\.\d+).*', '$1'
$env:TORCH_CUDA_VERSION = python get_torch_cuda_version.py $MatrixCudaVersion $MatrixTorchVersion
Write-Host "Installing PyTorch $TorchVersion+cu$env:TORCH_CUDA_VERSION..."
if ($TorchVersion -like "*dev*") {
    pip install --force-reinstall --no-cache-dir --pre torch==$TorchVersion --index-url https://download.pytorch.org/whl/nightly/cu$env:TORCH_CUDA_VERSION
} else {
    pip install --force-reinstall --no-cache-dir torch==$TorchVersion --index-url https://download.pytorch.org/whl/cu$env:TORCH_CUDA_VERSION
}
Write-Host "Verifying installations..."
nvcc --version
python -V
python -c "import torch; print('PyTorch:', torch.__version__)"
python -c "import torch; print('CUDA:', torch.version.cuda)"
Write-Host "Checking out flash-attention v$FlashAttnVersion..."
git clone https://github.com/Dao-AILab/flash-attention.git -b "v$FlashAttnVersion"
Write-Host "Building wheels..."
Import-Module 'C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\Common7\Tools\Microsoft.VisualStudio.DevShell.dll'
Enter-VsDevShell -VsInstallPath 'C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools' -DevCmdArguments '-arch=x64 -host_arch=x64'
$env:DISTUTILS_USE_SDK = 1
$env:FLASH_ATTENTION_FORCE_BUILD = "TRUE"

cd flash-attention
python setup.py bdist_wheel --dist-dir=dist

# RENAMING 
Write-Host "Renaming wheel with custom version tag..."

# Get the original wheel filename
$baseWheelName = Get-ChildItem -Path "dist\*.whl" | Select-Object -First 1 | ForEach-Object { $_.Name }

# Use a Python one-liner to generate the version tag, just like in the batch script.
# We hardcode cxx11abiFALSE as it's the correct value for Windows MSVC builds.
$versionTag = python -c "import torch; from packaging.version import parse; v_cuda = ''.join(map(str, parse(torch.version.cuda).release)); v_torch = '.'.join(map(str, parse(torch.__version__).release)); print(f'cu{v_cuda}torch{v_torch}cxx11abiFALSE')"

# Split the original filename into three parts at the first two hyphens.
# e.g., "flash_attn-2.5.9.post1-cp312-cp312-win_amd64.whl" becomes:
# $parts[0] = "flash_attn"
# $parts[1] = "2.5.9.post1"
# $parts[2] = "cp312-cp312-win_amd64.whl"
$parts = $baseWheelName -split '-', 3

# Construct the new filename by inserting the version tag with a '+'
$wheelName = "$($parts[0])-$($parts[1])+$($versionTag)-$($parts[2])"

Move-Item "dist\$baseWheelName" "dist\$wheelName" -Force
Write-Host "Built and renamed wheel: $wheelName"
cd ..
