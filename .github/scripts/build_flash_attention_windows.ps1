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

$ErrorActionPreference = "Stop"

if ($FlashAttnVersion -eq "latest") {
    Write-Host "Input is 'latest', determining the latest version of Flash Attention..."
    $latestTag = gh release list --repo Dao-AILab/flash-attention --limit 1 --json tagName --jq '.[0].tagName'
    $FlashAttnVersion = $latestTag
    Write-Host "Latest version found: $FlashAttnVersion"
}

$MatrixCudaVersion = $CudaVersion -replace '\.', ''
$MatrixTorchVersion = $TorchVersion -replace '^(\d+\.\d+).*', '$1'
$env:TORCH_CUDA_VERSION = python .github/scripts/get_torch_cuda_version.py $MatrixCudaVersion $MatrixTorchVersion

$TorchBaseVersion = [version]$TorchVersion
$NightlyThreshold = [version]"2.9.0"

Write-Host "Installing PyTorch $TorchVersion for CUDA $CudaVersion..."

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

Write-Host "Checking out flash-attention at ref $FlashAttnVersion..."
git clone https://github.com/Dao-AILab/flash-attention.git -b $FlashAttnVersion --depth 1

Write-Host "Building wheels..."
$env:DISTUTILS_USE_SDK = 1
$env:FLASH_ATTENTION_FORCE_BUILD = "TRUE"

cd flash-attention
python setup.py bdist_wheel --dist-dir=dist

Write-Host "Renaming wheel with custom version tag..."
$baseWheelName = (Get-ChildItem -Path "dist\*.whl")[0].Name
$packageVersionFromFile = ($baseWheelName -split '-')[1]
$versionTag = python -c "import torch; from packaging.version import parse; v_cuda = ''.join(map(str, parse(torch.version.cuda).release)); v_torch = '.'.join(map(str, parse(torch.__version__).release)); print(f'cu{v_cuda}torch{v_torch}cxx11abiFALSE')"
$parts = $baseWheelName -split '-', 3
$wheelName = "$($parts[0])-$($parts[1])+$versionTag-$($parts[2])"
Move-Item "dist\$baseWheelName" "dist\$wheelName" -Force
Write-Host "Built and renamed wheel: $wheelName"

$fullWheelPath = (Resolve-Path -Path "dist\$wheelName").Path
echo "wheel_path=$fullWheelPath" | Out-File -FilePath $env:GITHUB_OUTPUT -Encoding utf8 -Append
cd ..