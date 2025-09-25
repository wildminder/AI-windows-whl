# SageAttention wheel.
param(
    [Parameter(Mandatory=$true)]
    [string]$SageAttnVersion, # Git tag or branch for SageAttention
    
    [Parameter(Mandatory=$true)]
    [string]$PythonVersion,
    
    [Parameter(Mandatory=$true)]
    [string]$TorchVersion,
    
    [Parameter(Mandatory=$true)]
    [string]$CudaVersion,

    [Parameter(Mandatory=$false)]
    [string]$CudaArchList = "8.0 8.6 8.9 9.0" # Default CUDA archs
)

$ErrorActionPreference = "Stop"

Write-Host "Building SageAttention with parameters:"
Write-Host "  SageAttention Git Ref: $SageAttnVersion"
Write-Host "  Python: $PythonVersion"
Write-Host "  PyTorch: $TorchVersion"
Write-Host "  CUDA: $CudaVersion"
Write-Host "  CUDA Archs: $CudaArchList"

# Install PyTorch
$MatrixCudaVersion = $CudaVersion -replace '\.', ''
$MatrixTorchVersion = $TorchVersion -replace '^(\d+\.\d+).*', '$1'
$env:TORCH_CUDA_VERSION = python scripts/get_torch_cuda_version.py $MatrixCudaVersion $MatrixTorchVersion
Write-Host "Installing PyTorch $TorchVersion+cu$env:TORCH_CUDA_VERSION..."
pip install --force-reinstall --no-cache-dir torch==$TorchVersion --index-url https://download.pytorch.org/whl/cu$env:TORCH_CUDA_VERSION

# Checkout SageAttention
Write-Host "Checking out SageAttention at ref $SageAttnVersion..."
git clone https://github.com/woct0rdho/SageAttention.git -b "$SageAttnVersion"

# Build wheel
Write-Host "Building SageAttention wheel..."
Import-Module 'C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\Common7\Tools\Microsoft.VisualStudio.DevShell.dll'
Enter-VsDevShell -VsInstallPath 'C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools' -DevCmdArguments '-arch=x64 -host_arch=x64'

# Set environment variables that SageAttention's setup.py will use
$env:DISTUTILS_USE_SDK = 1
$env:TORCH_CUDA_ARCH_LIST = $CudaArchList

# version suffix
$pythonCommand = "import torch; from packaging.version import parse; v_cuda_tuple = parse(torch.version.cuda).release; v_cuda = f'cu{v_cuda_tuple[0]}{v_cuda_tuple[1]}'; v_torch_tuple = parse(torch.__version__).release; v_torch = f'torch{v_torch_tuple[0]}.{v_torch_tuple[1]}.{v_torch_tuple[2]}'; cxx_abi = '0'; print(f'+{v_cuda}{v_torch}cxx11abi{cxx_abi}')"
$versionSuffix = python -c $pythonCommand
$env:SAGEATTENTION_WHEEL_VERSION_SUFFIX = $versionSuffix
Write-Host "Generated wheel suffix: $env:SAGEATTENTION_WHEEL_VERSION_SUFFIX"

cd SageAttention
python setup.py bdist_wheel --dist-dir=dist

$wheelName = Get-ChildItem -Path "dist\*.whl" | Select-Object -First 1 | ForEach-Object { $_.Name }
Write-Host "Built wheel: $wheelName"
cd ..
