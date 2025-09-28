param(
    [Parameter(Mandatory=$true)]
    [string]$SageAttnVersion,
    
    [Parameter(Mandatory=$true)]
    [string]$PythonVersion,
    
    [Parameter(Mandatory=$true)]
    [string]$TorchVersion,
    
    [Parameter(Mandatory=$true)]
    [string]$CudaVersion
)

$ErrorActionPreference = "Stop"

if ($SageAttnVersion -eq "latest") {
    Write-Host "Input is 'latest', determining the latest version of SageAttention..."
    # SageAttention releases are on the woct0rdho fork, so we query that repo.
    $latestTag = gh release list --repo woct0rdho/SageAttention --limit 1 --json tagName --jq '.[0].tagName'
    $SageAttnVersion = $latestTag
    Write-Host "Latest version found: $SageAttnVersion"
}

$MatrixCudaVersion = $CudaVersion -replace '\.', ''
$MatrixTorchVersion = $TorchVersion -replace '^(\d+\.\d+).*', '$1'
$env:TORCH_CUDA_VERSION = python .github/scripts/get_torch_cuda_version.py $MatrixCudaVersion $MatrixTorchVersion

$TorchBaseVersion = [version]$TorchVersion
$NightlyThreshold = [version]"2.9.0"

if ($TorchBaseVersion -ge $NightlyThreshold) {
    Write-Host "PyTorch version is >= 2.9.0, using NIGHTLY channel."
    $IndexUrl = "https://download.pytorch.org/whl/nightly/cu$env:TORCH_CUDA_VERSION"
    pip install --force-reinstall --no-cache-dir --pre torch torchvision --index-url $IndexUrl
}
else {
    Write-Host "PyTorch version is < 2.9.0, using STABLE channel."
    $IndexUrl = "https://download.pytorch.org/whl/cu$env:TORCH_CUDA_VERSION"
    pip install --force-reinstall --no-cache-dir torch==$TorchVersion torchvision --index-url $IndexUrl
}

Write-Host "Verifying PyTorch installation..."
python -c "import torch; print('Successfully verified PyTorch installation. Version:', torch.__version__)"
if ($LASTEXITCODE -ne 0) {
    throw "PyTorch was not installed correctly or could not be imported. Aborting build."
}

Write-Host "Checking out SageAttention at ref $SageAttnVersion..."
git clone https://github.com/woct0rdho/SageAttention.git -b $SageAttnVersion --depth 1

Write-Host "Building SageAttention wheel..."
$env:DISTUTILS_USE_SDK = "1"
# Set build environment variables for performance and stability.
$env:MAX_JOBS = "2"
# Set CUDA arch list for compatibility.
$env:TORCH_CUDA_ARCH_LIST = "8.0 8.6 8.9 9.0 12.0"

$pythonCommand = "import torch; from packaging.version import parse; v_cuda_tuple = parse(torch.version.cuda).release; v_cuda = f'cu{v_cuda_tuple[0]}{v_cuda_tuple[1]}'; v_torch_tuple = parse(torch.__version__).release; v_torch = f'torch{v_torch_tuple[0]}.{v_torch_tuple[1]}.{v_torch_tuple[2]}'; cxx_abi = '0'; print(f'+{v_cuda}{v_torch}cxx11abi{cxx_abi}')"
$env:SAGEATTENTION_WHEEL_VERSION_SUFFIX = python -c $pythonCommand
Write-Host "Using wheel version suffix: $env:SAGEATTENTION_WHEEL_VERSION_SUFFIX"

cd SageAttention
python setup.py bdist_wheel --dist-dir=dist

$wheelName = (Get-ChildItem -Path "dist\*.whl")[0].Name
Write-Host "Built wheel: $wheelName"
$fullWheelPath = (Resolve-Path -Path "dist\$wheelName").Path
echo "wheel_path=$fullWheelPath" | Out-File -FilePath $env:GITHUB_OUTPUT -Encoding utf8 -Append
cd ..